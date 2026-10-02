import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { FiArrowLeft } from "react-icons/fi";
import type { Media, Post } from "@/payload-types";
import { NewsletterBar } from "@/components/newsletter/NewsletterBar";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { formatPostDate, readingMinutes } from "./format";
import { PostCard } from "./PostCard";
import { ReadingProgress } from "./ReadingProgress";
import { ShareLinks } from "./ShareLinks";

// Article body typography (no typography plugin in this project).
const bodyClass = [
  "text-lg leading-relaxed text-base-content/85 md:text-[1.2rem]",
  "[&_p]:mt-6",
  "[&_h2]:mt-14 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-base-content",
  "[&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-base-content",
  "[&_ul]:mt-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-0",
  "[&_ul>li]:relative [&_ul>li]:list-none [&_ul>li]:pl-7 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.7em] [&_ul>li]:before:size-2 [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-secondary",
  "[&_ol]:mt-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:mt-2",
  "[&_blockquote]:my-12 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-8 [&_blockquote]:text-[clamp(1.5rem,2.4vw,2.1rem)] [&_blockquote]:font-bold [&_blockquote]:leading-snug [&_blockquote]:text-base-content",
  "[&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-base-content",
].join(" ");

const wrap = "mx-auto w-full max-w-[96rem] px-6 md:px-[4.7%]";

export function PostDetail({ post, more }: { post: Post; more: Post[] }) {
  const cover = typeof post.cover === "object" ? (post.cover as Media) : null;
  const minutes = readingMinutes(post.content);

  return (
    <>
      <ReadingProgress />
      <article>
        <header className={`${wrap} pt-14 md:pt-20`}>
          <Reveal className="mx-auto max-w-4xl">
            <RevealItem>
              <Link
                href="/blog"
                transitionTypes={["nav-back"]}
                className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-secondary hover:text-base-content"
              >
                <FiArrowLeft aria-hidden /> Blog
              </Link>
            </RevealItem>
            <RevealItem as="h1" className="mt-6 text-[clamp(2.4rem,4.6vw,4.6rem)] font-bold leading-[1.05]">
              {post.title}
            </RevealItem>
            <RevealItem as="p" className="mt-6 text-xl leading-snug text-base-content/75">
              {post.excerpt}
            </RevealItem>
            <RevealItem className="mt-8 flex flex-wrap items-center justify-between gap-6 border-y border-white/10 py-5">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wider text-base-content/55">
                <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                {post.author && (
                  <>
                    <span aria-hidden>·</span>
                    {post.author}
                  </>
                )}
                <span aria-hidden>·</span>
                {minutes} min de lectura
              </p>
              <ShareLinks title={post.title} />
            </RevealItem>
          </Reveal>
        </header>

        {cover?.url && (
          <Reveal className={`${wrap} mt-10`}>
            <RevealItem effect="scale" className="rounded-3xl border border-base-300 bg-base-200 p-2">
              <span className="relative block aspect-[21/9] overflow-hidden rounded-2xl">
                <Image src={cover.url} alt={cover.alt} fill priority sizes="(max-width: 1536px) 100vw, 1536px" className="object-cover object-[center_25%]" />
              </span>
            </RevealItem>
          </Reveal>
        )}

        <div className={`${wrap} py-14 md:py-20`}>
          <div className={`mx-auto max-w-[68ch] ${bodyClass}`}>
            <RichText data={post.content} />
          </div>
          <div className="mx-auto mt-14 flex max-w-[68ch] justify-end border-t border-white/10 pt-6">
            <ShareLinks title={post.title} />
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-posts" className={`${wrap} pb-6`}>
          <Reveal>
            <RevealItem as="p" className="text-sm font-bold uppercase text-secondary">
              Sigue leyendo
            </RevealItem>
            <RevealItem as="h2" className="mt-3 text-[clamp(2rem,3.4vw,3.2rem)] font-bold leading-tight">
              <span id="more-posts">Más conversaciones.</span>
            </RevealItem>
            <RevealItem as="ul" effect="fade" stagger className="mt-10 grid gap-6 md:grid-cols-3">
              {more.map((other) => (
                <RevealItem as="li" key={other.id}>
                  <PostCard post={other} />
                </RevealItem>
              ))}
            </RevealItem>
          </Reveal>
        </section>
      )}

      <NewsletterBar />
    </>
  );
}
