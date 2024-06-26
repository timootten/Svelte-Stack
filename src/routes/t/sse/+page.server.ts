import { sleep } from "$lib/utils";


export async function load({ params }) {

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
