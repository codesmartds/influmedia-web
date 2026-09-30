import path from "path";
import { fileURLToPath } from "url";
import { getPayload, type Payload } from "payload";
import config from "@payload-config";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const TALENT_PHOTOS = path.join(dirname, "seed-source", "talents");
const BRAND_LOGOS = path.join(dirname, "seed-source", "brands");

// Client logos, in the order of the deck's "Algunos clientes" grid. The deck
// shows the industry filters but doesn't say which brand is which, so these
// industries are an editorial call; banking and ride-hailing fit none of the
// four and stay unassigned (visible only with no filter active).
const brands: { name: string; logo: string; industry?: "fmcg" | "beauty" | "retail" | "entertainment" }[] = [
  { name: "Gallo", logo: "gallo.png", industry: "fmcg" },
  { name: "Bam", logo: "bam.png" },
  { name: "Doritos", logo: "doritos.png", industry: "fmcg" },
  { name: "McDonald's", logo: "mcdonalds.png", industry: "retail" },
  { name: "Vuse", logo: "vuse.png", industry: "fmcg" },
  { name: "Eucerin", logo: "eucerin.png", industry: "beauty" },
  { name: "L'Oréal", logo: "loreal.png", industry: "beauty" },
  { name: "Garnier", logo: "garnier.png", industry: "beauty" },
  { name: "Maybelline", logo: "maybelline.png", industry: "beauty" },
  { name: "Shell", logo: "shell.png", industry: "retail" },
  { name: "Grupo Promerica", logo: "grupo-promerica.png" },
  { name: "inDrive", logo: "indrive.png" },
  { name: "Miniso", logo: "miniso.png", industry: "retail" },
  { name: "Chokis", logo: "chokis.png", industry: "fmcg" },
  { name: "Temu", logo: "temu.png", industry: "retail" },
  { name: "Quezalteca", logo: "quezalteca.png", industry: "fmcg" },
  { name: "Lay's", logo: "lays.png", industry: "fmcg" },
  { name: "Dorada Ice", logo: "dorada-ice.png", industry: "fmcg" },
];

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

// Social links from the deck's closing slide (tracking params removed; the
// LinkedIn link in the deck pointed at the admin dashboard, this is the
// public company page).
const contactInfo = {
  instagram: "https://www.instagram.com/influmediaca",
  tiktok: "https://www.tiktok.com/@influmediagt",
  linkedin: "https://www.linkedin.com/company/73252936/",
};

// Categories from "Exclusive Creators 2026", with each one's accent color.
// `folder` is the photo folder in seed-source/talents.
const categories = [
  { name: "Lifestyle", color: "#6c4ef0", folder: "Lifestyle" },
  { name: "Comedia", color: "#e0a82e", folder: "Comedia" },
  { name: "Fashion & Beauty", color: "#d946a8", folder: "Fashion_Beauty" },
  { name: "Entretenimiento", color: "#e83e8c", folder: "Entretenimiento" },
  { name: "Fitness", color: "#34d399", folder: "Fitness" },
  { name: "Deporte", color: "#f0922e", folder: "Deporte" },
  { name: "Gaming", color: "#14b8b8", folder: "Gaming" },
  { name: "Creative Tech / IA", color: "#4f8ff7", folder: "Creative_Tech_IA" },
  { name: "Automotriz", color: "#ef4f4f", folder: "Automotriz" },
] as const;

type CategoryName = (typeof categories)[number]["name"];

