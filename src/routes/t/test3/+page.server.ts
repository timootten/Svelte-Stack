import { sleep } from "$lib/utils";

export async function load({ locals, request, setHeaders, depends }) {
  depends("this")
  const secFetchSite = request.headers.get("sec-fetch-site");
  const directHit = !secFetchSite || secFetchSite === "none" || secFetchSite === "cross-site";

	
	console.log("handle", event.url.searchParams.toString());
	const isInvalidating = event.url.searchParams.get("x-sveltekit-invalidated");
	console.log("xa", isInvalidating);

	//console.log(secFetchSite, request);
  console.log("Called page", directHit);

  const takesShort = async () => {
    return { done: 'Xx' }
  };

   
  

  const takesLong = async () => {
    console.log("Expensive Starting")
    await sleep(5000)
     // expensive function
    console.log("Expensive");
    return { done: new Date().toLocaleString('de-de') }
  };

  return {
directHit,
clock: new Date().toLocaleString('de-de'),
    x: {
       takesLong: { done: new Date().toLocaleString('de-de')}
    }
  };
}