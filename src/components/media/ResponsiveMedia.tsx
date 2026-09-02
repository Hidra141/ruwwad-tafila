import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MediaRatio = "portrait" | "square" | "landscape" | "wide";

const ratioValue: Record<MediaRatio, string> = {
  portrait: "4 / 5",
  square: "1 / 1",
  landscape: "3 / 2",
  wide: "16 / 9",
};

interface ResponsiveMediaProps {
  children: ReactNode;
  /** Aspect ratio, or a per-breakpoint pair for layouts that reframe. */
  ratio?: MediaRatio;
  rounded?: boolean;
  className?: string;
}

/**
 * Reserves aspect-ratio space for media so nothing shifts while it loads.
 * Establishes the positioning context that `ImageFrame` with `fill` needs.
 */
export function ResponsiveMedia({
  children,
  ratio = "landscape",
  rounded = true,
  className,
}: ResponsiveMediaProps) {
  return (
    <div
      style={{ aspectRatio: ratioValue[ratio] }}
      className={cn(
        "relative w-full overflow-hidden bg-surface-sunken",
        rounded && "rounded-card",
        className,
      )}
    >
      {children}
    </div>
  );
}
