import type { ReactNode } from "react";

import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * A page section together with the ground it sits on.
 *
 * Sections used to write their own background classes. The story page alone
 * ended up with seven different treatments — three flat tints, a translucent
 * one and three separate gradients — chosen section by section with nothing
 * relating them. Two of those were near-black, so the page had two maximum
 * contrasts competing and neither read as the stopping point.
 *
 * There are four grounds now, and a section picks one by name:
 *
 *   canvas   the default. Long-form text and photographs, which carry
 *            themselves and want nothing behind them.
 *   raised   ONLY for sections built from white cards. The card needs a
 *            ground a shade darker than itself or it dissolves into the page.
 *   tint     the single aside per page — the section that steps out of the
 *            narrative to explain context.
 *   inverse  the closing note. Once per page, and last.
 *
 * The two "once per page" rules are the reason this is a component and not a
 * set of utility classes: they are editorial constraints, and a constraint
 * that lives only in a style guide is a constraint nobody keeps. Here it is at
 * least written down beside the thing it governs.
 *
 * `canvas` and `raised` map to `--color-surface` and `--color-surface-muted`.
 * They are used directly rather than re-aliased — a second name for the same
 * colour is exactly the duplication this system exists to remove.
 */

export type Surface = "canvas" | "raised" | "tint" | "inverse";

const SURFACE: Record<Surface, string> = {
  canvas: "bg-surface text-ink",
  /* The hairline is what separates two adjacent light grounds. Without it a
     50-tone shift against white reads as a rendering artefact rather than a
     deliberate change of section. */
  raised: "bg-surface-muted text-ink border-y border-line",
  tint: "bg-surface-tint text-ink border-y border-brand-100",
  /* A gradient rather than a flat fill: at this size a single dark blue goes
     flat and muddy, and the two ends of the brand ramp give it depth without
     introducing a colour that is not already in the palette. */
  inverse:
    "bg-linear-160 from-surface-inverse to-surface-inverse-to text-ink-inverse",
};

/** Only the two decorated grounds take the wing motif. */
const PATTERNED: ReadonlySet<Surface> = new Set<Surface>(["tint", "inverse"]);

interface SectionSurfaceProps {
  children: ReactNode;
  surface?: Surface;
  /** Anchor id. Also applies the scroll offset the sticky chrome needs. */
  id?: string;
  spacing?: "default" | "compact" | "none";
  ariaLabel?: string;
  ariaLabelledBy?: string;
  /**
   * Draw the brand wing behind the content. Ignored on `canvas` and `raised`,
   * where a motif behind body copy is noise rather than identity.
   */
  pattern?: boolean;
  className?: string;
}

export function SectionSurface({
  children,
  surface = "canvas",
  id,
  spacing = "compact",
  ariaLabel,
  ariaLabelledBy,
  pattern = false,
  className,
}: SectionSurfaceProps) {
  const showPattern = pattern && PATTERNED.has(surface);

  return (
    <Section
      id={id}
      spacing={spacing}
      ariaLabel={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      className={cn(
        "relative",
        SURFACE[surface],
        /* The page carries a fixed header and, on longer pages, a sticky
           section bar under it. `scroll-padding-block-start` on `html` already
           covers the header, so this only has to clear the bar — hence a flat
           3.5rem rather than another calc against `--header-height`, which
           would count the header twice and drop the heading a hundred pixels
           below the chrome. */
        id && "scroll-mt-14",
        showPattern && "overflow-hidden",
        className,
      )}
    >
      {showPattern ? <WingMotif surface={surface} /> : null}
      <div className="relative">{children}</div>
    </Section>
  );
}

/**
 * The logo's wing, reduced to three nested strokes and set at the low opacity
 * the identity can carry without competing with text.
 *
 * Drawn rather than loaded: the artwork in `public/assets/brand` is raster,
 * and a decorative shape that scales to a full-width band should not be a
 * bitmap. It is cropped off the leading edge so no stroke crosses the reading
 * column.
 */
function WingMotif({ surface }: { surface: Surface }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -top-24 -start-24 hidden size-[34rem] sm:block",
        surface === "inverse" ? "opacity-[0.08]" : "opacity-[0.06]",
      )}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="size-full"
      >
        <path d="M14 118c0-52 40-96 92-96 30 0 56 14 72 36-22 4-38 12-50 26-14 16-18 34-30 48-14 16-38 22-64 14-12-4-20-14-20-28Z" />
        <path d="M42 116c0-38 28-70 66-70 20 0 38 8 50 22-16 4-28 10-36 20-10 12-14 26-22 36-10 12-26 16-44 10-9-3-14-10-14-18Z" />
        <path d="M70 114c0-24 18-44 42-44 12 0 23 5 30 13-10 3-17 7-22 13-6 8-9 17-14 23-6 8-16 10-27 6-6-2-9-6-9-11Z" />
      </svg>
    </div>
  );
}
