"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

// Wraps the article body and draws a thin bar under the sticky header that
// fills as the body is read: empty when its top reaches the header (72px), full
// when its last line reaches the bottom of the screen.
export function ReadingProgress({ children, className }: { children: ReactNode; className?: string }) {
  const body = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: body, offset: ["start 72px", "end end"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <>
      <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-[4.5rem] z-30 h-0.5 origin-left bg-accent-cycle" />
      <div ref={body} className={className}>
        {children}
      </div>
    </>
  );
}
