"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin bar under the sticky header that fills as the article is read.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-[4.5rem] z-30 h-[3px] origin-left bg-gradient-to-r from-primary to-secondary"
    />
  );
}
