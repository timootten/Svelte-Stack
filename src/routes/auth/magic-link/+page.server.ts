import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { ilike } from "drizzle-orm";
import { sendMagicLinkEmail, validateToken } from "$lib/server/auth/utils.js";
import { z } from "zod";

const magicLinkSchema = userSchema.pick({
  email: true,
}).extend({
  "cf-turnstile-response": z.string(),
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

    const { success, error } = await validateToken(form.data["cf-turnstile-response"]);

    if (error)
      return message(form, { status: "error", text: "Invalid Captcha, please wait a moment" }, { status: 401 });

    const user = await db.query.userTable.findFirst({
      where: ilike(userTable.email, form.data.email),
    });

    if (user) {
      sendMagicLinkEmail(user.id, user.email, user.username);
    }

    return message(form, { status: "success", text: "If a user is registered with this email, a magic link has been sent. Please check your inbox, including spam folders, for further instructions." });
  },
};