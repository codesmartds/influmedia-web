import type { ReactNode } from "react";

// Vertical rhythm and max width for one section of a page. `id` is the
// section's anchor; the old slide routes redirect to these anchors.
export function LandingSection({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[96rem] scroll-mt-24 py-14 md:py-20 ${className ?? ""}`}>
      {children}
    </section>
  );
}
