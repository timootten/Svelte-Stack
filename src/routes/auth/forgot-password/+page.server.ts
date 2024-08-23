import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { eq, ilike, or } from "drizzle-orm";
import { sendPasswordResetEmail, validateToken } from "$lib/server/auth/utils.js";
import { z } from "zod";

const forgotPasswordSchema = userSchema.pick({
  email: true,
}).extend({
  "cf-turnstile-response": z.string(),
});

export async function load({ params }) {
  const form = await superValidate(zod(forgotPasswordSchema));

  // Always return { form } in load functions
  return { form };
}

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(forgotPasswordSchema));

    if (!form.valid) return fail(400, { form });

    const { success, error } = await validateToken(form.data["cf-turnstile-response"]);

    if (error)
      return message(form, { status: "error", text: "Invalid Captcha, please wait a moment" }, { status: 401 });

    const user = await db.query.userTable.findFirst({
      where: ilike(userTable.email, form.data.email),
    });

    if (user) {
      console.log("23232323")
      sendPasswordResetEmail(user.id, user.email, user.username);
    }

    return message(form, { status: "success", text: "If a user is registered with this email, a password reset link has been sent. Please check your inbox, including spam folders, for further instructions." });
  },
};