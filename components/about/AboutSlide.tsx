import Link from "next/link";
import { SharedElement } from "@/components/transitions/PageTransition";

const pillars = [
  { label: "Creatividad", className: "bg-primary text-primary-content" },
  { label: "Data", className: "bg-secondary text-white" },
  { label: "People", className: "bg-accent text-white" },
];

export function AboutSlide() {
  return (
    <section className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-base-100 px-6 py-8 md:px-[4.4%] md:py-[2%]">
      <header className="flex items-start justify-end gap-6 md:gap-[2.5%]">
        <Link
          href="/deck"
          transitionTypes={["nav-back"]}
          className="btn btn-primary h-auto min-w-[8rem] rounded-md border-0 px-10 py-3 text-xs font-bold uppercase shadow-lg md:mt-[0.1%] md:min-w-[8%]"
        >
          Menú
        </Link>
        <SharedElement name="brand-logo">
          <div className="flex aspect-[170/75] w-[max(8rem,10%)] items-center justify-center rounded-xl border-2 border-dashed border-white/30 text-xs font-semibold uppercase tracking-widest text-white/60">
            Logo
          </div>
        </SharedElement>
      </header>

      <div className="mt-6 grid flex-1 items-center gap-10 md:-mt-[2%] md:grid-cols-[1fr_39%] md:gap-[8%] md:pr-[3%]">
        <div className="self-start md:pt-[5%]">
          <p className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.9rem,1.6vw,1.7rem)]">
            Quiénes somos
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,3.8vw,4.2rem)] font-bold leading-[1.2]">
            Powered by
            <br />
            people.
          </h1>
          <p className="mt-8 max-w-[34ch] text-[clamp(1.1rem,1.95vw,2.1rem)] leading-snug text-base-content/85 md:mt-[9%]">
            Creemos en humanizar las marcas conectándolas con personas reales.
          </p>
          <p className="mt-6 max-w-[46ch] text-[clamp(0.95rem,1.45vw,1.55rem)] leading-snug text-muted md:mt-[6%]">
            No buscamos solo alcance. Diseñamos conversaciones que se sientan naturales, relevantes y
            medibles.
          </p>

          {/* Dot grid accent */}
          <div
            aria-hidden
            className="mt-12 hidden h-[7rem] w-[10.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1.5px,transparent_1.6px)] bg-[length:1.5rem_1.5rem] md:mt-[14%] md:block"
          />
        </div>

        <article className="rounded-3xl border border-base-300 bg-base-200 px-6 pb-6 pt-10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:px-[3%] md:pb-[3%] md:pt-[15%]">
          <h2 className="px-2 text-[clamp(2rem,3.1vw,3.4rem)] font-bold uppercase leading-[1.18] md:px-[5%]">
            Lead
            <br />
            the
            <br />
            conversation
          </h2>
          <p className="mt-8 px-2 text-[clamp(1rem,1.75vw,1.9rem)] leading-snug text-base-content/85 md:mt-[13%] md:px-[5%]">
            Una propuesta de valor construida entre creatividad + ciencia + operación.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3 md:mt-[9%] md:flex-nowrap md:gap-[2.5%]">
            {pillars.map((pillar) => (
              <li
                key={pillar.label}
                className={`flex-1 whitespace-nowrap rounded-full px-5 py-3 text-center text-[clamp(1rem,1.75vw,1.9rem)] font-bold uppercase leading-none ${pillar.className}`}
              >
                {pillar.label}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <footer className="mt-10 md:mt-[1%]">
        <p className="text-xs font-bold uppercase text-white/50 md:text-[clamp(0.7rem,0.85vw,0.95rem)]">
          Influmedia • Lead the conversation
        </p>
      </footer>
    </section>
  );
}
