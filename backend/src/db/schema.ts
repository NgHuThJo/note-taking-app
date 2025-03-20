import { eq, sql } from "drizzle-orm";
import {
  integer,
  serial,
  pgTable,
  varchar,
  timestamp,
  primaryKey,
  pgEnum,
  text,
  pgView,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("note_status", ["active", "archived"]);
export const themeEnum = pgEnum("theme", ["light", "dark"]);

export const userTable = pgTable("users", {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const noteTable = pgTable("notes", {
  id: serial().primaryKey(),
  authorId: integer("author_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  status: statusEnum().default("active").notNull(),
});

export const tagTable = pgTable("tags", {
  id: serial().primaryKey(),
  tag: varchar({ length: 255 }).notNull().unique(),
});

export const noteToTagTable = pgTable(
  "notes_to_tags",
  {
    noteId: integer("note_id")
      .references(() => noteTable.id, { onDelete: "cascade" })
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tagTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [
    {
      pk: primaryKey({ columns: [table.noteId, table.tagId] }),
    },
  ],
);

export const optionTable = pgTable("options", {
  id: serial().primaryKey(),
  userId: integer("user_id")
    .references(() => userTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  theme: themeEnum().default("light").notNull(),
});

// Views
export const noteView = pgView("note_view").as((qb) =>
  qb
    .select({
      id: noteTable.id,
      authorId: noteTable.authorId,
      title: noteTable.title,
      content: noteTable.content,
      updatedAt: noteTable.updatedAt,
      status: noteTable.status,
      tags: sql<
        string[]
      >`COALESCE(jsonb_agg(${tagTable.tag}) FILTER (WHERE ${tagTable.id} IS NOT NULL), '[]')`.as(
        "tags",
      ),
    })
    .from(noteTable)
    .leftJoin(noteToTagTable, eq(noteToTagTable.noteId, noteTable.id))
    .leftJoin(tagTable, eq(noteToTagTable.tagId, tagTable.id))
    .groupBy(noteTable.id),
);
