import type { ReactNode } from "react";

import { t, tMaybe, tRich } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LocalizedRichText, LocalizedText } from "@/types";

export interface TimelineItem {
  id: string;
  /** Year, stage number, or any short marker. */
  marker?: LocalizedText;
  title: LocalizedText;
  description?: LocalizedRichText;
  /** Media or any custom block rendered inside the entry. */
  media?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  /** Heading level for entry titles; pick it for the page's outline. */
  itemHeadingLevel?: 3 | 4;
  className?: string;
}

/**
 * Ordered sequence of entries — used for the Ruwwad story and for a youth's
 * journey through the Drosos stages.
 *
 * Renders an `<ol>` because the order carries meaning. The connecting rule is
 * drawn with a logical inline-start border, so it flips with the document
 * direction instead of being pinned to the left.
 *
 * Structural only: the visual timeline is the design phase's work.
 */
export function Timeline({
  items,
  itemHeadingLevel = 3,
  className,
}: TimelineProps) {
  if (items.length === 0) return null;

  const Heading = itemHeadingLevel === 3 ? "h3" : "h4";

  return (
    <ol className={cn("flex flex-col ps-3 sm:ps-4", className)}>
      {items.map((item) => {
        const marker = tMaybe(item.marker);
        return (
          <li
            key={item.id}
            className="relative border-s-2 border-brand-200 ps-6 sm:ps-8 pb-10 last:pb-0 last:border-s-transparent transition-all"
          >
            {/* Milestone Dot */}
            <span
              className="absolute -start-[9px] top-1.5 h-4 w-4 rounded-full bg-brand-600 ring-4 ring-brand-100 shadow-xs"
              aria-hidden="true"
            />

            {marker ? (
              <span className="inline-block rounded-md bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800 border border-brand-200 mb-2">
                {marker}
              </span>
            ) : null}
            
            <Heading className="text-xl font-bold text-ink">
              {t(item.title)}
            </Heading>
            
            {item.description ? (
              <div className="mt-2.5 flex flex-col gap-3 text-base leading-relaxed text-ink-muted max-w-3xl">
                {tRich(item.description).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {item.media ? <div className="mt-4">{item.media}</div> : null}
          </li>
        );
      })}
    </ol>
  );
}
