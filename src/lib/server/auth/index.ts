import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { db } from '../db';
import { sessionTable, userTable } from '../db/schema';
import { GitHub } from "arctic";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
export const github = new GitHub(GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID as string, GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET as string);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      balance: attributes.balance
    }
  }
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
  interface DatabaseUserAttributes {
    username: string;
    email: string;
    balance: string;
  }
}