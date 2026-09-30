"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { sequence, sequenceIndexHref } from "./sequence";

const linkClass =
  "inline-flex items-center gap-1 text-sm font-bold uppercase text-info underline underline-offset-4 md:text-[clamp(0.8rem,1vw,1.1rem)]";

// Prev/next for the current page, looked up by its position in `sequence`.
export function SequenceNav() {
  const pathname = usePathname();
  const index = sequence.findIndex((href) => href === pathname);
  const prev = index > 0 ? sequence[index - 1] : undefined;
  const next = index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : undefined;

  return (
    <nav aria-label="Navegación del proceso" className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <Link href={sequenceIndexHref} transitionTypes={["nav-back"]} className={linkClass}>
        <FiArrowLeft aria-hidden /> Proceso
      </Link>
      {prev && (
        <Link href={prev} transitionTypes={["nav-back"]} className={linkClass}>
          <FiArrowLeft aria-hidden /> Anterior
        </Link>
      )}
      {next && (
        <Link href={next} transitionTypes={["nav-forward"]} className={linkClass}>
          Siguiente <FiArrowRight aria-hidden />
        </Link>
      )}
    </nav>
  );
}
