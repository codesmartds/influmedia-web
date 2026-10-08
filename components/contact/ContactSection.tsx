import Link from "next/link";
import type { ContactInfo } from "@/payload-types";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { ContactForm } from "./ContactForm";
import { phoneLink } from "./phone";

// Contact block: details on the left, project form on the right.
// `headingLevel` lets /contacto use it as the page's h1.
export function ContactSection({ contact, headingLevel = "h2" }: { contact: ContactInfo; headingLevel?: "h1" | "h2" }) {
  const phone = contact.phone ? phoneLink(contact.phone) : null;
  const phoneIsExternal = phone?.href.startsWith("http");
  const needs = (contact.needs ?? []).map((n) => n.name);
  const directions = [
    contact.googleMapsUrl && { href: contact.googleMapsUrl, name: "Google Maps" },
    contact.wazeUrl && { href: contact.wazeUrl, name: "Waze" },
  ].filter(Boolean) as { href: string; name: string }[];

  const rows = [
    contact.email && { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    phone && { label: phoneIsExternal ? "WhatsApp" : "Teléfono", value: phone.label, href: phone.href, external: phoneIsExternal },
    contact.address && { label: "Oficina", value: contact.address },
  ].filter(Boolean) as { label: string; value: string; href?: string; external?: boolean }[];

  return (
    <section id="contacto" className="scroll-mt-24 border-t border-base-300 bg-base-200">
      <Reveal className="mx-auto grid w-full max-w-[96rem] items-start gap-[clamp(2rem,5vw,4.5rem)] px-5 py-[clamp(4.5rem,9vw,7.5rem)] md:px-[4%] lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <RevealItem as="p" className="font-mono text-xs tracking-[0.16em] text-accent-cycle uppercase">
            Contacto
          </RevealItem>
          <RevealItem as={headingLevel} className="text-[clamp(1.95rem,4.2vw,4rem)] leading-[0.9] font-semibold tracking-[-0.055em] text-balance">
            Nos encantaría conocer tu <span className="text-accent-cycle">proyecto.</span>
          </RevealItem>
          <RevealItem as="p" className="max-w-[440px] text-[17px] leading-relaxed text-muted">
            Cuéntanos el objetivo y te enviamos una propuesta con talento, alcance proyectado y presupuesto.
          </RevealItem>

          <RevealItem as="ul" className="mt-2 flex flex-col border-t border-[#2a2233]">
            {rows.map(({ label, value, href, external }) => {
              const body = (
                <>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-[#8e86a0] uppercase">{label}</span>
                  <span className="break-words whitespace-pre-line sm:text-right">{value}</span>
                </>
              );
              return (
                <li key={label} className="border-b border-[#2a2233]">
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex flex-col gap-1.5 py-4 transition-colors hover:text-accent-cycle sm:flex-row sm:justify-between sm:gap-4"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex flex-col gap-1.5 py-4 sm:flex-row sm:justify-between sm:gap-4">{body}</div>
                  )}
                  {label === "Oficina" && directions.length > 0 && (
                    <div className="flex gap-4 pb-4 text-sm sm:justify-end">
                      {directions.map((d) => (
                        <a key={d.name} href={d.href} target="_blank" rel="noopener noreferrer" className="text-[#a39bae] transition-colors hover:text-accent-cycle">
                          {d.name} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </RevealItem>

          <RevealItem>
            <Link href="/creadores#aplica" transitionTypes={["nav-forward"]} className="text-[15px] text-accent-cycle transition-colors hover:text-base-content">
              ¿Eres creador? Aplica a la red →
            </Link>
          </RevealItem>
        </div>

        <RevealItem effect="fade">
          <ContactForm needs={needs} />
        </RevealItem>
      </Reveal>
    </section>
  );
}
