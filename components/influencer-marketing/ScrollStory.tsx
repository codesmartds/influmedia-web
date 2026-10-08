"use client";

import Image, { type StaticImageData } from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

// Scroll-driven sections of /influencer-marketing. On large screens the
// section is several viewports tall and its content stays pinned under the
// header while scrolling advances the active item; on small screens every
// item is listed open and no pinning happens.

export type StoryImage = string | StaticImageData;

/** Active index (0..count-1) and overall progress (0..1) of a tall section. */
function useScrollStep(count: number) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [state, setState] = useState({ index: 0, progress: 0 });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(count - 1, Math.floor(v * count));
    setState((s) => (s.index === index && Math.abs(s.progress - v) < 0.004 ? s : { index, progress: v }));
  });
  return { ref, ...state };
}

/** Scrolls the window to the middle of item `k`'s stretch of the section. */
function goTo(el: HTMLElement | null, k: number, count: number) {
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * ((k + 0.5) / count), behavior: reduce ? "auto" : "smooth" });
}

function Fill({ progress }: { progress: number }) {
  return (
    <div className="h-0.5 bg-[#2a2233]">
      <div className="h-full bg-secondary" style={{ width: `${(progress * 100).toFixed(1)}%` }} />
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/* Servicios 360° */
export type Service = { title: string; text: string; items: string[]; image: StoryImage };

export function ServicesStory({ eyebrow, title, services }: { eyebrow: ReactNode; title: ReactNode; services: Service[] }) {
  const { ref, index, progress } = useScrollStep(services.length);
  const current = services[index];

  return (
    <section ref={ref} id="servicios" className="relative scroll-mt-[4.5rem] border-t border-base-300 lg:h-[400vh]">
      <div className="grid items-center gap-[clamp(2rem,5vw,4.5rem)] px-5 py-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%] lg:sticky lg:top-[4.5rem] lg:h-[calc(100dvh-4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:py-[clamp(2rem,6vh,4.5rem)]">
        <div className="flex min-w-0 flex-col gap-[clamp(14px,3vh,28px)]">
          <div className="flex flex-col gap-[clamp(10px,2vh,22px)]">
            {eyebrow}
            {title}
          </div>
          <div className="flex flex-col">
            <div className="max-lg:hidden">
              <Fill progress={progress} />
            </div>
            {services.map((s, k) => {
              const on = k === index;
              return (
                <div key={s.title} className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 border-b border-base-300 py-[clamp(8px,2vh,20px)]">
                  <span className={`pt-[clamp(4px,1vh,12px)] font-mono text-[13px] transition-colors duration-300 ${on ? "text-secondary" : "text-[#5f576b] max-lg:text-secondary"}`}>
                    {pad(k + 1)}
                  </span>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => goTo(ref.current, k, services.length)}
                      className={`cursor-pointer text-left font-display text-[clamp(22px,min(3.02vw,4.62vh),44px)] leading-none font-medium tracking-[-0.045em] transition-colors duration-300 ${on ? "text-base-content" : "text-[#5f576b] max-lg:text-base-content"}`}
                    >
                      {s.title}
                    </button>
                    <div className={`flex flex-col gap-[clamp(6px,1.4vh,14px)] pt-0.5 ${on ? "" : "lg:hidden"}`}>
                      <p className="text-[clamp(14px,2.2vh,16px)] leading-normal text-[#c9c2d2]">{s.text}</p>
                      <ul className="flex flex-wrap gap-2">
                        {s.items.map((it) => (
                          <li key={it} className="rounded-full border border-secondary/40 px-3 py-[clamp(5px,1vh,8px)] text-[clamp(12px,1.9vh,14px)] text-[#e6e0ee]">
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div aria-hidden className="relative min-h-0 self-stretch overflow-hidden rounded-[20px] bg-[#140f1a] max-lg:hidden">
          {services.map((s, k) => (
            <Image
              key={s.title}
              src={s.image}
              alt=""
              fill
              sizes="45vw"
              className="object-cover object-[50%_25%] transition-[opacity,transform] ease-out [transition-duration:.7s,1.6s]"
              style={{ opacity: k === index ? 1 : 0, transform: `scale(${k === index ? 1.04 : 1})` }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,8,16,.9)_0%,rgba(11,8,16,0)_45%)]" />
          <div className="absolute right-7 bottom-[26px] left-7 flex items-end justify-between gap-4">
            <span className="font-display text-[clamp(26px,2.52vw,34px)] leading-none font-semibold tracking-[-0.045em]">{current.title}</span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-secondary">
              {pad(index + 1)} / {pad(services.length)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Proceso */
export type Step = { title: string; phase: string; text: string; deliverables: string[]; image: StoryImage };

export function ProcessStory({ eyebrow, steps }: { eyebrow: ReactNode; steps: Step[] }) {
  const { ref, index, progress } = useScrollStep(steps.length);
  const step = steps[index];

  return (
    <section ref={ref} id="proceso" className="relative scroll-mt-[4.5rem] border-t border-base-300 bg-base-200 lg:h-[500vh]">
      {/* Small screens: plain list of the five steps */}
      <div className="flex flex-col gap-8 px-5 py-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%] lg:hidden">
        {eyebrow}
        <ol className="flex flex-col border-t border-[#2c2436]">
          {steps.map((s, k) => (
            <li key={s.title} className="flex flex-col gap-3 border-b border-[#2c2436] py-7">
              <span className="flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-[#8e86a0]">
                PASO {pad(k + 1)} / {pad(steps.length)}
                <span className="rounded-full border border-secondary/45 px-2.5 py-1 text-secondary">{s.phase}</span>
              </span>
              <h3 className="text-[clamp(28px,8vw,44px)] leading-[0.9] font-semibold tracking-[-0.05em]">{s.title}</h3>
              <p className="leading-relaxed text-[#c9c2d2]">{s.text}</p>
              <p className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase">Entregamos: {s.deliverables.join(" · ")}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Large screens: pinned, advanced by scroll */}
      <div className="sticky top-[4.5rem] hidden h-[calc(100dvh-4.5rem)] grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] overflow-hidden lg:grid">
        <div className="flex min-w-0 flex-col justify-between gap-[clamp(12px,2.6vh,28px)] px-[4%] py-[clamp(24px,6vh,72px)]">
          <div className="flex flex-col gap-[clamp(10px,2vh,22px)]">
            {eyebrow}
            <div className="relative flex flex-wrap gap-x-[26px] gap-y-1.5 pb-[clamp(8px,1.6vh,16px)]">
              {steps.map((s, k) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => goTo(ref.current, k, steps.length)}
                  className="flex cursor-pointer items-center gap-[9px] text-[15px] transition-colors duration-400"
                  style={{ color: k === index ? "#f2eef6" : k < index ? "#a39bae" : "#4a4255" }}
                >
                  <span className="size-2 rounded-full transition-colors duration-400" style={{ background: k <= index ? "#b79bdb" : "#2a2233" }} />
                  {s.title}
                </button>
              ))}
              <div className="absolute inset-x-0 bottom-0">
                <Fill progress={progress} />
              </div>
            </div>
          </div>
          <div aria-live="polite" className="flex flex-col gap-[clamp(10px,2vh,22px)]">
            <div className="flex items-center gap-3.5 font-mono text-xs tracking-[0.14em]">
              <span className="text-[#8e86a0]">
                PASO {pad(index + 1)} / {pad(steps.length)}
              </span>
              <span className="rounded-full border border-secondary/45 px-2.5 py-[5px] text-secondary">{step.phase}</span>
            </div>
            <h3 className="text-[clamp(26px,min(6vw,9vh),91px)] leading-[0.85] font-semibold tracking-[-0.06em]">{step.title}</h3>
            <p className="max-w-[520px] text-[clamp(15px,2.4vh,18px)] leading-normal text-[#c9c2d2]">{step.text}</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#8e86a0]">ENTREGAMOS</span>
            <ul className="flex flex-col border-t border-[#2c2436]">
              {step.deliverables.map((d) => (
                <li
                  key={d}
                  className="border-b border-[#2c2436] py-[clamp(5px,1.4vh,12px)] font-display text-[clamp(15px,min(1.8vw,2.4vh),22px)] font-medium tracking-[-0.02em]"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div aria-hidden className="relative overflow-hidden bg-[#140f1a]">
          {steps.map((s, k) => (
            <Image
              key={s.title}
              src={s.image}
              alt=""
              fill
              sizes="40vw"
              className="object-cover object-[50%_25%] transition-opacity duration-700"
              style={{ opacity: k === index ? 1 : 0 }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#100c16_0%,rgba(16,12,22,0)_30%)]" />
          <span className="absolute right-7 bottom-6 font-display text-[clamp(48px,7.2vw,108px)] leading-[0.8] font-semibold tracking-[-0.06em] text-base-content/90">
            {pad(index + 1)}
          </span>
        </div>
      </div>
    </section>
  );
}
