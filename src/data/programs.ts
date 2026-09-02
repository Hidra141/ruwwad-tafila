import type { Program, YouthProgram } from "@/types";
import { routes } from "@/config/routes";
import { youthProgramContent } from "./youth-program";

/**
 * The Youth Program. Official copy has not been supplied yet, so the record
 * carries identity only. Add `intro`, `pillars`, and `gallery` when the
 * approved content arrives — the UI renders each section only when present.
 */
/**
 * The Youth Programme, as a card for listings.
 *
 * The full content — its origin, structure, year-by-year history, figures, and
 * challenges — lives in `youth-program.ts`, transcribed from the official
 * decks. This record carries only what a card needs.
 *
 * Note: the phases of Drosos are NOT this programme's pillars. Drosos is one
 * project run inside it since 2024; conflating the two misstates both.
 */
export const youthProgram: YouthProgram = {
  id: "youth",
  slug: "youth",
  title: { ar: "برنامج اليافعين", en: "Youth Programme" },
  href: routes.youth,
  summary: {
    ar: youthProgramContent.goal.text.ar,
  },
  pillars: youthProgramContent.structure.components.map((component) => ({
    id: component.id,
    title: component.title,
  })),
  gallery: [],
};

/**
 * Ruwwad impact and core program areas shown as concise cards.
 */
export const otherPrograms: Program[] = [
  {
    id: "youth-empowerment",
    slug: "youth-empowerment",
    title: { ar: "تمكين الشباب والتعليم", en: "Youth Empowerment & Education" },
    summary: {
      ar: "منح تعليمية سنوية مقرونة بساعات خدمة مجتمعية وتدريبات إثرائية لتطوير القيادة وبناء قدرات الشباب في الطفيلة.",
      en: "Annual educational scholarships combined with community service and enrichment training to foster youth leadership.",
    },
  },
  {
    id: "child-development",
    slug: "child-development",
    title: { ar: "تنمية الطفل", en: "Child Development" },
    summary: {
      ar: "أنشطة تفاعلية وأندية صيفية مخصصة للأطفال في القرى والمجتمعات المحلية لتعزيز الإبداع والتعلم الاستكشافي.",
      en: "Interactive activities and summer clubs tailored for children in local villages to foster creativity and exploration.",
    },
  },
  {
    id: "community-empowerment",
    slug: "community-empowerment",
    title: { ar: "تمكين المجتمع والمبادرات", en: "Community Empowerment & Initiatives" },
    summary: {
      ar: "مساحة آمنة وحاضنة للمبادرات المحلية والشراكات مع الجمعيات والمؤسسات لخدمة مجتمع الطفيلة بمختلف فئاته.",
      en: "A safe space and incubator for community initiatives and partnerships serving all segments of the Tafila community.",
    },
  },
  {
    id: "projects-innovation",
    slug: "projects-innovation",
    title: { ar: "المشاريع والابتكار", en: "Projects & Innovation" },
    summary: {
      ar: "تحويل الأفكار إلى نماذج عمل أولية تقنية وبيئية باستخدام الأردوينو، النمذجة ثلاثية الأبعاد والطباعة ثلاثية الأبعاد.",
      en: "Transforming ideas into technical and environmental prototypes through Arduino, 3D modeling, and 3D printing.",
    },
  },
];

export const allPrograms: Program[] = [youthProgram, ...otherPrograms];
