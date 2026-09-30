"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Simulated real-time feed: applies `step` to the data every `interval` ms.
// Pauses while the tab is hidden and never ticks under reduced motion.
export function useLiveData<T>(initial: T, step: (current: T) => T, interval = 2200) {
  const [data, setData] = useState(initial);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setData(step);
    }, interval);
    return () => window.clearInterval(id);
    // `step` is a module-level function in every caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, reduce]);

  return data;
}

/** Random nudge of ±`amount`, kept within [min, max]. */
export const jitter = (value: number, amount: number, min = 0, max = Infinity) =>
  Math.min(max, Math.max(min, value + (Math.random() * 2 - 1) * amount));

export const formatCompact = (value: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
