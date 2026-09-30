import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SharedElement } from "@/components/transitions/PageTransition";

// Header shared by deck slides 3–20: back to the section menu + logo.
export function CommonHeader() {
  return (
    <header className="flex items-start justify-end gap-6 px-6 pt-8 md:gap-[2.5%] md:px-[1.5%] md:pt-[2%]">
      <Link
        href="/deck"
        transitionTypes={["nav-back"]}
        className="btn btn-primary h-auto min-w-[8rem] rounded-md border-0 px-10 py-3 text-xs font-bold uppercase shadow-lg md:mt-[0.1%] md:min-w-[8%]"
      >
        Menú
      </Link>
      <SharedElement name="brand-logo">
        <Link href="/" transitionTypes={["nav-back"]} aria-label="Influmedia, ir a la portada">
          <BrandLogo variant="white" priority className="w-[max(8rem,10.5vw)]" />
        </Link>
      </SharedElement>
    </header>
  );
}
