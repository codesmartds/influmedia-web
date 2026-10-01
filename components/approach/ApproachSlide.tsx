import type { IconType } from "react-icons";
import { TbBulb, TbChartBar, TbUsersGroup } from "react-icons/tb";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const pillars: { label: string; Icon: IconType; className: string }[] = [
  { label: "Creative fit", Icon: TbBulb, className: "bg-primary" },
  { label: "Audience fit", Icon: TbUsersGroup, className: "bg-secondary" },
  { label: "Measurement", Icon: TbChartBar, className: "bg-accent" },
];

export function ApproachSlide() {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.7%]">
      <Reveal className="mt-6 flex flex-1 flex-col">
        <RevealItem
          as="p"
          className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.9rem,1.45vw,1.55rem)]"
        >
          Nuestro enfoque
        </RevealItem>
        <RevealItem
          as="h2"
          className="mt-6 text-[clamp(2rem,3.4vw,3.7rem)] font-bold leading-[1.22] md:mt-[4.5%]"
        >
          El influencer marketing
          <br />
          va más allá de las
          <br />
          Relaciones Públicas
        </RevealItem>
        <RevealItem
          as="p"
          className="mt-6 max-w-[44ch] text-[clamp(1rem,1.75vw,1.9rem)] leading-snug text-base-content/85 md:mt-[3.5%]"
        >
          Funciona mejor cuando una idea relevante se encuentra con una selección estratégica de talento y una
          medición rigurosa.
        </RevealItem>

        <RevealItem
          as="ul"
          effect="fade"
          stagger={0.12}
          className="mt-10 flex flex-col gap-4 md:mt-[8.5%] md:flex-row md:gap-[1%] md:pr-[10%]"
        >
          {pillars.map(({ label, Icon, className }) => (
            <RevealItem
              as="li"
              effect="left"
              key={label}
              className={`flex flex-1 items-center gap-4 rounded-full p-2.5 pr-8 text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] md:gap-[4%] md:p-[1%] ${className}`}
            >
              <span className="flex aspect-square w-14 shrink-0 items-center justify-center rounded-full bg-black/25 text-3xl md:w-[18%] md:text-[clamp(1.6rem,2.3vw,2.5rem)]">
                <Icon aria-hidden />
              </span>
              <span className="text-xl font-bold uppercase md:text-[clamp(1.1rem,1.75vw,1.9rem)]">{label}</span>
            </RevealItem>
          ))}
        </RevealItem>

        <RevealItem
          effect="fade"
          className="mt-8 hidden h-[4.5rem] w-[10.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1.5px,transparent_1.6px)] bg-[length:1.5rem_1.5rem] md:block"
        />
      </Reveal>
    </section>
  );
}
