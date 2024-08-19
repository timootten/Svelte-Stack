import { getUser } from '../../../lib/server/actions.js';


export async function load({ }) {
  let user = await getUser({ id: "123" });

  console.log(user)
}