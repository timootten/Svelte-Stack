import * as devalue from 'devalue';
import type * as actionFunctions from '$lib/server/actions';
import { simpleHash } from '$lib/utils';
import type { RequestEvent } from '@sveltejs/kit';

type Actions = {
  [K in keyof typeof actionFunctions]: typeof actionFunctions[K];
};

type StripRequestEvent<T> = T extends (...args: infer A) => infer R
  ? (...args: A extends [...infer Rest, RequestEvent<any, any>] ? Rest : A) => R
  : T;

type StrippedActions = {
  [K in keyof Actions]: StripRequestEvent<Actions[K]>;
};

const client = (): StrippedActions => {
  const handler: ProxyHandler<Actions> = {
    get(target, prop: keyof StrippedActions) {
      return async (...args: any[]) => {
        const data = {
          action: simpleHash(prop),
          data: args,
        };

        const response = await fetch('/t/sa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: devalue.stringify(data),
        });


        if (!response.ok) {
          throw new Error(await response.text());
        }

        return devalue.parse(await response.text());
      };
    },
  };

  return new Proxy({} as Actions, handler) as StrippedActions;
};

export let actions = client();