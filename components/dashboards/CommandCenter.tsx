"use client";

import { Area, AreaChart, CartesianGrid, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  TbAlertTriangle,
  TbBell,
  TbCalendarEvent,
  TbChartBar,
  TbCircleCheck,
  TbCurrencyDollar,
  TbFileText,
  TbTrendingUp,
  TbUsers,
} from "react-icons/tb";
import { chartColors, DashboardFrame, KpiTile, LiveBadge, Panel, tooltipStyle } from "./parts";
import { formatCompact, jitter, useLiveData } from "./useLiveData";

const DAY = 86_400_000;
const START = Date.UTC(2025, 5, 7);
const dayLabel = (t: number) =>
  new Date(t).toLocaleDateString("es", { day: "numeric", month: "short", timeZone: "UTC" });

// Campaign milestones marked on the curve (index into the series).
const events = [
  { at: 2, label: "Lanzamiento" },
  { at: 14, label: "Colaboración" },
  { at: 27, label: "Video destacado" },
  { at: 36, label: "Pico de interacción" },
];

const calendar = [
  { day: "Lun 28", posts: ["10:00 @Marca", "16:00 @InfluA"] },
  { day: "Mar 29", posts: ["11:00 @Marca"] },
  { day: "Mié 30", posts: ["14:00 @InfluB", "18:00 @Marca"] },
  { day: "Jue 31", posts: ["10:00 @Marca", "15:00 @InfluC"] },
  { day: "Vie 1", posts: ["12:00 @Marca"] },
  { day: "Sáb 2", posts: ["11:00 @InfluA", "17:00 @Marca"] },
  { day: "Dom 3", posts: ["10:00 @InfluB"] },
];

// Status alerts: each keeps an icon and a label, never color alone.
const alertPool = [
  { title: "Actividad normal", detail: "Todo en orden", Icon: TbCircleCheck, tone: "bg-[#2f8f58]" },
  { title: "Pico de interacción", detail: "+78% vs. promedio", Icon: TbTrendingUp, tone: "bg-[#6c3af0]" },
  { title: "Actividad sospechosa", detail: "Se detectó patrón inusual", Icon: TbAlertTriangle, tone: "bg-[#d9453b]" },
  { title: "Publicación confirmada", detail: "@InfluB publicó a tiempo", Icon: TbCircleCheck, tone: "bg-[#2f8f58]" },
];

type Point = { t: number; value: number };
type CommandData = { series: Point[]; audience: number; spend: number; alertOffset: number; minutesAgo: number };

function buildSeries(): Point[] {
  // S-curve with jumps at each milestone. Deterministic (no Math.random) so
  // the server render matches hydration.
  const points: Point[] = [];
  let value = 400;
  for (let i = 0; i < 40; i++) {
    const boost = events.some((e) => e.at === i) ? 2200 : 0;
    value += 350 + i * 18 + boost + Math.round((Math.sin(i * 12.9) + 1) * 100);
    points.push({ t: START + i * DAY, value: Math.round(value) });
  }
  return points;
}

const initial: CommandData = {
  series: buildSeries(),
  audience: 999_900,
  spend: 0.06,
  alertOffset: 0,
  minutesAgo: 2,
};

function step(current: CommandData): CommandData {
  const last = current.series[current.series.length - 1];
  // Grow the live day's total; every few ticks roll to a new day.
  const grown = { ...last, value: last.value + Math.round(80 + Math.random() * 220) };
  const series =
    Math.random() < 0.25
      ? [...current.series.slice(1), { t: last.t + DAY, value: grown.value }]
      : [...current.series.slice(0, -1), grown];
  const rotate = Math.random() < 0.35;
  return {
    series,
    audience: current.audience + Math.round(Math.random() * 900),
    spend: jitter(current.spend, 0.002, 0.05, 0.07),
    alertOffset: rotate ? current.alertOffset + 1 : current.alertOffset,
    minutesAgo: rotate ? 0 : current.minutesAgo + 1,
  };
}

