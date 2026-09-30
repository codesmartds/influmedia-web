import { RevealItem } from "@/components/transitions/Reveal";

type SlideIntroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Eyebrow color alternates between slides in the deck design. */
  tone?: "primary" | "secondary";
};

// Eyebrow + title + subtitle that opens slides 3–20. Render inside a <Reveal>.
export function SlideIntro({ eyebrow, title, subtitle, tone = "secondary" }: SlideIntroProps) {
  return (
    <>
      <RevealItem
        as="p"
        className={`text-sm font-bold uppercase md:text-[clamp(0.9rem,1.45vw,1.55rem)] ${
          tone === "primary" ? "text-primary" : "text-secondary"
        }`}
      >
        {eyebrow}
      </RevealItem>
      <RevealItem as="h1" className="mt-4 text-[clamp(2rem,3.3vw,3.6rem)] font-bold leading-tight md:mt-[3.5%]">
        {title}
      </RevealItem>
      {subtitle && (
        <RevealItem as="p" className="mt-2 text-[clamp(1rem,1.75vw,1.9rem)] text-base-content/85">
          {subtitle}
        </RevealItem>
      )}
    </>
  );
}
