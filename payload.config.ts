import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
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
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
});
