import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Stage panels over the map. `position` places each one inside the map card.
const stages = [
  {
    step: "01",
    label: "Origen",
    title: "Guatemala",
    className: "border-primary bg-primary/20 text-primary",
    position: "md:left-[7%] md:bottom-[21%] md:w-[23%]",
  },
  {
    step: "02",
    label: "Expansión",
    title: "Centroamérica + Caribe",
    className: "border-secondary bg-secondary/15 text-secondary",
    position: "md:left-[33.5%] md:bottom-[10.5%] md:w-[29.5%]",
  },
];

// Trackbar milestones; `at` is the position along the line.
const milestones = [
  { label: "Lanzamiento", at: "0%", dot: "bg-primary border-white/90" },
  { label: "Expansión", at: "47.5%", dot: "bg-secondary border-white/90" },
  { label: "Hoy", at: "100%", dot: "bg-white border-secondary", labelAbove: true },
];

export function HistorySlide() {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[5.2%]">
      <Reveal className="mt-6 flex flex-col">
        <RevealItem
          as="p"
          className="text-sm font-bold uppercase text-primary md:text-[clamp(0.9rem,1.45vw,1.55rem)]"
        >
          Nuestra historia
        </RevealItem>
        <RevealItem as="h2" className="mt-4 text-[clamp(2rem,3.3vw,3.6rem)] font-bold leading-tight md:mt-[3.5%]">
          De Guatemala a la región.
        </RevealItem>
        <RevealItem as="p" className="mt-2 text-[clamp(1rem,1.75vw,1.9rem)] text-base-content/85">
          Crecimos rápido, manteniendo el foco en conectar marcas con audiencias afines.
        </RevealItem>

        <div className="mt-6 grid gap-10 md:mt-[1.3%] md:grid-cols-[1fr_22%] md:gap-[4%]">
          {/* Map card: map image, stage panels and trackbar */}
          <RevealItem
            effect="fade"
            stagger
            className="relative flex min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:ml-[0.5%] md:min-h-0"
          >
            <RevealItem
              effect="scale"
              className="m-4 flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-white/20 text-sm font-semibold uppercase tracking-widest text-white/40 md:mx-[5%] md:mb-[16%] md:mt-[2%]"
            >
              Imagen del mapa
            </RevealItem>

            <div className="flex flex-col gap-3 px-4 md:contents">
              {stages.map((stage) => (
                <RevealItem
                  key={stage.step}
                  className={`rounded-lg border-2 px-5 py-4 md:absolute md:px-[2%] md:py-[2.2%] ${stage.className} ${stage.position}`}
                >
                  <p className="text-sm font-bold uppercase md:text-[clamp(0.8rem,1.05vw,1.15rem)]">
                    {stage.step}&nbsp;&nbsp;{stage.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-base-content md:text-[clamp(1rem,1.4vw,1.5rem)]">
                    {stage.title}
                  </p>
                </RevealItem>
              ))}
            </div>

            {/* Trackbar */}
            <RevealItem
              effect="fade"
              stagger={0.18}
              className="relative mx-10 mb-12 mt-10 h-1 md:absolute md:inset-x-[6.2%] md:bottom-[7.5%] md:m-0"
            >
              <RevealItem effect="draw" className="absolute inset-0 origin-left rounded-full bg-white/25" />
              {milestones.map((milestone) => (
                <RevealItem
                  key={milestone.label}
                  effect="scale"
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: milestone.at }}
                >
                  <span
                    className={`block size-6 rounded-full border-[3px] shadow-[0_0_12px_rgba(85,214,255,0.35)] ${milestone.dot}`}
                  />
                  <span
                    className={`absolute left-1/2 whitespace-nowrap text-[0.7rem] uppercase text-white/60 md:text-[clamp(0.65rem,0.8vw,0.9rem)] ${
                      milestone.labelAbove ? "bottom-full mb-0.5 -translate-x-full" : "top-full mt-1"
                    }`}
                  >
                    {milestone.label}
                  </span>
                </RevealItem>
              ))}
            </RevealItem>
          </RevealItem>

          <RevealItem effect="right" stagger className="flex flex-col items-center justify-center text-center">
            <RevealItem as="p" className="text-lg font-bold uppercase text-secondary md:text-[clamp(1rem,1.5vw,1.6rem)]">
              Hoy
            </RevealItem>
            <RevealItem
              as="h2"
              className="mt-8 text-[clamp(2.2rem,3vw,3.3rem)] font-bold uppercase leading-[1.15] md:mt-[22%]"
            >
              Regional
              <br />
              mindset
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 text-[clamp(1rem,1.5vw,1.6rem)] leading-snug text-base-content/85 md:mt-[18%]"
            >
              Operación pensada para escalar campañas con consistencia.
            </RevealItem>
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
