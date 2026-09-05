import type { CSSProperties, ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * The opening of every inner page.
 *
 * Four pages had four unrelated answers to the same question. Two of them —
 * the story page and the youth programme — were the same stacked layout
 * duplicated, so neither read as its own page. The other two were not heroes
 * at all: the alumni archive was a bare `Section` with an `h1`, and the
 * contact page wrote its `h1` inline in `page.tsx`. Both of those sat under
 * the fixed header on small screens, because the offset was something each
 * page had to remember and two pages forgot. It lives here now, once.
 *
 * The structure is fixed — eyebrow, title, lead, proof — and only `children`
 * changes between pages. That slot is what makes a page distinct, and it is
 * drawn from what the page is actually about: figures for the story, a record
 * for the programme, faces for the alumni, the two contact channels for the
 * page whose entire purpose is one action.
 *
 * Why a split rather than a stack: stacked, a short Arabic title and two lines
 * of lead leave most of the first screen empty, which is what made these read
 * as unfinished. Side by side, the proof fills the width the title does not.
 *
 * The home page keeps its own full-bleed hero. If every page opened that
 * loudly, none of them would.
 *
 * The entrance is CSS, not `Reveal`. Reveal waits on an IntersectionObserver,
 * which for an element already on screen at first paint may never report — the
 * hero measured zero opacity on all three of its blocks three seconds after a
 * reload, so a visitor's first screen was a gradient with nothing on it. A
 * keyframe animation starts when the element paints and cannot fail that way.
 * It also makes this a server component: the hero now ships no JavaScript.
 */

interface PageHeroProps {
  /** Small line above the title. Context, not a slogan. */
  eyebrow?: ReactNode;
  /** The page `h1`. */
  title: ReactNode;
  /** One or two sentences. Longer than that belongs in the first section. */
  lead?: ReactNode;
  /**
   * The proof slot, rendered beside the text on wide screens and beneath it
   * otherwise. Omit it and the text simply takes the full measure.
   */
  children?: ReactNode;
  /** Set when a page needs to reference the heading by id. */
  titleId?: string;
  /** Draw the static wing motif behind the content. */
  pattern?: boolean;
  /**
   * Replaces the static wing with something else in the same layer — the
   * interactive field, on the one page that earns it. Suppresses `pattern`,
   * because two wings behind one headline is one too many.
   */
  decoration?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  titleId,
  pattern = true,
  decoration,
  className,
}: PageHeroProps) {
  // Coerced to booleans, not used raw: `ReactNode` admits `bigint`, which the
  // class joiner does not accept as a conditional operand.
  const hasProof = Boolean(children);
  const hasEyebrow = Boolean(eyebrow);

  return (
    <header
      className={cn(
        /* The gradient starts at full strength on the first pixel, so the
           translucent site header sits on colour rather than on white. That
           edge is the only thing that makes the page look like it has a top;
           without it the header floats over nothing. */
        "relative flex flex-col overflow-hidden bg-linear-190 from-brand-50 via-surface to-surface",
        /* Tall enough that the first screen is the hero, short enough that it
           is never the whole screen. No max-height: capping it would clip a
           long title instead of shrinking it.

           The minimum lives here and nowhere else. When the container below
           also carried it, the 60svh floor and the container's own padding
           stacked and the hero measured 89% of the viewport — the empty first
           screen these heroes were meant to fix. The container grows into this
           box with `flex-1` instead of setting a second floor of its own. */
        "min-h-[60svh]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -end-32 size-[30rem] rounded-full bg-brand-200/30 blur-3xl"
      />

      {decoration ?? (pattern ? <HeroWing /> : null)}

      {/* The site header is fixed and `main` carries no global offset, so
          every hero has to clear it itself. This is the one place that does. */}
      <Container className="relative flex flex-1 flex-col justify-center pt-[calc(var(--header-height)+2.5rem)] pb-(--spacing-section-sm)">
        <div
          className={cn(
            "grid gap-10",
            hasProof && "lg:grid-cols-12 lg:items-center lg:gap-14",
          )}
        >
          <div className={cn(hasProof && "lg:col-span-7")}>
            <div className="hero-enter">
              {hasEyebrow ? (
                <p className="text-sm font-semibold tracking-wide text-ink-brand">
                  {eyebrow}
                </p>
              ) : null}

              <h1
                id={titleId}
                className={cn(
                  /* `title-enter` carries the weight: it animates the variable
                     axis from 250 to 700 and holds there. No `font-bold`, which
                     would set `font-weight` and fight the axis. */
                  "title-enter font-display text-4xl tracking-tight text-balance text-ink sm:text-5xl",
                  hasEyebrow && "mt-3",
                )}
              >
                {title}
              </h1>
            </div>

            {lead ? (
              <p
                className="hero-enter mt-7 max-w-(--container-content) border-s-4 border-brand-400 ps-5 text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl"
                style={{ "--enter-delay": "90ms" } as CSSProperties}
              >
                {lead}
              </p>
            ) : null}
          </div>

          {hasProof ? (
            <div
              className="hero-enter lg:col-span-5"
              style={{ "--enter-delay": "170ms" } as CSSProperties}
            >
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}

/**
 * The same wing the section surfaces use, placed on the trailing edge here so
 * it sits behind the proof slot rather than behind the reading column.
 */
function HeroWing() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-32 -start-28 hidden size-[38rem] opacity-[0.05] lg:block"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="size-full text-brand-700"
      >
        <path d="M14 118c0-52 40-96 92-96 30 0 56 14 72 36-22 4-38 12-50 26-14 16-18 34-30 48-14 16-38 22-64 14-12-4-20-14-20-28Z" />
        <path d="M42 116c0-38 28-70 66-70 20 0 38 8 50 22-16 4-28 10-36 20-10 12-14 26-22 36-10 12-26 16-44 10-9-3-14-10-14-18Z" />
        <path d="M70 114c0-24 18-44 42-44 12 0 23 5 30 13-10 3-17 7-22 13-6 8-9 17-14 23-6 8-16 10-27 6-6-2-9-6-9-11Z" />
      </svg>
    </div>
  );
}
