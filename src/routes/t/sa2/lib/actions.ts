import { z } from "zod";
import { createAction } from "./createAction";
import { SAError } from "./error";
import type { User } from "lucia";


const userActions = {
  get: createAction()
    .use(async ({ next, locals }) => {
      console.log('middleware', locals.user);
      if (!locals.user) throw new SAError({
        message: 'You are not authorized',
        status: 401,
        code: 'UNAUTHORIZED',
      });



      await next();
    })
    .run(async ({ locals }) => {
      return locals.user as User; // this should be the user object and not null, it has the type  User | null
    })
}

export const actions = {
  test: createAction()
    .schema(z.object({
      message: z.string()
    }))
    .use(async ({ next }, x) => {
      console.log('middleware', x.message);
      x.message = "Hello from middleware";
      console.log('middleware', x.message);
      await next();
    })
    .run(async ({ url }, { message }) => {
      console.log("XX")
      return { a: `Hello ${message}` };
    }),
  user: userActions,
}
