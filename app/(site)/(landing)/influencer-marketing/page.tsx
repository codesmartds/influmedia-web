import type { Metadata } from "next";
import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { CaseSlider } from "@/components/cases/CaseSlider";
import { ContactSection } from "@/components/contact/ContactSection";
import { Stats } from "@/components/home/sections";
import {
  Approach,
  BeforeAfter,
  Challenges,
  ExclusiveTalent,
  ImHero,
  Process,
  Services,
  WhyUs,
} from "@/components/influencer-marketing/sections";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Influencer marketing | Influmedia",
  description:
    "Campañas con creadores que se planean, se controlan y se miden: estrategia, talento exclusivo y tecnología en Centroamérica y el Caribe.",
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Sales page for brands. Sections answer the buyer's questions in order:
// why this channel → what changes → how we think → what you buy → how it
// runs → why us → who → proof → contact.
export default async function InfluencerMarketingPage() {
  await connection(); // talents are shuffled per visit
  const payload = await getPayload({ config });
  const [cases, talents, contact] = await Promise.all([
    payload.find({ collection: "case-studies", where: { published: { equals: true } }, sort: "-publishedAt", limit: 6, depth: 1 }),
    payload.find({ collection: "talents", where: { active: { equals: true } }, depth: 1, limit: 100 }),
    payload.findGlobal({ slug: "contact-info" }),
  ]);
  // Random talents with a photo feed the demo panels, the scroll stories and the marquee.
  const withPhoto = shuffle(talents.docs.filter((t) => typeof t.thumbnail === "object" && t.thumbnail?.url));

  return (
    <PageTransition>
      <ImHero />
      <Challenges />
      <BeforeAfter talents={withPhoto} />
      <Approach />
      <Services talents={withPhoto} />
      <Process talents={withPhoto.slice(3)} />
      <WhyUs />
      <ExclusiveTalent talents={withPhoto} />
      <Stats />
      {cases.docs.length > 0 && <CaseSlider cases={cases.docs} allHref={null} />}
      <ContactSection contact={contact} />
    </PageTransition>
  );
}
