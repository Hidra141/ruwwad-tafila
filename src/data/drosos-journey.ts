import type { ImageAsset, LocalizedText } from "@/types";

/**
 * The measured facts of the Drosos run, from
 * `reference/source/Copy of عرض تقديمي لرحلة اليافعين نهائي.pptx`.
 *
 * Kept separate from `drosos.ts`, which describes what each phase *is*; this
 * records what actually happened — how many sessions, over which dates.
 *
 * A note on the dates: the deck prints several ranges end-first
 * ("14/3/2026-31/1/2026"). They are stored here in chronological order, which
 * is a reordering of the two numbers and nothing more — no date is changed.
 */

export interface DrososYouthQuote {
  id: string;
  name: string;
  role?: string;
  phaseId?: string;
  quote: string;
}

export const drososYouthQuotes: DrososYouthQuote[] = [
  {
    id: "omar",
    name: "عمر الفراهيد",
    role: "يافع مشارك — الطفيلة",
    quote:
      "قبل سنة كنت شخص مختلف... دخلت برحلة مليانة تعلم وتحدي ونمو. بدينا رحلتنا من بين 20 يافع ويافعة بـ 3 مراحل، وكل مرحلة غيّرت فينا إشي. اكتشفنا قوتنا الحقيقية، صرت أصدق إن صوتي وفكرتي ومشروعي إله تأثير... ما كنا بس نتعلم، كنا نصنع فرق ونؤثر على مجتمعنا.",
  },
  {
    id: "rajaa",
    name: "رجاء القيسي",
    role: "مرحلة تواصل مع قوتك",
    phaseId: "fellowship",
    quote:
      "هون بلشنا نسمع لبعض بعيون مفتوحة وبقلب ومشاعر حاضرة. بمرحلة زمالة 'تواصل مع قوتك' تعلمت أسمع، أتعاطف، وأعرف مين أنا فعلاً... وفهمت إن كل واحد فينا عنده قصة وظروف مختلفة، وكيف أثق بنفسي وأكون شخص بتعامل بتعاطف واحترام مش بحكم أو مقارنة.",
  },
  {
    id: "ahmed",
    name: "أحمد المرافي",
    role: "مرحلة الطلاقة الديجيتالية",
    phaseId: "digital-fluency",
    quote:
      "قبل ما أتعلم الطلاقة الرقمية، كنت أحس إني مجرد جزء صغير في عالم كبير مليان شاشات. بس لما بلشت أتعلم كيف أستخدم الكمبيوتر وأتقن مهارات الإنترنت وأدوات جوجل، صار عندي أداة حقيقية بتخليني أعبّر وأصنع وأحقق أحلامي. الطلاقة الرقمية هي ثقة بالنفس ومفتاح للنجاح.",
  },
  {
    id: "karam",
    name: "كرم الهدار",
    role: "المرحلة التأسيسية للتفكير التصميمي",
    phaseId: "design-foundation",
    quote:
      "بالمرحلة التأسيسية بلّشت أكتشف جزء جديد مني ما كنت شايفه قبل. فهمت إن التصميم هو إنك تشوف الناس، تسمعهم، وتحاول تحل مشاكلهم وتخلي حياتهم أسهل. تعلمت أرسم أفكاري، أنمذجها بالكرتون، أجرب، أغلط، وأعيد من جديد... التصنيع الرقمي والرسم كانت أدوات، بس اللي اتغير فعلاً هو طريقتي بالتفكير.",
  },
  {
    id: "joud",
    name: "جود الهدار",
    role: "الاستوديو الأول — Green Circuit",
    phaseId: "studio-one",
    quote:
      "الاستوديو الأول كان نقطة تحول بالنسبة إلي... كل شي تعلمناه بالمرحلة التأسيسية صار حقيقي. الفكرة اللي برأسي صارت موجودة قدامي: أرسمها، أختبرها، وأشوفها تكبر. خصوصاً لما اشتغلنا بالأردوينو والحساسات على أفكار بتخدم البيئة والأرض... حسّيت إني مش بس بتعلّم، أنا بصمّم شي بيساعد غيري.",
  },
  {
    id: "abdullah",
    name: "عبدالله السكور",
    role: "الاستوديو الثاني — Innovate for Earth",
    phaseId: "studio-two",
    quote:
      "بالاستوديو الثاني حسّيت إني صرت أفكر بطريقة مختلفة... لما شفت مشروعي ينطبع بالطابعة ثلاثية الأبعاد 3D Printing، حسيت كأن حلمي بيكبر قدامي طبقة طبقة. الاستوديو الثاني ما كان تطبيق نظري بس، كان رسالة إنه إحنا كيافعين بنقدر نكون جزء من الحل ولو بفكرة صغيرة.",
  },
  {
    id: "qatr",
    name: "قطر الندى القيسي",
    role: "يافعة مشاركة",
    quote: "إحنا اليوم مش بس يافعين بنتعلم مهارات، إحنا شباب وصبايا قادرين نتغير ونغير بواقعنا.",
  },
  {
    id: "rawaa",
    name: "روعة الحوامدة",
    role: "يافعة مشاركة",
    quote: "إحنا مش بس بنتعلّم، إحنا بنصنع الفرق بحياتنا وبمجتمعنا.",
  },
  {
    id: "ghana",
    name: "غنى الشماسات",
    role: "يافعة مشاركة",
    quote: "الصعوبات ما بتوقفنا، بالعكس بتخلينا أكثر إصرار وتعلّم.",
  },
  {
    id: "mawada",
    name: "مودة القيسي",
    role: "يافعة مشاركة",
    quote: "مع بعض، رح نقدر نبني مستقبل أحلى ونحقق كل طموحاتنا.",
  },
  {
    id: "lojain",
    name: "لجين البدور",
    role: "يافعة مشاركة",
    quote: "واليوم، كل واحد فينا صار عنده قدرة يغير حياته وحياة غيره... والرحلة مستمرة!",
  },
];

