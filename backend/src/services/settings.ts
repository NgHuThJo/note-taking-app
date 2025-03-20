import { eq } from "drizzle-orm";
import { db } from "#backend/db/index.js";
import { optionTable } from "#backend/db/schema.js";

class SettingsService {
  async getColorTheme({ userId }: { userId: number }) {
    const [colorTheme] = await db
      .select()
      .from(optionTable)
      .where(eq(optionTable.id, userId));

    return colorTheme;
  }

  async updateColorTheme({
    theme,
    userId,
  }: {
    theme: "light" | "dark";
    userId: number;
  }) {
    const [updatedColorTheme] = await db
      .update(optionTable)
      .set({ theme })
      .where(eq(optionTable.id, userId))
      .returning();

    return updatedColorTheme;
  }
}

export const settingsService = new SettingsService();
