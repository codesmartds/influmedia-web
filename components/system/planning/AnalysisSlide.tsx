import { AudienceDashboard } from "@/components/dashboards/AudienceDashboard";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const analyzed = [
  { label: "Edad de la audiencia", dot: "bg-secondary" },
  { label: "Ubicaciones principales", dot: "bg-accent" },
  { label: "Género de la audiencia", dot: "bg-secondary" },
  { label: "Categorías de contenido", dot: "bg-accent" },
  { label: "Autenticidad de la audiencia", dot: "bg-secondary" },
];

export function AnalysisSlide() {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 md:px-[4.5%]">
      <Reveal className="mt-6 flex flex-1 flex-col md:-mt-[3%]">
        <SlideIntro
          eyebrow="Planning / Análisis"
          tone="primary"
          title="Leemos el perfil antes de recomendarlo."
          subtitle="No miramos solo follower count: miramos quién está detrás de la audiencia."
        />

        <div className="mt-8 grid flex-1 items-center gap-10 md:mb-[2.5%] md:mt-[3%] md:grid-cols-[47.5%_1fr] md:gap-[11%]">
          <RevealItem effect="scale">
            <AudienceDashboard />
          </RevealItem>

          <RevealItem effect="fade" stagger={0.08} className="flex flex-col">
            <RevealItem
              as="h2"
              className="text-2xl font-bold uppercase text-secondary md:text-[clamp(1.3rem,1.85vw,2rem)]"
            >
              Analizamos
            </RevealItem>
            <ul className="mt-6 flex flex-col gap-6 md:mt-[9%] md:gap-[2.6vw]">
              {analyzed.map((item) => (
                <RevealItem as="li" effect="left" key={item.label} className="flex items-center gap-6 md:gap-[6%]">
                  <span aria-hidden className={`size-2.5 shrink-0 rounded-full ${item.dot}`} />
                  <span className="text-lg md:text-[clamp(1rem,1.7vw,1.85rem)]">{item.label}</span>
                </RevealItem>
              ))}
            </ul>
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
