import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const Deck: GlobalConfig = {
  slug: "deck",
  label: "Menú del deck",
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    description: "Secciones que aparecen en /deck. El orden de la lista es el orden en pantalla.",
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        // The seed script runs outside Next's server, where there is no
        // cache to revalidate.
        if (!req.context.skipRevalidate) revalidatePath("/deck");
      },
    ],
  },
  fields: [
    {
      name: "sections",
      label: "Secciones",
      labels: { singular: "Sección", plural: "Secciones" },
      type: "array",
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/components/admin/ArrayRowLabel#ArrayRowLabel",
        },
      },
      fields: [
        {
          type: "row",
          fields: [
            { name: "title", label: "Título", type: "text", required: true },
            {
              name: "color",
              label: "Color",
              type: "select",
              required: true,
              defaultValue: "primary",
              options: [
                { label: "Violeta", value: "primary" },
                { label: "Cian", value: "secondary" },
                { label: "Rosa", value: "accent" },
              ],
            },
          ],
        },
        { name: "content", label: "Contenido", type: "text", required: true },
        {
          name: "route",
          label: "Ruta",
          type: "text",
          admin: { description: "Ruta interna de la sección, ej. /quienes-somos" },
        },
      ],
    },
  ],
};
