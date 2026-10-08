"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

// Content entrance for every section. The page-level <ViewTransition> moves
// the page as a whole; Reveal brings each block in piece by piece as it
// scrolls into view.
//
//   <Reveal>                       root: starts the sequence when in view
//     <RevealItem>…</RevealItem>   each child enters in order
//     <RevealItem stagger>         an item can also stagger its own children
//       <RevealItem effect="scale">…</RevealItem>
//     </RevealItem>
//   </Reveal>

const EASE = [0.22, 1, 0.36, 1] as const;

const effects = {
  up: { opacity: 0, y: 24 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.94 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  // Lines and bars that grow from their start; pair with origin-left.
  draw: { opacity: 0, scaleX: 0 },
  // Same, vertically; pair with origin-top.
  drawY: { opacity: 0, scaleY: 0 },
} as const;

export type RevealEffect = keyof typeof effects;

// Fixed map so motion components are created once, not per render.
const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type Tag = keyof typeof tags;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Seconds before the first item, once the block is in view. */
  delay?: number;
  /** Seconds between consecutive items. */
  stagger?: number;
};

export function Reveal({ children, className, as = "div", delay = 0.1, stagger = 0.08 }: RevealProps) {
  const reduce = useReducedMotion();
  const Component = tags[as];

  return (
    <Component
      className={className}
      initial={reduce ? false : "hidden"}
      // Starts when the block scrolls into view (once), so sections further
      // down a landing page animate when reached, not on page load.
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ show: { transition: { delayChildren: delay, staggerChildren: stagger } } }}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children?: ReactNode;
  className?: string;
  /** For data-driven values Tailwind can't express, e.g. a computed `left`. */
  style?: CSSProperties;
  as?: Tag;
  effect?: RevealEffect;
  /** Also stagger this item's own RevealItem children, after it enters. */
  stagger?: number | boolean;
};

export function RevealItem({ children, className, style, as = "div", effect = "up", stagger }: RevealItemProps) {
  const Component = tags[as];
  const staggerChildren = stagger === true ? 0.08 : stagger || undefined;

  const variants: Variants = {
    hidden: effects[effect],
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      transition: {
        duration: effect === "draw" || effect === "drawY" ? 0.9 : 0.55,
        ease: EASE,
        ...(staggerChildren && { delayChildren: 0.15, staggerChildren }),
      },
    },
  };

  return (
    <Component className={className} style={style} variants={variants}>
      {children}
    </Component>
  );
}
