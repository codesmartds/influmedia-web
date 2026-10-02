import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import type { Brand, CaseStudy, Media, Post, Talent, Testimonial } from "@/payload-types";
import { PostCard } from "@/components/blog/PostCard";
import { CountUp } from "@/components/slides/CountUp";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { AudienceDashboard } from "@/components/dashboards/AudienceDashboard";

// Building blocks of the home page, in reading order: brands first
// (proof → problem → method), then the talent side, then closing.

const wrap = "mx-auto w-full max-w-[96rem] px-6 md:px-[4.7%]";
const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);

function Heading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <>
      <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
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
        variant === "primary" ? "btn-primary border-0" : "btn-outline border-white/30 hover:border-secondary hover:bg-transparent hover:text-secondary"
      }`}
    >
      {children} <FiArrowRight aria-hidden />
    </Link>
  );
}

/* 2 · Client logos, scrolling */
export function ClientMarquee({ brands }: { brands: NonNullable<Brand["items"]> }) {
  const logos = brands.flatMap((b) => (media(b.image)?.url ? [{ name: b.name, url: media(b.image)!.url! }] : []));
  if (logos.length === 0) return null;
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-4 pr-4">
      {logos.map((l) => (
        <li key={l.name} className="relative h-16 w-36 shrink-0 rounded-xl bg-white">
          <Image src={l.url} alt={hidden ? "" : l.name} fill sizes="144px" className="object-contain p-3" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Marcas que confían en nosotros" className="border-y border-white/5 py-8">
      <p className={`${wrap} mb-5 text-center text-xs font-bold uppercase tracking-wider text-base-content/50`}>
        Marcas que ya entraron a la conversación
      </p>
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
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
  { value: 800, suffix: "", label: "Campañas" },
  { value: 100, suffix: "M", label: "Impresiones en la región" },
  { value: 8, suffix: "", label: "Países" },
  { value: 500, suffix: "", label: "Creadores contratados" },
];
export function Stats() {
  return (
    <section className={`${wrap} py-16`}>
      <Reveal as="ul" className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <RevealItem as="li" key={s.label} className="border-l-2 border-primary pl-5">
            <span className="block text-[clamp(2.4rem,4vw,4rem)] font-bold leading-none tabular-nums">
              <CountUp value={s.value} prefix="+" suffix={s.suffix} delay={0.1 * i} />
            </span>
            <span className="mt-2 block text-sm font-bold uppercase text-base-content/60">{s.label}</span>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

/* 4 · The brand's problem */
const pains = [
  { title: "Seguidores que no son personas", text: "Detectamos audiencias infladas y actividad sospechosa antes de que inviertas." },
  { title: "Campañas sin control", text: "Calendario, publicaciones y alertas monitoreadas en tiempo real." },
  { title: "Resultados que no se leen", text: "Reportes en 48 horas con CPE, ROI e insights para decidir la próxima." },
  { title: "Diez proveedores, diez facturas", text: "Negociamos con cada creador y consolidamos todo en un solo punto." },
];
export function BrandProblem() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Para marcas" title="Menos fricción. Más control. Mejor lectura.">
          El influencer marketing funciona cuando la idea, el talento y la medición se encuentran. Nosotros nos encargamos de
          que pase.
        </Heading>
        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p) => (
            <RevealItem as="li" key={p.title} className="rounded-2xl border border-base-300 bg-base-200 p-6">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-2 leading-snug text-base-content/70">{p.text}</p>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 5 · Method, with a live dashboard as the hook */
const steps = [
  { name: "Planning", text: "Análisis de perfiles, afinidad y proyección en 24–48 h." },
  { name: "Onway", text: "Monitoreo en vivo, calendario y alertas." },
  { name: "Postbuy", text: "Reporte con lectura e insights en 48 h." },
];
export function Method() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Heading eyebrow="Cómo trabajamos" title="Una campaña, tres momentos." />
          <RevealItem as="ol" effect="fade" stagger className="mt-8 flex flex-col gap-5">
            {steps.map((s, i) => (
              <RevealItem as="li" effect="left" key={s.name} className="flex gap-5">
                <span className="text-2xl font-bold text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <b className="block text-xl uppercase">{s.name}</b>
                  <span className="text-base-content/70">{s.text}</span>
                </span>
              </RevealItem>
            ))}
          </RevealItem>
          <RevealItem className="mt-8">
            <CtaLink href="/influencer-marketing#sistema">Conoce el proceso</CtaLink>
          </RevealItem>
        </div>
        <RevealItem effect="scale">
          <AudienceDashboard />
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 6 · Featured case studies (hidden until there are some) */
export function CaseStudies({ cases }: { cases: CaseStudy[] }) {
  if (cases.length === 0) return null;
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Casos de éxito" title="Conversaciones que movieron resultados." />
        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => {
            const cover = media(c.cover);
            return (
              <RevealItem as="li" key={c.id} className="flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200">
                {cover?.url && (
                  <div className="relative aspect-[16/10]">
                    <Image src={cover.url} alt={cover.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase text-secondary">{c.brandName}</p>
                  <h3 className="mt-2 text-xl font-bold leading-snug">{c.title}</h3>
                  <p className="mt-2 text-base-content/70">{c.objective}</p>
                  <dl className="mt-auto grid grid-cols-2 gap-4 pt-6">
                    {(c.results ?? []).slice(0, 2).map((r) => (
                      <div key={r.id}>
                        <dt className="text-xs uppercase text-base-content/60">{r.label}</dt>
                        <dd className="text-2xl font-bold">{r.name}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </RevealItem>
            );
          })}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 7 · Talent roster: the hinge between brands and creators */
export function Roster({ talents }: { talents: Talent[] }) {
  const shown = talents.filter((t) => media(t.thumbnail)?.url).slice(0, 8);
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Talentos exclusivos" title="+30 creadores que tu audiencia ya sigue.">
          Lifestyle, comedia, moda, entretenimiento, fitness, deporte, gaming, tech y automotriz.
        </Heading>
        <RevealItem as="ul" effect="fade" stagger={0.05} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {shown.map((t) => {
            const category = t.category && typeof t.category === "object" ? t.category : null;
            return (
              <RevealItem as="li" effect="scale" key={t.id} className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={media(t.thumbnail)!.url!}
                  alt={t.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12">
                  <p className="font-bold">{t.name}</p>
                  {category && (
                    <p className="text-xs font-bold uppercase" style={{ color: category.color }}>
                      {category.name}
                    </p>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealItem>
        <RevealItem className="mt-10 flex flex-wrap gap-4">
          <CtaLink href="/nosotros#talentos">Ver talentos</CtaLink>
          <CtaLink href="/creadores" variant="ghost">
            Únete al roster
          </CtaLink>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 8 · For creators */
const perks = [
  { title: "Marcas líderes", text: "Campañas con marcas de consumo, belleza y retail en toda la región." },
  { title: "Nosotros negociamos", text: "Contratos, tarifas y calendario resueltos: tú te enfocas en crear." },
  { title: "Exclusividad por categoría", text: "Tu valor protegido frente a la competencia de tu categoría." },
  { title: "Datos para crecer", text: "Reportes de cada campaña para entender qué funciona con tu audiencia." },
];
export function ForCreators() {
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal className="rounded-3xl border border-base-300 bg-base-200 p-8 md:p-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <Heading eyebrow="Para creadores" title="Crea con las marcas que mueven la región." />
            <RevealItem className="mt-8">
              <CtaLink href="/creadores">Aplica al roster</CtaLink>
            </RevealItem>
          </div>
          <RevealItem as="ul" effect="fade" stagger className="grid gap-5 sm:grid-cols-2">
            {perks.map((p) => (
              <RevealItem as="li" key={p.title}>
                <h3 className="font-bold uppercase text-secondary">{p.title}</h3>
                <p className="mt-1 text-base-content/75">{p.text}</p>
              </RevealItem>
            ))}
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}

/* 9 · Testimonials (hidden until there are some) */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <Heading eyebrow="Testimonios" title="Lo que dicen marcas y creadores." />
        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => {
            const talent = t.talent && typeof t.talent === "object" ? t.talent : null;
            const photo = media(t.photo) ?? media(talent?.thumbnail);
            return (
              <RevealItem as="li" key={t.id} className="flex flex-col rounded-2xl border border-base-300 bg-base-200 p-7">
                <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                <div className="mt-6 flex items-center gap-3">
                  {photo?.url && (
                    <Image src={photo.url} alt="" width={44} height={44} className="size-11 rounded-full object-cover object-top" />
                  )}
                  <p className="text-sm">
                    <b className="block">{t.author}</b>
                    <span className="text-base-content/60">
                      {[t.role, t.type === "brand" ? t.company : "Creador Influmedia"].filter(Boolean).join(" · ")}
                    </span>
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 10 · Latest posts */
export function LatestPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  return (
    <section className={`${wrap} py-20 md:py-28`}>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Heading eyebrow="Blog" title="Lo que estamos conversando." />
          </div>
          <RevealItem>
            <CtaLink href="/blog" variant="ghost">
              Ir al blog
            </CtaLink>
          </RevealItem>
        </div>
        <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <RevealItem as="li" key={p.id}>
              <PostCard post={p} />
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* 11 · Two-way closing */
export function DualCta() {
  return (
    <section className={`${wrap} py-16`}>
      <Reveal className="grid gap-5 md:grid-cols-2">
        <RevealItem className="flex flex-col items-start gap-5 rounded-3xl bg-primary p-10 text-primary-content">
          <h2 className="text-3xl font-bold leading-tight">¿Tienes una marca?</h2>
          <p className="text-primary-content/85">Hablemos de tu próxima campaña.</p>
          <Link href="#contacto" className="btn h-auto rounded-lg border-0 bg-white px-7 py-3.5 uppercase text-[#14102b] hover:bg-white/90">
            Hablemos <FiArrowRight aria-hidden />
          </Link>
        </RevealItem>
        <RevealItem className="flex flex-col items-start gap-5 rounded-3xl border border-base-300 bg-base-200 p-10">
          <h2 className="text-3xl font-bold leading-tight">¿Eres creador?</h2>
          <p className="text-base-content/75">Únete a un roster con marcas que mueven la región.</p>
          <CtaLink href="/creadores">Aplica al roster</CtaLink>
        </RevealItem>
      </Reveal>
    </section>
  );
}
