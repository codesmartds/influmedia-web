import type { ReactNode } from "react";

export function SlideFooter({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <footer className="mt-10 flex items-center justify-between gap-6 md:mt-[2.5%]">
      <p className="text-xs font-bold uppercase text-white/50 md:text-[clamp(0.7rem,0.85vw,0.95rem)]">
        Influmedia • {label}
      </p>
      {children}
    </footer>
  );
}
