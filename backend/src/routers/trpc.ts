import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import { Request } from "express";
import { SessionData } from "express-session";

type Context = Omit<CreateExpressContextOptions, "req"> & {
  req: Request & { session: SessionData };
};

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
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { req } = ctx;

  if (!req.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx,
  });
});

export function createContext({ req }: Context) {
  return { req };
}
