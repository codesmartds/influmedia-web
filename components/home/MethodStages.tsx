"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { Media, Talent } from "@/payload-types";

// "Una campaña, tres momentos": stage tabs plus an animated demo panel per
// stage. Each panel loops on its own clock, restarted when the stage changes.

const stages = [
  {
    name: "Planning",
    time: "24–48 H",
    lead: "La etapa donde reducimos la incertidumbre antes de activar.",
    points: ["Análisis de perfil y afinidad de audiencia", "Autenticidad y patrones de crecimiento", "Impacto publicitario y proyecciones de campaña"],
  },
  {
    name: "Onway",
    time: "En campaña",
    lead: "Detectamos desvíos mientras todavía se pueden corregir.",
    points: ["Monitoreo de resultados en tiempo real", "Calendarización de influenciadores", "Alertas de actividad sospechosa"],
  },
  {
    name: "Postbuy",
    time: "48 H",
    lead: "Cerramos la campaña con lectura, no solo con un PDF de métricas.",
    points: ["Reportes profesionales e insight de campaña", "Métricas de negocio: CPE, ROI, EM, VMG", "Métricas por post y listening"],
  },
];

const LILAC = "var(--acc-tint)";
const TEAL = "#5fbfbf";
const PINK = "#d77fb4";

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
/** Fade and rise in as `p` goes from 0 to 1. */
const appear = (p: number): CSSProperties => ({ opacity: easeOut(p), transform: `translateY(${((1 - easeOut(p)) * 10).toFixed(1)}px)` });

const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);

