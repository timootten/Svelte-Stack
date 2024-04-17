import { github, lucia } from '$lib/server/auth/index.js';
import { sendEmailVerificationToken } from '$lib/server/auth/utils.js';
import { db } from '$lib/server/db';
import { emailVerificationTokenTable, oAuthAccountTable, userTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { and, eq, ilike } from 'drizzle-orm';
import { generateId } from 'lucia';
import { isWithinExpirationDate } from 'oslo';
import { setFlash } from "sveltekit-flash-message/server";


export async function GET({ url, cookies, locals }) {
  const token = url.searchParams.get('token');

  if (!token) {
    setFlash({ status: "error", text: "Invalid token." }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  }

  const databaseToken = (await db.select().from(emailVerificationTokenTable).where(eq(emailVerificationTokenTable.id, token)))[0];
  if (!databaseToken) {
    setFlash({ status: "error", text: "Invalid token." }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  }

  if (!isWithinExpirationDate(databaseToken.expiresAt)) {
    const user = (await db.select().from(userTable).where(eq(userTable.id, databaseToken.userId)))[0];
    sendEmailVerificationToken(user.id, user.email, user.username);
    setFlash({ status: "error", text: "Your token is expired. Sending a new one..." }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  }

  await db.transaction(async (tx) => {
    await tx.delete(emailVerificationTokenTable).where(eq(emailVerificationTokenTable.id, token));
    await tx.update(userTable).set({ emailVerified: true }).where(eq(userTable.id, databaseToken.userId));
  });

  const user = (await db.select().from(userTable).where(eq(userTable.id, databaseToken.userId)))[0];
  if (!locals.user) {
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
  };

  setFlash({ status: "success", text: "You successfully verified your E-Mail." }, cookies)
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/login'
    }
  });
}