// One entry per talent page in the deck (pages 24–70). Handles transcribed
// from the deck; a talent without a network there has none here.
const talents: { name: string; category: CategoryName; photo: string; instagram?: string; tiktok?: string }[] = [
  { name: "Sandy Méndez", category: "Lifestyle", photo: "13_p24_Sandy_Mendez.jpg", instagram: "sandy_mendezgt", tiktok: "sandymendez5" },
  { name: "Gaby Rojas", category: "Lifestyle", photo: "13_p25_Gaby_Rojas.jpg", instagram: "gabygabyr_", tiktok: "gabygabyr_" },
  { name: "Jimena Maradiaga", category: "Lifestyle", photo: "13_p26_Jimena_Maradiaga.jpg", instagram: "jimenamaradiaga", tiktok: "jimenamaradiaga" },
  { name: "Jafita", category: "Lifestyle", photo: "13_p27_Jafita.jpg", instagram: "jafita_sinto", tiktok: "jafita_sinto" },
  { name: "Esmeralda", category: "Lifestyle", photo: "13_p28_Esmeralda.jpg", instagram: "esmeralda.sc", tiktok: "esmsan012" },
  { name: "Hugo Girón", category: "Lifestyle", photo: "13_p29_Hugo_Giron.jpg", instagram: "hugo_gironv", tiktok: "hugo.gironv" },
  { name: "Reynery BR", category: "Lifestyle", photo: "13_p30_Reynery_BR.jpg", instagram: "reynerybr", tiktok: "reynerybr" },
  { name: "Anthony Sinto", category: "Lifestyle", photo: "13_p31_Anthony_Sinto.jpg", instagram: "anthony_sinto_" },
  { name: "Dayana Carbajal", category: "Lifestyle", photo: "13_p32_Dayana_Carbajal.jpg", instagram: "dayana____c", tiktok: "dayanacarbaja" },
  { name: "Paola Silvera", category: "Lifestyle", photo: "13_p33_Paola_Silvera.jpg", instagram: "pao_19silv", tiktok: "paolasilv.19" },
  { name: "Marie Castillo", category: "Lifestyle", photo: "13_p34_Marie_Castillo.jpg", instagram: "mymariecast" },
  { name: "Michi", category: "Lifestyle", photo: "13_p35_Michi.jpg", tiktok: ".michi_ii" },
  { name: "Jacky Sosa", category: "Lifestyle", photo: "13_p36_Jacky_Sosa.jpg", instagram: "jackeline.ivana" },
  { name: "Sara Garcia", category: "Lifestyle", photo: "13_p37_Sara_Garcia.jpg", instagram: "soysaragarcia", tiktok: "soysaragarciaa" },
  { name: "Daniela Ramos", category: "Lifestyle", photo: "13_p38_Daniela_Ramos.jpg", instagram: "daniela310_", tiktok: "daniela310_" },
  { name: "Maryori", category: "Comedia", photo: "13_p40_Maryori.jpg", instagram: "marmejia._", tiktok: "soy_mar_." },
  { name: "El Primaso", category: "Comedia", photo: "13_p41_El_Primaso.jpg", instagram: "elprimaso", tiktok: "elprimaso_" },
  { name: "Kenan", category: "Comedia", photo: "13_p42_Kenan.jpg", instagram: "kenanknb", tiktok: "kenannknb" },
  { name: "Hugo Zielke", category: "Comedia", photo: "13_p43_Hugo_Zielke.jpg", instagram: "hzielke_", tiktok: "hzielke" },
  { name: "MakeUp Chikys", category: "Fashion & Beauty", photo: "13_p45_MakeUp_Chikys.jpg", instagram: "makeup_chikys", tiktok: "makeup_chikys" },
  { name: "Victoria Romanof", category: "Fashion & Beauty", photo: "13_p46_Victoria_Romanoff.jpg", instagram: "victoriaromanof", tiktok: "victoriaromanof" },
  { name: "Macarena", category: "Fashion & Beauty", photo: "13_p47_Macarena.jpg", instagram: "macamaria_", tiktok: "macamaria_" },
  { name: "Diana Castro", category: "Fashion & Beauty", photo: "13_p48_Diana_Castro.jpg", instagram: "soydianacastro", tiktok: "soydianacastro" },
  { name: "Siloé Camacho", category: "Fashion & Beauty", photo: "13_p49_Siloe_Camacho.jpg", instagram: "siloecamacho", tiktok: "siloecamacho" },
  { name: "Mariel", category: "Fashion & Beauty", photo: "13_p50_Mariel.jpg", instagram: "mariel.hrd", tiktok: "babymariel188" },
  { name: "Andrea Celada", category: "Fashion & Beauty", photo: "13_p51_Andrea_Celada.jpg", instagram: "andreaceladav", tiktok: "andreacelada" },
  { name: "Claudia Perez", category: "Fashion & Beauty", photo: "13_p52_Claudia_Perez.jpg", instagram: "claudiaperezgt", tiktok: "claudiaperez" },
  { name: "Joshua Aldana", category: "Entretenimiento", photo: "13_p54_Joshua_Aldana.jpg", instagram: "joshuaadl", tiktok: "joshuaadl_" },
  { name: "Luismarth", category: "Entretenimiento", photo: "13_p55_Luismarth.jpg", instagram: "luismarthgz", tiktok: "luismarthgz__" },
  { name: "Pablo S.21", category: "Entretenimiento", photo: "13_p56_Pablo_S21.jpg", instagram: "pablo.s.21", tiktok: "pablo.saldana21" },
  { name: "Axel Xicay", category: "Entretenimiento", photo: "13_p57_Axel_Xicay.jpg", instagram: "axel_xicay_", tiktok: "axel_xicay" },
  { name: "Edy", category: "Entretenimiento", photo: "13_p58_Edy.jpg", instagram: "edyypr", tiktok: "edyypr" },
  { name: "Sofi", category: "Entretenimiento", photo: "13_p59_Sofi.jpg", instagram: "chofy_af", tiktok: "chofy112" },
  { name: "Katherine Portt", category: "Fitness", photo: "13_p61_Katherine_Portt.jpg", instagram: "katherineportt", tiktok: "katherineportt" },
  { name: "Javier del Cid", category: "Deporte", photo: "13_p63_Javier_del_Cid.jpg", instagram: "javierdelcid", tiktok: "javierdelcidmeyer" },
  { name: "Gyss Sierra", category: "Gaming", photo: "13_p65_Gyss_Sierra.jpg", instagram: "gyss.sierra", tiktok: "gysssierra" },
  { name: "Norimm", category: "Gaming", photo: "13_p66_Norimm.jpg", instagram: "norimmmm_", tiktok: "norimmmm_" },
  { name: "Erick Alexander", category: "Creative Tech / IA", photo: "13_p68_Erick_Alexander.jpg", tiktok: "alexander_arias_gt" },
  { name: "Fabiana Quiñones", category: "Automotriz", photo: "13_p70_Fabiana_Quinones.jpg", instagram: "quinonesfabi_", tiktok: "lagymirage.gt" },
];

