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

// Accordion in the redesign style: native <details> sharing a name, so only one
// stays open (and it works without JavaScript). The first one starts open.
export function Faq({ items, title = "Lo que suelen preguntarnos." }: { items: FaqItem[]; title?: string }) {
  return (
    <Reveal className="grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-3">
      <div className="flex flex-col gap-[22px]">
        <RevealItem as="p" className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">
          Preguntas frecuentes
        </RevealItem>
        <RevealItem as="h2" className="text-[clamp(1.75rem,3.64vw,3.1rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-balance">
          {title}
        </RevealItem>
      </div>
      <RevealItem effect="fade" className="flex min-w-0 flex-col border-t border-base-300 lg:col-span-2">
        {items.map((faq, i) => (
          <details key={faq.q} name="faq" open={i === 0} className="group border-b border-base-300">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[26px] [&::-webkit-details-marker]:hidden">
              <span className="font-display text-[clamp(22px,2.4vw,32px)] font-medium tracking-[-0.03em] text-[#d6d0de] transition-colors group-open:text-base-content">
                {faq.q}
              </span>
              <span
                aria-hidden
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-base-content/20 text-xl text-accent-cycle transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[720px] pr-16 pb-7 text-[17px] leading-relaxed text-muted">{faq.a}</p>
          </details>
        ))}
      </RevealItem>
    </Reveal>
  );
}
