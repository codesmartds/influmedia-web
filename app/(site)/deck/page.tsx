import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { DeckSlide } from "@/components/deck/DeckSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "¿Qué quieres ver? | Influmedia",
};

export default async function DeckPage() {
  const payload = await getPayload({ config });
  const deck = await payload.findGlobal({ slug: "deck" });

  return (
    <PageTransition>
      <DeckSlide sections={deck.sections ?? []} />
    </PageTransition>
  );
}
