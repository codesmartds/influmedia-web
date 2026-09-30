import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { SharedElement } from "@/components/transitions/PageTransition";
import { StaggerList } from "@/components/transitions/StaggerList";

type Accent = "primary" | "secondary" | "accent";

const sections: { title: string; subtitle: string; accent: Accent }[] = [
  { title: "Quiénes somos", subtitle: "Powered by people.", accent: "primary" },
  { title: "Nuestra historia", subtitle: "De Guatemala a la región.", accent: "secondary" },
  { title: "Qué hacemos", subtitle: "Estrategia, contenido y comunidad.", accent: "accent" },
  { title: "Impacto + clientes", subtitle: "Escala, operación y marcas.", accent: "secondary" },
  { title: "Por qué Influmedia", subtitle: "Menos fricción. Más control.", accent: "primary" },
  { title: "Nuestro enfoque", subtitle: "Fit, afinidad y medición.", accent: "accent" },
  { title: "Nuestro sistema", subtitle: "Planning · Onway · Postbuy.", accent: "primary" },
  { title: "Trabajo en acción", subtitle: "Creators + campañas reales.", accent: "secondary" },
];

// Full class names so Tailwind picks them up.
const accentClasses: Record<Accent, { bar: string; text: string }> = {
  primary: { bar: "bg-primary", text: "text-primary" },
  secondary: { bar: "bg-secondary", text: "text-secondary" },
  accent: { bar: "bg-accent", text: "text-accent" },
};

export function DeskSlide() {
  return (
    <section className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-base-100 px-6 py-10 md:px-[4%] md:py-[3.5%]">
      {/* Decorative circles: top-right pair and bottom-left */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <SharedElement name="brand-circle">
          <div className="absolute right-[-8%] top-[-20%] aspect-square w-[max(16rem,24%)] rounded-full bg-primary/80" />
        </SharedElement>
        <div className="absolute right-[-5%] top-[-4%] aspect-square w-[max(11rem,15%)] rounded-full bg-[#4f7fc9]" />
        <div className="absolute bottom-[-12%] left-[-9%] aspect-square w-[max(10rem,20%)] rounded-full bg-[#8a5a7e]" />
      </div>

      <header className="flex items-start justify-between gap-6">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          className="btn btn-outline btn-secondary h-auto rounded-lg border-2 px-10 py-3 text-sm font-bold uppercase"
        >
          <FiArrowLeft aria-hidden /> Portada
        </Link>
        <SharedElement name="brand-logo">
          <div className="flex aspect-[170/75] w-[max(8rem,10%)] items-center justify-center rounded-xl border-2 border-dashed border-white/30 text-xs font-semibold uppercase tracking-widest text-white/60">
            Logo
          </div>
        </SharedElement>
      </header>

      <div className="mt-10 md:mt-[4%]">
        <p className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.85rem,1.1vw,1.2rem)]">
          Interactive new business deck
        </p>
        <h1 className="mt-2 text-[clamp(2rem,3.5vw,3.8rem)] font-bold uppercase leading-tight">
          ¿Qué quieres ver?
        </h1>
        <p className="mt-2 text-[clamp(1rem,1.35vw,1.45rem)] text-muted">
          Elige una sección y entra directo a la conversación.
        </p>
      </div>

      <StaggerList className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-[3.5%] lg:grid-cols-4 lg:gap-[1.4vw] lg:pr-[2%]">
        {sections.map((section, index) => {
          const accent = accentClasses[section.accent];
          return (
            <article
              key={section.title}
              className="relative flex w-full flex-col rounded-[1.75rem] border border-white/40 bg-[#f4f2f9] px-[max(1.5rem,2.2vw)] pb-7 pt-5 text-[#14102b] shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
            >
              <span aria-hidden className={`absolute right-6 top-3.5 h-3 w-[3.5rem] rounded-sm shadow ${accent.bar}`} />
              <span className={`text-center text-[clamp(0.95rem,1.1vw,1.15rem)] font-bold ${accent.text}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[clamp(1.15rem,1.55vw,1.65rem)] font-bold uppercase leading-tight">
                {section.title}
              </h2>
              <p className="mt-1 text-[clamp(0.85rem,1vw,1.1rem)] text-[#5b5870]">{section.subtitle}</p>
              <button
                type="button"
                className={`mt-8 inline-flex cursor-pointer items-center gap-2 self-start text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold uppercase underline underline-offset-4 ${accent.text}`}
              >
                Ver sección <FiArrowRight aria-hidden />
              </button>
            </article>
          );
        })}
      </StaggerList>

      <footer className="mt-10 flex flex-wrap items-center justify-between gap-6 md:mt-auto md:pt-[2.5%]">
        <p className="text-xs font-bold uppercase text-white/50 md:text-[clamp(0.7rem,0.85vw,0.95rem)]">
          Influmedia • Click to navigate • Lead the conversation
        </p>
        <button
          type="button"
          className="btn btn-primary border-0 h-auto w-full rounded-lg px-10 py-4 text-base font-bold uppercase shadow-lg sm:w-auto sm:min-w-[20vw]"
        >
          Contacto <FiArrowRight aria-hidden />
        </button>
      </footer>
    </section>
  );
}
