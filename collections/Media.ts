import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Archivo",
    plural: "Archivos",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Configuración",
  },
  upload: {
    // Local disk for now; swap for a storage adapter (e.g. Vercel Blob)
    // before deploying.
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "center" },
      { name: "card", width: 900 },
    ],
    // Without this, the admin list/edit views try to resolve a local
    // file path that no longer exists once storage is Blob-backed, and
    // every preview breaks. Falling back to doc.url covers uploads
    // that predate the thumbnail size or aren't images.
    adminThumbnail: ({ doc }) => {
      const sizes = doc?.sizes as { thumbnail?: { url?: string } } | undefined;
      return sizes?.thumbnail?.url || (doc?.url as string | undefined) || false;
    },
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      label: "Texto alternativo",
      type: "text",
      required: true,
    },
  ],
};
