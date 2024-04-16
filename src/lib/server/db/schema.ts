import { numeric, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { generateId } from "lucia";

export const userTable = pgTable("user", {
  id: varchar('id', {
    length: 255
  }).$defaultFn(() => generateId(15)).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  username: varchar('username', {
    length: 32
  }).notNull(),
  password: text('password'),
  balance: numeric('balance', { precision: 15, scale: 2 }).notNull().default("0.00")
});

export const oAuthAccountTable = pgTable("oauth_account_table", {
  providerId: text('provider_id').notNull(),
  providerUserId: text("provider_user_id").notNull(),
  userId: varchar('user_id', {
    length: 255
  }).notNull()
    .references(() => userTable.id),

}, (table) => {
  return {
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] })
  }
});

export const userSchema = createInsertSchema(userTable, {
  email: (schema) => schema.email.email(),
  username: (schema) => schema.username.min(4).max(16),
  password: (schema) => schema.password.min(8)
});

export const sessionTable = pgTable("session", {
  id: varchar('id', {
    length: 255
  }).primaryKey(),
  userId: varchar('user_id', {
    length: 255
  }).notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
  }).notNull()
});