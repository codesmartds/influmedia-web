import Image from "next/image";
import Link from "next/link";
import type { Media, Post } from "@/payload-types";
import type { Filter } from "@/components/layout/FilterPicker";
import { NewsletterBar } from "@/components/newsletter/NewsletterBar";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { POSTS_PER_PAGE, topicLabel, type TopicValue } from "./format";
import { Byline, PostCard, PostMeta } from "./PostCard";
import { TopicFilter } from "./TopicFilter";

// /blog: hero, the newest post featured, a topic filter, the paginated grid,
// newsletter and a closing call to action.

const wrap = "mx-auto w-full max-w-[96rem] px-5 md:px-[4%]";
const pad = (n: number) => String(n).padStart(2, "0");

function pageHref(page: number, topic: TopicValue | null) {
  const params = new URLSearchParams();
  if (topic) params.set("tema", topic);
  if (page > 1) params.set("page", String(page));
  const q = params.toString();
  return q ? `/blog?${q}` : "/blog";
}

function Featured({ post }: { post: Post }) {
  const cover = typeof post.cover === "object" ? (post.cover as Media) : null;
  const topic = topicLabel(post.topic);
  return (
    <section aria-label="Artículo destacado" className="grid border-y border-base-300 lg:grid-cols-2">
      <Link href={`/blog/${post.slug}`} transitionTypes={["nav-forward"]} className="group relative block min-h-[clamp(320px,38vw,560px)] overflow-hidden bg-[#140f1a]">
        {cover?.url && (
          <Image
            src={cover.url}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[50%_25%] brightness-[.72] transition-[filter,transform] duration-[1.4s] group-hover:scale-[1.03] group-hover:brightness-95"
          />
        )}
        <span className="absolute top-[clamp(20px,3vw,32px)] left-[clamp(20px,3vw,32px)] rounded-full bg-base-content px-3 py-[7px] font-mono text-[10.5px] tracking-[0.12em] text-base-100">
          NUEVO
        </span>
      </Link>
      <Reveal className="flex flex-col justify-between gap-8 bg-base-200 px-5 py-[clamp(2rem,5vw,4rem)] md:px-[4%]">
        <RevealItem as="p" className="font-mono text-xs tracking-[0.16em] text-secondary uppercase">
          Destacado{topic ? ` · ${topic}` : ""}
        </RevealItem>
        <div className="flex flex-col gap-5">
          <RevealItem>
            <PostMeta post={{ ...post, topic: null }} className="text-[#8e86a0]" />
          </RevealItem>
          <RevealItem as="h2" className="text-[clamp(2.2rem,4.4vw,4.2rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-balance">
            {post.title}
          </RevealItem>
          <RevealItem as="p" className="max-w-[480px] text-[17px] leading-relaxed text-muted">
            {post.excerpt}
          </RevealItem>
        </div>
        <RevealItem className="flex flex-wrap items-center justify-between gap-5">
          {post.author && <Byline author={post.author} size="lg" />}
          <Link
            href={`/blog/${post.slug}`}
            transitionTypes={["nav-forward"]}
            className="rounded-full bg-base-content px-6 py-[15px] text-sm font-semibold text-base-100 transition-colors hover:bg-secondary"
          >
            Leer artículo
          </Link>
        </RevealItem>
      </Reveal>
    </section>
  );
}

