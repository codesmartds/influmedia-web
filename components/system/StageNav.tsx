"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stageHref, stages } from "./stages";

// Stage switcher shown under every /sistema/<stage> page. A stage stays
// active on its sub-pages too (e.g. /sistema/planning/analisis).
export function StageNav() {
  const pathname = usePathname();
  const activeIndex = stages.findIndex((stage) => pathname.startsWith(stageHref(stage.slug)));

  return (
    <nav aria-label="Etapas del proceso">
      <ul className="flex flex-wrap gap-3 md:gap-[1.2vw]">
        {stages.map((stage, index) => {
          const active = index === activeIndex;
          return (
            <li key={stage.slug}>
              <Link
                href={stageHref(stage.slug)}
                aria-current={active ? "page" : undefined}
                transitionTypes={[index < activeIndex ? "nav-back" : "nav-forward"]}
                className={`inline-flex min-w-[9.5rem] justify-center rounded-full border px-8 py-2.5 text-sm font-bold uppercase transition-colors md:min-w-[9.8vw] md:text-[clamp(0.85rem,1.15vw,1.25rem)] ${
                  active
                    ? "border-secondary bg-secondary text-secondary-content"
                    : "border-white/15 bg-base-300/60 text-base-content hover:bg-base-300"
                }`}
              >
                {stage.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
