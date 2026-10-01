import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NewsletterButton } from "@/components/newsletter/NewsletterButton";
import { SharedElement } from "@/components/transitions/PageTransition";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import type { Deck } from "@/payload-types";

type DeckSection = NonNullable<Deck["sections"]>[number];

// Full class names so Tailwind picks them up.
const accentClasses: Record<DeckSection["color"], { bar: string; text: string }> = {
  primary: { bar: "bg-primary", text: "text-primary" },
  secondary: { bar: "bg-secondary", text: "text-secondary" },
  accent: { bar: "bg-accent", text: "text-accent" },
};

const sectionLinkClass =
  "mt-8 inline-flex items-center gap-2 self-start text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold uppercase underline underline-offset-4";

export function DeckSlide({ sections }: { sections: DeckSection[] }) {
  return (
    <section className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-base-100 px-6 py-10 md:px-[4%] md:py-[3.5%]">
      <header className="flex items-start justify-between gap-6">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="btn btn-outline btn-secondary h-auto rounded-lg border-2 px-10 py-3 text-sm font-bold uppercase"
        >
          <FiArrowLeft aria-hidden /> Portada
        </Link>
        <SharedElement name="brand-logo">
          <BrandLogo variant="white" priority className="w-[max(8rem,10.5vw)]" />
        </SharedElement>
      </header>

      <Reveal className="mt-10 md:mt-[4%]" delay={0.25}>
        <RevealItem
          as="p"
          className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.85rem,1.1vw,1.2rem)]"
        >
          Interactive new business deck
        </RevealItem>
        <RevealItem as="h1" className="mt-2 text-[clamp(2rem,3.5vw,3.8rem)] font-bold uppercase leading-tight">
          ¿Qué quieres ver?
        </RevealItem>
        <RevealItem as="p" className="mt-2 text-[clamp(1rem,1.35vw,1.45rem)] text-muted">
          Elige una sección y entra directo a la conversación.
        </RevealItem>
      </Reveal>

      <Reveal
        as="ul"
        delay={0.45}
        stagger={0.06}
        className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-[3.5%] lg:grid-cols-4 lg:gap-[1.4vw] lg:pr-[2%]"
      >
        {sections.map((section, index) => {
          const accent = accentClasses[section.color];
          return (
            <RevealItem
              as="li"
              key={section.id ?? section.title}
              className="relative flex w-full flex-col rounded-[1.75rem] border border-white/40 bg-[#f4f2f9] px-[max(1.5rem,2.2vw)] pb-7 pt-5 text-[#14102b] shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
            >
              <span aria-hidden className={`absolute right-6 top-3.5 h-3 w-[3.5rem] rounded-sm shadow ${accent.bar}`} />
              <span className={`text-center text-[clamp(0.95rem,1.1vw,1.15rem)] font-bold ${accent.text}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[clamp(1.15rem,1.55vw,1.65rem)] font-bold uppercase leading-tight">
                {section.title}
              </h2>
              <p className="mt-1 text-[clamp(0.85rem,1vw,1.1rem)] text-[#5b5870]">{section.content}</p>
              {section.action === "newsletter" ? (
                <NewsletterButton className={`${sectionLinkClass} ${accent.text}`}>
                  Suscribirme <FiArrowRight aria-hidden />
                </NewsletterButton>
              ) : section.route ? (
                <Link
                  href={section.route}
                  transitionTypes={["nav-forward"]}
                  className={`${sectionLinkClass} ${accent.text}`}
                >
                  Ver sección <FiArrowRight aria-hidden />
                </Link>
              ) : (
                <span className={`${sectionLinkClass} ${accent.text} opacity-50`}>
                  Ver sección <FiArrowRight aria-hidden />
                </span>
              )}
            </RevealItem>
          );
        })}
      </Reveal>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-6 md:mt-auto md:pt-[2.5%]">
        <p className="text-xs font-bold uppercase text-white/50 md:text-[clamp(0.7rem,0.85vw,0.95rem)]">
          Influmedia • Click to navigate • Lead the conversation
        </p>
        <Link
          href="/contacto"
          transitionTypes={["nav-forward"]}
          className="btn btn-primary border-0 h-auto w-full rounded-lg px-10 py-4 text-base font-bold uppercase shadow-lg sm:w-auto sm:min-w-[20vw]"
        >
          Contacto <FiArrowRight aria-hidden />
        </Link>
      </footer>
    </section>
  );
}
