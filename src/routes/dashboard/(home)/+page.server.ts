import { lucia } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

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
    redirect("/auth/login", {
      status: "success", text: "You have successfully logged out."
    }, event);
  }
};