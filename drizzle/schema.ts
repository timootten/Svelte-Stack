import { pgTable, foreignKey, varchar, text, timestamp, serial, bigint, unique, boolean, numeric, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const type = pgEnum("type", ['email_verification', 'password_reset', 'magic_link'])



export const session = pgTable("session", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  userId: text("user_id").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
  (table) => {
    return {
      sessionUserIdUserIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "session_user_id_user_id_fk"
      }),
    }
  });

export const token = pgTable("token", {
  id: text("id").primaryKey().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  type: type("type").notNull(),
  expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
  (table) => {
    return {
      tokenUserIdUserIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "token_user_id_user_id_fk"
      }),
    }
  });

export const migrations = pgTable("migrations", {
  id: serial("id").primaryKey().notNull(),
  hash: text("hash").notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  createdAt: bigint("created_at", { mode: "number" }),
});

export const user = pgTable("user", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  username: varchar("username", { length: 16 }).notNull(),
  password: text("password"),
  avatarUrl: text("avatar_url"),
  balance: numeric("balance", { precision: 15, scale: 2 }).default('0.00').notNull(),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
  (table) => {
    return {
      userEmailUnique: unique("user_email_unique").on(table.email),
      userUsernameUnique: unique("user_username_unique").on(table.username),
    }
  });

export const address = pgTable("address", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  street: varchar("street", { length: 255 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  zip: varchar("zip", { length: 20 }),
  country: varchar("country", { length: 100 }),
  updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
  (table) => {
    return {
      addressUserIdUserIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "address_user_id_user_id_fk"
      }),
      addressUserIdUnique: unique("address_user_id_unique").on(table.userId),
    }
  });

export const oauthAccountTable = pgTable("oauth_account_table", {
  providerId: text("provider_id").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
},
  (table) => {
    return {
      oauthAccountTableUserIdUserIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: "oauth_account_table_user_id_user_id_fk"
      }),
      oauthAccountTableProviderIdProviderUserIdPk: primaryKey({ columns: [table.providerId, table.providerUserId], name: "oauth_account_table_provider_id_provider_user_id_pk" }),
    }
  });