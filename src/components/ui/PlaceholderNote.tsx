import { cn } from "@/lib/utils";

interface PlaceholderNoteProps {
  /** What content belongs here once Ruwwad supplies it. */
  children: string;
  className?: string;
}

/**
 * Marks a section whose approved content has not been supplied yet.
 *
 * Deliberately visible and unmistakably labelled so placeholder scaffolding can
 * never be mistaken for real institutional content. Delete each usage as the
 * corresponding content lands; when none remain, delete this component.
 */
export function PlaceholderNote({ children, className }: PlaceholderNoteProps) {
  return (
    <p
      role="note"
      className={cn(
        "rounded-md border border-dashed border-line-strong bg-surface-sunken px-4 py-3 text-sm text-ink-muted",
        className,
      )}
    >
      <span className="font-semibold text-ink">محتوى مؤقت — </span>
      {children}
    </p>
  );
}
