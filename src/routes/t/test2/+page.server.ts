import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";

export async function load({ locals, request }) {
  const users = await db.select().from(userTable);
  console.log(request.headers);
  console.log(Math.random());

  const takesLong = async () => {
    await sleep(5000)
    return { done: true }
  };

  return {
    users,
    x: {
       takesLong: takesLong()
    }
  };
}