import { CommandCenter } from "@/components/dashboards/CommandCenter";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const checks = [
  { title: "Resultados", text: "Lectura en tiempo real" },
  { title: "Calendario", text: "Quién publica y cuándo" },
  { title: "Alertas", text: "Señales de actividad sospechosa" },
];

export function CommandSlide() {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 md:px-[4.8%]">
      <Reveal className="mt-6 flex flex-1 flex-col md:-mt-[3.4%]">
        <SlideIntro
          eyebrow="Onway / Command center"
          tone="primary"
          title="Monitoreo que aterriza la ejecución."
          subtitle="Visibilidad de resultados, calendario y comportamiento durante la campaña."
        />
        <div className="mt-8 grid flex-1 items-center gap-10 md:-ml-[2.7%] md:mb-[2%] md:mt-[2.6%] md:grid-cols-[63%_1fr] md:gap-[5%]">
          <RevealItem effect="scale">
            <CommandCenter />
          </RevealItem>
          <RevealItem effect="fade" stagger={0.1} className="flex flex-col gap-8 md:gap-[3vw]">
            <RevealItem as="h2" className="text-2xl font-bold uppercase text-secondary md:text-[clamp(1.3rem,1.9vw,2rem)]">
              Onway check
            </RevealItem>
            {checks.map((check) => (
              <RevealItem key={check.title} effect="left">
                <h3 className="text-2xl font-bold uppercase md:text-[clamp(1.3rem,1.9vw,2rem)]">{check.title}</h3>
                <p className="mt-2 text-lg text-base-content/80 md:text-[clamp(1rem,1.55vw,1.7rem)]">{check.text}</p>
              </RevealItem>
            ))}
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
