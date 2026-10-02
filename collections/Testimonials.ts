import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testimonio",
    plural: "Testimonios",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    useAsTitle: "author",
    defaultColumns: ["author", "type", "company", "active", "updatedAt"],
    description: "Voces de marcas y de creadores. Solo testimonios reales y con permiso.",
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        if (!req.context.skipRevalidate) revalidatePath("/");
      },
    ],
  },
  fields: [
    {
      name: "type",
      label: "Quién habla",
      type: "radio",
      required: true,
      defaultValue: "brand",
      options: [
        { label: "Marca / cliente", value: "brand" },
        { label: "Creador", value: "creator" },
      ],
      admin: { layout: "horizontal" },
    },
    { name: "quote", label: "Testimonio", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        { name: "author", label: "Nombre", type: "text", required: true },
        { name: "role", label: "Cargo", type: "text", admin: { description: "Ej. Brand Manager" } },
      ],
    },
    {
      name: "company",
      label: "Empresa / marca",
      type: "text",
      admin: { condition: (_, siblingData) => siblingData?.type === "brand" },
    },
    {
      name: "talent",
      label: "Creador",
      type: "relationship",
      relationTo: "talents",
      admin: {
        description: "Si es un creador del roster, usa su foto y nombre de la ficha.",
        condition: (_, siblingData) => siblingData?.type === "creator",
      },
    },
    { name: "photo", label: "Foto", type: "upload", relationTo: "media", admin: { position: "sidebar" } },
    {
      name: "active",
      label: "Activo",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Si está desactivado, no aparece en el sitio." },
    },
  ],
};
