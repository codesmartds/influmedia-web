import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { ContactCta } from "@/components/layout/ContactCta";
import { LandingSection } from "@/components/layout/LandingSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageTransition } from "@/components/transitions/PageTransition";
import { WorkSlide } from "@/components/work/WorkSlide";

export const metadata: Metadata = {
  title: "Galería | Influmedia",
  description: "Experiencias y eventos Influmedia: creators, producto y formatos dentro de campañas reales.",
};

export default async function GalleryPage() {
  const payload = await getPayload({ config });
  const gallery = await payload.findGlobal({ slug: "gallery", depth: 1 });

  return (
    <PageTransition>
      <PageHeader eyebrow="Galería" title="Experiencias y eventos Influmedia." />
      <LandingSection>
        <WorkSlide items={gallery.items ?? []} />
      </LandingSection>
      <ContactCta title="¿Quieres ver tu marca aquí?" />
    </PageTransition>
  );
}
