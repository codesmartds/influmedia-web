import { HeroSlide } from "@/components/home/HeroSlide";
import { PageTransition } from "@/components/transitions/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <HeroSlide />
    </PageTransition>
  );
}
