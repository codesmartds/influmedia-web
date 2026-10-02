import { revalidateGlobal } from "@/lib/revalidate";
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
  hooks: revalidateGlobal,
  fields: [
    {
      name: "items",
      label: "Imágenes",
      labels: { singular: "Imagen", plural: "Imágenes" },
      type: "array",
      admin: { description: "El orden de la lista es el orden en el mosaico. Las destacadas ocupan un espacio grande." },
      fields: [
        {
          name: "image",
          label: "Imagen",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          type: "row",
          fields: [
            { name: "caption", label: "Pie de foto", type: "text", admin: { description: "Ej. Lanzamiento de temporada · 2026" } },
            { name: "brand", label: "Marca", type: "text" },
          ],
        },
        { name: "featured", label: "Destacada", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
