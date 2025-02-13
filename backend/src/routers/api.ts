import { router } from "./trpc.js";
import { authRouter } from "./auth.js";
import { noteRouter } from "#backend/routers/note.js";

export const appRouter = router({
  auth: authRouter,
  note: noteRouter,
});

export type AppRouter = typeof appRouter;
