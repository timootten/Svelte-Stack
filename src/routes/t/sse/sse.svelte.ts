import { onMount } from "svelte";

type CancelCallback = () => void;

type SSE<T> = {
  emit: (data: T) => void;
  onCancel: (callback: CancelCallback) => void;
  getResponse: () => Response;
  close: () => void
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
    },
    close() {
      if (controller) {
        controller.close();
      }
    }
  };
};

export const useSSE = <T>({
  defaultValue,
  url = '',
  autoReconnect = true,
  reconnectInterval = 3000,
  json = true
}: {
  defaultValue: T;
  url?: string;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  json?: boolean;
}) => {
  const isJson = json;
  let value = $state<T>(defaultValue);
  let sse: EventSource;
  let reconnectTimeout: Timer;

  const connect = () => {
    sse = new EventSource(url);
    sse.onmessage = (e) => {
      const data = isJson ? JSON.parse(e.data) : e.data;
      value = data;
    };
    sse.onerror = () => {
      if (autoReconnect) {
        scheduleReconnect();
      }
    };
  };

  const close = () => {
    if (sse) {
      sse.close();
    }
    clearReconnectTimeout();
  };

  const reconnect = () => {
    close();
    connect();
  };

  const scheduleReconnect = () => {
    reconnectTimeout = setTimeout(() => {
      reconnect();
    }, reconnectInterval);
  };

  const clearReconnectTimeout = () => {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
  };

  onMount(() => {
    connect();
    return () => {
      close();
    };
  });

  return {
    get value() {
      return value
    },
    reconnect,
    close
  };
};


// createSSE should have this methods and used like this:
// const sse = createSSE();
// const interval = setInvertal(() => {
//    sse.emit(new Date().toLocalString());
// }, 1000)
// sse.onCancel(() => {
//    clearInterval(interval);
// })
// return sse.getResponse();