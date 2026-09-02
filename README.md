# روّاد التنمية – الطفيلة · Ruwwad Al-Tanmeya – Tafila

Technical foundation for the Ruwwad Tafila website. This repository currently
contains **architecture only** — routing, data models, shared components, and
the design-token system. The visual design of the individual pages is a
separate, later phase.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | `motion` (Framer Motion) |
| Linting | ESLint 9 flat config, `eslint-config-next` |

## Commands

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

```bash
npm run typecheck
```

## Environment

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SITE_URL` drives canonical
URLs, Open Graph URLs, `sitemap.xml`, and `robots.txt`.

## Architecture

```
src/
  app/          routes only — pages compose sections, they contain no layout logic
  components/   reusable UI, grouped by responsibility
  sections/     page-specific section shells (the seams for the design phase)
  data/         institutional content (alumni, Drosos, programmes, contact)
  types/        the domain model
  lib/          i18n resolution, metadata builder, alumni queries, utils
  config/       site identity, routes, navigation, motion, breakpoints
public/assets/  images — see public/assets/README.md
```

**Content and presentation are strictly separated.** Institutional content
lives in `src/data/**` as typed records; components decide only how it is
rendered. Nothing reads `src/data/alumni.ts` directly — go through
`src/lib/alumni.ts`.

### Routes

| Route | Notes |
|---|---|
| `/` | homepage |
| `/about` | Ruwwad Tafila story |
| `/youth` | Youth Program |
| `/drosos` | Drosos experience |
| `/alumni` | alumni archive |
| `/alumni/[slug]` | graduate profile (prerendered via `generateStaticParams`) |
| `/contact` | contact |

`sitemap.xml` and `robots.txt` are generated from `src/config/routes.ts` plus
the alumni archive.

### Alumni interception

`/alumni/[slug]` renders two ways from one `AlumniProfile` component:

- opened from the archive → intercepted into an overlay by
  `app/alumni/@modal/(.)[slug]`, with the archive still mounted behind it;
- opened directly, shared, or refreshed → the standalone page.

Dismissal — close button, backdrop, Escape — always calls `router.back()`, so
the browser back button and the close button are literally the same action.

Two platform details worth knowing before editing `AlumniModal` or
`MobileNavigation`: `<dialog>`'s `close` and `cancel` events do **not** bubble,
so React's synthetic `onClose` never fires and native listeners are required;
and effects that save-and-restore global state (such as `body` overflow) break
under React's development double-invoke, so they set and remove instead.

## Design tokens

All of them live in one place: the `@theme` block in `src/app/globals.css`.
Components reference semantic aliases (`bg-surface`, `text-ink-muted`,
`rounded-card`, `py-(--spacing-section)`) rather than raw values, so the whole
site restyles by editing that block.

The blue ramp is anchored on the **official brand cyan `#0CADD9`**, sampled
from the supplied logo, together with the logo's secondary wing tint `#D0E8F4`.

> The brand cyan reaches only 2.6:1 against white, so it is an identity and
> accent colour, not a text colour — text and controls use `brand-700`/`800`,
> which clear WCAG AA. The `IBM Plex Sans Arabic` typeface is still a
> **provisional placeholder**; the brand typeface has not been supplied.

Motion tokens are mirrored in `src/config/motion.ts`, breakpoints in
`src/config/breakpoints.ts`, so JavaScript and CSS stay in step.

## Logo

The master file is `public/assets/brand/ruwwad-logo.jpg`. It is never rendered
directly — three assets are generated from it (not redrawn):

| Asset | Use |
|---|---|
| `ruwwad-lockup.png` | full lockup on its cyan field, scan border trimmed |
| `ruwwad-lockup-inverse.png` | same lockup, cyan field keyed out |
| `ruwwad-mark-inverse.png` | the wing mark alone, keyed out |

Plus `src/app/icon.png` and `apple-icon.png` (favicons), and
`public/assets/brand/og-default.jpg` (1200x630 social card).

The logo is white artwork on solid cyan, so it cannot sit bare on the site's
white surfaces. Rather than invent a light-background colourway, `Logo` carries
the artwork on a cyan tile: `variant="mark"` (tile + text wordmark) in the
header, `variant="lockup"` (the complete official logo) in the footer.

**Still needed from Ruwwad:** a vector master (SVG/AI) — the supplied file is a
473x659 JPEG, which caps how large the logo can be shown — plus an official
horizontal lockup and a light-background version.

## RTL and bilingual readiness

Arabic is the primary language; `<html lang="ar" dir="rtl">` is set from
`src/lib/i18n.ts`. Layout uses logical properties throughout (`ps`/`pe`,
`ms`/`me`, `start`/`end`, `text-start`, `border-s`) — no component assumes
left-to-right.

Content is stored as `{ ar, en? }` and read through `t()` / `tRich()`, which
fall back to Arabic. English can be added record by record without touching
components. When routed locales are needed, `getLocale()` in `src/lib/i18n.ts`
is the single place that changes.

## Placeholder content

No institutional facts have been invented. Where content is missing:

- `PlaceholderNote` renders a clearly labelled, visible "محتوى مؤقت" block.
  Delete each usage as real content arrives.
- `src/data/alumni.ts` holds **one** placeholder graduate, flagged
  `isPlaceholder: true`. `getAllAlumni()` hides it in production builds, so a
  production `/alumni` is currently empty by design — the placeholder exists
  only so the route and the interception are workable in `npm run dev`.
- `otherPrograms`, Drosos studios/projects/galleries, and the About timeline
  are empty arrays. Every component returns `null` for empty data rather than
  rendering an empty section.

## What is deliberately not done

Final page designs, visual storytelling, imagery, detailed motion, and the
Drosos and Alumni visual experiences all belong to the next phase. The motion
and decorative primitives (`Reveal`, `RevealGroup`, `MotionPath`,
`BackgroundLayer`, `DecorativeSvg`) are built, typed, and runtime-verified but
intentionally **not wired into any page** — no animation or decorative shape
has been imposed on the design.
