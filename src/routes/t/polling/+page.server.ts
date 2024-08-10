import { sleep } from "$lib/utils";
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
  redirect(302, '/t/test2');
  return { time: new Date().toLocaleString('de-DE') }
}

export const actions = {
  timePolling: async ({ request, cookies }) => {
    return { time: new Date().toLocaleString('de-DE') }
  },
  time: async ({ request, cookies }) => {
    return { time2: new Date().toLocaleString('de-DE') }
  },
};
