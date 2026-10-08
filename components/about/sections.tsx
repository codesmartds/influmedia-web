import Image from "next/image";
import Link from "next/link";
import type { ContactInfo, Media, Talent, Team } from "@/payload-types";
import { phoneLink } from "@/components/contact/phone";
import { Eyebrow, titleClass } from "@/components/home/sections";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { RegionMap } from "./RegionMap";
import { TalentGrid } from "./TalentGrid";

// Sections of /nosotros, in reading order: hero → purpose → history →
// regional presence → team → principles → talent → FAQ → contact.

const wrap = "mx-auto w-full max-w-[96rem] scroll-mt-24 px-5 md:px-[4%]";
const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);
const pad = (n: number) => String(n).padStart(2, "0");
const sectionY = "py-[clamp(4.5rem,9vw,7.5rem)]";

/* 1 · Hero: headline, then a strip of five talents with the tagline */
export function AboutHero({ talents }: { talents: Talent[] }) {
  const faces = talents.filter((t) => media(t.thumbnail)?.url).slice(0, 5);
  return (
    <header className="flex flex-col">
      <Reveal className={`${wrap} grid items-end gap-[clamp(28px,4vw,56px)] pt-[clamp(3rem,8vw,7rem)] pb-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-3`}>
        <div className="flex min-w-0 flex-col gap-[26px] lg:col-span-2">
          <RevealItem as="p" className="flex gap-2.5 font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            <Link href="/" transitionTypes={["nav-back"]} className="transition-colors hover:text-base-content">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-accent-cycle">Nosotros</span>
          </RevealItem>
          <RevealItem as="h1" className="text-[clamp(1.95rem,4.74vw,4.5rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
            Somos tu partner para que tu campaña llegue a los <span className="text-accent-cycle">medios correctos.</span>
          </RevealItem>
        </div>
        <RevealItem className="flex flex-col gap-1.5 pb-2 font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
          <span>Est. 2016 · Ciudad de Guatemala</span>
          <span>Centroamérica y el Caribe</span>
        </RevealItem>
      </Reveal>
      <div className="relative grid h-[clamp(300px,40vw,560px)] grid-cols-5 gap-[3px]">
        {faces.map((t) => (
          <div key={t.id} className="relative overflow-hidden bg-[#140f1a]">
            <Image
              src={media(t.thumbnail)!.url!}
              alt=""
              fill
              priority
              sizes="20vw"
              className="object-cover object-[50%_18%] brightness-[.55] transition-[filter] duration-700 hover:brightness-100"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,8,16,.92)_0%,rgba(11,8,16,0)_50%)]" />
        <p className="pointer-events-none absolute bottom-[clamp(20px,3vw,40px)] left-5 font-display text-[clamp(28px,4.48vw,69px)] leading-[0.85] font-semibold tracking-[-0.055em] md:left-[4%]">
          Powered by <span className="text-accent-cycle">people.</span>
        </p>
      </div>
    </header>
  );
}

