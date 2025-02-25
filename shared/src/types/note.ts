import { z } from "zod";
import { nonemptyStringSchema } from "#shared/types/zod.js";

export const noteSchema = z.object({
  title: nonemptyStringSchema,
  content: nonemptyStringSchema,
  tags: nonemptyStringSchema,
});

export const convertedNoteSchema = z.object({
  title: nonemptyStringSchema,
  content: nonemptyStringSchema,
  tags: z
    .string()
    .transform((value) => value.split(",").map((string) => string.trim())),
});
