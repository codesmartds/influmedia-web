import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import type { Brand, CaseStudy, Media, Post, Talent } from "@/payload-types";
import { formatPostDate, readingMinutes } from "@/components/blog/format";
import { PostList, type PostRow } from "@/components/home/PostList";
import { CaseSlider } from "@/components/cases/CaseSlider";
import { CountUp } from "@/components/slides/CountUp";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { MethodStages } from "@/components/home/MethodStages";
import sceneDrink from "@/public/images/home/scene-drink.jpg";

// Building blocks of the home page, in reading order: brands first
// (proof → problem → method), then the talent side, then closing.

const wrap = "mx-auto w-full max-w-[96rem] px-6 md:px-[4.7%]";
const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);

// Redesign type: mono eyebrow in lilac, display title.
export const titleClass = "text-[clamp(1.75rem,3.64vw,3.1rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-balance";
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <RevealItem as="p" className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">
      {children}
    </RevealItem>
  );
}
function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      className="border-b border-tint/60 pb-1 text-[15px] text-[#d6d0de] transition-colors hover:text-base-content"
    >
      {children}
    </Link>
  );
}

function Heading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <>
      <RevealItem as="p" className="text-sm font-bold uppercase text-accent-cycle md:text-base">
        {eyebrow}
      </RevealItem>
      <RevealItem as="h2" className="mt-3 max-w-[24ch] text-[clamp(2rem,3.4vw,3.6rem)] font-bold leading-tight">
        {title}
      </RevealItem>
      {children && (
        <RevealItem as="p" className="mt-4 max-w-[56ch] text-lg text-base-content/75">
          {children}
        </RevealItem>
      )}
    </>
  );
}

function CtaLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      className={`btn h-auto rounded-lg px-7 py-3.5 uppercase ${
        variant === "primary" ? "btn-primary border-0" : "btn-outline border-white/30 hover:border-tint hover:bg-transparent hover:text-accent-cycle"
      }`}
    >
      {children} <FiArrowRight aria-hidden />
    </Link>
  );
}

export { CtaLink, Heading };

