import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const deliverables = [
  { label: "Reportes profesionales", dot: "bg-accent" },
  { label: "Insight de campaña", dot: "bg-accent" },
  { label: "Métricas de negocio: CPE, ROI, EM, VMG…", dot: "bg-secondary" },
  { label: "Métricas específicas por post + listening", dot: "bg-secondary" },
];

export function PostbuySlide() {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.9%]">
      <Reveal className="mt-6 grid flex-1 gap-10 md:grid-cols-[1fr_38.5%] md:gap-[10%] md:pr-[2.5%]">
        <RevealItem effect="fade" stagger className="flex flex-col">
          <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.9rem,1.45vw,1.55rem)]">
            Postbuy
          </RevealItem>
          <RevealItem as="h2" className="mt-8 text-[clamp(2.8rem,3.9vw,4.3rem)] font-bold uppercase leading-none md:mt-[15%]">
            Postbuy
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-8 text-2xl font-bold uppercase leading-tight text-accent md:mt-[11%] md:text-[clamp(1.4rem,2.1vw,2.3rem)]"
          >
            48 horas
            <br />
            de ejecución
          </RevealItem>
          <RevealItem as="p" className="mt-8 max-w-[40ch] text-lg leading-snug text-base-content/85 md:mt-[8%] md:text-[clamp(1rem,1.75vw,1.9rem)]">
            Cerramos la campaña con lectura, no solo con un PDF de métricas.
          </RevealItem>
          <RevealItem
            effect="fade"
            className="mt-auto hidden h-[7rem] w-[10.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1.5px,transparent_1.6px)] bg-[length:1.5rem_1.5rem] md:block"
          />
        </RevealItem>

        <RevealItem
          effect="right"
          stagger={0.08}
          className="flex flex-col self-start rounded-3xl border border-base-300 bg-base-200 px-8 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:mt-[12%] md:px-[8%] md:py-[9%]"
        >
          <RevealItem as="h2" className="text-2xl font-bold uppercase md:text-[clamp(1.4rem,2.3vw,2.5rem)]">
            Del dato al insight
          </RevealItem>
          <ul className="mt-8 flex flex-col gap-8 md:mt-[10%] md:gap-[3.3vw]">
            {deliverables.map((item) => (
              <RevealItem as="li" effect="left" key={item.label} className="flex items-center gap-6 md:gap-[5%]">
                <span aria-hidden className={`size-5 shrink-0 rounded-full md:size-[1.3vw] ${item.dot}`} />
                <span className="text-lg leading-tight md:text-[clamp(1rem,1.7vw,1.85rem)]">{item.label}</span>
              </RevealItem>
            ))}
          </ul>
        </RevealItem>
      </Reveal>
    </section>
  );
}
