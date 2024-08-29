import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import type { Handle } from '@sveltejs/kit';

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

export const rateLimitHandler: Handle = async ({ event, resolve }) => {
  try {
    const url = new URL(event.request.url);
    if (event.request.method === "POST") {
      if (/^\?\/[a-zA-Z0-9]*Polling$/.test(url.search)) {
        const status = await pollingLimiter.check(event);
        if (status.limited) {
          return new Response(`You are sending too many requests. Please try after ${status.retryAfter} seconds.`, { status: 429 });
        }
      } else {
        const status = await postLimiter.check(event);
        if (status.limited) {
          return new Response(`You are sending too many requests. Please try after ${status.retryAfter} seconds.`, { status: 429 });
        }
      }
    }
    if (event.request.method === "GET") {
      const status = await getLimiter.check(event);
      if (status.limited) {
        return new Response(`You are sending too many requests. Please try after ${status.retryAfter} seconds.`, { status: 429 });
      }
    }
  } catch (error) {
    //console.log(error)
    // event.getClientAdress during prerender is not accessible
  }
  return resolve(event);
};