import { z } from "zod";
import { protectedProcedure, router } from "#backend/routers/trpc.js";
import { noteService } from "#backend/services/note.js";
import { AppError } from "#backend/utils/app-error.js";

export const noteRouter = router({
  getAllNotes: protectedProcedure.query(async ({ ctx }) => {
    try {
      const { id } = ctx.req.session.user;

      const allNotes = await noteService.getAllNotes(id);

      return allNotes;
    } catch (error) {
      AppError.logError(error);
    }
  }),
});
