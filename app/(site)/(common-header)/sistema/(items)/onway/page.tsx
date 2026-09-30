import type { Metadata } from "next";
import { OnwaySlide } from "@/components/system/onway/OnwaySlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Onway | Influmedia",
};

export default function OnwayPage() {
  return (
    <PageTransition>
      <OnwaySlide />
    </PageTransition>
  );
}
