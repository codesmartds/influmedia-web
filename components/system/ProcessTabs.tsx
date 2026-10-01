"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { FiArrowDown } from "react-icons/fi";
import { TbCaretRightFilled } from "react-icons/tb";
import { stages, type StageSlug } from "./stages";

// Per-stage accent, in the same order as `stages`.
const accents = [
  { number: "text-primary", button: "bg-primary", ring: "ring-primary" },
  { number: "text-secondary", button: "bg-secondary", ring: "ring-secondary" },
  { number: "text-accent", button: "bg-accent", ring: "ring-accent" },
];

// The three stage cards act as tabs; the selected stage's detail renders
// below. Only the active panel is mounted, so its entrance animation and
// live dashboards start when it's chosen.
export function ProcessTabs({ panels }: { panels: Record<StageSlug, ReactNode> }) {
  const [active, setActive] = useState<StageSlug>("planning");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + stages.length) % stages.length;
    setActive(stages[next].slug);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Etapas del proceso"
        className="mt-8 grid gap-6 px-6 md:mt-[3%] md:grid-cols-3 md:gap-[2.6vw] md:px-[5.5%] md:pr-[11.5%]"
      >
        {stages.map((stage, index) => {
          const selected = stage.slug === active;
          return (
            <button
              key={stage.slug}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              id={`tab-${stage.slug}`}
              aria-selected={selected}
              aria-controls={`panel-${stage.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(stage.slug)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`relative flex cursor-pointer flex-col rounded-2xl border-2 bg-white px-8 pb-8 pt-9 text-left text-[#14102b] transition-[transform,opacity,box-shadow] md:px-[8%] md:pb-[7%] md:pt-[9%] ${
                selected
                  ? `border-white opacity-100 ring-4 ring-offset-4 ring-offset-base-100 ${accents[index].ring}`
                  : "border-white/70 opacity-70 hover:-translate-y-1 hover:opacity-100"
              }`}
            >
              <span className={`text-2xl font-bold md:text-[clamp(1.2rem,1.65vw,1.8rem)] ${accents[index].number}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-5 text-4xl font-bold uppercase md:text-[clamp(2rem,2.6vw,2.9rem)]">{stage.title}</span>
              <span className="mt-6 max-w-[18ch] text-xl leading-snug text-[#5b5870] md:text-[clamp(1.1rem,1.6vw,1.75rem)]">
                {stage.text}
              </span>
              <span
                className={`mt-8 inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-8 py-3 text-sm font-bold uppercase text-white md:text-[clamp(0.8rem,1.05vw,1.15rem)] ${accents[index].button}`}
              >
                {selected ? "Viendo etapa" : "Ver etapa"} <FiArrowDown aria-hidden />
              </span>

              {index < stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-full top-1/2 z-10 hidden -translate-y-1/2 items-center text-[#cfc8e6] md:-ml-[0.3vw] md:flex"
                >
                  <span className="h-0.5 w-4 bg-current md:w-[1.1vw]" />
                  <TbCaretRightFilled className="-ml-2 text-3xl md:text-[clamp(1.6rem,2.3vw,2.5rem)]" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        key={active}
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="mt-14 flex flex-col gap-20 focus:outline-none md:mt-20 md:gap-28"
      >
        {panels[active]}
      </div>
    </div>
  );
}
