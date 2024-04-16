import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { eq, ilike, or } from "drizzle-orm";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { github, lucia } from "$lib/server/auth/index.js";
import { redirect } from "sveltekit-flash-message/server";
import { dev } from "$app/environment";
import { generateState } from "arctic";

const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export async function load({ params }) {
  const form = await superValidate(zod(loginSchema));

  // Always return { form } in load functions
  return { form };
}

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) return fail(400, { form });

    const user = await db.query.userTable.findFirst({
      where: ilike(userTable.email, form.data.email)
    })

    if (!user || user.password == null) return message(form, { status: "error", text: "Incorrect email or password." }, { status: 401 });

    const validPassword = await new Argon2id().verify(user.password || "", form.data.password || "");

    if (!validPassword) return message(form, { status: "error", text: "Incorrect email or password." }, { status: 401 });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect("/", { status: "success", text: "You successfully logged in." }, cookies);
    //return message(form, { status: "success", text: "You successfully logged in." });
  },
  github: async ({ cookies }) => {
    const state = generateState();
    const url = await github.createAuthorizationURL(state, {
      scopes: ['user:email']
    });

    cookies.set('github_oauth_state', state, {
      path: '/',
      secure: !dev,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax'
    });

    return redirect(302, url.toString());
  }
};