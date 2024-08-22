import type { ServerWebSocket, WebSocketHandler } from "svelte-adapter-bun";
import { lucia } from '$lib/server/auth';
import cookie from 'cookie';

const clients: ServerWebSocket<{ auth_session: string; }>[] = [];

export const websocketHandler: WebSocketHandler<{ auth_session: string }> = {
  open(ws) {
    clients.push(ws);
    ws.send("test");
    ws.subscribe("broadcast");
    console.log("Client connected");
  },
  close(ws, code, message) {
    console.log("Client disconnected");
    clients.splice(clients.indexOf(ws), 1);
  },
  upgrade(request, upgrade) {
    const url = new URL(request.url);
    if (url.pathname !== "/ws") return false;

    const cookies = request.headers.get('cookie') || '';
    const parsedCookies = cookie.parse(cookies);
    return upgrade(request, {
      data: {
        auth_session: parsedCookies?.auth_session
      }
    });
  },
  async message(ws, message) {
    ws.subscribe("chat");
    console.log(message);
    if (message === "user") {
      const { session, user } = await lucia.validateSession(ws.data.auth_session);
      ws.send(JSON.stringify(session));
      ws.send(JSON.stringify(user));
    }
    ws.publish("broadcast", "Hello World");
    ws.send(message);
  },
};