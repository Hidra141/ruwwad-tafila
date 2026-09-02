import type { Metadata } from "next";

import { SITE_URL, siteConfig } from "@/config/site";
import { getLocale, t } from "@/lib/i18n";

interface BuildMetadataOptions {
  title: string;
  description?: string;
  /** Route path, e.g. `/alumni/some-slug`. Used for the canonical URL. */
  path?: string;
  /** Absolute or root-relative image path. Falls back to the site OG image. */
  image?: string | null;
  type?: "website" | "article" | "profile";
}

/**
 * Builds page metadata from a single place so Open Graph, Twitter cards, and
 * canonicals never drift apart. Copy passed in here is still placeholder until
 * approved SEO text is supplied.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: BuildMetadataOptions): Metadata {
  const locale = getLocale();
  const resolvedDescription = description ?? t(siteConfig.description, locale);
  const url = new URL(path, SITE_URL).toString();
  const resolvedImage = image ?? siteConfig.ogImage;
  const images = resolvedImage ? [{ url: resolvedImage }] : undefined;

  return {
    title,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      type,
      title,
      description: resolvedDescription,
      url,
      siteName: t(siteConfig.name, locale),
      locale: locale === "ar" ? "ar_JO" : "en_US",
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description: resolvedDescription,
      images: images?.map((entry) => entry.url),
    },
  };
}
