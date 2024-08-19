import * as devalue from 'devalue';
import type * as actionFunctions from '$lib/server/actions';
import { simpleHash } from '$lib/utils';

type Actions = {
  [K in keyof typeof actionFunctions]: typeof actionFunctions[K];
};

const client = (): Actions => {
  const handler: ProxyHandler<Actions> = {
    get(target, prop: keyof Actions) {
      return async (args: any) => {
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

  return new Proxy({} as Actions, handler) as Actions;
};

export let actions = client();