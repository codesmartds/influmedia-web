"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Media, Talent } from "@/payload-types";

// "Antes vs con Influmedia": a spreadsheet of creators that a lilac scan line
// turns into a profile reading, then rewinds, on an 11 s loop. Handles and
// photos come from real talents; the figures are demo values.

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const easeInOut = (x: number) => {
  x = clamp(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const media = (m: unknown) => (m && typeof m === "object" ? (m as Media) : null);

function handle(t: Talent) {
  const fromUrl = t.instagram?.match(/instagram\.com\/([^/?#]+)/i)?.[1];
  return "@" + (fromUrl ?? t.name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, ""));
}

// Demo figures per row; the third one is the inflated profile.
const figures = [
  { followers: "245K", rate: "$800", affinity: "8.7", real: "92%", risky: false },
  { followers: "512K", rate: "$1,400", affinity: "9.1", real: "88%", risky: false },
  { followers: "1.2M", rate: "$2,600", affinity: "4.2", real: "41%", risky: true },
  { followers: "98K", rate: "$450", affinity: "8.2", real: "95%", risky: false },
  { followers: "176K", rate: "$650", affinity: "7.9", real: "90%", risky: false },
];

function useLoop() {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
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
  }, [reduce]);
  // Reduced motion: hold the "with Influmedia" side.
  return reduce ? 5 : t;
}

const sheetCell = "flex h-full min-w-0 items-center overflow-hidden border-r border-b border-base-content/[.06] px-2.5 whitespace-nowrap";

export function CompareAnim({ talents }: { talents: Talent[] }) {
  const t = useLoop() % 11;
  const p = t < 1.6 ? 0 : t < 3.6 ? easeInOut((t - 1.6) / 2) : t < 8 ? 1 : t < 9.6 ? 1 - easeInOut((t - 8) / 1.6) : 0;
  const rows = talents.slice(0, 5).map((talent, i) => ({ talent, ...figures[i] }));
  const recommended = rows.filter((r) => !r.risky).length;

  return (
    <div className="relative aspect-[16/10] min-h-[360px] overflow-hidden rounded-[20px] border border-base-content/10 font-mono">
      {/* Before: the spreadsheet */}
      <div className="absolute inset-0 flex flex-col bg-[#17131d] text-[11px] text-[#a39bae]">
        <div className="flex items-center gap-2.5 border-b border-base-content/[.08] bg-[#1d1824] px-4 py-3 text-[10.5px] tracking-[0.06em] text-[#8e86a0]">
          <span className="size-2.5 rounded-[2px] bg-[#3b8a5a]" />
          seleccion_influencers_FINAL_v3.xlsx
        </div>
        <div className="grid flex-1 grid-cols-[28px_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_64px] grid-rows-[30px_repeat(5,minmax(0,1fr))]">
          {["", "CREADOR", "SEGUIDORES", "TARIFA", "CAPTURA"].map((x, i) => (
            <div key={i} className={`${sheetCell} bg-[#1d1824] text-[9.5px] tracking-[0.08em] text-[#6f6880]`}>
              {x}
            </div>
          ))}
          {rows.map((r, i) => [
            <div key={`n${i}`} className={`${sheetCell} text-[#5f576b]`}>
              {i + 1}
            </div>,
            <div key={`c${i}`} className={`${sheetCell} text-[#d6d0de]`}>
              {handle(r.talent)}
            </div>,
            <div key={`f${i}`} className={sheetCell}>
              {r.followers}
            </div>,
            <div key={`r${i}`} className={sheetCell}>
              {r.rate}
            </div>,
            <div key={`s${i}`} className={sheetCell}>
              <span className="h-[22px] w-[34px] rounded-[3px] bg-base-content/10" />
            </div>,
          ])}
        </div>
      </div>

      {/* With Influmedia: the profile reading, revealed left to right */}
      <div
        className="absolute inset-0 flex flex-col text-[11px]"
        style={{
          // Inline: Tailwind drops an arbitrary background that mixes a gradient and a color.
          background: "radial-gradient(500px 260px at 100% 0%,rgba(94,45,133,.35),transparent 70%),#120d19",
          clipPath: `inset(0 ${((1 - p) * 100).toFixed(2)}% 0 0)`,
        }}
      >
        <div className="flex justify-between gap-2.5 border-b border-base-content/[.08] px-4 py-3 text-[10.5px] tracking-[0.1em] whitespace-nowrap text-secondary">
          <span>LECTURA DE PERFIL · {rows.length} CREADORES</span>
          <span className="text-[#5fbfbf]">{recommended} RECOMENDADOS</span>
        </div>
        <div className="grid flex-1 grid-cols-[minmax(0,1.5fr)_minmax(0,.8fr)_minmax(0,1fr)_minmax(0,1.1fr)] grid-rows-[30px_repeat(5,minmax(0,1fr))]">
          {["CREADOR", "AFINIDAD", "AUDIENCIA REAL", "ESTADO"].map((x) => (
            <div key={x} className="flex items-center border-b border-base-content/[.08] px-3.5 text-[9.5px] tracking-[0.08em] whitespace-nowrap text-[#8e86a0]">
              {x}
            </div>
          ))}
          {rows.map((r, i) => {
            const cell = `flex min-w-0 items-center gap-2.5 overflow-hidden border-b border-base-content/[.06] px-3.5 whitespace-nowrap ${r.risky ? "opacity-55" : ""}`;
            const photo = media(r.talent.thumbnail);
            return [
              <div key={`c${i}`} className={cell}>
                {photo?.url && <Image src={photo.url} alt="" width={28} height={28} className="size-7 shrink-0 rounded-full object-cover object-[50%_20%]" />}
                <span className="truncate text-base-content">{handle(r.talent)}</span>
              </div>,
              <div key={`a${i}`} className={`${cell} font-display text-lg font-medium text-base-content`}>
                {r.affinity}
              </div>,
              <div key={`r${i}`} className={`${cell} font-display text-lg font-medium ${r.risky ? "text-[#d77fb4]" : "text-base-content"}`}>
                {r.real}
              </div>,
              <div key={`s${i}`} className={`${cell} text-[10px] tracking-[0.08em] ${r.risky ? "text-[#d77fb4]" : "text-[#5fbfbf]"}`}>
                <span className={`size-[7px] shrink-0 rounded-full ${r.risky ? "bg-[#d77fb4]" : "bg-[#5fbfbf]"}`} />
                {r.risky ? "RIESGO ALTO" : "RECOMENDADO"}
              </div>,
            ];
          })}
        </div>
      </div>

      {/* Scan line */}
      <div
        className="absolute inset-y-0 -ml-px w-0.5 bg-secondary shadow-[0_0_24px_4px_rgba(183,155,219,.55)] transition-opacity duration-300"
        style={{ left: `${(p * 100).toFixed(2)}%`, opacity: p > 0.01 && p < 0.99 ? 1 : 0 }}
      />
      <span
        className="absolute right-3.5 bottom-3.5 rounded-lg border border-base-content/15 bg-base-100/70 px-[11px] py-[7px] text-[10.5px] tracking-[0.12em]"
        style={{ color: p > 0.5 ? "#b79bdb" : "#a39bae" }}
      >
        {p > 0.5 ? "CON INFLUMEDIA" : "ANTES"}
      </span>
    </div>
  );
}
