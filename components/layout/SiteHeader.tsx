"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
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
      // Pinned during page transitions so only the content slides.
      style={{ viewTransitionName: "site-header" }}
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-white/5 bg-base-100/80 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[96rem] items-center justify-between gap-6 px-6 md:px-[4%]">
        <Link href="/" aria-label="Influmedia, ir al inicio">
          <BrandLogo variant="white" priority className="w-28 md:w-32" sizes="128px" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-sm font-semibold uppercase tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-secondary after:transition-transform ${
                      active
                        ? "text-base-content after:scale-x-100"
                        : "text-base-content/70 after:scale-x-0 hover:text-base-content hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={contactHref} className="btn btn-primary btn-sm h-10 rounded-lg border-0 px-5 uppercase">
            Contacto <FiArrowRight aria-hidden />
          </Link>
        </nav>

        {/* Mobile: native <details> keeps the menu usable without JavaScript. */}
        <details ref={mobileMenu} className="group relative lg:hidden">
          <summary className="btn btn-square btn-ghost list-none" aria-label="Abrir menú">
            <FiMenu aria-hidden className="text-2xl group-open:hidden" />
            <FiX aria-hidden className="hidden text-2xl group-open:block" />
          </summary>
          <nav
            aria-label="Principal"
            className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-base-300 bg-base-200 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="block rounded-lg px-4 py-3 font-semibold aria-[current=page]:bg-base-300 aria-[current=page]:text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={contactHref} className="btn btn-primary mt-2 w-full rounded-lg border-0 uppercase">
              Contacto <FiArrowRight aria-hidden />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
