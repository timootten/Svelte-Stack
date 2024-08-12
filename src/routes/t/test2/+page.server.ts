import { sleep } from "$lib/utils";

export async function load({ locals, request, setHeaders, depends, url}) {
  depends("current:page")
  const secFetchSite = request.headers.get("sec-fetch-site");
  const directHit = !secFetchSite || secFetchSite === "none" || secFetchSite === "cross-site";

	//console.log(secFetchSite, request);
	//console.log(secFetchSite, request);

	console.log("page search", url.searchParams.toString());
	const isInvalidating = url.searchParams.get("x-sveltekit-invalidated");
	console.log("page invalidate", isInvalidating);

	console.log("Page", locals.directHit);
  console.log("Called page", directHit);
	//console.log("url", request);
	//console.log("XXX", request.headers);

   if(locals.directHit) return {}

  const takesLong = async () => {
    console.log("Expensive Starting")
    //await sleep(5000)
     // expensive function
    console.log("Expensive");
    await sleep(5000)
    return { done: new Date().toLocaleString('de-de') }
  };

  return {
directHit: locals.directHit,
clock: new Date().toLocaleString('de-de'),
    x: {
       takesLong: takesLong()
    }
  };
}