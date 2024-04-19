import { google, lucia } from '$lib/server/auth/index.js';
import { db } from '$lib/server/db';
import { oAuthAccountTable, userTable } from '$lib/server/db/schema.js';
import { eq, ilike } from 'drizzle-orm';
import { generateId } from 'lucia';
import { setFlash } from "sveltekit-flash-message/server";


export async function GET({ url, cookies }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const storedState = cookies.get('google_oauth_state') ?? null;
  const storedCodeVerifier = cookies.get('google_oauth_verifier') ?? null;

  if (!code || !state || !storedCodeVerifier || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {

    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const googleUser = await response.json();

    if (!googleUser.email_verified) {
      setFlash({ status: "error", text: "Unverified email" }, cookies)
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/login'
        }
      });
    }

    const currentUser = await db
      .select()
      .from(userTable)
      .where(ilike(userTable.email, googleUser.email))
      .leftJoin(oAuthAccountTable, eq(userTable.id, oAuthAccountTable.userId))

    const existingUser = currentUser[0]?.user;

    let userId = existingUser?.id as string;
    const hasGoogleAccount = !!currentUser.find(row => row?.oauth_account_table?.providerId === "Google")
    // make this a boolean

    if (existingUser && !hasGoogleAccount) {
      await db.insert(oAuthAccountTable).values({
        providerId: "Google",
        providerUserId: googleUser.sub,
        userId: existingUser.id
      });
    } else if (!hasGoogleAccount) {
      userId = generateId(15);
      await db.transaction(async (tx) => {
        await tx.insert(userTable).values({
          id: userId,
          email: googleUser.email,
          username: googleUser.name,
          emailVerified: true,
          avatarUrl: googleUser.picture
        });
        await tx.insert(oAuthAccountTable).values({
          providerId: "Google",
          providerUserId: googleUser.sub,
          userId: userId
        });
      });
    }

    if (!userId) {
      setFlash({ status: "error", text: "There was a problem creating a user." }, cookies)
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/login'
        }
      });
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    setFlash({ status: "success", text: "You successfully logged in." }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  } catch (error: any) {
    console.log(error)
    setFlash({ status: "error", text: `Unkown error: ${error.description}` }, cookies)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/login'
      }
    });
  }
}