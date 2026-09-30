import { CountUp } from "@/components/slides/CountUp";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Example projection; the figures are illustrative, not client results.
const projections = [
  { value: 5.69, decimals: 2, suffix: "%", label: "Engagement rate", bar: "bg-secondary" },
  { value: 107, decimals: 0, suffix: "K", label: "Alcance estimado", bar: "bg-primary" },
  { value: 38.55, decimals: 2, suffix: "%", label: "Return of investment", bar: "bg-accent" },
  { value: 25.8, decimals: 1, suffix: "K", label: "Engagement estimado", bar: "bg-success" },
];

export function ProjectionSlide() {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 md:px-[4.5%]">
      <Reveal className="mt-6 flex flex-1 flex-col md:-mt-[2.6%]">
        <SlideIntro
          eyebrow="Planning / Proyección"
          title="Proyectamos antes de activar."
          subtitle="Ejemplo de proyección para anticipar desempeño y tomar decisiones."
        />

        <RevealItem
          as="ul"
          effect="fade"
          stagger={0.1}
          className="mt-8 grid grid-cols-2 gap-4 md:mt-[3%] md:grid-cols-4 md:gap-[2.4vw] md:px-[0.6%] md:pr-[5.5%]"
        >
          {projections.map((item, index) => (
            <RevealItem
              as="li"
              key={item.label}
              className="flex flex-col rounded-2xl border-2 border-base-300 bg-base-200 px-6 pb-8 pt-9 md:min-h-[16vw] md:px-[8.5%] md:pb-[9%] md:pt-[13%]"
            >
              <span aria-hidden className={`block h-1.5 w-14 ${item.bar}`} />
              <span className="mt-8 text-4xl font-bold md:mt-[20%] md:text-[clamp(2rem,3vw,3.3rem)]">
                <CountUp value={item.value} decimals={item.decimals} suffix={item.suffix} delay={0.8 + index * 0.1} />
              </span>
              <span className="mt-auto pt-6 text-sm font-bold uppercase leading-tight text-base-content/70 md:text-[clamp(0.85rem,1.3vw,1.4rem)]">
                {item.label}
              </span>
            </RevealItem>
          ))}
        </RevealItem>

        <div className="mt-10 flex flex-col gap-6 md:mt-[4%] md:flex-row md:items-center md:justify-between md:pl-[0.6%] md:pr-[10%]">
          <RevealItem as="p" className="text-base text-base-content/85 md:text-[clamp(0.95rem,1.45vw,1.55rem)]">
            Proyección = contexto para decidir mejor, no promesa de resultado.
          </RevealItem>
          <RevealItem as="ul" effect="fade" stagger={0.1} className="flex flex-wrap gap-4 md:gap-[1.2vw]">
            <RevealItem
              as="li"
              effect="scale"
              className="rounded-full bg-secondary px-9 py-3.5 text-sm font-bold uppercase text-secondary-content md:text-[clamp(0.9rem,1.35vw,1.45rem)]"
            >
              Data-informed
            </RevealItem>
            <RevealItem
              as="li"
              effect="scale"
              className="rounded-full bg-accent px-12 py-3.5 text-sm font-bold uppercase text-accent-content md:text-[clamp(0.9rem,1.35vw,1.45rem)]"
            >
              Before go-live
            </RevealItem>
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
