"use client";

import { useEffect, useState, type MouseEvent } from "react";

// "En este artículo": links to the article's h2s. Clicking scrolls smoothly
// (instantly under reduced motion) and keeps the hash in the URL; the
// section being read is highlighted as the page scrolls.

export type TocItem = { id: string; title: string };

// A section is current once its heading passes this line (from the top).
const READ_LINE = 0.35;

export function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => Boolean(h));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * READ_LINE;
      // The last heading above the line is the one being read; none before the first.
      let current: string | null = null;
      for (const h of headings) if (h.getBoundingClientRect().top <= line) current = h.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const go = (e: MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav aria-label="En este artículo" className="flex flex-col gap-3 text-[15px]">
      <h2 className="font-mono text-[11px] tracking-[0.14em] text-[#6f6880] uppercase">En este artículo</h2>
      <ol className="flex flex-col gap-1 border-l border-base-300">
        {items.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => go(e, s.id)}
                aria-current={on ? "location" : undefined}
                className={`-ml-px flex gap-2 border-l py-1.5 pl-4 transition-colors duration-300 ${
                  on ? "border-tint text-base-content" : "border-transparent text-[#a39bae] hover:text-base-content"
                }`}
              >
                <span className={`font-mono text-[11px] leading-[1.9] ${on ? "text-accent-cycle" : "text-[#6f6880]"}`}>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
