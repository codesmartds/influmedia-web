import type { Metadata } from "next";
import { PlanningSlide } from "@/components/system/planning/PlanningSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Planning | Influmedia",
};

export default function PlanningPage() {
  return (
    <PageTransition>
      <PlanningSlide />
    </PageTransition>
  );
}
