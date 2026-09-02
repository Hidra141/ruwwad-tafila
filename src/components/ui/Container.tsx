import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerWidth = "content" | "page" | "full";

const widthClass: Record<ContainerWidth, string> = {
  /** Reading measure — long-form text. */
  content: "max-w-(--container-content)",
  /** Standard page width — most sections. */
  page: "max-w-(--container-page)",
  /** Edge to edge, gutters only. */
  full: "max-w-none",
};

interface ContainerProps {
  children: ReactNode;
  /** Rendered element. Use a landmark tag when the container is one. */
  as?: ElementType;
  width?: ContainerWidth;
  /** Drop the horizontal gutter when a parent already provides it. */
  bleed?: boolean;
  className?: string;
}

/**
 * Horizontal layout primitive. Owns page width and gutters so no other
 * component needs to know them.
 */
export function Container({
  children,
  as: Tag = "div",
  width = "page",
  bleed = false,
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        widthClass[width],
        !bleed && "px-(--spacing-gutter)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
