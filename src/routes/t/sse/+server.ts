import { createSSE } from "./sse";

export type TYPE = {
  time: string
}

export async function GET({ url }) {
  const sse = createSSE<TYPE>();
  sse.emit({ time: new Date().toLocaleString() });
  const interval = setInterval(() => {
    sse.emit({ time: new Date().toLocaleString() });
  }, 1000)
  sse.onCancel(() => {
    clearInterval(interval);
  })
  return sse.getResponse();
}