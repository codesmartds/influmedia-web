import type { IconType } from "react-icons";
import { TbBulb, TbSquareChevronRight, TbTargetArrow, TbUsersGroup } from "react-icons/tb";
import { SlideFooter } from "@/components/slides/SlideFooter";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const services: { title: string; text: string; Icon: IconType; number: string; badge: string }[] = [
  {
    title: "Estrategia",
    text: "Desarrollamos estrategias de marca que parten de objetivos claros.",
    Icon: TbTargetArrow,
    number: "text-primary",
    badge: "bg-primary text-primary-content",
  },
  {
    title: "Contenido",
    text: "Creamos contenido relevante para conectar con la audiencia afín.",
    Icon: TbSquareChevronRight,
    number: "text-secondary",
    badge: "bg-secondary text-secondary-content",
  },
  {
    title: "Comunidad",
    text: "Construimos comunidades que interactúan con la marca.",
    Icon: TbUsersGroup,
    number: "text-accent",
    badge: "bg-accent text-accent-content",
  },
  {
    title: "Innovación",
    text: "Innovamos la manera en que compartimos historias de vida.",
    Icon: TbBulb,
    number: "text-success",
    badge: "bg-success text-success-content",
  },
];

export function ServicesSlide() {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 pb-8 md:px-[4.7%] md:pb-[2%]">
      <Reveal className="mt-6 flex flex-1 flex-col md:-mt-[3.2%]">
        <SlideIntro
          eyebrow="Qué hacemos"
          title="Convertimos influencia en conexión."
          subtitle="Cuatro frentes que trabajan juntos para construir relevancia."
        />

        <RevealItem
          as="ul"
          effect="fade"
          stagger={0.1}
          className="mt-8 grid gap-6 md:mt-[3.5%] md:grid-cols-2 md:gap-x-[4.5vw] md:gap-y-[2.9vw] md:px-[0.3%] md:pr-[3%]"
        >
          {services.map(({ title, text, Icon, number, badge }, index) => (
            <RevealItem
              as="li"
              key={title}
              className="relative grid grid-cols-[3rem_1fr] rounded-2xl border border-base-300 bg-base-200 px-6 pb-10 pt-7 md:grid-cols-[13%_1fr] md:px-[4%] md:pb-[6.5%] md:pt-[4.2%]"
            >
              <span className={`pt-1 text-lg font-bold md:text-[clamp(1rem,1.3vw,1.4rem)] ${number}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-xl font-bold uppercase md:text-[clamp(1.1rem,1.6vw,1.75rem)]">{title}</h2>
                <p className="mt-4 text-base leading-snug text-base-content/75 md:mt-[5%] md:text-[clamp(1rem,1.45vw,1.55rem)]">
                  {text}
                </p>
              </div>
              <span
                className={`absolute right-5 top-4 flex size-11 items-center justify-center rounded-full text-2xl md:size-[clamp(2.5rem,2.6vw,3rem)] ${badge}`}
              >
                <Icon aria-hidden />
              </span>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>

      <SlideFooter label="Lead the conversation" />
    </section>
  );
}
