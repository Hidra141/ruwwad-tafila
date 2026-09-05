import fs from "node:fs";
import path from "node:path";

import { alumniJourneyPhotosMap } from "@/data/alumni-journey-photos";
import type { AlumniStageId, LocalizedText } from "@/types";

/**
 * Journey photographs, discovered on disk at build time.
 *
 * Photographs are dropped into `public/assets/alumni/journey/<slug>/<phase>.webp`
 * and appear on the next build — see the README in that folder. Looking them up
 * from the filesystem rather than listing them in a data file means adding a
 * photograph never needs a code change, which matters because these arrive one
 * at a time over a long period.
 *
 * Server-only: this reads the filesystem, so it must never be imported into a
 * client component.
 */

const JOURNEY_DIR = path.join(
  process.cwd(),
  "public",
  "assets",
  "alumni",
  "journey",
);

const EXTENSIONS = ["webp", "jpg", "jpeg", "png"] as const;

export interface StagePhoto {
  src: string;
  alt: LocalizedText;
}

/**
 * The photograph for one phase of one graduate's journey, or undefined when
 * none has been supplied yet.
 */
export function getStagePhoto(
  slug: string,
  stageId: AlumniStageId,
  graduateName: string,
  stageName: string,
): StagePhoto | undefined {
  const src = alumniJourneyPhotosMap[slug]?.[stageId];
  if (!src) return undefined;
  return {
    src,
    alt: { ar: `${graduateName} في ${stageName}` },
  };
}

/** Whether any journey photograph exists for a graduate. */
export function hasStagePhotos(slug: string): boolean {
  const dir = path.join(JOURNEY_DIR, slug);
  if (!fs.existsSync(dir)) return false;
  return fs
    .readdirSync(dir)
    .some((file) => EXTENSIONS.some((ext) => file.endsWith(`.${ext}`)));
}
