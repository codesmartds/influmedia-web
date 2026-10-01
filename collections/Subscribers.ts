import type { CollectionConfig } from "payload";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  labels: {
    singular: "Suscriptor",
    plural: "Suscriptores",
  },
  // Admin-only. Sign-ups come through the newsletter server action, which
  // uses the Local API, so the public REST/GraphQL API can't create or list
  // subscribers.
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: "Contenido",
    useAsTitle: "email",
    defaultColumns: ["email", "source", "createdAt"],
  },
  defaultSort: "-createdAt",
  fields: [
    { name: "email", label: "Correo", type: "email", required: true, unique: true, index: true },
    {
      name: "source",
      label: "Origen",
      type: "text",
      defaultValue: "deck",
      admin: { readOnly: true, description: "Desde dónde se suscribió." },
    },
  ],
};
