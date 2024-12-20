import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { ilike } from "drizzle-orm";
import argon2 from 'argon2';
import { github, google, lucia } from "$lib/server/auth/index.js";
import { redirect } from "sveltekit-flash-message/server";
import { dev } from "$app/environment";
import { generateCodeVerifier, generateState } from "arctic";
import { z } from "zod";
import { validateToken } from "$lib/server/auth/utils";
import { i18n } from "$lib/i18n";

const loginSchema = userSchema.pick({
  email: true,
  password: true,
}).extend({
  "cf-turnstile-response": z.string(),
});

export async function load({ params }) {
  const form = await superValidate(zod(loginSchema));

  // Always return { form } in load functions
  return { form };
}

export const actions = {
  login: async ({ request, cookies, fetch }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) return fail(400, { form });

    const { success, error } = await validateToken(form.data["cf-turnstile-response"]);

    if (error)
      return message(form, { status: "error", text: "Invalid Captcha, please wait a moment" }, { status: 401 });

    const user = await db.query.userTable.findFirst({
      where: ilike(userTable.email, form.data.email)
    });

    if (!user || user.password == null) return message(form, { status: "error", text: "Incorrect email or password." }, { status: 401 });

    if (!user.emailVerified) return message(form, { status: "error", text: "E-Mail is not verified." }, { status: 401 });

    const validPassword = await argon2.verify(user.password || "", form.data.password || "")

    if (!validPassword) return message(form, { status: "error", text: "Incorrect email or password." }, { status: 401 });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect(i18n.resolveRoute("/dashboard"), { status: "success", text: "You successfully logged in." }, cookies);
    //return message(form, { status: "success", text: "You successfully logged in." });
  },
  github: async ({ cookies }) => {
    const state = generateState();
    const url = github.createAuthorizationURL(state, ['user:email']);

    cookies.set('github_oauth_state', state, {
      path: '/',
      secure: !dev,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax'
    });

    return redirect(302, url.toString());
  },
  google: async ({ cookies }) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = google.createAuthorizationURL(state, codeVerifier, ["profile", "email"]);

    cookies.set('google_oauth_state', state, {
      path: '/',
      secure: !dev,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax'
    });

    cookies.set('google_oauth_verifier', codeVerifier, {
      path: '/',
      secure: !dev,
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax'
    });

    return redirect(302, url.toString());
  }
};