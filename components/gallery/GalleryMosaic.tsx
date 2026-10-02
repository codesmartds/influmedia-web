"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from "react-icons/fi";
import type { Gallery, Media } from "@/payload-types";

type Item = NonNullable<Gallery["items"]>[number];
type Photo = { id: string; url: string; alt: string; caption?: string | null; brand?: string | null; featured: boolean };

const EASE = [0.22, 1, 0.36, 1] as const;

// Editorial mosaic with mixed tile sizes and a full-screen lightbox
// (arrows, ← → and Esc). Featured photos take the large tiles.
export function GalleryMosaic({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const photos: Photo[] = items.flatMap((item, i) => {
    const media = item.image && typeof item.image === "object" ? (item.image as Media) : null;
    if (!media?.url) return [];
    // No featured photos at all: alternate large tiles so the grid has rhythm.
    const anyFeatured = items.some((it) => it.featured);
    return [{
      id: item.id ?? String(i),
      url: media.url,
      alt: media.alt,
      caption: item.caption,
      brand: item.brand,
      featured: anyFeatured ? Boolean(item.featured) : i % 4 === 0,
    }];
  });

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  if (photos.length === 0) {
    return <p className="text-base-content/60">Aún no hay imágenes. Agrégalas en el admin, en Contenido › Galería.</p>;
  }

  const current = index === null ? null : photos[index];

  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-4 md:auto-rows-[11rem] md:grid-cols-4">
        {photos.map((photo, i) => (
          <motion.li
            key={photo.id}
            className={photo.featured ? "col-span-2 row-span-3" : "row-span-2"}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
          >
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`Ver ${photo.caption ?? photo.alt} en grande`}
              className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-base-300 bg-base-200 p-1.5 transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_24px_48px_-24px_#6c3cf0] focus-visible:border-primary focus-visible:outline-none"
            >
              <span className="relative block h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  sizes={photo.featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {photo.brand && <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-secondary">{photo.brand}</span>}
                  {photo.caption && <span className="text-sm font-bold">{photo.caption}</span>}
                  <FiMaximize2 aria-hidden className="absolute right-4 top-4 text-lg" />
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="modal bg-black/90 backdrop-blur-sm"
        aria-label="Visor de la galería"
        onClose={() => setIndex(null)}
      >
        <div className="relative flex h-dvh w-full flex-col items-center justify-center gap-4 p-4 md:p-10">
          <form method="dialog" className="absolute right-4 top-4 z-10">
            <button className="btn btn-circle border-0 bg-white/10 text-white hover:bg-white/20" aria-label="Cerrar">
              <FiX aria-hidden className="text-xl" />
            </button>
          </form>

          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current.id}
                className="relative h-[75dvh] w-full max-w-5xl"
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Image src={current.url} alt={current.alt} fill sizes="90vw" className="object-contain" />
              </motion.div>
            )}
          </AnimatePresence>

          {current && (
            <div className="flex w-full max-w-5xl items-center justify-between gap-4 text-white">
              <button type="button" onClick={() => step(-1)} className="btn btn-circle border-0 bg-white/10 text-white hover:bg-white/20" aria-label="Anterior">
                <FiChevronLeft aria-hidden className="text-xl" />
              </button>
              <p className="text-center">
                {current.caption && <span className="block font-bold">{current.caption}</span>}
                <span className="text-sm text-white/60 tabular-nums">
                  {index! + 1} / {photos.length}
                </span>
              </p>
              <button type="button" onClick={() => step(1)} className="btn btn-circle border-0 bg-white/10 text-white hover:bg-white/20" aria-label="Siguiente">
                <FiChevronRight aria-hidden className="text-xl" />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
