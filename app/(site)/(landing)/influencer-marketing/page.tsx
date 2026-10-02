import type { Metadata } from "next";
import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { brandFaqs, Faq } from "@/components/about/Faq";
import { ApproachSlide } from "@/components/approach/ApproachSlide";
import { ContactSection } from "@/components/contact/ContactSection";
import { Roster } from "@/components/home/sections";
import { Results } from "@/components/influencer-marketing/Results";
import { SectionNav } from "@/components/influencer-marketing/SectionNav";
import { Differentiators, HowWeStart, ImHero, Services } from "@/components/influencer-marketing/sections";
import { SystemSlide } from "@/components/system/SystemSlide";
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
// why this channel → what you buy → how it runs → why us → proof → who →
// how to start → objections → contact.
export default async function InfluencerMarketingPage() {
  await connection(); // roster is shuffled per visit
  const payload = await getPayload({ config });
  const [brands, cases, talents, contact] = await Promise.all([
    payload.findGlobal({ slug: "brands", depth: 1 }),
    payload.find({ collection: "case-studies", where: { published: { equals: true } }, sort: "-publishedAt", limit: 12, depth: 1 }),
    payload.find({ collection: "talents", where: { active: { equals: true } }, depth: 1, limit: 100 }),
    payload.findGlobal({ slug: "contact-info" }),
  ]);

  return (
    <PageTransition>
      <ImHero />
      <SectionNav />
      <div id="por-que" className="mx-auto w-full max-w-[96rem] scroll-mt-36 py-20 md:py-28">
        <ApproachSlide />
      </div>
      <Services />
      <div id="sistema" className="mx-auto w-full max-w-[96rem] scroll-mt-36 py-20 md:py-28">
        <SystemSlide />
      </div>
      <Differentiators />
      <Results cases={cases.docs} brands={brands.items ?? []} />
      <div id="talento" className="scroll-mt-36">
        <Roster talents={shuffle(talents.docs)} forBrands />
      </div>
      <HowWeStart />
      <div id="faq" className="mx-auto w-full max-w-[96rem] scroll-mt-36 py-20 md:py-28">
        <Faq items={brandFaqs} title="Lo que nos preguntan las marcas." />
      </div>
      <ContactSection contact={contact} />
    </PageTransition>
  );
}
