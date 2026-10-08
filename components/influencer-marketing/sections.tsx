import Image from "next/image";
import Link from "next/link";
import type { Media, Talent } from "@/payload-types";
import { Eyebrow, titleClass } from "@/components/home/sections";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import sceneDrink from "@/public/images/home/scene-drink.jpg";
import { CompareAnim } from "./CompareAnim";
import { ProcessStory, ServicesStory, type Service, type Step, type StoryImage } from "./ScrollStory";

// Sections of /influencer-marketing, the sales page for brands, in reading
// order: hero → challenges → before/after → approach → services → process →
// why us → exclusive talent → figures and cases → contact.

const wrap = "mx-auto w-full max-w-[96rem] scroll-mt-24 px-5 md:px-[4%]";
const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);
const pad = (n: number) => String(n).padStart(2, "0");

/** Photo `i` of the talent pool, falling back to the scene photo. */
const photoAt = (talents: Talent[], i: number): StoryImage => media(talents[i]?.thumbnail)?.url ?? sceneDrink;

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
          <span className="text-accent-cycle">Influencer marketing</span>
        </RevealItem>
        <RevealItem as="h1" className="text-[clamp(1.95rem,4.74vw,4.5rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
          Campañas con creadores que se planean, se controlan y <span className="text-accent-cycle">se miden.</span>
        </RevealItem>
        <RevealItem as="p" className="max-w-[560px] text-lg leading-relaxed text-[#c9c2d2]">
          Estrategia, talento exclusivo y tecnología para que tu inversión en influencers mueva conversación y resultados en
          Centroamérica y el Caribe.
        </RevealItem>
        <RevealItem className="flex flex-wrap gap-2.5">
          <a href="#contacto" className="rounded-full bg-base-content px-6 py-[15px] text-sm font-semibold text-base-100 transition-colors hover:bg-accent-cycle">
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
              <span className="pt-2 font-mono text-[13px] text-accent-cycle">{String(i + 1).padStart(2, "0")}</span>
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

