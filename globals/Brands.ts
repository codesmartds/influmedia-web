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
      ],
    },
  ],
};
