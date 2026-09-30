import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

type HeroSlideProps = {
  logoSrc?: string;
  imageSrc?: string;
};

// Dashed box that marks where an asset goes until it's provided.
function AssetPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-white/20 text-sm font-semibold uppercase tracking-widest text-white/40 ${className ?? ""}`}
    >
      {label}
    </div>
  );
}

export function HeroSlide({ logoSrc, imageSrc }: HeroSlideProps) {
  return (
    <section className="relative isolate flex min-h-dvh w-full overflow-hidden bg-base-100">
      {/* Decorative shapes: the big circle plus the diagonal "speech bubble" tail */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[42%] top-[-10%] aspect-square w-[52%] rounded-full bg-[radial-gradient(circle_at_50%_45%,#4b2c8f_0%,#34206b_55%,#23174d_100%)] max-md:left-[10%] max-md:top-[-5%] max-md:w-[110%]" />
        <div className="absolute bottom-[-32%] left-[39%] h-[70%] w-[11%] origin-top rotate-[-40deg] rounded-[4rem] bg-[#1d1540] max-md:hidden" />
      </div>

      {/* Hero image, bleeding off the right edge */}
      <div className="absolute inset-y-0 right-0 -z-10 w-[58%] max-md:w-full max-md:opacity-40">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover object-right"
          />
        ) : (
          <AssetPlaceholder label="Imagen hero" className="absolute inset-[6%] max-md:hidden" />
        )}
        {/* Blend the image into the background on its left edge */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base-100 to-transparent" />
      </div>

      <div className="relative flex w-full min-w-0 flex-col px-6 py-10 md:w-[52%] md:px-[4%] md:py-[4.5%]">
        <span className="self-start rounded-full bg-secondary px-5 py-2 text-sm font-bold uppercase text-secondary-content md:ml-[3%] md:text-[clamp(0.8rem,1.1vw,1.1rem)]">
          New Business Deck
        </span>

        <div className="mt-10 md:ml-[4%] md:mt-[7%]">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Influmedia"
              width={480}
              height={210}
              priority
              className="h-auto w-[70%] max-w-[480px]"
            />
          ) : (
            <AssetPlaceholder label="Logo" className="aspect-[480/210] w-[70%] max-w-[480px]" />
          )}
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
              href="/menu"
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
