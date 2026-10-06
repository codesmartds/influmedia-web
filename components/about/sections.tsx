import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons";
import { TbChartBar, TbHeartHandshake, TbTargetArrow, TbUsersGroup } from "react-icons/tb";
import type { Category, Media, Talent, Team } from "@/payload-types";
import { CtaLink, Heading } from "@/components/home/sections";
import { CountUp } from "@/components/slides/CountUp";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import arcsMap from "@/public/images/quienes-somos/mapa-1.png";
import regionMap from "@/public/images/quienes-somos/mapa-2.png";

// Sections of /nosotros: who Influmedia is and why to trust them.

const wrap = "mx-auto w-full max-w-[96rem] px-6 md:px-[4.7%]";

/* 1 · Hero */
export function AboutHero() {
  return (
    <section className={`${wrap} pb-6 pt-16 md:pt-24`}>
      <Reveal>
        <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
          Nosotros
        </RevealItem>
        <RevealItem as="h1" className="mt-4 max-w-[20ch] text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[1.02]">
          Somos tu partner para que tu campaña llegue a los medios correctos.
        </RevealItem>
        <RevealItem as="p" className="mt-6 text-2xl font-bold uppercase text-accent">
          Powered by people.
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 2 · Manifesto */
const values = [
  { label: "Creatividad", text: "Ideas que la audiencia quiere ver.", className: "bg-primary text-primary-content" },
  { label: "Data", text: "Decisiones con contexto, antes y después.", className: "bg-secondary text-secondary-content" },
  { label: "People", text: "Personas reales hablando con personas reales.", className: "bg-accent text-accent-content" },
];

export function Manifesto() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <RevealItem effect="fade" stagger>
          <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
            Nuestro propósito
          </RevealItem>
          <RevealItem as="h2" className="mt-3 text-[clamp(2rem,3.6vw,3.8rem)] font-bold leading-tight">
            Humanizar las marcas conectándolas con personas reales.
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[52ch] text-lg leading-relaxed text-base-content/80">
            No buscamos solo alcance. Diseñamos conversaciones que se sientan naturales, relevantes y medibles, con una
            propuesta de valor construida entre creatividad, ciencia y operación.
          </RevealItem>
        </RevealItem>
        <RevealItem as="ul" effect="fade" stagger className="flex flex-col gap-4">
          {values.map((v) => (
            <RevealItem as="li" effect="right" key={v.label} className="flex items-center gap-5 rounded-2xl border border-base-300 bg-base-200 p-5">
              <span className={`shrink-0 rounded-full px-5 py-2 font-bold uppercase ${v.className}`}>{v.label}</span>
              <span className="text-base-content/80">{v.text}</span>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 3 · History. Years are placeholders until the client confirms them. */
const milestones = [
  { year: "2016", title: "Lanzamiento", text: "Nacemos en Guatemala con un foco claro: influencer marketing, no como servicio secundario." },
  { year: "2019", title: "Expansión", text: "Llevamos la operación a Centroamérica y el Caribe." },
  { year: "Hoy", title: "Regional mindset", text: "+800 campañas en +8 países, con talento exclusivo y tecnología propia." },
];

export function History() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <Heading eyebrow="Nuestra historia" title="De Guatemala a la región." />
          <RevealItem as="ol" effect="fade" stagger className="relative mt-10 flex flex-col gap-8 border-l-2 border-base-300 pl-8">
            {milestones.map((m) => (
              <RevealItem as="li" effect="left" key={m.year} className="relative">
                <span aria-hidden className="absolute -left-[2.6rem] top-1 size-4 rounded-full border-[3px] border-base-100 bg-secondary" />
                <p className="text-sm font-bold uppercase text-secondary">{m.year}</p>
                <h3 className="mt-1 text-xl font-bold">{m.title}</h3>
                <p className="mt-1 leading-snug text-base-content/75">{m.text}</p>
              </RevealItem>
            ))}
          </RevealItem>
        </div>
        <RevealItem effect="scale">
          <Image src={arcsMap} alt="Mapa con la expansión de Influmedia desde Guatemala hacia Centroamérica y el Caribe" sizes="(max-width: 1024px) 100vw, 55vw" className="h-auto w-full" />
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 4 · Regional presence */
export function Presence() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal className="grid items-center gap-12 overflow-hidden rounded-3xl border border-base-300 bg-base-200 p-8 md:p-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Heading eyebrow="Presencia regional" title="Una sola operación para toda la región." />
          <RevealItem className="mt-8 flex items-end gap-4">
            <span className="text-[clamp(4rem,8vw,7rem)] font-bold leading-none text-secondary">
              <CountUp value={8} prefix="+" />
            </span>
            <span className="pb-3 text-lg font-bold uppercase leading-tight text-base-content/70">
              países en Centroamérica
              <br />y el Caribe
            </span>
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[44ch] text-base-content/75">
            Coordinamos talento, contenido y medición en múltiples mercados desde nuestra oficina en Ciudad de Guatemala.
          </RevealItem>
        </div>
        <RevealItem effect="scale">
          <Image src={regionMap} alt="Mapa de Centroamérica y el Caribe" sizes="(max-width: 1024px) 100vw, 50vw" className="h-auto w-full" />
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 5 · Team (hidden until there are members) */
const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export function TeamGrid({ members }: { members: Team[] }) {
  if (members.length === 0) return null;
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Equipo" title="Las personas detrás de cada conversación." />
        <RevealItem as="ul" effect="fade" stagger={0.06} className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {members.map((m) => {
            const photo = m.photo && typeof m.photo === "object" ? (m.photo as Media) : null;
            return (
              <RevealItem as="li" effect="scale" key={m.id} className="flex flex-col rounded-2xl border border-base-300 bg-base-200 p-5">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[#3b8fe0]">
                  {photo?.url ? (
                    <Image src={photo.url} alt={m.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover object-top" />
                  ) : (
                    <span aria-hidden className="flex h-full items-center justify-center text-5xl font-bold text-white/90">
                      {initials(m.name)}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-bold">{m.name}</h3>
                <p className="text-sm text-secondary">{m.role}</p>
                {m.bio && <p className="mt-2 text-sm leading-snug text-base-content/70">{m.bio}</p>}
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn de ${m.name}`}
                    className="mt-3 inline-flex size-8 items-center justify-center rounded-lg border border-base-300 hover:border-secondary hover:text-secondary"
                  >
                    <FaLinkedinIn aria-hidden />
                  </a>
                )}
              </RevealItem>
            );
          })}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 6 · How we think */
const principles: { title: string; text: string; Icon: IconType }[] = [
  { title: "Afinidad antes que alcance", text: "Una audiencia pequeña y afín mueve más conversación que una grande y dispersa.", Icon: TbTargetArrow },
  { title: "Medir desde el día uno", text: "Proyectamos antes de activar y leemos durante y después.", Icon: TbChartBar },
  { title: "Las comunidades se cuidan", text: "No se compran: se construyen con contenido honesto.", Icon: TbUsersGroup },
  { title: "Socios, no proveedores", text: "Nos sentamos del lado de la marca y del creador a la vez.", Icon: TbHeartHandshake },
];

export function Principles() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Cómo pensamos" title="Cuatro ideas que guían cada campaña." />
        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ title, text, Icon }) => (
            <RevealItem as="li" key={title} className="rounded-2xl border border-base-300 bg-base-200 p-7">
              <Icon aria-hidden className="text-3xl text-secondary" />
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 leading-snug text-base-content/70">{text}</p>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 7 · Talent roster: what representation means, categories and faces */
const talentPoints = [
  { title: "Gestión directa", text: "Negociación, contratos y calendario sin intermediarios." },
  { title: "Exclusividad", text: "Convenios por categoría y marca." },
  { title: "Roster activo", text: "Creadores en 9 categorías, listos para activar." },
];

export function TalentShowcase({ talents }: { talents: Talent[] }) {
  const withPhoto = talents.filter((t) => t.thumbnail && typeof t.thumbnail === "object" && (t.thumbnail as Media).url);
  // Category chips with how many creators each one has, largest first.
  const counts = new Map<number, { category: Category; count: number }>();
  for (const t of talents) {
    if (!t.category || typeof t.category !== "object") continue;
    const entry = counts.get(t.category.id) ?? { category: t.category, count: 0 };
    entry.count += 1;
    counts.set(t.category.id, entry);
  }
  const categories = [...counts.values()].sort((a, b) => b.count - a.count);

  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Talentos exclusivos" title={`Representamos y gestionamos a +${Math.floor(talents.length / 10) * 10} creadores.`}>
          Además de crear campañas, en Influmedia representamos talento: tú encuentras la voz correcta, ellos crean con
          respaldo.
        </Heading>

        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {talentPoints.map((p) => (
            <RevealItem as="li" key={p.title} className="rounded-2xl border border-base-300 bg-base-200 p-6">
              <h3 className="font-bold uppercase text-secondary">{p.title}</h3>
              <p className="mt-1 text-base-content/75">{p.text}</p>
            </RevealItem>
          ))}
        </RevealItem>

        <RevealItem as="ul" effect="fade" stagger={0.04} className="mt-8 flex flex-wrap gap-2">
          {categories.map(({ category, count }) => (
            <RevealItem as="li" effect="scale" key={category.id} className="flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm">
              <span aria-hidden className="size-2.5 rounded-full" style={{ background: category.color }} />
              <span className="font-bold">{category.name}</span>
              <span className="text-base-content/50">{count}</span>
            </RevealItem>
          ))}
        </RevealItem>

        <RevealItem as="ul" effect="fade" stagger={0.04} className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {withPhoto.slice(0, 12).map((t) => {
            const category = t.category && typeof t.category === "object" ? t.category : null;
            return (
              <RevealItem as="li" effect="scale" key={t.id} className="group relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={(t.thumbnail as Media).url!}
                  alt={t.name}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10">
                  <p className="text-sm font-bold leading-tight">{t.name}</p>
                  {category && (
                    <p className="text-[0.65rem] font-bold uppercase" style={{ color: category.color }}>
                      {category.name}
                    </p>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealItem>

        <RevealItem className="mt-10 flex flex-wrap gap-4">
          <CtaLink href="/contacto">Quiero trabajar con este talento</CtaLink>
          <CtaLink href="/creadores" variant="ghost">
            Únete al roster
          </CtaLink>
        </RevealItem>
      </Reveal>
    </section>
  );
}
