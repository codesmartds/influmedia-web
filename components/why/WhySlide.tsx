import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Dot colors follow the deck; the last four extend the palette with the
// theme's status colors plus two tints of the brand violet and blue.
const reasons = [
  { title: "Equipo especializado", text: "Influencer marketing como foco, no como servicio secundario.", dot: "bg-primary" },
  { title: "Exclusividad", text: "Convenios de exclusividad por categoría.", dot: "bg-accent" },
  { title: "100% cumplimiento", text: "Seguimiento de las acciones contratadas.", dot: "bg-success" },
  { title: "Facturación", text: "Consolidación de facturación en un solo punto.", dot: "bg-secondary" },
  { title: "Reportes + insights", text: "Herramientas y tecnología para extraer insights de valor.", dot: "bg-warning" },
  { title: "Prevención de fraude", text: "Detección de señales de audiencias o actividad sospechosa.", dot: "bg-error" },
  { title: "Proyección de ROI", text: "Estimaciones previas para tomar decisiones con contexto.", dot: "bg-[#8b5cf6]" },
  { title: "Mejores tarifas", text: "Negociación por volumen con generadores de contenido.", dot: "bg-info" },
];

export function WhySlide() {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.7%]">
      <Reveal className="mt-6 flex flex-1 flex-col">
        <SlideIntro
          eyebrow="Por qué Influmedia"
          title="Menos fricción. Más control. Mejor lectura."
          subtitle="La operación detrás de una campaña también es parte de la propuesta de valor."
        />

        <RevealItem
          as="ul"
          effect="fade"
          stagger={0.06}
          className="mt-8 grid gap-4 sm:grid-cols-2 md:-mx-[3%] md:mt-[5%] lg:grid-cols-4 lg:gap-x-[2.6vw] lg:gap-y-[2.9vw]"
        >
          {reasons.map((reason) => (
            <RevealItem
              as="li"
              key={reason.title}
              className="rounded-2xl border border-base-300 bg-base-200 px-6 pb-8 pt-6 md:px-[6.5%] md:pb-[9%] md:pt-[7%]"
            >
              <div className="flex items-center gap-4">
                <span aria-hidden className={`size-7 shrink-0 rounded-full md:size-[clamp(1.5rem,1.8vw,2rem)] ${reason.dot}`} />
                <h2 className="text-base font-bold uppercase md:text-[clamp(0.9rem,1.28vw,1.4rem)] lg:whitespace-nowrap">{reason.title}</h2>
              </div>
              <p className="mt-4 text-base leading-snug text-base-content/75 md:mt-[8%] md:text-[clamp(0.95rem,1.45vw,1.55rem)]">
                {reason.text}
              </p>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}
