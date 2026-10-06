"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Brand, CaseStudy, Category } from "@/payload-types";
import { CaseCard } from "@/components/cases/CaseCard";
import { BrandGrid } from "@/components/clients/BrandGrid";
import { CountUp } from "@/components/slides/CountUp";

const stats = [
  { value: 800, suffix: "", label: "Campañas" },
  { value: 100, suffix: "M", label: "Impresiones" },
  { value: 8, suffix: "", label: "Países" },
  { value: 500, suffix: "", label: "Creadores contratados" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Proof in one place: headline figures, case studies filterable by
// category, and the client logo grid (with its own industry filter).
export function Results({ cases, brands }: { cases: CaseStudy[]; brands: NonNullable<Brand["items"]> }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const categoryOf = (c: CaseStudy) => (c.category && typeof c.category === "object" ? (c.category as Category) : null);
  const categories = [...new Map(cases.flatMap((c) => (categoryOf(c) ? [[categoryOf(c)!.id, categoryOf(c)!]] : []))).values()];
  const visible = active ? cases.filter((c) => categoryOf(c)?.id === active) : cases;

  return (
    <section id="resultados" className="mx-auto w-full max-w-[96rem] scroll-mt-36 px-6 py-20 md:px-[4.7%] md:py-28">
      <p className="text-sm font-bold uppercase text-secondary md:text-base">Resultados</p>
      <h2 className="mt-3 max-w-[24ch] text-[clamp(2rem,3.4vw,3.6rem)] font-bold leading-tight">
        Escala y casos que ya hablan por nosotros.
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <li key={s.label} className="border-l-2 border-primary pl-5">
            <span className="block text-[clamp(2.2rem,3.6vw,3.6rem)] font-bold leading-none tabular-nums">
              <CountUp value={s.value} prefix="+" suffix={s.suffix} delay={0.1 * i} />
            </span>
            <span className="mt-2 block text-sm font-bold uppercase text-base-content/60">{s.label}</span>
          </li>
        ))}
      </ul>

      {cases.length > 0 && (
        <div className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-2xl font-bold">Casos de éxito</h3>
            {categories.length > 1 && (
              <div role="group" aria-label="Filtrar casos por categoría" className="flex flex-wrap gap-2">
                {[{ id: null, name: "Todos" }, ...categories].map((c) => (
                  <button
                    key={c.id ?? "all"}
                    type="button"
                    aria-pressed={active === c.id}
                    onClick={() => setActive(c.id)}
                    className="cursor-pointer rounded-full border border-base-300 px-4 py-1.5 text-sm font-bold transition-colors hover:border-secondary aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-content"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <motion.ul layout className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((c) => (
                <motion.li
                  layout
                  key={c.id}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <CaseCard item={c} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      )}

      <div className="mt-16">
        <h3 className="text-2xl font-bold">Marcas que confían en nosotros</h3>
        <BrandGrid brands={brands} />
      </div>
    </section>
  );
}
