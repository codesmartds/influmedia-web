import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { ContactSection } from "@/components/contact/ContactSection";
import { HeroSlide } from "@/components/home/HeroSlide";
import {
  CaseStudies,
  ClientMarquee,
  LatestPosts,
  InfluencerMarketing360,
  Method,
  Stats,
  TalentNetwork,
  WhatWeDo,
} from "@/components/home/sections";
import { NewsletterBar } from "@/components/newsletter/NewsletterBar";
import { PageTransition } from "@/components/transitions/PageTransition";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Panels in the hero lineup (SLOTS in HeroSlide).
const HERO_SLOTS = 5;

// Brands first (proof → problem → method → cases), then the talent side
// (roster → why join), then social proof, content and a two-way close.
export default async function Home() {
  await connection(); // roster is shuffled per visit
  const payload = await getPayload({ config });
  const [brands, talents, cases, posts, contact] = await Promise.all([
    payload.findGlobal({ slug: "brands", depth: 1 }),
    payload.find({ collection: "talents", where: { active: { equals: true } }, depth: 1, limit: 100 }),
    payload.find({ collection: "case-studies", where: { featured: { equals: true }, published: { equals: true } }, limit: 3, depth: 1 }),
    payload.find({ collection: "posts", where: { published: { equals: true } }, sort: "-publishedAt", limit: 5, depth: 1 }),
    payload.findGlobal({ slug: "contact-info" }),
  ]);

  // Hero lineup: featured talents with a photo (every talent if none is
  // featured), shuffled; five show and the rest rotate in. Fewer than five
  // featured repeat to fill the panels.
  const withPhoto = talents.docs.filter((t) => typeof t.thumbnail === "object" && t.thumbnail?.url);
  const featured = withPhoto.filter((t) => t.featured);
  let heroTalents = shuffle(featured.length > 0 ? featured : withPhoto);
  if (featured.length > 0 && heroTalents.length < HERO_SLOTS) {
    heroTalents = Array.from({ length: HERO_SLOTS }, (_, i) => heroTalents[i % heroTalents.length]);
  }

  // Method demo panels: five more random talents with a photo.
  const methodTalents = shuffle(withPhoto).slice(0, 5);

  return (
    <PageTransition>
      <HeroSlide talents={heroTalents} />
      <Stats />
      <ClientMarquee brands={brands.items ?? []} />
      <WhatWeDo />
      <InfluencerMarketing360 />
      <Method talents={methodTalents} />
      <CaseStudies cases={cases.docs} />
      <TalentNetwork talents={shuffle(talents.docs)} />
      <LatestPosts posts={posts.docs} />
      <NewsletterBar />
      <ContactSection contact={contact} />
    </PageTransition>
  );
}
