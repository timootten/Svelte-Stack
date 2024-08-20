import { i18n } from '$lib/i18n'
import { sequence } from '@sveltejs/kit/hooks'
import { lucia } from '$lib/server/auth';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import type { ServerWebSocket, WebSocketHandler } from "svelte-adapter-bun";
import cookie from 'cookie';

const postLimiter = new RetryAfterRateLimiter({
  IP: [15, "30s"],
  IPUA: [10, "15s"],
});

const getLimiter = new RetryAfterRateLimiter({
  IP: [30, "30s"],
  IPUA: [20, "15s"],
});

const pollingLimiter = new RetryAfterRateLimiter({
  IP: [65, "30s"],
  IPUA: [35, "15s"],
});


export const limiter: Handle = async ({ event, resolve }) => {
  //const isInvalidating = new URL(event.request.url).searchParams.get("x-sveltekit-invalidated") ? true : false;
  //const secFetchSite = event.request.headers.get("sec-fetch-site");
  //const directHit = !isInvalidating && (!secFetchSite || secFetchSite === "none" || secFetchSite === "cross-site");

  try {
    const url = new URL(event.request.url)
    if (event.request.method === "POST") {
      if (/^\?\/[a-zA-Z0-9]*Polling$/.test(url.search)) {
        const status = await pollingLimiter.check(event);
        if (status.limited) {
          let response = new Response(`You are sending too many requests. Please try after ${status.retryAfter} seconds.`,
            {
              status: 429,
            }
          );
          return response;
        }
      } else {
        const status = await postLimiter.check(event);
        if (status.limited) {
          let response = new Response(`You are sending too many requests. Please try after ${status.retryAfter} seconds.`,
            {
              status: 429,
            }
          );
          return response;
        }
      }
    }
    if (event.request.method === "GET") {
      const status = await getLimiter.check(event);
      if (status.limited) {
        let response = new Response(`You are sending too many requests. Please try after ${status.retryAfter} seconds.`,
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
  //if (!isConnected)
  //error(500, "Database connection error")

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
        return redirect(302, i18n.resolveRoute("/dashboard"));
      }
      break;
    case 'dashboard':
      if (!event.locals.user) {
        return redirect(302, i18n.resolveRoute("/auth/login"));
      }
      break;
    default:
      break;
  }
}

const extractRouteParam = (path: string | null) => {
  return path?.replace(/[()]/g, '').split("/")[1].toLowerCase() ?? undefined;
};


const clients: ServerWebSocket<{
  auth_session: string;
}>[] = [];

export const handleWebsocket: WebSocketHandler<{ auth_session: string }> = {
  open(ws) {
    clients.push(ws);
    ws.send("test");
    ws.subscribe("broadcast")
    console.log("Client connected");
  },
  close(ws, code, message) {
    // add remove clients
    console.log("Client disconnected");
    clients.splice(clients.indexOf(ws), 1);
  },
  upgrade(request, upgrade) {
    const url = new URL(request.url);
    if (url.pathname !== "/ws") return false;

    const cookies = request.headers.get('cookie') || '';
    const parsedCookies = cookie.parse(cookies);
    return upgrade(request, {
      data: {
        auth_session: parsedCookies?.auth_session
      }
    });
  },
  async message(ws, message) {
    ws.subscribe("chat")
    console.log(message)
    if (message === "user") {
      const { session, user } = await lucia.validateSession(ws.data.auth_session);
      ws.send(JSON.stringify(session));
      ws.send(JSON.stringify(user));
    }
    const x = ws.publish("broadcast", "Hello World");
    ws.send(message);
  },
};

export const handle = sequence(i18n.handle(), limiter)