/* 3 · Before vs with Influmedia */
export function BeforeAfter({ talents }: { talents: Talent[] }) {
  const rows = [
    { tag: "Antes", title: "Selección de influencers en una hoja.", text: "Poca lectura de afinidad, audiencia, autenticidad o comportamiento.", on: false },
    { tag: "Con Influmedia", title: "Selección + lectura del perfil.", text: "Afinidad, composición de audiencia, autenticidad y señales de riesgo.", on: true },
  ];
  return (
    <section id="antes" className="scroll-mt-24 border-y border-base-300 bg-base-200">
      <Reveal className={`${wrap} grid items-center gap-[clamp(2rem,5vw,4rem)] py-[clamp(4.5rem,9vw,7.5rem)] lg:grid-cols-2`}>
        <div className="flex flex-col gap-6">
          <Eyebrow>De selección manual a decisión informada</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            No basta con un listado y un screenshot.
          </RevealItem>
          <RevealItem as="ul" className="flex flex-col border-t border-[#2c2436]">
            {rows.map((r) => (
              <li key={r.tag} className="flex flex-col gap-1.5 border-b border-[#2c2436] py-[18px]">
                <span className={`font-mono text-[11px] tracking-[0.14em] uppercase ${r.on ? "text-accent-cycle" : "text-[#8e86a0]"}`}>{r.tag}</span>
                <span className="font-display text-xl font-medium tracking-[-0.02em]">{r.title}</span>
                <span className="text-[15px] leading-normal text-muted">{r.text}</span>
              </li>
            ))}
          </RevealItem>
        </div>
        <RevealItem effect="scale" className="min-w-0">
          <CompareAnim talents={talents} />
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 4 · Approach: creative fit, audience fit, measurement */
const pillars = [
  { tag: "Idea", title: "Creative fit", text: "Una idea que el creador puede contar con su propia voz." },
  { tag: "Talento", title: "Audience fit", text: "La audiencia del creador es la audiencia de la marca." },
  { tag: "Datos", title: "Measurement", text: "Cada decisión se valida antes, durante y después.", accent: true },
];
export function Approach() {
  return (
    <section id="enfoque" className={`${wrap} flex flex-col gap-14 py-[clamp(4.5rem,9vw,7.5rem)]`}>
      <Reveal className="flex max-w-[900px] flex-col gap-[22px]">
        <Eyebrow>Nuestro enfoque</Eyebrow>
        <RevealItem as="h2" className={titleClass}>
          El influencer marketing va más allá de las Relaciones Públicas.
        </RevealItem>
        <RevealItem as="p" className="max-w-[560px] text-[17px] leading-relaxed text-muted">
          Funciona mejor cuando una idea relevante se encuentra con una selección estratégica de talento y una medición rigurosa.
        </RevealItem>
      </Reveal>
      <Reveal as="ul" stagger={0.12} className="grid border-t border-base-300 md:grid-cols-3">
        {pillars.map((p) => (
          <RevealItem as="li" key={p.title} className="flex flex-col gap-3.5 pt-8 pr-7 pb-2">
            <span className="font-mono text-xs text-accent-cycle uppercase">{p.tag}</span>
            <h3 className={`text-[clamp(30px,3.5vw,52px)] leading-[0.9] font-semibold tracking-[-0.05em] ${p.accent ? "text-accent-cycle" : ""}`}>{p.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{p.text}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

/* 5 · Services 360°, advanced by scroll */
export function Services({ talents }: { talents: Talent[] }) {
  const services: Service[] = [
    { title: "Estrategia", text: "Partimos de objetivos de negocio claros.", items: ["Diagnóstico y objetivos", "Selección de creadores por afinidad", "Proyección de alcance y ROI"], image: photoAt(talents, 0) },
    { title: "Contenido", text: "Ideas que la audiencia quiere ver, no anuncios disfrazados.", items: ["Concepto creativo y briefs", "Producción con creadores", "Formatos: reels, carruseles, stories y lives"], image: sceneDrink },
    { title: "Comunidad", text: "Conversaciones que siguen después de la publicación.", items: ["Calendario y coordinación de creadores", "Monitoreo en tiempo real", "Gestión de comentarios y alertas"], image: photoAt(talents, 1) },
    { title: "Innovación", text: "Nuevas formas de contar historias de marca.", items: ["Activaciones y eventos", "Creative tech e IA", "Listening e insights para la próxima campaña"], image: photoAt(talents, 2) },
  ];
  return (
    <ServicesStory
      services={services}
      eyebrow={<p className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">Servicios 360°</p>}
      title={
        <h2 className="text-[clamp(26px,min(3.64vw,5.25vh),50px)] leading-[0.94] font-semibold tracking-[-0.045em] text-balance">
          Todo lo que tu campaña necesita, en un solo equipo.
        </h2>
      }
    />
  );
}

/* 6 · Process: five steps, advanced by scroll */
export function Process({ talents }: { talents: Talent[] }) {
  const steps: Step[] = [
    { title: "Personas", phase: "Planning", text: "Entendemos a quién le habla la marca: su audiencia, su contexto y el momento en que la conversación tiene sentido.", deliverables: ["Mapa de audiencia", "Insights de contexto", "Territorios de conversación"], image: photoAt(talents, 3) },
    { title: "KPI’s", phase: "Planning", text: "Definimos objetivos medibles antes de elegir a cualquier creador, para que cada decisión tenga con qué compararse.", deliverables: ["KPIs por objetivo de negocio", "Benchmark de categoría", "Proyección de alcance y ROI"], image: photoAt(talents, 4) },
    { title: "Influencers", phase: "Planning", text: "Seleccionamos talento por afinidad, autenticidad y audiencia real, no por número de seguidores.", deliverables: ["Shortlist con lectura de perfil", "Análisis de autenticidad", "Propuesta y negociación de tarifas"], image: photoAt(talents, 5) },
    { title: "Contenido", phase: "Onway", text: "Integramos el producto en historias que el creador ya cuenta, y acompañamos cada publicación en tiempo real.", deliverables: ["Concepto creativo y briefs", "Calendario y aprobaciones", "Monitoreo y alertas"], image: sceneDrink },
    { title: "Resultados", phase: "Postbuy", text: "Cerramos con lectura de negocio: qué pasó, por qué pasó y qué hacer en la siguiente campaña.", deliverables: ["Reporte en 48 horas", "CPE, ROI, EM y VMG", "Recomendaciones accionables"], image: photoAt(talents, 6) },
  ];
  return <ProcessStory steps={steps} eyebrow={<p className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">Proceso</p>} />;
}

/* 7 · Why Influmedia */
const reasons = [
  { title: "Control", points: ["Equipo especializado en influencer marketing", "100% de cumplimiento de lo contratado"] },
  { title: "Seguridad", points: ["Prevención de fraude y audiencias infladas", "Exclusividad de creadores por categoría"] },
  { title: "Rentabilidad", points: ["Proyección de ROI antes de activar", "Mejores tarifas por volumen"] },
  { title: "Simplicidad", points: ["Facturación consolidada en un solo punto", "Reportes con insights listos para decidir"] },
];
export function WhyUs() {
  return (
    <section id="porque" className={`${wrap} flex flex-col gap-12 py-[clamp(4.5rem,9vw,7.5rem)]`}>
      <Reveal className="flex max-w-[900px] flex-col gap-[22px]">
        <Eyebrow>Por qué Influmedia</Eyebrow>
        <RevealItem as="h2" className={titleClass}>
          Menos fricción. Más control. <span className="text-accent-cycle">Mejor lectura.</span>
        </RevealItem>
      </Reveal>
      <Reveal as="ul" stagger={0.1} className="grid border-t border-l border-base-300 md:grid-cols-2">
        {reasons.map((r, i) => (
          <RevealItem as="li" key={r.title} className="flex flex-col gap-[22px] border-r border-b border-base-300 px-[clamp(20px,3vw,40px)] py-9">
            <div className="flex items-baseline justify-between">
              <h3 className="text-[clamp(27px,2.86vw,40px)] font-semibold tracking-[-0.045em]">{r.title}</h3>
              <span className="font-mono text-xs text-accent-cycle">{pad(i + 1)}</span>
            </div>
            <ul className="flex flex-col text-base text-[#c9c2d2]">
              {r.points.map((p) => (
                <li key={p} className="border-t border-base-300 py-3">
                  {p}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

/* 8 · Exclusive talent: decorative photo marquee, then what representing talent means */
const talentPoints = [
  "Gestión directa de creadores: negociación, contratos y calendario sin intermediarios.",
  "Convenios de exclusividad por categoría y marca.",
  "Roster activo en lifestyle, comedia, moda, entretenimiento, fitness, deporte, gaming, tech y automotriz.",
];
export function ExclusiveTalent({ talents }: { talents: Talent[] }) {
  const photos = talents.flatMap((t) => (media(t.thumbnail)?.url ? [{ id: t.id, url: media(t.thumbnail)!.url! }] : []));
  const strip = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex h-full shrink-0 gap-[3px] pr-[3px]">
      {photos.map((p) => (
        <li key={p.id} className="relative h-full w-[clamp(160px,16.6vw,320px)] shrink-0 overflow-hidden bg-[#140f1a]">
          <Image src={p.url} alt="" fill sizes="(max-width: 1024px) 160px, 17vw" className="object-cover object-[50%_18%] brightness-[.55]" />
        </li>
      ))}
    </ul>
  );
  return (
    <section id="talento" className="flex scroll-mt-24 flex-col border-t border-base-300">
      {photos.length > 0 && (
        // Decorative: loops forever like the brand marquee; no hover, no captions.
        <div aria-hidden className="flex h-[clamp(260px,34vw,460px)] overflow-hidden">
          <div className="flex h-full animate-[marquee_240s_linear_infinite] motion-reduce:animate-none">
            {strip(false)}
            {strip(true)}
          </div>
        </div>
      )}
      <Reveal className={`${wrap} grid gap-[clamp(2rem,5vw,4.5rem)] py-[clamp(3rem,6vw,5rem)] lg:grid-cols-2`}>
        <div className="flex flex-col gap-[22px]">
          <Eyebrow>#WeAreInflumedia · Talentos exclusivos</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            Además de crear campañas, representamos talento.
          </RevealItem>
          <RevealItem>
            <Link
              href="/creadores"
              transitionTypes={["nav-forward"]}
              className="border-b border-tint/60 pb-1 text-[15px] text-[#d6d0de] transition-colors hover:text-base-content"
            >
              Conoce el roster
            </Link>
          </RevealItem>
        </div>
        <RevealItem as="ol" effect="fade" stagger className="flex flex-col border-t border-base-300">
          {talentPoints.map((t, i) => (
            <RevealItem as="li" key={t} className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 border-b border-base-300 py-[22px]">
              <span className="font-mono text-[13px] text-accent-cycle">{pad(i + 1)}</span>
              <span className="text-[17px] leading-normal text-[#d6d0de]">{t}</span>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}
