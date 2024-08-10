import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";

export async function load({ locals, request }) {
  const secFetchSite = request.headers.get("sec-fetch-site");
  console.log(secFetchSite);
  let directHit = secFetchSite === "none" || secFetchSite === "cross-site";
  console.log(directHit);
  console.log(Math.random());

  if(directHit) redirect(302, '/t/test2');

  const takesLong = async () => {
    await sleep(5000)
    return { done: true }
  };

  return {
    directHit: false,
    x: {
       takesLong: takesLong()
    }
  };
}