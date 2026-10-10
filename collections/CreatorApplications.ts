import type { CollectionConfig } from "payload";
import { audienceSizes } from "@/components/creators/audienceSizes";

export const CreatorApplications: CollectionConfig = {
  slug: "creator-applications",
  labels: {
    singular: "Aplicación de creador",
    plural: "Aplicaciones de creadores",
  },
  // Admin-only. Applications come through the /talento-exclusivo server action,
  // which uses the Local API; the public API can't create or list them.
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: "Contacto",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "audienceSize", "country", "status", "createdAt"],
    description: "Creadores que aplicaron al roster desde /talento-exclusivo.",
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nombre", type: "text", required: true },
        { name: "email", label: "Correo", type: "email", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", label: "Teléfono / WhatsApp", type: "text" },
        { name: "country", label: "País", type: "text", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "instagram", label: "Instagram", type: "text" },
        { name: "tiktok", label: "TikTok", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "category", label: "Categoría", type: "relationship", relationTo: "categories", required: true },
        {
          name: "audienceSize",
          label: "Seguidores (red principal)",
          type: "select",
          required: true,
          options: [...audienceSizes],
        },
      ],
    },
    { name: "message", label: "Sobre su contenido", type: "textarea" },
    {
      name: "status",
      label: "Estado",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "Nueva", value: "new" },
        { label: "En revisión", value: "reviewing" },
        { label: "Aceptada", value: "accepted" },
        { label: "Descartada", value: "declined" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
