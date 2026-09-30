import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const steps = [
  { title: "Monitoreo de resultados en tiempo real", number: "text-secondary", strong: true },
  { title: "Calendarización de influenciadores", number: "text-accent", strong: false },
  { title: "Alertas de actividad sospechosa", number: "text-success", strong: false },
];

export function OnwaySlide() {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 md:px-[4.4%]">
      <Reveal className="mt-6 grid flex-1 gap-10 md:-mt-[3.2%] md:grid-cols-[1fr_44%] md:gap-[7%] md:pr-[10%]">
        <RevealItem effect="fade" stagger className="flex flex-col">
          <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.9rem,1.45vw,1.55rem)]">
            Onway
          </RevealItem>
          <RevealItem as="h1" className="mt-8 text-[clamp(2.8rem,3.9vw,4.3rem)] font-bold uppercase leading-none md:mt-[15%]">
            Onway
          </RevealItem>
          <RevealItem as="p" className="mt-8 text-lg leading-snug text-base-content/85 md:mt-[7%] md:text-[clamp(1rem,1.75vw,1.9rem)]">
            La campaña ya está viva.
            <br />
            Ahora toca verla en movimiento.
          </RevealItem>
          <RevealItem
            effect="fade"
            className="mt-auto hidden h-[7rem] w-[10.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1.5px,transparent_1.6px)] bg-[length:1.5rem_1.5rem] md:block"
          />
        </RevealItem>

        <RevealItem
          effect="right"
          stagger={0.1}
          className="flex flex-col self-start rounded-3xl border border-base-300 bg-base-200 px-8 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:mt-[11%] md:px-[5%] md:py-[7%]"
        >
          <ol className="flex flex-col gap-10 md:gap-[4.5vw]">
            {steps.map((step, index) => (
              <RevealItem as="li" effect="left" key={step.title} className="grid grid-cols-[3rem_1fr] items-baseline md:grid-cols-[18%_1fr]">
                <span className={`text-2xl font-bold md:text-[clamp(1.3rem,1.9vw,2rem)] ${step.number}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`text-lg leading-tight md:text-[clamp(1.05rem,1.75vw,1.9rem)] ${step.strong ? "font-bold" : ""}`}>
                  {step.title}
                </span>
              </RevealItem>
            ))}
          </ol>
          <RevealItem as="p" className="mt-10 text-base leading-snug text-base-content/75 md:mt-[11%] md:pl-[3%] md:text-[clamp(0.95rem,1.45vw,1.55rem)]">
            El objetivo: detectar desvíos mientras todavía se pueden corregir.
          </RevealItem>
        </RevealItem>
      </Reveal>
    </section>
  );
}
