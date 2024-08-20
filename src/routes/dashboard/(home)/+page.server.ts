import { i18n } from '$lib/i18n';
import { lucia } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

export function load() {
  throw redirect(307, i18n.resolveRoute('/dashboard/products'));
}

export const actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    redirect(i18n.resolveRoute("/auth/login"), {
      status: "success", text: "You have successfully logged out."
    }, event);
  }
};