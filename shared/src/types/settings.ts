import { z } from "zod";

export const colorThemeSchema = z.enum(["light", "dark"]);

export const colorSchema = z.object({
  theme: colorThemeSchema,
});
