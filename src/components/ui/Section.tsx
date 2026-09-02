import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  /** Anchor target and the id referenced by `aria-labelledby` headings. */
  id?: string;
  /** Vertical rhythm. `none` lets a section control its own spacing. */
  spacing?: "default" | "compact" | "none";
  /** Accessible name when the section has no visible heading. */
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
}

/**
 * Semantic page section with consistent vertical rhythm. Visual treatment
 * (background, decoration) is applied by the caller via `className`.
 */
export function Section({
  children,
  id,
  spacing = "default",
  ariaLabel,
  ariaLabelledBy,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        spacing === "default" && "py-(--spacing-section)",
        spacing === "compact" && "py-(--spacing-section-sm)",
        className,
      )}
    >
      {children}
    </section>
  );
}
