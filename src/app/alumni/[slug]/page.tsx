import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlumniProfile } from "@/components/alumni/AlumniProfile";
import { routes } from "@/config/routes";
import {
  getAlumniBySlug,
  getAlumniNeighbours,
  getAlumniSlugs,
} from "@/lib/alumni";
import { t, tMaybe } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

interface AlumniProfilePageProps {
  params: Promise<{ slug: string }>;
}

/** Prerenders every profile at build time. */
export function generateStaticParams() {
  return getAlumniSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AlumniProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const alumni = getAlumniBySlug(slug);
  if (!alumni) return {};

  return buildMetadata({
    title: t(alumni.name),
    description: tMaybe(alumni.intro),
    path: routes.alumniProfile(slug),
    image: alumni.portrait?.src,
    type: "profile",
  });
}

/**
 * Standalone graduate profile — the target of a direct visit, a shared link, or
 * a page refresh over the intercepted overlay.
 */
export default async function AlumniProfilePage({
  params,
}: AlumniProfilePageProps) {
  const { slug } = await params;
  const alumni = getAlumniBySlug(slug);
  if (!alumni) notFound();

  const neighbours = getAlumniNeighbours(slug);

  // No Section/Container wrapper: the profile owns its own full-bleed layout,
  // and its hero and closing band both need the page's full width.
  return <AlumniProfile alumni={alumni} neighbours={neighbours} />;
}
