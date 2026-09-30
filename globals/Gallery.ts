import type { GlobalConfig } from "payload";

export const Gallery: GlobalConfig = {
  slug: "gallery",
  label: "Galería",
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
  },
  fields: [
    {
      name: "items",
      label: "Imágenes",
      labels: { singular: "Imagen", plural: "Imágenes" },
      type: "array",
      fields: [
        {
          name: "image",
          label: "Imagen",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
