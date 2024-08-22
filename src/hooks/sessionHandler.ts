import { lucia } from '$lib/server/auth';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

export const sessionHandler: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    await checkValidPath(event);
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  await checkValidPath(event);
  return resolve(event);
};

const checkValidPath = async (event: RequestEvent<Partial<Record<string, string>>, string | null>) => {
  const path = extractRouteParam(event.route.id);
  const exactPath = event.route.id?.toLowerCase();
  if (exactPath?.includes("email")) return;
  switch (path) {
    case 'auth':
      if (event.locals.user) {
        return redirect(302, '/dashboard');
      }
      break;
    case 'dashboard':
      if (!event.locals.user) {
        return redirect(302, '/auth/login');
      }
      break;
    default:
      break;
  }
};

const extractRouteParam = (path: string | null) => {
  return path?.replace(/[()]/g, '').split("/")[1].toLowerCase() ?? undefined;
};