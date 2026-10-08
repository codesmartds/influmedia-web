"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useTransition } from "react";
import type { GalleryMoment, Media } from "@/payload-types";
import { FilterPicker, type Filter } from "@/components/layout/FilterPicker";
import { loadMoments } from "./actions";
import { categoryLabels, type GalleryCategory, type MediaFilter, type MomentsPage } from "./types";

// /galeria: the featured moment, a category + media filter, a gap-free mosaic
// fed page by page from the server (infinite scroll), and a full-screen viewer
// (photos and videos) with animated transitions.

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);
const formatMonth = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("es", { month: "short", year: "numeric", timeZone: "UTC" }).replace(".", "") : "";

/** Mosaic spans by position, so every row fills 12 columns whatever the filter. */
const PATTERN = [[7, 5], [4, 4, 4], [5, 7], [6, 6], [8, 4], [4, 4, 4], [4, 8]];
function spanAt(i: number, total: number) {
  let start = 0;
  let row = 0;
  while (start + PATTERN[row % PATTERN.length].length <= i) start += PATTERN[row++ % PATTERN.length].length;
  const cols = PATTERN[row % PATTERN.length];
  const left = total - start;
  return left < cols.length ? 12 / left : cols[i - start];
}
const spanClass: Record<number, string> = { 4: "lg:col-span-4", 5: "lg:col-span-5", 6: "lg:col-span-6", 7: "lg:col-span-7", 8: "lg:col-span-8", 12: "lg:col-span-12" };

function Meta({ m, withPlace = true, className = "" }: { m: GalleryMoment; withPlace?: boolean; className?: string }) {
  return (
    <span className={`font-mono text-[10px] tracking-[0.12em] uppercase ${className}`}>
      {[categoryLabels[m.category], withPlace && m.place, formatMonth(m.date)].filter(Boolean).join(" · ")}
    </span>
  );
}

