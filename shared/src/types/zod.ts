import { z } from "zod";

export const positiveNumberSchema = z
  .number()
  .positive("Number is not positive");
export const negativeNumberSchema = z
  .number()
  .negative("Number is not negative");
export const nonpositiveNumberSchema = z
  .number()
  .nonpositive("Number must not be positive");
export const nonnegativeNumberSchema = z
  .number()
  .nonnegative("Number must not be negative");

export const nonemptyStringSchema = z
  .string()
  .trim()
  .min(1, "Textfield is required");
export const numericStringSchema = z
  .string()
  .trim()
  .regex(/^\d+(\.\d+)?$/, "String is not numeric");
export const numericStringToNumberSchema = numericStringSchema.transform(
  (value) => {
    const convertedValue = Number(value);

    if (!Number.isFinite(convertedValue)) {
      throw new Error(`${convertedValue} can't be converted to number`);
    }

    return convertedValue;
  },
);
export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(50, "Name is longer than 50 characters");
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Email address is invalid");
export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must have at least 8 characters");
export const urlSchema = z.string().trim().url("URL is invalid");
