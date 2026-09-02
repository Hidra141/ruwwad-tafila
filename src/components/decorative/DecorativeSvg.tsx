import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DecorativeSvgProps {
  children: ReactNode;
  /** Must match the coordinate space of the paths passed as children. */
  viewBox: string;
  className?: string;
}

/**
 * Presentational SVG canvas for decorative artwork. Hidden from assistive
 * technology and stretched to its container, so callers only supply paths.
 *
 * Pair with `MotionPath` for path-drawing, or plain `<path>` for static shapes.
 */
export function DecorativeSvg({
  children,
  viewBox,
  className,
}: DecorativeSvgProps) {
  return (
    <svg
      viewBox={viewBox}
      role="presentation"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      {children}
    </svg>
  );
}
