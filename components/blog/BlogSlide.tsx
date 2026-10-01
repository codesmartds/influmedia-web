import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import type { Post } from "@/payload-types";
import { SlideFooter } from "@/components/slides/SlideFooter";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { PostCard } from "./PostCard";

const pageLinkClass =
  "inline-flex items-center gap-1 text-sm font-bold uppercase text-info underline underline-offset-4 md:text-[clamp(0.8rem,1vw,1.1rem)]";

const pageHref = (page: number) => (page <= 1 ? "/blog" : `/blog?page=${page}`);

export function BlogSlide({ posts, page, totalPages }: { posts: Post[]; page: number; totalPages: number }) {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 pb-8 md:px-[4.7%] md:pb-[2%]">
      {/* key: re-run the entrance when the page changes */}
      <Reveal key={page} className="mt-6 flex flex-1 flex-col md:-mt-[3.2%]">
        <SlideIntro
          eyebrow="Blog"
          title="Lo que estamos conversando."
          subtitle="Ideas, aprendizajes y tendencias desde adentro del influencer marketing."
        />

        {posts.length === 0 ? (
          <RevealItem as="p" className="mt-10 text-base-content/60">
            Aún no hay artículos publicados.
          </RevealItem>
        ) : (
          <RevealItem
            as="ul"
            effect="fade"
            stagger={0.06}
            className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-[1.8%] lg:grid-cols-4 lg:gap-x-[1.5vw] lg:gap-y-[1.1vw]"
          >
            {posts.map((post) => (
              <RevealItem as="li" key={post.id}>
                <PostCard post={post} />
              </RevealItem>
            ))}
          </RevealItem>
        )}
      </Reveal>

      <SlideFooter label={totalPages > 1 ? `Blog • Página ${page} de ${totalPages}` : "Blog"}>
        {totalPages > 1 && (
          <nav aria-label="Paginación del blog" className="flex items-center gap-5">
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
          </nav>
        )}
      </SlideFooter>
    </section>
  );
}
