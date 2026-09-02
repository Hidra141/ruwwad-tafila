import type { ImageAsset, LocalizedRichText, LocalizedText, Slug } from "./common";

/** The three major stages of the Drosos journey. */
export type DrososStageId = "stage-1" | "stage-2" | "stage-3";

export interface DrososStage {
  id: DrososStageId;
  /** 1-based position, used for ordering and for "Stage N" labelling. */
  order: number;
  title: LocalizedText;
  summary?: LocalizedText;
  description?: LocalizedRichText;
  hero?: ImageAsset;
  gallery?: ImageAsset[];
}

export interface DrososStudio {
  id: string;
  slug: Slug;
  title: LocalizedText;
  summary?: LocalizedText;
  description?: LocalizedRichText;
  /** Stage this studio belongs to, when the mapping is known. */
  stageId?: DrososStageId;
  image?: ImageAsset;
  gallery?: ImageAsset[];
}

export interface DrososProject {
  id: string;
  slug: Slug;
  title: LocalizedText;
  summary?: LocalizedText;
  description?: LocalizedRichText;
  stageId?: DrososStageId;
  studioId?: string;
  /** Slugs of the alumni who worked on this project. */
  alumniSlugs?: Slug[];
  cover?: ImageAsset;
  gallery?: ImageAsset[];
}

/** The whole Drosos content tree. Every section is optional except identity. */
export interface DrososContent {
  title: LocalizedText;
  tagline?: LocalizedText;
  intro?: LocalizedRichText;
  hero?: ImageAsset;
  stages: DrososStage[];
  studios: DrososStudio[];
  projects: DrososProject[];
  gallery: ImageAsset[];
}
