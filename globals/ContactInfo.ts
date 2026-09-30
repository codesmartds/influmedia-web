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
        if (!req.context.skipRevalidate) revalidatePath("/contacto");
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
  ],
};
