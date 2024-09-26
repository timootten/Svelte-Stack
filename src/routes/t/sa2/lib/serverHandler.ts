import * as actions from '$lib/server/actions';
import { simpleHash } from '$lib/utils.js';
import type { RequestEvent } from '@sveltejs/kit';
import * as devalue from 'devalue';
import type { ActionConfig } from './createAction';
import { SAError } from './actionError';
import { ZodError } from 'zod';

const hashedActions: { [key: string]: ActionConfig } = {};

const hashActions = (actions: { [key: string]: any }, parentKey: string = '') => {
  for (const key in actions) {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof actions[key] === 'object' && !actions[key].config) {
      hashActions(actions[key], currentKey);
    } else {
      hashedActions[simpleHash(currentKey)] = actions[key].config;
    }
  }
};


export const serverHandler = (actions: object) => {
  hashActions(actions);

  return {
    POST: postHandler
  }
};

export const postHandler = async (event: RequestEvent) => {
  try {
    const input = devalue.parse(await event.request.text());
    const config = hashedActions[input.action];

    if (!config) {
      return new Response("Function not found!", {
        status: 400
      });
    }

    // parse data with schema
    if (config.schema) {
      try {
        input.data = config.schema.parse(input.data);
      } catch (error) {
        if (error instanceof ZodError) {
          throw new SAError({
            message: error.errors[0].message,
            status: 400,
            code: 'BAD_REQUEST',
            zodErrors: error.errors
          });
        } else {
          throw error;
        }
      }
    }

    let context = { ...event };
    let inputData = { ...input.data }

    // Execute middlewares with next() pattern
    let index = 0;

    const next = async (): Promise<void> => {
      if (index !== config.middlewares.length) {
        await config.middlewares[index++]({ ...context, next }, inputData);
      }
    };

    await next();


    // After middlewares, execute the handler only if the middleware chain was not interrupted
    if (index === config.middlewares.length) {
      const result = await config.handler(context, inputData);
      return new Response(devalue.stringify(result), { status: 200 });
    } else {
      return new Response('Middleware chain was interrupted', { status: 400 });
    }

  } catch (error) {
    if (error instanceof SAError) {
      return new Response(error.message, {
        status: error.status,
        statusText: error.code
      });
    }
    if (error instanceof Error) {
      return new Response(error.message, {
        status: 400
      });
    }
  }
};

