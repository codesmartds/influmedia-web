"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import hero from "@/public/images/home/hero.png";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SharedElement } from "@/components/transitions/PageTransition";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = { show: { transition: { delayChildren: 0.25, staggerChildren: 0.12 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
// Headline lines rise out of a clipped row, one after another.
const line: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

const headline = ["Influencer marketing", "que mueve", "conversaciones."];

export function HeroSlide() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Parallax: image drifts down and content fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    // Pulled up under the transparent sticky header (4.5rem tall).
    <section ref={section} className="relative isolate -mt-[4.5rem] flex min-h-dvh w-full overflow-hidden bg-base-100 pt-[4.5rem]">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 max-md:opacity-40"
        style={reduce ? undefined : { y: imageY }}
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {/* Full-slide composition; its background was cut out, so the left side is transparent. */}
        <Image src={hero} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-right" />
      </motion.div>

      <motion.div
        className="relative flex w-full min-w-0 flex-col px-6 py-10 md:w-[52%] md:px-[4%] md:py-[4.5%]"
        style={reduce ? undefined : { opacity: contentOpacity }}
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <motion.span
          variants={item}
          className="self-start rounded-full bg-secondary px-5 py-2 text-sm font-bold uppercase text-secondary-content md:ml-[3%] md:text-[clamp(0.8rem,1.1vw,1.1rem)]"
        >
          Agencia de influencer marketing
        </motion.span>

        <motion.div variants={item} className="mt-10 md:ml-[4%] md:mt-[7%]">
          <SharedElement name="brand-logo">
            <BrandLogo priority className="w-[70%] max-w-[480px]" sizes="(max-width: 768px) 70vw, 30vw" />
          </SharedElement>
        </motion.div>

        <div className="mt-auto pt-12">
          <motion.h1
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="text-[clamp(1.6rem,3.3vw,3.6rem)] font-bold uppercase leading-[1.12] tracking-tight md:whitespace-nowrap"
          >
            {headline.map((text) => (
              <span key={text} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={line} className="block">
                  {text}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p variants={item} className="mt-4 max-w-[42ch] text-[clamp(1rem,1.5vw,1.6rem)] leading-snug text-muted">
            Estrategia, creatividad y tecnología para conectar marcas con personas reales.
          </motion.p>

          {/* Brands are the primary path; creators get a visible second one. */}
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="btn btn-secondary h-auto w-full whitespace-nowrap rounded-lg px-10 py-4 text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold uppercase shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Quiero una campaña <FiArrowRight aria-hidden />
            </Link>
            <Link
              href="/creadores"
              transitionTypes={["nav-forward"]}
              className="btn btn-outline h-auto w-full whitespace-nowrap rounded-lg border-white/40 px-8 py-4 text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold uppercase hover:border-secondary hover:bg-transparent hover:text-secondary sm:w-auto"
            >
              Soy creador
            </Link>
          </motion.div>
          <motion.p variants={item} className="mt-6 text-[clamp(0.9rem,1.25vw,1.3rem)] font-bold uppercase text-secondary">
            #WeAreInflumedia
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
