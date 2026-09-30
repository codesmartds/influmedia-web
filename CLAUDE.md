@AGENTS.md

## Slide conventions

Every slide (page) follows the same transition rules:

- **Page transition:** wrap the page in `<PageTransition>` (`components/transitions/PageTransition.tsx`). Links between slides pass `transitionTypes={["nav-forward"]}` or `["nav-back"]`.
- **Content entrance:** the slide's content enters with `<Reveal>` / `<RevealItem>` (`components/transitions/Reveal.tsx`), never ad-hoc Motion code. One `<Reveal>` root per content block; each heading, paragraph, card and list item is a `<RevealItem>`. Containers that group items use `effect="fade"` with `stagger`, so only the leaves move.
- **Shared header:** slides 3–20 live under `app/(site)/(common-header)/`, which renders the menu/logo header. Don't repeat it inside the slide.
- **Background circles:** not implemented yet; leave them out of new slides.
- **Shared slide pieces** (`components/slides/`): `SlideIntro` (eyebrow/title/subtitle, inside a `<Reveal>`), `SlideFooter`, `AssetPlaceholder` for images not yet provided, and `CountUp` for animated figures.
- **Stage pages:** `/sistema/<stage>` and its sub-pages live under `app/(site)/(common-header)/sistema/(items)/`, whose layout adds the stage navbar (`StageNav`) and footer. Pages there render content only. Stage order and slugs come from `components/system/stages.ts`; prev/next come from the ordered route list in `components/system/sequence.ts` (`SequenceNav` reads the URL, pages never declare their neighbours). A new stage page is added to that list.
