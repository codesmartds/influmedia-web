import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { Gallery, Media } from "@/payload-types";
import { SlideFooter } from "@/components/slides/SlideFooter";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

type GalleryItem = NonNullable<Gallery["items"]>[number];

// Target row height; each image's width follows from its aspect ratio.
const ROW_HEIGHT = "clamp(9rem, 13vw, 15rem)";

export function WorkSlide({ items }: { items: GalleryItem[] }) {
  const images = items
    .map((item) => (typeof item.image === "object" ? (item.image as Media) : null))
    .filter((image): image is Media => Boolean(image?.url));

  return (
    <section className="relative flex w-full flex-1 flex-col px-6 pb-8 md:px-[5.5%] md:pb-[2%]">
      <Reveal className="mt-6 flex flex-1 flex-col md:-mt-[3%]">
        <RevealItem
          as="p"
          className="text-sm font-bold uppercase text-secondary md:text-[clamp(0.9rem,1.45vw,1.55rem)]"
        >
          Trabajo en acción
        </RevealItem>
        <RevealItem as="h1" className="mt-4 text-[clamp(2rem,3.3vw,3.6rem)] font-bold leading-[1.15] md:mt-[2.2%]">
          La data no reemplaza el contenido.
          <br />
          Lo hace más intencional.
        </RevealItem>
        <RevealItem as="p" className="mt-3 text-[clamp(1rem,1.75vw,1.9rem)] text-base-content/85">
          Creators, producto y formatos viviendo dentro de campañas reales.
        </RevealItem>

        {images.length === 0 ? (
          <RevealItem as="p" className="mt-10 text-base-content/60">
            Aún no hay imágenes. Agrégalas en el admin, en Contenido › Galería.
          </RevealItem>
        ) : (
          <RevealItem
            as="ul"
            effect="fade"
            stagger={0.05}
            className="mt-8 flex flex-wrap gap-3 md:-mx-[1.8%] md:mt-[2.8%] md:gap-[1.4vw]"
          >
            {images.map((image) => {
              const ratio = image.width && image.height ? image.width / image.height : 4 / 3;
              return (
                <RevealItem
                  as="li"
                  effect="scale"
                  key={image.id}
                  style={{ flexGrow: ratio, flexBasis: `calc(${ratio} * ${ROW_HEIGHT})` }}
                  className="rounded-xl border-2 border-base-300 bg-base-200 p-1.5"
                >
                  <div className="relative overflow-hidden rounded-md" style={{ aspectRatio: ratio }}>
                    <Image
                      src={image.url!}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                </RevealItem>
              );
            })}
            {/* Absorbs leftover space so the last row keeps the row height. */}
            <li aria-hidden className="grow-[100] basis-0" />
          </RevealItem>
        )}

        <RevealItem className="mt-8 md:mt-[3%]">
          <Link
            href="/talentos"
            transitionTypes={["nav-forward"]}
            className="btn btn-primary h-auto w-full rounded-lg border-0 px-10 py-4 text-base font-bold uppercase shadow-lg sm:w-auto sm:min-w-[20vw] md:text-[clamp(0.9rem,1.1vw,1.2rem)]"
          >
            Ver talentos <FiArrowRight aria-hidden />
          </Link>
        </RevealItem>
      </Reveal>

      <SlideFooter label="Lead the conversation" />
    </section>
  );
}
