import type { LocalizedText } from "@/types";

/**
 * The centre's programme structure and cumulative figures.
 *
 * Source: the official deck «احتفال المبادرات 2026 + رواد الطفيلة منذ التأسيس»
 * (58 slides, presented 27/6/2026). Every number below is read from that deck.
 *
 * This file exists because the About page previously described three
 * "pillars" that were not the organisation's programmes at all: two of the
 * three badges — «استوديوهات التكنولوجيا والنمذجة» and «زمالة تواصل مع قوتك» —
 * are phases of the Drosos project inside the youth programme, presented as if
 * they were organisation-level divisions. The centre in fact runs four
 * programmes, and the accompanying figures («100% حلول بيئية», «آلاف ساعات
 * الخدمة») had no source at all.
 *
 * Nothing here is rounded, softened, or inferred. Where the deck gives an
 * annual rate it is labelled annual; where it gives a total since 2012 it is
 * labelled as such, because conflating the two is how «50 منحة سنويًا» turned
 * into a claim about the whole history.
 */

export interface ProgramFigure {
  value: string;
  label: LocalizedText;
  /** Whether the figure is a per-year rate or a total since founding. */
  basis: "annual" | "cumulative";
}

export interface ProgramOverview {
  id: string;
  title: LocalizedText;
  /** The audience, in the centre's own wording. */
  audience: LocalizedText;
  description: LocalizedText;
  figures: ProgramFigure[];
  icon: "graduation" | "sprout" | "idea" | "handshake";
  tone: "amber" | "green" | "brand" | "violet";
}

export const programsOverview: ProgramOverview[] = [
  {
    id: "youth-leadership",
    title: { ar: "تنظيم وبناء قيادة الشباب", en: "Youth Leadership" },
    audience: { ar: "الشباب الجامعي" },
    description: {
      ar: "منحة تعليمية جامعية مقابل أربع ساعات خدمة مجتمعية أسبوعيًا، يرافقها مكوّن إثرائي من جلسات الدردشات في الريادة والتدريبات الرقمية واللقاءات الإثرائية، وينفّذ الشباب من خلاله أندية صيفية وشتوية ومبادرات في كافة مناطق المحافظة.",
    },
    figures: [
      { value: "283", label: { ar: "مستفيد من صندوق المنح" }, basis: "cumulative" },
      { value: "126", label: { ar: "خريجًا وخريجة" }, basis: "cumulative" },
      { value: "168", label: { ar: "مبادرة شبابية" }, basis: "cumulative" },
      { value: "47", label: { ar: "جلسة دردشات" }, basis: "annual" },
    ],
    icon: "graduation",
    tone: "amber",
  },
  {
    id: "child-development",
    title: { ar: "تنمية الطفل", en: "Child Development" },
    audience: { ar: "الأطفال" },
    description: {
      ar: "أوسع برامج المركز وصولًا. يعمل داخل المركز وفي تسع قرى مجاورة عبر الأندية الصيفية الرئيسية والفرعية، ويستقبل آلاف الأطفال سنويًا مع نواة ثابتة تعود عامًا بعد عام.",
    },
    figures: [
      { value: "4,050", label: { ar: "طفل وطفلة" }, basis: "annual" },
      { value: "267", label: { ar: "طفلًا متكررًا" }, basis: "annual" },
      { value: "9", label: { ar: "قرى مجاورة" }, basis: "annual" },
      { value: "240", label: { ar: "طفلًا في الأندية الصيفية" }, basis: "annual" },
    ],
    icon: "sprout",
    tone: "green",
  },
  {
    id: "adolescent-development",
    title: { ar: "تنمية اليافعين", en: "Adolescent Development" },
    audience: { ar: "اليافعون من 13 إلى 17 سنة" },
    description: {
      ar: "المسار الذي يحتضن مشروع دروسوس: الطلاقة الرقمية والتفكير التصميمي والاستوديوهات التي تحوّل أفكار اليافعين إلى نماذج ملموسة، إلى جانب نادٍ شتوي سنوي.",
    },
    figures: [
      { value: "1,560", label: { ar: "يافع ويافعة" }, basis: "annual" },
      { value: "180", label: { ar: "يافعًا متكررًا" }, basis: "annual" },
      { value: "30", label: { ar: "يافعًا في النادي الشتوي" }, basis: "annual" },
    ],
    icon: "idea",
    tone: "brand",
  },
  {
    id: "community-support",
    title: { ar: "دعم المجتمع", en: "Community Support" },
    audience: { ar: "الأهالي والأسر" },
    description: {
      ar: "جلسات التربية الوالدية والخدمة المجتمعية الموجّهة للأهالي، ودعم المشاريع الصغيرة وتمويلها لأسر المحافظة.",
    },
    figures: [
      { value: "111", label: { ar: "جلسة تربية وخدمة مجتمعية" }, basis: "cumulative" },
      { value: "1,349", label: { ar: "سيدة مستفيدة" }, basis: "cumulative" },
      { value: "1,902", label: { ar: "مستفيدًا من جلسات الخدمة" }, basis: "cumulative" },
      { value: "33", label: { ar: "مشروعًا صغيرًا مموَّلًا" }, basis: "cumulative" },
    ],
    icon: "handshake",
    tone: "violet",
  },
];

/**
 * Partnerships since founding, 2012–2025.
 *
 * The six rows sum to exactly the 420 the deck states, which is why they are
 * kept as a breakdown rather than a single headline number.
 */
export const partnerships = {
  total: 420,
  period: { ar: "2012 — 2025" },
  breakdown: [
    { label: { ar: "مؤسسات المجتمع الخاصة" }, value: 49 },
    { label: { ar: "مؤسسات حكومية" }, value: 27 },
    { label: { ar: "المدارس" }, value: 97 },
    { label: { ar: "الجامعات" }, value: 7 },
    { label: { ar: "الجمعيات" }, value: 11 },
    { label: { ar: "الأشخاص المصدريّون" }, value: 229 },
  ],
} as const;

/**
 * The governorate the centre works in, as the deck describes it.
 *
 * Included because the unemployment and out-migration figures are the reason
 * the programmes above exist; without them the work reads as general goodwill
 * rather than a response to a specific place.
 */
export const tafilaContext = {
  distanceFromAmmanKm: 180,
  areaKm2: 2009,
  population: { value: "114", unit: { ar: "ألف نسمة" } },
  districts: { ar: "القصبة · بصيرا · الحسا" },
  villages: 20,
  unemploymentRate: "39%",
  outMigrationRate: "2.4%",
  schools: 122,
} as const;
