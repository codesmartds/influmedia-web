import Image from "next/image";
import Link from "next/link";
import type { Media, Post } from "@/payload-types";
import { formatPostDate } from "./format";

const coverOf = (post: Post) => (typeof post.cover === "object" ? (post.cover as Media) : null);

// Framed card in the site's card language: inset cover, date as a tracked
// label, title and excerpt; lifts and glows violet on hover.
export function PostCard({ post }: { post: Post }) {
  const cover = coverOf(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex h-full flex-col rounded-2xl border border-base-300 bg-base-200 p-2 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_48px_-24px_#6c3cf0] focus-visible:border-primary focus-visible:outline-none"
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-base-300">
        {cover?.url && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
      </span>
      <span className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <time dateTime={post.publishedAt} className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-base-content/55">
          <span aria-hidden className="h-px w-5 bg-secondary" />
          {formatPostDate(post.publishedAt)}
        </time>
        <span className="mt-3 line-clamp-2 text-xl font-bold leading-snug">{post.title}</span>
        <span className="mt-2 line-clamp-2 leading-snug text-base-content/65">{post.excerpt}</span>
        <span className="mt-auto pt-5 text-xs font-bold uppercase tracking-wider text-base-content/50 transition-colors group-hover:text-secondary">
          Leer artículo →
        </span>
      </span>
    </Link>
  );
}

// Large horizontal card for the newest post on the first page.
export function FeaturedPost({ post }: { post: Post }) {
  const cover = coverOf(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      transitionTypes={["nav-forward"]}
      className="group grid overflow-hidden rounded-3xl border border-base-300 bg-base-200 p-2 transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_32px_64px_-32px_#6c3cf0] md:grid-cols-[1.2fr_1fr]"
    >
      <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-base-300 md:aspect-auto md:min-h-[24rem]">
        {cover?.url && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
      </span>
      <span className="flex flex-col justify-center p-6 md:p-10">
        <span className="flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary">
          <span aria-hidden className="h-px w-8 bg-secondary" />
          Lo más reciente
        </span>
        <span className="mt-5 text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight">{post.title}</span>
        <span className="mt-4 text-lg leading-snug text-base-content/75">{post.excerpt}</span>
        <time dateTime={post.publishedAt} className="mt-6 text-xs font-bold uppercase tracking-wider text-base-content/50">
          {formatPostDate(post.publishedAt)}
        </time>
        <span className="btn btn-primary mt-8 h-auto self-start rounded-lg border-0 px-7 py-3.5 uppercase">Leer artículo →</span>
      </span>
    </Link>
  );
}
