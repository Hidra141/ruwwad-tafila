/**
 * Shared primitives used across every content model.
 *
 * Arabic is the primary language of the site. English is optional at the data
 * level so the project can ship Arabic-only content today and grow into a full
 * bilingual experience without a data migration.
 */

export const LOCALES = ["ar", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export type Direction = "rtl" | "ltr";

/** A piece of text that exists in Arabic and may later exist in English. */
export interface LocalizedText {
  ar: string;
  en?: string;
}

/** A multi-paragraph body. Each entry is one paragraph. */
export interface LocalizedRichText {
  ar: string[];
  en?: string[];
}

/**
 * An image that lives in `public/assets/**`.
 *
 * `width`/`height` are the intrinsic pixel dimensions and are required so
 * next/image can reserve layout space and avoid cumulative layout shift.
 */
export interface ImageAsset {
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
  /** Optional caption rendered beneath the image when present. */
  caption?: LocalizedText;
}

export interface ExternalLink {
  href: string;
  label: LocalizedText;
}

/** URL-safe identifier used for dynamic routes. */
export type Slug = string;
