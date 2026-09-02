import type { DrososContent } from "@/types";

/**
 * Drosos content tree.
 *
 * The three stage titles below are the approved Arabic names. Everything else
 * — descriptions, imagery, studios, projects, gallery — is awaiting official
 * material and is left empty rather than invented. English titles are omitted
 * until approved translations are supplied.
 */
export const drososContent: DrososContent = {
  title: { ar: "مشروع دروسوس", en: "Drosos Project" },
  tagline: {
    ar: "تمكين اليافعين في الطفيلة من خلال الطلاقة الرقمية والتفكير التصميمي والابتكار البيئي والمجتمعي.",
    en: "Empowering Tafila youth through digital fluency, design thinking, and eco-community innovation.",
  },
  intro: {
    ar: [
      "شراكة استراتيجية تُوفر لليافعين مسارًا تعليميًا متكاملاً يدمج بين التمكين النفسي والاجتماعي، المهارات الرقمية المتقدمة، والتفكير التصميمي للوصول إلى حلول مبتكرة قابلة للتطبيق.",
    ],
    en: [
      "A strategic partnership delivering a comprehensive learning path integrating psychosocial empowerment, digital fluency, and design thinking.",
    ],
  },
  stages: [
    {
      id: "stage-1",
      order: 1,
      title: { ar: "تواصل مع قوتك", en: "Connect with Your Strength" },
      summary: {
        ar: "مرحلة التمكين النفسي والاجتماعي وبناء الذات، التركيز على الاستماع المتعاطف، الثقة بالنفس، عقلية النمو، وإدارة المشاعر.",
        en: "Psychosocial empowerment focusing on empathetic listening, self-confidence, growth mindset, and emotional awareness.",
      },
    },
    {
      id: "stage-2",
      order: 2,
      title: { ar: "أساسيات الحاسوب والطلاقة الديجيتالية", en: "Computer Basics & Digital Fluency" },
      summary: {
        ar: "إتقان استخدام الحاسوب والإنترنت، تطبيقات Google Workspace، الطباعة السريعة، الأمن الرقمي، الذكاء الاصطناعي، وإنشاء المواقع الإلكترونية.",
        en: "Mastering computer operations, internet tools, Google Workspace, fast typing, cyber safety, AI tools, and website creation.",
      },
    },
    {
      id: "stage-3",
      order: 3,
      title: { ar: "التفكير التصميمي والابتكار", en: "Design Thinking & Studio Innovation" },
      summary: {
        ar: "تطبيق خطوات التفكير التصميمي (التعاطف، تحديد المشكلة، توليد الأفكار، النمذجة، والاختبار) لإنتاج حلول تكنولوجية وبيئية مبتكرة.",
        en: "Applying design thinking steps (Empathize, Define, Ideate, Prototype, Test) to create innovative technological & environmental solutions.",
      },
    },
  ],
  studios: [
    {
      id: "green-circuit",
      slug: "green-circuit-studio",
      title: { ar: "الاستوديو الأول — Green Circuit Studio", en: "Studio 1 — Green Circuit Studio" },
      summary: {
        ar: "دمج البرمجة والمتحكمات الدقيقة (Arduino) والحساسات مع التفكير التصميمي لبناء أنظمة تفاعلية تُعالج المشاكلات البيئية وتُراقب استهلاك الموارد.",
        en: "Integrating Arduino microcontrollers, sensors, and programming with design thinking to build interactive eco-monitoring systems.",
      },
      stageId: "stage-3",
    },
    {
      id: "innovate-for-earth",
      slug: "innovate-for-earth-studio",
      title: { ar: "الاستوديو الثاني — Innovate for Earth", en: "Studio 2 — Innovate for Earth" },
      summary: {
        ar: "التصميم والنمذجة ثلاثية الأبعاد باستخدام Tinkercad وتصنيع النماذج الفيزيائية بواسطة الطباعة ثلاثية الأبعاد (3D Printing) لتحويل الأفكار إلى منتجات حقيقية.",
        en: "3D modeling with Tinkercad and physical manufacturing via 3D Printing to turn concepts into practical community products.",
      },
      stageId: "stage-3",
    },
  ],
  projects: [
    {
      id: "arduino-eco-systems",
      slug: "arduino-eco-systems",
      title: { ar: "أنظمة الاستشعار والمراقبة البيئية (Arduino)", en: "Arduino Eco-Monitoring Systems" },
      summary: {
        ar: "مشاريع تفاعلية تعتمد على أنظمة الأردوينو والحساسات لقياس جودة الهواء، رصد التلوث، وترشيد استهلاك المياه والموارد.",
        en: "Interactive projects using Arduino and sensors to monitor air quality, measure pollution, and conserve water.",
      },
      stageId: "stage-3",
      studioId: "green-circuit",
    },
    {
      id: "3d-printed-prototypes",
      slug: "3d-printed-prototypes",
      title: { ar: "نماذج الحلول ثلاثية الأبعاد (3D Printing)", en: "3D Printed Environmental Prototypes" },
      summary: {
        ar: "تصميم مجسمات ثلاثية الأبعاد عبر Tinkercad وطباعتها بتقنية الطباعة ثلاثية الأبعاد لتقديم حلول بيئية وخدمية قابلة للاختبار.",
        en: "3D printed physical prototypes designed on Tinkercad providing practical solutions tested in local environments.",
      },
      stageId: "stage-3",
      studioId: "innovate-for-earth",
    },
  ],
  gallery: [
    {
      src: "/assets/drosos/gallery/drosos-tinkercad-3d.jpg",
      alt: { ar: "تدريبات النمذجة ثلاثية الأبعاد Tinkercad في استوديو دروسوس", en: "Tinkercad 3D modeling training session in Drosos studio" },
      width: 1200,
      height: 800,
      caption: { ar: "جانب من تطبيق اليافعين للنمذجة والتصميم ثلاثي الأبعاد على برنامج Tinkercad", en: "Youth applying 3D modeling and design on Tinkercad software" },
    },
    {
      src: "/assets/drosos/gallery/drosos-green-circuit.png",
      alt: { ar: "مختبر البرمجة والأردوينو في استوديو Green Circuit", en: "Programming & Arduino lab in Green Circuit Studio" },
      width: 1200,
      height: 800,
      caption: { ar: "تطبيق التفكير التصميمي وبناء المتحكمات الدقيقة للحساسات البيئية", en: "Applying design thinking and building microcontrollers for eco-sensors" },
    },
    {
      src: "/assets/drosos/gallery/drosos-youth-workshop.png",
      alt: { ar: "ورشة عمل تفاعلية لليافعين واليافعات في مركز رواد الطفيلة", en: "Interactive youth workshop at Ruwwad Tafila center" },
      width: 1200,
      height: 800,
      caption: { ar: "مشاركة اليافعين واليافعات في العصف الذهني وعرض الأفكار الريادية", en: "Youth participating in brainstorming and presenting community ideas" },
    },
    {
      src: "/assets/drosos/gallery/drosos-3d-printing.png",
      alt: { ar: "إنتاج النماذج الفيزيائية عبر الطباعة ثلاثية الأبعاد 3D Printing", en: "Physical prototype production via 3D Printing" },
      width: 1200,
      height: 800,
      caption: { ar: "تحويل المخططات الرقمية إلى مجسمات فيزيائية ملموسة باستخدام الطباعة ثلاثية الأبعاد", en: "Transforming digital designs into physical prototypes using 3D printing" },
    },
  ],
};

export const drososStages = drososContent.stages;