/* Viewer: the media and its caption slide in the direction of travel */
function Viewer({
  m,
  index,
  total,
  direction,
  onStep,
  onClose,
}: {
  m: GalleryMoment;
  index: number;
  total: number;
  direction: number;
  onStep: (d: number) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const image = media(m.image);
  const video = media(m.video);
  const slide = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: `${direction * 6}%`, scale: 1.02 },
    animate: { opacity: 1, x: "0%", scale: 1 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: `${direction * -6}%`, scale: 0.98 },
  };
  return (
    <div className="flex h-full flex-col gap-4 p-[clamp(12px,3vw,32px)]">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[#8e86a0] uppercase">
          {pad(index + 1)} / {pad(total)} · {video?.url ? "Video" : "Foto"}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-base-content/20 text-lg transition-colors hover:bg-base-content/10"
        >
          ×
        </button>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div key={m.id} className="absolute inset-0 flex items-center justify-center" {...slide} transition={{ duration: 0.6, ease: EASE }}>
            {video?.url ? (
              <video src={video.url} poster={image?.url ?? undefined} controls autoPlay playsInline className="max-h-full max-w-full rounded-lg bg-black" />
            ) : (
              image?.url && (
                <div className="relative h-full w-full">
                  <Image src={image.url} alt={image.alt} fill sizes="100vw" className="rounded-lg object-contain" />
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={m.id}
            className="flex max-w-[760px] flex-col gap-2"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Meta m={m} className="text-accent-cycle" />
            <h2 id="moment-title" className="text-[clamp(26px,3.4vw,48px)] leading-none font-semibold tracking-[-0.045em]">
              {m.title}
            </h2>
            {m.description && <p className="text-[15px] leading-normal text-muted">{m.description}</p>}
          </motion.div>
        </AnimatePresence>
        {total > 1 && (
          <div className="flex gap-2">
            {[
              { d: -1, label: "Momento anterior", icon: "←" },
              { d: 1, label: "Momento siguiente", icon: "→" },
            ].map((b) => (
              <button
                key={b.d}
                type="button"
                onClick={() => onStep(b.d)}
                aria-label={b.label}
                className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-base-content/20 transition-colors hover:bg-base-content/10"
              >
                {b.icon}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function GalleryMoments({
  featured,
  firstPage,
  filters,
  hasVideos,
}: {
  featured: GalleryMoment | null;
  firstPage: MomentsPage;
  filters: Filter<GalleryCategory>[];
  hasVideos: boolean;
}) {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const sentinel = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<GalleryCategory | null>(null);
  const [kind, setKind] = useState<MediaFilter>("all");
  const [moments, setMoments] = useState(firstPage.docs);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(firstPage.hasNextPage);
  const [total, setTotal] = useState(firstPage.totalDocs);
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  // The featured moment opens on its own, outside the list.
  const [single, setSingle] = useState<GalleryMoment | null>(null);

  const activeFilter = filters.find((f) => f.id === category) ?? filters[0];

  /** Page 1 for new filters (replaces the list), or the next page (appends). */
  const fetchPage = (next: { page: number; category: GalleryCategory | null; kind: MediaFilter }) =>
    new Promise<GalleryMoment[]>((resolve) => {
      startTransition(async () => {
        const result = await loadMoments(next);
        const list = next.page === 1 ? result.docs : [...moments, ...result.docs];
        setMoments(list);
        setPage(next.page);
        setHasNext(result.hasNextPage);
        setTotal(result.totalDocs);
        resolve(list);
      });
    });

  const pickCategory = (c: GalleryCategory | null) => {
    setCategory(c);
    fetchPage({ page: 1, category: c, kind });
  };
  const pickKind = (k: MediaFilter) => {
    setKind(k);
    fetchPage({ page: 1, category, kind: k });
  };

  // Next page when the end of the grid comes within ~one screen.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasNext || pending) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) fetchPage({ page: page + 1, category, kind });
      },
      { rootMargin: "0px 0px 800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  });

  const show = (i: number) => {
    setSingle(null);
    setDirection(1);
    setOpen(i);
    dialog.current?.showModal();
  };
  const showFeatured = () => {
    if (!featured) return;
    setSingle(featured);
    setOpen(0);
    dialog.current?.showModal();
  };
  const step = async (d: number) => {
    if (single || open === null) return;
    setDirection(d);
    // Stepping past the last loaded moment loads the next page first.
    if (open + d >= moments.length && hasNext) {
      const list = await fetchPage({ page: page + 1, category, kind });
      setOpen(Math.min(open + d, list.length - 1));
      return;
    }
    setOpen((open + d + moments.length) % moments.length);
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const current = single ?? (open !== null ? moments[open] : null);
  const featuredImage = media(featured?.image);

  return (
    <>
      {featured && featuredImage?.url && (
        <section aria-label="Momento destacado" className="grid border-y border-base-300 lg:grid-cols-2">
          <button
            type="button"
            onClick={showFeatured}
            aria-haspopup="dialog"
            className="group relative block min-h-[clamp(320px,36vw,520px)] cursor-pointer overflow-hidden bg-[#140f1a]"
          >
            <Image
              src={featuredImage.url}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[50%_25%] brightness-[.72] transition-[filter,transform] duration-[1.4s] group-hover:scale-[1.03] group-hover:brightness-95"
            />
            {media(featured.video)?.url && (
              <span className="absolute bottom-[clamp(20px,3vw,32px)] left-[clamp(20px,3vw,32px)] flex items-center gap-3 font-mono text-[11px] tracking-[0.14em]">
                <span className="flex size-[52px] items-center justify-center rounded-full bg-base-content text-sm text-base-100">▶</span>
                VER VIDEO
              </span>
            )}
          </button>
          <div className="flex flex-col justify-between gap-8 bg-base-200 px-5 py-[clamp(2rem,5vw,4rem)] md:px-[4%]">
            <p className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">Momento destacado · {categoryLabels[featured.category]}</p>
            <div className="flex flex-col gap-[18px]">
              <span className="font-mono text-xs tracking-[0.14em] text-[#8e86a0] uppercase">
                {[featured.place, formatMonth(featured.date)].filter(Boolean).join(" · ")}
              </span>
              <h2 className="text-[clamp(2.2rem,4.4vw,4.2rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-balance">{featured.title}</h2>
              {featured.description && <p className="max-w-[460px] leading-relaxed text-muted">{featured.description}</p>}
            </div>
            <button
              type="button"
              onClick={showFeatured}
              className="cursor-pointer self-start rounded-full bg-base-content px-6 py-[15px] text-sm font-semibold text-base-100 transition-colors hover:bg-accent-cycle"
            >
              Ver el momento
            </button>
          </div>
        </section>
      )}

      {/* Filter bar, pinned under the site header */}
      <div className="sticky top-[4.5rem] z-20 border-b border-base-300 bg-base-100/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-[4%]">
          <p className="font-mono text-[11px] tracking-[0.14em] text-[#8e86a0] uppercase">
            {category ? categoryLabels[category] : "Archivo completo"} · {pad(total)} {total === 1 ? "pieza" : "piezas"}
          </p>
          <div className="flex items-center gap-3">
            {hasVideos && (
              <div role="group" aria-label="Tipo de archivo" className="flex gap-1 rounded-full border border-[#2a2233] p-1">
                {(
                  [
                    ["all", "Todo"],
                    ["photo", "Fotos"],
                    ["video", "Videos"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={kind === value}
                    onClick={() => pickKind(value)}
                    className={`cursor-pointer rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors ${
                      kind === value ? "bg-base-content text-base-100" : "text-[#a39bae] hover:text-base-content"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            <FilterPicker filters={filters} active={activeFilter} onPick={pickCategory} scrollTo="archivo" />
          </div>
        </div>
      </div>

      <section
        id="archivo"
        aria-busy={pending}
        className="mx-auto w-full max-w-[96rem] scroll-mt-36 px-5 pt-[clamp(28px,3vw,40px)] pb-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%]"
      >
        {moments.length === 0 && !pending ? (
          <p className="text-muted">No hay momentos con este filtro.</p>
        ) : (
          <motion.ul
            layout={!reduce}
            className={`grid auto-rows-[clamp(220px,20vw,300px)] grid-cols-2 gap-[3px] transition-opacity lg:grid-cols-12 ${pending && page === 1 ? "opacity-60" : ""}`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {moments.map((m, i) => {
                const image = media(m.image);
                return (
                  <motion.li
                    key={m.id}
                    layout={!reduce}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    // Small screens: every third tile spans both columns.
                    className={`${i % 3 === 0 ? "col-span-2" : ""} ${spanClass[spanAt(i, moments.length)]}`}
                  >
                    <button
                      type="button"
                      onClick={() => show(i)}
                      aria-haspopup="dialog"
                      className="group relative block h-full w-full cursor-pointer overflow-hidden bg-[#140f1a] text-left"
                    >
                      {image?.url && (
                        <Image
                          src={image.url}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover object-[50%_25%] brightness-[.6] saturate-[.9] transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
                        />
                      )}
                      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,8,16,.9)_0%,rgba(11,8,16,0)_50%)]" />
                      <span className="absolute top-3.5 right-4 left-4 flex items-center justify-between font-mono text-[10.5px] tracking-[0.1em] text-[#d6d0de]">
                        {pad(i + 1)}
                        {media(m.video)?.url && (
                          <span className="rounded-full bg-base-100/60 px-2.5 py-[5px] backdrop-blur-md">▶ VIDEO</span>
                        )}
                      </span>
                      <span className="absolute right-4 bottom-4 left-4 flex flex-col gap-[7px]">
                        <Meta m={m} withPlace={false} className="text-accent-cycle" />
                        <span className="font-display text-[clamp(19px,1.7vw,26px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">{m.title}</span>
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        )}
        {hasNext && (
          <div ref={sentinel} aria-live="polite" className="flex justify-center pt-10 font-mono text-[11px] tracking-[0.14em] text-[#6f6880] uppercase">
            Cargando más momentos · {pad(moments.length)} de {pad(total)}
          </div>
        )}
      </section>

      <dialog
        ref={dialog}
        onClose={() => {
          setOpen(null);
          setSingle(null);
        }}
        aria-labelledby="moment-title"
        className="m-0 h-dvh max-h-none w-screen max-w-none overscroll-contain bg-transparent p-0 text-base-content backdrop:bg-[rgba(8,6,12,.94)] backdrop:backdrop-blur-xl"
      >
        {current && open !== null && (
          <motion.div className="h-full" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            <Viewer m={current} index={single ? 0 : open} total={single ? 1 : total} direction={direction} onStep={step} onClose={close} />
          </motion.div>
        )}
      </dialog>
    </>
  );
}

