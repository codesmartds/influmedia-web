import type { Metadata } from "next";
import { WhySlide } from "@/components/why/WhySlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Por qué Influmedia | Influmedia",
};

export default function WhyPage() {
  return (
    <PageTransition>
      <WhySlide />
    </PageTransition>
  );
}
