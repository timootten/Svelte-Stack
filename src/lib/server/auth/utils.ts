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

const transporter = nodemailer.createTransport({
  url: process.env.SMTP_URL
});

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

  const link = `${ENV_BASE_URL}/callback/email?token=${token}`

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

  const link = `${ENV_BASE_URL}/reset-password?token=${token}`

  const FROM = process.env.SMTP_FROM;

  transporter.sendMail({
    from: `Svelte-Stack <${FROM}>`,
    to: email,
    subject: "Reset your Password",
    html: render(PasswordResetEmail({ link, username }))
  });
};