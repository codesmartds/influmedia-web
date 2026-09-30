"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Children, type ReactNode } from "react";

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// Staggered entrance for a slide's items. The delay lets the page-level
// view transition settle before the items arrive.
export function StaggerList({
  children,
  className,
  delay = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      className={className}
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{ show: { transition: { delayChildren: delay, staggerChildren: 0.06 } } }}
    >
      {Children.map(children, (child) => (
        <motion.li variants={item} className="flex">
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}
