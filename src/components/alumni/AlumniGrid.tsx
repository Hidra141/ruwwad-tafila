import { cn } from "@/lib/utils";
import type { Alumni } from "@/types";

import { AlumniCard } from "./AlumniCard";

interface AlumniGridProps {
  alumni: Alumni[];
  label: string;
  /** Number of cards loaded eagerly — roughly the first visible row. */
  eagerCount?: number;
  className?: string;
}

/**
 * The alumni archive grid. Returns null when there are no graduates so the
 * page never shows an empty shell.
 *
 * Only the first `eagerCount` portraits load eagerly; the rest are lazy, which
 * is what keeps a large archive from downloading every portrait at once.
 */
export function AlumniGrid({
  alumni,
  label,
  eagerCount = 4,
  className,
}: AlumniGridProps) {
  if (alumni.length === 0) return null;

  return (
    <ul
      aria-label={label}
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {alumni.map((entry, index) => (
        <li key={entry.id}>
          <AlumniCard alumni={entry} priority={index < eagerCount} />
        </li>
      ))}
    </ul>
  );
}