export function CommandCenter() {
  const data = useLiveData(initial, step, 1800);
  const interactions = data.series[data.series.length - 1].value;
  const alerts = [0, 1, 2].map((i) => alertPool[(data.alertOffset + i) % alertPool.length]);

  return (
    <DashboardFrame className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiTile icon={TbFileText} iconClass="bg-[#6c3af0]" label="Publicado" value={<>8 <small className="text-xs font-normal">de 8</small></>} detail="Publicaciones" />
        <KpiTile icon={TbUsers} iconClass="bg-[#3b8fe0]" label="Audiencia" value={formatCompact(data.audience)} detail="Alcance total" />
        <KpiTile icon={TbTrendingUp} iconClass="bg-[#6c3af0]" label="Participación" value={formatCompact(interactions)} detail="Interacciones totales" />
        <KpiTile icon={TbCurrencyDollar} iconClass="bg-[#3b8fe0]" label="Gasto" value={`$${data.spend.toFixed(2)}`} detail="CPE promedio" />
      </div>

      <div className="grid flex-1 gap-3 lg:grid-cols-[1.35fr_1fr]">
        <Panel title="Evolución de la campaña" action={<LiveBadge />} className="flex min-h-56 flex-col">
          <p className="mb-1 flex items-center gap-1.5 text-[0.6rem] text-[#6b6880]">
            <span aria-hidden className="h-0.5 w-3 rounded" style={{ background: chartColors.blue }} />
            Interacciones acumuladas
          </p>
          <div className="min-h-44 flex-1">
            <ResponsiveContainer>
              <AreaChart data={data.series} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="cc-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColors.blue} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={chartColors.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={chartColors.grid} strokeDasharray="3 3" />
                <XAxis dataKey="t" tickFormatter={dayLabel} tickLine={false} axisLine={false} minTickGap={24} tick={{ fontSize: 10, fill: chartColors.muted }} />
                <YAxis tickFormatter={formatCompact} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: chartColors.muted }} />
                <Tooltip {...tooltipStyle} labelFormatter={(t) => dayLabel(Number(t))} formatter={(v) => [formatCompact(Number(v)), "Interacciones"]} />
                <Area type="monotone" dataKey="value" stroke={chartColors.blue} strokeWidth={2} fill="url(#cc-fill)" animationDuration={600} />
                {events.map((e) => {
                  const point = data.series.find((p) => p.t === START + e.at * DAY);
                  return point ? (
                    <ReferenceDot key={e.label} x={point.t} y={point.value} r={5} fill={chartColors.violet} stroke="#fff" strokeWidth={2}
                      label={{ value: e.label, position: "top", fontSize: 9, fill: chartColors.muted }} />
                  ) : null;
                })}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="flex flex-col gap-3">
          <Panel title="Calendario" icon={TbCalendarEvent}>
            <ul className="grid grid-cols-7 gap-1 text-center">
              {calendar.map((col) => (
                <li key={col.day} className="flex flex-col gap-1">
                  <span className="text-[0.55rem] font-semibold uppercase text-[#6b6880]">{col.day}</span>
                  {col.posts.map((post) => (
                    <span key={post} className="whitespace-pre-line rounded-md bg-[#eef4fd] px-0.5 py-1 text-[0.5rem] leading-tight text-[#1f4f79]">
                      {post.replace(" ", "\n")}
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Alertas" icon={TbBell} className="flex-1" action={<span className="text-[0.6rem] font-semibold text-[#3b8fe0]">Ver todas ›</span>}>
            <ul className="flex flex-col gap-1.5" aria-live="polite">
              {alerts.map(({ title, detail, Icon, tone }, i) => (
                <li key={`${data.alertOffset}-${i}`} className="flex animate-[fadeIn_0.5s_ease-out] items-center gap-2 border-b border-[#f1eff8] pb-1.5 last:border-0">
                  <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-sm text-white ${tone}`}>
                    <Icon aria-hidden />
                  </span>
                  <span className="flex-1 text-[0.65rem] leading-tight">
                    <b className="block">{title}</b>
                    <span className="text-[#6b6880]">{detail}</span>
                  </span>
                  <span className="text-[0.55rem] text-[#6b6880]">Hace {data.minutesAgo + i * 10} min</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl bg-[#1b1440] px-4 py-3 text-white">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#6c3af0] text-lg">
          <TbChartBar aria-hidden />
        </span>
        <span className="flex-1 text-xs leading-tight">
          <b className="block text-sm">Campaña ONWAY</b>
          Monitoreo activo y resultados en tiempo real
        </span>
        <span className="text-xs tabular-nums"><b className="block text-sm">{formatCompact(data.audience)}</b>Audiencia</span>
        <span className="text-xs tabular-nums"><b className="block text-sm">{formatCompact(interactions)}</b>Interacciones</span>
        <span className="text-xs tabular-nums"><b className="block text-sm">${data.spend.toFixed(2)}</b>CPE promedio</span>
        <span className="rounded-md bg-[#55d6ff] px-3 py-1.5 text-[0.65rem] font-bold uppercase text-[#0f0b24]">Ejecución en curso</span>
      </div>
    </DashboardFrame>
  );
}
