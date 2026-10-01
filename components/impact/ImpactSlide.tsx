import { AssetPlaceholder } from "@/components/slides/AssetPlaceholder";
import { CountUp } from "@/components/slides/CountUp";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const stats = [
  { value: 800, suffix: "", label: "Campañas", bar: "bg-primary" },
  { value: 100, suffix: "M", label: "Impresiones en la región", bar: "bg-secondary" },
  { value: 8, suffix: "", label: "Países implementados", bar: "bg-accent" },
  { value: 500, suffix: "", label: "Influenciadores contratados", bar: "bg-success" },
];

export function ImpactSlide() {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.5%]">
      <Reveal className="mt-6 flex flex-1 flex-col">
        <SlideIntro
          eyebrow="Impacto"
          tone="primary"
          title="Escala que ya habla por nosotros."
          subtitle="Una muestra del alcance que Influmedia ha construido en la región."
        />

        <RevealItem
          as="ul"
          effect="fade"
          stagger={0.1}
          className="mt-8 grid grid-cols-2 gap-4 md:mt-[4%] md:grid-cols-[1fr_1.03fr_0.95fr_1.16fr] md:gap-[1.4%] md:px-[0.7%] md:pr-[5.5%]"
        >
          {stats.map((stat, index) => (
            <RevealItem
              as="li"
              key={stat.label}
              className="flex flex-col rounded-2xl border border-base-300 bg-base-200 px-5 pb-5 pt-5 md:px-[5.5%] md:pb-[4.5%] md:pt-[5%]"
            >
              <span aria-hidden className={`block h-1.5 w-12 rounded-full ${stat.bar}`} />
              <span className="mt-4 text-4xl font-bold md:text-[clamp(2rem,3vw,3.3rem)]">
                <CountUp value={stat.value} prefix="+" suffix={stat.suffix} delay={0.2 + index * 0.1} />
              </span>
              <span className="mt-2 text-sm font-bold uppercase text-base-content/70 md:text-[clamp(0.8rem,1.15vw,1.25rem)] lg:whitespace-nowrap">
                {stat.label}
              </span>
            </RevealItem>
          ))}
        </RevealItem>

        <div className="mt-10 grid flex-1 items-center gap-10 md:mt-[4%] md:grid-cols-2">
          <RevealItem effect="left" stagger className="flex flex-col items-center text-center">
            <RevealItem as="h2" className="text-2xl font-bold uppercase md:text-[clamp(1.4rem,2.2vw,2.4rem)]">
              Regional by design
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-5 max-w-[34ch] text-base leading-snug text-base-content/85 md:mt-[4%] md:text-[clamp(1rem,1.65vw,1.75rem)]"
            >
              Estructura para coordinar talento, contenido y medición en múltiples mercados.
            </RevealItem>
            <RevealItem
              as="span"
              effect="scale"
              className="mt-6 rounded-full bg-[#fbe7f1] px-8 py-3 text-base font-bold uppercase text-[#6b2d52] md:mt-[5%] md:text-[clamp(1rem,1.45vw,1.55rem)]"
            >
              Centroamérica + Caribe
            </RevealItem>
          </RevealItem>

          <RevealItem effect="scale" className="h-full min-h-[16rem]">
            <AssetPlaceholder label="Mapa de la región" className="h-full min-h-[16rem]" />
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
