import { DEFAULT_LOCALE, LOCALE_DIRECTION } from "@/config/site";
import type {
  Direction,
  Locale,
  LocalizedRichText,
  LocalizedText,
} from "@/types";

/**
 * Locale foundation.
 *
 * The site currently renders a single locale. Everything that needs to know
 * "which language am I in?" goes through `getLocale()`, so introducing routed
 * locales later means changing this file rather than every component.
 */
export function getLocale(): Locale {
  return DEFAULT_LOCALE;
}

export function getDirection(locale: Locale = getLocale()): Direction {
  return LOCALE_DIRECTION[locale];
}

export function isRtl(locale: Locale = getLocale()): boolean {
  return getDirection(locale) === "rtl";
}

/** Resolve localized text, falling back to Arabic when a translation is absent. */
export function t(text: LocalizedText, locale: Locale = getLocale()): string {
  return text[locale] ?? text[DEFAULT_LOCALE];
}

/** Resolve localized rich text, falling back to Arabic. */
export function tRich(
  text: LocalizedRichText,
  locale: Locale = getLocale(),
): string[] {
  return text[locale] ?? text[DEFAULT_LOCALE];
}

/** Optional-safe variant for fields that may be missing entirely. */
export function tMaybe(
  text: LocalizedText | undefined,
  locale: Locale = getLocale(),
): string | undefined {
  return text ? t(text, locale) : undefined;
}
