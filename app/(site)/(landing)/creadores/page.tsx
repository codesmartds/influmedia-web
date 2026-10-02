import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { FiArrowRight } from "react-icons/fi";
import { ApplyButton } from "@/components/creators/ApplyButton";
import { CreatorsDirectory } from "@/components/creators/CreatorsDirectory";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Creadores | Influmedia",
  description: "Conoce a los creadores exclusivos de Influmedia: lifestyle, comedia, moda, entretenimiento, fitness, deporte, gaming, tech y automotriz.",
};

const applyClass = "btn btn-primary h-auto rounded-lg border-0 px-8 py-4 uppercase";

// The roster: browse creators by category and open each profile. Applying
// to join happens in a modal so the page stays about the creators.
export default async function CreatorsPage() {
  const payload = await getPayload({ config });
  const [talents, categories] = await Promise.all([
    payload.find({ collection: "talents", where: { active: { equals: true } }, sort: "name", depth: 1, limit: 200 }),
    payload.find({ collection: "categories", sort: "name", depth: 0, limit: 50 }),
  ]);
  const formCategories = categories.docs.map((c) => ({ id: c.id, name: c.name }));

  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-[96rem] px-6 pb-10 pt-16 md:px-[4.7%] md:pt-24">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
              Exclusive creators
            </RevealItem>
            <RevealItem as="h1" className="mt-4 max-w-[16ch] text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[1.02]">
              Talento que conecta e inspira.
            </RevealItem>
            <RevealItem as="p" className="mt-6 max-w-[56ch] text-lg leading-snug text-base-content/80 md:text-xl">
              {talents.totalDocs} creadores exclusivos en {categories.totalDocs} categorías, representados y gestionados por
              Influmedia.
            </RevealItem>
          </div>
          <RevealItem className="shrink-0">
            <ApplyButton categories={formCategories} className={applyClass}>
              ¿Eres creador? Aplica al roster <FiArrowRight aria-hidden />
            </ApplyButton>
          </RevealItem>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[96rem] px-6 pb-24 md:px-[4.7%]">
        <CreatorsDirectory talents={talents.docs} categories={categories.docs} />
      </section>
    </PageTransition>
  );
}
