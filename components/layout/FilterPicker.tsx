"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

// Shared filter control (creators roster, blog): one compact button, and a
// full-screen panel listing every option with its count.

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export type Filter<T extends string | number> = { id: T | null; name: string; count: number };

/**
 * Filter button that opens every option full screen. Picking one closes the
 * panel and scrolls back to the top of `scrollTo` (the list it filters).
 */
export function FilterPicker<T extends string | number>({
  filters,
  active,
  onPick,
  scrollTo,
  label = "Categoría",
  title = "Filtrar por categoría",
}: {
  filters: Filter<T>[];
  active: Filter<T>;
  onPick: (id: T | null) => void;
  scrollTo?: string;
  label?: string;
  title?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };
  const pick = (id: T | null) => {
    onPick(id);
    dialog.current?.close();
    // Back to the top of the list, wherever the page was.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (scrollTo) document.getElementById(scrollTo)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={show}
        className="flex cursor-pointer items-center gap-3 rounded-full border border-base-content/25 py-2.5 pr-4 pl-5 text-[15px] transition-colors hover:border-base-content/60"
      >
        <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase max-sm:hidden">{label}</span>
        <span className="font-medium">{active.name}</span>
        <span className="font-mono text-[11px] text-accent-cycle">{pad(active.count)}</span>
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
              <h2 id="category-title" className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">
                {title}
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
                      <span className={`font-mono text-sm tracking-[0.06em] ${on ? "text-accent-cycle" : "text-[#4a4255]"}`}>{pad(f.count)}</span>
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
