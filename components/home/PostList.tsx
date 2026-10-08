"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";

export type PostRow = { id: number; slug: string; title: string; date: string; read: string; cover?: string | null };

// Editorial post list. On pointer devices a tilted cover preview follows the
// cursor over the hovered row; other rows dim so the hovered title stands out.
export function PostList({ posts }: { posts: PostRow[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(-1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e: MouseEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const shown = posts[Math.max(hover, 0)];

  return (
    <div ref={box} onMouseMove={move} onMouseLeave={() => setHover(-1)} className="relative">
      <ol className="flex flex-col border-t border-base-300">
        {posts.map((p, k) => (
          <li key={p.id}>
            <Link
              href={`/blog/${p.slug}`}
              transitionTypes={["nav-forward"]}
              onMouseEnter={() => setHover(k)}
              onFocus={() => setHover(k)}
              className="group grid grid-cols-[40px_minmax(0,1fr)] items-center gap-6 border-b border-base-300 py-7 transition-[padding] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:pl-[18px] sm:grid-cols-[56px_minmax(0,1fr)_auto]"
            >
              <span className="font-mono text-[13px] text-accent-cycle">{String(k + 1).padStart(2, "0")}</span>
              <div className="flex min-w-0 flex-col gap-3">
                <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase">{p.date}</span>
                <span
                  className="font-display text-[clamp(24px,2.52vw,37px)] leading-[1.04] font-medium tracking-[-0.035em] text-balance transition-colors duration-300"
                  style={{ color: hover === -1 || hover === k ? "#f2eef6" : "#5f576b" }}
                >
                  {p.title}
                </span>
              </div>
              <span className="hidden items-center gap-[18px] font-mono text-xs whitespace-nowrap text-[#8e86a0] sm:flex">
                {p.read}
                <span
                  aria-hidden
                  className="flex size-[46px] items-center justify-center rounded-full border text-lg text-base-content transition-colors duration-300"
                  style={{
                    background: hover === k ? "color-mix(in srgb, var(--acc-tint) 30%, transparent)" : "transparent",
                    borderColor: hover === k ? "color-mix(in srgb, var(--acc-tint) 70%, transparent)" : "rgba(242,238,246,.18)",
                  }}
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Cursor preview (decorative, pointer devices only) */}
      {shown?.cover && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-10 hidden h-[220px] w-[320px] overflow-hidden rounded-2xl bg-[#140f1a] shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-[opacity,transform,left,top] duration-[350ms,500ms,200ms,200ms] ease-out [@media(hover:hover)]:block"
          style={{
            left: pos.x,
            top: pos.y,
            opacity: hover >= 0 ? 1 : 0,
            transform: `translate(-50%,-50%) rotate(-4deg) scale(${hover >= 0 ? 1 : 0.85})`,
          }}
        >
          {posts.map((p, k) =>
            p.cover ? (
              <Image
                key={p.id}
                src={p.cover}
                alt=""
                fill
                sizes="320px"
                className="object-cover object-[50%_22%] transition-opacity duration-300"
                style={{ opacity: k === Math.max(hover, 0) ? 1 : 0 }}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
