"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// "Una campaña, tres momentos": stage tabs, then the stage's lead and points.
// On a switch the marker slides to the new tab, the old content fades out and
// the new one enters through Reveal.

const stages = [
  {
    name: "Planning",
    lead: "La etapa donde reducimos la incertidumbre antes de activar.",
    points: ["Análisis de perfil y afinidad de audiencia", "Autenticidad y patrones de crecimiento", "Impacto publicitario y proyecciones de campaña"],
  },
  {
    name: "Onway",
    lead: "Detectamos desvíos mientras todavía se pueden corregir.",
    points: ["Monitoreo de resultados en tiempo real", "Calendarización de influenciadores", "Alertas de actividad sospechosa"],
  },
  {
    name: "Postbuy",
    lead: "Cerramos la campaña con lectura, no solo con un PDF de métricas.",
    points: ["Reportes profesionales e insight de campaña", "Métricas de negocio: CPE, ROI, EM, VMG", "Métricas por post y listening"],
  },
];

export function MethodStages() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  const reduce = useReducedMotion();

  return (
    <>
      <div role="tablist" aria-label="Momentos de la campaña" className="grid grid-cols-1 border-t border-[#2c2436] sm:grid-cols-3">
        {stages.map((s, i) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className="relative cursor-pointer border-b border-[#2c2436] py-4 pl-4 text-left sm:border-0 sm:py-6 sm:pr-6 sm:pl-0"
          >
            {/* Active marker: left bar on phones, top line from sm up. */}
            {i === active && (
              <motion.span
                layoutId="method-tab-marker"
                transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-3 left-0 w-0.5 bg-accent-cycle sm:inset-y-auto sm:-top-px sm:right-6 sm:h-0.5 sm:w-auto"
              />
            )}
            <span
              className="font-display text-[clamp(26px,2.86vw,40px)] font-medium tracking-[-0.04em] transition-colors duration-500"
              style={{ color: i === active ? "#f2eef6" : "#5f576b" }}
            >
              {s.name}
            </span>
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={stage.name} exit={reduce ? undefined : { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } }}>
            <Reveal className="flex flex-col gap-12" delay={0} stagger={0.12}>
              <RevealItem as="p" className="max-w-[22ch] text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-[-0.035em] text-balance">
                {stage.lead}
              </RevealItem>
              <RevealItem as="ul" effect="fade" stagger className="grid gap-x-10 gap-y-6 sm:grid-cols-3">
                {stage.points.map((p) => (
                  <RevealItem as="li" key={p} className="flex gap-3 border-b border-[#2c2436] pb-5 text-[clamp(17px,1.4vw,20px)] leading-snug text-[#d6d0de]">
                    <span aria-hidden className="mt-[0.45em] size-2 shrink-0 rounded-full bg-accent-cycle" />
                    {p}
                  </RevealItem>
                ))}
              </RevealItem>
            </Reveal>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
