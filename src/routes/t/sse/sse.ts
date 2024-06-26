import { onMount } from "svelte";
import { writable } from "svelte/store";

type CancelCallback = () => void;

type SSE<T> = {
  emit: (data: T) => void;
  onCancel: (callback: CancelCallback) => void;
  getResponse: () => Response;
};

export const createSSE = <T extends Record<string, unknown>>(): SSE<T> => {
  let cancelCallback: CancelCallback | null = null;
  let controller: ReadableStreamDefaultController<string> | null = null;

  const stream = new ReadableStream<string>({
    start(ctrl) {
      controller = ctrl;
    },
    cancel() {
      if (cancelCallback) {
        cancelCallback();
      }
    }
  });

  const response = new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });

  return {
    emit(data: T) {
      if (controller) {
        const eventData = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(eventData);
      }
    },
    onCancel(callback: CancelCallback) {
      cancelCallback = callback;
    },
    getResponse() {
      return response;
    }
  };
};

export const useSSE = <T extends Record<string, unknown>>({ defaultValue }: { defaultValue: T }) => {
  const result = writable<T>(defaultValue);

  onMount(() => {
    const sse = new EventSource('');
    sse.onmessage = (e) => result.set(JSON.parse(e.data));
    return () => sse.close();
  })

  return result;
}
// createSSE should have this methods and used like this:
// const sse = createSSE();
// const interval = setInvertal(() => {
//    sse.emit(new Date().toLocalString());
// }, 1000)
// sse.onCancel(() => {
//    clearInterval(interval);
// })
// return sse.getResponse();