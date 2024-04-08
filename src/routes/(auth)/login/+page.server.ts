import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";



export async function load() {
  const users = await db.select().from(userTable);

  return {
    users
  };
}