import type { CollectionConfig } from "payload";
import { revalidateCollection } from "@/lib/revalidate";

// Agency moments for /momentos: events, activations, productions, team and
// awards, as photos or videos. Newest first; the newest featured one opens
// the page.
export const GalleryMoments: CollectionConfig = {
  slug: "gallery-moments",
  labels: {
    singular: "Momento",
    plural: "Galería",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "featured"],
    description: "Fotos y videos de momentos de la agencia. Se ordenan por fecha, del más reciente al más antiguo.",
  },
  defaultSort: "-date",
  hooks: revalidateCollection,
  fields: [
    { name: "title", label: "Título", type: "text", required: true, admin: { description: "Ej. Lanzamiento de temporada con embajadores" } },
    {
      name: "image",
      label: "Imagen",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: { description: "La foto, o la portada si el momento es un video." },
    },
    {
      name: "video",
      label: "Video (opcional)",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { contains: "video" } },
      admin: { description: "MP4 o WebM. Se reproduce en la vista ampliada." },
    },
    { name: "description", label: "Descripción", type: "textarea", admin: { description: "Una o dos frases para la vista ampliada." } },
    {
      name: "category",
      label: "Categoría",
      type: "select",
      required: true,
      defaultValue: "eventos",
      index: true,
      options: [
        { label: "Eventos", value: "eventos" },
        { label: "Activaciones", value: "activaciones" },
        { label: "Producción", value: "produccion" },
        { label: "Equipo", value: "equipo" },
        { label: "Reconocimientos", value: "reconocimientos" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "date",
      label: "Fecha",
      type: "date",
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" } },
    },
    { name: "place", label: "Lugar", type: "text", admin: { position: "sidebar", description: "Ej. Ciudad de Guatemala" } },
    { name: "brand", label: "Marca", type: "text", admin: { position: "sidebar" } },
    {
      name: "featured",
      label: "Momento destacado",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "El más reciente marcado abre /momentos." },
    },
  ],
};
