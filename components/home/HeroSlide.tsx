"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type TargetAndTransition, type Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Media, Talent } from "@/payload-types";

const EASE = [0.22, 1, 0.36, 1] as const;

// Entrance timeline (seconds): the copy first, then the calls to action,
// then the five talent panels one at a time.
const TEXT_AT = 0.2;
const TEXT_STEP = 0.15;
const CTA_AT = 1.05;
const PANELS_AT = 1.6;
const PANEL_STEP = 0.22;

const rise = (delay: number): Transition => ({ duration: 0.8, ease: EASE, delay });

const SLOTS = 5;
// Rotation: after the entrance, one random panel at a time swaps its talent
// for the next one in the queue, at random intervals.
const ROTATE_AFTER = PANELS_AT + SLOTS * PANEL_STEP + 2.5;
const SWAP_MIN = 1.6;
const SWAP_MAX = 4.2;
const SWAP_FADE = 1.2;

const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * Five visible slots fed by a queue. Each swap picks a random slot (never one
 * of the two changed last), puts the queue's head there and sends the
 * replaced talent to the back, so nobody shows twice on screen and everyone
 * in the pool cycles through before repeating.
 */
function useTalentRotation(talents: Talent[], enabled: boolean) {
  const [slots, setSlots] = useState(() => talents.slice(0, SLOTS));
  // Refs hold the source of truth so a swap reads and writes them once,
  // outside the state updater (which React may call twice in development).
  const shown = useRef(slots);
  const queue = useRef(talents.slice(SLOTS));
  const recent = useRef<number[]>([]);

  useEffect(() => {
    if (!enabled || queue.current.length === 0) return;
    let timer: ReturnType<typeof setTimeout>;

    const swap = () => {
      // Skip while the tab is hidden; try again on the next tick.
      if (!document.hidden) {
        const candidates = Array.from({ length: SLOTS }, (_, i) => i).filter((i) => !recent.current.includes(i));
        const slot = candidates[Math.floor(Math.random() * candidates.length)];
        recent.current = [slot, ...recent.current].slice(0, 2);
        const incoming = queue.current.shift();
        if (incoming) {
          queue.current.push(shown.current[slot]);
          shown.current = shown.current.map((t, i) => (i === slot ? incoming : t));
          setSlots(shown.current);
        }
      }
      timer = setTimeout(swap, randomBetween(SWAP_MIN, SWAP_MAX) * 1000);
    };

    timer = setTimeout(swap, (ROTATE_AFTER + randomBetween(0, 1.5)) * 1000);
    return () => clearTimeout(timer);
  }, [enabled]);

  return slots;
}

/** Talents with a photo, shuffled per visit by the page: the first five show, the rest wait in the queue. */
export function HeroSlide({ talents }: { talents: Talent[] }) {
  const reduce = useReducedMotion();
  const from = (state: TargetAndTransition) => (reduce ? false : state);
  const slots = useTalentRotation(talents, !reduce);

  return (
    // Pulled up under the transparent sticky header (4.5rem tall).
    <section className="relative isolate -mt-[4.5rem] flex min-h-[min(880px,100dvh)] w-full flex-col overflow-hidden bg-base-100 pt-[4.5rem]">
      {/* Talent lineup */}
      <div aria-hidden className="absolute inset-0 -z-10 grid grid-cols-5 gap-[3px]">
        {slots.map((t, i) => (
          <motion.div
            key={i}
            className="group relative overflow-hidden bg-[#140f1a]"
            initial={from({ opacity: 0, y: 40 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: PANELS_AT + i * PANEL_STEP }}
          >
            {/* Crossfade: the incoming talent fades in over the outgoing one. */}
            <AnimatePresence initial={false}>
              <motion.div
                key={t.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: SWAP_FADE, ease: EASE }}
              >
                <Image
                  src={media(t.thumbnail)!.url!}
                  alt=""
                  fill
                  priority={i < 3}
                  sizes="20vw"
                  className="object-cover object-[50%_18%] brightness-50 saturate-[.9] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:brightness-100 group-hover:saturate-100"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,8,16,.85)_0%,rgba(11,8,16,0)_16%,rgba(11,8,16,0)_40%,rgba(11,8,16,.97)_84%)]"
      />

      <div className="pointer-events-none mt-auto grid items-end gap-10 px-5 pb-12 md:px-[4%] lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-2">
          <motion.p
            className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase"
            initial={from({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={rise(TEXT_AT)}
          >
            Agencia de talentos — Centroamérica y el Caribe
          </motion.p>
          <h1 className="text-[clamp(2.1rem,5.6vw,5.1rem)] leading-[0.86] font-semibold tracking-[-0.055em]">
            {[
              <>Personas que</>,
              <>
                mueven <span className="text-accent-cycle">marcas.</span>
              </>,
            ].map((content, i) => (
              // Each line rises out of a clipped row.
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={from({ y: "110%" })}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EASE, delay: TEXT_AT + TEXT_STEP * (i + 1) }}
                >
                  {content}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="flex max-w-[380px] flex-col gap-5 pb-2">
          <motion.p
            className="leading-relaxed text-[#c9c2d2]"
            initial={from({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={rise(TEXT_AT + TEXT_STEP * 3)}
          >
            Integramos tu producto en la vida diaria de creadores, embajadores y comunidades. Planificado, controlado y medido como un medio.
          </motion.p>
          <motion.div
            className="pointer-events-auto flex flex-wrap items-center gap-2.5"
            initial={from({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={rise(CTA_AT)}
          >
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="btn btn-primary h-auto rounded-full border-0 px-6 py-3.5 text-sm font-semibold hover:bg-accent-cycle"
            >
              Planifica tu campaña
            </Link>
            <Link href="#casos" className="px-4 py-3.5 text-sm text-[#d6d0de] transition-colors hover:text-base-content">
              Ver casos →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
