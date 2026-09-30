// Campaign stages, in process order. Shared by the /sistema menu and the
// stage navbar so both stay in sync.
export const stages = [
  { slug: "planning", title: "Planning", text: "Definir, validar y proyectar" },
  { slug: "onway", title: "Onway", text: "Coordinar, monitorear y alertar" },
  { slug: "postbuy", title: "Postbuy", text: "Reportar, interpretar y aprender" },
] as const;

export const stageHref = (slug: string) => `/sistema/${slug}`;
