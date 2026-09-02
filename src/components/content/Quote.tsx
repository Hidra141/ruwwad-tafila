import { t, tMaybe } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LocalizedText } from "@/types";

interface QuoteProps {
  text: LocalizedText;
  /** Who said it. Rendered as the citation when present. */
  attribution?: LocalizedText;
  /** Where or when it was said. */
  context?: LocalizedText;
  className?: string;
}

/**
 * A pull quote. Uses `<blockquote>` + `<figcaption>` so the attribution is
 * programmatically tied to the quotation rather than being loose text.
 */
export function Quote({ text, attribution, context, className }: QuoteProps) {
  const cite = tMaybe(attribution);
  const where = tMaybe(context);

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <blockquote className="text-2xl leading-snug text-ink">
        <p>{t(text)}</p>
      </blockquote>
      {cite || where ? (
        <figcaption className="text-sm text-ink-muted">
          {cite ? <cite className="not-italic font-medium">{cite}</cite> : null}
          {cite && where ? " — " : null}
          {where}
        </figcaption>
      ) : null}
    </figure>
  );
}
