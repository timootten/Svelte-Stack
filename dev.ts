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

const bunternal = Symbol.for('::bunternal::');

const hooks = (await vite.ssrLoadModule('src/hooks.server.ts')) as any;

const server = Bun.serve({
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
    socket[bunternal] = [fakeServer, res, request];

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
      const upgradeMethod = server.upgrade.bind(server);
      if ('handleWebsocket' in hooks && hooks.handleWebsocket.upgrade(request, upgradeMethod)) {
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
      if (ws?.data?.open) return ws.data.open?.(ws);
      return hooks?.handleWebsocket?.open(ws);
    },
    message(ws, message) {
      if (ws?.data?.message) return ws.data.message(ws, message);
      return hooks?.handleWebsocket?.message(ws, message);
    },
    drain(ws) {
      if (ws?.data?.drain) return ws.data.drain?.(ws);
      return hooks?.handleWebsocket?.drain?.(ws);
    },
    close(ws, code, reason) {
      if (ws?.data?.close) return ws.data.close?.(ws, code, reason);
      return hooks?.handleWebsocket?.drain?.(ws, code, reason);
    },
    ping(ws, buffer) {
      if (ws?.data?.ping) return ws.data.ping?.(ws, buffer);
      return hooks?.handleWebsocket?.ping?.(ws, buffer);
    },
    pong(ws, buffer) {
      if (ws?.data?.pong) return ws.data.pong?.(ws, buffer);
      return hooks?.handleWebsocket?.pong?.(ws, buffer);
    }
  } as WebSocketHandler<Pick<WebSocketHandler<any>, 'open' | 'message' | 'drain' | 'close' | 'ping' | 'pong'>>
});

fakeServer[bunternal] = server;

console.log('Server running at http://localhost:5173');