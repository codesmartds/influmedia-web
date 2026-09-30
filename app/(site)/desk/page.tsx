import type { Metadata } from "next";
import { DeskSlide } from "@/components/desk/DeskSlide";

export const metadata: Metadata = {
  title: "¿Qué quieres ver? | Influmedia",
};

export default function DeskPage() {
  return <DeskSlide />;
}
