import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async ({ locals, cookies }) => {

  return {
    user: locals.user, CLOUDFLARE_CAPTCHA_SITE_KEY: process.env.CLOUDFLARE_CAPTCHA_SITE_KEY || "", theme: locals.theme
  }
});