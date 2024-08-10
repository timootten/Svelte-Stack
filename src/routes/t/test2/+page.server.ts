import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { sleep } from "$lib/utils";
import { redirect } from '@sveltejs/kit';

//export const ssr = false;

export async function load({ locals, request, setHeaders, depends }) {
  depends('x');
  console.log(request.headers);
  const secFetchSite = request.headers.get("sec-fetch-site");
  console.log(secFetchSite);
  let directHit = secFetchSite === "none" || secFetchSite === "cross-site";
  console.log(directHit);

  return {
directHit,
clock: new Date().toLocaleString('de-de'),
    x: {
       takesLong: takesLong()
    }
  };
}