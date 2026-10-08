import Link from "next/link";
import type { ContactInfo } from "@/payload-types";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { contactHref, navItems } from "./nav";

const socials: { key: "instagram" | "tiktok" | "linkedin"; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "linkedin", label: "LinkedIn" },
];

const headingClass = "font-mono text-[11px] tracking-[0.14em] text-[#6f6880] uppercase";
const linkClass = "text-[#a39bae] transition-colors hover:text-base-content";

export function SiteFooter({ contact }: { contact: ContactInfo }) {
  const links = socials.flatMap((s) => (contact[s.key] ? [{ ...s, href: contact[s.key]! }] : []));
  const siteLinks = [...navItems, { href: "/#newsletter", label: "Newsletter" }, { href: contactHref, label: "Contacto" }];

  return (
    <footer className="border-t border-base-300">
      <div className="mx-auto flex max-w-[96rem] flex-col gap-14 px-5 pt-16 pb-9 md:px-[4%]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex min-w-0 flex-col gap-4 sm:col-span-2">
            <BrandLogo variant="white" className="w-44" sizes="176px" />
            <p className="font-display text-[clamp(26px,2.52vw,34px)] leading-none font-medium tracking-[-0.04em]">
              Lead the <span className="text-secondary">conversation.</span>
            </p>
            <p className="max-w-[40ch] text-[15px] leading-relaxed text-[#a39bae]">
              Estrategia, creatividad y tecnología para conectar marcas con personas reales.
            </p>
          </div>

          <nav aria-label="Pie de página" className="flex flex-col gap-3 text-[15px]">
            <h2 className={headingClass}>Sitio</h2>
            <ul className="flex flex-col gap-3">
              {siteLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {links.length > 0 && (
            <div className="flex flex-col gap-3 text-[15px]">
              <h2 className={headingClass}>Síguenos</h2>
              <ul className="flex flex-col gap-3">
                {links.map(({ key, label, href }) => (
                  <li key={key}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-[#6f6880] uppercase">
          <span>© {new Date().getFullYear()} Influmedia Guatemala</span>
          <span>#WeAreInflumedia</span>
        </div>
      </div>
    </footer>
  );
}
