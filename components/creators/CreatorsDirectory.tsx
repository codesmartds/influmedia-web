"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import type { Category, Media, Talent } from "@/payload-types";

const EASE = [0.22, 1, 0.36, 1] as const;

const photoOf = (t: Talent) => (t.thumbnail && typeof t.thumbnail === "object" ? (t.thumbnail as Media) : null);
const categoryOf = (t: Talent) => (t.category && typeof t.category === "object" ? (t.category as Category) : null);
/** "https://www.instagram.com/user" → "instagram.com/user", as in the deck. */
const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Roster browser: categories on the left (1/4), creator cards on the right
// (3/4). A card opens the creator's profile in a modal, modeled on the
// "Exclusive Creators" deck pages.
export function CreatorsDirectory({ talents, categories }: { talents: Talent[]; categories: Category[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [selected, setSelected] = useState<Talent | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const counts = new Map<number, number>();
  for (const t of talents) {
    const c = categoryOf(t);
    if (c) counts.set(c.id, (counts.get(c.id) ?? 0) + 1);
  }
  const visible = active ? talents.filter((t) => categoryOf(t)?.id === active) : talents;

  const open = (talent: Talent) => {
    setSelected(talent);
    dialog.current?.showModal();
  };

  const selCategory = selected ? categoryOf(selected) : null;
  const selPhoto = selected ? photoOf(selected) : null;
  const accent = selCategory?.color ?? "#6c3cf0";

  // minmax(0,1fr): the swipeable category row must not widen the column on mobile.
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[1fr_3fr] lg:gap-10">
      {/* Categories */}
      <nav aria-label="Categorías" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <h2 className="mb-4 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-base-content/50">
          <span aria-hidden className="h-px w-6 bg-base-content/30" />
          Categorías
        </h2>
        {/* Editorial list: hairline dividers, and the active row gets a bar
            and a soft wash in its category color. On mobile, a swipeable row. */}
        <ul className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/10 lg:pb-0">
          {[{ id: null as number | null, name: "Todos", color: "#8c5cff", count: talents.length }, ...categories.map((c) => ({ id: c.id, name: c.name, color: c.color, count: counts.get(c.id) ?? 0 }))]
            .filter((c) => c.count > 0)
            .map((c) => {
              const isActive = active === c.id;
              return (
                <li key={c.id ?? "all"} className="shrink-0 lg:border-b lg:border-white/10">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(c.id)}
                    style={{
                      ["--cat" as string]: c.color,
                      backgroundImage: isActive ? `linear-gradient(90deg, ${c.color}29, transparent 85%)` : undefined,
                    }}
                    className={`group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden whitespace-nowrap rounded-full border px-4 py-2 text-left text-sm transition-colors lg:rounded-none lg:border-0 lg:px-5 lg:py-3.5 lg:text-[0.95rem] ${
                      isActive
                        ? "border-[var(--cat)] font-bold text-base-content"
                        : "border-base-300 text-base-content/55 hover:text-base-content"
                    }`}
                  >
                    {/* Accent bar (desktop) */}
                    <span
                      aria-hidden
                      className={`absolute inset-y-2 left-0 hidden w-[3px] rounded-full bg-[var(--cat)] transition-transform duration-300 lg:block ${
                        isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
                      }`}
                    />
                    <span
                      aria-hidden
                      className="size-1.5 shrink-0 rounded-full bg-[var(--cat)] transition-transform group-hover:scale-125"
                    />
                    <span className="flex-1">{c.name}</span>
                    <span className={`text-xs tabular-nums tracking-wider ${isActive ? "text-[var(--cat)]" : "text-base-content/35"}`}>
                      {String(c.count).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}
        </ul>
      </nav>

      {/* Creator cards */}
      <motion.ul layout className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((t) => {
            const photo = photoOf(t);
            const category = categoryOf(t);
            return (
              <motion.li
                layout
                key={t.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => open(t)}
                  aria-haspopup="dialog"
                  // Framed card in the site's card language; the category color
                  // only appears as an accent and as the hover glow.
                  className="group flex w-full cursor-pointer flex-col rounded-2xl border border-base-300 bg-base-200 p-2 text-left transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_24px_48px_-24px_var(--accent)] focus-visible:border-[var(--accent)] focus-visible:outline-none"
                  style={{ ["--accent" as string]: category?.color ?? "#6c3cf0" }}
                >
                  <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-base-300">
                    {photo?.url && (
                      <Image
                        src={photo.url}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 18vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    )}
                    {/* Soft vignette so photos with bright backgrounds sit on the dark card. */}
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-base-200/60 via-transparent to-transparent" />
                  </span>
                  <span className="flex flex-col gap-1.5 px-2 pb-2 pt-4">
                    {category && (
                      <span className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-base-content/60">
                        <span aria-hidden className="h-px w-5" style={{ background: category.color }} />
                        {category.name}
                      </span>
                    )}
                    <span className="text-lg font-bold leading-tight">{t.name}</span>
                    <span className="mt-1 flex items-center justify-between text-base-content/50">
                      <span className="flex gap-2.5 text-sm">
                        {t.instagram && <FaInstagram aria-label="Instagram" />}
                        {t.tiktok && <FaTiktok aria-label="TikTok" />}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider transition-colors group-hover:text-[var(--accent)]">
                        <span className="hidden sm:inline">Ver perfil </span>→
                      </span>
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {/* Profile modal */}
      <dialog ref={dialog} className="modal" aria-label={selected ? `Perfil de ${selected.name}` : "Perfil"} onClose={() => setSelected(null)}>
        <div className="modal-box relative grid w-[min(64rem,94vw)] max-w-none overflow-hidden rounded-3xl border border-base-300 bg-base-200 p-0 md:grid-cols-[2fr_3fr]">
          {/* Positioned out of the grid flow so photo and details keep their columns. */}
          <form method="dialog" className="absolute right-4 top-4 z-10">
            <button className="btn btn-circle btn-sm border-0 bg-black/50 text-white hover:bg-black/70" aria-label="Cerrar">
              <FiX aria-hidden className="text-lg" />
            </button>
          </form>
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[32rem]">
            {selPhoto?.url && (
              <Image src={selPhoto.url} alt={selected?.name ?? ""} fill sizes="(max-width: 768px) 94vw, 26rem" className="object-cover object-top" />
            )}
          </div>
          {selected && (
            <div className="flex flex-col justify-center p-8 md:p-12">
              {selCategory && (
                <span
                  className="self-start rounded-md px-3 py-1 text-xs font-bold uppercase"
                  style={{ backgroundColor: `${accent}26`, color: accent }}
                >
                  {selCategory.name}
                </span>
              )}
              <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{selected.name}</h2>
              <span aria-hidden className="mt-5 block h-0.5 w-full" style={{ background: accent }} />
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  { label: "Instagram", url: selected.instagram, Icon: FaInstagram },
                  { label: "TikTok", url: selected.tiktok, Icon: FaTiktok },
                ]
                  .filter((s) => s.url)
                  .map(({ label, url, Icon }) => (
                    <li key={label}>
                      <a
                        href={url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid grid-cols-[6.5rem_1fr] items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors hover:bg-white/5"
                        style={{ borderColor: `${accent}99` }}
                      >
                        <span className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: accent }}>
                          <Icon aria-hidden className="text-base" /> {label}
                        </span>
                        <span className="truncate">{shortUrl(url!)}</span>
                      </a>
                    </li>
                  ))}
              </ul>
              <p className="mt-8 text-xs text-base-content/40">influmedia · exclusive creators</p>
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Cerrar">Cerrar</button>
        </form>
      </dialog>
    </div>
  );
}
