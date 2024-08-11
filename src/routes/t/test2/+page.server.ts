import { sleep } from "$lib/utils";

export async function load({ locals, request, setHeaders, depends }) {
  const secFetchSite = request.headers.get("sec-fetch-site");
  let directHit = secFetchSite === "none" || secFetchSite === "cross-site";
  
  console.log("Called page");

  const takesShort = async () => {
    return { done: 'Xx' }
  };

   //if(directHit) return {
    /*directHit,
    clock: new Date().toLocaleString('de-de'),
    x: {
			takesLong: takesShort()
    }*/
  //}

  const takesLong = async () => {
    await sleep(5000)
     // expensive function
    console.log("Expensive");
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