"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Category, Media, Talent } from "@/payload-types";

// Roster browser for /creadores: a sticky bar with a category filter (a button
// that opens every category full screen), the creator grid, and a profile
// dialog that steps through the visible creators with animated transitions.

const EASE = [0.22, 1, 0.36, 1] as const;

const photoOf = (t: Talent) => (t.thumbnail && typeof t.thumbnail === "object" ? (t.thumbnail as Media) : null);
const categoryOf = (t: Talent) => (t.category && typeof t.category === "object" ? (t.category as Category) : null);
const pad = (n: number) => String(n).padStart(2, "0");
/** "https://www.instagram.com/user/" or "https://tiktok.com/@user" → "@user". */
const handleOf = (url: string) => "@" + (url.replace(/\/+$/, "").split("/").pop() ?? "").replace(/^@/, "");

type Filter = { id: number | null; name: string; count: number };

/* Category filter: one button, every category full screen */
function CategoryPicker({ filters, active, onPick }: { filters: Filter[]; active: Filter; onPick: (id: number | null) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };
  const pick = (id: number | null) => {
    onPick(id);
    dialog.current?.close();
    // Back to the top of the list, wherever the page was.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("roster")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={show}
        className="flex cursor-pointer items-center gap-3 rounded-full border border-base-content/25 py-2.5 pr-4 pl-5 text-[15px] transition-colors hover:border-base-content/60"
      >
        <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase max-sm:hidden">Categoría</span>
        <span className="font-medium">{active.name}</span>
        <span className="font-mono text-[11px] text-secondary">{pad(active.count)}</span>
        <span aria-hidden className="text-[#8e86a0]">
          ▾
        </span>
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        aria-labelledby="category-title"
        className="m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-transparent p-0 text-base-content backdrop:bg-[rgba(8,6,12,.94)] backdrop:backdrop-blur-xl"
      >
        {open && (
          <div className="mx-auto flex min-h-full w-full max-w-[96rem] flex-col gap-8 px-5 py-8 md:px-[4%] md:py-12">
            <div className="flex items-center justify-between gap-4">
              <h2 id="category-title" className="font-mono text-xs tracking-[0.16em] text-secondary uppercase">
                Filtrar por categoría
              </h2>
              <form method="dialog">
                <button
                  aria-label="Cerrar"
                  className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-base-content/20 text-lg transition-colors hover:bg-base-content/10"
                >
                  ×
                </button>
              </form>
            </div>
            <ul className="flex flex-col border-t border-base-300">
              {filters.map((f, i) => {
                const on = f.id === active.id;
                return (
                  <motion.li
                    key={f.id ?? "all"}
                    className="border-b border-base-300"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.03 * i }}
                  >
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => pick(f.id)}
                      className="group flex w-full cursor-pointer items-baseline justify-between gap-6 py-[clamp(12px,2vh,20px)] text-left"
                    >
                      <span
                        className={`font-display text-[clamp(28px,4.4vw,60px)] leading-none font-semibold tracking-[-0.05em] transition-colors ${
                          on ? "text-base-content" : "text-[#5f576b] group-hover:text-base-content"
                        }`}
                      >
                        {f.name}
                      </span>
                      <span className={`font-mono text-sm tracking-[0.06em] ${on ? "text-secondary" : "text-[#4a4255]"}`}>{pad(f.count)}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        )}
      </dialog>
    </>
  );
}

/* Profile dialog: photo and details slide in the direction of travel */
function Profile({
  talent,
  index,
  total,
  direction,
  onStep,
  onClose,
}: {
  talent: Talent;
  index: number;
  total: number;
  direction: number;
  onStep: (d: number) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const photo = photoOf(talent);
  const category = categoryOf(talent);
  const links = [
    { label: "Instagram", url: talent.instagram },
    { label: "TikTok", url: talent.tiktok },
  ].filter((l) => l.url) as { label: string; url: string }[];

  // Photo pans in from the side we're heading to; details rise in after it.
  const photoMotion = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: `${direction * 8}%`, scale: 1.06 },
    animate: { opacity: 1, x: "0%", scale: 1 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: `${direction * -8}%`, scale: 1.02 },
  };
  const textMotion = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: direction * 28 },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: direction * -28 },
  };

  return (
    <motion.div
      className="relative grid max-h-full w-[min(1100px,100%)] overflow-auto rounded-3xl border border-[#2a2233] bg-[#110d17] md:grid-cols-2"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative min-h-[min(560px,55vh)] overflow-hidden bg-[#140f1a] md:min-h-[min(560px,70vh)]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div key={talent.id} className="absolute inset-0" {...photoMotion} transition={{ duration: 0.65, ease: EASE }}>
            {photo?.url && <Image src={photo.url} alt="" fill sizes="(max-width: 768px) 100vw, 550px" className="object-cover object-[50%_20%]" />}
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(17,13,23,.6),rgba(17,13,23,0)_40%)]" />
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-8 p-[clamp(24px,4vw,48px)]">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#8e86a0] uppercase">
            {pad(index + 1)} / {pad(total)} · Talento exclusivo
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-[42px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-base-content/20 text-lg transition-colors hover:bg-base-content/10"
          >
            ×
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={talent.id} className="flex flex-col gap-8" {...textMotion} transition={{ duration: 0.4, ease: EASE }}>
            <div className="flex flex-col gap-4">
              {category && <span className="font-mono text-xs tracking-[0.14em] text-secondary uppercase">{category.name}</span>}
              <h2 id="profile-title" className="text-[clamp(31px,4.2vw,62px)] leading-[0.88] font-semibold tracking-[-0.055em]">
                {talent.name}
              </h2>
            </div>
            {links.length > 0 && (
              <ul className="flex flex-col border-t border-[#2a2233]">
                {links.map((l) => (
                  <li key={l.label} className="border-b border-[#2a2233]">
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-[1fr_auto_auto] items-baseline gap-4 py-4 transition-colors hover:text-secondary"
                    >
                      <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase">{l.label}</span>
                      <span>{handleOf(l.url)}</span>
                      <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3.5">
          <Link
            href="/contacto"
            transitionTypes={["nav-forward"]}
            className="rounded-full bg-base-content px-6 py-[15px] text-sm font-semibold text-base-100 transition-colors hover:bg-secondary"
          >
            Incluir en mi campaña
          </Link>
          {total > 1 && (
            <div className="flex gap-2">
              {[
                { d: -1, label: "Creador anterior", icon: "←" },
                { d: 1, label: "Creador siguiente", icon: "→" },
              ].map((b) => (
                <button
                  key={b.d}
                  type="button"
                  onClick={() => onStep(b.d)}
                  aria-label={b.label}
                  className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-base-content/20 transition-colors hover:bg-base-content/10"
                >
                  {b.icon}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function CreatorsDirectory({ talents, categories }: { talents: Talent[]; categories: Category[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null); // index into `visible`
  const [direction, setDirection] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);

  const counts = new Map<number, number>();
  for (const t of talents) {
    const c = categoryOf(t);
    if (c) counts.set(c.id, (counts.get(c.id) ?? 0) + 1);
  }
  const filters: Filter[] = [
    { id: null, name: "Todos", count: talents.length },
    ...categories.map((c) => ({ id: c.id, name: c.name, count: counts.get(c.id) ?? 0 })).filter((f) => f.count > 0),
  ];
  const activeFilter = filters.find((f) => f.id === active) ?? filters[0];
  const visible = active ? talents.filter((t) => categoryOf(t)?.id === active) : talents;

  const show = (i: number) => {
    setDirection(1);
    setOpen(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => {
    setDirection(d);
    setOpen((i) => (i === null ? i : (i + d + visible.length) % visible.length));
  };
  const close = () => dialog.current?.close();

  // Arrow keys step through creators while the profile is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      {/* Filter bar, pinned under the site header */}
      <div className="sticky top-[4.5rem] z-20 border-y border-base-300 bg-base-100/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between gap-4 px-5 py-3 md:px-[4%]">
          <p className="font-mono text-[11px] tracking-[0.14em] text-[#8e86a0] uppercase">
            {active ? activeFilter.name : "Roster completo"} · {pad(visible.length)} creadores
          </p>
          <CategoryPicker filters={filters} active={activeFilter} onPick={setActive} />
        </div>
      </div>

      <section id="roster" className="mx-auto w-full max-w-[96rem] scroll-mt-36 px-5 pt-[clamp(28px,3vw,40px)] pb-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%]">
        <motion.ul layout={!reduce} className="grid grid-cols-2 gap-[3px] sm:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((t, i) => {
              const photo = photoOf(t);
              const category = categoryOf(t);
              return (
                <motion.li
                  key={t.id}
                  layout={!reduce}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => show(i)}
                    aria-haspopup="dialog"
                    className="group relative block aspect-[3/4] w-full cursor-pointer overflow-hidden bg-[#140f1a] text-left"
                  >
                    {photo?.url && (
                      <Image
                        src={photo.url}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, 240px"
                        className="object-cover object-[50%_20%] brightness-[.62] saturate-[.9] transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
                      />
                    )}
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,8,16,.9)_0%,rgba(11,8,16,0)_45%)]" />
                    <span className="absolute top-3 left-3 font-mono text-[10.5px] tracking-[0.1em] text-[#d6d0de]">{pad(i + 1)}</span>
                    <span className="absolute right-3.5 bottom-3.5 left-3.5 flex flex-col gap-1.5">
                      {category && <span className="font-mono text-[10px] tracking-[0.12em] text-secondary uppercase">{category.name}</span>}
                      <span className="font-display text-[clamp(20px,1.8vw,26px)] leading-none font-semibold tracking-[-0.035em]">{t.name}</span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </section>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        aria-labelledby="profile-title"
        className="m-0 h-dvh max-h-none w-screen max-w-none overscroll-contain bg-transparent p-0 text-base-content backdrop:bg-[rgba(8,6,12,.9)] backdrop:backdrop-blur-lg"
      >
        {open !== null && visible[open] && (
          <div className="flex h-full items-center justify-center p-[clamp(12px,3vw,40px)]" onClick={close}>
            <Profile talent={visible[open]} index={open} total={visible.length} direction={direction} onStep={step} onClose={close} />
          </div>
        )}
      </dialog>
    </>
  );
}
