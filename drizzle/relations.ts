import { relations } from "drizzle-orm/relations";
import { user, session, token, address, oauthAccountTable } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	tokens: many(token),
	addresses: many(address),
	oauthAccountTables: many(oauthAccountTable),
}));

export const tokenRelations = relations(token, ({one}) => ({
	user: one(user, {
		fields: [token.userId],
		references: [user.id]
	}),
}));

export const addressRelations = relations(address, ({one}) => ({
	user: one(user, {
		fields: [address.userId],
		references: [user.id]
	}),
}));

export const oauthAccountTableRelations = relations(oauthAccountTable, ({one}) => ({
	user: one(user, {
		fields: [oauthAccountTable.userId],
		references: [user.id]
	}),
}));