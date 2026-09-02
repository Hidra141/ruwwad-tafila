import type {
  ImageAsset,
  LocalizedRichText,
  LocalizedText,
  Slug,
} from "./common";

/**
 * A cohort groups alumni by the run of the programme they took part in.
 * Kept as a small object rather than a bare string so cohorts can carry
 * bilingual labels and sort deterministically.
 */
export interface AlumniCohort {
  id: string;
  label: LocalizedText;
  /** Sort key. Higher is more recent. */
  order: number;
}

export interface AlumniQuote {
  id: string;
  text: LocalizedText;
  /** Optional context, e.g. which stage or moment the quote comes from. */
  context?: LocalizedText;
}

/**
 * The five documented phases of the youth journey, in order. Distinct from
 * `DrososStageId`: that models the programme's three macro-stages, while these
 * are the five phases the learning-and-impact documents actually record.
 */
export type AlumniStageId =
  | "foundation"
  | "digital-fluency"
  | "studio-green-circuit"
  | "studio-innovate-earth"
  | "fellowship";

/**
 * One phase of a youth's journey, carrying their own account of it.
 *
 * `words` is the youth speaking, transcribed verbatim from the source
 * documents — render it as their voice, never as editorial description.
 */
export interface AlumniJourneyEntry {
  stageId: AlumniStageId;
  words: LocalizedText;
  images?: ImageAsset[];
}

export interface AlumniProject {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  /** Links to a shared Drosos project when this was a group effort. */
  drososProjectSlug?: Slug;
  images?: ImageAsset[];
}

/**
 * A single Drosos graduate.
 *
 * Only identity fields are required. Every content section is optional so a
 * youth with just a portrait and one quote renders as well as one with a full
 * story, three journey stages, projects, and a gallery. The UI must render a
 * section only when its data exists — never an empty shell.
 */
export interface Alumni {
  id: string;
  slug: Slug;
  name: LocalizedText;
  cohort: AlumniCohort;
  /**
   * From the official roster. Arabic needs it to say "خريج" or "خريجة"
   * correctly; nothing else should depend on it.
   */
  gender?: "female" | "male";
  graduationYear?: number;
  /** The photograph as supplied, kept for social cards where alpha is unusable. */
  portrait?: ImageAsset;
  /**
   * The same photograph with its background removed and framing normalised, so
   * every graduate's head is the same size and sits at the same height. This is
   * what the site renders; it needs a background painted behind it.
   */
  portraitCutout?: ImageAsset;
  /** One or two sentences used on cards and as the profile lede. */
  intro?: LocalizedText;
  story?: LocalizedRichText;
  quotes?: AlumniQuote[];
  journey?: AlumniJourneyEntry[];
  /** Studio ids from the Drosos content tree. */
  studioIds?: string[];
  projects?: AlumniProject[];
  gallery?: ImageAsset[];
  /** Marks entries that exist only to keep the route buildable. */
  isPlaceholder?: boolean;
}

/** Neighbouring profiles, used for previous/next navigation. */
export interface AlumniNeighbours {
  previous?: Pick<Alumni, "slug" | "name" | "portrait">;
  next?: Pick<Alumni, "slug" | "name" | "portrait">;
}
