import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type LoginType = {
  email: string,
  password: string,
}

