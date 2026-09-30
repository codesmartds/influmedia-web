import type { Metadata } from "next";
import { ImpactSlide } from "@/components/impact/ImpactSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Impacto | Influmedia",
};

export default function ImpactPage() {
  return (
    <PageTransition>
      <ImpactSlide />
    </PageTransition>
  );
}
