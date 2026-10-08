import type { GalleryMoment } from "@/payload-types";

export type GalleryCategory = GalleryMoment["category"];
export type MediaFilter = "all" | "photo" | "video";
export type MomentsPage = { docs: GalleryMoment[]; hasNextPage: boolean; totalDocs: number };

// One full mosaic pattern cycle per page, so rows already on screen never
// change size when the next page arrives.
export const GALLERY_PAGE_SIZE = 16;

export const categoryLabels: Record<GalleryCategory, string> = {
  eventos: "Eventos",
  activaciones: "Activaciones",
  produccion: "Producción",
  equipo: "Equipo",
  reconocimientos: "Reconocimientos",
};
