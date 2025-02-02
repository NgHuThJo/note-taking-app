import { sql } from "drizzle-orm";
import {
  check,
  integer,
  serial,
  pgTable,
  varchar,
  timestamp,
  primaryKey,
  pgEnum,
  text,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("note_status", ["active", "archived"]);

export const userTable = pgTable("users", {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const noteTable = pgTable("notes", {
  id: serial().primaryKey(),
  authorId: integer().references(() => userTable.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`NOW()`),
  status: statusEnum().default("active"),
});

export const tagTable = pgTable("tags", {
  id: serial().primaryKey(),
  tag: varchar({ length: 255 }).notNull(),
});

export const noteToTagTable = pgTable(
  "notes_to_tags",
  {
    noteId: integer()
      .references(() => noteTable.id, { onDelete: "cascade" })
      .notNull(),
    tagId: integer()
      .references(() => tagTable.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [
    {
      pk: primaryKey({ columns: [table.noteId, table.tagId] }),
    },
  ],
);

export const optionTable = pgTable(
  "options",
  {
    id: serial().primaryKey(),
    theme: varchar({ length: 6 }).notNull(),
  },
  (table) => [
    {
      checkConstraint: check(
        "theme_check",
        sql`${table.theme} ~ '^([0-9a-fA-F]{2}){3}$'`,
      ),
    },
  ],
);
