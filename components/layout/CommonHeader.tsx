import Link from "next/link";
import { SharedElement } from "@/components/transitions/PageTransition";

// Header shared by deck slides 3–20: back to the section menu + logo.
export function CommonHeader() {
  return (
    <header className="flex items-start justify-end gap-6 px-6 pt-8 md:gap-[2.5%] md:px-[4.4%] md:pt-[2%]">
      <Link
        href="/deck"
        transitionTypes={["nav-back"]}
        className="btn btn-primary h-auto min-w-[8rem] rounded-md border-0 px-10 py-3 text-xs font-bold uppercase shadow-lg md:mt-[0.1%] md:min-w-[8%]"
      >
        Menú
      </Link>
      <SharedElement name="brand-logo">
        <div className="flex aspect-[170/75] w-[max(8rem,10%)] items-center justify-center rounded-xl border-2 border-dashed border-white/30 text-xs font-semibold uppercase tracking-widest text-white/60">
          Logo
        </div>
      </SharedElement>
    </header>
  );
}
