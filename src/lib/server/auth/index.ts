import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { db } from '../db';
import { sessionTable, userTable } from '../db/schema';
import { GitHub, Google } from "arctic";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
export const github = new GitHub(process.env.GITHUB_CLIENT_ID as string, process.env.GITHUB_CLIENT_SECRET as string);
export const google = new Google(process.env.GOOGLE_CLIENT_ID as string, process.env.GOOGLE_CLIENT_SECRET as string, `${process.env.BASE_URL}/auth/callback/google`);

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
      emailVerified: attributes.emailVerified,
      balance: attributes.balance,
      avatarUrl: attributes.avatarUrl,
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
    emailVerified: boolean;
    balance: string;
    avatarUrl: string;
  }
}