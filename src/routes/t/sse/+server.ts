import { createSSE } from "./sse.svelte";


export type TYPE = {
  time: string
}

export async function GET({ url }) {
  const sse = createSSE<TYPE>();
  sse.emit({ time: new Date().toLocaleString('de-DE') });
  const interval = setInterval(() => {
    sse.emit({ time: new Date().toLocaleString('de-DE') });
  }, 1000)
  sse.onCancel(() => {
    clearInterval(interval);
  })
  return sse.getResponse();
}