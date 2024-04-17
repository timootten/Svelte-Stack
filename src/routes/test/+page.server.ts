import { db } from "$lib/server/db";
import { oAuthAccountTable, userTable } from "$lib/server/db/schema";
import { and, eq, ilike } from "drizzle-orm";
import { createDate, TimeSpan } from "oslo";



export async function load({ locals }) {
  const users = await db.select().from(userTable);


  console.log(createDate(new TimeSpan(2, "h")).toLocaleString())
  console.log(new Date().toLocaleString())



  console.log(createDate(new TimeSpan(2, "h")).toLocaleString() > new Date().toLocaleString())
  console.log()
  //console.log("existingUser", existingUser);

  return {
    users
  };
}