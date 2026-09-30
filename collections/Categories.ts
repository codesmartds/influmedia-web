import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Categoría",
    plural: "Categorías",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    useAsTitle: "name",
    defaultColumns: ["name", "color", "updatedAt"],
  },
  fields: [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
    },
    {
      name: "color",
      label: "Color",
      type: "text",
      required: true,
      defaultValue: "#6c3af0",
      validate: (value: string | null | undefined) =>
        (value && /^#[0-9a-f]{6}$/i.test(value)) || "Usa un color hexadecimal, ej. #6c3af0",
      admin: {
        description: "Color de acento de la categoría en el sitio.",
        components: {
          Field: "@/components/admin/ColorPickerField#ColorPickerField",
        },
      },
    },
    {
      // Reverse side of talents.category: computed, never stored here.
      name: "talents",
      label: "Talentos",
      type: "join",
      collection: "talents",
      on: "category",
      admin: {
        defaultColumns: ["name", "active"],
      },
    },
  ],
};
