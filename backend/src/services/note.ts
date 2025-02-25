import { eq, sql } from "drizzle-orm";
import { db } from "#backend/db/index.js";
import { noteTable, noteToTagTable, tagTable } from "#backend/db/schema.js";

class NoteService {
  async getAllNotes({ authorId }: { authorId: number }) {
    const notes = await db
      .select({
        id: noteTable.id,
        title: noteTable.title,
        content: noteTable.content,
        updatedAt: noteTable.updatedAt,
        status: noteTable.status,
        tags: sql<
          string[]
        >`COALESCE(jsonb_agg(${tagTable.tag}) FILTER (WHERE ${tagTable.id} IS NOT NULL), '[]')`,
      })
      .from(noteTable)
      .leftJoin(noteToTagTable, eq(noteToTagTable.noteId, noteTable.id))
      .leftJoin(tagTable, eq(noteToTagTable.tagId, tagTable.id))
      .where(eq(noteTable.authorId, authorId))
      .groupBy(noteTable.id);

    return notes;
  }

  async getNote({ noteId }: { noteId: number }) {
    const note = await db
      .select()
      .from(noteTable)
      .where(eq(noteTable.id, noteId));

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
}

export const noteService = new NoteService();
