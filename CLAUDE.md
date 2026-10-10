@AGENTS.md

## Site conventions

The site is a traditional landing site (it began as a full-screen slide deck; old slide routes redirect in `next.config.ts`).

- **Pages:** `app/(site)/(landing)/` holds every page; its layout renders `SiteHeader` (sticky nav, items in `components/layout/nav.ts`) and `SiteFooter`. Pages: `/` (hero, about teaser, newsletter bar), `/nosotros`, `/influencer-marketing`, `/talento-exclusivo` (roster application), `/galeria`, `/contacto`, `/influlab` (blog).
- **Page structure:** each inner page opens with `PageHeader` (its single `h1`), then content blocks wrapped in `LandingSection` (spacing, max width, an `id` anchor). Section components use `h2`, never `h1`. Close with `ContactCta` where it fits.
- **Page transition:** wrap the page in `<PageTransition>` (`components/transitions/PageTransition.tsx`). The header is pinned during transitions.
- **Content entrance:** `<Reveal>` / `<RevealItem>` (`components/transitions/Reveal.tsx`), never ad-hoc Motion code. Reveal starts when the block scrolls into view. Containers that group items use `effect="fade"` with `stagger`, so only the leaves move.
- **Shared pieces** (`components/slides/`): `AssetPlaceholder` for images not yet provided, and `CountUp` for figures (counts when in view).
- **Forms:** server actions with the Local API; target collections (`subscribers`, `contact-submissions`, `creator-applications`) are admin-only in the public API. Actions echo submitted values so inputs refill after an error.
- **Demo panels** (`components/influencer-marketing/CompareAnim.tsx`): looping animations driven by a `requestAnimationFrame` clock, frozen on a final frame under reduced motion. Figures are demo values; talents come from the database. Keep randomness out of the first render (shuffle on the server, randomize in effects) or hydration fails.
- **Background circles:** not implemented yet; leave them out.
- **Seed:** `lib/seed.ts`. `npm run seed` (or `POST /api/seed` as a logged-in admin) first cleans up the seeded collections and every upload, then inserts the data again; `DELETE /api/seed` only cleans up. Users and form submissions are never touched.
- **Media storage:** Google Cloud Storage bucket `influmedia-web-media` (project `influmedia-web`, us-central1), publicly readable, via `@payloadcms/storage-gcs` when `GCS_BUCKET` is set; files go under `GCS_PREFIX` (`development` locally, `production` on Cloud Run). Credentials are ADC: service account `influmedia-web-run@influmedia-web.iam.gserviceaccount.com` (objectAdmin on the bucket) on Cloud Run, `gcloud auth application-default login` locally. Empty `GCS_BUCKET` falls back to the local `media/` folder.
- **Deploy:** Cloud Run service `influmedia-web` (project `influmedia-web`, us-central1), infrastructure in `infra/` with Terragrunt (`infra/live/influmedia-web` → `infra/modules/gcp-infrastructure`; state in `gs://influmedia-web-tfstate`). Pushing to `main` runs `.github/workflows/deploy.yml`: terragrunt apply → Docker build/push to Artifact Registry → deploy. Secrets: `GCP_SA_KEY`, `DATABASE_URL`, `PAYLOAD_SECRET`; repository variables: `GCS_BUCKET`, `GCS_PROJECT_ID`, `GCS_PREFIX`. Pages render on request (`connection()` in the landing layout) because the build has no database.
