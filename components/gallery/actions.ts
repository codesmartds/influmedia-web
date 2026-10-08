"use server";

import { getPayload, type Where } from "payload";
import config from "@payload-config";
import { GALLERY_PAGE_SIZE, type GalleryCategory, type MediaFilter, type MomentsPage } from "./types";

/** One page of moments, newest first, for a category and media type. */
export async function loadMoments({
  page,
  category,
  kind,
}: {
  page: number;
  category: GalleryCategory | null;
  kind: MediaFilter;
}): Promise<MomentsPage> {
  const payload = await getPayload({ config });
  const and: Where[] = [];
  if (category) and.push({ category: { equals: category } });
  if (kind === "video") and.push({ video: { exists: true } });
  if (kind === "photo") and.push({ video: { exists: false } });
  const result = await payload.find({
    collection: "gallery-moments",
    where: and.length ? { and } : undefined,
    sort: "-date",
    limit: GALLERY_PAGE_SIZE,
    page: Math.max(1, Math.floor(page)),
    depth: 1,
  });
  return { docs: result.docs, hasNextPage: result.hasNextPage, totalDocs: result.totalDocs };
}
