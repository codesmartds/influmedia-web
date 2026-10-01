import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { ApproachSlide } from "@/components/approach/ApproachSlide";
import { ClientsSlide } from "@/components/clients/ClientsSlide";
import { ImpactSlide } from "@/components/impact/ImpactSlide";
import { ContactCta } from "@/components/layout/ContactCta";
import { LandingSection } from "@/components/layout/LandingSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesSlide } from "@/components/services/ServicesSlide";
import { SystemSlide } from "@/components/system/SystemSlide";
import { PageTransition } from "@/components/transitions/PageTransition";
import { WhySlide } from "@/components/why/WhySlide";

export const metadata: Metadata = {
  title: "Influencer marketing | Influmedia",
  description: "Estrategia, contenido, comunidad e innovación: influencer marketing 360° en Centroamérica y el Caribe.",
};

// Order follows the site map: why influencer marketing → 360° services →
// process (people → KPIs → influencers → content → results) → proof → CTA.
export default async function InfluencerMarketingPage() {
  const payload = await getPayload({ config });
  const brands = await payload.findGlobal({ slug: "brands", depth: 1 });

  return (
    <PageTransition>
      <PageHeader eyebrow="Influencer marketing" title="Influencer marketing que mueve conversaciones.">
        Estrategia, creatividad y tecnología para conectar marcas con personas reales, de la planeación al reporte.
      </PageHeader>
      <LandingSection id="enfoque">
        <ApproachSlide />
      </LandingSection>
      <LandingSection id="servicios">
        <ServicesSlide />
      </LandingSection>
      <LandingSection id="por-que-influmedia">
        <WhySlide />
      </LandingSection>
      <LandingSection id="sistema">
        <SystemSlide />
      </LandingSection>
      <LandingSection id="impacto">
        <ImpactSlide />
      </LandingSection>
      <LandingSection id="clientes">
        <ClientsSlide brands={brands.items ?? []} />
      </LandingSection>
      <ContactCta />
    </PageTransition>
  );
}
