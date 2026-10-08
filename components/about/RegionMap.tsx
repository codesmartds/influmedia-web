"use client";

import Image from "next/image";
import { useState } from "react";
import regionMap from "@/public/images/nosotros/map-region.svg";

// Country list beside a map of Central America and the Caribbean. Hovering a
// country highlights its label on the map; the office pulses.

const countries = [
  { code: "GT", name: "Guatemala", x: "11.5%", y: "47%", hq: true },
  { code: "SV", name: "El Salvador", x: "16.3%", y: "60.2%" },
  { code: "HN", name: "Honduras", x: "23.6%", y: "54%" },
  { code: "NI", name: "Nicaragua", x: "28.8%", y: "65.1%" },
  { code: "CR", name: "Costa Rica", x: "31.5%", y: "81%" },
  { code: "PA", name: "Panamá", x: "44.7%", y: "89%" },
  { code: "DO", name: "República Dominicana", x: "76%", y: "31%" },
  { code: "PR", name: "Puerto Rico", x: "89%", y: "34.9%" },
];

export function RegionCountries({ onHover, hovered }: { onHover: (i: number) => void; hovered: number }) {
  return (
    <ul className="flex flex-col border-t border-base-300" onMouseLeave={() => onHover(-1)}>
      {countries.map((c, i) => (
        <li
          key={c.code}
          onMouseEnter={() => onHover(i)}
          className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-3.5 border-b border-base-300 py-[11px]"
        >
          <span className="font-mono text-[11px] text-accent-cycle">{c.code}</span>
          <span
            className="font-display text-lg font-medium tracking-[-0.02em] transition-colors duration-300"
            style={{ color: hovered === i ? "#f2eef6" : hovered === -1 ? "#d6d0de" : "#5f576b" }}
          >
            {c.name}
          </span>
          {c.hq && <span className="font-mono text-[10.5px] tracking-[0.12em] text-accent-cycle">OFICINA</span>}
        </li>
      ))}
    </ul>
  );
}

function Pulse() {
  return (
    <span className="relative block size-0">
      {[0, 1.2].map((delay) => (
        <span
          key={delay}
          className="absolute top-1/2 left-1/2 size-[34px] rounded-full border-[1.5px] border-tint motion-safe:animate-[hqpulse_2.4s_ease-out_infinite]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <span className="absolute -top-1.5 -left-1.5 size-3 rounded-full bg-base-content shadow-[0_0_18px_color-mix(in_srgb,var(--acc-tint)_90%,transparent)]" />
    </span>
  );
}

export function RegionMapView({ hovered }: { hovered: number }) {
  return (
    <div className="relative aspect-[1200/720] min-w-0">
      <Image src={regionMap} alt="Mapa de Centroamérica y el Caribe con los 8 países donde opera Influmedia" fill sizes="(max-width: 1024px) 100vw, 60vw" />
      <div aria-hidden className="pointer-events-none absolute top-[55.17%] left-[11.01%]">
        <Pulse />
      </div>
      {countries.map((c, i) => {
        const on = hovered === i;
        return (
          <span
            key={c.code}
            aria-hidden
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 font-mono text-[11px] tracking-[0.08em] transition-colors duration-300"
            style={{
              left: c.x,
              top: c.y,
              color: on ? "#0b0810" : "#f2eef6",
              background: on ? "#f2eef6" : "rgba(11,8,16,.72)",
              borderColor: on ? "#f2eef6" : "color-mix(in srgb, var(--acc-tint) 50%, transparent)",
            }}
          >
            {c.code}
          </span>
        );
      })}
      <span className="absolute right-0 -bottom-7 font-mono text-[10.5px] tracking-[0.1em] text-[#5f576b]">DATOS: NATURAL EARTH</span>
    </div>
  );
}

/** Country list and map sharing the hover state. */
export function RegionMap({ intro }: { intro: React.ReactNode }) {
  const [hovered, setHovered] = useState(-1);
  return (
    <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)]">
      <div className="flex min-w-0 flex-col gap-6">
        {intro}
        <RegionCountries hovered={hovered} onHover={setHovered} />
      </div>
      <RegionMapView hovered={hovered} />
    </div>
  );
}
