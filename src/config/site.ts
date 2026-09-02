import type { Direction, Locale, LocalizedText } from "@/types";

/**
 * Single source of truth for site-level identity and technical configuration.
 * Institutional copy lives in `src/data`, not here.
 */

/**
 * Typed as the literal `"ar"` rather than the wider `Locale`, so
 * `text[DEFAULT_LOCALE]` is known to be present and fallbacks stay non-optional.
 */
export const DEFAULT_LOCALE = "ar" as const satisfies Locale;

export const LOCALE_DIRECTION: Record<Locale, Direction> = {
  ar: "rtl",
  en: "ltr",
};

/** Public origin. Set NEXT_PUBLIC_SITE_URL per environment. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const siteConfig = {
  name: {
    ar: "روّاد التنمية – الطفيلة",
    en: "Ruwwad Al-Tanmeya – Tafila",
  } satisfies LocalizedText,
  /** Short form used in tight spaces such as the mobile header. */
  shortName: {
    ar: "روّاد الطفيلة",
    en: "Ruwwad Tafila",
  } satisfies LocalizedText,
  /**
   * Neutral placeholder description. Replace with approved institutional copy
   * before launch — see `src/lib/metadata.ts` for where it is consumed.
   */
  description: {
    ar: "الموقع الرسمي لروّاد التنمية – الطفيلة.",
    en: "The official website of Ruwwad Al-Tanmeya – Tafila.",
  } satisfies LocalizedText,
  url: SITE_URL,
  /**
   * Official logo assets, all derived from the supplied master file.
   *
   * The brand lockup is white artwork on a solid cyan field, so it cannot sit
   * directly on the site's white surfaces. `lockup` keeps that field intact
   * (the logo exactly as supplied) and `mark`/`lockupInverse` have it keyed
   * out, for placing the artwork on brand-coloured surfaces instead.
   */
  logo: {
    /** Untouched master file. Source of truth — never render this directly. */
    source: "/assets/brand/ruwwad-logo.jpg",
    /** Full lockup on the brand cyan field, scan border trimmed. */
    lockup: { src: "/assets/brand/ruwwad-lockup.png", width: 469, height: 655 },
    /** Full lockup with the cyan field keyed out. */
    lockupInverse: {
      src: "/assets/brand/ruwwad-lockup-inverse.png",
      width: 469,
      height: 655,
    },
    /** The wing mark alone, keyed out — the compact form for tight spaces. */
    mark: { src: "/assets/brand/ruwwad-mark-inverse.png", width: 142, height: 263 },
  },
  /** Brand-cyan card carrying the lockup, generated from the master file. */
  ogImage: "/assets/brand/og-default.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
