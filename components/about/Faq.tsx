import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Proposed answers drawn from the deck; to be confirmed with the client.
const faqs = [
  {
    q: "¿En qué países operan?",
    a: "Nacimos en Guatemala y operamos campañas en más de 8 países de Centroamérica y el Caribe, coordinando talento, contenido y medición desde una sola operación.",
  },
  {
    q: "¿Cuánto tiempo toma planificar una campaña?",
    a: "La etapa de Planning toma entre 24 y 48 horas: analizamos perfiles, afinidad de audiencia y autenticidad, y proyectamos resultados antes de activar.",
  },
  {
    q: "¿Cómo eligen a los influencers?",
    a: "No miramos solo el número de seguidores. Analizamos edad, ubicación, género y autenticidad de la audiencia, categorías de contenido y patrones de crecimiento.",
  },
  {
    q: "¿Cómo evitan el fraude con seguidores falsos?",
    a: "Detectamos señales de audiencias o actividad sospechosa antes de recomendar un perfil, y monitoreamos alertas durante la campaña.",
  },
  {
    q: "¿Qué reportes reciben las marcas?",
    a: "En las 48 horas posteriores entregamos un reporte con lectura e insights: métricas de negocio (CPE, ROI, EM, VMG), métricas por publicación y listening.",
  },
  {
    q: "¿Trabajan con talentos exclusivos?",
    a: "Sí. Representamos y gestionamos un roster de más de 30 creadores, con convenios de exclusividad por categoría y marca.",
  },
];

export function Faq() {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.7%]">
      <Reveal className="flex flex-col">
        <SlideIntro eyebrow="Preguntas frecuentes" title="Lo que suelen preguntarnos." />
        <RevealItem as="div" effect="fade" stagger={0.06} className="mt-8 flex max-w-4xl flex-col gap-3">
          {faqs.map((faq) => (
            <RevealItem key={faq.q}>
              <details className="group rounded-2xl border border-base-300 bg-base-200 open:border-primary/60">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 text-lg font-bold md:p-6">
                  {faq.q}
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-base-300 text-xl text-secondary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-base-content/80 md:px-6 md:pb-6">{faq.a}</p>
              </details>
            </RevealItem>
          ))}
        </RevealItem>
      </Reveal>
    </section>
  );
}
