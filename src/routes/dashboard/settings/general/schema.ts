import { z } from "zod";

export const generalSchema = z.object({
  username: z.string().min(4).max(16),
  email: z.string().email(),
})