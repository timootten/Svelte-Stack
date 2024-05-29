

export async function load({ params }) {

  return { test: "Load" }
}

export const actions = {
  timePolling: async ({ request, cookies }) => {
    return { time: new Date().toLocaleString('de-DE') }
  },
  time: async ({ request, cookies }) => {
    return { time2: new Date().toLocaleString('de-DE') }
  },
};
