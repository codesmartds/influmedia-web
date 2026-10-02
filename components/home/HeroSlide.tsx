import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import hero from "@/public/images/home/hero.png";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SharedElement } from "@/components/transitions/PageTransition";

export function HeroSlide() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-4.5rem)] w-full overflow-hidden bg-base-100">
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
          Agencia de influencer marketing
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

          {/* Brands are the primary path; creators get a visible second one. */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contacto"
              transitionTypes={["nav-forward"]}
              className="btn btn-secondary h-auto w-full whitespace-nowrap rounded-lg px-10 py-4 text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold uppercase shadow-lg sm:w-auto"
            >
              Quiero una campaña <FiArrowRight aria-hidden />
            </Link>
            <Link
              href="/creadores"
              transitionTypes={["nav-forward"]}
              className="btn btn-outline h-auto w-full whitespace-nowrap rounded-lg border-white/40 px-8 py-4 text-[clamp(0.85rem,1.05vw,1.1rem)] font-bold uppercase hover:border-secondary hover:bg-transparent hover:text-secondary sm:w-auto"
            >
              Soy creador
            </Link>
          </div>
          <p className="mt-6 text-[clamp(0.9rem,1.25vw,1.3rem)] font-bold uppercase text-secondary">#WeAreInflumedia</p>
        </div>
      </div>
    </section>
  );
}
