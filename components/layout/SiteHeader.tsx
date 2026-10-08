"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { contactHref, isActive, navItems } from "./nav";

export function SiteHeader() {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Transparent at the top of the page; background appears once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    if (mobileMenu.current) mobileMenu.current.open = false;
  }, [pathname]);

  return (
    <header
      // Pinned during page transitions so only the content slides. Exactly 4.5rem
      // tall (divider is an inset shadow, not a border) so the home hero, pulled
      // up by the same amount, starts flush at the top.
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-base-100/80 shadow-[inset_0_-1px_0_rgba(255,255,255,.05)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[96rem] items-center justify-between gap-6 px-6 md:px-[4%]">
        <Link href="/" aria-label="Influmedia, ir al inicio">
          <BrandLogo variant="white" priority className="w-28 md:w-32" sizes="128px" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(1rem,2.6vw,2.1rem)]">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`py-2 text-[0.95rem] transition-colors ${active ? "text-base-content" : "text-[#d6d0de] hover:text-base-content"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={contactHref}
          className="hidden rounded-full border border-base-content/50 px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-base-content hover:text-base-100 lg:inline-block"
        >
          Contacto
        </Link>

        {/* Mobile: native <details> keeps the menu usable without JavaScript. */}
        <details ref={mobileMenu} className="group relative lg:hidden">
          <summary className="btn btn-square btn-ghost list-none" aria-label="Abrir menú">
            <FiMenu aria-hidden className="text-2xl group-open:hidden" />
            <FiX aria-hidden className="hidden text-2xl group-open:block" />
          </summary>
          <nav
            aria-label="Principal"
            className="absolute right-0 top-full mt-3 w-64 rounded-lg border border-base-300 bg-base-200 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block rounded-md px-4 py-3 text-[#d6d0de] aria-[current=page]:bg-base-300 aria-[current=page]:text-base-content"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={contactHref} className="btn btn-primary mt-2 w-full rounded-full border-0 font-semibold hover:bg-secondary">
              Contacto
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
