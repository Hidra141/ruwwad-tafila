import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { routes } from "@/config/routes";

/**
 * The page's closing note, and its only dark surface.
 *
 * This was a dark rounded card floating on a light section, while a second
 * dark panel sat in the middle of the page. Two maximum contrasts meant
 * neither ended anything. The middle one is now `tint`, and this is the
 * inverse — full width, edge to edge, so the page visibly stops rather than
 * trailing off into the footer.
 *
 * The headline was set at `text-5xl` in `font-black`: larger and heavier than
 * the page `h1` it closes under, which inverted the hierarchy. It now sits a
 * step below the title, where a closing note belongs.
 *
 * The two links stay hand-written rather than going through `buttonStyles`:
 * every variant that file defines assumes a light surface, and forcing one
 * onto this ground means overriding its background and text colour, which
 * `cn` cannot resolve — it joins classes, it does not merge conflicting ones.
 * They do use the shared `press` utility, so they respond to a press exactly
 * like every other control on the site.
 */
export function AboutCTA() {
  const linkBase =
    "press inline-flex min-h-11 items-center justify-center rounded-pill px-6 text-base font-semibold";

  return (
    <SectionSurface surface="inverse" pattern ariaLabelledBy="about-cta-title">
      <Container>
        <Reveal variant="slide-up">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <p className="inline-flex rounded-pill bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur-md">
              كن جزءاً من الرحلة
            </p>

            <h2
              id="about-cta-title"
              className="font-display text-3xl leading-tight text-balance sm:text-4xl"
              style={{ fontVariationSettings: '"wght" 700' }}
            >
              تعرّف على من يصنعون هذه القصة
            </h2>

            <p className="text-lg leading-relaxed text-brand-100">
              برنامج اليافعين وخريجو صندوق المنح هما الوجه اليومي لما قرأته
              هنا. ابدأ من أيّهما شئت.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href={routes.youth}
                className={`${linkBase} bg-surface text-ink-brand shadow-md hover:bg-primary-soft`}
              >
                برنامج اليافعين
              </Link>
              <Link
                href={routes.alumni}
                className={`${linkBase} border-2 border-white/40 bg-white/10 backdrop-blur-md hover:border-white/70 hover:bg-white/20`}
              >
                استكشف الخريجين
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionSurface>
  );
}
