import { alumni } from "@/data/alumni";
import { alumniJourneys } from "@/data/alumni-journeys";
import { alumniVoices } from "@/data/alumni-voices";
import { rosterPortraits } from "@/data/alumni-roster";
import type { Alumni, AlumniNeighbours, Slug } from "@/types";

/**
 * Query layer for the alumni archive. Components read through these helpers, so
 * ordering, placeholder filtering, and the join between a graduate's identity
 * and their recorded content all stay defined in one place.
 */

/** Show placeholder records only outside production builds. */
const includePlaceholders = process.env.NODE_ENV !== "production";

function isVisible(entry: Alumni): boolean {
  return includePlaceholders || !entry.isPlaceholder;
}

/** The phase whose words read best as a lede — the most reflective of the five. */
const LEDE_STAGE = "fellowship";

/**
 * Joins a graduate's identity record to whatever the source documents record
 * for them. Absent content stays absent — this never substitutes a default.
 *
 * A single-paragraph voice is a pull quote (and doubles as the card lede); a
 * multi-paragraph voice is a testimony. That split is the only interpretation
 * applied to the source, and it changes presentation only, never wording.
 *
 * The lede is always the graduate speaking. Where no testimony exists, it comes
 * from their own words about the fellowship phase rather than from the record's
 * `intro` — those were written to fill the gap and describe people in terms no
 * source supports ("متخصص في المهارات البرمجية والنمذجة الهندسية"). A graduate
 * with neither a voice nor a journey therefore gets no lede at all, which is
 * the honest result.
 */
function withContent(entry: Alumni): Alumni {
  const journey = alumniJourneys[entry.slug];
  const voice = alumniVoices[entry.slug];
  const paragraphs = voice?.ar ?? [];
  const isPullQuote = paragraphs.length === 1;

  const ownWords =
    paragraphs.length > 0
      ? undefined
      : journey?.find((phase) => phase.stageId === LEDE_STAGE)?.words ??
        journey?.[0]?.words;

  // Drop the record's own `intro` before rebuilding it from the sources below.
  const identity: Alumni = { ...entry };
  delete identity.intro;

  // Portraits supplied after the roster was written.
  const late = rosterPortraits[entry.slug];
  if (late && !identity.portrait) {
    identity.portrait = {
      src: late.src,
      alt: { ar: late.alt },
      width: late.width,
      height: late.height,
    };
  }

  return {
    ...identity,
    ...(journey ? { journey } : {}),
    ...(isPullQuote
      ? {
          intro: { ar: paragraphs[0] },
          quotes: [{ id: `${entry.slug}-voice`, text: { ar: paragraphs[0] } }],
        }
      : {}),
    ...(voice && !isPullQuote ? { story: voice } : {}),
    ...(ownWords ? { intro: ownWords } : {}),
  };
}

/** Most recent cohort first, then by name for stable ordering within a cohort. */
function byCohortThenName(a: Alumni, b: Alumni): number {
  if (a.cohort.order !== b.cohort.order) return b.cohort.order - a.cohort.order;
  return a.name.ar.localeCompare(b.name.ar, "ar");
}

export function getAllAlumni(): Alumni[] {
  return alumni.filter(isVisible).map(withContent).sort(byCohortThenName);
}

export function getAlumniSlugs(): Slug[] {
  return getAllAlumni().map((entry) => entry.slug);
}

export function getAlumniBySlug(slug: Slug): Alumni | undefined {
  return getAllAlumni().find((entry) => entry.slug === slug);
}

/**
 * Previous/next neighbours in archive order, for profile-to-profile
 * navigation. Returns undefined at either end rather than wrapping around.
 */
export function getAlumniNeighbours(slug: Slug): AlumniNeighbours {
  const list = getAllAlumni();
  const index = list.findIndex((entry) => entry.slug === slug);
  if (index === -1) return {};

  const pick = (entry: Alumni | undefined) =>
    entry && { slug: entry.slug, name: entry.name, portrait: entry.portrait };

  return {
    previous: pick(list[index - 1]),
    next: pick(list[index + 1]),
  };
}

/** Cohorts present in the archive, most recent first. Useful for filtering. */
export function getAlumniCohorts() {
  const seen = new Map<string, Alumni["cohort"]>();
  for (const entry of getAllAlumni()) {
    if (!seen.has(entry.cohort.id)) seen.set(entry.cohort.id, entry.cohort);
  }
  return [...seen.values()].sort((a, b) => b.order - a.order);
}
