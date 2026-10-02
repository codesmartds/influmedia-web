import { revalidateCollection } from "@/lib/revalidate";
import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/slug";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Artículo",
    plural: "Blog",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "published", "updatedAt"],
  },
  defaultSort: "-publishedAt",
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Slug follows the title unless an editor set one by hand.
        if (data?.title && !data.slug) data.slug = slugify(data.title);
        return data;
      },
    ],
    ...revalidateCollection,
  },
  fields: [
    { name: "title", label: "Título", type: "text", required: true },
    { name: "excerpt", label: "Resumen", type: "textarea", required: true, admin: { description: "Aparece en la tarjeta del listado." } },
    { name: "content", label: "Contenido", type: "richText", required: true },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Se genera del título si se deja vacío." },
    },
    {
      name: "published",
      label: "Publicado",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar", description: "Si está desactivado, no aparece en el blog." },
    },
    {
      name: "publishedAt",
      label: "Fecha de publicación",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
    },
    { name: "cover", label: "Portada", type: "upload", relationTo: "media", required: true, admin: { position: "sidebar" } },
    { name: "author", label: "Autor", type: "text", defaultValue: "Equipo Influmedia", admin: { position: "sidebar" } },
  ],
};
