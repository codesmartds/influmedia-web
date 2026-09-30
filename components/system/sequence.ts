// Reading order of the campaign-system pages. Prev/next links are derived
// from this list, so adding or reordering a page only means editing it.
export const sequence = [
  "/sistema/planning",
  "/sistema/planning/analisis",
  "/sistema/planning/proyeccion",
  "/sistema/onway",
  "/sistema/onway/command",
  "/sistema/postbuy",
  "/sistema/postbuy/reportes",
] as const;

/** Where "← Proceso" leads: the stage menu. */
export const sequenceIndexHref = "/sistema";
