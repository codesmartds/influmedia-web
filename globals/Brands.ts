import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const Brands: GlobalConfig = {
  slug: "brands",
  label: "Marcas",
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        if (!req.context.skipRevalidate) revalidatePath("/clientes");
      },
    ],
  },
  fields: [
    {
      name: "items",
      label: "Marcas",
      labels: { singular: "Marca", plural: "Marcas" },
      type: "array",
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/components/admin/ArrayRowLabel#ArrayRowLabel",
        },
      },
      fields: [
        {
          name: "name",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          name: "image",
          label: "Logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "industry",
          label: "Industria",
          type: "select",
          options: [
            { label: "FMCG", value: "fmcg" },
            { label: "Beauty", value: "beauty" },
            { label: "Retail", value: "retail" },
            { label: "Entertainment", value: "entertainment" },
          ],
          admin: { description: "Para filtrar las marcas en /clientes." },
        },
      ],
    },
  ],
};
