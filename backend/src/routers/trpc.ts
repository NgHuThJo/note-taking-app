import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

export const { router } = t;
export const publicProcedure = t.procedure;

export function createContext({ req, res }: CreateExpressContextOptions) {
  return { req, res };
}
