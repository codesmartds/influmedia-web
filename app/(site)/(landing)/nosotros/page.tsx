import type { Metadata } from "next";
import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { Faq, institutionalFaqs } from "@/components/about/Faq";
import { AboutContact, AboutHero, History, Presence, Principles, Purpose, TalentShowcase, TeamList } from "@/components/about/sections";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Nosotros | Influmedia",
  description: "Somos tu partner para que tu campaña llegue a los medios correctos. Powered by people.",
};

// Fisher–Yates shuffle, so the talent panels show a different mix each visit.
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Who Influmedia is and why to trust them: purpose → story → reach →
// people → principles → roster → institutional FAQ → contact.
export default async function AboutPage() {
  // Render per request: the shuffle must not be frozen at build time.
  await connection();
  const payload = await getPayload({ config });
  const [talents, team, contact] = await Promise.all([
    payload.find({ collection: "talents", where: { active: { equals: true } }, depth: 1, limit: 100 }),
    payload.find({ collection: "team", where: { active: { equals: true } }, sort: "order", depth: 1, limit: 50 }),
    payload.findGlobal({ slug: "contact-info" }),
  ]);
  const shuffled = shuffle(talents.docs);

  return (
    <PageTransition>
      <AboutHero talents={shuffled} />
      <Purpose />
      <History />
      <Presence />
      <TeamList members={team.docs} />
      <Principles />
      {/* Hero shows the first five; the grid starts after them so faces don't repeat. */}
      <TalentShowcase talents={[...shuffled.slice(5), ...shuffled.slice(0, 5)]} />
      <section id="faq" className="mx-auto w-full max-w-[96rem] scroll-mt-24 border-t border-base-300 px-5 py-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%]">
        <Faq items={institutionalFaqs} />
      </section>
      <AboutContact contact={contact} />
    </PageTransition>
  );
}
