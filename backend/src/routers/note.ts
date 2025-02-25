import { z } from "zod";
import { protectedProcedure, router } from "#backend/routers/trpc.js";
import { noteService } from "#backend/services/note.js";
import { AppError } from "#backend/utils/app-error.js";
import {
  nonemptyStringSchema,
  positiveNumberSchema,
} from "shared/src/types/zod.js";
import { convertedNoteSchema } from "shared/src/types/note.js";

export const noteRouter = router({
  getNote: protectedProcedure
    .input(
      z.object({
        noteId: positiveNumberSchema,
      }),
    )
    .query(async ({ input }) => {
      try {
        const newNote = await noteService.getNote(input);

        return newNote;
      } catch (error) {
        AppError.logError(error);
      }
    }),
  getAllNotes: protectedProcedure.query(async ({ ctx }) => {
    try {
      const { id: authorId } = ctx.req.session.user;

      const allNotes = await noteService.getAllNotes({ authorId });

      return allNotes;
    } catch (error) {
      AppError.logError(error);
    }
  }),
  createNote: protectedProcedure
    .input(convertedNoteSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { id: authorId } = ctx.req.session.user;
        const argument = {
          ...input,
          authorId,
        };

        const newNote = await noteService.createNote(argument);

        return newNote;
      } catch (error) {
        AppError.logError(error);
      }
    }),
  updateNote: protectedProcedure
    .input(
      z.object({
        noteId: positiveNumberSchema,
        content: nonemptyStringSchema,
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updatedNote = await noteService.updateNote(input);

        return updatedNote;
      } catch (error) {
        AppError.logError(error);
      }
    }),
  deleteNote: protectedProcedure
    .input(
      z.object({
        noteId: positiveNumberSchema,
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const deletedNote = await noteService.deleteNote(input);

        return deletedNote;
      } catch (error) {
        AppError.logError(error);
      }
    }),
});
