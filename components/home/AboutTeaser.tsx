import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const pillars = [
  { label: "Creatividad", className: "bg-primary text-primary-content" },
  { label: "Data", className: "bg-secondary text-secondary-content" },
  { label: "People", className: "bg-accent text-accent-content" },
];

// Short "who we are" block right after the hero; the full story is /nosotros.
export function AboutTeaser() {
  return (
    <section className="mx-auto w-full max-w-[96rem] px-6 py-20 md:px-[4.7%] md:py-28">
      <Reveal className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <RevealItem effect="fade" stagger>
          <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
            Quiénes somos
          </RevealItem>
          <RevealItem as="h2" className="mt-4 text-[clamp(2rem,3.6vw,3.8rem)] font-bold leading-tight">
            Powered by people. De Guatemala a la región.
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[52ch] text-lg leading-snug text-base-content/80 md:text-xl">
            Humanizamos las marcas conectándolas con personas reales. No buscamos solo alcance: diseñamos conversaciones
            naturales, relevantes y medibles en Centroamérica y el Caribe.
          </RevealItem>
          <RevealItem className="mt-8">
            <Link
              href="/nosotros"
              transitionTypes={["nav-forward"]}
              className="btn btn-primary h-auto rounded-lg border-0 px-8 py-4 uppercase"
            >
              Conoce más sobre nosotros <FiArrowRight aria-hidden />
            </Link>
          </RevealItem>
        </RevealItem>

        <RevealItem effect="right" stagger className="rounded-3xl border border-base-300 bg-base-200 p-8 md:p-10">
          <RevealItem as="p" className="text-2xl font-bold uppercase leading-tight md:text-3xl">
            Lead the conversation
          </RevealItem>
          <RevealItem as="p" className="mt-4 text-base-content/80">
            Una propuesta de valor construida entre creatividad + ciencia + operación.
          </RevealItem>
          <RevealItem as="ul" effect="fade" stagger className="mt-6 flex flex-wrap gap-3">
            {pillars.map((pillar) => (
              <RevealItem as="li" effect="scale" key={pillar.label} className={`rounded-full px-5 py-2 font-bold uppercase ${pillar.className}`}>
                {pillar.label}
              </RevealItem>
            ))}
          </RevealItem>
        </RevealItem>
      </Reveal>
    </section>
  );
}
