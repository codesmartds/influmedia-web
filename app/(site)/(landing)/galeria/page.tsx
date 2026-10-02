import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { GalleryMosaic } from "@/components/gallery/GalleryMosaic";
import { ContactCta } from "@/components/layout/ContactCta";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Galería | Influmedia",
  description: "Experiencias y eventos Influmedia: creators, producto y formatos dentro de campañas reales.",
};

export default async function GalleryPage() {
  const payload = await getPayload({ config });
  const gallery = await payload.findGlobal({ slug: "gallery", depth: 1 });
  const items = gallery.items ?? [];

  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-[96rem] px-6 pb-10 pt-16 md:px-[4.7%] md:pt-24">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
              Galería
            </RevealItem>
            <RevealItem as="h1" className="mt-4 max-w-[18ch] text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[1.02]">
              Así se ven las conversaciones que movemos.
            </RevealItem>
            <RevealItem as="p" className="mt-6 max-w-[52ch] text-lg leading-snug text-base-content/80 md:text-xl">
              Experiencias, eventos y campañas Influmedia: creadores, producto y formatos en acción.
            </RevealItem>
          </div>
          <RevealItem as="p" className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-base-content/50">
            <span aria-hidden className="h-px w-8 bg-base-content/30" />
            {String(items.length).padStart(2, "0")} piezas
          </RevealItem>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[96rem] px-6 pb-12 md:px-[4.7%]">
        <GalleryMosaic items={items} />
      </section>

      <ContactCta title="¿Quieres ver tu marca aquí?" />
    </PageTransition>
  );
}
