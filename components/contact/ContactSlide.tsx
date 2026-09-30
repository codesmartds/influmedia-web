import Link from "next/link";
import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import type { ContactInfo } from "@/payload-types";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SlideFooter } from "@/components/slides/SlideFooter";
import { SharedElement } from "@/components/transitions/PageTransition";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { phoneLink } from "./phone";

type SocialKey = "instagram" | "tiktok" | "linkedin";

const socials: { key: SocialKey; label: string; Icon: IconType; className: string }[] = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram, className: "bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)]" },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok, className: "bg-black" },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn, className: "bg-[#0a66c2]" },
];

const linkClass = "text-xl font-medium text-info underline underline-offset-4 md:text-[clamp(1.1rem,1.75vw,1.9rem)]";

export function ContactSlide({ contact }: { contact: ContactInfo }) {
  const phone = contact.phone ? phoneLink(contact.phone) : null;
  const phoneIsExternal = phone?.href.startsWith("http");
  // Only networks with a URL in the admin are shown.
  const links = socials.flatMap((social) => (contact[social.key] ? [{ ...social, href: contact[social.key]! }] : []));

  return (
    <div className="flex min-h-dvh flex-col bg-base-100">
      {/* Own header: logo on the left, menu on the right */}
      <header className="flex items-start justify-between gap-6 px-6 pt-8 md:px-[4%] md:pt-[2.2%]">
        <SharedElement name="brand-logo">
          <Link href="/" transitionTypes={["nav-back"]} aria-label="Influmedia, ir a la portada">
            <BrandLogo priority className="w-[max(9rem,14vw)] md:mt-[2%]" />
          </Link>
        </SharedElement>
        <Link
          href="/deck"
          transitionTypes={["nav-back"]}
          className="btn btn-primary h-auto min-w-[8rem] rounded-md border-0 px-10 py-3 text-xs font-bold uppercase shadow-lg md:mr-[12.5%] md:min-w-[8%]"
        >
          Menú
        </Link>
      </header>

      <main className="flex flex-1 flex-col px-6 pb-8 md:px-[5.3%] md:pb-[2%]">
        <Reveal className="mt-10 grid flex-1 items-center gap-10 md:-mt-[4%] md:grid-cols-[1fr_37%] md:gap-[8%] md:pr-[1%]">
          <RevealItem effect="fade" stagger className="flex flex-col">
            <RevealItem as="h1" className="text-[clamp(2.2rem,3.6vw,4rem)] font-bold uppercase leading-[1.15]">
              Let’s lead
              <br />
              the conversation.
            </RevealItem>
            <RevealItem
              as="p"
              className="mt-8 max-w-[42ch] text-lg leading-snug text-base-content/85 md:mt-[11%] md:text-[clamp(1rem,1.75vw,1.9rem)]"
            >
              Hagamos campañas que se sientan humanas, operen con control y terminen en insights.
            </RevealItem>
            <RevealItem
              effect="fade"
              className="mt-12 hidden h-[4.5rem] w-[13.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1.5px,transparent_1.6px)] bg-[length:1.5rem_1.5rem] md:mt-[20%] md:block"
            />
          </RevealItem>

          <RevealItem
            as="section"
            effect="right"
            stagger={0.08}
            className="flex flex-col rounded-3xl border border-base-300 bg-base-200 px-8 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:px-[8%] md:py-[11%]"
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

        <SlideFooter label="Lead the conversation" />
      </main>
    </div>
  );
}
