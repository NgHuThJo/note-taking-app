import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc.js";
import { authService } from "#backend/services/auth.js";
import { AppError } from "#backend/utils/app-error.js";
import { emailSchema, passwordSchema } from "shared/src/types/zod.js";

export const authRouter = router({
  isAuthenticated: protectedProcedure.query(async () => {
    return true;
  }),
  loginUser: publicProcedure
    .input(
      z.object({
        email: emailSchema,
        password: passwordSchema,
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { req } = ctx;

      try {
        const user = await authService.loginUser(email, password);

        req.session.user = {
          id: user.id,
        };

        return user;
      } catch (error) {
        AppError.logError(error);
      }
    }),
  registerUser: publicProcedure
    .input(
      z.object({
        email: emailSchema,
        password: passwordSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      try {
        const user = await authService.registerUser(email, password);

        return user;
      } catch (error) {
        AppError.logError(error);
      }
    }),
});
