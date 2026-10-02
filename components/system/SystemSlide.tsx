import type { ReactNode } from "react";
import { AudienceDashboard } from "@/components/dashboards/AudienceDashboard";
import { CampaignReport } from "@/components/dashboards/CampaignReport";
import { CommandCenter } from "@/components/dashboards/CommandCenter";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

type Stage = {
  step: string;
  name: string;
  timing: string;
  summary: string;
  points: string[];
  accent: string;
  visual: ReactNode;
};

const stages: Stage[] = [
  {
    step: "01",
    name: "Planning",
    timing: "24–48 horas",
    summary: "Reducimos incertidumbre antes de activar.",
    points: ["Análisis de perfil y autenticidad", "Afinidad de audiencia", "Proyección de alcance y ROI"],
    accent: "text-primary",
    visual: <AudienceDashboard />,
  },
  {
    step: "02",
    name: "Onway",
    timing: "Durante la campaña",
    summary: "Detectamos desvíos mientras todavía se pueden corregir.",
    points: ["Resultados en tiempo real", "Calendario de creadores", "Alertas de actividad sospechosa"],
    accent: "text-secondary",
    visual: <CommandCenter />,
  },
  {
    step: "03",
    name: "Postbuy",
    timing: "48 horas después",
    summary: "Cerramos con lectura, no solo con un PDF de métricas.",
    points: ["Métricas de negocio: CPE, ROI, EM, VMG", "Métricas por publicación y listening", "Insights para la próxima campaña"],
    accent: "text-accent",
    visual: <CampaignReport />,
  },
];

// "Nuestro sistema": the three stages as consecutive panels, each a short
// summary next to its live dashboard, alternating sides.
export function SystemSlide() {
  return (
    <div className="flex w-full flex-col px-6 md:px-[4.7%]">
      <Reveal>
        <SlideIntro eyebrow="Nuestro sistema" tone="primary" title="Una campaña, tres momentos." />
      </Reveal>
      <ol className="mt-14 flex flex-col gap-20 md:gap-28">
        {stages.map((stage, index) => (
          <li key={stage.name}>
            <Reveal className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <RevealItem effect="fade" stagger className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <RevealItem as="p" className={`text-5xl font-bold ${stage.accent}`}>
                  {stage.step}
                </RevealItem>
                <RevealItem as="h3" className="mt-3 text-4xl font-bold uppercase md:text-5xl">
                  {stage.name}
                </RevealItem>
                <RevealItem as="p" className={`mt-2 text-sm font-bold uppercase ${stage.accent}`}>
                  {stage.timing}
                </RevealItem>
                <RevealItem as="p" className="mt-5 text-xl leading-snug text-base-content/85">
                  {stage.summary}
                </RevealItem>
                <RevealItem as="ul" effect="fade" stagger className="mt-6 flex flex-col gap-3">
                  {stage.points.map((point) => (
                    <RevealItem as="li" effect="left" key={point} className="flex items-start gap-3 text-base-content/80">
                      <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-secondary" />
                      {point}
                    </RevealItem>
                  ))}
                </RevealItem>
              </RevealItem>
              <RevealItem effect={index % 2 === 1 ? "left" : "right"}>{stage.visual}</RevealItem>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
