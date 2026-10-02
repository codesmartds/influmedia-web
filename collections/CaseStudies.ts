import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";
import { slugify } from "@/lib/slug";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: {
    singular: "Caso de éxito",
    plural: "Casos de éxito",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "brandName", "featured", "published", "publishedAt"],
    description: "Campañas reales: marca, creadores, objetivo y resultados.",
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
    afterChange: [
      ({ req }) => {
        // Featured cases show on the home page.
        if (!req.context.skipRevalidate) revalidatePath("/");
      },
    ],
  },
  fields: [
    { name: "title", label: "Título", type: "text", required: true, admin: { description: "Ej. \"Lanzamiento de Flamin' Hot en Guatemala\"." } },
    {
      type: "row",
      fields: [
        { name: "brandName", label: "Marca", type: "text", required: true },
        { name: "brandLogo", label: "Logo de la marca", type: "upload", relationTo: "media" },
      ],
    },
    { name: "objective", label: "Objetivo", type: "textarea", required: true, admin: { description: "Qué buscaba la marca, en una o dos frases." } },
    { name: "approach", label: "Qué hicimos", type: "textarea", required: true },
    {
      name: "results",
      label: "Resultados",
      labels: { singular: "Resultado", plural: "Resultados" },
      type: "array",
      minRows: 1,
      maxRows: 4,
      admin: {
        description: "Cifras destacadas, ej. 2.4M · Alcance. Entre 1 y 4.",
        components: { RowLabel: "@/components/admin/ArrayRowLabel#ArrayRowLabel" },
      },
      fields: [
        {
          type: "row",
          fields: [
            { name: "name", label: "Cifra", type: "text", required: true, admin: { description: "Ej. 2.4M, +38%, 4.8x" } },
            { name: "label", label: "Qué mide", type: "text", required: true, admin: { description: "Ej. Alcance" } },
          ],
        },
      ],
    },
    { name: "content", label: "Historia completa", type: "richText" },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Se genera del título si se deja vacío." },
    },
    { name: "cover", label: "Imagen principal", type: "upload", relationTo: "media", required: true, admin: { position: "sidebar" } },
    {
      name: "talents",
      label: "Creadores",
      type: "relationship",
      relationTo: "talents",
      hasMany: true,
      admin: { position: "sidebar" },
    },
    { name: "category", label: "Categoría", type: "relationship", relationTo: "categories", admin: { position: "sidebar" } },
    {
      name: "featured",
      label: "Destacado en el home",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "published",
      label: "Publicado",
      type: "checkbox",
      defaultValue: true,
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      label: "Fecha de la campaña",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" } },
    },
  ],
};
