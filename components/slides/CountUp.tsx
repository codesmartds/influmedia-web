"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Digits after the decimal point, e.g. 2 for 5.69. */
  decimals?: number;
  /** Seconds before counting starts, to line up with the Reveal entrance. */
  delay?: number;
};

// Counts from 0 to `value` once, when it scrolls into view. Server-renders the final value,
// so the number is correct without JavaScript and for reduced motion.
export function CountUp({ value, prefix = "", suffix = "", decimals = 0, delay = 0.5 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce || !inView) return;
    const controls = animate(0, value, {
      delay,
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [value, prefix, suffix, decimals, delay, reduce, inView]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
