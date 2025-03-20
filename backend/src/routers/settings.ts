import { z } from "zod";
import { protectedProcedure, router } from "#backend/routers/trpc.js";
import { settingsService } from "#backend/services/settings.js";
import { AppError } from "#backend/utils/app-error.js";
import { positiveNumberSchema } from "shared/src/types/zod.js";
import { colorThemeSchema } from "shared/src/types/settings.js";

export const settingsRouter = router({
  getColorTheme: protectedProcedure
    .input(
      z.object({
        userId: positiveNumberSchema,
      }),
    )
    .query(async ({ ctx }) => {
      try {
        const { id: userId } = ctx.req.session.user;

        const colorTheme = await settingsService.getColorTheme({ userId });

        return colorTheme;
      } catch (error) {
        AppError.logError(error);
      }
    }),
  updateColorTheme: protectedProcedure
    .input(
      z.object({
        theme: colorThemeSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const data = {
          theme: input.theme,
          userId: ctx.req.session.user.id,
        };

        const updatedColorTheme = await settingsService.updateColorTheme(data);

        return updatedColorTheme;
      } catch (error) {
        AppError.logError(error);
      }
    }),
});
