"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Media, Talent } from "@/payload-types";

// 3 × 2 talent grid on /nosotros. Each cell keeps its talent for 1–2 s, then
// takes the next one from a shared queue; cells run on independent timers, so
// several can change at once. The queue keeps faces unique on screen and
// cycles the whole pool before anyone repeats.

const CELLS = 6;
const DWELL_MIN = 1000;
const DWELL_MAX = 2000;
const FADE = 0.7;

const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);
const dwell = () => DWELL_MIN + Math.random() * (DWELL_MAX - DWELL_MIN);

export function TalentGrid({ talents }: { talents: Talent[] }) {
  const reduce = useReducedMotion();
  const [cells, setCells] = useState(() => talents.slice(0, CELLS));
  const shown = useRef(cells);
  const queue = useRef(talents.slice(CELLS));

  useEffect(() => {
    if (reduce || queue.current.length === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const swap = (cell: number) => {
      if (!document.hidden) {
        const incoming = queue.current.shift();
        if (incoming) {
          queue.current.push(shown.current[cell]);
          shown.current = shown.current.map((t, i) => (i === cell ? incoming : t));
          setCells(shown.current);
        }
      }
      timers[cell] = setTimeout(() => swap(cell), dwell());
    };

    for (let cell = 0; cell < CELLS; cell++) timers[cell] = setTimeout(() => swap(cell), dwell());
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <div aria-hidden className="grid min-h-[420px] grid-cols-3 grid-rows-2 gap-[3px]">
      {cells.map((t, i) => (
        <div key={i} className="relative overflow-hidden bg-[#140f1a]">
          <AnimatePresence initial={false}>
            <motion.div
              key={t.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE, ease: "easeOut" }}
            >
              <Image src={media(t.thumbnail)!.url!} alt="" fill sizes="(max-width: 1024px) 33vw, 17vw" className="object-cover object-[50%_18%] brightness-[.6]" />
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
