import type { IconName } from "@/components/ui/Icon";

/**
 * Content for the story page (`/about`).
 *
 * The same handful of cumulative figures — 283 scholarships, 168 initiatives,
 * 420 partners — used to be typed out separately in the hero, the pillars and
 * the impact section, in three different phrasings. Editing one meant hunting
 * for the other two, and they had already drifted. They live here once now,
 * and every section on the page reads them from this file.
 */

export interface AboutFigure {
  /** The numeral itself, kept apart from its unit so it can be set LTR. */
  value: string;
  /** Unit or qualifier that follows the numeral in the Arabic phrase. */
  unit?: string;
  label: string;
}

/** The four numbers the page opens on. Deliberately short — a hero, not a report. */
export const glanceFigures: AboutFigure[] = [
  { value: "2012", label: "سنة انطلاق العمل في الطفيلة" },
  { value: "283", unit: "مستفيداً", label: "من صندوق المنح الجامعية" },
  { value: "168", unit: "مبادرة", label: "أطلقها الشباب في المحافظة" },
  { value: "420", unit: "شريكاً", label: "شبكة الشراكات التراكمية" },
];

export interface AboutPillar {
  title: string;
  description: string;
  icon: IconName;
}

/**
 * The four programme tracks the centre runs.
 *
 * These used to carry a `stat` line each — "283 مستفيداً · 126 خريجاً" and so
 * on. Every one of those figures already appears in the hero, and two of them
 * appeared a third time in the impact section, so a reader met 420 five times
 * before reaching the partner list. Worse, the fourth card printed 420 twice
 * inside itself: once in its own description and once in the stat beneath it.
 *
 * The cards describe what each track does. The numbers live in the hero and
 * in the impact section, each exactly once.
 */
export const pillars: AboutPillar[] = [
  {
    title: "صندوق منح روّاد الشبابية",
    description:
      "منح جامعية لشباب الطفيلة مقترنة بأربع ساعات خدمة مجتمعية أسبوعياً وبرنامج تمكين قيادي يرافق المنحة حتى التخرج.",
    icon: "graduation",
  },
  {
    title: "برنامج تمكين اليافعين (دروسوس)",
    description:
      "بناء قدرات عشرين يافعاً ويافعة سنوياً عبر 55 جلسة في التمكين النفسي والطلاقة الرقمية والتفكير التصميمي واستوديو الطباعة ثلاثية الأبعاد.",
    icon: "idea",
  },
  {
    title: "تنمية الطفل والنوادي الصيفية",
    description:
      "نوادٍ صيفية وأنشطة إبداعية للأطفال في قرى الطفيلة، يديرها ويشرف عليها شباب المنطقة أنفسهم.",
    icon: "sprout",
  },
  {
    title: "الدعم المجتمعي والريادة",
    description:
      "شبكة شراكات تمتدّ إلى المدارس والمؤسسات والجمعيات في المحافظة، ومبادرات شبابية ومشاريع صغيرة مموّلة تخدم المجتمع المحلي مباشرة.",
    icon: "handshake",
  },
];

export interface AboutMetric {
  figure: string;
  label: string;
  description: string;
  icon: IconName;
}

/**
 * The cumulative results.
 *
 * Deliberately none of the four figures the hero opens with. The hero already
 * says 2012, 283, 168 and 420; this section used to repeat three of them
 * verbatim, so a reader who had seen the first screen learned nothing here.
 *
 * These four are the outcomes those first four produce — how many finished,
 * how many people the initiatives reached, what was funded — and every one of
 * them is drawn from copy already in the repository. The section now carries
 * new information rather than an echo.
 */
export const impactMetrics: AboutMetric[] = [
  {
    figure: "126",
    label: "خريجاً وخريجة",
    description:
      "أنهوا دراستهم الجامعية بمرافقة الصندوق حتى التخرّج، بعد سنوات من الخدمة المجتمعية المقترنة بالمنحة.",
    icon: "graduation",
  },
  {
    figure: "10,450",
    label: "وصلت إليهم المبادرات",
    description:
      "من الأطفال واليافعين والأهالي في قرى المحافظة وألويتها، أثّرت فيهم المبادرات التي أطلقها الشباب أنفسهم.",
    icon: "rocket",
  },
  {
    figure: "33",
    label: "مشروعاً صغيراً مُموّلاً",
    description:
      "حصلت على تمويل ومرافقة ضمن مسار الريادة المجتمعية، لتتحوّل الفكرة إلى مصدر دخل في المحافظة.",
    icon: "trophy",
  },
  {
    figure: "1,349",
    label: "سيدة في جلسات التربية",
    description:
      "استفدن من 111 جلسة تربية والدية وخدمة مجتمعية نُفِّذت داخل المركز وفي القرى المحيطة به.",
    icon: "community",
  },
];

