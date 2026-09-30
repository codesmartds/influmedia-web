import type { Metadata } from "next";
import { ReportsSlide } from "@/components/system/postbuy/ReportsSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Postbuy / Reportes | Influmedia",
};

export default function ReportsPage() {
  return (
    <PageTransition>
      <ReportsSlide />
    </PageTransition>
  );
}
