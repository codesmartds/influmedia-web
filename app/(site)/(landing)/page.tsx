import { connection } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { ContactSection } from "@/components/contact/ContactSection";
import { HeroSlide } from "@/components/home/HeroSlide";
import {
  CaseStudies,
  ClientMarquee,
  DualCta,
  ForCreators,
  LatestPosts,
  InfluencerMarketing360,
  Method,
  Roster,
  Stats,
  Testimonials,
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

// Brands first (proof → problem → method → cases), then the talent side
// (roster → why join), then social proof, content and a two-way close.
export default async function Home() {
  await connection(); // roster is shuffled per visit
  const payload = await getPayload({ config });
  const [brands, talents, cases, testimonials, posts, contact] = await Promise.all([
    payload.findGlobal({ slug: "brands", depth: 1 }),
    payload.find({ collection: "talents", where: { active: { equals: true } }, depth: 1, limit: 100 }),
    payload.find({ collection: "case-studies", where: { featured: { equals: true }, published: { equals: true } }, limit: 3, depth: 1 }),
    payload.find({ collection: "testimonials", where: { active: { equals: true } }, limit: 6, depth: 1 }),
    payload.find({ collection: "posts", where: { published: { equals: true } }, sort: "-publishedAt", limit: 3, depth: 1 }),
    payload.findGlobal({ slug: "contact-info" }),
  ]);

  // Hero lineup: five random talents with a photo, until the final selection exists.
  const heroTalents = shuffle(talents.docs.filter((t) => typeof t.thumbnail === "object" && t.thumbnail?.url)).slice(0, 5);

  // Method demo panels: five more random talents with a photo.
  const methodTalents = shuffle(talents.docs.filter((t) => typeof t.thumbnail === "object" && t.thumbnail?.url)).slice(0, 5);

  return (
    <PageTransition>
      <HeroSlide talents={heroTalents} />
      <Stats />
      <ClientMarquee brands={brands.items ?? []} />
      <WhatWeDo />
      <InfluencerMarketing360 />
      <Method talents={methodTalents} />
      <CaseStudies cases={cases.docs} />
      <Roster talents={shuffle(talents.docs)} />
      <ForCreators />
      <Testimonials items={testimonials.docs} />
      <NewsletterBar />
      <LatestPosts posts={posts.docs} />
      <DualCta />
      <ContactSection contact={contact} />
    </PageTransition>
  );
}
