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
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { dev } from "$app/environment";
import { generateState } from "arctic";
import { sendMagicLinkEmail, sendPasswordResetEmail } from "$lib/server/auth/utils.js";

const magicLinkSchema = userSchema.pick({
  email: true,
});

export async function load({ params }) {
  const form = await superValidate(zod(magicLinkSchema));

  // Always return { form } in load functions
  return { form };
}

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(magicLinkSchema));

    if (!form.valid) return fail(400, { form });

    const user = await db.query.userTable.findFirst({
      where: ilike(userTable.email, form.data.email),
    });

    if (user) {
      sendMagicLinkEmail(user.id, user.email, user.username);
    }

    return message(form, { status: "success", text: "If a user is registered with this email, a magic link has been sent. Please check your inbox, including spam folders, for further instructions." });
  },
};