/* 2 · Client logos, scrolling */
export function ClientMarquee({ brands }: { brands: NonNullable<Brand["items"]> }) {
  const logos = brands.flatMap((b) => {
    const m = media(b.image);
    return m?.url ? [{ name: b.name, url: m.url, width: m.width ?? 160, height: m.height ?? 60 }] : [];
  });
  if (logos.length === 0) return null;
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-11 pr-11">
      {logos.map((l) => (
        <li key={l.name} className="shrink-0">
          {/* Logos come in mixed colors; render them all as flat white at the same height. */}
          <Image
            src={l.url}
            alt={hidden ? "" : l.name}
            width={l.width}
            height={l.height}
            sizes="(min-width: 768px) 224px, 160px"
            className="h-12 w-auto max-w-40 object-contain opacity-80 brightness-0 invert md:h-16 md:max-w-56"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Marcas que confían en nosotros" className="flex flex-col gap-6 border-b border-base-300 py-9 sm:flex-row sm:items-center sm:gap-8 sm:pl-5 md:gap-12 md:pl-[4%]">
      {/* The label stays put while the logos loop past it. */}
      <p className="shrink-0 px-5 font-mono text-[0.7rem] tracking-[0.14em] text-[#8e86a0] uppercase sm:px-0">Confían en nosotros</p>
      <div className="flex w-full min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex animate-[marquee_45s_linear_infinite] motion-reduce:animate-none hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

/* 3 · Stats */
const stats = [
  { value: 800, suffix: "+", label: "Campañas" },
  { value: 100, suffix: "M+", label: "Impresiones" },
  { value: 8, suffix: "", label: "Países" },
  { value: 500, suffix: "+", label: "Creadores contratados" },
];
export function Stats() {
  return (
    <section aria-label="Cifras">
      <Reveal as="ul" className="grid grid-cols-2 border-y border-base-300 lg:grid-cols-4">
        {stats.map((s, i) => (
          <RevealItem
            as="li"
            key={s.label}
            className="flex flex-col gap-2.5 border-base-300 px-5 py-8 not-last:border-r max-lg:nth-2:border-r-0 max-lg:nth-[-n+2]:border-b md:px-[4%]"
          >
            <span className="font-mono text-[0.7rem] tracking-[0.14em] text-[#8e86a0] uppercase">{s.label}</span>
            <span className="font-display text-[clamp(2rem,3.8vw,3.1rem)] leading-[0.9] font-medium tracking-[-0.05em] tabular-nums">
              <CountUp value={s.value} suffix={s.suffix} delay={0.1 * i} />
            </span>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

/* 4 · What we do: integration, not ads */
const integration = ["Escena real", "Producto en uso", "Audiencia medida"];
export function WhatWeDo() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal className="grid items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Eyebrow>Qué hacemos</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            No publicamos anuncios. Integramos productos.
          </RevealItem>
          <RevealItem as="p" className="max-w-[520px] text-[17px] leading-relaxed text-muted">
            El corredor no habla de la bebida: la toma al cruzar la meta. Tu producto aparece dentro de una historia que el creador ya
            cuenta, y la audiencia lo consume como contenido, no como publicidad.
          </RevealItem>
          <RevealItem as="ol" className="mt-2 grid grid-cols-3 gap-px border border-base-300 bg-base-300">
            {integration.map((label, i) => (
              <li key={label} className="flex flex-col gap-1.5 bg-base-100 p-[18px]">
                <span className="font-mono text-[11px] text-accent-cycle">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[17px] font-medium">{label}</span>
              </li>
            ))}
          </RevealItem>
        </div>
        <RevealItem effect="scale" className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={sceneDrink}
            alt="Corredor bebiendo agua al cruzar la meta"
            fill
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[45%_40%] brightness-[.92] contrast-[1.05] saturate-[.85]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,8,16,.55),rgba(11,8,16,0)_45%)]" />
          <span className="absolute bottom-4 left-4 bg-base-100/75 px-2.5 py-[7px] font-mono text-[11px] tracking-[0.12em]">
            ESC. 04 · AGUA MINERAL · CARRERA 10K
          </span>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 5 · Influencer marketing 360°: the five steps, drawn in sequence */
const steps360 = [
  { name: "Personas", text: "Entendemos a quién le habla la marca: su audiencia, su contexto y el momento.", tag: "Audiencia · Contexto" },
  { name: "KPI’s", text: "Definimos objetivos medibles antes de elegir a cualquier creador.", tag: "Objetivo · Métrica" },
  { name: "Influencers", text: "Seleccionamos talento por afinidad, autenticidad y audiencia real.", tag: "Afinidad · Autenticidad" },
  { name: "Contenido", text: "Integramos el producto en historias que el creador ya cuenta.", tag: "Integración · Formato" },
  { name: "Resultados", text: "Medimos, reportamos y convertimos los datos en la siguiente decisión.", tag: "Reporte · Insight" },
];
export function InfluencerMarketing360() {
  return (
    <section id="influencer-marketing" className={`${wrap} flex scroll-mt-24 flex-col gap-14 pt-6 pb-20 md:pb-28`}>
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[760px] flex-col gap-[18px]">
          <Eyebrow>Influencer marketing 360°</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            De la persona al resultado.
          </RevealItem>
          <RevealItem as="p" className="max-w-[520px] text-[17px] leading-relaxed text-muted">
            Cinco pasos que ordenan cada campaña, del primer brief al reporte final.
          </RevealItem>
        </div>
        <RevealItem>
          <TextLink href="/influencer-marketing">Conoce el servicio</TextLink>
        </RevealItem>
      </Reveal>

      {/* Each step draws its line and lights its node, one after another. */}
      <Reveal as="ol" stagger={0.55} className="grid lg:grid-cols-5">
        {steps360.map((s, i) => (
          <RevealItem as="li" key={s.name} effect="fade" stagger={0.08} className="relative flex flex-col gap-[18px] pb-10 pl-9 lg:pr-6 lg:pb-7 lg:pl-0">
            {/* Below lg: a vertical rail down the left, node at the top. */}
            <div className="absolute top-2 bottom-0 left-1.5 w-0.5 bg-[#2a2233] lg:hidden">
              <RevealItem effect="drawY" className="absolute inset-0 origin-top bg-accent-cycle" />
            </div>
            <RevealItem effect="scale" className="absolute top-0.5 left-0 box-border size-3.5 rounded-full border-2 border-tint bg-accent-cycle lg:hidden" />
            {/* From lg: the horizontal track. */}
            <div className="relative mb-2.5 hidden h-0.5 bg-[#2a2233] lg:block">
              <RevealItem effect="draw" className="absolute inset-0 origin-left bg-accent-cycle" />
              <RevealItem
                effect="scale"
                className="absolute -top-1.5 left-0 box-border size-3.5 rounded-full border-2 border-tint bg-accent-cycle shadow-[0_0_14px_color-mix(in_srgb,var(--acc-tint)_70%,transparent)]"
              />
            </div>
            <RevealItem as="span" className="font-mono text-xs tracking-[0.12em] text-[#8e86a0]">
              PASO {String(i + 1).padStart(2, "0")}
            </RevealItem>
            <RevealItem as="span" className="font-display text-[clamp(26px,2.52vw,35px)] leading-none font-medium tracking-[-0.04em]">
              {s.name}
            </RevealItem>
            <RevealItem as="span" className="text-[15px] leading-relaxed text-muted">
              {s.text}
            </RevealItem>
            <RevealItem as="span" className="mt-auto font-mono text-[11px] tracking-[0.12em] text-accent-cycle uppercase">
              {s.tag}
            </RevealItem>
          </RevealItem>
        ))}
      </Reveal>

      <Reveal className="flex flex-wrap items-center justify-between gap-5 border-t border-base-300 pt-7">
        <RevealItem as="p" className="font-display text-[clamp(22px,2.2vw,30px)] font-medium tracking-[-0.03em]">
          Todo empieza con un objetivo claro.
        </RevealItem>
        <RevealItem>
          <Link href="#contacto" className="btn btn-primary h-auto rounded-full border-0 px-[22px] py-3.5 text-sm font-semibold hover:bg-accent-cycle">
            Cuéntanos el tuyo
          </Link>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 6 · Method: Planning, Onway, Postbuy, each with an animated demo panel */
export function Method({ talents }: { talents: Talent[] }) {
  return (
    <section id="metodo" className="scroll-mt-24 border-y border-base-300 bg-base-200">
      <div className={`${wrap} flex flex-col gap-12 py-20 md:py-28`}>
        <Reveal className="grid items-end gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-[18px]">
            <Eyebrow>Método</Eyebrow>
            <RevealItem as="h2" className={titleClass}>
              Una campaña, tres momentos.
            </RevealItem>
          </div>
          <RevealItem as="p" className="max-w-[480px] text-[17px] leading-relaxed text-muted">
            Proyectamos antes de activar, corregimos mientras corre y cerramos con un reporte que tu casa matriz puede leer.
          </RevealItem>
        </Reveal>
        <Reveal>
          <RevealItem effect="fade" className="flex flex-col gap-12">
            <MethodStages talents={talents} />
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

/* 7 · Featured case studies (hidden until there are some) */
export function CaseStudies({ cases }: { cases: CaseStudy[] }) {
  if (cases.length === 0) return null;
  return <CaseSlider cases={cases} />;
}

/* 8 · Talent network (home): exclusive and free-agent talent, one media plan */
const talentKinds = [
  {
    title: "Talento exclusivo",
    text: "Creadores que filman solo para marcas de Influmedia. Disponibilidad asegurada y una relación construida campaña tras campaña.",
  },
  {
    title: "Talento sin límites",
    text: "Creadores que trabajan con nuestros clientes y también de forma independiente. Sumamos su voz cuando es la indicada para el objetivo.",
  },
];
export function TalentNetwork({ talents }: { talents: Talent[] }) {
  const faces = talents.filter((t) => media(t.thumbnail)?.url).slice(0, 4);
  return (
    <section id="talento" className="scroll-mt-24 border-t border-base-300">
      <Reveal className={`${wrap} grid gap-[clamp(2rem,5vw,4.5rem)] py-20 md:py-28 lg:grid-cols-2`}>
        <div className="flex flex-col gap-[22px]">
          <Eyebrow>Red de talento</Eyebrow>
          <RevealItem as="h2" className={titleClass}>
            Dos tipos de talento. Un solo plan de medios.
          </RevealItem>
          <RevealItem as="p" className="max-w-[460px] text-[17px] leading-relaxed text-muted">
            Elegimos al creador que la campaña necesita, sea exclusivo de Influmedia o agente libre. Lo que importa es llegar al objetivo,
            siempre con audiencia verificada.
          </RevealItem>
          <RevealItem className="mt-2 flex items-center gap-4">
            {faces.length > 0 && (
              <div className="flex">
                {faces.map((t, i) => (
                  <Image
                    key={t.id}
                    src={media(t.thumbnail)!.url!}
                    alt={t.name}
                    width={48}
                    height={48}
                    className={`size-12 rounded-full border-2 border-base-100 object-cover object-[50%_20%] ${i > 0 ? "-ml-3" : ""}`}
                  />
                ))}
              </div>
            )}
            <TextLink href="/creadores">Conoce la red</TextLink>
          </RevealItem>
        </div>

        <div className="flex flex-col">
          <RevealItem as="ul" effect="fade" stagger className="flex flex-col border-t border-base-300">
            {talentKinds.map((k, i) => (
              <RevealItem
                as="li"
                key={k.title}
                className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-5 border-b border-base-300 py-[30px] transition-[background-color,padding] duration-300 hover:bg-[#151020] hover:px-5"
              >
                <span className="font-mono text-[13px] text-accent-cycle">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[clamp(24px,2.4vw,32px)] font-medium tracking-[-0.03em]">{k.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{k.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealItem>
          {/* The point of the section: talent is the means, the objective is the end. */}
          <RevealItem as="p" className="mt-8 font-display text-[clamp(20px,2vw,26px)] leading-snug font-medium tracking-[-0.03em]">
            Interno o independiente, el talento es el medio. <span className="text-accent-cycle">El resultado es el fin.</span>
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}

/* 9 · Latest posts */
export function LatestPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const rows: PostRow[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: formatPostDate(p.publishedAt),
    read: `${readingMinutes(p.content)} min`,
    cover: media(p.cover)?.url,
  }));
  return (
    <section id="blog" className="scroll-mt-24 border-t border-base-300">
      <Reveal className={`${wrap} flex flex-col gap-10 py-20 md:py-28`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[760px] flex-col gap-[18px]">
            <Eyebrow>Blog</Eyebrow>
            <RevealItem as="h2" className={titleClass}>
              Casos y eventos, contados desde adentro.
            </RevealItem>
          </div>
          <RevealItem>
            <TextLink href="/blog">Todos los artículos</TextLink>
          </RevealItem>
        </div>
        <RevealItem effect="fade">
          <PostList posts={rows} />
        </RevealItem>
      </Reveal>
    </section>
  );
}
