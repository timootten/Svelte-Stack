import { z } from "zod";
import { createAction, routeMiddleware, type Middleware } from './lib/createAction';
import { SAError } from "./lib/actionError";
import type { User } from "lucia";

const isAuthenticed: Middleware = async ({ next, locals }) => {
  console.log('middleware1213', locals.user);
  if (!locals.user) throw new SAError({
    message: 'You are not authorized',
    status: 401,
    code: 'UNAUTHORIZED',
  });
  await next();
}


const test = {
  abc: createAction()
    .run(async ({ url }) => {
      console.log("XX")
      return { a: `Hello` };
    })
}

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
    }),
  test
}

export const actions = {
  test: createAction()
    .schema(z.object({
      message: z.string()
    }))
    .use(async ({ next }, { message }) => {
      console.log('middleware', message);
      message = "Hello from middleware";
      console.log('middleware', message);
      await next();
    })
    .run(async ({ url }, { message }) => {
      console.log("XX")
      return { a: `Hello ${message}` };
    }),
  user: routeMiddleware(userActions).use(async ({ next }) => {
    console.log('middleware', 'user');
    await next()
  }).use(async ({ next }) => {
    console.log('middleware', 'user2');
    await next()
  }).use(isAuthenticed).actions,
}
