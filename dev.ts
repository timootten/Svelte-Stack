// dev.ts

import { createServer } from 'vite';
import { join } from 'path';
import { EventEmitter } from 'events';
import { IncomingMessage, ServerResponse } from 'http';
import type { Server, WebSocketHandler } from 'bun';
const fakeServer = new EventEmitter();

const vite = await createServer({
  ...(await import(join(process.cwd(), 'vite.config.ts'))),
  server: {
    hmr: {
      server: fakeServer as any
    },
    middlewareMode: true
  },
  appType: 'custom'
});

let bunternal = (socket: any) => {
  for (const prop of Object.getOwnPropertySymbols(socket)) {
    if (prop.toString().includes('bunternal')) {
      bunternal = () => prop;
      return prop as any;
    }
  }
};



const hooks = (await vite.ssrLoadModule('src/hooks.server.ts')) as any;

Bun.serve({
  port: 5173,
  async fetch(request: Request, server: Server) {
    let pendingResponse: Response | undefined;
    let pendingError: Error | undefined;

    let resolve: (response: Response) => void;
    let reject: (error: Error) => void;

    function raise(err: any) {
      if (pendingError) return;
      reject?.((pendingError = err));
    }

    function respond(res: Response) {
      if (pendingResponse) return;
      resolve?.((pendingResponse = res));
    }

    const req = new IncomingMessage(request as any);
    const res = new (ServerResponse as any)(req, respond);

    const socket = req.socket as any;
    socket[bunternal(socket)] = [server, res, request];

    req.once('error', raise);
    res.once('error', raise);

    const promise = new Promise<Response | undefined>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    if (request.headers.get('upgrade')) {
      if (request.headers.get('sec-websocket-protocol') === 'vite-hmr') {
        fakeServer.emit('upgrade', req, socket, Buffer.alloc(0));
        return;
      }
      const hooks = (await vite.ssrLoadModule('src/hooks.server.ts')) as any;
      /*if ('handleWebsocket' in hooks && hooks.handleWebsocket.upgrade(request, server?.upgrade)) {
        return;
      }*/
      if ('handleWebsocket' in hooks) {
        server.upgrade(request)
        return;
      }
    }

    vite.middlewares(req, res, (err: any) => {
      if (err) {
        vite.ssrFixStacktrace(err);
        raise(err);
      }
    });

    return promise;
  },
  // this is required for bun internal ws package to work, so the hooks.server.ts must match with this format.
  // ex: server.upgrade(req, { data: { message(ws, msg) { ... } } });
  websocket: {
    open(ws) {
      return hooks?.handleWebsocket?.open(ws);
    },
    message(ws, message) {
      return hooks?.handleWebsocket?.message(ws, message);
    },
    drain(ws) {
      return hooks?.handleWebsocket?.drain?.(ws);
    },
    close(ws, code, reason) {
      return hooks?.handleWebsocket?.drain?.(ws, code, reason);
    },
    ping(ws, buffer) {
      return hooks?.handleWebsocket?.ping?.(ws, buffer);
    },
    pong(ws, buffer) {
      return hooks?.handleWebsocket?.pong?.(ws, buffer);
    }
  } as WebSocketHandler<Pick<WebSocketHandler<any>, 'open' | 'message' | 'drain' | 'close' | 'ping' | 'pong'>>
});

console.log('Server running at http://localhost:5173');