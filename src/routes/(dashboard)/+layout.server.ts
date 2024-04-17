// Need this to force hooks to react

export async function load({ locals }) {

  return { user: locals.user }
};