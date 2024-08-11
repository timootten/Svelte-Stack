import { sleep } from "$lib/utils";

export async function load({ locals, request, setHeaders, depends }) {
  const secFetchSite = request.headers.get("sec-fetch-site");
  const directHit = !secFetchSite || secFetchSite === "none" || secFetchSite === "cross-site";

	//console.log(secFetchSite, request);
  console.log("Called page", directHit);

   if(directHit) return {}

  const takesLong = async () => {
    console.log("Expensive");
    await sleep(5000)
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