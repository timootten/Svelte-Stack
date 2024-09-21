import type { RequestEvent } from "@sveltejs/kit";
import { z } from "zod";

export const getUser = async ({ id }: { id: string }) => {
  return { name: "Timo " + id };
};

export const callServer = async ({ message }: { message: string }) => {
  const data = { name: "ABC " + (Math.random() * 1000).toFixed(0), message };
  console.log("Server 2", data);

  return data;
};

const withZodSchema = z.object({
  message: z.string(),
});

export const withZod = async (data: z.infer<typeof withZodSchema>) => {
  const { message } = withZodSchema.parse(data);


  return { message, time: new Date().toLocaleString('de-de') }
};

export const test = async (data: z.infer<typeof withZodSchema>, a: { test: string }) => {
  const { message } = withZodSchema.parse(data);

  console.log(a)

  return { message, time: new Date().toLocaleString('de-de') }
};