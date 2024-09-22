import * as actions from '$lib/server/actions';
import { simpleHash } from '$lib/utils.js';
import type { RequestEvent } from '@sveltejs/kit';
import * as devalue from 'devalue';

interface Actions {
  [key: string]: (...args: any) => any;
}

const hashedActions: { [key: string]: string } = {};
for (const [name, func] of Object.entries(actions)) {
  if (typeof func === 'function') {
    const hashedName = simpleHash(name);
    if (hashedActions[hashedName]) {
      console.warn(`Hash collision detected for functions: ${name} and ${hashedActions[hashedName]}`);
      // You could then use a different strategy for these colliding names
    }
    hashedActions[hashedName] = name;
  }
}

export const POST = async (event: RequestEvent) => {
  try {
    const input = devalue.parse(await event.request.text());
    const originalActionName = hashedActions[input.action];

    if (!originalActionName) {
      return new Response("Function not found!", {
        status: 400
      });
    }

    const action: (...args: any) => any = (actions as Actions)[originalActionName];

    if (!action) {
      return new Response("Function not found!", {
        status: 400
      });
    }


    const result = await action(...input.data, event);

    return new Response(devalue.stringify(result), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {

      return new Response(error.message, {
        status: 400
      });
    }
  }
};