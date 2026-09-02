import { notFound } from "next/navigation";

import { AlumniModal } from "@/components/alumni/AlumniModal";
import { AlumniProfile } from "@/components/alumni/AlumniProfile";
import { getAlumniBySlug } from "@/lib/alumni";
import { t } from "@/lib/i18n";

/**
 * Intercepted graduate profile.
 *
 * `(.)` intercepts a same-level segment, so this matches `/alumni/[slug]` when
 * the user arrives from `/alumni` — the archive stays mounted behind the
 * overlay and the URL still updates to the shareable profile address.
 *
 * Renders the same `AlumniProfile` as the standalone route, at heading level 2
 * because the archive page behind it already owns the `h1`.
 */
export default async function InterceptedAlumniProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const alumni = getAlumniBySlug(slug);
  if (!alumni) notFound();

  return (
    <AlumniModal label={t(alumni.name)}>
      <AlumniProfile alumni={alumni} headingLevel={2} />
    </AlumniModal>
  );
}