export interface PartnerGroup {
  category: string;
  count: string;
  detail: string;
  /** Says what kind of partner this is before the label is read. */
  icon: IconName;
}

/** How the 420 partners break down. Ordered by size, largest first. */
export const partnerBreakdown: PartnerGroup[] = [
  { category: "الأشخاص المصدريون والخبراء", count: "229", detail: "موجهون ومدربون وداعمون مجتمعيون" , icon: "community" },
  { category: "المدارس الحكومية والخاصة", count: "97", detail: "شراكة مباشرة ومستدامة" , icon: "school" },
  { category: "مؤسسات المجتمع الخاصة", count: "49", detail: "شراكات تمويل ودعم وتدريب" , icon: "building" },
  { category: "المؤسسات الحكومية", count: "27", detail: "تعاون مؤسسي وخدمات تنموية" , icon: "institution" },
  { category: "الجمعيات المحلية والخيرية", count: "11", detail: "شراكات تنفيذية تغطي قرى الطفيلة" , icon: "handshake" },
  { category: "الجامعات والكليات", count: "7", detail: "استقطاب الطلاب وتمكين خريجي المنح" , icon: "graduation" },
];

export interface ContextFact {
  figure: string;
  label: string;
  description: string;
  /** What the centre does about it. Never omitted — see the note below. */
  response: string;
}

/**
 * Why the centre works here.
 *
 * This was a list of the governorate's deficits: distance from the capital,
 * the highest unemployment rate in the kingdom, and a rate of people leaving.
 * Three figures, no context, under a heading about "challenges" — which reads
 * as an outsider diagnosing a place rather than an organisation explaining its
 * own work. Tafila is where these programmes come from and where the people
 * running them live; a page on this site should not read like a report about
 * somewhere else.
 *
 * Every entry now carries a `response`, so each figure appears as a reason for
 * a decision rather than a complaint. The figures themselves are unchanged and
 * still the organisation's own — the framing is what was wrong, not the facts.
 *
 * One phrase was dropped rather than reframed: the rate of "طرد سكاني". It
 * adds nothing the unemployment figure does not already explain, and naming a
 * community by the people leaving it is the least useful thing this section
 * could say about them.
 */
export const governorateContext: ContextFact[] = [
  {
    figure: "114 ألف",
    label: "نسمة، أغلبهم شباب",
    description:
      "موزّعون على ثلاثة ألوية وعشرين قرية تمتدّ على 2,009 كم²، وتبعد 180 كم جنوب عمّان.",
    response:
      "لذلك لا تنتظر البرامج من يصل إلى المركز: النوادي الصيفية وأنشطة اليافعين تُنفَّذ في القرى نفسها.",
  },
  {
    figure: "122",
    label: "مدرسة في المحافظة",
    description:
      "شبكة تعليمية واسعة نسبة إلى عدد السكان، وهي أقرب طريق إلى اليافعين في أعمار البرنامج.",
    response:
      "وصل روّاد إلى 97 منها بشراكة مباشرة ومستدامة، لتنفيذ البرامج داخل الصفوف لا خارجها.",
  },
  {
    figure: "39%",
    label: "بطالة بين الشباب",
    description:
      "أعلى نسبة في المملكة، والسبب المباشر في أن الشهادة الجامعية وحدها لم تعد كافية هنا.",
    response:
      "لذلك تقترن المنحة ببرنامج تمكين قيادي وخدمة مجتمعية، ويحصل من يبدأ مشروعه الخاص على تمويل ومرافقة.",
  },
];

/** In-page navigation targets. The id is both the anchor and the nav key. */
export const aboutSections = [
  { id: "story", label: "البداية" },
  { id: "context", label: "لماذا الطفيلة" },
  { id: "timeline", label: "المحطات" },
  { id: "archive", label: "الأرشيف" },
  { id: "pillars", label: "محاور العمل" },
  { id: "impact", label: "الأثر" },
] as const;
