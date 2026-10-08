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
import Image from "next/image";
import { Eyebrow, Heading, titleClass } from "@/components/home/sections";
import sceneDrink from "@/public/images/home/scene-drink.jpg";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Sections of /influencer-marketing, the sales page for brands. Order
// follows the buyer's questions: why this channel → what you buy → how it
// runs → why us → proof → who → how to start → objections → contact.

const wrap = "mx-auto w-full max-w-[96rem] scroll-mt-36 px-6 md:px-[4.7%]";

/* 1 · Hero: full-bleed scene, pulled up under the transparent header */
export function ImHero() {
  return (
    <section className="relative isolate -mt-[4.5rem] flex min-h-[min(860px,100dvh)] flex-col overflow-hidden pt-[4.5rem]">
      <Image
        src={sceneDrink}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover object-[60%_35%] brightness-[.62] saturate-[.8]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,8,16,.94)_0%,rgba(11,8,16,.7)_40%,rgba(11,8,16,.15)_75%),linear-gradient(0deg,rgba(11,8,16,1)_0%,rgba(11,8,16,0)_35%),linear-gradient(180deg,rgba(11,8,16,.8)_0%,rgba(11,8,16,0)_18%)]"
      />
      <Reveal className="mt-auto flex max-w-[1100px] flex-col gap-[26px] px-5 pb-16 md:px-[4%]">
        <RevealItem as="p" className="flex gap-2.5 font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
          <Link href="/" transitionTypes={["nav-back"]} className="transition-colors hover:text-base-content">
            Inicio
          </Link>
          <span aria-hidden>/</span>
          <span className="text-secondary">Influencer marketing</span>
        </RevealItem>
        <RevealItem as="h1" className="text-[clamp(1.95rem,4.74vw,4.5rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
          Campañas con creadores que se planean, se controlan y <span className="text-secondary">se miden.</span>
        </RevealItem>
        <RevealItem as="p" className="max-w-[560px] text-lg leading-relaxed text-[#c9c2d2]">
          Estrategia, talento exclusivo y tecnología para que tu inversión en influencers mueva conversación y resultados en
          Centroamérica y el Caribe.
        </RevealItem>
        <RevealItem className="flex flex-wrap gap-2.5">
          <a href="#contacto" className="rounded-full bg-base-content px-6 py-[15px] text-sm font-semibold text-base-100 transition-colors hover:bg-secondary">
            Cotiza tu campaña
          </a>
          <a href="#resultados" className="rounded-full border border-base-content/40 px-6 py-[15px] text-sm font-medium transition-colors hover:bg-base-content/10">
            Ver casos
          </a>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 2 · Why influencer marketing: the four challenges it has to solve */
const challenges = [
  { title: "Autenticidad", text: "Conectar al creador con el producto para lograr una comunicación natural y creíble." },
  { title: "Seguidores falsos", text: "Los bots y las audiencias no reales reducen el valor del esfuerzo publicitario." },
  { title: "Afinidad", text: "La relación entre perfil, audiencia y marca determina qué tan natural se siente el contenido." },
  { title: "Métricas", text: "Analizar y extraer estadísticas permite evaluar la campaña y generar insights accionables." },
];
export function Challenges() {
  return (
    <section id="retos" className={`${wrap} py-[clamp(4.5rem,9vw,7.5rem)]`}>
      <Reveal className="grid gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2">
        <div className="flex flex-col gap-[22px]">
          <Eyebrow>¿Por qué influencer marketing?</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            El reto no es “tener influencers”.
          </RevealItem>
          <RevealItem as="p" className="max-w-[460px] text-[17px] leading-relaxed text-muted">
            El reto es elegir, validar, medir y mantener credibilidad. Cuando eso se resuelve, el creador se vuelve un canal tan
            confiable como cualquier otro medio.
          </RevealItem>
        </div>
        <RevealItem as="ol" effect="fade" stagger className="flex flex-col border-t border-base-300">
          {challenges.map((c, i) => (
            <RevealItem as="li" key={c.title} className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 border-b border-base-300 py-7">
              <span className="pt-2 font-mono text-[13px] text-[#7ba7d1]">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[clamp(24px,2.4vw,32px)] font-medium tracking-[-0.03em]">{c.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{c.text}</p>
              </div>
            </RevealItem>
          ))}
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
