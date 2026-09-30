"use client";

import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  TbCalendarEvent,
  TbChevronRight,
  TbHeart,
  TbMessageCircle,
  TbPencil,
  TbPlayerPlay,
  TbTrendingUp,
  TbUsers,
  TbUsersGroup,
} from "react-icons/tb";
import { chartColors, DashboardFrame, KpiTile, LiveBadge, Panel, tooltipStyle } from "./parts";
import { formatCompact, jitter, useLiveData } from "./useLiveData";

type Day = { day: string; reach: number; engagement: number };
type ReportData = { days: Day[]; reachGrowth: number; interactionGrowth: number };

const baseDays: Day[] = Array.from({ length: 31 }, (_, i) => ({
  day: `${i + 1} May`,
  reach: Math.round(70_000 + Math.sin(i / 3) * 40_000 + (i > 6 && i < 12 ? 60_000 : 0) + (i > 22 && i < 28 ? 45_000 : 0)),
  engagement: Number((2.4 + Math.cos(i / 4) * 0.8).toFixed(2)),
}));

const initial: ReportData = { days: baseDays, reachGrowth: 24, interactionGrowth: 28 };

// Closed campaign, so data only "breathes" slightly around the final report.
function step(current: ReportData): ReportData {
  return {
    days: current.days.map((d, i) => ({
      ...d,
      reach: Math.round(jitter(baseDays[i].reach, 9000, 20_000)),
      engagement: Number(jitter(baseDays[i].engagement, 0.25, 0.5).toFixed(2)),
    })),
    reachGrowth: Math.round(jitter(24, 1.5)),
    interactionGrowth: Math.round(jitter(28, 1.5)),
  };
}

const insights = [
  { Icon: TbTrendingUp, text: "Crecimiento consistente" },
  { Icon: TbHeart, text: "Reels generan más engagement" },
  { Icon: TbUsersGroup, text: "Mayor interacción en tardes y fines" },
];

const nextSteps = [
  { Icon: TbPlayerPlay, text: "Aumentar producción de Reels" },
  { Icon: TbCalendarEvent, text: "Publicar en horarios clave" },
  { Icon: TbUsersGroup, text: "Impulsar colaboraciones" },
];

const axis = { tickLine: false, axisLine: false, tick: { fontSize: 9, fill: chartColors.muted } } as const;

export function CampaignReport() {
  const data = useLiveData(initial, step, 2600);
  const avgEngagement = data.days.reduce((s, d) => s + d.engagement, 0) / data.days.length;

  return (
    <DashboardFrame className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[0.65rem]">
        <p className="flex items-center gap-2 font-bold uppercase text-[#6c3af0]">
          <TbCalendarEvent aria-hidden /> Reporte post campaña
          <span className="font-normal text-[#6b6880]">01 – 31 May 2025</span>
        </p>
        <p className="font-semibold">
          Qué pasó. Qué aprendimos. <span className="text-[#3b8fe0]">Qué sigue.</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile icon={TbUsers} iconClass="bg-[#6c3af0]" label="Alcance" value="999.9K" detail={`↑ ${data.reachGrowth}% vs. período anterior`} />
        <KpiTile icon={TbMessageCircle} iconClass="bg-[#3b8fe0]" label="Interacciones" value="27.5K" detail={`↑ ${data.interactionGrowth}% vs. período anterior`} />
        <KpiTile icon={TbHeart} iconClass="bg-[#e0609f]" label="Engagement" value={`${avgEngagement.toFixed(2)}%`} detail="Promedio del período" />
        <KpiTile icon={TbPencil} iconClass="bg-[#6c3af0]" label="Publicaciones" value="36" detail="Durante el período" />
      </div>

      <div className="grid flex-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
        {/* Two measures on different scales: two charts on one time axis, never a dual axis. */}
        <Panel title="Rendimiento en el tiempo" action={<LiveBadge label="Actualizando" />} className="flex min-h-52 flex-col">
          <p className="flex items-center gap-1.5 text-[0.6rem] text-[#6b6880]">
            <span aria-hidden className="h-0.5 w-3 rounded" style={{ background: chartColors.violet }} /> Alcance diario
          </p>
          <div className="min-h-20 flex-1">
            <ResponsiveContainer>
              <AreaChart data={data.days} syncId="report" margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid vertical={false} stroke={chartColors.grid} strokeDasharray="3 3" />
                <XAxis dataKey="day" hide />
                <YAxis {...axis} tickFormatter={formatCompact} />
                <Tooltip {...tooltipStyle} formatter={(v) => [formatCompact(Number(v)), "Alcance"]} />
                <Area type="monotone" dataKey="reach" stroke={chartColors.violet} strokeWidth={2} fill={chartColors.violet} fillOpacity={0.08} animationDuration={700} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-[0.6rem] text-[#6b6880]">
            <span aria-hidden className="h-0.5 w-3 rounded" style={{ background: chartColors.blue }} /> Engagement (%)
          </p>
          <div className="min-h-16 flex-1">
            <ResponsiveContainer>
              <LineChart data={data.days} syncId="report" margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid vertical={false} stroke={chartColors.grid} strokeDasharray="3 3" />
                <XAxis dataKey="day" {...axis} interval={5} />
                <YAxis {...axis} tickFormatter={(v) => `${v}%`} domain={[0, 4]} ticks={[0, 2, 4]} />
                <Tooltip {...tooltipStyle} formatter={(v) => [`${v}%`, "Engagement"]} />
                <Line type="monotone" dataKey="engagement" stroke={chartColors.blue} strokeWidth={2} dot={false} animationDuration={700} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Resumen del período">
          <ul className="grid h-full grid-cols-3 items-center divide-x divide-[#ebe9f2] text-center">
            {[
              { Icon: TbTrendingUp, value: `+${data.reachGrowth}%`, label: "Más alcance" },
              { Icon: TbMessageCircle, value: `+${data.interactionGrowth}%`, label: "Más interacciones" },
              { Icon: TbHeart, value: `${avgEngagement.toFixed(2)}%`, label: "Engagement" },
            ].map(({ Icon, value, label }) => (
              <li key={label} className="flex flex-col items-center gap-1 px-1">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#eef4fd] text-lg text-[#3b8fe0]">
                  <Icon aria-hidden />
                </span>
                <b className="text-base tabular-nums">{value}</b>
                <span className="text-[0.6rem] text-[#6b6880]">{label}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1.4fr]">
        <Panel title="Insights clave">
          <ul className="grid gap-2 sm:grid-cols-3">
            {insights.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-1.5 text-[0.6rem] leading-tight">
                <Icon aria-hidden className="shrink-0 text-lg text-[#6c3af0]" />
                {text}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Próximos pasos">
          <ol className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-1">
            {nextSteps.map(({ Icon, text }, i) => (
              <li key={text} className="flex flex-1 items-center gap-1.5 text-[0.6rem] leading-tight">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#6c3af0] text-[0.6rem] font-bold text-white">
                  {i + 1}
                </span>
                <Icon aria-hidden className="shrink-0 text-base text-[#3b8fe0]" />
                <span className="flex-1">{text}</span>
                {i < nextSteps.length - 1 && <TbChevronRight aria-hidden className="shrink-0 text-[#a9a6b8]" />}
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </DashboardFrame>
  );
}
