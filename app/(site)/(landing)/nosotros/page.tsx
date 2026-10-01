import type { Metadata } from "next";
import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { AboutSlide } from "@/components/about/AboutSlide";
import { Faq } from "@/components/about/Faq";
import { HistorySlide } from "@/components/history/HistorySlide";
import { LandingSection } from "@/components/layout/LandingSection";
import { PageHeader } from "@/components/layout/PageHeader";
import { TalentsSlide } from "@/components/talents/TalentsSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Nosotros | Influmedia",
  description: "Somos tu partner para que tu campaña llegue a los medios correctos.",
};

// Fisher–Yates shuffle, so the talent panel shows a different mix each visit.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default async function AboutPage() {
  // Render per request: the shuffle must not be frozen at build time.
  await connection();
  const payload = await getPayload({ config });
  const { docs: talents } = await payload.find({
    collection: "talents",
    where: { active: { equals: true } },
    depth: 1,
    limit: 100,
  });

  return (
    <PageTransition>
      <PageHeader eyebrow="Nosotros" title="Somos tu partner para que tu campaña llegue a los medios correctos." />
      <LandingSection id="quienes-somos">
        <AboutSlide />
      </LandingSection>
      <LandingSection id="historia">
        <HistorySlide />
      </LandingSection>
      <LandingSection id="talentos">
        <TalentsSlide talents={shuffle(talents)} />
      </LandingSection>
      <LandingSection id="faq">
        <Faq />
      </LandingSection>
    </PageTransition>
  );
}