// Globals with a revalidation hook skip it when this is set: the script
// runs outside Next's server, so there is no cache to revalidate.
const SKIP_REVALIDATE = { context: { skipRevalidate: true } };

/** Case- and accent-insensitive key, so "sandy mendez" matches "Sandy Méndez". */
const nameKey = (name: string) =>
  name.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().toLowerCase();

/** Upload a photo once; re-runs reuse the existing media document. */
async function upsertPhoto(payload: Payload, filePath: string, alt: string) {
  const filename = path.basename(filePath);
  const existing = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
  if (existing.docs[0]) return existing.docs[0].id;
  const created = await payload.create({ collection: "media", data: { alt }, filePath });
  return created.id;
}

// Exported so a future authenticated seed route can reuse it. No
// process.exit() in here, which would kill a server if called from one.
// Idempotent: every write is an upsert, so it's safe to run again.
export async function seed() {
  const payload = await getPayload({ config });

  // Globals are upserted, not created: a global always exists.
  await payload.updateGlobal({
    slug: "deck",
    data: { sections: deckSections.map((section) => ({ ...section })) },
    ...SKIP_REVALIDATE,
  });
  await payload.updateGlobal({ slug: "contact-info", data: contactInfo, ...SKIP_REVALIDATE });

  // Brands global: the list is replaced as a whole, in deck order.
  const brandItems = [];
  for (const brand of brands) {
    const image = await upsertPhoto(payload, path.join(BRAND_LOGOS, brand.logo), `Logo de ${brand.name}`);
    brandItems.push({ name: brand.name, image, industry: brand.industry ?? null });
  }
  await payload.updateGlobal({ slug: "brands", data: { items: brandItems }, ...SKIP_REVALIDATE });

  // Categories, matched by name.
  const categoryIds = new Map<CategoryName, string>();
  for (const { name, color } of categories) {
    const found = await payload.find({ collection: "categories", where: { name: { equals: name } }, limit: 1 });
    const doc = found.docs[0]
      ? await payload.update({ collection: "categories", id: found.docs[0].id, data: { color } })
      : await payload.create({ collection: "categories", data: { name, color } });
    categoryIds.set(name, doc.id);
  }

  // Talents, matched by normalized name so hand-made entries get updated.
  const existing = await payload.find({ collection: "talents", limit: 500, depth: 0 });
  const byName = new Map(existing.docs.map((doc) => [nameKey(doc.name), doc.id]));

  for (const talent of talents) {
    const folder = categories.find((c) => c.name === talent.category)!.folder;
    const data = {
      name: talent.name,
      active: true,
      category: categoryIds.get(talent.category),
      thumbnail: await upsertPhoto(payload, path.join(TALENT_PHOTOS, folder, talent.photo), talent.name),
      instagram: talent.instagram ? `https://www.instagram.com/${talent.instagram}` : null,
      tiktok: talent.tiktok ? `https://www.tiktok.com/@${talent.tiktok}` : null,
    };
    const id = byName.get(nameKey(talent.name));
    if (id) await payload.update({ collection: "talents", id, data });
    else await payload.create({ collection: "talents", data });
  }

  payload.logger.info(
    `Seeded deck (${deckSections.length} sections), contact info, ${brands.length} brands, ${categories.length} categories and ${talents.length} talents`,
  );
}

// No `users` are ever seeded: the first admin is created from /admin.
await seed();
process.exit(0);
