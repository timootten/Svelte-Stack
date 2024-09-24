import type { ZodIssue } from "zod";

export class SAError extends Error {
  status: number;
  code?: string;
  zodErrors: ZodIssue[] = [];

  constructor({ message, status, code, zodErrors }: { message: string; status?: number; code?: string; zodErrors?: ZodIssue[] });
  constructor(message: string, status?: number, code?: string, zodErrors?: ZodIssue[]);
  constructor(
    messageOrObject: string | { message: string; status?: number; code?: string; zodErrors?: ZodIssue[] },
    status?: number,
    code?: string,
    zodErrors?: ZodIssue[]
  ) {
    if (typeof messageOrObject === 'string') {
      super(messageOrObject);
      this.status = status ?? 500;
      this.code = code;
      this.zodErrors = zodErrors ?? [];
    } else {
      super(messageOrObject.message);
      this.status = messageOrObject.status ?? 500;
      this.code = messageOrObject.code;
      this.zodErrors = messageOrObject.zodErrors ?? [];
    }
    this.name = this.constructor.name;
  }
}