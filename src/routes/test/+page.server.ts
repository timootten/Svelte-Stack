import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";



export async function load() {
  const users = await db.select().from(user);

  return {
    users
  };
}