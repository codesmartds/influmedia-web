import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import hero from "@/public/images/home/hero.png";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SharedElement } from "@/components/transitions/PageTransition";

export function HeroSlide() {
  return (
    <section className="relative isolate flex min-h-dvh w-full overflow-hidden bg-base-100">
      {/* Full-slide composition; its background was cut out, so the left side is transparent. */}
      <Image
        src={hero}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover object-right max-md:opacity-40"
      />

      <div className="relative flex w-full min-w-0 flex-col px-6 py-10 md:w-[52%] md:px-[4%] md:py-[4.5%]">
        <span className="self-start rounded-full bg-secondary px-5 py-2 text-sm font-bold uppercase text-secondary-content md:ml-[3%] md:text-[clamp(0.8rem,1.1vw,1.1rem)]">
          New Business Deck
        </span>

        <div className="mt-10 md:ml-[4%] md:mt-[7%]">
          <SharedElement name="brand-logo">
            <BrandLogo priority className="w-[70%] max-w-[480px]" sizes="(max-width: 768px) 70vw, 30vw" />
          </SharedElement>
        </div>

        <div className="mt-auto pt-12">
          <h1 className="text-[clamp(1.6rem,3.3vw,3.6rem)] font-bold md:whitespace-nowrap uppercase leading-[1.12] tracking-tight">
            Influencer marketing
            <br />
            que mueve
            <br />
            conversaciones.
          </h1>
          <p className="mt-4 max-w-[42ch] text-[clamp(1rem,1.5vw,1.6rem)] leading-snug text-muted">
            Estrategia, creatividad y tecnología para conectar marcas con personas reales.
          </p>

          <div className="mt-8 flex flex-wrap items-end gap-6 md:gap-[12%]">
            <span className="order-2 text-[clamp(0.9rem,1.25vw,1.3rem)] font-bold uppercase text-secondary md:order-1">
              #WeAreInflumedia
            </span>
            <Link
              href="/deck"
              transitionTypes={["nav-forward"]}
              className="btn btn-secondary order-1 h-auto w-full whitespace-nowrap rounded-lg px-10 py-4 text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold uppercase shadow-lg md:order-2 md:w-auto md:min-w-[18vw]"
            >
              Explorar deck <FiArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
