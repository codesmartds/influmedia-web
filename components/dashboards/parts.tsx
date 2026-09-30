import type { ReactNode } from "react";
import type { IconType } from "react-icons";

// Series colors, validated for CVD separation on white. Blue/pink pair
// male/female and alcance/interacciones; green is below 3:1, so it always
// appears next to a text label and value.
export const chartColors = {
  blue: "#3b8fe0",
  pink: "#e0609f",
  violet: "#6c3af0",
  green: "#2f8f58",
  gray: "#a9a6b8",
  grid: "#ebe9f2",
  ink: "#14102b",
  muted: "#6b6880",
};

export const tooltipStyle = {
  contentStyle: {
    borderRadius: 10,
    border: "1px solid #e4e1ef",
    boxShadow: "0 8px 24px rgba(20,16,43,0.12)",
    fontSize: 12,
    color: chartColors.ink,
  },
  labelStyle: { color: chartColors.muted, fontWeight: 600 },
};

/** White dashboard surface that sits on the dark slide. */
export function DashboardFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.75rem] bg-white p-3 text-[#14102b] shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:p-[1.2vw] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function Panel({ title, icon: Icon, action, children, className }: {
  title?: string;
  icon?: IconType;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-[#ebe9f2] p-3 ${className ?? ""}`}>
      {title && (
        <header className="mb-2 flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-[#14102b]">
            {Icon && <Icon aria-hidden className="text-sm text-[#6c3af0]" />}
            {title}
          </h3>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/** Live badge: a pulsing dot plus text, so the state isn't color-only. */
export function LiveBadge({ label = "Tiempo real" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e3f3fd] px-2 py-0.5 text-[0.6rem] font-semibold text-[#1f4f79]">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3b8fe0] opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex size-1.5 rounded-full bg-[#3b8fe0]" />
      </span>
      {label}
    </span>
  );
}

export function KpiTile({ icon: Icon, label, value, detail, iconClass }: {
  icon: IconType;
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  iconClass: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#ebe9f2] p-3">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xl text-white ${iconClass}`}>
        <Icon aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold uppercase tracking-wide text-[#6b6880]">{label}</p>
        <p className="text-xl font-bold tabular-nums leading-tight md:text-[clamp(1rem,1.5vw,1.6rem)]">{value}</p>
        {detail && <p className="text-[0.6rem] text-[#6b6880]">{detail}</p>}
      </div>
    </div>
  );
}
