// Main navigation, per the site map. Newsletter is a home-page bar, not a link.
export const navItems = [
  { href: "/influencer-marketing", label: "Influencer marketing" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/creadores", label: "Creadores" },
  { href: "/galeria", label: "Galería" },
  { href: "/blog", label: "Blog" },
] as const;

export const contactHref = "/contacto";

/** A nav item stays active on its sub-pages (e.g. /blog/some-post). */
export const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);
