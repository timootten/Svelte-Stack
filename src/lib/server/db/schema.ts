import { boolean, date, numeric, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { generateId } from "lucia";
import { createDate, TimeSpan } from "oslo";

export const userTable = pgTable("user", {
  id: varchar('id', {
    length: 255
  }).$defaultFn(() => generateId(15)).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  username: varchar('username', {
    length: 32
  }).notNull(),
  password: text('password'),
  avatarUrl: text('avatar_url'),
  balance: numeric('balance', { precision: 15, scale: 2 }).notNull().default("0.00"),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
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

export const emailVerificationTokenTable = pgTable("email_verification_token", {
  id: varchar('id', {
    length: 255
  }).$defaultFn(() => generateId(40)).primaryKey(),
  userId: varchar('user_id', {
    length: 255
  }).notNull()
    .references(() => userTable.id),
  email: varchar("email", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
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
  }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});


export const userSchema = createInsertSchema(userTable, {
  email: (schema) => schema.email.email(),
  username: (schema) => schema.username.min(4).max(16),
  password: (schema) => schema.password.min(8)
});