export function BlogIndex({
  featured,
  posts,
  page,
  totalPages,
  total,
  topic,
  filters,
}: {
  featured: Post | null;
  posts: Post[];
  page: number;
  totalPages: number;
  total: number;
  topic: TopicValue | null;
  filters: Filter<TopicValue>[];
}) {
  const shown = posts.length + (featured ? 1 : 0);
  const listed = filters.find((f) => f.id === topic)?.count ?? total;

  return (
    <>
      <Reveal className={`${wrap} grid items-end gap-[clamp(28px,4vw,56px)] pt-[clamp(3rem,7vw,6rem)] pb-[clamp(2.25rem,4vw,3.5rem)] lg:grid-cols-3`}>
        <div className="flex min-w-0 flex-col gap-[26px] lg:col-span-2">
          <RevealItem as="p" className="flex gap-2.5 font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            <Link href="/" transitionTypes={["nav-back"]} className="transition-colors hover:text-base-content">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <span className="text-secondary">Blog</span>
          </RevealItem>
          <RevealItem as="h1" className="text-[clamp(2.1rem,5.4vw,5.1rem)] leading-[0.86] font-semibold tracking-[-0.055em] text-balance">
            Ideas para liderar <span className="text-secondary">la conversación.</span>
          </RevealItem>
        </div>
        <div className="flex flex-col gap-3.5 pb-2">
          <RevealItem as="p" className="text-[17px] leading-relaxed text-[#c9c2d2]">
            Estrategia, datos y creatividad para conectar marcas con personas reales. Escrito por el equipo y el roster Influmedia.
          </RevealItem>
          <RevealItem as="p" className="font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
            {pad(total)} artículos · {pad(filters.length - 1)} temas
          </RevealItem>
        </div>
      </Reveal>

      {featured && <Featured post={featured} />}

      {/* Filter bar, pinned under the site header */}
      <div className="sticky top-[4.5rem] z-20 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
        <div className={`${wrap} flex items-center justify-between gap-4 py-3`}>
          <p className="font-mono text-[11px] tracking-[0.14em] text-[#8e86a0] uppercase">
            {topic ? topicLabel(topic) : "Todos los artículos"} · {pad(listed)}
          </p>
          <TopicFilter filters={filters} active={topic} />
        </div>
      </div>

      <section id="articulos" className={`${wrap} scroll-mt-36 pt-[clamp(28px,3vw,40px)] pb-[clamp(4.5rem,9vw,7.5rem)]`}>
        {shown === 0 ? (
          <p className="text-muted">Aún no hay artículos publicados.</p>
        ) : (
          // key: re-run the entrance when the page or topic changes
          <Reveal key={`${topic}-${page}`} as="ul" stagger={0.06} className="grid gap-x-[3px] gap-y-[clamp(28px,3vw,40px)] md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, i) => (
              <RevealItem as="li" key={post.id}>
                <PostCard post={post} n={(page - 1) * POSTS_PER_PAGE + i + 1} />
              </RevealItem>
            ))}
          </Reveal>
        )}

        {totalPages > 1 && (
          <nav aria-label="Paginación" className="flex justify-center gap-2 pt-14 font-mono text-xs tracking-[0.1em]">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
              n === page ? (
                <span key={n} aria-current="page" className="flex size-11 items-center justify-center rounded-full bg-base-content text-base-100">
                  {pad(n)}
                </span>
              ) : (
                <Link
                  key={n}
                  href={pageHref(n, topic)}
                  transitionTypes={[n < page ? "nav-back" : "nav-forward"]}
                  className="flex size-11 items-center justify-center rounded-full border border-[#2a2233] text-[#a39bae] transition-colors hover:border-base-content hover:text-base-content"
                >
                  {pad(n)}
                </Link>
              ),
            )}
            {page < totalPages && (
              <Link
                href={pageHref(page + 1, topic)}
                transitionTypes={["nav-forward"]}
                className="flex h-11 items-center rounded-full border border-[#2a2233] px-5 text-[#a39bae] transition-colors hover:border-base-content hover:text-base-content"
              >
                SIGUIENTE →
              </Link>
            )}
          </nav>
        )}
      </section>

      <NewsletterBar />

      <section className="border-t border-base-300">
        <Reveal className={`${wrap} flex flex-wrap items-end justify-between gap-8 py-[clamp(4.5rem,9vw,7.5rem)]`}>
          <RevealItem as="h2" className="max-w-[900px] text-[clamp(2rem,4.4vw,4.2rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
            ¿Listo para llevar estas ideas <span className="text-secondary">a tu marca?</span>
          </RevealItem>
          <RevealItem>
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="inline-block rounded-full bg-base-content px-[26px] py-4 text-[15px] font-semibold text-base-100 transition-colors hover:bg-secondary"
            >
              Contáctanos
            </Link>
          </RevealItem>
        </Reveal>
      </section>
    </>
  );
}
