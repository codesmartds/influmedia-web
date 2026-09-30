// Reading order of the campaign-system pages. Prev/next links are derived
// from this list, so adding or reordering a page only means editing it.
// Onway and Postbuy join here once their pages exist.
export const sequence = [
  "/sistema/planning",
  "/sistema/planning/analisis",
  "/sistema/planning/proyeccion",
] as const;

/** Where "← Proceso" leads: the stage menu. */
export const sequenceIndexHref = "/sistema";
