ALTER TABLE "notes" DROP CONSTRAINT "notes_authorId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "notes_to_tags" DROP CONSTRAINT "notes_to_tags_noteId_notes_id_fk";
--> statement-breakpoint
ALTER TABLE "notes_to_tags" DROP CONSTRAINT "notes_to_tags_tagId_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "author_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "notes_to_tags" ADD COLUMN "note_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "notes_to_tags" ADD COLUMN "tag_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes_to_tags" ADD CONSTRAINT "notes_to_tags_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes_to_tags" ADD CONSTRAINT "notes_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN "authorId";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN "updatedAt";--> statement-breakpoint
ALTER TABLE "notes_to_tags" DROP COLUMN "noteId";--> statement-breakpoint
ALTER TABLE "notes_to_tags" DROP COLUMN "tagId";