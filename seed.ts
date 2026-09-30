import { getPayload } from "payload";
import config from "@payload-config";

// Array order is display order on /deck.
const deckSections = [
  { title: "Quiénes somos", content: "Powered by people.", color: "primary", route: "/quienes-somos" },
  { title: "Nuestra historia", content: "De Guatemala a la región.", color: "secondary", route: "/historia" },
  { title: "Qué hacemos", content: "Estrategia, contenido y comunidad.", color: "accent", route: "/que-hacemos" },
  { title: "Impacto + clientes", content: "Escala, operación y marcas.", color: "secondary", route: "/impacto" },
  { title: "Por qué Influmedia", content: "Menos fricción. Más control.", color: "primary", route: "/por-que-influmedia" },
  { title: "Nuestro enfoque", content: "Fit, afinidad y medición.", color: "accent", route: "/enfoque" },
  { title: "Nuestro sistema", content: "Planning · Onway · Postbuy.", color: "primary", route: "/sistema" },
  { title: "Trabajo en acción", content: "Creators + campañas reales.", color: "secondary", route: "/trabajo" },
] as const;

// Globals with a revalidation hook skip it when this is set: the script
// runs outside Next's server, so there is no cache to revalidate.
const SKIP_REVALIDATE = { context: { skipRevalidate: true } };

// Exported so a future authenticated seed route can reuse it. No
// process.exit() in here, which would kill a server if called from one.
export async function seed() {
  const payload = await getPayload({ config });

  // Globals are upserted, not created: a global always exists.
  await payload.updateGlobal({
    slug: "deck",
    data: { sections: deckSections.map((section) => ({ ...section })) },
    ...SKIP_REVALIDATE,
  });

  payload.logger.info(`Seeded deck with ${deckSections.length} sections`);
}

// No `users` are ever seeded: the first admin is created from /admin.
await seed();
process.exit(0);
