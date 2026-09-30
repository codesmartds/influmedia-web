import type { Brand } from "@/payload-types";
import { SlideFooter } from "@/components/slides/SlideFooter";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal } from "@/components/transitions/Reveal";
import { BrandGrid } from "./BrandGrid";

export function ClientsSlide({ brands }: { brands: NonNullable<Brand["items"]> }) {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 pb-8 md:px-[4.5%] md:pb-[2%]">
      <Reveal className="mt-6 flex flex-col md:-mt-[3.2%]">
        <SlideIntro
          eyebrow="Algunos clientes"
          tone="primary"
          title="Marcas que ya entraron a la conversación."
          subtitle="Una muestra de marcas que han confiado en nuestra operación."
        />
      </Reveal>

      <BrandGrid brands={brands} />

      <SlideFooter label="Clients" />
    </section>
  );
}
