import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Idempotent: in development Payload may have pushed this schema already.
   DO $$ BEGIN
     CREATE TYPE "public"."enum_posts_topic" AS ENUM('estrategia', 'metricas', 'formatos', 'categorias', 'creative-tech');
   EXCEPTION WHEN duplicate_object THEN NULL;
   END $$;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "topic" "enum_posts_topic";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN IF EXISTS "topic";
  DROP TYPE IF EXISTS "public"."enum_posts_topic";`)
}
