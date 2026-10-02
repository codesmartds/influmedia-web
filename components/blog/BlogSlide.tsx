import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { Post } from "@/payload-types";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { FeaturedPost, PostCard } from "./PostCard";

const pageHref = (page: number) => (page <= 1 ? "/blog" : `/blog?page=${page}`);
const arrowClass =
  "inline-flex items-center gap-2 rounded-full border border-base-300 px-5 py-2.5 text-sm font-bold uppercase transition-colors hover:border-secondary hover:text-secondary";

export function BlogSlide({
  featured,
  posts,
  page,
  totalPages,
}: {
  featured: Post | null;
  posts: Post[];
  page: number;
  totalPages: number;
}) {
  return (
    <>
      <section className="mx-auto w-full max-w-[96rem] px-6 pb-10 pt-16 md:px-[4.7%] md:pt-24">
        <Reveal>
          <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
            Blog
          </RevealItem>
          <RevealItem as="h1" className="mt-4 max-w-[18ch] text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[1.02]">
            Lo que estamos conversando.
          </RevealItem>
          <RevealItem as="p" className="mt-6 max-w-[52ch] text-lg leading-snug text-base-content/80 md:text-xl">
            Ideas, aprendizajes y tendencias desde adentro del influencer marketing.
          </RevealItem>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[96rem] px-6 pb-24 md:px-[4.7%]">
        {/* key: re-run the entrance when the page changes */}
        <Reveal key={page}>
          {featured && (
            <RevealItem effect="scale" className="mb-12">
              <FeaturedPost post={featured} />
            </RevealItem>
          )}
          {posts.length > 0 ? (
            <RevealItem as="ul" effect="fade" stagger={0.06} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <RevealItem as="li" key={post.id}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealItem>
          ) : (
            !featured && (
              <RevealItem as="p" className="text-base-content/60">
                Aún no hay artículos publicados.
              </RevealItem>
            )
          )}
        </Reveal>

        {totalPages > 1 && (
          <nav aria-label="Paginación del blog" className="mt-14 flex items-center justify-between gap-4 border-t border-white/10 pt-8">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} transitionTypes={["nav-back"]} className={arrowClass}>
                <FiArrowLeft aria-hidden /> Anterior
              </Link>
            ) : (
              <span />
            )}
            <ol className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <Link
                    href={pageHref(n)}
                    aria-current={n === page ? "page" : undefined}
                    transitionTypes={[n < page ? "nav-back" : "nav-forward"]}
                    className="flex size-10 items-center justify-center rounded-full text-sm font-bold tabular-nums text-base-content/55 transition-colors hover:text-base-content aria-[current=page]:bg-primary aria-[current=page]:text-primary-content"
                  >
                    {n}
                  </Link>
                </li>
              ))}
            </ol>
            {page < totalPages ? (
              <Link href={pageHref(page + 1)} transitionTypes={["nav-forward"]} className={arrowClass}>
                Siguiente <FiArrowRight aria-hidden />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </section>
    </>
  );
}
