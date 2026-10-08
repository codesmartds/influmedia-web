"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Category, CaseStudy, Media } from "@/payload-types";

// Full-bleed case slider: the cover fills the section, copy sits bottom-left
// and up to three result panels bottom-right. Advances every 7 s until the
// visitor picks a case by hand.

const INTERVAL = 7000;
// Result panels cycle violet, blue and pink tints.
const tints = ["155,111,214", "123,167,209", "215,127,180"];

const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);
const pad = (n: number) => String(n).padStart(2, "0");

/** `allHref`: where "Ver todos los casos" goes; null hides it (e.g. on the page that lists them). */
export function CaseSlider({ cases, allHref = "/influencer-marketing#casos" }: { cases: CaseStudy[]; allHref?: string | null }) {
  const [current, setCurrent] = useState(0);
  const paused = useRef(false);
  const reduce = useReducedMotion();
  const total = cases.length;

  useEffect(() => {
    if (reduce || total < 2) return;
    const id = setInterval(() => {
      if (!paused.current) setCurrent((c) => (c + 1) % total);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [reduce, total]);

  const go = (k: number) => {
    paused.current = true;
    setCurrent((k + total) % total);
  };

  const item = cases[current];
  const category = item.category && typeof item.category === "object" ? (item.category as Category) : null;
  const tag = [item.brandName, category?.name].filter(Boolean).join(" · ");

  return (
    <section
      id="casos"
      aria-roledescription="carrusel"
      aria-label="Casos de éxito"
      className="relative flex min-h-[min(900px,100dvh)] scroll-mt-24 flex-col justify-between overflow-hidden"
    >
      {cases.map((c, k) => {
        const cover = media(c.cover);
        const on = k === current;
        return cover?.url ? (
          <Image
            key={c.id}
            src={cover.url}
            alt=""
            fill
            sizes="100vw"
            priority={k === 0}
            className="object-cover object-[50%_28%] transition-[opacity,transform] ease-out [transition-duration:1.1s,8s]"
            style={{ opacity: on ? 1 : 0, transform: `scale(${on ? 1.06 : 1})` }}
          />
        ) : null;
      })}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,8,16,.92)_0%,rgba(11,8,16,.5)_48%,rgba(11,8,16,.08)_82%),linear-gradient(0deg,rgba(11,8,16,.96)_0%,rgba(11,8,16,0)_48%),linear-gradient(180deg,rgba(11,8,16,.75)_0%,rgba(11,8,16,0)_22%)]" />

      <div className="relative flex flex-wrap items-center justify-between gap-5 px-5 py-10 md:px-[4%]">
        <p className="font-mono text-xs tracking-[0.16em] text-secondary uppercase">Casos — resultados, no publicaciones</p>
        {total > 1 && (
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#d6d0de]">
              {pad(current + 1)} / {pad(total)}
            </span>
            <div className="flex items-center gap-1.5">
              {cases.map((c, k) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => go(k)}
                  aria-label={`Ver caso ${k + 1}`}
                  aria-current={k === current || undefined}
                  className="h-[3px] cursor-pointer rounded-full transition-[width,background-color] duration-400"
                  style={{ width: k === current ? 34 : 14, background: k === current ? "#f2eef6" : "rgba(242,238,246,.35)" }}
                />
              ))}
            </div>
            {[
              { label: "Anterior", step: -1, icon: "←" },
              { label: "Siguiente", step: 1, icon: "→" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={() => go(current + b.step)}
                aria-label={`Caso ${b.label.toLowerCase()}`}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-base-content/20 bg-[rgba(20,15,28,.4)] backdrop-blur-md transition-colors hover:bg-base-content/15"
              >
                {b.icon}
              </button>
            ))}
          </div>
        )}
      </div>

      <div aria-live="polite" className="relative flex flex-wrap items-end justify-between gap-10 px-5 pb-[clamp(3rem,6vw,4.5rem)] md:px-[4%]">
        <div key={item.id} className="flex max-w-[860px] min-w-0 flex-[1_1_560px] animate-[fadeIn_.6s_ease-out] flex-col gap-[22px]">
          <span className="flex items-center gap-2.5 font-mono text-xs tracking-[0.14em] text-[#e6e0ee] uppercase">
            <span className="size-2 rounded-full bg-secondary" />
            {tag}
          </span>
          <h2 className="text-[clamp(1.75rem,4.1vw,4rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-balance">{item.title}</h2>
          <p className="max-w-[580px] text-lg leading-relaxed text-[#c9c2d2]">{item.excerpt || item.objective}</p>
          {allHref && (
            <div className="mt-1.5 flex flex-wrap gap-2.5">
              <Link
                href={allHref}
                transitionTypes={["nav-forward"]}
                className="rounded-full border border-base-content/40 bg-[rgba(20,15,28,.35)] px-6 py-[15px] text-sm font-medium backdrop-blur-md transition-colors hover:bg-base-content/10"
              >
                Ver todos los casos
              </Link>
            </div>
          )}
        </div>
        {(item.results ?? []).length > 0 && (
          <dl key={`r${item.id}`} className="flex min-w-[260px] flex-[0_1_380px] animate-[fadeIn_.6s_ease-out] flex-col gap-2.5">
            {(item.results ?? []).slice(0, 3).map((r, i) => (
              <div
                key={r.id ?? r.label}
                className="flex items-center justify-between gap-4 rounded-2xl border px-[22px] py-[18px] backdrop-blur-xl"
                style={{ background: `rgba(${tints[i % 3]},.16)`, borderColor: `rgba(${tints[i % 3]},.36)` }}
              >
                <dt className="font-mono text-[11px] tracking-[0.1em] text-[#e6e0ee] uppercase">{r.label}</dt>
                <dd className="font-display text-[40px] leading-none font-medium tracking-[-0.045em]">{r.name}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