/** "@usuario" from the Instagram URL, or from the name when there is none. */
function handle(t: Talent) {
  const fromUrl = t.instagram?.match(/instagram\.com\/([^/?#]+)/i)?.[1];
  return "@" + (fromUrl ?? t.name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, ""));
}

/** Seconds since mount (or since `key` changed). Frozen at `still` under reduced motion. */
function useClock(key: number, still: number) {
  const reduce = useReducedMotion();
  const [t, setT] = useState(reduce ? still : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      setT((performance.now() - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key, reduce]);
  return reduce ? still : t;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[16/11] min-h-[420px] overflow-hidden rounded-[20px] border border-base-content/10 font-mono text-base-content"
      // Inline: Tailwind drops an arbitrary background that mixes a gradient and a color.
      style={{ background: "radial-gradient(600px 300px at 0% 0%,color-mix(in srgb, var(--acc-tint) 18%, transparent),transparent 70%),#120d19" }}
    >
      {children}
    </div>
  );
}

function TopBar({ left, right, color }: { left: string; right: string; color: string }) {
  return (
    <div className="flex justify-between gap-2.5 text-[10px] tracking-[0.08em] whitespace-nowrap text-[#8e86a0]">
      <span className="min-w-0 truncate">{left}</span>
      <span className="shrink-0" style={{ color }}>
        {right}
      </span>
    </div>
  );
}

function PlanningPanel({ talent }: { talent?: Talent }) {
  const tt = useClock(0, 8) % 9;
  const photo = media(talent?.thumbnail);
  const criteria = [
    ["Edad", "18–34"],
    ["Ubicación", "GT · SV · HN"],
    ["Género", "F 58 · M 42"],
    ["Categorías", "Lifestyle"],
    ["Autenticidad", "Verificada"],
  ];
  const current = Math.floor((tt - 0.4) / 0.9);
  const score = easeOut((tt - 5) / 1.4);
  const done = tt > 6.6;

  return (
    <Frame>
      {photo?.url && (
        <div className="absolute inset-y-0 right-0 w-[62%]">
          <Image
            src={photo.url}
            alt=""
            fill
            sizes="(max-width: 1024px) 60vw, 30vw"
            className="object-cover object-[50%_18%]"
            style={{ filter: `brightness(${(0.4 + 0.55 * easeOut((tt - 0.2) / 6)).toFixed(3)}) saturate(.9)` }}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0810_0%,#0b0810_34%,rgba(11,8,16,.6)_58%,rgba(11,8,16,0)_82%),linear-gradient(0deg,rgba(11,8,16,.9)_0%,rgba(11,8,16,0)_40%)]" />
      <div className="absolute inset-0 flex flex-col justify-between gap-4 p-[26px]">
        <div className="flex justify-between gap-3 text-[11px] tracking-[0.14em] whitespace-nowrap text-[#8e86a0]">
          <span>LECTURA DE PERFIL{talent ? ` · ${handle(talent)}` : ""}</span>
          <span style={{ color: done ? "#f2eef6" : LILAC }}>{done ? "RECOMENDADO" : "ANALIZANDO"}</span>
        </div>
        <div className="flex max-w-[58%] flex-col gap-1">
          {criteria.map(([k, v], i) => {
            const state = i < current ? 1 : i === current ? 2 : 0;
            return (
              <div
                key={k}
                className="flex items-baseline gap-3 py-[7px] transition-[border-color] duration-400"
                style={{ borderBottom: `1px solid rgba(242,238,246,${state ? ".14" : ".06"})` }}
              >
                <span
                  className="font-display text-[clamp(17px,1.8vw,22px)] font-medium tracking-[-0.03em] whitespace-nowrap transition-colors duration-400"
                  style={{ color: state === 2 ? "#f2eef6" : state === 1 ? "#a39bae" : "#4a4255" }}
                >
                  {k}
                </span>
                <span
                  className="ml-auto min-w-0 truncate text-[11px] tracking-[0.08em] text-accent-cycle transition-opacity duration-400"
                  style={{ opacity: state ? 1 : 0 }}
                >
                  {v}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap items-end gap-[22px]" style={{ opacity: easeOut((tt - 4.8) / 0.4) }}>
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-[clamp(39px,4.2vw,62px)] leading-[0.85] font-semibold tracking-[-0.06em]">
              {Math.round(92 * score)}%
            </span>
            <span className="text-[11px] tracking-[0.14em] text-[#8e86a0]">AUDIENCIA REAL</span>
          </div>
          <div
            className="flex flex-col gap-1 pb-1 font-display text-[15px] whitespace-nowrap text-[#d6d0de]"
            style={{ opacity: easeOut((tt - 6) / 0.5) }}
          >
            <span>107K alcance estimado</span>
            <span>5.69% engagement rate</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// Posting days per row (0 = Monday); the third row raises an alert on Friday.
const schedule: { days: number[]; alertDay?: number }[] = [{ days: [1, 4] }, { days: [0, 3, 5] }, { days: [2, 4], alertDay: 4 }, { days: [1, 6] }];
const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

function OnwayPanel({ talents }: { talents: Talent[] }) {
  const t = useClock(1, 9);
  const tt = t % 10;
  const progress = clamp(tt / 7);
  const alertAt = 4.5;
  const fixed = tt > 7.6;
  const rows = talents.slice(0, 4).map((talent, i) => ({ talent, ...schedule[i] }));
  const flagged = rows.find((r) => r.alertDay !== undefined);
  const flaggedHandle = flagged ? handle(flagged.talent) : "";

  const dot = (row: (typeof rows)[number], day: number) => {
    if (!row.days.includes(day)) return null;
    const at = day + 0.5;
    const on = tt >= at;
    const isAlert = row.alertDay === day && !fixed;
    const scale = on ? 1 + 0.5 * Math.max(0, 1 - (tt - at) / 0.35) : 1;
    return (
      <span
        className="box-border size-3.5 rounded-full"
        style={{
          transform: `scale(${scale.toFixed(2)})`,
          border: on ? "none" : "1.5px dashed rgba(242,238,246,.32)",
          background: on ? (isAlert ? PINK : LILAC) : "transparent",
          boxShadow: on
            ? isAlert
              ? `0 0 0 ${(4 + 4 * Math.abs(Math.sin(t * 5))).toFixed(1)}px rgba(215,127,180,.25)`
              : "0 0 12px color-mix(in srgb, var(--acc-tint) 60%, transparent)"
            : "none",
        }}
      />
    );
  };

  return (
    <Frame>
      <div className="absolute inset-0 flex flex-col gap-4 p-[22px]">
        <TopBar left="COMMAND CENTER · SEMANA 2" right="● EN VIVO" color={`rgba(95,191,191,${(0.55 + 0.45 * Math.sin(t * 4)).toFixed(2)})`} />
        <div className="relative grid flex-1 grid-cols-[118px_repeat(7,minmax(0,1fr))] grid-rows-[20px_repeat(4,minmax(0,1fr))] items-center">
          <span />
          {dayLabels.map((d, i) => (
            <span key={i} className="text-center text-[10px] text-[#8e86a0]">
              {d}
            </span>
          ))}
          {rows.map((row) => {
            const photo = media(row.talent.thumbnail);
            return [
              <div key={`n${row.talent.id}`} className="flex min-w-0 items-center gap-2">
                {photo?.url && (
                  <Image src={photo.url} alt="" width={28} height={28} className="size-7 shrink-0 rounded-full object-cover object-[50%_20%]" />
                )}
                <span className="truncate text-[10px] text-[#d6d0de]">{handle(row.talent)}</span>
              </div>,
              ...dayLabels.map((_, day) => (
                <div key={`c${row.talent.id}-${day}`} className="flex h-full items-center justify-center border-l border-base-content/5">
                  {dot(row, day)}
                </div>
              )),
            ];
          })}
          {/* Playhead sweeping the week */}
          <div
            className="absolute inset-y-0 w-[1.5px] bg-accent-cycle shadow-[0_0_14px_color-mix(in_srgb,var(--acc-tint)_80%,transparent)]"
            style={{ left: `calc(118px + (100% - 118px) * ${progress.toFixed(4)})` }}
          />
        </div>
        <div className="flex min-h-[46px] items-end justify-between gap-3">
          <div className="flex shrink-0 flex-col gap-1 whitespace-nowrap">
            <span className="text-[9.5px] tracking-[0.1em] text-[#8e86a0]">IMPRESIONES</span>
            <span className="font-display text-2xl font-medium tracking-[-0.03em]">{Math.round(1284302 * easeOut(progress)).toLocaleString("es-GT")}</span>
          </div>
          {flagged && (
            <div
              className="flex max-w-[62%] items-center gap-2 rounded-[10px] px-3 py-2.5 text-[10px] tracking-[0.06em] backdrop-blur-md"
              style={{
                background: fixed ? "rgba(95,191,191,.14)" : "rgba(215,127,180,.14)",
                border: `1px solid ${fixed ? "rgba(95,191,191,.45)" : "rgba(215,127,180,.45)"}`,
                ...appear((tt - alertAt) / 0.4),
              }}
            >
              <span className="size-[7px] shrink-0 rounded-full" style={{ background: fixed ? TEAL : PINK }} />
              {fixed ? `RESUELTO · ${flaggedHandle} reprogramado tras revisión` : `ALERTA · Pico atípico de seguidores en ${flaggedHandle}`}
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}

const metrics: [string, number, (v: number) => string][] = [
  ["CPE", 0.04, (v) => "$" + v.toFixed(2)],
  ["ROI", 4.8, (v) => v.toFixed(1) + "x"],
  ["EM", 2.1, (v) => v.toFixed(1) + "M"],
  ["VMG", 86, (v) => "$" + Math.round(v) + "K"],
];
const insight = "Las piezas con el producto en uso retuvieron 2.3x más que las menciones directas.";

function PostbuyPanel() {
  const t = useClock(2, 10);
  const tt = t % 11;
  const typed = Math.floor(clamp((tt - 2.6) / 2.6) * insight.length);

  return (
    <Frame>
      <div className="absolute inset-0 flex flex-col gap-3.5 p-[22px]">
        <TopBar left="REPORTE POSTBUY" right={tt > 0.3 ? "● 48 H" : ""} color={TEAL} />
        <div className="grid grid-cols-2 gap-2">
          {metrics.map(([k, v, format], i) => (
            <div
              key={k}
              className="flex items-baseline justify-between gap-2.5 rounded-xl border border-base-content/10 bg-base-content/[.04] px-3.5 py-3"
              style={appear((tt - 0.2 - i * 0.3) / 0.4)}
            >
              <span className="text-[10.5px] tracking-[0.12em] text-[#a39bae]">{k}</span>
              <span className="font-display text-[28px] font-medium tracking-[-0.04em]">{format(v * easeOut((tt - 0.4 - i * 0.3) / 1.3))}</span>
            </div>
          ))}
        </div>
        <div
          className="flex flex-col gap-2 rounded-xl border border-[rgba(155,111,214,.3)] bg-[rgba(155,111,214,.12)] px-4 py-3.5"
          style={appear((tt - 2.2) / 0.4)}
        >
          <span className="text-[9.5px] tracking-[0.12em] text-accent-cycle">INSIGHT DE CAMPAÑA</span>
          <span className="min-h-[46px] font-display text-[17px] leading-[1.35]">
            {insight.slice(0, typed)}
            <span className="text-accent-cycle" style={{ opacity: Math.sin(t * 8) > 0 ? 1 : 0 }}>
              ▍
            </span>
          </span>
        </div>
        <div
          className="mt-auto max-w-full self-start truncate rounded-[10px] border border-[rgba(95,191,191,.4)] bg-[rgba(95,191,191,.12)] px-[13px] py-2.5 text-[10px] tracking-[0.08em]"
          style={appear((tt - 5.6) / 0.4)}
        >
          SIGUIENTE → INTEGRACIÓN EN RUTINA
        </div>
      </div>
    </Frame>
  );
}

/** `talents`: random picks from the roster; the first four fill the Onway calendar, the fifth is read in Planning. */
export function MethodStages({ talents }: { talents: Talent[] }) {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <>
      <div role="tablist" aria-label="Momentos de la campaña" className="grid grid-cols-3 border-t border-[#2c2436]">
        {stages.map((s, i) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className="relative flex cursor-pointer flex-col gap-2 py-6 pr-6 text-left"
          >
            {i === active && <span className="absolute -top-px right-6 left-0 h-0.5 bg-accent-cycle" />}
            <span className="font-mono text-xs text-accent-cycle uppercase">
              {String(i + 1).padStart(2, "0")} · {s.time}
            </span>
            <span
              className="font-display text-[clamp(26px,2.86vw,40px)] font-medium tracking-[-0.04em] transition-colors"
              style={{ color: i === active ? "#f2eef6" : "#5f576b" }}
            >
              {s.name}
            </span>
          </button>
        ))}
      </div>
      <div role="tabpanel" className="grid items-start gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="text-[clamp(24px,2.4vw,32px)] leading-[1.2] tracking-[-0.025em]">{stage.lead}</p>
          <ul className="flex flex-col border-t border-[#2c2436]">
            {stage.points.map((p) => (
              <li key={p} className="border-b border-[#2c2436] py-3.5 text-[#d6d0de]">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          {active === 0 && <PlanningPanel talent={talents[4] ?? talents[0]} />}
          {active === 1 && <OnwayPanel talents={talents} />}
          {active === 2 && <PostbuyPanel />}
        </div>
      </div>
    </>
  );
}
