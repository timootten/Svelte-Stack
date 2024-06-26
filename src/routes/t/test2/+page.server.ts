import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";

export async function load({ locals }) {
  const users = await db.select().from(userTable);


  const takesLong = async () => {
    await sleep(5000)
    return { done: true }
  };

  return {
    users,
    takesLong: takesLong()
  };
}