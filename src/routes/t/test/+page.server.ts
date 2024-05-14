import { db } from "$lib/server/db";
import { oAuthAccountTable, userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils.js";
import { and, eq, ilike } from "drizzle-orm";
import { createDate, TimeSpan } from "oslo";



export async function load({ locals, parent }) {

  const users = await db.select().from(userTable);

  await sleep(5000)

  return {
    users
  };
}