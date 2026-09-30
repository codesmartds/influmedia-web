import type { Metadata } from "next";
import { CommandSlide } from "@/components/system/onway/CommandSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Onway / Command center | Influmedia",
};

export default function CommandPage() {
  return (
    <PageTransition>
      <CommandSlide />
    </PageTransition>
  );
}
