import Link from "next/link";
import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import type { ContactInfo } from "@/payload-types";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { phoneLink } from "@/components/contact/phone";
import { contactHref, navItems } from "./nav";

const socials: { key: "instagram" | "tiktok" | "linkedin"; label: string; Icon: IconType }[] = [
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
];

const headingClass = "text-xs font-bold uppercase tracking-wider text-base-content/50";
const linkClass = "text-base-content/80 transition-colors hover:text-secondary";

export function SiteFooter({ contact }: { contact: ContactInfo }) {
  const phone = contact.phone ? phoneLink(contact.phone) : null;
  const phoneIsExternal = phone?.href.startsWith("http");
  const links = socials.flatMap((s) => (contact[s.key] ? [{ ...s, href: contact[s.key]! }] : []));

  return (
    <footer className="border-t border-white/5 bg-base-200/40">
      <div className="mx-auto grid max-w-[96rem] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-[4%]">
        <div className="flex flex-col gap-4">
          <BrandLogo variant="white" className="w-36" sizes="144px" />
          <p className="max-w-[32ch] text-base-content/70">
            Estrategia, creatividad y tecnología para conectar marcas con personas reales.
          </p>
          <p className="text-sm font-bold uppercase text-secondary">#WeAreInflumedia</p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className={headingClass}>Explora</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={contactHref} className={linkClass}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Contacto</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className={`break-all ${linkClass}`}>
                  {contact.email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a
                  href={phone.href}
                  target={phoneIsExternal ? "_blank" : undefined}
                  rel={phoneIsExternal ? "noopener noreferrer" : undefined}
                  className={linkClass}
                >
                  {phone.label}
                </a>
              </li>
            )}
          </ul>
          {links.length > 0 && (
            <ul className="mt-5 flex gap-2.5">
              {links.map(({ key, label, Icon, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-lg border border-base-300 text-lg transition-colors hover:border-secondary hover:text-secondary"
                  >
                    <Icon aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-[96rem] px-6 py-5 text-xs font-bold uppercase text-base-content/50 md:px-[4%]">
          © {new Date().getFullYear()} Influmedia • Lead the conversation
        </p>
      </div>
    </footer>
  );
}
