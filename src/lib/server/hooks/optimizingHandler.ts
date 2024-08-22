import type { Handle } from '@sveltejs/kit';

export const optimizingHandler: Handle = async ({ event, resolve }) => {
  return resolve(event)
}