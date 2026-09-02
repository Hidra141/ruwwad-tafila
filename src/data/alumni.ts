import type { Alumni, AlumniCohort } from "@/types";

export const cohorts: Record<string, AlumniCohort> = {
  "cohort-drosos-tafila": {
    id: "cohort-drosos-tafila",
    label: { ar: "خريجو برنامج دروسوس - الطفيلة", en: "Drosos Tafila Graduates" },
    order: 1,
  },
};

export const alumni: Alumni[] = [
  {
    id: "ahmed-nabeel-al-marafi",
    slug: "ahmed-nabeel-al-marafi",
    name: { ar: "أحمد نبيل المرافي", en: "Ahmed Nabeel Al-Marafi" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "الطلاقة الرقمية مش بس مهارة، هي ثقة في النفس، هي حرية، هي مفتاح لباب النجاح اللي أنا مستعد أفتحه بإيدي.",
      en: "Digital fluency is confidence, freedom, and a key to success I am ready to build.",
    },
    portrait: {
      src: "/assets/alumni/ahmed-nabeel-al-marafi/portrait.png",
      alt: { ar: "صورة أحمد نبيل المرافي", en: "Portrait of Ahmed Nabeel Al-Marafi" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "aws-moatasem-al-sahareen",
    slug: "aws-moatasem-al-sahareen",
    name: { ar: "أوس معتصم السهارين", en: "Aws Moatasem Al-Sahareen" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "خريج برنامج دروسوس – الطفيلة، مشارك فعّال في ورشات الطلاقة الرقمية والتفكير التصميمي.",
      en: "Drosos Tafila graduate, active in digital fluency and design thinking workshops.",
    },
    portrait: {
      src: "/assets/alumni/aws-moatasem-al-sahareen/portrait.jpg",
      alt: { ar: "صورة أوس معتصم السهارين", en: "Portrait of Aws Moatasem Al-Sahareen" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "rowa-mohammad-al-hawamdeh",
    slug: "rowa-mohammad-al-hawamdeh",
    name: { ar: "روعة محمد الحوامدة", en: "Rowa Mohammad Al-Hawamdeh" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "إحنا مش بس بنتعلّم، إحنا بنصنع الفرق بحياتنا وبمجتمعنا.",
      en: "We don't just learn; we make a real difference in our lives and community.",
    },
    portrait: {
      src: "/assets/alumni/rowa-mohammad-al-hawamdeh/portrait.jpg",
      alt: { ar: "صورة روعة محمد الحوامدة", en: "Portrait of Rowa Mohammad Al-Hawamdeh" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "abdullah-bakr-al-hajjaj",
    slug: "abdullah-bakr-al-hajjaj",
    name: { ar: "عبدالله بكر الحجاج", en: "Abdullah Bakr Al-Hajjaj" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "خريج برنامج دروسوس – الطفيلة، متميز في تصميم الحلول التفاعلية وتطبيقات البرمجة.",
      en: "Drosos Tafila graduate, specializing in interactive solutions and programming.",
    },
    portrait: {
      src: "/assets/alumni/abdullah-bakr-al-hajjaj/portrait.webp",
      alt: { ar: "صورة عبدالله بكر الحجاج", en: "Portrait of Abdullah Bakr Al-Hajjaj" },
      width: 1086,
      height: 1448,
    },
  },
  {
    id: "lujain-alaa-al-badoor",
    slug: "lujain-alaa-al-badoor",
    name: { ar: "لجين علاء البدور", en: "Lujain Alaa Al-Badoor" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "اليوم، كل واحد فينا صار عنده قدرة يغير حياته وحياة غيره…. والرحلة مستمرة!",
      en: "Today, each one of us has the power to change our lives and others...",
    },
    portrait: {
      src: "/assets/alumni/lujain-alaa-al-badoor/portrait.jpg",
      alt: { ar: "صورة لجين علاء البدور", en: "Portrait of Lujain Alaa Al-Badoor" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "wisam-faisal-al-masri",
    slug: "wisam-faisal-al-masri",
    name: { ar: "وسام فيصل المصري", en: "Wisam Faisal Al-Masri" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "خريج برنامج دروسوس – الطفيلة، مشارك في مبادرات الابتكار المجتمعي والتصنيع الرقمي.",
      en: "Drosos Tafila graduate, active in community innovation and digital prototyping.",
    },
    portrait: {
      src: "/assets/alumni/wisam-faisal-al-masri/portrait.webp",
      alt: { ar: "صورة وسام فيصل المصري", en: "Portrait of Wisam Faisal Al-Masri" },
      width: 774,
      height: 1030,
    },
  },
  {
    id: "abdullah-nimr-al-sokoor",
    slug: "abdullah-nimr-al-sokoor",
    name: { ar: "عبدالله نمر السكور", en: "Abdullah Nimr Al-Sokoor" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "لما شفت مشروعي بنطبع بالطابعة ثلاثية الأبعاد، حسّيت كأن حلمي بيكبر قدامي طبقة طبقة… إحنا كيافعين بنقدر نكون جزء من الحل.",
      en: "Seeing my project 3D printed layer by layer showed me that youth can truly solve real challenges.",
    },
    portrait: {
      src: "/assets/alumni/abdullah-nimr-al-sokoor/portrait.webp",
      alt: { ar: "صورة عبدالله نمر السكور", en: "Portrait of Abdullah Nimr Al-Sokoor" },
      width: 1150,
      height: 1368,
    },
  },
  {
    id: "omran-emad-al-torman",
    slug: "omran-emad-al-torman",
    name: { ar: "عمران عماد الطرمان", en: "Omran Emad Al-Torman" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "خريج برنامج دروسوس – الطفيلة، مشارك في استوديوهات الأردوينو ومراقبة البيئة.",
      en: "Drosos Tafila graduate, skilled in Arduino eco-monitoring projects.",
    },
    portrait: {
      src: "/assets/alumni/omran-emad-al-torman/portrait.webp",
      alt: { ar: "صورة عمران عماد الطرمان", en: "Portrait of Omran Emad Al-Torman" },
      width: 853,
      height: 1844,
    },
  },
  {
    id: "qatr-al-nada-ahmed-al-qaisi",
    slug: "qatr-al-nada-ahmed-al-qaisi",
    name: { ar: "قطر الندى أحمد القيسي", en: "Qatr Al-Nada Ahmed Al-Qaisi" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "إحنا اليوم مش بس يافعين بتعلموا مهارات، إحنا شباب وصبايا قادرين نتغير ونغير بواقعنا.",
      en: "We are empowered youth capable of driving real change in our community.",
    },
    portrait: {
      src: "/assets/alumni/qatr-al-nada-ahmed-al-qaisi/portrait.jpg",
      alt: { ar: "صورة قطر الندى أحمد القيسي", en: "Portrait of Qatr Al-Nada Ahmed Al-Qaisi" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "rajaa-tariq-al-qaisi",
    slug: "rajaa-tariq-al-qaisi",
    name: { ar: "رجاء طارق القيسي", en: "Rajaa Tariq Al-Qaisi" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "بمرحلة زمالة 'تواصل مع قوتك' تعلمت فيها أسمع، أتعاطف، وأعرف مين أنا فعلاً… وكيف أكون قائد بحياتي.",
      en: "In the fellowship phase, I learned empathetic listening, self-confidence, and personal leadership.",
    },
    portrait: {
      src: "/assets/alumni/rajaa-tariq-al-qaisi/portrait.jpg",
      alt: { ar: "صورة رجاء طارق القيسي", en: "Portrait of Rajaa Tariq Al-Qaisi" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "mustafa-khaled-al-odainat",
    slug: "mustafa-khaled-al-odainat",
    name: { ar: "مصطفى خالد العدينات", en: "Mustafa Khaled Al-Odainat" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "خريج برنامج دروسوس – الطفيلة، متخصص في المهارات البرمجية والنمذجة الهندسية.",
      en: "Drosos Tafila graduate, specialized in programming and technical modeling.",
    },
    portrait: {
      src: "/assets/alumni/mustafa-khaled-al-odainat/portrait.webp",
      alt: { ar: "صورة مصطفى خالد العدينات", en: "Portrait of Mustafa Khaled Al-Odainat" },
      width: 1080,
      height: 1424,
    },
  },
  {
    id: "ghana-mohammad-al-shamasat",
    slug: "ghana-mohammad-al-shamasat",
    name: { ar: "غنى محمد الشماسات", en: "Ghana Mohammad Al-Shamasat" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "الصعوبات ما بتوقفنا، بالعكس بتخلينا أكثر إصرار وتعلّم.",
      en: "Challenges don't stop us; they make us more determined and eager to learn.",
    },
    portrait: {
      src: "/assets/alumni/ghana-mohammad-al-shamasat/portrait.jpg",
      alt: { ar: "صورة غنى محمد الشماسات", en: "Portrait of Ghana Mohammad Al-Shamasat" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "joud-omar-al-haddar",
    slug: "joud-omar-al-haddar",
    name: { ar: "جود عمر الهدار", en: "Joud Omar Al-Haddar" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "الاستوديو الأول كان نقطة تحول بالنسبة إلي… لما اشتغلنا على أفكار بتخدم البيئة والأرض، صار للشغل معنى أكبر وفيه إنسانية.",
      en: "Studio 1 was a turning point. Designing eco-friendly solutions gave our work deeper purpose.",
    },
    portrait: {
      src: "/assets/alumni/joud-omar-al-haddar/portrait.jpg",
      alt: { ar: "صورة جود عمر الهدار", en: "Portrait of Joud Omar Al-Haddar" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "karam-omar-al-haddar",
    slug: "karam-omar-al-haddar",
    name: { ar: "كرم عمر الهدار", en: "Karam Omar Al-Haddar" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "التفكير التصميمي خلاني أفهم إن التصميم هو إنك تشوف الناس وتسمعهم وتحاول تحل مشاكلهم وتخلي حياتهم أسهل.",
      en: "Design thinking taught me that design is about empathy, understanding people, and solving real problems.",
    },
    portrait: {
      src: "/assets/alumni/karam-omar-al-haddar/portrait.jpg",
      alt: { ar: "صورة كرم عمر الهدار", en: "Portrait of Karam Omar Al-Haddar" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "omar-alaa-al-farahid",
    slug: "omar-alaa-al-farahid",
    name: { ar: "عمر علاء الفراهيد", en: "Omar Alaa Al-Farahid" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "اكتشفنا قوتنا الحقيقية، كيف نواجه كل إشي صعب حوالينا… ونتعلم مهارات جديدة تفتح لنا أبواب مستقبل أفضل.",
      en: "We discovered our true strength, facing challenges and learning skills for a better future.",
    },
    portrait: {
      src: "/assets/alumni/omar-alaa-al-farahid/portrait.jpg",
      alt: { ar: "صورة عمر علاء الفراهيد", en: "Portrait of Omar Alaa Al-Farahid" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "mawaddah-marwan-al-qaisi",
    slug: "mawaddah-marwan-al-qaisi",
    name: { ar: "مودة مروان القيسي", en: "Mawaddah Marwan Al-Qaisi" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "مع بعض، رح نقدر نبني مستقبل أحلى ونحقق كل طموحاتنا.",
      en: "Together, we can build a brighter future and achieve all our ambitions.",
    },
    portrait: {
      src: "/assets/alumni/mawaddah-marwan-al-qaisi/portrait.jpg",
      alt: { ar: "صورة مودة مروان القيسي", en: "Portrait of Mawaddah Marwan Al-Qaisi" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "mohammad-ali-al-owran",
    slug: "mohammad-ali-al-owran",
    name: { ar: "محمد علي العوران", en: "Mohammad Ali Al-Owran" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "تعلّمت كيف أستثمر أدوات الطلاقة الرقمية والمهارات القيادية للتعبير عن أفكاري وبناء مشاريع واعدة.",
      en: "I learned to leverage digital fluency and leadership skills to express ideas and build promising projects.",
    },
    portrait: {
      src: "/assets/alumni/mohammad-ali-al-owran/portrait.jpg",
      alt: { ar: "صورة محمد علي العوران", en: "Portrait of Mohammad Ali Al-Owran" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "mohammad-nabeel-al-marafi",
    slug: "mohammad-nabeel-al-marafi",
    name: { ar: "محمد نبيل المرافي", en: "Mohammad Nabeel Al-Marafi" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "تعلّمت كيف أتعامل مع الأدوات والتطبيقات الرقمية بثقة، والتصنيع البيئي لبناء أثر مستدام.",
      en: "I learned to use digital tools with confidence and apply eco-friendly prototyping for sustainable impact.",
    },
    portrait: {
      src: "/assets/alumni/mohammad-nabeel-al-marafi/portrait.jpg",
      alt: { ar: "صورة محمد نبيل المرافي", en: "Portrait of Mohammad Nabeel Al-Marafi" },
      width: 800,
      height: 1000,
    },
  },
  {
    id: "sara-omar-al-sawalqah",
    slug: "sara-omar-al-sawalqah",
    name: { ar: "ساره عمر السوالقه", en: "Sara Omar Al-Sawalqah" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "في روّاد تعلّمت كيف أكتشف قوتي الداخلية، وأعبر عن أفكاري بثقة وأكون جزءاً فعالاً في صناعة التغيير.",
      en: "At Ruwwad, I discovered my inner strength, expresses my ideas confidently, and joined the journey of change.",
    },
    portrait: {
      src: "/assets/alumni/sara-omar-al-sawalqah/portrait.webp",
      alt: { ar: "رمز ساره عمر السوالقه", en: "Avatar of Sara Omar Al-Sawalqah" },
      width: 1000,
      height: 1250,
    },
  },
  {
    id: "maryam-abdulkarim-al-furaij",
    slug: "maryam-abdulkarim-al-furaij",
    name: { ar: "مريم عبدالكريم الفريجات", en: "Maryam Abdulkarim Al-Furaijat" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "رحلتي في المرحلة التأسيسية وزمالة تواصل غيّرت نظرتي لنفسي، وعلمتني التعاطف وبناء العلاقات الإيجابية.",
      en: "My journey in the foundation phase and Tawasul fellowship reshaped my self-view and taught me empathy.",
    },
    portrait: {
      src: "/assets/alumni/maryam-abdulkarim-al-furaij/portrait.webp",
      alt: { ar: "رمز مريم عبدالكريم الفريجات", en: "Avatar of Maryam Abdulkarim Al-Furaijat" },
      width: 1000,
      height: 1250,
    },
  },
  {
    id: "abdulrahman-ziad-al-naanaah",
    slug: "abdulrahman-ziad-al-naanaah",
    name: { ar: "عبدالرحمن زياد النعانعة", en: "Abdulrahman Ziad Al-Naanaah" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "اكتسبت مهارات الطلاقة الرقمية واستخدام الحاسوب بتمكن، وصرت أؤمن بقدرتي على تطوير ذاتي ومستقبلي.",
      en: "I mastered digital fluency and computer skills, building strong belief in my power to shape my future.",
    },
    portrait: {
      src: "/assets/alumni/abdulrahman-ziad-al-naanaah/portrait.jpg",
      alt: { ar: "صورة عبدالرحمن زياد النعانعة", en: "Portrait of Abdulrahman Ziad Al-Naanaah" },
      width: 900,
      height: 1600,
    },
  },
  {
    id: "mohammad-al-masri",
    slug: "mohammad-al-masri",
    name: { ar: "محمد المصري", en: "Mohammad Al-Masri" },
    cohort: cohorts["cohort-drosos-tafila"],
    intro: {
      ar: "من خلال ورشات التفكير التصميمي والاستوديوهات الإبداعية، تعلمت تحويل الأفكار البسيطة إلى نماذج عمل حقيقية.",
      en: "Through design thinking and creative studios, I learned to turn simple ideas into working prototypes.",
    },
    portrait: {
      src: "/assets/alumni/mohammad-al-masri/portrait.jpg",
      alt: { ar: "صورة محمد المصري", en: "Portrait of Mohammad Al-Masri" },
      width: 900,
      height: 1600,
    },
  },
];
