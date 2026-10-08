import Image from "next/image";
import Link from "next/link";
import type { Media, Post } from "@/payload-types";
import { formatShortDate, readingMinutes, topicLabel } from "./format";

const coverOf = (post: Post) => (typeof post.cover === "object" ? (post.cover as Media) : null);
const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/** Author line: initials in a lilac ring, then the name. */
export function Byline({ author, size = "sm" }: { author: string; size?: "sm" | "lg" }) {
  const ring = size === "lg" ? "size-12 text-[13px]" : "size-7 text-[10px]";
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden className={`flex shrink-0 items-center justify-center rounded-full border border-tint/45 font-mono text-accent-cycle ${ring}`}>
        {initials(author)}
      </span>
      <span className={size === "lg" ? "font-display text-base font-semibold tracking-[-0.02em]" : "text-sm text-[#d6d0de]"}>{author}</span>
    </span>
  );
}

/** Mono meta line: TOPIC · DATE · N MIN. */
export function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  const topic = topicLabel(post.topic);
  return (
    <span className={`font-mono text-[10.5px] tracking-[0.12em] uppercase ${className}`}>
      {[topic, formatShortDate(post.publishedAt), `${readingMinutes(post.content)} min`].filter(Boolean).join(" · ")}
    </span>
  );
}

// Grid card: cover dimmed until hover, then meta, title, excerpt and author.
export function PostCard({ post, n }: { post: Post; n?: number }) {
  const cover = coverOf(post);
  return (
    <Link href={`/blog/${post.slug}`} transitionTypes={["nav-forward"]} className="group flex h-full flex-col gap-[18px]">
      <span className="relative block aspect-[4/3] overflow-hidden bg-[#140f1a]">
        {cover?.url && (
          <Image
            src={cover.url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-[50%_25%] brightness-[.62] saturate-[.9] transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
          />
        )}
        {n !== undefined && <span className="absolute top-3.5 left-4 font-mono text-[10.5px] tracking-[0.1em] text-[#d6d0de]">{String(n).padStart(2, "0")}</span>}
      </span>
      <span className="flex flex-col gap-3 pr-[clamp(8px,2vw,24px)]">
        <PostMeta post={post} className="text-accent-cycle" />
        <span className="font-display text-[clamp(24px,2.1vw,30px)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">{post.title}</span>
        <span className="text-[15px] leading-normal text-muted">{post.excerpt}</span>
        {post.author && (
          <span className="mt-1">
            <Byline author={post.author} />
          </span>
        )}
      </span>
    </Link>
  );
}
