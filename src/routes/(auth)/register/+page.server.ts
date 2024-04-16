import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { eq, ilike, or } from "drizzle-orm";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth/index.js";
import { setFlash } from "sveltekit-flash-message/server";


const registerSchema = userSchema.pick({
  username: true,
  email: true,
  password: true,
});

export async function load({ params }) {
  const form = await superValidate(zod(registerSchema));

  // Always return { form } in load functions
  return { form };
}

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(registerSchema));

    if (!form.valid) return fail(400, { form });

    const user = await db.query.userTable.findFirst({
      where: or(ilike(userTable.email, form.data.email), ilike(userTable.username, form.data.username))
    })

    if (user && user?.email.toLowerCase() === form.data.email.toLowerCase()) return setError(form, 'email', 'Your email address has already been used.');

    if (user && user?.username.toLowerCase() === form.data.username.toLowerCase()) return setError(form, 'username', 'This username is already taken.');

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(form.data?.password || "");

    await db.insert(userTable).values({
      id: userId,
      username: form.data.username,
      email: form.data.email,
      password: hashedPassword
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    setFlash({ status: "success", text: "You successfully registered." }, cookies);
    return message(form, { status: "success", text: "You successfully registered." });
  }
};