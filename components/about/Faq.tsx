import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

export type FaqItem = { q: string; a: string };

// Proposed answers drawn from the deck; to be confirmed with the client.
export const institutionalFaqs: FaqItem[] = [
  {
    q: "¿En qué países operan?",
    a: "Nacimos en Guatemala y operamos campañas en más de 8 países de Centroamérica y el Caribe, coordinando talento, contenido y medición desde una sola operación.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Nuestra oficina está en el Campus Tecnológico TEC I, Oficina 601, Vía 4 1-00, Zona 4, Ciudad de Guatemala.",
  },
  {
    q: "¿Trabajan con talentos exclusivos?",
    a: "Sí. Representamos y gestionamos un roster de más de 30 creadores, con convenios de exclusividad por categoría y marca.",
  },
  {
    q: "¿Cómo puedo unirme como creador?",
    a: "Aplica desde la página Creadores. Revisamos cada perfil y te contactamos si encaja con lo que buscan nuestras marcas.",
  },
];

export const brandFaqs: FaqItem[] = [
  {
    q: "¿Cuánto cuesta una campaña?",
    a: "Cada campaña se cotiza según sus objetivos, mercados, formatos y creadores. Cuéntanos tu proyecto y te enviamos una propuesta a la medida.",
  },
  {
    q: "¿Cuánto tiempo toma arrancar?",
    a: "La etapa de Planning toma entre 24 y 48 horas: analizamos perfiles, afinidad de audiencia y autenticidad, y proyectamos resultados antes de activar.",
  },
  {
    q: "¿Cómo eligen a los influencers?",
    a: "No miramos solo el número de seguidores. Analizamos edad, ubicación, género y autenticidad de la audiencia, categorías de contenido y patrones de crecimiento.",
  },
  {
    q: "¿Cómo evitan el fraude con seguidores falsos?",
    a: "Detectamos señales de audiencias o actividad sospechosa antes de recomendar un perfil, y monitoreamos alertas durante toda la campaña.",
  },
  {
    q: "¿Cómo miden los resultados?",
    a: "En las 48 horas posteriores entregamos un reporte con lectura e insights: métricas de negocio (CPE, ROI, EM, VMG), métricas por publicación y listening.",
  },
  {
    q: "¿Puedo tener exclusividad de un creador?",
    a: "Sí. Nuestros convenios permiten exclusividad por categoría, para que la misma voz no recomiende a tu competencia en la misma temporada.",
  },
  {
    q: "¿Cómo se maneja la facturación?",
    a: "Consolidamos todo en un solo punto: tú recibes una factura y nosotros gestionamos los pagos a cada creador.",
  },
  {
    q: "¿Pueden operar campañas en varios países a la vez?",
    a: "Sí. Coordinamos talento, contenido y medición en múltiples mercados de Centroamérica y el Caribe desde una sola operación.",
  },
];

export function Faq({ items, title = "Lo que suelen preguntarnos." }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="relative flex w-full flex-col px-6 md:px-[4.7%]">
      <Reveal className="flex flex-col">
        <SlideIntro eyebrow="Preguntas frecuentes" title={title} />
        <RevealItem as="div" effect="fade" stagger={0.06} className="mt-8 grid items-start gap-3 lg:grid-cols-2">
          {items.map((faq) => (
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
