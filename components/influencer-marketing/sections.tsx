import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";
import {
  TbBulb,
  TbChartBar,
  TbCoin,
  TbFileInvoice,
  TbShieldCheck,
  TbSquareChevronRight,
  TbTargetArrow,
  TbUsersGroup,
} from "react-icons/tb";
import { Heading } from "@/components/home/sections";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Sections of /influencer-marketing, the sales page for brands. Order
// follows the buyer's questions: why this channel → what you buy → how it
// runs → why us → proof → who → how to start → objections → contact.

const wrap = "mx-auto w-full max-w-[96rem] scroll-mt-36 px-6 md:px-[4.7%]";

/* 1 · Hero */
export function ImHero() {
  return (
    <section className={`${wrap} pb-10 pt-16 md:pt-24`}>
      <Reveal>
        <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
          Influencer marketing para marcas
        </RevealItem>
        <RevealItem as="h1" className="mt-4 max-w-[18ch] text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[1.02]">
          Campañas con creadores que se planean, se controlan y se miden.
        </RevealItem>
        <RevealItem as="p" className="mt-6 max-w-[54ch] text-lg leading-snug text-base-content/80 md:text-xl">
          Estrategia, talento exclusivo y tecnología para que tu inversión en influencers mueva conversación y resultados en
          Centroamérica y el Caribe.
        </RevealItem>
        <RevealItem className="mt-10 flex flex-wrap gap-4">
          <a href="#contacto" className="btn btn-primary h-auto rounded-lg border-0 px-8 py-4 uppercase">
            Cotiza tu campaña <FiArrowRight aria-hidden />
          </a>
          <a
            href="#resultados"
            className="btn btn-outline h-auto rounded-lg border-white/30 px-8 py-4 uppercase hover:border-secondary hover:bg-transparent hover:text-secondary"
          >
            Ver casos
          </a>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 4 · Services, each with concrete deliverables (proposed; to validate). */
const services: { title: string; text: string; Icon: IconType; deliverables: string[] }[] = [
  {
    title: "Estrategia",
    text: "Partimos de objetivos de negocio claros.",
    Icon: TbTargetArrow,
    deliverables: ["Diagnóstico y objetivos", "Selección de creadores por afinidad", "Proyección de alcance y ROI"],
  },
  {
    title: "Contenido",
    text: "Ideas que la audiencia quiere ver, no anuncios disfrazados.",
    Icon: TbSquareChevronRight,
    deliverables: ["Concepto creativo y briefs", "Producción con creadores", "Formatos: reels, carruseles, stories y lives"],
  },
  {
    title: "Comunidad",
    text: "Conversaciones que siguen después de la publicación.",
    Icon: TbUsersGroup,
    deliverables: ["Calendario y coordinación de creadores", "Monitoreo en tiempo real", "Gestión de comentarios y alertas"],
  },
  {
    title: "Innovación",
    text: "Nuevas formas de contar historias de marca.",
    Icon: TbBulb,
    deliverables: ["Activaciones y eventos", "Creative tech e IA", "Listening e insights para la próxima campaña"],
  },
];

export function Services() {
  return (
    <section id="servicios" className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Servicios" title="Todo lo que tu campaña necesita, en un solo equipo." />
        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map(({ title, text, Icon, deliverables }) => (
            <RevealItem as="li" key={title} className="flex flex-col rounded-2xl border border-base-300 bg-base-200 p-7 md:p-8">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/20 text-2xl text-secondary">
                <Icon aria-hidden />
              </span>
              <h3 className="mt-5 text-2xl font-bold uppercase">{title}</h3>
              <p className="mt-2 text-base-content/75">{text}</p>
              <ul className="mt-5 flex flex-col gap-2 border-t border-base-300 pt-5">
                {deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-base-content/85">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                    {d}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 6 · Differentiators: the deck's eight reasons, grouped into four. */
const pillars: { title: string; Icon: IconType; points: string[] }[] = [
  { title: "Control", Icon: TbChartBar, points: ["Equipo especializado en influencer marketing", "100% de cumplimiento de lo contratado"] },
  { title: "Seguridad", Icon: TbShieldCheck, points: ["Prevención de fraude y audiencias infladas", "Exclusividad de creadores por categoría"] },
  { title: "Rentabilidad", Icon: TbCoin, points: ["Proyección de ROI antes de activar", "Mejores tarifas por volumen"] },
  { title: "Simplicidad", Icon: TbFileInvoice, points: ["Facturación consolidada en un solo punto", "Reportes con insights listos para decidir"] },
];

export function Differentiators() {
  return (
    <section id="diferenciadores" className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Por qué Influmedia" title="Menos fricción. Más control. Mejor lectura." />
        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ title, Icon, points }) => (
            <RevealItem as="li" key={title} className="rounded-2xl border border-base-300 bg-base-200 p-7">
              <Icon aria-hidden className="text-3xl text-secondary" />
              <h3 className="mt-4 text-xl font-bold uppercase">{title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {points.map((p) => (
                  <li key={p} className="leading-snug text-base-content/75">
                    {p}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 9 · How we start: the steps after the first message. No packages. */
const startSteps = [
  { title: "Nos cuentas tu objetivo", text: "Completa el formulario o escríbenos: marca, mercado, fechas y lo que buscas lograr." },
  { title: "Te enviamos una propuesta", text: "Estrategia, creadores recomendados con su análisis de perfil y proyección de resultados." },
  { title: "Activamos y monitoreamos", text: "Coordinamos a los creadores y seguimos la campaña en tiempo real." },
  { title: "Leemos los resultados", text: "Reporte en 48 horas con métricas de negocio e insights para la próxima." },
];

export function HowWeStart() {
  return (
    <section id="como-empezamos" className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Cómo empezamos" title="De tu primer mensaje a la campaña en marcha." />
        <RevealItem as="ol" effect="fade" stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {startSteps.map((step, i) => (
            <RevealItem as="li" key={step.title} className="relative rounded-2xl border border-base-300 bg-base-200 p-7">
              <span className="text-4xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 leading-snug text-base-content/70">{step.text}</p>
            </RevealItem>
          ))}
        </RevealItem>
        <RevealItem className="mt-10">
          <Link href="#contacto" className="btn btn-primary h-auto rounded-lg border-0 px-8 py-4 uppercase">
            Empezar ahora <FiArrowRight aria-hidden />
          </Link>
        </RevealItem>
      </Reveal>
    </section>
  );
}
