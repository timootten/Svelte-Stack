import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { generateId } from "lucia";
import { render } from '@react-email/render';
import nodemailer from "nodemailer";
import VerificationEmail from './email/verification-email';
import { createDate, TimeSpan } from "oslo";
import { tokenTable, tokenSchema } from '../db/schema';
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import type { z } from "zod";
import PasswordResetEmail from './email/password-reset-email';
import { zxcvbnOptions } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import * as zxcvbnDePackage from '@zxcvbn-ts/language-de'
import MagicLinkEmail from './email/magic-link-email';
// Dont delete this, this is needed for the emails
import ReactDOMServer from 'react-dom/server';

const transporter = nodemailer.createTransport({
  url: process.env.SMTP_URL
});

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
    ...zxcvbnDePackage.dictionary,
  },
}

zxcvbnOptions.setOptions(options)

const typeSchema = tokenSchema.pick({ type: true });
type typeEnum = z.infer<typeof typeSchema>['type']

async function createToken(userId: string, type: typeEnum): Promise<string> {
  // optionally invalidate all existing tokens
  await db.delete(tokenTable).where(and(eq(tokenTable.userId, userId), eq(tokenTable.type, type)));
  const tokenId = generateId(40);
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
  await db.insert(tokenTable).values({
    id: tokenHash,
    userId,
    type,
    expiresAt: createDate(new TimeSpan(2, "h"))
  });
  return tokenId;
}


export async function sendVerificationEmail(userId: string, email: string, username: string) {
  const ENV_BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const token = await createToken(userId, "email_verification");

  const link = `${ENV_BASE_URL}/auth/callback/email?token=${token}`

  const FROM = process.env.SMTP_FROM;

  transporter.sendMail({
    from: `Svelte-Stack <${FROM}>`,
    to: email,
    subject: "Verify your email",
    html: render(VerificationEmail({ link, username }))
  });
};

export async function sendPasswordResetEmail(userId: string, email: string, username: string) {
  const ENV_BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const token = await createToken(userId, "password_reset");

  const link = `${ENV_BASE_URL}/auth/reset-password?token=${token}`

  const FROM = process.env.SMTP_FROM;

  transporter.sendMail({
    from: `Svelte-Stack <${FROM}>`,
    to: email,
    subject: "Reset your Password",
    html: render(PasswordResetEmail({ link, username }))
  });
};

export async function sendMagicLinkEmail(userId: string, email: string, username: string) {
  const ENV_BASE_URL = process.env.BASE_URL || "http://localhost:3000";

  const token = await createToken(userId, "magic_link");

  const link = `${ENV_BASE_URL}/auth/callback/magic?token=${token}`

  const FROM = process.env.SMTP_FROM;

  transporter.sendMail({
    from: `Svelte-Stack <${FROM}>`,
    to: email,
    subject: "Magic Link",
    html: render(MagicLinkEmail({ link, username }))
  });
};

interface TokenValidateResponse {
  'error-codes': string[];
  success: boolean;
  action: string;
  cdata: string;
}

export async function validateToken(token: string) {
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        response: token,
        secret: process.env.CLOUDFLARE_CAPTCHA_SECRET_KEY,
      }),
    },
  );

  const data: TokenValidateResponse = await response.json();

  return {
    // Return the status
    success: data.success,

    // Return the first error if it exists
    error: data['error-codes']?.length ? data['error-codes'][0] : null,
  };
}