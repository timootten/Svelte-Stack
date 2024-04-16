import { github, lucia } from '$lib/server/auth/index.js';
import { db } from '$lib/server/db';
import { oAuthAccountTable, userTable } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';
import { and, eq, ilike } from 'drizzle-orm';
import { generateId } from 'lucia';
import { setFlash } from "sveltekit-flash-message/server";


export async function GET({ url, cookies }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const storedState = cookies.get('github_oauth_state') ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    });
  }

  try {

    const tokens = await github.validateAuthorizationCode(code);

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "User-Agent": "my-app", // GitHub requires a User-Agent header
      }
    });
    const githubUser = await userResponse.json();

    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const emails = await emailsResponse.json();

    const primaryEmail = (emails.find((email: any) => email.primary) ?? null);

    if (!primaryEmail) {
      setFlash({ status: "error", text: "No primary email address" }, cookies)
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/login'
        }
      });
    }
    if (!primaryEmail.verified) {
      setFlash({ status: "error", text: "Unverified email" }, cookies)
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/login'
        }
      });
    }

    const currentUser = (await db
      .select()
      .from(userTable)
      .where(and(ilike(userTable.email, "timootten@icloud.com"), eq(oAuthAccountTable.providerId, "github")))
      .innerJoin(oAuthAccountTable, eq(userTable.id, oAuthAccountTable.userId)).limit(1))[0]

    const existingUser = currentUser.user;

    let userId = existingUser?.id as string;

    if (existingUser && currentUser.oauth_account_table == null) {
      await db.insert(oAuthAccountTable).values({
        providerId: "github",
        providerUserId: githubUser.id,
        userId: existingUser.id
      });
    } else if (currentUser.oauth_account_table == null) {
      userId = generateId(15);
      await db.transaction(async (tx) => {
        await tx.insert(userTable).values({
          id: userId,
          email: primaryEmail.email,
          username: githubUser.login
        });
        await tx.insert(oAuthAccountTable).values({
          providerId: "github",
          providerUserId: githubUser.id || "",
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
    console.log(error);
    console.log(error?.description)
    return new Response(null, {
      status: 500
    });
  }
}