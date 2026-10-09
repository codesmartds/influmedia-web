import path from "path";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";

// Client logos (white on transparent), in carousel order.
const BRAND_LOGOS = path.join(process.cwd(), "public", "images", "brands");

type Industry = "fmcg" | "beauty" | "retail" | "entertainment";

// Industries are an editorial call; banking and fuel fit none of the four and
// stay unassigned (visible only with no filter active).
export const brands: { name: string; logo: string; industry?: Industry }[] = [
  { name: "Coca-Cola", logo: "Coca-Cola-blanco.png", industry: "fmcg" },
  { name: "McDonald's", logo: "03-McDonalds-blanco.png", industry: "retail" },
  { name: "Burger King", logo: "Burger-King-blanco.png", industry: "retail" },
  { name: "Gallo", logo: "Gallo-blanco.png", industry: "fmcg" },
  { name: "Nivea", logo: "Nivea-blanco.png", industry: "beauty" },
  { name: "CeraVe", logo: "CeraVe-blanco.png", industry: "beauty" },
  { name: "Banrural", logo: "11-Banrural-blanco.png" },
  { name: "Banco Industrial", logo: "12-Bi-blanco.png" },
  { name: "Promerica", logo: "10-Promerica-blanco.png" },
  { name: "Shell", logo: "Logotipo Shell blanco en fondo transparente.png" },
  { name: "Fanta", logo: "Fanta-blanco.png", industry: "fmcg" },
  { name: "Dorada Ice", logo: "Dorada-Ice-blanco.png", industry: "fmcg" },
  { name: "Quezalteca", logo: "23a6c979-7fe8-4009-87b1-1b44e124f7cc.png", industry: "fmcg" },
  { name: "Olmeca", logo: "Olmeca-blanco.png", industry: "fmcg" },
  { name: "Salvavidas Saborizada", logo: "Salvavidas-Saborizada-blanco.png", industry: "fmcg" },
  { name: "Purina Felix", logo: "Purina-Felix-blanco.png", industry: "fmcg" },
  { name: "Miniso", logo: "Miniso-blanco.png", industry: "retail" },
  { name: "Temu", logo: "mg15632.png", industry: "retail" },
  { name: "Farmacias Cruz Verde", logo: "Farmacias-Cruz-Verde-blanco.png", industry: "retail" },
  { name: "Super 24", logo: "Super24-blanco.png", industry: "retail" },
  { name: "Meykos", logo: "Meykos-blanco.png", industry: "beauty" },
  { name: "Cremy", logo: "Cremy-blanco.png", industry: "fmcg" },
  { name: "Skillets", logo: "01-Skillets-blanco.png", industry: "retail" },
  { name: "Tacos Chulos", logo: "02-Tacos-Chulos-blanco (1).png", industry: "retail" },
  { name: "Tacos Chulos Verde", logo: "Tacos-Chulos-Verde-blanco.png", industry: "retail" },
  { name: "Graciela", logo: "05-Graciela-blanco.png", industry: "retail" },
  { name: "El Pinche", logo: "08-El-Pinche-blanco.png", industry: "retail" },
  { name: "Filemón", logo: "Filemon-blanco.png", industry: "retail" },
  { name: "La Spritzeria", logo: "La-Spritzeria-blanco.png", industry: "entertainment" },
  { name: "Las Tablas Mucha Brasa", logo: "af043f8c-d045-4075-9467-7cfea6323e25.png", industry: "retail" },
];

// The script runs outside Next's server: no cache to revalidate per document.
const SKIP_REVALIDATE = { context: { skipRevalidate: true } };

/**
 * Empties the brands global and deletes its logo files (from the bucket too).
 * Case studies pointing at a removed logo lose that reference first.
 */
export async function resetBrands(payload?: Payload) {
  payload ??= await getPayload({ config });

  const current = await payload.findGlobal({ slug: "brands", depth: 0 });
  const ids = (current.items ?? [])
    .map((b) => (typeof b.image === "object" ? b.image?.id : b.image))
    .filter((id): id is number => typeof id === "number");

  await payload.updateGlobal({ slug: "brands", data: { items: [] }, ...SKIP_REVALIDATE });
  if (ids.length === 0) return 0;

  await payload.update({
    collection: "case-studies",
    where: { brandLogo: { in: ids } },
    data: { brandLogo: null },
    ...SKIP_REVALIDATE,
  });
  const { docs, errors } = await payload.delete({ collection: "media", where: { id: { in: ids } }, ...SKIP_REVALIDATE });
  // A media doc whose file is already gone can fail to unlink; drop the row directly.
  if (errors.length > 0) {
    await payload.db.deleteMany({ collection: "media", where: { id: { in: errors.map((e) => e.id) } } });
  }
  return docs.length + errors.length;
}

/** Uploads every logo and stores the global in list order. Expects a clean global. */
export async function seedBrands(payload?: Payload) {
  payload ??= await getPayload({ config });

  const items = [];
  for (const brand of brands) {
    const created = await payload.create({
      collection: "media",
      data: { alt: `Logo de ${brand.name}` },
      filePath: path.join(BRAND_LOGOS, brand.logo),
    });
    items.push({ name: brand.name, image: created.id, industry: brand.industry ?? null });
  }
  await payload.updateGlobal({ slug: "brands", data: { items }, ...SKIP_REVALIDATE });
  return items.length;
}
