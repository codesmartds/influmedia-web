@AGENTS.md

## Site conventions

The site is a traditional landing site (it began as a full-screen slide deck; old slide routes redirect in `next.config.ts`).

- **Pages:** `app/(site)/(landing)/` holds every page; its layout renders `SiteHeader` (sticky nav, items in `components/layout/nav.ts`) and `SiteFooter`. Pages: `/` (hero, about teaser, newsletter bar), `/nosotros`, `/influencer-marketing`, `/creadores` (roster application), `/galeria`, `/contacto`, `/blog`.
- **Page structure:** each inner page opens with `PageHeader` (its single `h1`), then content blocks wrapped in `LandingSection` (spacing, max width, an `id` anchor). Section components use `h2`, never `h1`. Close with `ContactCta` where it fits.
- **Page transition:** wrap the page in `<PageTransition>` (`components/transitions/PageTransition.tsx`). The header is pinned during transitions.
- **Content entrance:** `<Reveal>` / `<RevealItem>` (`components/transitions/Reveal.tsx`), never ad-hoc Motion code. Reveal starts when the block scrolls into view. Containers that group items use `effect="fade"` with `stagger`, so only the leaves move.
- **Shared pieces** (`components/slides/`): `SlideIntro` (eyebrow/title/subtitle as `h2`, inside a `<Reveal>`), `AssetPlaceholder` for images not yet provided, and `CountUp` for figures (counts when in view).
- **Forms:** server actions with the Local API; target collections (`subscribers`, `contact-submissions`, `creator-applications`) are admin-only in the public API. Actions echo submitted values so inputs refill after an error.
- **Dashboards** (`components/dashboards/`): Recharts plus `useLiveData`, which simulates a real-time feed (pauses in hidden tabs and under reduced motion). Initial data must be deterministic, with no `Math.random()` at module level, or hydration fails. One y-axis per chart: measures on different scales go in separate charts sharing an x-axis.
- **Background circles:** not implemented yet; leave them out.
