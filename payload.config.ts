import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { gcsStorage } from "@payloadcms/storage-gcs";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Talents } from "./collections/Talents";
import { Categories } from "./collections/Categories";
import { Posts } from "./collections/Posts";
import { Subscribers } from "./collections/Subscribers";
import { ContactSubmissions } from "./collections/ContactSubmissions";
import { CreatorApplications } from "./collections/CreatorApplications";
import { CaseStudies } from "./collections/CaseStudies";
import { Testimonials } from "./collections/Testimonials";
import { Team } from "./collections/Team";
import { Brands } from "./globals/Brands";
import { Gallery } from "./globals/Gallery";
import { ContactInfo } from "./globals/ContactInfo";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    components: {
      graphics: {
        Logo: "/components/admin/Logo#Logo",
        Icon: "/components/admin/Icon#Icon",
      },
    },
    meta: {
      titleSuffix: " | Influmedia",
      icons: [{ rel: "icon", type: "image/png", url: "/images/brand/icon.png" }],
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Talents,
    Categories,
    CaseStudies,
    Testimonials,
    Team,
    Posts,
    Subscribers,
    ContactSubmissions,
    CreatorApplications,
  ],
  globals: [Brands, Gallery, ContactInfo],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    // sites-db is shared and allows ~25 connections: 4 per instance, 3 instances max.
    pool: { connectionString: process.env.DATABASE_URL || "", max: 4 },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  plugins: [
    // Media lives in Google Cloud Storage when GCS_BUCKET is set (Cloud Run
    // and, optionally, local dev); otherwise it falls back to the local
    // media/ folder. Credentials come from Application Default Credentials:
    // the Cloud Run service account in production, `gcloud auth
    // application-default login` locally. The bucket is publicly readable,
    // so files are served straight from storage.googleapis.com.
    gcsStorage({
      enabled: Boolean(process.env.GCS_BUCKET),
      bucket: process.env.GCS_BUCKET || "",
      options: { projectId: process.env.GCS_PROJECT_ID },
      collections: {
        media: {
          // Keeps each environment's files apart in the same bucket.
          prefix: process.env.GCS_PREFIX || "production",
          disablePayloadAccessControl: true,
        },
      },
    }),
  ],
});
