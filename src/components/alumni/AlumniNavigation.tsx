import Link from "next/link";

import { routes } from "@/config/routes";
import { t } from "@/lib/i18n";
import type { AlumniNeighbours } from "@/types";

interface AlumniNavigationProps {
  neighbours: AlumniNeighbours;
}

/**
 * Previous/next navigation between graduate profiles.
 *
 * Uses logical `start`/`end` ordering rather than left/right wording, so the
 * arrows and labels stay correct in both reading directions. Renders nothing
 * when the archive has a single entry.
 */
export function AlumniNavigation({ neighbours }: AlumniNavigationProps) {
  const { previous, next } = neighbours;
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="التنقل بين ملفات الخريجين"
      className="flex items-stretch justify-between gap-4 border-t border-line pt-6"
    >
      {previous ? (
        <Link
          href={routes.alumniProfile(previous.slug)}
          rel="prev"
          className="flex min-h-11 flex-col justify-center text-start"
        >
          <span className="text-sm text-ink-subtle">السابق</span>
          <span className="font-medium text-ink">{t(previous.name)}</span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={routes.alumniProfile(next.slug)}
          rel="next"
          className="flex min-h-11 flex-col justify-center text-end"
        >
          <span className="text-sm text-ink-subtle">التالي</span>
          <span className="font-medium text-ink">{t(next.name)}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