export interface DrososPhaseRun {
  id: string;
  stationIndex: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  sessions: number;
  start: string;
  end: string;
  description: LocalizedText;
  skills: string[];
  quote?: DrososYouthQuote;
  studioId?: string;
  projectId?: string;
}

/** Headline figures for the whole run. */
export const drososRun = {
  participants: 20,
  sessions: 55,
  start: "2025-09-13",
  end: "2026-08-03",
  displayPeriod: "13/9/2025 — 3/8/2026",
} as const;

/** The tracks that make up the digital-fluency stage, as the deck numbers them. */
export const digitalFluencyTracks: { id: string; ar: string; en: string }[] = [
  { id: "computer-basics", ar: "أساسيات الحاسوب وأنظمة التشغيل", en: "Computer Basics & OS" },
  { id: "google-workspace", ar: "أدوات عمل جوجل (Docs, Sheets, Slides, Sites)", en: "Google Workspace & Sites" },
  { id: "network-security", ar: "الشبكات والأمن السيبراني وقانون الجرائم", en: "Network & Cyber Security" },
  { id: "digital-concepts", ar: "الذكاء الاصطناعي والطباعة السريعة ومحركات البحث", en: "AI, Fast Typing & Search" },
];

export const drososPhaseRuns: DrososPhaseRun[] = [
  {
    id: "fellowship",
    stationIndex: 1,
    title: { ar: 'زمالة "تواصل مع قوتك"', en: '"Connect with Your Strength" Fellowship' },
    subtitle: { ar: "المرحلة الأولى — التمكين النفسي والاجتماعي وبناء الذات", en: "Stage 1 — Psychosocial Empowerment" },
    sessions: 7,
    start: "13/9/2025",
    end: "1/10/2025",
    description: {
      ar: "مرحلة التمكين النفسي والاجتماعي واكتشاف الذات. ركّزت الجلسات السبع على الاستماع المتعاطف بدون أحكام، بناء الثقة بالنفس، تعزيز عقلية النمو، وإدارة المشاعر وفهم تنوع تجارب الآخرين.",
      en: "Psychosocial empowerment focusing on empathetic listening, self-confidence, growth mindset, and emotional awareness.",
    },
    skills: ["الاستماع المتعاطف", "الثقة بالنفس والقيادة الذاتية", "إدارة المشاعر وعقلية النمو", "التواصل الإيجابي والتعبير عن الذات"],
    quote: drososYouthQuotes.find((q) => q.id === "rajaa"),
  },
  {
    id: "digital-fluency",
    stationIndex: 2,
    title: { ar: "أساسيات الحاسوب والطلاقة الديجيتالية", en: "Computer Basics & Digital Fluency" },
    subtitle: { ar: "المرحلة الثانية — امتلاك المهارات الرقمية المتقدمة", en: "Stage 2 — Advanced Digital Skills" },
    sessions: 13,
    start: "31/1/2026",
    end: "14/3/2026",
    description: {
      ar: "تمكين اليافعين من إتقان تشغيل الحاسوب، أدوات Google Workspace (Docs, Sheets, Slides, Drive)، إنشاء المواقع على Google Sites، التوعية بالأمن السيبراني والبريد الإلكتروني، الطباعة السريعة، وأدوات الذكاء الاصطناعي.",
      en: "Mastering computer operations, internet tools, Google Workspace, cyber safety, AI tools, and site building.",
    },
    skills: ["أدوات Google Workspace", "إنشاء المواقع على Google Sites", "الأمن السيبراني والسلامة الرقمية", "الذكاء الاصطناعي والطباعة السريعة"],
    quote: drososYouthQuotes.find((q) => q.id === "ahmed"),
  },
  {
    id: "design-foundation",
    stationIndex: 3,
    title: { ar: "المرحلة التأسيسية للتفكير التصميمي", en: "Design Thinking Foundation" },
    subtitle: { ar: "المرحلة الثالثة (أ) — التعاطف والتحليل والنمذجة الأولية", en: "Stage 3A — Empathy & Paper Prototyping" },
    sessions: 16,
    start: "28/3/2026",
    end: "4/5/2026",
    description: {
      ar: "الانطلاق في منهجية التفكير التصميمي الخماسية (التعاطف، تحديد المشكلة، توليد الأفكار، النمذجة بالكرتون والورق، والتجريب). تعلم اليافعون رسم المخططات وفهم احتياجات المجتمع بالطفيلة وترجمتها إلى نماذج أولية.",
      en: "Applying design thinking steps to define problems, brainstorm solutions, and create paper & cardboard physical prototypes.",
    },
    skills: ["التعاطف وتحديد المشكلات", "رسم المخططات وتوليد الأفكار", "النمذجة الأولية بالكرتون والورق", "التجريب والتغذية الراجعة"],
    quote: drososYouthQuotes.find((q) => q.id === "karam"),
  },
  {
    id: "studio-one",
    stationIndex: 4,
    title: { ar: "الاستوديو الأول — Green Circuit Studio", en: "Studio 1 — Green Circuit Studio" },
    subtitle: { ar: "المرحلة الثالثة (ب) — البرمجة ومتحكمات الأردوينو والحساسات البيئية", en: "Stage 3B — Arduino & Microcontrollers" },
    sessions: 9,
    start: "9/5/2026",
    end: "30/6/2026",
    description: {
      ar: "دمج البرمجة والمتحكمات الدقيقة (Arduino) مع التفكير التصميمي لبناء أنظمة تفاعلية تُعالج المشكلات البيئية بالطفيلة، مثل رصد التلوث ورصد جودة الهواء والماء وترشيد استهلاك الطاقة والموارد.",
      en: "Integrating Arduino microcontrollers, sensors, and programming with design thinking to build interactive eco-monitoring systems.",
    },
    skills: ["برمجة متحكمات Arduino", "ربط وتوصيل الدارات والحساسات البيئية", "تحليل التحديات البيئية بالطفيلة", "بناء أنظمة الرصد والاستشعار الذكية"],
    quote: drososYouthQuotes.find((q) => q.id === "joud"),
    studioId: "green-circuit",
    projectId: "arduino-eco-systems",
  },
  {
    id: "studio-two",
    stationIndex: 5,
    title: { ar: "الاستوديو الثاني — Innovate for Earth Studio", en: "Studio 2 — Innovate for Earth Studio" },
    subtitle: { ar: "المرحلة الثالثة (ج) — النمذجة بـ Tinkercad والطباعة ثلاثية الأبعاد", en: "Stage 3C — 3D Modeling & Printing" },
    sessions: 10,
    start: "11/7/2026",
    end: "3/8/2026",
    description: {
      ar: "التصميم والنمذجة ثلاثية الأبعاد باستخدام برنامج Tinkercad وتصنيع النماذج الفيزيائية بواسطة الطابعة ثلاثية الأبعاد (3D Printing) لتحويل الأفكار والحلول البيئية التنموية إلى مجسمات حقيقية ملموسة.",
      en: "3D modeling with Tinkercad and physical manufacturing via 3D Printing to turn concepts into practical community products.",
    },
    skills: ["النمذجة ثلاثية الأبعاد ببرنامج Tinkercad", "تشغيل تقنيات الطباعة ثلاثية الأبعاد 3D Printing", "تحويل المخططات الرقمية لمجسمات فيزيائية", "اختبار النماذج الريادية وتطويرها"],
    quote: drososYouthQuotes.find((q) => q.id === "abdullah"),
    studioId: "innovate-for-earth",
    projectId: "3d-printed-prototypes",
  },
];

