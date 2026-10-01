import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { Post } from "@/payload-types";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { PostCard } from "./PostCard";

const pageLinkClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-base-300 px-5 py-2.5 text-sm font-bold uppercase transition-colors hover:border-secondary hover:text-secondary";

const pageHref = (page: number) => (page <= 1 ? "/blog" : `/blog?page=${page}`);

export function BlogSlide({ posts, page, totalPages }: { posts: Post[]; page: number; totalPages: number }) {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Lo que estamos conversando.">
        Ideas, aprendizajes y tendencias desde adentro del influencer marketing.
      </PageHeader>

      <section className="mx-auto w-full max-w-[96rem] px-6 pb-20 pt-8 md:px-[4.7%]">
        {/* key: re-run the entrance when the page changes */}
        <Reveal key={page}>
          {posts.length === 0 ? (
            <RevealItem as="p" className="text-base-content/60">
              Aún no hay artículos publicados.
            </RevealItem>
          ) : (
            <RevealItem as="ul" effect="fade" stagger={0.06} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {posts.map((post) => (
                <RevealItem as="li" key={post.id}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealItem>
          )}
        </Reveal>

        {totalPages > 1 && (
          <nav aria-label="Paginación del blog" className="mt-12 flex items-center justify-between gap-4">
            <p className="text-sm font-bold uppercase text-base-content/50">
              Página {page} de {totalPages}
            </p>
            <div className="flex gap-3">
              {page > 1 && (
                <Link href={pageHref(page - 1)} transitionTypes={["nav-back"]} className={pageLinkClass}>
                  <FiArrowLeft aria-hidden /> Anterior
                </Link>
              )}
              {page < totalPages && (
                <Link href={pageHref(page + 1)} transitionTypes={["nav-forward"]} className={pageLinkClass}>
                  Siguiente <FiArrowRight aria-hidden />
                </Link>
              )}
            </div>
          </nav>
        )}
      </section>
    </>
  );
}
