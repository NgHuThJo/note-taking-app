import { router } from "./trpc.js";
import { authRouter } from "./auth.js";
import { noteRouter } from "#backend/routers/note.js";
import { settingsRouter } from "#backend/routers/settings.js";

export const appRouter = router({
  auth: authRouter,
  note: noteRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