/** What the project sets out to strengthen, as listed in the deck. */
export const drososOutcomes: LocalizedText[] = [
  { ar: "التفكير التصميمي الخماسي" },
  { ar: "مهارات التصنيع الرقمي والطباعة 3D" },
  { ar: "برمجة الأردوينو والحساسات البيئية" },
  { ar: "حل المشكلات والابتكار التنموي" },
  { ar: "الطلاقة الرقمية وأدوات جوجل" },
  { ar: "الاستماع المتعاطف والثقة بالنفس" },
];

/**
 * Photographs from each phase, supplied by the centre from its own session
 * archive (about 2,700 frames across the five folders).
 *
 * Curated to eight per phase, each chosen to show what makes that phase
 * distinct — the circles and presentations of the fellowship, the sketching
 * and cardboard models of the foundation, hardware and Workspace in digital
 * fluency, Arduino wiring in the first studio, the printer in the second.
 *
 * Alt text describes the phase, not the individuals: these are group session
 * photographs and naming who appears in them is not something the source
 * records.
 */
export const drososPhasePhotos: Record<string, ImageAsset[]> = {
  "fellowship": [
    {
      src: "/assets/drosos/phases/fellowship-1.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/fellowship-2.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 1280,
      height: 960,
    },
    {
      src: "/assets/drosos/phases/fellowship-3.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/fellowship-4.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 1280,
      height: 960,
    },
    {
      src: "/assets/drosos/phases/fellowship-5.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/fellowship-6.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 900,
      height: 1124,
    },
    {
      src: "/assets/drosos/phases/fellowship-7.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/fellowship-8.webp",
      alt: { ar: "من جلسات مرحلة زمالة «تواصل مع قوتك» في روّاد الطفيلة" },
      width: 1280,
      height: 960,
    },
  ],
  "digital-fluency": [
    {
      src: "/assets/drosos/phases/digital-1.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/digital-2.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/digital-3.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/digital-4.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/digital-5.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/digital-6.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/digital-7.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/digital-8.webp",
      alt: { ar: "من جلسات مرحلة أساسيات الحاسوب والطلاقة الديجيتالية" },
      width: 1050,
      height: 1400,
    },
  ],
  "design-foundation": [
    {
      src: "/assets/drosos/phases/foundation-1.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/foundation-2.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/foundation-3.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/foundation-4.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/foundation-5.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/foundation-6.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/foundation-7.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/foundation-8.webp",
      alt: { ar: "من جلسات المرحلة التأسيسية للتفكير التصميمي" },
      width: 1400,
      height: 1050,
    },
  ],
  "studio-one": [
    {
      src: "/assets/drosos/phases/studio1-1.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/studio1-2.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio1-3.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio1-4.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio1-5.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 1400,
      height: 788,
    },
    {
      src: "/assets/drosos/phases/studio1-6.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio1-7.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio1-8.webp",
      alt: { ar: "من الاستوديو الأول — التصميم والتجريب باستخدام الأردوينو" },
      width: 788,
      height: 1400,
    },
  ],
  "studio-two": [
    {
      src: "/assets/drosos/phases/studio2-1.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio2-2.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio2-3.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/studio2-4.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio2-5.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/studio2-6.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 1400,
      height: 1050,
    },
    {
      src: "/assets/drosos/phases/studio2-7.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 1050,
      height: 1400,
    },
    {
      src: "/assets/drosos/phases/studio2-8.webp",
      alt: { ar: "من الاستوديو الثاني — النمذجة والطباعة ثلاثية الأبعاد" },
      width: 960,
      height: 1280,
    },
  ],
};
