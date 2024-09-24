import type { RequestEvent } from '@sveltejs/kit';
import { ZodSchema } from 'zod';

export type Middleware<SchemaType> = (context: { next: () => Promise<void> } & RequestEvent, data: SchemaType) => Promise<void>;
export type Handler<SchemaType, ReturnType = any> = (context: RequestEvent, data: SchemaType) => Promise<ReturnType>;

interface ActionBuilder<SchemaType> {
  schema<T>(schema: ZodSchema<T>): Omit<ActionBuilder<T>, 'schema'>;
  use(middleware: Middleware<SchemaType>): Omit<ActionBuilder<SchemaType>, 'schema'>;
  run<ReturnType>(handler: Handler<SchemaType, ReturnType>): { config: { schema?: ZodSchema<SchemaType>; middlewares: Middleware<SchemaType>[]; handler: Handler<SchemaType, ReturnType>; } };
}

export interface ActionConfig {
  schema?: ZodSchema<any>;
  middlewares: Middleware<any>[];
  handler: Handler<any, any>;
}

export const createAction = <SchemaType = undefined>(): ActionBuilder<SchemaType> => {
  let schema: ZodSchema<SchemaType> | undefined;
  const middlewares: Middleware<SchemaType>[] = [];
  let handler: Handler<SchemaType> | undefined;

  return {
    schema<T>(currentSchema: ZodSchema<T>) {
      if (schema) {
        throw new Error('Schema can only be defined once and at the start.');
      }
      schema = currentSchema as unknown as ZodSchema<SchemaType>;
      return {
        use: this.use,
        run: this.run
      } as unknown as Omit<ActionBuilder<T>, 'schema'>;
    },
    use(middleware: Middleware<SchemaType>) {
      middlewares.push(middleware);
      return {
        use: this.use,
        run: this.run
      };
    },
    run<ReturnType>(currentHandler: Handler<SchemaType, ReturnType>) {
      handler = currentHandler;
      return {
        config: {
          schema,
          middlewares,
          handler
        }
      };
    }
  };
};
