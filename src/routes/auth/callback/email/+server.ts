import { github, lucia } from '$lib/server/auth/index.js';
import { sendVerificationEmail } from '$lib/server/auth/utils.js';
import { db } from '$lib/server/db';
import { tokenTable, userTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { and, eq, ilike } from 'drizzle-orm';
import { generateId } from 'lucia';
import { isWithinExpirationDate } from 'oslo';
import { setFlash } from "sveltekit-flash-message/server";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";


export async function GET({ url, cookies, locals }) {
  const token = url.searchParams.get('token');

  if (!token) {
    setFlash({ status: "error", text: "Invalid token." }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard'
      }
    });
  }

  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
  const databaseToken = (await db.select().from(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'email_verification'))))[0];
  if (!databaseToken) {
    setFlash({ status: "error", text: "Invalid token." }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard'
      }
    });
  }

  if (!isWithinExpirationDate(databaseToken.expiresAt)) {
    const user = (await db.select().from(userTable).where(eq(userTable.id, databaseToken.userId)))[0];
    sendVerificationEmail(user.id, user.email, user.username);
    setFlash({ status: "error", text: "Your token is expired. Sending a new one..." }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard'
      }
    });
  }

  await db.transaction(async (tx) => {
    await tx.delete(tokenTable).where(and(eq(tokenTable.id, tokenHash), eq(tokenTable.type, 'email_verification')));
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
      Location: '/auth/login'
    }
  });
}