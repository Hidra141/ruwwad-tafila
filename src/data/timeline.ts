import type { ImageAsset, LocalizedText } from "@/types";

export interface TimelineMilestone {
  year: string;
  title: LocalizedText;
  description?: LocalizedText;
  highlights?: LocalizedText[];
  image: ImageAsset;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2012",
    title: { ar: "تأسيس صندوق منح روّاد الطفيلة", en: "Founding of Ruwwad Tafila Youth Empowerment Fund" },
    description: {
      ar: "تأسيس صندوق منح روّاد الطفيلة صيف عام 2012 بمبادرة من ريادي الأعمال فادي غندور ومجموعة من رجال الأعمال (منهم خالد المصري) وبدعم من بنك القاهرة عمان وأرامكس وبالشراكة مع جمعية رؤيانا الخيرية بالطفيلة، والبداية بتقديم المنح التعليمية المقترنة بساعات الخدمة المجتمعية.",
      en: "Established in summer 2012 by entrepreneur Fadi Ghandour and businessmen group with support from Cairo Amman Bank and Aramex in partnership with Ro'yana Charity Association.",
    },
    image: {
      src: "/assets/youth/youth-beneficiaries.webp",
      alt: { ar: "انطلاقة صندوق منح روّاد التنمية في الطفيلة عام 2012" },
      width: 1280,
      height: 960,
    },
  },
  {
    year: "2013",
    title: { ar: "نمو البرامج والأنشطة المجتمعية", en: "Expansion of Programs & Community Activities" },
    /*
      The description used to list the same three achievements the
      `highlights` below repeat, so the panel said everything twice in a row.
      It now says what the year meant; the highlights carry the figures.
    */
    description: {
      ar: "العام الذي تحوّلت فيه المبادرة من صندوق منح إلى برنامج: أُضيفت مكوّنات إثرائية إلى جانب المنحة، وخرج العمل من المركز إلى القرى لأول مرة.",
      en: "The year the initiative grew from a grants fund into a programme: enrichment components joined the scholarship, and the work reached the villages for the first time.",
    },
    highlights: [
      { ar: "استهداف 50 شاب وشابة سنوياً بالمنح الأكاديمية", en: "50 annual scholarship recipients" },
      { ar: "إطلاق المكون الإثرائي 'دردشات' (47 جلسة سنوياً)", en: "Launching 'Dardashat' dialogue sessions" },
      { ar: "تنفيذ أول نادٍ صيفي للأطفال في قرية عيمة", en: "First summer club for children in 'Aima village" },
    ],
    image: {
      src: "/assets/youth/youth-2019-1.webp",
      alt: { ar: "أنشطة دردشات والنوادي الصيفية عام 2013" },
      width: 1280,
      height: 960,
    },
  },
  {
    year: "2014",
    title: { ar: "انطلاق مركز روّاد التنمية الطفيلة", en: "Launch of Ruwwad Tafila Community Center" },
    description: {
      ar: "الافتتاح الرسمي لمركز روّاد التنمية الطفيلة ليكون حاضنة مجتمعية ودائمة للبرامج الشبابية والطفولة واليافعين والمبادرات التنموية.",
      en: "Official launch of Ruwwad Al-Tanmeya Community Center in Tafila as a hub for youth development and community engagement.",
    },
    image: {
      src: "/assets/youth/youth-2018-3.webp",
      alt: { ar: "افتتاح مركز روّاد التنمية بالطفيلة عام 2014" },
      width: 1258,
      height: 785,
    },
  },
  {
    year: "2018",
    title: { ar: "التوسع في المكونات البرامجية المتكاملة", en: "Expansion into Integrated Program Components" },
    description: {
      ar: "توسيع نطاق البرامج لتشمل مهارات اليافعين (1,560 يافع سنوياً) وتنمية الطفل (4,050 طفل سنوياً)، وإضافة مسار الريادة ودعم المشاريع الصغيرة.",
      en: "Broadening program scope to cover youth skills, child development, and small business support.",
    },
    image: {
      src: "/assets/youth/youth-2018-1.webp",
      alt: { ar: "يافعون خلال نشاط من أنشطة برنامج اليافعين عام 2018" },
      width: 1027,
      height: 760,
    },
  },
  {
    year: "2020",
    title: { ar: "مساحة آمنة ومتكاملة وتوسعة المركز", en: "Safe & Inclusive Community Space" },
    description: {
      ar: "توسعة مساحة المركز لتصبح مساحة آمنة وشاملة للتعبير والتعلم والابتكار الرقمي والتفاعل مع كافة شرائح المجتمع بالطفيلة.",
      en: "Expanding center facilities into a safe, inclusive space for learning, creation, and intergenerational engagement.",
    },
    image: {
      src: "/assets/youth/youth-2020-2.webp",
      alt: { ar: "نشاط داخل مركز روّاد الطفيلة عام 2020" },
      width: 960,
      height: 720,
    },
  },
  {
    year: "اليوم",
    title: { ar: "الوصول التراكمي والتأثير الشامل", en: "Widespread Cumulative Reach Across Tafila" },
    /*
      No `highlights` on this milestone, and the description no longer carries
      figures.

      It used to list 420 partners, 283 recipients, 126 graduates, 168
      initiatives and 10,450 beneficiaries in its description, then restate
      every one of them in the highlights directly beneath — five numbers,
      twice each, inside one card. And all five appear elsewhere on the same
      page with more context: four in the hero, and the partner composition
      broken down group by group in the impact section. Nothing is lost by
      removing them here; the reader stops meeting them a third time.
    */
    description: {
      ar: "يعمل المركز اليوم في ألوية المحافظة الثلاثة وقراها، بشبكة شراكات تغطي المدارس والمؤسسات الحكومية والخاصة والجمعيات المحلية.",
      en: "The centre now works across the governorate's three districts and its villages, through partnerships spanning schools, public and private institutions, and local associations.",
    },
    image: {
      src: "/assets/youth/youth-2025-1.webp",
      alt: { ar: "المسار الحكائي والوصول الشامل لروّاد التنمية اليوم" },
      width: 1280,
      height: 960,
    },
  },
];
