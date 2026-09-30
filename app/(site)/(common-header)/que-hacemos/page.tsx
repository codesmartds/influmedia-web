import type { Metadata } from "next";
import { ServicesSlide } from "@/components/services/ServicesSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Qué hacemos | Influmedia",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <ServicesSlide />
    </PageTransition>
  );
}
