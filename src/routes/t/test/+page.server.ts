import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";



export async function load({ locals, parent }) {
  const users = await db.select().from(userTable);

  //await sleep(5000)

  return {
    users
  };
}