/* 2 · Purpose: Creatividad + Data + People = Conversación */
const terms = [
  { tag: "01 · Idea", word: "Creatividad", text: "Ideas que la audiencia quiere ver." },
  { tag: "02 · Contexto", word: "Data", text: "Decisiones con contexto, antes y después." },
  { tag: "03 · Talento", word: "People", text: "Personas reales hablando con personas reales." },
];
function Operator({ sign }: { sign: string }) {
  return (
    <RevealItem
      as="span"
      effect="scale"
      className="flex size-11 items-center justify-center rounded-full border border-[#2a2233] font-mono text-lg text-accent-cycle lg:mt-[30px]"
    >
      <span aria-hidden>{sign}</span>
    </RevealItem>
  );
}
export function Purpose() {
  return (
    <section id="proposito" className={`${wrap} flex flex-col gap-14 ${sectionY}`}>
      <Reveal className="grid items-end gap-[clamp(28px,5vw,72px)] lg:grid-cols-2">
        <div className="flex flex-col gap-[22px]">
          <Eyebrow>Nuestro propósito</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            Humanizar las marcas conectándolas con personas reales.
          </RevealItem>
        </div>
        <RevealItem as="p" className="max-w-[500px] text-[17px] leading-relaxed text-muted">
          No buscamos solo alcance. Diseñamos conversaciones que se sientan naturales, relevantes y medibles, con una propuesta de valor
          construida entre creatividad, ciencia y operación.
        </RevealItem>
      </Reveal>
      {/* Reads as an equation; stacks below lg. */}
      <Reveal
        stagger={0.12}
        className="grid items-start gap-5 border-t border-base-300 pt-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.25fr)] lg:gap-[clamp(16px,2vw,28px)]"
      >
        {terms.map((t, i) => [
          <RevealItem key={t.word} className="flex min-w-0 flex-col gap-3">
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#6f6880] uppercase">{t.tag}</span>
            <span className="font-display text-[clamp(28px,2.8vw,42px)] leading-none font-semibold tracking-[-0.045em]">{t.word}</span>
            <span className="text-[15px] leading-normal text-muted">{t.text}</span>
          </RevealItem>,
          <Operator key={`op${i}`} sign={i < 2 ? "+" : "="} />,
        ])}
        <RevealItem className="flex min-w-0 flex-col gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-accent-cycle uppercase">Resultado</span>
          <span className="font-display text-[clamp(28px,2.8vw,42px)] leading-none font-semibold tracking-[-0.045em] text-accent-cycle">Conversación</span>
          <span className="text-[15px] leading-normal text-[#d6d0de]">Lead the conversation.</span>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 3 · History. Years are placeholders until the client confirms them. */
const milestones = [
  { year: "2016", tag: "Lanzamiento", text: "Nacemos en Guatemala con un foco claro: influencer marketing, no como servicio secundario." },
  { year: "2019", tag: "Expansión", text: "Llevamos la operación a Centroamérica y el Caribe." },
  { year: "Hoy", tag: "Regional mindset", text: "+800 campañas en +8 países, con talento exclusivo y tecnología propia.", accent: true },
];
export function History() {
  return (
    <section id="historia" className="scroll-mt-24 border-y border-base-300 bg-base-200">
      <div className={`${wrap} flex flex-col gap-16 ${sectionY}`}>
        <Reveal className="flex max-w-[760px] flex-col gap-[22px]">
          <Eyebrow>Nuestra historia</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            De Guatemala a la región.
          </RevealItem>
        </Reveal>
        {/* Each milestone draws its line and lights its node, in turn. */}
        <Reveal as="ol" stagger={0.8} className="grid gap-y-10 md:grid-cols-3">
          {milestones.map((m) => (
            <RevealItem as="li" key={m.year} effect="fade" stagger={0.1} className="flex flex-col gap-5 pr-7 pb-2">
              <div className="relative mb-[18px] h-0.5 bg-[#2a2233]">
                <RevealItem effect="draw" className="absolute inset-0 origin-left bg-accent-cycle" />
                <RevealItem effect="scale" className="absolute -top-1.5 left-0 box-border size-3.5 rounded-full border-2 border-tint bg-accent-cycle" />
              </div>
              <RevealItem
                as="span"
                className={`font-display text-[clamp(43px,5.4vw,84px)] leading-[0.8] font-semibold tracking-[-0.06em] ${m.accent ? "text-accent-cycle" : ""}`}
              >
                {m.year}
              </RevealItem>
              <RevealItem as="span" className="font-mono text-xs tracking-[0.14em] text-accent-cycle uppercase">
                {m.tag}
              </RevealItem>
              <RevealItem as="p" className="max-w-[340px] leading-relaxed text-[#c9c2d2]">
                {m.text}
              </RevealItem>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* 4 · Regional presence */
export function Presence() {
  return (
    <section id="region" className={`${wrap} ${sectionY}`}>
      <Reveal>
        <RevealItem effect="fade">
          <RegionMap
            intro={
              <>
                <p className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">Presencia regional</p>
                <h2 className={titleClass}>Una sola operación para toda la región.</h2>
                <p className="leading-relaxed text-muted">
                  Coordinamos talento, contenido y medición en múltiples mercados desde nuestra oficina en Ciudad de Guatemala.
                </p>
              </>
            }
          />
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 5 · Team (hidden until there are members) */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
export function TeamList({ members }: { members: Team[] }) {
  if (members.length === 0) return null;
  return (
    <section id="equipo" className="scroll-mt-24 border-t border-base-300">
      <div className={`${wrap} flex flex-col gap-11 ${sectionY}`}>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[760px] flex-col gap-[22px]">
            <Eyebrow>Equipo</Eyebrow>
            <RevealItem as="h2" className={titleClass}>
              Las personas detrás de cada conversación.
            </RevealItem>
          </div>
          <RevealItem as="p" className="font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            {pad(members.length)} personas · Guatemala
          </RevealItem>
        </Reveal>
        <Reveal as="ul" stagger={0.06} className="flex flex-col border-t border-base-300">
          {members.map((m) => {
            const photo = media(m.photo);
            return (
              <RevealItem
                as="li"
                key={m.id}
                className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-6 gap-y-2 border-b border-base-300 py-[22px] transition-[background-color,padding] duration-300 hover:bg-[#151020] hover:px-4 md:grid-cols-[64px_minmax(0,1fr)_minmax(0,1.1fr)]"
              >
                {photo?.url ? (
                  <Image src={photo.url} alt="" width={56} height={56} className="size-14 rounded-full object-cover object-[50%_20%]" />
                ) : (
                  <span
                    aria-hidden
                    className="flex size-14 items-center justify-center rounded-full border border-tint/45 font-mono text-[13px] tracking-[0.06em] text-accent-cycle"
                  >
                    {initials(m.name)}
                  </span>
                )}
                <div className="flex min-w-0 flex-col gap-1.5">
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-[clamp(22px,2.4vw,32px)] leading-none font-medium tracking-[-0.03em] transition-colors hover:text-accent-cycle"
                    >
                      {m.name}
                    </a>
                  ) : (
                    <span className="font-display text-[clamp(22px,2.4vw,32px)] leading-none font-medium tracking-[-0.03em]">{m.name}</span>
                  )}
                  <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase">{m.role}</span>
                </div>
                {m.bio && <p className="text-[15px] leading-normal text-muted max-md:col-start-2">{m.bio}</p>}
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* 6 · How we think */
const principles = [
  { title: "Afinidad antes que alcance", text: "Una audiencia pequeña y afín mueve más conversación que una grande y dispersa." },
  { title: "Medir desde el día uno", text: "Proyectamos antes de activar y leemos durante y después." },
  { title: "Las comunidades se cuidan", text: "No se compran: se construyen con contenido honesto." },
  { title: "Socios, no proveedores", text: "Nos sentamos del lado de la marca y del creador a la vez." },
];
export function Principles() {
  return (
    <section id="principios" className="scroll-mt-24 border-t border-base-300 bg-base-200">
      <div className={`${wrap} flex flex-col gap-11 ${sectionY}`}>
        <Reveal className="flex max-w-[760px] flex-col gap-[22px]">
          <Eyebrow>Cómo pensamos</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            Cuatro ideas que guían cada campaña.
          </RevealItem>
        </Reveal>
        <Reveal as="ol" stagger={0.1} className="flex flex-col border-t border-[#2c2436]">
          {principles.map((p, i) => (
            <RevealItem
              as="li"
              key={p.title}
              className="grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 border-b border-base-300 py-[34px] md:grid-cols-[72px_minmax(0,1.6fr)_minmax(0,1fr)]"
            >
              <span className="font-mono text-[13px] text-accent-cycle">{pad(i + 1)}</span>
              <h3 className="text-[clamp(26px,3.04vw,46px)] leading-[0.95] font-semibold tracking-[-0.05em]">{p.title}</h3>
              <p className="leading-relaxed text-muted max-md:col-start-2">{p.text}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* 7 · Talent: roster size and a grid of rotating faces */
export function TalentShowcase({ talents }: { talents: Talent[] }) {
  const withPhoto = talents.filter((t) => media(t.thumbnail)?.url);
  return (
    <section id="talentos" className="grid scroll-mt-24 border-t border-base-300 lg:grid-cols-2">
      <Reveal className="flex flex-col justify-between gap-8 px-5 py-[clamp(3rem,6vw,5rem)] md:px-[4%]">
        <Eyebrow>Talentos exclusivos</Eyebrow>
        <RevealItem className="flex flex-wrap items-end gap-5">
          <span className="font-display text-[clamp(58px,8.4vw,120px)] leading-[0.8] font-semibold tracking-[-0.07em]">+{talents.length}</span>
          <span className="max-w-[280px] pb-2.5 font-display text-[clamp(20px,2vw,28px)] leading-[1.1] font-medium tracking-[-0.03em]">
            creadores representados y gestionados.
          </span>
        </RevealItem>
        <RevealItem as="p" className="max-w-[480px] text-[17px] leading-relaxed text-muted">
          Además de crear campañas, representamos talento: tú encuentras la voz correcta, ellos crean con respaldo.
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
      </Reveal>
      {withPhoto.length >= 6 && <TalentGrid talents={withPhoto} />}
    </section>
  );
}

/* 9 · Contact: short close that sends to /contacto */
export function AboutContact({ contact }: { contact: ContactInfo }) {
  const phone = contact.phone ? phoneLink(contact.phone) : null;
  const phoneIsExternal = phone?.href.startsWith("http");
  const rows = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    phone && { label: phoneIsExternal ? "WhatsApp" : "Teléfono", value: phone.label, href: phone.href, external: phoneIsExternal },
    contact.address && { label: "Oficina", value: contact.address },
  ].filter(Boolean) as { label: string; value: string; href?: string; external?: boolean }[];

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-base-300 bg-base-200">
      <Reveal className={`${wrap} grid items-end gap-[clamp(2rem,5vw,4.5rem)] ${sectionY} lg:grid-cols-2`}>
        <div className="flex flex-col gap-6">
          <Eyebrow>Contacto</Eyebrow>
          <RevealItem as="h2" className="text-[clamp(1.95rem,4.48vw,4.2rem)] leading-[0.88] font-semibold tracking-[-0.055em]">
            ¿Tienes alguna <span className="text-accent-cycle">duda?</span>
          </RevealItem>
          <RevealItem as="p" className="max-w-[440px] text-[17px] leading-relaxed text-muted">
            Escríbenos y te respondemos en menos de 48 horas hábiles.
          </RevealItem>
          <RevealItem>
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="inline-block rounded-full bg-base-content px-[26px] py-4 text-[15px] font-semibold text-base-100 transition-colors hover:bg-accent-cycle"
            >
              Ir a contacto
            </Link>
          </RevealItem>
        </div>
        <RevealItem as="ul" className="flex flex-col border-t border-[#2a2233] text-[17px]">
          {rows.map(({ label, value, href, external }) => {
            const body = (
              <>
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase">{label}</span>
                <span className="text-right whitespace-pre-line break-all">{value}</span>
              </>
            );
            return (
              <li key={label} className="border-b border-[#2a2233]">
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex justify-between gap-4 py-[18px] transition-colors hover:text-accent-cycle"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="flex justify-between gap-4 py-[18px]">{body}</div>
                )}
              </li>
            );
          })}
        </RevealItem>
      </Reveal>
    </section>
  );
}
