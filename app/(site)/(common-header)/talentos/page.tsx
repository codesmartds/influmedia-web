import type { Metadata } from "next";
import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { TalentsSlide } from "@/components/talents/TalentsSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Talentos exclusivos | Influmedia",
};

// Fisher–Yates shuffle, so each visit shows a different order.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default async function TalentsPage() {
  // Render per request: the shuffle must not be frozen at build time.
  await connection();
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "talents",
    where: { active: { equals: true } },
    depth: 1,
    limit: 100,
  });

  return (
    <PageTransition>
      <TalentsSlide talents={shuffle(docs)} />
    </PageTransition>
  );
}
