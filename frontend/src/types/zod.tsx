import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "#shared/types/zod";

// Utility schemas
export const fileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  size: z.number().max(10 * 1024 * 1024, "File size must be less than 10MB"),
  type: z.string().regex(/^image\/(jpeg|jpg|png)$/, "Invalid file type"),
  lastModified: z.number(),
  lastModifiedDate: z.date(),
});

export type SchemaError<T extends z.ZodSchema> =
  z.inferFlattenedErrors<T>["fieldErrors"];

// Base schemas
export const authSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type AuthSchemaError = SchemaError<typeof authSchema>;

// Extended schemas
export const registrationSchema = authSchema.extend({
  firstName: nameSchema,
  lastName: nameSchema,
});
export type RegistrationSchemaError = SchemaError<typeof registrationSchema>;
