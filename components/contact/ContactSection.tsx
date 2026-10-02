import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { ContactInfo } from "@/payload-types";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { ContactForm } from "./ContactForm";
import { phoneLink } from "./phone";

const socials: { key: "instagram" | "tiktok" | "linkedin"; label: string; Icon: IconType }[] = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
];

// Contact block: details and map on the left, project form on the right.
// `headingLevel` lets /contacto use it as the page's h1.
export function ContactSection({ contact, headingLevel = "h2" }: { contact: ContactInfo; headingLevel?: "h1" | "h2" }) {
  const phone = contact.phone ? phoneLink(contact.phone) : null;
  const phoneIsExternal = phone?.href.startsWith("http");
  const links = socials.flatMap((s) => (contact[s.key] ? [{ ...s, href: contact[s.key]! }] : []));
  const needs = (contact.needs ?? []).map((n) => n.name);

  const rows = [
    contact.email && { Icon: FiMail, label: "Correo", value: contact.email, href: `mailto:${contact.email}` },
    phone && { Icon: FiPhone, label: "Teléfono / WhatsApp", value: phone.label, href: phone.href, external: phoneIsExternal },
    contact.address && { Icon: FiMapPin, label: "Oficina", value: contact.address },
  ].filter(Boolean) as { Icon: IconType; label: string; value: string; href?: string; external?: boolean }[];

  return (
    <section id="contacto" className="mx-auto w-full max-w-[96rem] scroll-mt-24 px-6 py-20 md:px-[4.7%] md:py-28">
      <Reveal className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <RevealItem effect="fade" stagger className="flex flex-col">
          <RevealItem as="p" className="text-sm font-bold uppercase text-secondary md:text-base">
            Contacto
          </RevealItem>
          <RevealItem as={headingLevel} className="mt-3 text-[clamp(2rem,3.6vw,3.8rem)] font-bold leading-tight">
            Nos encantaría conocer tu proyecto.
          </RevealItem>
          <RevealItem as="p" className="mt-4 max-w-[46ch] text-lg text-base-content/75">
            Hagamos campañas que se sientan humanas, operen con control y terminen en insights.
          </RevealItem>

          <RevealItem as="ul" effect="fade" stagger className="mt-8 flex flex-col gap-5">
            {rows.map(({ Icon, label, value, href, external }) => (
              <RevealItem as="li" effect="left" key={label} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-200 text-xl text-secondary">
                  <Icon aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase text-base-content/50">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="break-all text-lg hover:text-secondary"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="whitespace-pre-line text-lg">{value}</span>
                  )}
                </span>
              </RevealItem>
            ))}
          </RevealItem>

          {links.length > 0 && (
            <RevealItem as="ul" className="mt-6 flex gap-2.5">
              {links.map(({ key, label, Icon, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-xl border border-base-300 text-lg transition-colors hover:border-secondary hover:text-secondary"
                  >
                    <Icon aria-hidden />
                  </a>
                </li>
              ))}
            </RevealItem>
          )}

          {contact.mapEmbedUrl && (
            <RevealItem effect="scale" className="mt-8 overflow-hidden rounded-2xl border border-base-300">
              {/* Dark mode: invert the map, then rotate hue back so water and
                  parks keep roughly their colors. */}
              <iframe
                src={contact.mapEmbedUrl}
                title="Ubicación de Influmedia en el mapa"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block aspect-[16/10] w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.8)_brightness(0.95)]"
              />
            </RevealItem>
          )}
        </RevealItem>

        <RevealItem
          effect="right"
          className="rounded-3xl border border-base-300 bg-base-200/60 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] md:p-10 lg:sticky lg:top-28"
        >
          <h3 className="mb-6 text-xl font-bold">Cuéntanos de tu campaña</h3>
          <ContactForm needs={needs} />
        </RevealItem>
      </Reveal>
    </section>
  );
}
