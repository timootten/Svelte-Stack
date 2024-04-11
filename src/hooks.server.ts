import { lucia } from '$lib/server/auth';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  console.log("ORIGIN: ", event.url.origin);
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
  switch (path) {
    case 'auth':
      if (event.locals.user) {
        return redirect(302, "/");
      }
      break;
    case 'dashboard':
      if (!event.locals.user) {
        return redirect(302, "/login");
      }
      break;
    default:
      break;
  }
}

const extractRouteParam = (path: string | null) => {
  const match = path?.match(/\((\w+)\)/);
  return match ? match[1] : undefined;
};
