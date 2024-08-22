import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { sessionHandler } from './hooks/sessionHandler';
import { rateLimitHandler } from './hooks/rateLimitHandler';
import { websocketHandler } from './hooks/websocketHandler';
import { themeHandler } from './hooks/themeHandler';

export const handle = sequence(i18n.handle(), rateLimitHandler, sessionHandler);
export { websocketHandler as handleWebsocket };