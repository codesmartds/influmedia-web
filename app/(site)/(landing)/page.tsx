import { AboutTeaser } from "@/components/home/AboutTeaser";
import { HeroSlide } from "@/components/home/HeroSlide";
import { NewsletterBar } from "@/components/newsletter/NewsletterBar";
import { PageTransition } from "@/components/transitions/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <HeroSlide />
      <AboutTeaser />
      <NewsletterBar />
    </PageTransition>
  );
}
