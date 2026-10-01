import Image from "next/image";
import Link from "next/link";
import type { Media, Post } from "@/payload-types";
import { formatPostDate } from "./format";

// Same translucent card used across the deck slides.
export function PostCard({ post }: { post: Post }) {
  const cover = typeof post.cover === "object" ? (post.cover as Media) : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      transitionTypes={["nav-forward"]}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-colors hover:border-primary"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-base-300 lg:aspect-[7/2]">
        {cover?.url && (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
            className="object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-[6%] lg:px-[6%] lg:py-[3.6%]">
        <time dateTime={post.publishedAt} className="text-xs font-bold uppercase text-secondary md:text-[clamp(0.65rem,0.8vw,0.85rem)]">
          {formatPostDate(post.publishedAt)}
        </time>
        <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug md:text-[clamp(0.95rem,1.25vw,1.35rem)]">
          {post.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-base-content/70 lg:line-clamp-1 md:text-[clamp(0.8rem,0.95vw,1rem)]">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
