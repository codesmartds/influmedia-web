"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Brand, Media } from "@/payload-types";

type BrandItem = NonNullable<Brand["items"]>[number];
type Industry = NonNullable<BrandItem["industry"]>;

const industries: { value: Industry; label: string; className: string }[] = [
  { value: "fmcg", label: "FMCG", className: "bg-[#fbe7f1] text-[#6b2d52]" },
  { value: "beauty", label: "Beauty", className: "bg-[#e3f3fd] text-[#1f4f79]" },
  { value: "retail", label: "Retail", className: "bg-[#ece8fd] text-[#4b2a9c]" },
  { value: "entertainment", label: "Entertainment", className: "bg-[#e5f7ee] text-[#1f6b45]" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function BrandGrid({ brands }: { brands: BrandItem[] }) {
  const [active, setActive] = useState<Industry | null>(null);
  const [filtered, setFiltered] = useState(false);
  const reduce = useReducedMotion();
  const visible = active ? brands.filter((brand) => brand.industry === active) : brands;

  return (
    <div className="flex flex-1 flex-col">
      {brands.length === 0 ? (
        <p className="mt-10 text-base-content/60">Aún no hay marcas cargadas. Agrégalas en el admin, en Contenido › Marcas.</p>
      ) : (
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-[2%] lg:grid-cols-6 lg:gap-x-[2.2%] lg:gap-y-[1.8vw] lg:pr-[3.5%]">
          <AnimatePresence mode="popLayout" initial={!reduce}>
            {visible.map((brand, index) => {
              const image = typeof brand.image === "object" ? (brand.image as Media) : null;
              return (
                <motion.li
                  layout
                  key={brand.id ?? brand.name}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25, ease: EASE } }}
                  // Staggered delay only for the first entrance; filter changes react immediately.
                  transition={{ duration: 0.45, ease: EASE, delay: filtered ? 0 : index * 0.04 }}
                  className="relative aspect-[1.7] overflow-hidden rounded-2xl border-2 border-white/60 bg-white shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
                >
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || brand.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-contain p-[9%]"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-bold text-[#14102b]">
                      {brand.name}
                    </span>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
      {brands.length > 0 && visible.length === 0 && (
        <p className="mt-6 text-base-content/60">Aún no hay marcas en esta industria.</p>
      )}

      <motion.div
        className="mt-8 flex flex-wrap gap-3 md:mt-auto md:gap-[1.2%] md:px-[0.7%] md:pt-[3%]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: EASE, delay: 0.4 }}
        role="group"
        aria-label="Filtrar por industria"
      >
        {industries.map((industry) => {
          const pressed = active === industry.value;
          return (
            <button
              key={industry.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => {
                setFiltered(true);
                setActive(pressed ? null : industry.value);
              }}
              className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-bold uppercase transition md:text-[clamp(0.85rem,1.15vw,1.2rem)] ${industry.className} ${
                active && !pressed ? "opacity-45" : ""
              } ${pressed ? "ring-2 ring-white ring-offset-2 ring-offset-base-100" : ""}`}
            >
              {industry.label}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
