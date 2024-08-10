import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";
import { redirect } from '@sveltejs/kit';

export async function load({ locals, request, setHeaders }) {
 const secFetchSite = request.headers.get("sec-fetch-site");
  console.log(secFetchSite);
  let directHit = secFetchSite === "none" || secFetchSite === "cross-site";
  console.log(directHit);

  //if(directHit) return { }

  const takesLong = async () => {
    await sleep(5000)
    return { done: true }
  };

  return {
    
    x: {
       takesLong: takesLong()
    }
  };
}