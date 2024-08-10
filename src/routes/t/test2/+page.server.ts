import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";
import { redirect } from '@sveltejs/kit';

export async function load({ locals, request, setHeaders }) {
  const secFetchSite = request.headers.get("sec-fetch-site");
  console.log(secFetchSite);
  let directHit = secFetchSite === "none" || secFetchSite === "cross-site";
  console.log(directHit);
  console.log(Math.random());

	setHeaders({
		'sec-fetch-site': 'same-origin'
	});

  //if(directHit) redirect(302, '/t/test2');

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