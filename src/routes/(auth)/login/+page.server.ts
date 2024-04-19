import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { eq, ilike, or } from "drizzle-orm";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { github, google, lucia } from "$lib/server/auth/index.js";
import { redirect } from "sveltekit-flash-message/server";
import { dev } from "$app/environment";
import { generateCodeVerifier, generateState } from "arctic";
import { z } from "zod";

const loginSchema = userSchema.pick({
  email: true,
  password: true,
}).extend({
  "cf-turnstile-response": z.string(),
});

export async function load({ params }) {
  const form = await superValidate(zod(loginSchema));

  // Always return { form } in load functions
  return { form, CLOUDFLARE_CAPTCHA_SITE_KEY: process.env.CLOUDFLARE_CAPTCHA_SITE_KEY };
}

export const actions = {
  login: async ({ request, cookies, fetch }) => {
    const form = await superValidate(request, zod(loginSchema));
    console.log(JSON.stringify(form))
    if (!form.valid) return fail(400, { form });

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          response: form.data["cf-turnstile-response"],
          secret: process.env.CLOUDFLARE_CAPTCHA_SECRET_KEY,
        }),
      },
    );

    console.log("XXX", await response.json());

    const user = await db.query.userTable.findFirst({
      where: ilike(userTable.email, form.data.email)
    })

    if (!user || user.password == null) return message(form, { status: "error", text: "Incorrect email or password." }, { status: 401 });

    if (!user.emailVerified) return message(form, { status: "error", text: "E-Mail is not verified." }, { status: 401 });

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
  },
  google: async ({ cookies }) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"]
    });

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