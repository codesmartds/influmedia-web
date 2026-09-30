import Image from "next/image";
import { Anton, Montserrat } from "next/font/google";
import type { Media, Talent } from "@/payload-types";
import { SlideFooter } from "@/components/slides/SlideFooter";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// This slide comes from the "Exclusive Creators" deck, which uses its own
// type: a condensed display face for the title and Montserrat for copy.
const display = Anton({ weight: "400", subsets: ["latin"] });
const body = Montserrat({ subsets: ["latin"], style: ["normal", "italic"] });

// The design's panel is a 2×2 grid; extra talents stay out of this slide.
const PANEL_SIZE = 4;

const points = [
  "Gestión directa de creadores: negociación, contratos y calendario sin intermediarios.",
  "Convenios de exclusividad por categoría y marca.",
  "Roster activo de +30 talentos en lifestyle, comedia, moda, entretenimiento, fitness, deporte, gaming, tech y automotriz.",
];

export function TalentsSlide({ talents }: { talents: Talent[] }) {
  const panel = talents
    .map((talent) => ({ talent, photo: typeof talent.thumbnail === "object" ? (talent.thumbnail as Media) : null }))
    .filter((item) => item.photo?.url)
    .slice(0, PANEL_SIZE);

  return (
    <section className={`relative flex w-full flex-1 flex-col px-6 pb-8 md:px-[5.4%] md:pb-[2%] ${body.className}`}>
      <Reveal className="mt-6 grid flex-1 items-center gap-10 md:-mt-[3.4%] md:grid-cols-[1fr_44%] md:gap-[4%]">
        <RevealItem effect="fade" stagger className="flex flex-col">
          <RevealItem as="p" className="text-sm font-bold uppercase text-[#d9667a] md:text-[clamp(0.85rem,1.2vw,1.3rem)]">
            #WeAreInflumedia
          </RevealItem>
          <RevealItem
            as="h1"
            className={`mt-8 text-[clamp(3.2rem,5.6vw,6.2rem)] uppercase leading-[1.15] tracking-tight md:mt-[12%] ${display.className}`}
          >
            Talentos
            <br />
            exclusivos
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-4 text-lg font-medium italic leading-snug text-[#b7a8f0] md:text-[clamp(1.05rem,1.85vw,2rem)]"
          >
            Además de crear campañas, en Influmedia representamos y gestionamos talento.
          </RevealItem>
          <ul className="mt-6 flex flex-col gap-4 md:mt-[4%] md:gap-[1.6vw]">
            {points.map((point) => (
              <RevealItem
                as="li"
                effect="left"
                key={point}
                className="relative pl-8 text-base font-medium leading-snug before:absolute before:left-1 before:top-[0.55em] before:size-1.5 before:bg-base-content/40 md:pl-[5%] md:text-[clamp(0.95rem,1.45vw,1.55rem)]"
              >
                {point}
              </RevealItem>
            ))}
          </ul>
        </RevealItem>

        {/* Talent panel: thumbnails in random order (shuffled per request). */}
        <RevealItem effect="right" className="border-2 border-primary p-2 md:p-[0.9%]">
          {panel.length === 0 ? (
            <p className="p-10 text-center text-base-content/60">
              Aún no hay talentos activos. Agrégalos en el admin, en Contenido › Talentos.
            </p>
          ) : (
            <RevealItem as="ul" effect="fade" stagger={0.1} className="grid grid-cols-2 gap-2 md:gap-[1.2%]">
              {panel.map(({ talent, photo }) => (
                <RevealItem as="li" effect="scale" key={talent.id} className="relative aspect-[1.3] overflow-hidden">
                  <Image
                    src={photo!.url!}
                    alt={talent.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </RevealItem>
              ))}
            </RevealItem>
          )}
        </RevealItem>
      </Reveal>

      <SlideFooter label="Exclusive creators" />
    </section>
  );
}
