import type { Metadata } from "next";
import { ProjectionSlide } from "@/components/system/planning/ProjectionSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Planning / Proyección | Influmedia",
};

export default function ProjectionPage() {
  return (
    <PageTransition>
      <ProjectionSlide />
    </PageTransition>
  );
}
