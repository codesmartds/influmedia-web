import type { ReactNode } from "react";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Opening block of an inner page: holds the page's single h1.
export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mx-auto w-full max-w-[96rem] px-6 pb-4 pt-16 md:px-[4.7%] md:pt-24">
      <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
        {eyebrow}
      </RevealItem>
      <RevealItem as="h1" className="mt-4 max-w-[20ch] text-[clamp(2.4rem,4.4vw,4.8rem)] font-bold leading-[1.05]">
        {title}
      </RevealItem>
      {children && (
        <RevealItem as="p" className="mt-6 max-w-[56ch] text-lg leading-snug text-base-content/80 md:text-xl">
          {children}
        </RevealItem>
      )}
    </Reveal>
  );
}
