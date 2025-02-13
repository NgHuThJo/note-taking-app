import { eq } from "drizzle-orm";
import { db } from "#backend/db/index.js";
import { noteTable } from "#backend/db/schema.js";

class NoteService {
  async getAllNotes(id: number) {
    const notes = await db
      .select()
      .from(noteTable)
      .where(eq(noteTable.authorId, id));

    return notes;
  }
}

export const noteService = new NoteService();
