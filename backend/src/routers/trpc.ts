import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";

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
