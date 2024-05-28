import { lucia } from '$lib/server/auth';
import { isConnected } from '$lib/server/db';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { RateLimiter, RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';

const postLimiter = new RetryAfterRateLimiter({
  IP: [15, "30s"],
  IPUA: [10, "15s"],
});

const getLimiter = new RetryAfterRateLimiter({
  IP: [30, "30s"],
  IPUA: [20, "15s"],
});

export const handle: Handle = async ({ event, resolve }) => {
  try {
    if (event.request.method === "POST") {
      const status = await postLimiter.check(event);
      if (status.limited) {
        let response = new Response(
          JSON.stringify({ message: `You are sending too many requests. Please try after ${status.retryAfter} seconds.` }),
          {
            status: 429,
          }
        );
        return response;
      }
    }
    if (event.request.method === "GET") {
      const status = await getLimiter.check(event);
      if (status.limited) {
        let response = new Response(
          JSON.stringify({ message: `You are sending too many requests. Please try after ${status.retryAfter} seconds.` }),
          {
            status: 429,
          }
        );
        return response;
      }
    }
  } catch (error) {
    // event.getClientAdress during prerender is not accessable
  }
  if (!isConnected)
    error(500, "Database connection error")

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
        return redirect(302, "/dashboard");
      }
      break;
    case 'dashboard':
      if (!event.locals.user) {
        return redirect(302, "/auth/login");
      }
      break;
    default:
      break;
  }
}

const extractRouteParam = (path: string | null) => {
  return path?.replace(/[()]/g, '').split("/")[1].toLowerCase() ?? undefined;
};
