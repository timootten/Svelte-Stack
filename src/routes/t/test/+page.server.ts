import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";

export async function load({ locals, parent }) {

  const getUsers = async () => {
    const users = await db.select().from(userTable);
    await sleep(5000)
    return users;
  }

  return {
    users: getUsers()
  };
}