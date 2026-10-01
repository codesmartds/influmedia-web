import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import type { ContactInfo } from "@/payload-types";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { ContactForm } from "./ContactForm";
import { phoneLink } from "./phone";

type SocialKey = "instagram" | "tiktok" | "linkedin";

const socials: { key: SocialKey; label: string; Icon: IconType; className: string }[] = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram, className: "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)]" },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok, className: "bg-black" },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn, className: "bg-[#0a66c2]" },
];

const linkClass = "text-xl font-medium text-info underline underline-offset-4";

export function ContactSlide({ contact }: { contact: ContactInfo }) {
  const needs = (contact.needs ?? []).map((n) => n.name);
  const phone = contact.phone ? phoneLink(contact.phone) : null;
  const phoneIsExternal = phone?.href.startsWith("http");
  // Only networks with a URL in the admin are shown.
  const links = socials.flatMap((social) => (contact[social.key] ? [{ ...social, href: contact[social.key]! }] : []));

  return (
    <section className="mx-auto w-full max-w-[96rem] px-6 pb-20 pt-16 md:px-[4.7%] md:pt-24">
        <Reveal className="grid items-start gap-12 lg:grid-cols-[1fr_37%] lg:gap-[6%]">
          <RevealItem effect="fade" stagger className="flex flex-col">
            <RevealItem as="h1" className="max-w-[18ch] text-[clamp(2.4rem,4.4vw,4.8rem)] font-bold leading-[1.05]">
              Nos encantaría conocer tu proyecto.
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-6 max-w-[48ch] text-lg leading-snug text-base-content/85 md:text-xl"
            >
              Hagamos campañas que se sientan humanas, operen con control y terminen en insights.
            </RevealItem>
            <RevealItem className="mt-10">
              <ContactForm needs={needs} />
            </RevealItem>
          </RevealItem>

          <RevealItem
            as="section"
            effect="right"
            stagger={0.08}
            // Stays in view next to the form on large screens.
            className="flex flex-col rounded-3xl border border-base-300 bg-base-200 px-8 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:px-10 md:py-12 lg:sticky lg:top-28"
          >
            <RevealItem as="p" className="text-lg font-bold uppercase text-secondary md:text-[clamp(1rem,1.5vw,1.6rem)]">
              #WeAreInflumedia
            </RevealItem>
            <RevealItem
              as="h2"
              className="mt-10 text-sm font-bold uppercase text-base-content/70 md:mt-[14%] md:text-[clamp(0.85rem,1.2vw,1.3rem)]"
            >
              Contáctanos
            </RevealItem>
            {contact.email && (
              <RevealItem as="p" className="mt-5 md:mt-[6%]">
                <a href={`mailto:${contact.email}`} className={`break-all ${linkClass}`}>
                  {contact.email}
                </a>
              </RevealItem>
            )}
            {phone && (
              <RevealItem as="p" className="mt-5 md:mt-[6%]">
                <a
                  href={phone.href}
                  target={phoneIsExternal ? "_blank" : undefined}
                  rel={phoneIsExternal ? "noopener noreferrer" : undefined}
                  className={linkClass}
                >
                  {phone.label}
                </a>
              </RevealItem>
            )}
            <RevealItem effect="draw" className="mt-8 h-0.5 origin-left bg-base-300 md:mr-[8%] md:mt-[9%]" />
            <RevealItem as="p" className="mt-10 text-lg text-accent md:mt-[11%] md:text-[clamp(1rem,1.55vw,1.7rem)]">
              Lead the Conversation
            </RevealItem>
            <RevealItem effect="fade" stagger={0.08} className="mt-5 flex flex-wrap items-center justify-between gap-4 md:mt-[5%]">
              <RevealItem
                as="span"
                effect="scale"
                className="rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase text-primary-content md:text-[clamp(0.8rem,1.05vw,1.15rem)]"
              >
                Powered by people
              </RevealItem>
              {links.length > 0 && (
                <RevealItem as="ul" effect="fade" stagger={0.08} className="flex gap-2.5">
                  {links.map(({ key, label, Icon, className, href }) => (
                    <RevealItem as="li" effect="scale" key={key}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={`flex size-12 items-center justify-center rounded-lg text-2xl text-white transition-transform hover:scale-110 ${className}`}
                      >
                        <Icon aria-hidden />
                      </a>
                    </RevealItem>
                  ))}
                </RevealItem>
              )}
            </RevealItem>
          </RevealItem>
        </Reveal>

    </section>
  );
}
