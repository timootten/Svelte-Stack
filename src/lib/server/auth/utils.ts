import { eq } from "drizzle-orm";
import { db } from "../db";
import { emailVerificationTokenTable } from '../db/schema';
import { generateId } from "lucia";
import { render } from '@react-email/render';
import nodemailer from "nodemailer";
import { BASE_URL, SMTP_FROM, SMTP_URL } from "$env/static/private";
import VerificationEmail from './email/verification-email';
import { createDate, TimeSpan } from "oslo";

const transporter = nodemailer.createTransport({
  url: SMTP_URL || process.env.SMTP_URL
});

async function createEmailVerificationToken(userId: string, email: string): Promise<string> {
  // optionally invalidate all existing tokens
  await db.delete(emailVerificationTokenTable).where(eq(emailVerificationTokenTable.userId, userId));
  const tokenId = generateId(40);
  await db.insert(emailVerificationTokenTable).values({
    id: tokenId,
    userId,
    email,
    expiresAt: createDate(new TimeSpan(2, "h"))
  });
  return tokenId;
}


export async function sendEmailVerificationToken(userId: string, email: string, username: string) {
  const ENV_BASE_URL = BASE_URL || process.env.BASE_URL || "http://localhost:3000";

  const token = await createEmailVerificationToken(userId, email);

  const link = `${ENV_BASE_URL}/callback/email?token=${token}`

  const FROM = SMTP_FROM || process.env.SMTP_FROM;

  transporter.sendMail({
    from: `Svelte-Stack <${FROM}>`,
    to: email,
    subject: "Verify your email",
    html: render(VerificationEmail({ link, username }))
  });
};