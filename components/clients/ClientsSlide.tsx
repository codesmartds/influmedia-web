import type { Brand } from "@/payload-types";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal } from "@/components/transitions/Reveal";
import { BrandGrid } from "./BrandGrid";

export function ClientsSlide({ brands }: { brands: NonNullable<Brand["items"]> }) {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.5%]">
      <Reveal className="mt-6 flex flex-col">
        <SlideIntro
          eyebrow="Algunos clientes"
          tone="primary"
          title="Marcas que ya entraron a la conversación."
          subtitle="Una muestra de marcas que han confiado en nuestra operación."
        />
      </Reveal>

      <BrandGrid brands={brands} />
    </section>
  );
}
