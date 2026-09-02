import type { AlumniStageId, LocalizedText } from "@/types";

/**
 * The five documented phases of the Drosos youth journey, in order.
 *
 * Titles come from the official learning-and-impact documents in
 * `reference/source`. A youth appears in a phase only if that document
 * records their words for it — the catalogue defines order and naming, never
 * who took part.
 */
export interface AlumniStage {
  id: AlumniStageId;
  /** 1-based position, rendered as 01 … 05. */
  order: number;
  title: LocalizedText;
}

export const alumniStages: AlumniStage[] = [
  {
    id: "foundation",
    order: 1,
    title: { ar: "المرحلة التأسيسية", en: "Foundation Phase" },
  },
  {
    id: "digital-fluency",
    order: 2,
    title: { ar: "أساسيات الحاسوب والطلاقة الرقمية", en: "Computer Basics & Digital Fluency" },
  },
  {
    id: "studio-green-circuit",
    order: 3,
    title: { ar: "الاستوديو الأول — Green Circuit Studio", en: "Studio 1 — Green Circuit Studio" },
  },
  {
    id: "studio-innovate-earth",
    order: 4,
    title: { ar: "الاستوديو الثاني — Innovate for Earth", en: "Studio 2 — Innovate for Earth" },
  },
  {
    id: "fellowship",
    order: 5,
    title: { ar: "الزمالة — تواصل مع قوتك", en: "Fellowship — Connect with Your Strength" },
  },
];

/** Lookup by id, for resolving a journey entry to its phase. */
export const alumniStageById: Record<AlumniStageId, AlumniStage> =
  Object.fromEntries(alumniStages.map((s) => [s.id, s])) as Record<
    AlumniStageId,
    AlumniStage
  >;
