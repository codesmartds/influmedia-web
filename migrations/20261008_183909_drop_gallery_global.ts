import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Copy every moment from the old global into the collection, keeping the
   -- list order through the date (items without a date get one day apart).
   -- Skipped when the global tables are already gone.
   DO $$ BEGIN
     IF to_regclass('public.gallery_items') IS NOT NULL THEN
       INSERT INTO "gallery_moments" ("title", "image_id", "video_id", "description", "category", "date", "place", "brand", "featured", "updated_at", "created_at")
       SELECT "caption", "image_id", "video_id", "description",
              "category"::text::"enum_gallery_moments_category",
              COALESCE("date", now() - ("_order" * interval '1 day')),
              "place", "brand", COALESCE("featured", false), now(), now()
       FROM "gallery_items"
       WHERE "image_id" IS NOT NULL
       ORDER BY "_order";
     END IF;
   END $$;
  DROP TABLE IF EXISTS "gallery_items" CASCADE;
  DROP TABLE IF EXISTS "gallery" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_gallery_items_category";`)
}

// down recreates the empty global tables; moments stay in gallery_moments.
export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_items_category" AS ENUM('eventos', 'activaciones', 'produccion', 'equipo', 'reconocimientos');
  CREATE TABLE "gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"video_id" integer,
  	"caption" varchar NOT NULL,
  	"category" "enum_gallery_items_category" DEFAULT 'eventos' NOT NULL,
  	"place" varchar,
  	"date" timestamp(3) with time zone,
  	"brand" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "gallery_items_order_idx" ON "gallery_items" USING btree ("_order");
  CREATE INDEX "gallery_items_parent_id_idx" ON "gallery_items" USING btree ("_parent_id");
  CREATE INDEX "gallery_items_image_idx" ON "gallery_items" USING btree ("image_id");
  CREATE INDEX "gallery_items_video_idx" ON "gallery_items" USING btree ("video_id");`)
}
