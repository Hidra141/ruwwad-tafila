import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BackgroundLayerProps {
  children: ReactNode;
  /** Stacking position relative to the section content. */
  position?: "behind" | "front";
  className?: string;
}

/**
 * Absolutely positioned, non-interactive layer for decorative visuals — SVG
 * shapes, animated wing-inspired paths, soft background washes.
 *
 * This is the mechanism only. No pattern or shape is defined here: the final
 * decorative artwork is supplied during the design phase and dropped in as
 * children.
 *
 * The parent must be `relative` (and usually `overflow-hidden`).
 */
export function BackgroundLayer({
  children,
  position = "behind",
  className,
}: BackgroundLayerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        position === "behind" ? "-z-10" : "z-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
