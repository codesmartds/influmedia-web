import type { IconType } from "react-icons";
import { TbCurrencyDollar, TbEye, TbSpeakerphone, TbTrendingUp } from "react-icons/tb";
import { CampaignReport } from "@/components/dashboards/CampaignReport";
import { CountUp } from "@/components/slides/CountUp";
import { SlideIntro } from "@/components/slides/SlideIntro";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

const metrics: {
  name: string;
  value: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  label: string;
  Icon: IconType;
  icon: string;
}[] = [
  { name: "CPE", value: 0.06, decimals: 2, prefix: "$", suffix: "", label: "Costo por engagement", Icon: TbCurrencyDollar, icon: "bg-primary" },
  { name: "ROI", value: 4.8, decimals: 1, suffix: "x", label: "Retorno de inversión", Icon: TbTrendingUp, icon: "bg-info" },
  { name: "EM", value: 73, decimals: 0, suffix: "%", label: "Engagement rate medio", Icon: TbSpeakerphone, icon: "bg-secondary" },
  { name: "VMG", value: 82, decimals: 0, suffix: "%", label: "Viewability medio garantizado", Icon: TbEye, icon: "bg-primary" },
];

export function ReportsSlide() {
  return (
    <section className="relative flex w-full flex-1 flex-col px-6 md:px-[4.6%]">
      <Reveal className="mt-6 flex flex-1 flex-col md:-mt-[2.6%]">
        <SlideIntro
          eyebrow="Postbuy / Reportes"
          tone="primary"
          title="Un reporte que explica qué pasó y qué sigue."
          subtitle="Combinamos performance, contenido e insights para cerrar el ciclo."
        />
        <div className="mt-8 grid flex-1 items-center gap-10 md:-ml-[2.8%] md:mb-[2%] md:mt-[2.5%] md:grid-cols-[48%_1fr] md:gap-[4.5%]">
          <RevealItem effect="scale">
            <CampaignReport />
          </RevealItem>

          <RevealItem effect="fade" stagger={0.08} className="flex flex-col">
            <ul className="grid grid-cols-2 gap-3 rounded-[1.75rem] bg-white p-3 md:mr-[12%] md:gap-[0.9vw] md:p-[0.9vw]">
              {metrics.map(({ name, value, decimals, prefix, suffix, label, Icon, icon }, index) => (
                <RevealItem
                  as="li"
                  effect="scale"
                  key={name}
                  className="flex flex-col items-center rounded-xl border border-b-4 border-[#ebe9f2] border-b-[#6c3af0]/60 px-3 pb-4 pt-3 text-center text-[#14102b]"
                >
                  <span className="flex items-center gap-2 self-start">
                    <span className={`flex size-9 items-center justify-center rounded-full text-lg text-white ${icon}`}>
                      <Icon aria-hidden />
                    </span>
                    <span className="font-bold text-[#6c3af0]">{name}</span>
                  </span>
                  <span className="mt-1 text-3xl font-bold tabular-nums md:text-[clamp(1.6rem,2.6vw,2.8rem)]">
                    <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} delay={0.9 + index * 0.1} />
                  </span>
                  <span className="mt-1 text-xs text-[#6b6880] md:text-[clamp(0.65rem,0.8vw,0.9rem)]">{label}</span>
                </RevealItem>
              ))}
            </ul>
            <RevealItem as="h2" className="mt-6 text-xl font-bold uppercase md:mt-[4%] md:text-[clamp(1.2rem,1.65vw,1.8rem)]">
              Métricas de negocio
            </RevealItem>
            <RevealItem as="p" className="text-xl font-bold uppercase text-secondary md:text-[clamp(1.2rem,1.65vw,1.8rem)]">
              CPE • ROI • EM • VMG
            </RevealItem>
            <RevealItem as="p" className="mt-3 text-base text-base-content/80 md:text-[clamp(0.95rem,1.4vw,1.5rem)]">
              Más métricas específicas por post y tecnología tipo listening.
            </RevealItem>
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
