import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// First three are validation checks (cyan), last three are forecasting (pink).
const checks = [
  { label: "Análisis de perfil", dot: "bg-secondary" },
  { label: "Afinidad de audiencia", dot: "bg-secondary" },
  { label: "Autenticidad", dot: "bg-secondary" },
  { label: "Patrones de crecimiento", dot: "bg-accent" },
  { label: "Impacto publicitario", dot: "bg-accent" },
  { label: "Proyecciones de campaña", dot: "bg-accent" },
];

export function PlanningSlide() {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.7%]">
      <Reveal className="mt-6 grid flex-1 gap-10 md:grid-cols-[1fr_38.5%] md:gap-[8%] md:pr-[2.5%]">
        <RevealItem effect="fade" stagger className="flex flex-col">
          <RevealItem
            as="p"
            className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.9rem,1.45vw,1.55rem)]"
          >
            Planning
          </RevealItem>
          <RevealItem
            as="h2"
            className="mt-8 text-[clamp(2.8rem,3.9vw,4.3rem)] font-bold uppercase leading-none md:mt-[13%]"
          >
            Planning
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-8 text-2xl font-bold uppercase leading-tight text-secondary md:mt-[11%] md:text-[clamp(1.4rem,2.1vw,2.3rem)]"
          >
            24–48 horas
            <br />
            de ejecución
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-8 max-w-[38ch] text-lg leading-snug text-base-content/85 md:mt-[8%] md:text-[clamp(1rem,1.75vw,1.9rem)]"
          >
            La etapa donde reducimos incertidumbre antes de activar.
          </RevealItem>
          <RevealItem
            effect="fade"
            className="mt-auto hidden h-[7rem] w-[10.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1.5px,transparent_1.6px)] bg-[length:1.5rem_1.5rem] md:block"
          />
        </RevealItem>

        <RevealItem
          as="ul"
          effect="right"
          stagger={0.08}
          className="flex flex-col justify-center gap-7 self-start rounded-3xl border border-base-300 bg-base-200 px-8 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:mt-[12%] md:gap-[3.5vw] md:px-[7%] md:py-[8%]"
        >
          {checks.map((check) => (
            <RevealItem as="li" effect="left" key={check.label} className="flex items-center gap-6 md:gap-[5.5%]">
              <span aria-hidden className={`size-5 shrink-0 rounded-full md:size-[1.3vw] ${check.dot}`} />
              <span className="text-lg md:text-[clamp(1rem,1.7vw,1.85rem)]">{check.label}</span>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}
