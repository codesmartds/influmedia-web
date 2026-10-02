import type { Metadata } from "next";
import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { Faq, institutionalFaqs } from "@/components/about/Faq";
import { AboutHero, History, Manifesto, Presence, Principles, TalentShowcase, TeamGrid } from "@/components/about/sections";
import { DualCta } from "@/components/home/sections";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Nosotros | Influmedia",
  description: "Somos tu partner para que tu campaña llegue a los medios correctos. Powered by people.",
};

// Fisher–Yates shuffle, so the talent panel shows a different mix each visit.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Who Influmedia is and why to trust them: purpose → story → reach →
// people → principles → roster → institutional FAQ → two-way close.
export default async function AboutPage() {
  // Render per request: the shuffle must not be frozen at build time.
  await connection();
  const payload = await getPayload({ config });
  const [talents, team] = await Promise.all([
    payload.find({ collection: "talents", where: { active: { equals: true } }, depth: 1, limit: 100 }),
    payload.find({ collection: "team", where: { active: { equals: true } }, sort: "order", depth: 1, limit: 50 }),
  ]);

  return (
    <PageTransition>
      <AboutHero />
      <Manifesto />
      <div id="historia" className="scroll-mt-24">
        <History />
      </div>
      <Presence />
      <div id="equipo" className="scroll-mt-24">
        <TeamGrid members={team.docs} />
      </div>
      <Principles />
      <div id="talentos" className="scroll-mt-24">
        <TalentShowcase talents={shuffle(talents.docs)} />
      </div>
      <section id="faq" className="mx-auto w-full max-w-[96rem] scroll-mt-24 py-20 md:py-28">
        <Faq items={institutionalFaqs} />
      </section>
      <DualCta contactHref="/contacto" />
    </PageTransition>
  );
}
