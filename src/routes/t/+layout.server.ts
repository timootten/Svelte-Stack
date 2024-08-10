

export const load = async ({ request, locals, cookies }) => {
  const secFetchSite = request.headers.get("sec-fetch-site");
  console.log(secFetchSite);
  let directHit = secFetchSite === "none" || secFetchSite === "cross-site";
  console.log(directHit);
  console.log(Math.random());

  return {
     directHit,
  }
};