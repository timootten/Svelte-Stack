import { db } from "$lib/server/db";
import { oAuthAccountTable, userTable } from "$lib/server/db/schema";
import { and, eq, ilike } from "drizzle-orm";



export async function load({ locals }) {
  const users = await db.select().from(userTable);

  const existingUser = (await db
    .select()
    .from(userTable)
    .where(and(ilike(userTable.email, "timootten@icloud.com"), eq(oAuthAccountTable.providerId, "github")))
    .innerJoin(oAuthAccountTable, eq(userTable.id, oAuthAccountTable.userId)).limit(1))[0]

  console.log("existingUser", existingUser);

  return {
    users
  };
}