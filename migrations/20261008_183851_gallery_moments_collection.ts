import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_moments_category" AS ENUM('eventos', 'activaciones', 'produccion', 'equipo', 'reconocimientos');
  CREATE TABLE "gallery_moments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"video_id" integer,
  	"description" varchar,
  	"category" "enum_gallery_moments_category" DEFAULT 'eventos' NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"place" varchar,
  	"brand" varchar,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gallery_moments_id" integer;
  ALTER TABLE "gallery_moments" ADD CONSTRAINT "gallery_moments_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_moments" ADD CONSTRAINT "gallery_moments_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "gallery_moments_image_idx" ON "gallery_moments" USING btree ("image_id");
  CREATE INDEX "gallery_moments_video_idx" ON "gallery_moments" USING btree ("video_id");
  CREATE INDEX "gallery_moments_category_idx" ON "gallery_moments" USING btree ("category");
  CREATE INDEX "gallery_moments_date_idx" ON "gallery_moments" USING btree ("date");
  CREATE INDEX "gallery_moments_updated_at_idx" ON "gallery_moments" USING btree ("updated_at");
  CREATE INDEX "gallery_moments_created_at_idx" ON "gallery_moments" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_moments_fk" FOREIGN KEY ("gallery_moments_id") REFERENCES "public"."gallery_moments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_gallery_moments_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_moments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "gallery_moments" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "gallery_moments" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gallery_moments_fk";
  
  DROP INDEX "payload_locked_documents_rels_gallery_moments_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gallery_moments_id";
  DROP TYPE "public"."enum_gallery_moments_category";`)
}
