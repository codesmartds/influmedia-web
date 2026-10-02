import type { CollectionConfig } from "payload";
import { revalidateCollection } from "@/lib/revalidate";

export const Team: CollectionConfig = {
  slug: "team",
  labels: {
    singular: "Miembro del equipo",
    plural: "Equipo",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order", "active"],
    description: "Personas que aparecen en /nosotros. Se ordenan por el campo Orden.",
  },
  defaultSort: "order",
  hooks: revalidateCollection,
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nombre", type: "text", required: true },
        { name: "role", label: "Cargo", type: "text", required: true },
      ],
    },
    { name: "bio", label: "Bio breve", type: "textarea", admin: { description: "Una o dos frases." } },
    { name: "linkedin", label: "LinkedIn", type: "text" },
    {
      name: "photo",
      label: "Foto",
      type: "upload",
      relationTo: "media",
      admin: { position: "sidebar", description: "Sin foto se muestran las iniciales." },
    },
    { name: "order", label: "Orden", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
    { name: "active", label: "Activo", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
  ],
};
