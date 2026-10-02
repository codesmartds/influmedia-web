import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const ContactInfo: GlobalConfig = {
  slug: "contact-info",
  label: "Información de contacto",
  access: {
    read: () => true,
  },
  admin: {
    group: "Configuración",
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        // Contact details render in the footer of every page.
        if (!req.context.skipRevalidate) revalidatePath("/", "layout");
      },
    ],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "email", label: "Correo", type: "email" },
        {
          name: "phone",
          label: "Teléfono",
          type: "text",
          admin: {
            description: "Número con código de país (+502 3033-8063) o enlace de WhatsApp (https://wa.me/50230338063).",
          },
        },
      ],
    },
    { name: "address", label: "Dirección", type: "textarea" },
    {
      name: "mapEmbedUrl",
      label: "Mapa (URL de embed)",
      type: "text",
      admin: { description: "El src del iframe de Google Maps (Compartir › Insertar un mapa)." },
    },
    {
      name: "instagram",
      label: "Instagram",
      type: "text",
      admin: { description: "URL completa del perfil" },
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      type: "text",
      admin: { description: "URL completa del perfil" },
    },
    {
      name: "tiktok",
      label: "TikTok",
      type: "text",
      admin: { description: "URL completa del perfil" },
    },
    {
      name: "needs",
      label: "Opciones de necesidad",
      labels: { singular: "Opción", plural: "Opciones" },
      type: "array",
      admin: {
        description: "Lo que el visitante puede elegir en el campo \"¿Qué necesitas?\" del formulario de contacto.",
        components: { RowLabel: "@/components/admin/ArrayRowLabel#ArrayRowLabel" },
      },
      fields: [{ name: "name", label: "Opción", type: "text", required: true }],
    },
  ],
};
