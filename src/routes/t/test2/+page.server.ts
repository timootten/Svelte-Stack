import { sleep } from "$lib/utils";

export async function load({ locals, request, setHeaders, depends }) {
  const secFetchSite = request.headers.get("sec-fetch-site");
  let directHit = secFetchSite === "none" || secFetchSite === "cross-site";
  
  const takesShort = async () => {
    await sleep(10)
    return { done: 'Xx' }
  };
if(directHit) return {
    directHit,
    clock: new Date().toLocaleString('de-de'),
    x: {
			takesLong: takesShort()
    }
  }

  const takesLong = async () => {
    await sleep(5000)
     // expensive function
    return { done: new Date().toLocaleString('de-de') }
  };

  return {
directHit,
clock: new Date().toLocaleString('de-de'),
    x: {
       takesLong: takesLong()
    }
  };
}