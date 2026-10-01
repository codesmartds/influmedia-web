import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { FiArrowLeft } from "react-icons/fi";
import type { Media, Post } from "@/payload-types";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { formatPostDate } from "./format";
import { PostCard } from "./PostCard";

// Article body typography (no typography plugin in this project).
const bodyClass = [
  "text-lg leading-relaxed text-base-content/85 md:text-[clamp(1rem,1.2vw,1.25rem)]",
  "[&_p]:mt-5 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-base-content",
  "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-base-content",
  "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2",
  "[&_blockquote]:mt-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-base-content",
  "[&_a]:text-info [&_a]:underline [&_strong]:text-base-content",
].join(" ");

export function PostDetail({ post, more }: { post: Post; more: Post[] }) {
  const cover = typeof post.cover === "object" ? (post.cover as Media) : null;

  return (
    <article className="relative mx-auto flex w-full max-w-[96rem] flex-col px-6 pb-20 pt-10 md:px-[4.7%] md:pt-16">
      <Reveal className="grid items-center gap-10 md:grid-cols-[1fr_42%] md:gap-[6%]">
        <RevealItem effect="fade" stagger className="flex flex-col">
          <RevealItem>
            <Link
              href="/blog"
              transitionTypes={["nav-back"]}
              className="inline-flex items-center gap-1 text-sm font-bold uppercase text-secondary md:text-[clamp(0.85rem,1.2vw,1.3rem)]"
            >
              <FiArrowLeft aria-hidden /> Blog
            </Link>
          </RevealItem>
          <RevealItem as="h1" className="mt-6 text-[clamp(2rem,3.3vw,3.6rem)] font-bold leading-tight">
            {post.title}
          </RevealItem>
          <RevealItem as="p" className="mt-5 text-lg leading-snug text-base-content/85 md:text-[clamp(1rem,1.5vw,1.6rem)]">
            {post.excerpt}
          </RevealItem>
          <RevealItem as="p" className="mt-6 text-sm font-bold uppercase text-base-content/60 md:text-[clamp(0.75rem,0.9vw,0.95rem)]">
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            {post.author && <> · {post.author}</>}
          </RevealItem>
        </RevealItem>

        {cover?.url && (
          <RevealItem effect="right" className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-base-300 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <Image src={cover.url} alt={cover.alt} fill priority sizes="(max-width: 768px) 100vw, 42vw" className="object-cover object-top" />
          </RevealItem>
        )}
      </Reveal>

      <div className={`mx-auto mt-12 w-full max-w-[70ch] md:mt-[5%] ${bodyClass}`}>
        <RichText data={post.content} />
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-posts" className="mt-16 md:mt-[6%]">
          <h2 id="more-posts" className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.85rem,1.2vw,1.3rem)]">
            Sigue leyendo
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[1.5vw]">
            {more.map((other) => (
              <li key={other.id}>
                <PostCard post={other} />
              </li>
            ))}
          </ul>
        </section>
      )}

    </article>
  );
}
