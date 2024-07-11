import { db } from "$lib/server/db";
import { userSchema, userTable } from "$lib/server/db/schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { eq } from "drizzle-orm";

const generalSchema = userSchema.pick({
  username: true,
  email: true,
});

export async function load({ params, locals: { user } }) {
  const generalForm = await superValidate(user, zod(generalSchema));
  return { generalForm };
}

export const actions = {
  general: async ({ request, locals: { user } }) => {
    if (!user) return fail(401);
    const form = await superValidate(request, zod(generalSchema));

    if (!form.valid) return fail(400, { form });

    try {
      await db.update(userTable).set({
        username: form.data.username,
        email: form.data.email,
        emailVerified: form.data.email === user.email ? user.emailVerified : false,
      }).where(eq(userTable.id, user!.id)).execute();

    } catch (error) {
      console.log(error)
      return message(form, { status: "error", text: "An error occurred while updating your user information." });
    }
    return message(form, { status: "success", text: "You have successfully updated your user information." });
  },
};