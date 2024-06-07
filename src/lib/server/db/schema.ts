import { boolean, numeric, pgEnum, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { generateId } from "lucia";
import { z } from "zod";

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

export const tokenType = pgEnum('type', ['email_verification', 'password_reset', 'magic_link']);

export const tokenTable = pgTable("token", {
  id: text('id').$defaultFn(() => generateId(40)).primaryKey(),
  userId: varchar('user_id', {
    length: 255
  }).notNull()
    .references(() => userTable.id),
  type: tokenType('type').notNull(),
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


export const userSchema = createSelectSchema(userTable, {
  email: (schema) => schema.email.email(),
  username: (schema) => schema.username.min(4).max(16),
  password: z.string().min(8).max(256),
});

export const tokenSchema = createInsertSchema(tokenTable);