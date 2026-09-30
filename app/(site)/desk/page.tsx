import type { Metadata } from "next";
import { DeskSlide } from "@/components/desk/DeskSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "¿Qué quieres ver? | Influmedia",
};

export default function DeskPage() {
  return (
    <PageTransition>
      <DeskSlide />
    </PageTransition>
  );
}
