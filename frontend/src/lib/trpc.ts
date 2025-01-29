import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "#backend/routers/api";

export const trpc = createTRPCReact<AppRouter>();
