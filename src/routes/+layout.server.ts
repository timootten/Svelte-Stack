import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async ({ locals, cookies }) => {

  return {
    user: locals.user
  }
});