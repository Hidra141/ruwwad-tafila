import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4;

const levelTag = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const;

const levelSize: Record<HeadingLevel, string> = {
  1: "text-4xl font-bold",
  2: "text-3xl font-semibold",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
};

interface SectionHeadingProps {
  title: ReactNode;
  /** Small label above the title. */
  eyebrow?: ReactNode;
  /** Supporting sentence below the title. */
  description?: ReactNode;
  /** Heading level. Choose for document outline, not for size. */
  level?: HeadingLevel;
  /** Set when a parent section uses `aria-labelledby`. */
  id?: string;
  align?: "start" | "center";
  className?: string;
}

/**
 * Heading block for page sections. Keeps the document outline explicit —
 * `level` drives the tag, and size is a separate visual concern.
 */
export function SectionHeading({
  title,
  eyebrow,
  description,
  level = 2,
  id,
  align = "start",
  className,
}: SectionHeadingProps) {
  const Tag = levelTag[level];

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-ink-brand">
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={cn(levelSize[level], "text-ink")}>
        {title}
      </Tag>
      {description ? (
        <p className="max-w-(--container-content) text-lg text-ink-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
