import * as devalue from 'devalue';
import type { RequestEvent } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { simpleHash } from '$lib/utils';
import { SAError } from './actionError';

type StripRequestEvent<T> = T extends (event: RequestEvent, data: infer D) => infer R
  ? D extends undefined
  ? () => R
  : (data: D) => R
  : T;

type ActionConfig<D, R> = {
  config: {
    handler: (event: RequestEvent, data: D) => R | Promise<R>;
  }
};

type NestedActionConfig = ActionConfig<any, any> | { [key: string]: NestedActionConfig };

type StrippedActions<T> = {
  [K in keyof T]: T[K] extends ActionConfig<infer D, infer R>
  ? StripRequestEvent<T[K]['config']['handler']>
  : T[K] extends object
  ? StrippedActions<T[K]>
  : never;
};

const internalClientHandler = <T extends Record<string, NestedActionConfig>>(path: string[] = []): StrippedActions<T> => {
  const handler: ProxyHandler<any> = {

    async apply(target, prop, args) {
      const currentPath = path.join('.');

      const requestData = {
        action: simpleHash(currentPath),
        data: args.length > 0 ? args[0] : undefined,
      };

      const URL = browser ? "" : process.env.BASE_URL || '';

      const response = await fetch(`${URL}/t/sa2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: devalue.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new SAError({
          message: errorText,
          status: response.status,
          code: response.statusText,
        });
      }

      return devalue.parse(await response.text());
    },
    get(target, prop: string, receiver) {
      return internalClientHandler([...path, prop]);
    },
  };

  return new Proxy(() => { }, handler) as StrippedActions<T>;
};

const clientHandler = <T extends Record<string, NestedActionConfig>>(): StrippedActions<T> => {
  return internalClientHandler();
};

export { clientHandler };