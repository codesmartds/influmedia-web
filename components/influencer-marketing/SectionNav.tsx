"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "servicios", label: "Servicios" },
  { id: "sistema", label: "Proceso" },
  { id: "resultados", label: "Resultados" },
  { id: "talento", label: "Talento" },
  { id: "faq", label: "Preguntas" },
  { id: "contacto", label: "Contacto" },
];

// In-page index, pinned under the site header; highlights the section in view.
export function SectionNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      // A section counts as current while it crosses the upper third.
      { rootMargin: "-30% 0px -65% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="En esta página" className="sticky top-[4.5rem] z-30 border-y border-white/5 bg-base-100/85 backdrop-blur-md">
      <ul className="mx-auto flex max-w-[96rem] gap-1 overflow-x-auto px-6 py-2 [scrollbar-width:none] md:px-[4.7%]">
        {items.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className="block rounded-full px-4 py-2 text-sm font-bold uppercase text-base-content/60 transition-colors hover:text-base-content aria-[current=true]:bg-primary aria-[current=true]:text-primary-content"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
