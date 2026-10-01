export const formatPostDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const POSTS_PER_PAGE = 8;
