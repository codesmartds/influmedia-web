import type { Metadata } from "next";
import { AboutSlide } from "@/components/about/AboutSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Quiénes somos | Influmedia",
};

export default function AboutPage() {
  return (
    <PageTransition>
      <AboutSlide />
    </PageTransition>
  );
}
