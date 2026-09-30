import type { Metadata } from "next";
import { HistorySlide } from "@/components/history/HistorySlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Nuestra historia | Influmedia",
};

export default function HistoryPage() {
  return (
    <PageTransition>
      <HistorySlide />
    </PageTransition>
  );
}
