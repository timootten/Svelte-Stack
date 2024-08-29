import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { eq, ilike, or } from "drizzle-orm";
import argon2 from "argon2";
import { z } from "zod";
import { zxcvbn } from "@zxcvbn-ts/core";

const generalSchema = userSchema.pick({
  username: true,
  email: true,
});

const passwordSchema = z.object({
  password: userSchema.shape.password.unwrap(),
  confirmPassword: userSchema.shape.password.unwrap()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export async function load({ locals: { user } }) {
  const generalForm = await superValidate(user, zod(generalSchema));
  const passwordForm = await superValidate(zod(passwordSchema));

  return { generalForm, passwordForm, user };
}

export const actions = {
  general: async ({ request, locals: { user } }) => {
    if (!user) return fail(401);
    const form = await superValidate(request, zod(generalSchema));

    if (!form.valid) return fail(400, { form });

    try {
      const currentUser = await db.query.userTable.findFirst({
        where: or(ilike(userTable.email, form.data.email), ilike(userTable.username, form.data.username))
      })

      if (currentUser && form.data.email.toLowerCase() !== user.email.toLowerCase() && currentUser?.email.toLowerCase() === form.data.email.toLowerCase()) return setError(form, 'email', 'This email address has already been used.');

      if (currentUser && form.data.username.toLowerCase() !== user.username.toLowerCase() && currentUser?.username.toLowerCase() === form.data.username.toLowerCase()) return setError(form, 'username', 'This username is already taken.');

      await db.update(userTable).set({
        username: form.data.username,
        email: form.data.email,
        emailVerified: form.data.email === user.email ? user.emailVerified : false,
      }).where(eq(userTable.id, user.id)).execute();

    } catch (error) {

      return message(form, { status: "error", text: "An error occurred while updating your user information." });
    }
    return message(form, { status: "success", text: "You have successfully updated your user information." });
  },
  password: async ({ request, locals: { user } }) => {
    if (!user) return fail(401);
    const form = await superValidate(request, zod(passwordSchema));

    if (!form.valid) return fail(400, { form });

    if (zxcvbn(form.data.password || "").score < 3) return setError(form, 'password', 'Your password is too weak.');

    const updatedPassword = form.data.password ? await argon2.hash(form.data.password) : undefined;

    try {
      await db.update(userTable).set({
        password: updatedPassword,
      }).where(eq(userTable.id, user.id)).execute();

    } catch (error) {
      console.log(error)
      return message(form, { status: "error", text: "An error occurred while updating your password." });
    }
    return message(form, { status: "success", text: "You have successfully updated your password." });
  },
};