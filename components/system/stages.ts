// Campaign stages, in process order.
export const stages = [
  { slug: "planning", title: "Planning", text: "Definir, validar y proyectar" },
  { slug: "onway", title: "Onway", text: "Coordinar, monitorear y alertar" },
  { slug: "postbuy", title: "Postbuy", text: "Reportar, interpretar y aprender" },
] as const;

export type StageSlug = (typeof stages)[number]["slug"];
