import { z, ZodSchema } from 'zod';

type Middleware<SchemaType> = (context: { url: string; next: () => Promise<void> }, data: SchemaType) => Promise<void>;
type Handler<SchemaType> = (context: { url: string }, data: SchemaType) => Promise<{ message: string }>;

interface ActionBuilder<SchemaType> {
  schema<T>(schema: ZodSchema<T>): Omit<ActionBuilder<T>, 'schema'>;
  use(middleware: Middleware<SchemaType>): Omit<ActionBuilder<SchemaType>, 'schema'>;
  run(handler: Handler<SchemaType>): { config: { schema?: ZodSchema<SchemaType>; middlewares: Middleware<SchemaType>[]; handler: Handler<SchemaType>; } };
}

const createAction = <SchemaType = undefined>(): ActionBuilder<SchemaType> => {
  let _schema: ZodSchema<SchemaType> | undefined;
  const _middlewares: Middleware<SchemaType>[] = [];
  let _handler: Handler<SchemaType> | undefined;

  return {
    schema<T>(schema: ZodSchema<T>) {
      if (_schema) {
        throw new Error('Schema can only be defined once and at the start.');
      }
      _schema = schema as unknown as ZodSchema<SchemaType>;
      return {
        use: this.use,
        run: this.run
      } as unknown as Omit<ActionBuilder<T>, 'schema'>;
    },
    use(middleware: Middleware<SchemaType>) {
      _middlewares.push(middleware);
      return {
        use: this.use,
        run: this.run
      };
    },
    run(handler: Handler<SchemaType>) {
      _handler = handler;
      return {
        config: {
          schema: _schema,
          middlewares: _middlewares,
          handler: _handler
        }
      };
    }
  };
};

// Usage example
const test = createAction()
  .schema(z.object({
    id: z.string(),
    name: z.string(),
  }))
  .use(async ({ url, next }, data) => {
    console.log(url);
    console.log(data.id, data.name);
    await next();
  })
  .use(async ({ url, next }, data) => {
    console.log(url);
    console.log(data.id, data.name);
    await next();
  })
  .run(async ({ url }, { id, name }) => {
    // event is correctly typed and destructured
    console.log(url);
    // data is correctly typed and destructured
    console.log(id, name);

    return { message: 'Hello World' };
  });
