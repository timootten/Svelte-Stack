import { boolean, numeric, pgEnum, pgTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { generateId } from "lucia";
import { z } from "zod";
import { relations } from 'drizzle-orm';

export const userTable = pgTable("user", {
  id: varchar('id', {
    length: 255
  }).$defaultFn(() => generateId(15)).primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  emailVerified: boolean("email_verified").notNull().default(false),
  username: varchar('username', {
    length: 16
  }).unique().notNull(),
  password: text('password'),
  avatarUrl: text('avatar_url'),
  balance: numeric('balance', { precision: 15, scale: 2 }).notNull().default("0.00"),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const addressTable = pgTable("address", {
  id: varchar('id', {
    length: 255
  }).$defaultFn(() => generateId(15)).primaryKey(),
  userId: varchar('user_id', {
    length: 255
  }).notNull().unique().references(() => userTable.id),
  street: varchar("street", { length: 255 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  zip: varchar("zip", { length: 20 }),
  country: varchar("country", { length: 100 }),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const userRelations = relations(userTable, ({ one }) => ({
  address: one(addressTable, {
    fields: [userTable.id],
    references: [addressTable.userId],
  }),
}));

export const addressRelations = relations(addressTable, ({ one }) => ({
  user: one(userTable, {
    fields: [addressTable.userId],
    references: [userTable.id],
  }),
}));

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
  userId: text('user_id').notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
  }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const userSchema = createSelectSchema(userTable, {
  email: (schema) => schema.email(),
  username: (schema) => schema.min(4).max(16).refine(s => !s.includes(' '), 'Your username cannot contain spaces!'),
  password: z.string().min(8).max(256),
});

export const addressSchema = createSelectSchema(addressTable);

export const tokenSchema = createInsertSchema(tokenTable);