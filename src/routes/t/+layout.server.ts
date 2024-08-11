

export const load = async ({ request, locals, cookies }) => {
  const secFetchSite = request.headers.get("sec-fetch-site");
  let directHit = !secFetchSite || secFetchSite === "none" || secFetchSite === "cross-site";
 
  console.log("Layout called Twice");

  return {
     directHit,
  }
};