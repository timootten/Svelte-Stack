import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const user = pgTable('user', {
  id: varchar('id', { length: 100 }).unique().primaryKey().notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
});