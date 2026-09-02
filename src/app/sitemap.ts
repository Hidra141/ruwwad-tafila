import type { MetadataRoute } from "next";

import { routes, staticRoutes } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { getAlumniSlugs } from "@/lib/alumni";

/**
 * Sitemap. Static routes come from `config/routes`; alumni profiles are
 * appended from the archive, so new graduates are indexed without touching
 * this file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === routes.home ? 1 : 0.7,
  }));

  const profiles = getAlumniSlugs().map((slug) => ({
    url: new URL(routes.alumniProfile(slug), SITE_URL).toString(),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...profiles];
}
