import { revalidateCollection } from "@/lib/revalidate";
import type { CollectionConfig } from "payload";

export const Talents: CollectionConfig = {
  slug: "talents",
  labels: {
    singular: "Talento",
    plural: "Talentos",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "active", "updatedAt"],
  },
  hooks: revalidateCollection,
  fields: [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "content",
      label: "Contenido",
      type: "richText",
    },
    {
      name: "active",
      label: "Activo",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Si está desactivado, no aparece en el listado del sitio.",
      },
    },
    {
      name: "thumbnail",
      label: "Foto",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category",
      label: "Categoría",
      type: "relationship",
      relationTo: "categories",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "instagram",
      label: "Instagram",
      type: "text",
      admin: {
        position: "sidebar",
        description: "URL completa del perfil, ej. https://instagram.com/usuario",
      },
    },
    {
      name: "tiktok",
      label: "TikTok",
      type: "text",
      admin: {
        position: "sidebar",
        description: "URL completa del perfil, ej. https://tiktok.com/@usuario",
      },
    },
  ],
};
