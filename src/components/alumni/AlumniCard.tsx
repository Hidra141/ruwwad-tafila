import Link from "next/link";

import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { GRADUATE_AVATAR, getAlumniGender } from "@/data/alumni-roster";
import { alumniVoices } from "@/data/alumni-voices";
import { routes } from "@/config/routes";
import { t, tMaybe } from "@/lib/i18n";
import type { Alumni } from "@/types";

interface AlumniCardProps {
  alumni: Alumni;
  /**
   * Load the portrait eagerly. Reserve for the first row of the grid only —
   * everything below the fold must stay lazy.
   */
  priority?: boolean;
}

/**
 * Card for one graduate in the alumni archive.
 *
 * Name-led, portrait above. The whole card is a single link so there is one
 * tab stop per graduate and nothing depends on hover.
 */
export function AlumniCard({ alumni, priority = false }: AlumniCardProps) {
  const name = t(alumni.name);
  const intro = tMaybe(alumni.intro);
  const voiceQuote = alumniVoices[alumni.slug]?.ar?.[0] || intro;
  const gender = getAlumniGender(alumni.slug);
  const cohortText = gender === "female" ? "خريجة برنامج دروسوس – الطفيلة" : "خريج برنامج دروسوس – الطفيلة";

  return (
    <article className="h-full">
      <Link
        href={routes.alumniProfile(alumni.slug)}
        className="lift group flex h-full flex-col justify-between gap-2.5 sm:gap-3 rounded-2xl border border-line bg-surface p-2.5 sm:p-4 shadow-xs hover:border-brand-300"
      >
        <ResponsiveMedia ratio="portrait" className="relative overflow-hidden rounded-xl bg-surface-sunken">
          {alumni.portrait ? (
            <>
              <ImageFrame
                image={alumni.portrait}
                fill
                priority={priority}
                sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 50vw"
                quality={90}
                imageClassName="media-zoom object-cover object-top brightness-[1.01] contrast-[1.02] saturate-[0.98]"
              />
              {/* Unified inner vignette ring border for visual consistency */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 z-10" />
            </>
          ) : (
            /* No photograph on file — the brand medallion, never a stand-in face. */
            <ImageFrame
              image={{
                ...GRADUATE_AVATAR,
                alt: { ar: `لا تتوفر صورة لـ${name}` },
              }}
              fill
              sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 50vw"
              imageClassName="object-cover"
            />
          )}
        </ResponsiveMedia>

        <div className="flex flex-col gap-0.5 sm:gap-1 mt-0.5">
          <h3 className="text-sm sm:text-lg font-black sm:font-bold text-ink group-hover:text-ink-brand transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-[0.65rem] sm:text-xs font-semibold text-ink-subtle line-clamp-1">{cohortText}</p>
          {voiceQuote ? (
            <p className="text-[0.7rem] sm:text-sm text-ink-muted line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1">
              {voiceQuote}
            </p>
          ) : null}
          <div className="mt-1.5 sm:mt-2 flex items-center gap-1 sm:gap-1.5 text-[0.65rem] sm:text-xs font-bold text-ink-brand">
            <span>اكتشف القصة</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-3 sm:size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:-translate-x-1 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
