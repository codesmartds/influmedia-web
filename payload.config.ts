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
import { Brands } from "./globals/Brands";
import { Gallery } from "./globals/Gallery";
import { ContactInfo } from "./globals/ContactInfo";
import { Deck } from "./globals/Deck";

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
  collections: [Users, Media, Talents, Categories, Posts, Subscribers],
  globals: [Deck, Brands, Gallery, ContactInfo],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
});
