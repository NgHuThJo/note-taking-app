import { and, eq } from "drizzle-orm";
import { db } from "#backend/db/index.js";
import { noteTable, noteToTagTable, tagTable } from "#backend/db/schema.js";
import { noteView } from "#backend/db/schema.js";

class NoteService {
  async getAllNotes({ authorId }: { authorId: number }) {
    const notes = await db
      .select()
      .from(noteView)
      .where(eq(noteView.authorId, authorId));

    return notes;
  }

  async getAllArchivedNotes({ authorId }: { authorId: number }) {
    const notes = await db
      .select()
      .from(noteView)
      .where(
        and(eq(noteView.authorId, authorId), eq(noteView.status, "archived")),
      );

    return notes;
  }

  async getNote({ noteId }: { noteId: number }) {
    const note = await db
      .select()
      .from(noteView)
      .where(eq(noteView.id, noteId));

    return note;
  }

  async createNote(data: {
    title: string;
    content: string;
    authorId: number;
    tags: string[];
  }) {
    const { tags, ...createData } = data;

    const [newNote] = await db.insert(noteTable).values(createData).returning();

    const resolvedTagPromises = await Promise.all(
      tags.map(async (tag) => {
        const [existingTag] = await db
          .select()
          .from(tagTable)
          .where(eq(tagTable.tag, tag));

        const tagId =
          existingTag?.id ||
          (
            await db
              .insert(tagTable)
              .values({ tag })
              .returning({ id: tagTable.id })
          )[0].id;

        await db.insert(noteToTagTable).values({
          noteId: newNote.id,
          tagId,
        });

        return existingTag;
      }),
    );

    return {
      ...newNote,
      tags: resolvedTagPromises,
    };
  }

  async updateNote({ noteId, content }: { noteId: number; content: string }) {
    const [updatedNote] = await db
      .update(noteTable)
      .set({ content })
      .where(eq(noteTable.id, noteId))
      .returning();

    return updatedNote;
  }

  async deleteNote({ noteId }: { noteId: number }) {
    const [deletedNote] = await db
      .delete(noteTable)
      .where(eq(noteTable.id, noteId))
      .returning();

    return deletedNote;
  }

  async archiveNote({ noteId }: { noteId: number }) {
    const [archivedNote] = await db
      .update(noteTable)
      .set({ status: "archived" })
      .where(eq(noteTable.id, noteId))
      .returning();

    return archivedNote;
  }

  async restoreNote({ noteId }: { noteId: number }) {
    const [restoredNote] = await db
      .update(noteTable)
      .set({ status: "active" })
      .where(eq(noteTable.id, noteId))
      .returning();

    return restoredNote;
  }
}

export const noteService = new NoteService();
