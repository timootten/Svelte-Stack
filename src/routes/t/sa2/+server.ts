import { actions } from './actions';
import { serverHandler } from './lib/serverHandler';

const handler = serverHandler(actions);

export const POST = handler.POST;