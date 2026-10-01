import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";

// Closing call to action that sends visitors to /contacto.
export function ContactCta({ title = "¿Hablamos de tu próxima campaña?" }: { title?: string }) {
  return (
    <section className="mx-auto w-full max-w-[96rem] px-6 py-16 md:px-[4.7%] md:py-24">
      <Reveal className="flex flex-col items-start gap-6 rounded-3xl bg-primary px-8 py-12 text-primary-content md:flex-row md:items-center md:justify-between md:px-14">
        <RevealItem as="h2" className="max-w-[22ch] text-3xl font-bold leading-tight md:text-5xl">
          {title}
        </RevealItem>
        <RevealItem>
          <Link
            href="/contacto"
            transitionTypes={["nav-forward"]}
            className="btn h-auto shrink-0 rounded-lg border-0 bg-white px-8 py-4 uppercase text-[#14102b] hover:bg-white/90"
          >
            Contáctanos <FiArrowRight aria-hidden />
          </Link>
        </RevealItem>
      </Reveal>
    </section>
  );
}
