import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { sessionHandler } from './lib/server/hooks/sessionHandler';
import { rateLimitHandler } from './lib/server/hooks/rateLimitHandler';
import { websocketHandler } from './lib/server/hooks/websocketHandler';
import { themeHandler } from './lib/server/hooks/themeHandler';
import { databaseHandler } from '$lib/server/hooks/databaseHandler';

export const handle = sequence(i18n.handle(), rateLimitHandler, databaseHandler, sessionHandler, themeHandler)
export { websocketHandler as handleWebsocket };