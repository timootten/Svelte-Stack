import { boolean, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: varchar('id', {
    length: 255
  }).primaryKey(),
  email: varchar("email", { length: 255 }),
  username: varchar('username', {
    length: 16
  }).notNull(),
  passwordHash: varchar('password_hash', {
    length: 255
  }).notNull(),
  firstName: varchar('first_name', {
    length: 255
  }),
  lastName: varchar('last_name', {
    length: 255
  })
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