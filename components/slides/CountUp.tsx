"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Seconds before counting starts, to line up with the Reveal entrance. */
  delay?: number;
};

// Counts from 0 to `value` once on mount. Server-renders the final value,
// so the number is correct without JavaScript and for reduced motion.
export function CountUp({ value, prefix = "", suffix = "", delay = 0.5 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    const controls = animate(0, value, {
      delay,
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [value, prefix, suffix, delay, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
