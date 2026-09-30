import type { Metadata } from "next";
import { ApproachSlide } from "@/components/approach/ApproachSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Nuestro enfoque | Influmedia",
};

export default function ApproachPage() {
  return (
    <PageTransition>
      <ApproachSlide />
    </PageTransition>
  );
}
