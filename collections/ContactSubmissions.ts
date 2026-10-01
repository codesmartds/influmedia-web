import type { CollectionConfig } from "payload";
import { budgets } from "@/components/contact/budgets";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: {
    singular: "Solicitud de contacto",
    plural: "Solicitudes de contacto",
  },
  // Admin-only. Requests come through the contact form's server action,
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
    defaultColumns: ["name", "company", "need", "budget", "status", "createdAt"],
    description: "Proyectos enviados desde el formulario de /contacto.",
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", label: "Nombre", type: "text", required: true },
        { name: "company", label: "Compañía", type: "text", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", label: "Correo", type: "email", required: true },
        { name: "website", label: "Sitio web", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "budget", label: "Presupuesto", type: "select", required: true, options: [...budgets] },
        { name: "need", label: "Necesidad", type: "text", required: true },
      ],
    },
    { name: "message", label: "Mensaje", type: "textarea", required: true },
    {
      name: "status",
      label: "Estado",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "Nuevo", value: "new" },
        { label: "Contactado", value: "contacted" },
        { label: "Cerrado", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
