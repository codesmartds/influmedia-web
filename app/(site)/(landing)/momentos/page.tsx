import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { loadMoments } from "@/components/gallery/actions";
import { GalleryMoments } from "@/components/gallery/GalleryMoments";
import { categoryLabels, type GalleryCategory } from "@/components/gallery/types";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Momentos Influmedia",
  description: "Eventos, activaciones, producciones y equipo: el archivo visual de Influmedia en Centroamérica y el Caribe.",
};

const pad = (n: number) => String(n).padStart(2, "0");

// Agency moments (events, activations, productions, team, awards) in photos
// and videos. The first page renders on the server; the rest load on scroll.
export default async function GalleryPage() {
  const payload = await getPayload({ config });
  const categories = Object.keys(categoryLabels) as GalleryCategory[];
  const [firstPage, featured, videos, ...perCategory] = await Promise.all([
    loadMoments({ page: 1, category: null, kind: "all" }),
    payload.find({ collection: "gallery-moments", where: { featured: { equals: true } }, sort: "-date", limit: 1, depth: 1 }),
    payload.count({ collection: "gallery-moments", where: { video: { exists: true } } }),
    ...categories.map((c) => payload.count({ collection: "gallery-moments", where: { category: { equals: c } } })),
  ]);
  const filters = [
    { id: null, name: "Todos", count: firstPage.totalDocs },
    ...categories.map((c, i) => ({ id: c, name: categoryLabels[c], count: perCategory[i].totalDocs })).filter((f) => f.count > 0),
  ];

  return (
    <PageTransition>
      <Reveal className="mx-auto grid w-full max-w-[96rem] items-end gap-[clamp(28px,4vw,56px)] px-5 pt-[clamp(3rem,7vw,6rem)] pb-[clamp(2.25rem,4vw,3.5rem)] md:px-[4%] lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-[26px] lg:col-span-2">
          <RevealItem as="p" className="flex gap-2.5 font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            <Link href="/" transitionTypes={["nav-back"]} className="transition-colors hover:text-base-content">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-accent-cycle">Momentos Influmedia</span>
          </RevealItem>
          <RevealItem as="h1" className="text-[clamp(2.1rem,5.4vw,5.1rem)] leading-[0.86] font-semibold tracking-[-0.055em] text-balance">
            Los momentos detrás de <span className="text-accent-cycle">cada conversación.</span>
          </RevealItem>
        </div>
        <div className="flex flex-col gap-3.5 pb-2">
          <RevealItem as="p" className="text-[17px] leading-relaxed text-[#c9c2d2]">
            Eventos, activaciones, producciones y equipo: el archivo visual de lo que construimos con marcas y creadores en la región.
          </RevealItem>
          <RevealItem as="p" className="font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            {pad(firstPage.totalDocs)} momentos{videos.totalDocs > 0 ? ` · ${pad(videos.totalDocs)} videos` : ""}
          </RevealItem>
        </div>
      </Reveal>

      <GalleryMoments featured={featured.docs[0] ?? null} firstPage={firstPage} filters={filters} hasVideos={videos.totalDocs > 0} />

      <section className="border-t border-base-300 bg-base-200">
        <Reveal className="mx-auto flex w-full max-w-[96rem] flex-wrap items-end justify-between gap-8 px-5 py-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%]">
          <RevealItem as="h2" className="max-w-[900px] text-[clamp(2rem,4.4vw,4.2rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
            ¿Quieres ver tu marca <span className="text-accent-cycle">aquí?</span>
          </RevealItem>
          <RevealItem>
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="inline-block rounded-full bg-base-content px-[26px] py-4 text-[15px] font-semibold text-base-100 transition-colors hover:bg-accent-cycle"
            >
              Contáctanos
            </Link>
          </RevealItem>
        </Reveal>
      </section>
    </PageTransition>
  );
}
