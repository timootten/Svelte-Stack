import { db } from "$lib/server/db";
import { addressSchema, addressTable, userTable } from "$lib/server/db/schema";
import { superValidate } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from "drizzle-orm";

const addressFormSchema = addressSchema.pick({
  street: true,
  city: true,
  state: true,
  zip: true,
  country: true,
});

export async function load(event) {
  const { locals: { user } } = event;
  if (!user) return redirect(301, '/auth/login');

  const address = await db.query.addressTable.findFirst({
    where: eq(addressTable.userId, user.id)
  });

  const addressForm = await superValidate(address || {}, zod(addressFormSchema));

  return { addressForm, user };
}

export const actions = {
  address: async ({ request, locals: { user } }) => {
    if (!user) return fail(401);
    const form = await superValidate(request, zod(addressFormSchema));

    if (!form.valid) return fail(400, { form });

    try {
      const existingAddress = await db.query.addressTable.findFirst({
        where: eq(addressTable.userId, user.id)
      });

      if (existingAddress) {
        // Update existing address
        await db.update(addressTable)
          .set(form.data)
          .where(eq(addressTable.id, existingAddress.id))
          .execute();
      } else {
        // Create new address
        await db.insert(addressTable)
          .values({
            ...form.data,
            userId: user.id
          })
          .execute();
      }
    } catch (error) {
      console.error(error);
      return message(form, { status: "error", text: "An error occurred while updating your address information." });
    }

    return message(form, { status: "success", text: "You have successfully updated your address information." });
  }
};