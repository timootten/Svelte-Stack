import { db } from "$lib/server/db";
import { tokenTable, userSchema, userTable } from "$lib/server/db/schema";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { and, eq, ilike, or } from "drizzle-orm";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { github, lucia } from "$lib/server/auth/index.js";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { dev } from "$app/environment";
import { generateState } from "arctic";
import { encodeHex } from "oslo/encoding";
import { sha256 } from "oslo/crypto";
import { isWithinExpirationDate } from "oslo";

const resetPasswordSchema = userSchema.pick({
  password: true,
});

export async function load({ url, cookies }) {
  const form = await superValidate(zod(resetPasswordSchema));

  const token = url.searchParams.get('token');

  if (!token) {
    redirect("/login", { status: "error", text: "Invalid token." }, cookies);
  }

  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
  const databaseToken = (await db.select().from(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'password_reset'))))[0];

  if (!databaseToken) {
    redirect("/login", { status: "error", text: "Invalid token." }, cookies);
  }

  if (!isWithinExpirationDate(databaseToken.expiresAt)) {
    redirect("/forgot-password", { status: "error", text: "Your token is expired." }, cookies);
  }
  // Always return { form } in load functions
  return { form };
}

export const actions = {
  default: async ({ request, cookies, url }) => {
    const form = await superValidate(request, zod(resetPasswordSchema));

    if (!form.valid) return fail(400, { form });

    const token = url.searchParams.get('token');


    if (!token) {
      redirect("/forgot-password", { status: "error", text: "Your token is expired." }, cookies);
    }

    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
    const databaseToken = (await db.select().from(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'password_reset'))))[0];

    if (!databaseToken) {
      redirect("/login", { status: "error", text: "Invalid token." }, cookies);
    }

    if (!isWithinExpirationDate(databaseToken.expiresAt)) {
      redirect("/forgot-password", { status: "error", text: "Your token is expired." }, cookies);
    }

    await db.transaction(async (tx) => {
      await tx.delete(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'password_reset')));
      await tx.update(userTable).set({ emailVerified: true }).where(eq(userTable.id, databaseToken.userId));
    });

    const user = (await db.select().from(userTable).where(eq(userTable.id, databaseToken.userId)))[0];

    const hashedPassword = await new Argon2id().hash(form.data?.password || "");

    await db.update(userTable).set({ password: hashedPassword }).where(eq(userTable.id, user.id));

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect("/", { status: "success", text: "You successfully changed your password." }, cookies);
  },
};