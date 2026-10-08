import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Gallery items become "moments": category, optional video, place, date and
// description. Idempotent, since in development Payload may have pushed this
// schema already; empty captions are filled before the column turns required.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
     CREATE TYPE "public"."enum_gallery_items_category" AS ENUM('eventos', 'activaciones', 'produccion', 'equipo', 'reconocimientos');
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;
  UPDATE "gallery_items" SET "caption" = 'Momento Influmedia' WHERE "caption" IS NULL OR "caption" = '';
  ALTER TABLE "gallery_items" ALTER COLUMN "caption" SET NOT NULL;
  ALTER TABLE "gallery_items" ADD COLUMN IF NOT EXISTS "video_id" integer;
  ALTER TABLE "gallery_items" ADD COLUMN IF NOT EXISTS "category" "enum_gallery_items_category" DEFAULT 'eventos' NOT NULL;
  ALTER TABLE "gallery_items" ADD COLUMN IF NOT EXISTS "place" varchar;
  ALTER TABLE "gallery_items" ADD COLUMN IF NOT EXISTS "date" timestamp(3) with time zone;
  ALTER TABLE "gallery_items" ADD COLUMN IF NOT EXISTS "description" varchar;
  DO $$ BEGIN
    ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END $$;
  CREATE INDEX IF NOT EXISTS "gallery_items_video_idx" ON "gallery_items" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery_items" DROP CONSTRAINT IF EXISTS "gallery_items_video_id_media_id_fk";
  DROP INDEX IF EXISTS "gallery_items_video_idx";
  ALTER TABLE "gallery_items" ALTER COLUMN "caption" DROP NOT NULL;
  ALTER TABLE "gallery_items" DROP COLUMN IF EXISTS "video_id";
  ALTER TABLE "gallery_items" DROP COLUMN IF EXISTS "category";
  ALTER TABLE "gallery_items" DROP COLUMN IF EXISTS "place";
  ALTER TABLE "gallery_items" DROP COLUMN IF EXISTS "date";
  ALTER TABLE "gallery_items" DROP COLUMN IF EXISTS "description";
  DROP TYPE IF EXISTS "public"."enum_gallery_items_category";`)
}
