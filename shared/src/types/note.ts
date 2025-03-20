import { z } from "zod";
import {
  nonemptyStringSchema,
  positiveNumberSchema,
} from "#shared/types/zod.js";

export const updatedNoteSchema = z.object({
  noteId: positiveNumberSchema,
  content: nonemptyStringSchema,
});

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
