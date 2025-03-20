import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import { AppError } from "#backend/utils/app-error.js";
import logger from "#backend/utils/logger.js";

const redisClient = createClient();
redisClient.connect().catch(console.error);

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

export const t = initTRPC
  .context<Awaited<ReturnType<typeof createContext>>>()
  .create();

export const { router } = t;
const errorHandlingMiddleware = t.middleware(async ({ ctx, next }) => {
  try {
    return next({ ctx });
  } catch (error) {
    if (error instanceof AppError) {
      logger.error(`${error.name}:`, error.code, error.cause, error.message);
      throw new TRPCError({
        code: error.code,
        message: error.message,
      });
    }

    if (error instanceof Error) {
      logger.error(`${error.name}:`, error.cause, error.message);
    } else {
      logger.error(`Unknown error: ${error}`);
    }

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Unexpected error",
    });
  }
});
export const publicProcedure = t.procedure.use(errorHandlingMiddleware);
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  const { req } = ctx;

  console.log("Current user:", req.session.user);

  if (!req.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      req: {
        ...req,
        session: {
          ...req.session,
          user: {
            id: req.session.user.id,
          },
        },
      },
    },
  });
});

export function createContext({ req }: CreateExpressContextOptions) {
  return { req };
}
