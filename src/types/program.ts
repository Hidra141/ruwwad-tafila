import type { ImageAsset, LocalizedRichText, LocalizedText, Slug } from "./common";

/**
 * Lightweight model for the Ruwwad programs that appear as concise cards.
 * Only `id`, `slug`, and `title` are required — programs whose official copy
 * has not been supplied yet are still representable.
 */
export interface Program {
  id: string;
  slug: Slug;
  title: LocalizedText;
  summary?: LocalizedText;
  image?: ImageAsset;
  /** Internal route this card links to, when a dedicated page exists. */
  href?: string;
  /** Marks entries that exist only to keep the layout buildable. */
  isPlaceholder?: boolean;
}

/** The Youth Program gets a richer structure than the other program cards. */
export interface YouthProgram extends Program {
  intro?: LocalizedRichText;
  pillars?: YouthProgramPillar[];
  gallery?: ImageAsset[];
}

export interface YouthProgramPillar {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  image?: ImageAsset;
}

/* -------------------------------------------------------------------------
   Youth Programme
   The programme is the umbrella; Drosos is one project run inside it. These
   types mirror the structure of the official decks rather than inventing a
   shape, so new slides can be added without reworking the model.
   ------------------------------------------------------------------------- */

export interface YouthProgramSection {
  title: LocalizedText;
  paragraphs: LocalizedRichText;
}

export interface YouthProgramComponent {
  id: string;
  title: LocalizedText;
}

/** One year of the programme's history, with the photographs shown alongside it. */
export interface YouthProgramYear {
  year: number;
  paragraphs: LocalizedRichText;
  images?: ImageAsset[];
}

/**
 * A cumulative figure. `value` keeps the source's own wording — "9341 يافع
 * ويافعة" — because the unit is part of the sentence in Arabic and splitting
 * it would force a reconstruction the source does not license.
 */
export interface YouthProgramStat {
  id: string;
  label: LocalizedText;
  value: string;
}

export interface YouthProgramHighlight {
  id: string;
  text: LocalizedText;
  /** As written in the source; may name several years. */
  years: string;
}

export interface YouthProgramContent {
  origin: { title: LocalizedText; paragraphs: LocalizedRichText };
  goal: { title: LocalizedText; text: LocalizedText };
  beginnings: YouthProgramSection[];
  structure: {
    intro: LocalizedText;
    umbrella: LocalizedText;
    components: YouthProgramComponent[];
  };
  timeline: YouthProgramYear[];
  stats: YouthProgramStat[];
  statsCaption: LocalizedText;
  beneficiaries: {
    areas: LocalizedText;
    families: LocalizedText;
    familySupport: LocalizedText;
    image?: ImageAsset;
  };
  challenges: {
    title: LocalizedText;
    items: { id: string; text: LocalizedText }[];
    image?: ImageAsset;
  };
  highlights: YouthProgramHighlight[];
  /** The Drosos project, summarised here and detailed on its own page. */
  drosos: {
    title: LocalizedText;
    description: LocalizedText;
    outcomes: LocalizedText[];
  };
}
