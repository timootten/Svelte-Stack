import { db } from "$lib/server/db";
import { tokenTable, userSchema, userTable } from "$lib/server/db/schema";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { and, eq } from "drizzle-orm";
import argon2 from 'argon2';
import { lucia } from "$lib/server/auth/index.js";
import { redirect } from "sveltekit-flash-message/server";
import { encodeHex } from "oslo/encoding";
import { sha256 } from "oslo/crypto";
import { isWithinExpirationDate } from "oslo";
import { z } from "zod";
import { validateToken } from "$lib/server/auth/utils.js";
import { i18n } from "$lib/i18n";

const resetPasswordSchema = userSchema.pick({
  password: true,
}).extend({
  "cf-turnstile-response": z.string(),
});

export async function load({ url, cookies }) {
  const form = await superValidate(zod(resetPasswordSchema));

  const token = url.searchParams.get('token');

  if (!token) {
    redirect(i18n.resolveRoute("/auth/login"), { status: "error", text: "Invalid token." }, cookies);
  }

  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
  const databaseToken = (await db.select().from(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'password_reset'))))[0];

  if (!databaseToken) {
    redirect(i18n.resolveRoute("/auth/login"), { status: "error", text: "Invalid token." }, cookies);
  }

  if (!isWithinExpirationDate(databaseToken.expiresAt)) {
    redirect(i18n.resolveRoute("/auth/forgot-password"), { status: "error", text: "Your token is expired." }, cookies);
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
      redirect(i18n.resolveRoute("/auth/forgot-password"), { status: "error", text: "Invalid token." }, cookies);
    }

    const { success, error } = await validateToken(form.data["cf-turnstile-response"]);

    if (error)
      return message(form, { status: "error", text: "Invalid Captcha, please wait a moment" }, { status: 401 });

    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
    const databaseToken = (await db.select().from(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'password_reset'))))[0];

    if (!databaseToken) {
      redirect(i18n.resolveRoute("/auth/login"), { status: "error", text: "Invalid token." }, cookies);
    }

    if (!isWithinExpirationDate(databaseToken.expiresAt)) {
      redirect(i18n.resolveRoute("/auth/forgot-password"), { status: "error", text: "Your token is expired." }, cookies);
    }

    await db.transaction(async (tx) => {
      await tx.delete(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'password_reset')));
      await tx.update(userTable).set({ emailVerified: true }).where(eq(userTable.id, databaseToken.userId));
    });

    const user = (await db.select().from(userTable).where(eq(userTable.id, databaseToken.userId)))[0];

    const hashedPassword = await argon2.hash(form.data?.password || "");

    await db.update(userTable).set({ password: hashedPassword }).where(eq(userTable.id, user.id));

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect(i18n.resolveRoute("/dashboard"), { status: "success", text: "You successfully changed your password." }, cookies);
  },
};