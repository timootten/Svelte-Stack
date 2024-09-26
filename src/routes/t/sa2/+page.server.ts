import { client } from "./client";


export async function load(event) {

  const x = await client.user.test.abc();

  return { x }

}