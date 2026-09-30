import type { Metadata } from "next";
import { SystemSlide } from "@/components/system/SystemSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Nuestro sistema | Influmedia",
};

export default function SystemPage() {
  return (
    <PageTransition>
      <SystemSlide />
    </PageTransition>
  );
}
