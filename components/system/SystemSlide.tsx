import { FiArrowRight } from "react-icons/fi";
import { TbCaretRightFilled } from "react-icons/tb";
import { SlideFooter } from "@/components/slides/SlideFooter";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const stages = [
  { title: "Planning", text: "Definir, validar y proyectar", number: "text-primary", button: "bg-primary" },
  { title: "Onway", text: "Coordinar, monitorear y alertar", number: "text-secondary", button: "bg-secondary" },
  { title: "Postbuy", text: "Reportar, interpretar y aprender", number: "text-accent", button: "bg-accent" },
];

export function SystemSlide() {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 pb-8 md:px-[4.8%] md:pb-[2%]">
      <Reveal className="mt-6 flex flex-1 flex-col md:-mt-[3%]">
        <SlideIntro
          eyebrow="Nuestro sistema"
          tone="primary"
          title="Una campaña, tres momentos."
          subtitle="Haz clic en cada etapa para navegar por el proceso."
        />

        <RevealItem
          as="ol"
          effect="fade"
          stagger={0.15}
          className="mt-8 grid gap-10 md:mt-[3.3%] md:grid-cols-3 md:gap-[2.6vw] md:px-[0.7%] md:pr-[11.5%]"
        >
          {stages.map((stage, index) => (
            <RevealItem
              as="li"
              effect="up"
              key={stage.title}
              className="relative flex flex-col rounded-2xl border-2 border-white/70 bg-white px-8 pb-8 pt-10 text-[#14102b] md:px-[8%] md:pb-[7%] md:pt-[10%]"
            >
              <span className={`text-2xl font-bold md:text-[clamp(1.2rem,1.65vw,1.8rem)] ${stage.number}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-6 text-4xl font-bold uppercase md:mt-[9%] md:text-[clamp(2rem,2.6vw,2.9rem)]">
                {stage.title}
              </h2>
              <p className="mt-8 max-w-[18ch] text-xl leading-snug text-[#5b5870] md:mt-[14%] md:text-[clamp(1.1rem,1.75vw,1.9rem)]">
                {stage.text}
              </p>
              <span
                className={`mt-10 inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-12 py-4 text-sm font-bold uppercase text-white underline underline-offset-4 md:mt-[18%] md:min-w-[57%] md:justify-center md:px-[8%] md:text-[clamp(0.8rem,1.05vw,1.15rem)] ${stage.button}`}
              >
                Ver etapa <FiArrowRight aria-hidden />
              </span>

              {/* Arrow to the next stage */}
              {index < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-full top-1/2 z-10 hidden -translate-y-1/2 items-center text-[#cfc8e6] md:-ml-[0.3vw] md:flex"
                >
                  <span className="h-0.5 w-4 bg-current md:w-[1.1vw]" />
                  <TbCaretRightFilled className="-ml-2 text-3xl md:text-[clamp(1.6rem,2.3vw,2.5rem)]" />
                </span>
              )}
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>

      <SlideFooter label="Campaign system" />
    </section>
  );
}
