import { emailSchema, passwordSchema } from "#shared/types/zod.js";
import { z } from "zod";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
