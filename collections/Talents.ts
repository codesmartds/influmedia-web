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
    defaultColumns: ["name", "instagram", "tiktok", "updatedAt"],
  },
  fields: [
    {
      name: "thumbnail",
      label: "Foto",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "instagram",
      label: "Instagram",
      type: "text",
      admin: {
        description: "URL completa del perfil, ej. https://instagram.com/usuario",
      },
    },
    {
      name: "tiktok",
      label: "TikTok",
      type: "text",
      admin: {
        description: "URL completa del perfil, ej. https://tiktok.com/@usuario",
      },
    },
    {
      name: "content",
      label: "Contenido",
      type: "richText",
    },
  ],
};
