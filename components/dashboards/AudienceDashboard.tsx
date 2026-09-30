"use client";

import { Bar, BarChart, Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { TbMapPin, TbUsers, TbUsersGroup } from "react-icons/tb";
import { chartColors, DashboardFrame, LiveBadge, Panel, tooltipStyle } from "./parts";
import { jitter, useLiveData } from "./useLiveData";

type AudienceData = {
  locations: { name: string; value: number }[];
  types: { name: string; value: number; color: string }[];
  ages: { range: string; male: number; female: number }[];
};

const initial: AudienceData = {
  locations: [
    { name: "Guatemala", value: 52 },
    { name: "México", value: 9 },
    { name: "United States", value: 5 },
    { name: "Bulgaria", value: 4 },
    { name: "Brazil", value: 4 },
  ],
  types: [
    { name: "Real People", value: 75, color: chartColors.green },
    { name: "Influencers", value: 11, color: chartColors.violet },
    { name: "Mass Followers", value: 10, color: chartColors.pink },
    { name: "Suspicious Accounts", value: 4, color: chartColors.gray },
  ],
  ages: [
    { range: "13–17", male: 1, female: 1 },
    { range: "18–24", male: 6, female: 9 },
    { range: "25–34", male: 14, female: 20 },
    { range: "35–44", male: 7, female: 10 },
    { range: "45–54", male: 3, female: 4 },
    { range: "55–64", male: 1, female: 2 },
    { range: "65+", male: 1, female: 1 },
  ],
};

/** Rescale values so they add up to exactly 100, rounding to integers. */
function toPercent<T extends { value: number }>(items: T[]): T[] {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const rounded = items.map((item) => ({ ...item, value: Math.round((item.value / total) * 100) }));
  rounded[0].value += 100 - rounded.reduce((sum, item) => sum + item.value, 0);
  return rounded;
}

// Small drifts around the base profile, so the dashboard reads as live
// without the audience changing character.
function step(current: AudienceData): AudienceData {
  return {
    locations: current.locations
      .map((loc, i) => ({ ...loc, value: Math.round(jitter(initial.locations[i].value, i === 0 ? 3 : 1.5, 1)) }))
      .sort((a, b) => b.value - a.value),
    types: toPercent(current.types.map((t, i) => ({ ...t, value: jitter(initial.types[i].value, i === 0 ? 3 : 1.5, 1) }))),
    ages: current.ages.map((age, i) => ({
      ...age,
      male: Math.round(jitter(initial.ages[i].male, Math.max(1, initial.ages[i].male * 0.2), 0)),
      female: Math.round(jitter(initial.ages[i].female, Math.max(1, initial.ages[i].female * 0.2), 0)),
    })),
  };
}

export function AudienceDashboard() {
  const data = useLiveData(initial, step, 2400);
  const maxLocation = Math.max(...data.locations.map((l) => l.value));
  const male = data.ages.reduce((s, a) => s + a.male, 0);
  const female = data.ages.reduce((s, a) => s + a.female, 0);
  const malePct = Math.round((male / (male + female)) * 100);

  return (
    <DashboardFrame className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Audience</h2>
        <LiveBadge />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Panel title="Top locations" icon={TbMapPin}>
          <ol className="flex flex-col gap-1.5">
            {data.locations.map((loc, i) => (
              <li key={loc.name} className="grid grid-cols-[1.1rem_1fr_2.2rem_40%] items-center gap-2 text-[0.7rem]">
                <span className="flex size-4 items-center justify-center rounded-full bg-[#f1eff8] text-[0.55rem] font-bold">
                  {i + 1}
                </span>
                <span className="truncate">{loc.name}</span>
                <span className="text-right font-bold tabular-nums">{loc.value}%</span>
                <span className="h-2 overflow-hidden rounded-full bg-[#f1eff8]">
                  <span
                    className="block h-full rounded-full bg-[#3b8fe0] transition-[width] duration-700 ease-out"
                    style={{ width: `${(loc.value / maxLocation) * 100}%` }}
                  />
                </span>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel title="Audience type" icon={TbUsersGroup}>
          <div className="flex items-center gap-3">
            <div className="size-24 shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.types}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="58%"
                    outerRadius="100%"
                    stroke="#fff"
                    strokeWidth={2}
                    animationDuration={700}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {data.types.map((t) => (
                      <Cell key={t.name} fill={t.color} />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex flex-1 flex-col gap-1 text-[0.65rem]">
              {data.types.map((t) => (
                <li key={t.name} className="flex items-center gap-1.5">
                  <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: t.color }} />
                  <span className="flex-1">{t.name}</span>
                  <span className="font-bold tabular-nums">{t.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <Panel
        title="Age & gender"
        icon={TbUsers}
        className="flex min-h-40 flex-1 flex-col"
        action={
          <span className="flex gap-3 text-[0.65rem]">
            <span className="flex items-center gap-1">
              <span aria-hidden className="size-2 rounded-full" style={{ background: chartColors.blue }} />
              Male <b className="tabular-nums">{malePct}%</b>
            </span>
            <span className="flex items-center gap-1">
              <span aria-hidden className="size-2 rounded-full" style={{ background: chartColors.pink }} />
              Female <b className="tabular-nums">{100 - malePct}%</b>
            </span>
          </span>
        }
      >
        <div className="h-40 md:h-[11vw]">
          <ResponsiveContainer>
            <BarChart data={data.ages} barGap={2} margin={{ top: 16, right: 0, bottom: 0, left: 0 }}>
              <XAxis dataKey="range" tickLine={false} axisLine={{ stroke: chartColors.grid }} tick={{ fontSize: 10, fill: chartColors.muted }} />
              <Tooltip {...tooltipStyle} cursor={{ fill: "#f6f5fb" }} formatter={(v) => `${v}%`} />
              <Bar dataKey="male" name="Male" fill={chartColors.blue} radius={[4, 4, 0, 0]} animationDuration={700} />
              <Bar dataKey="female" name="Female" fill={chartColors.pink} radius={[4, 4, 0, 0]} animationDuration={700}>
                {/* Label only the peak bar; every other value lives in the tooltip. */}
                <LabelList
                  dataKey="female"
                  position="top"
                  fontSize={10}
                  fill={chartColors.ink}
                  formatter={(v) => (v === Math.max(...data.ages.map((a) => a.female)) ? `${v}%` : "")}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </DashboardFrame>
  );
}
