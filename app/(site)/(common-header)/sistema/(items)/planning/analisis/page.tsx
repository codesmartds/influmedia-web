import type { Metadata } from "next";
import { AnalysisSlide } from "@/components/system/planning/AnalysisSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Planning / Análisis | Influmedia",
};

export default function AnalysisPage() {
  return (
    <PageTransition>
      <AnalysisSlide />
    </PageTransition>
  );
}
