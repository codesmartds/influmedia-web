import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { CreatorApplicationForm } from "@/components/creators/CreatorApplicationForm";
import { CreatorsDirectory } from "@/components/creators/CreatorsDirectory";
import { Eyebrow } from "@/components/home/sections";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Creadores | Influmedia",
  description: "Conoce a los creadores exclusivos de Influmedia: lifestyle, comedia, moda, entretenimiento, fitness, deporte, gaming, tech y automotriz.",
};

const perks = [
  "Negociación, contratos y calendario sin intermediarios.",
  "Convenios de exclusividad por categoría y marca.",
  "Campañas con marcas líderes de la región.",
];

// The roster: browse creators by category and open each profile; creators
// who want in apply at the bottom of the page.
export default async function CreatorsPage() {
  const payload = await getPayload({ config });
  const [talents, categories] = await Promise.all([
    payload.find({ collection: "talents", where: { active: { equals: true } }, sort: "name", depth: 1, limit: 200 }),
    payload.find({ collection: "categories", sort: "name", depth: 0, limit: 50 }),
  ]);
  const formCategories = categories.docs.map((c) => ({ id: c.id, name: c.name }));
  const usedCategories = new Set(talents.docs.map((t) => (typeof t.category === "object" ? t.category?.id : t.category)).filter(Boolean)).size;

  return (
    <PageTransition>
      <Reveal className="mx-auto grid w-full max-w-[96rem] items-end gap-[clamp(28px,4vw,56px)] px-5 pt-[clamp(3rem,7vw,6rem)] pb-[clamp(2.25rem,4vw,3.5rem)] md:px-[4%] lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-[26px] lg:col-span-2">
          <RevealItem as="p" className="flex gap-2.5 font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            <Link href="/" transitionTypes={["nav-back"]} className="transition-colors hover:text-base-content">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-accent-cycle">Creadores</span>
          </RevealItem>
          <RevealItem as="h1" className="text-[clamp(2.1rem,5.4vw,5.1rem)] leading-[0.86] font-semibold tracking-[-0.055em]">
            Talento que conecta <span className="text-accent-cycle">e inspira.</span>
          </RevealItem>
        </div>
        <div className="flex flex-col gap-5 pb-2">
          <RevealItem as="p" className="text-[17px] leading-relaxed text-[#c9c2d2]">
            {talents.totalDocs} creadores exclusivos en {usedCategories} categorías, representados y gestionados por Influmedia.
          </RevealItem>
          <RevealItem className="flex flex-wrap gap-2.5">
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="rounded-full bg-base-content px-[22px] py-3.5 text-sm font-semibold text-base-100 transition-colors hover:bg-accent-cycle"
            >
              Arma tu campaña
            </Link>
            <a href="#aplica" className="rounded-full border border-base-content/40 px-[22px] py-3.5 text-sm font-medium transition-colors hover:bg-base-content/10">
              ¿Eres creador? Aplica
            </a>
          </RevealItem>
        </div>
      </Reveal>

      <CreatorsDirectory talents={talents.docs} categories={categories.docs} />

      <section id="aplica" className="scroll-mt-24 border-t border-base-300 bg-base-200">
        <Reveal className="mx-auto grid w-full max-w-[96rem] items-start gap-[clamp(2rem,5vw,4.5rem)] px-5 py-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%] lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Eyebrow>¿Eres creador?</Eyebrow>
            <RevealItem as="h2" className="text-[clamp(1.95rem,4.48vw,4.2rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
              Aplica al <span className="text-accent-cycle">roster.</span>
            </RevealItem>
            <RevealItem as="p" className="max-w-[440px] text-[17px] leading-relaxed text-muted">
              Revisamos cada perfil. Si encaja con lo que buscan nuestras marcas, te contactamos.
            </RevealItem>
            <RevealItem as="ol" className="mt-2 flex flex-col border-t border-[#2a2233]">
              {perks.map((p, i) => (
                <li key={p} className="grid grid-cols-[56px_minmax(0,1fr)] gap-4 border-b border-[#2a2233] py-4">
                  <span className="font-mono text-xs text-accent-cycle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[#d6d0de]">{p}</span>
                </li>
              ))}
            </RevealItem>
          </div>
          <RevealItem effect="fade">
            <CreatorApplicationForm categories={formCategories} />
          </RevealItem>
        </Reveal>
      </section>
    </PageTransition>
  );
}
