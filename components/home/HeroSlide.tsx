"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "motion/react";
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

const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);

/** Five talents, picked at random per visit by the page. */
export function HeroSlide({ talents }: { talents: Talent[] }) {
  const reduce = useReducedMotion();
  const from = (state: TargetAndTransition) => (reduce ? false : state);

  return (
    // Pulled up under the transparent sticky header (4.5rem tall).
    <section className="relative isolate -mt-[4.5rem] flex min-h-[min(880px,100dvh)] w-full flex-col overflow-hidden bg-base-100 pt-[4.5rem]">
      {/* Talent lineup */}
      <div aria-hidden className="absolute inset-0 -z-10 grid grid-cols-5 gap-[3px]">
        {talents.map((t, i) => {
          const photo = media(t.thumbnail);
          return (
            <motion.div
              key={t.id}
              className="group relative overflow-hidden bg-[#140f1a]"
              initial={from({ opacity: 0, y: 40 })}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: PANELS_AT + i * PANEL_STEP }}
            >
              {photo?.url && (
                <Image
                  src={photo.url}
                  alt=""
                  fill
                  priority={i < 3}
                  sizes="20vw"
                  className="object-cover object-[50%_18%] brightness-50 saturate-[.9] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:brightness-100 group-hover:saturate-100"
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,8,16,.85)_0%,rgba(11,8,16,0)_16%,rgba(11,8,16,0)_40%,rgba(11,8,16,.97)_84%)]"
      />

      <div className="pointer-events-none mt-auto grid items-end gap-10 px-5 pb-12 md:px-[4%] lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-2">
          <motion.p
            className="font-mono text-xs tracking-[0.16em] text-secondary uppercase"
            initial={from({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={rise(TEXT_AT)}
          >
            Agencia de medios — Centroamérica y el Caribe
          </motion.p>
          <h1 className="text-[clamp(2.1rem,5.6vw,5.1rem)] leading-[0.86] font-semibold tracking-[-0.055em]">
            {[
              <>Personas que</>,
              <>
                mueven <span className="text-secondary">marcas.</span>
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
              className="btn btn-primary h-auto rounded-full border-0 px-6 py-3.5 text-sm font-semibold hover:bg-secondary"
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
