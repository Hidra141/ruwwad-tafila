export interface StudioProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  problem: string;
  solution: string;
  techStack: string[];
  impact: string;
  icon: string;
  toolsUsed: string[];
  videoUrl?: string;
  videoPlatform?: "youtube" | "facebook";
  prototypeImage?: string;
}

export interface StudioInfo {
  id: "studio-1" | "studio-2";
  title: string;
  titleEn: string;
  tagline: string;
  description: string;
  themeColor: {
    badge: string;
    border: string;
    bgSoft: string;
    gradient: string;
    activeTab: string;
  };
  focusAreas: string[];
  bannerImage: string;
  projects: StudioProject[];
}

export const studioProjectsData: StudioInfo[] = [
  {
    id: "studio-1",
    title: "الاستوديو الأول — الدارات الخضراء",
    titleEn: "Green Circuit Studio",
    tagline: "عندما تكون التكنولوجيا جزءاً من حل مشاكل البيئة",
    description:
      "مختبر تطبيقي يدمج بين إنترنت الأشياء والبرمجة والمستشعرات البيئية الدقيقة، حيث يتعلم اليافعون تحويل الأفكار إلى دوائر إلكترونية حية وأنظمة أتمتة ذكية باستخدام Arduino ومحاكاة Tinkercad لحماية الموارد الطبيعية في الطفيلة.",
    themeColor: {
      badge: "bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:text-emerald-300",
      border: "border-emerald-500/30",
      bgSoft: "from-emerald-500/5 via-teal-500/5 to-transparent",
      gradient: "from-emerald-600 to-teal-700",
      activeTab: "bg-emerald-600 text-white shadow-emerald-600/20",
    },
    focusAreas: [
      "أنظمة الأردوينو والمستشعرات الذكية (Arduino & Sensors)",
      "المحاكاة الهندسية واختبار الدارات (Tinkercad Circuits)",
      "ترشيد استهلاك المياه والطاقة",
      "أنظمة الرصد والإنذار البيئي المبكر",
    ],
    bannerImage: "/assets/studios/studio-1-banner.jpeg",
    projects: [
      {
        id: "smart-fire-suppression",
        title: "نظام الإطفاء الذكي التلقائي للحرائق",
        subtitle: "الاستجابة الفورية لحرائق الأعشاب والغابات",
        category: "السلامة البيئية والإنذار المبكر",
        icon: "🔥",
        problem:
          "سرعة انتشار حرائق الأعشاب الجافة في المناطق المفتوحة وصعوبة الوصول المبكر إليها مما يؤدي إلى تلف الغطاء النباتي والممتلكات.",
        solution:
          "بناء منظومة استشعار حراري ولهب متصلة بوحدة أردوينو تُطلق مضخات إخماد مائي ذاتي وتصدر إنذاراً فورياً بمجرد رصد بؤرة الحريق.",
        techStack: ["Arduino Uno", "Flame Sensor", "Temperature Sensor", "Relay Module", "Water Pump"],
        toolsUsed: ["حساس اللهب", "مرحل Relay", "مضخة مياه غاطسة", "بيئة Tinkercad"],
        impact: "تقليل زمن الاستجابة لإخماد الحرائق بنسبة 80% في نطاقات الرصد المباشرة وحماية المحيط البيئي.",
        videoUrl: "https://www.facebook.com/share/r/1ESsMbpimX/",
        videoPlatform: "facebook",
      },
      {
        id: "smart-irrigation",
        title: "نظام الري الآلي وسقاية النباتات الذكي",
        subtitle: "إدارة رشيدة ومستدامة لمياه الزراعة",
        category: "ترشيد الموارد المائية",
        icon: "🌱",
        problem:
          "هدر كميات كبيرة من المياه الصالحة للشرب في الري اليدوي غير المنتظم، أو تعرض المزروعات للجفاف بسبب نسيان السقاية في أوقات الجفاف.",
        solution:
          "شبكة ري ذكية تعتمد على حساس رطوبة التربة (Soil Moisture Sensor) لقياس جفاف الجذور وتفعيل صمام السقاية تلقائياً حتى استعادة الرطوبة المثلى ثم الإغلاق الذاتي.",
        techStack: ["Arduino Uno", "Soil Moisture Sensor", "Solenoid Valve", "LCD Display"],
        toolsUsed: ["مستشعر رطوبة التربة", "صمام كهرومغناطيسي", "شاشة LCD", "لوحة تجارب"],
        impact: "توفير أكثر من 45% من استهلاك مياه الري والحفاظ على نمو صحي متوازن للنباتات المنزلية والمدرسية.",
        videoUrl: "https://www.facebook.com/share/r/1Dp9JXuW6b/",
        videoPlatform: "facebook",
      },
      {
        id: "water-pollution-monitor",
        title: "راصد نقاء وعكارة المياه التفاعلي",
        subtitle: "الكشف اللحظي عن جودة وسلامة مصادر المياه",
        category: "جودة البيئة والمياه",
        icon: "💧",
        problem:
          "صعوبة الكشف المبكر عن تلوث خزانات ومصادر تجميع مياه الأمطار أو تغير نسب الشوائب فيها بالعين المجردة.",
        solution:
          "جهاز رصد بصري يقيس مستويات عكارة المياه (Turbidity) ونقاء السوائل ويحللها رقمياً عبر الأردوينو مع إضاءة مؤشرات ضوئية ورقمية تحذر من عدم صلاحية المياه للاستخدام.",
        techStack: ["Turbidity Sensor", "Arduino Nano", "RGB Alert LEDs", "OLED Screen"],
        toolsUsed: ["مستشعر العكارة الضوئي", "شاشة OLED", "مؤشرات LED ملونة", "حاوية اختبار معزولة"],
        impact: "منح المجتمع المحلي وسيلة فورية وميسرة للتحقق من سلامة مياه الشرب والتجميع المنزلي.",
        videoUrl: "https://www.youtube.com/shorts/K1WocU1iC6o",
        videoPlatform: "youtube",
      },
      {
        id: "gas-leak-detector",
        title: "نظام كشف وإنذار تسرب الغازات السامة",
        subtitle: "حماية البيئات المغلقة من التلوث والاختناق",
        category: "السلامة المجتمعية والبيئية",
        icon: "⚠️",
        problem:
          "مخاطر تسرب الغازات في المختبرات والمطابخ والمساحات المغلقة دون انتباه مما يهدد السلامة العامة ويسبب تلوث الهواء الداخلي.",
        solution:
          "نظام استشعار كيميائي متطور (MQ-2 / MQ-4) يلتقط جزيئات الغاز المتسربة في أجزاء من المليون، ويُطلق صافرة إنذار عالية مع تشغيل تلقائي لمروحة سحب وتفريغ الهواء.",
        techStack: ["MQ Gas Sensor", "Buzzer Alarm", "Exhaust Fan Controller", "Arduino Uno"],
        toolsUsed: ["حساس الغاز MQ", "جرس إنذار كهرومغناطيسي", "مروحة تفريغ", "دارات حماية"],
        impact: "تأمين بيئة تعليمية ومجتمعية خالية من مخاطر الاختناق والانفجار بحماية أوتوماتيكية متكاملة.",
        videoUrl: "https://youtu.be/OpADNU0gv24",
        videoPlatform: "youtube",
      },
      {
        id: "air-purifier-station",
        title: "محطة تنقية ورصد جودة الهواء بالتحكم الذكي",
        subtitle: "فلترة متقدمة للغبار والجسيمات العالقة",
        category: "جودة الهواء والبيئة",
        icon: "💨",
        problem:
          "ارتفاع معدلات الغبار والجسيمات الدقيقة في مواسم الجفاف بالمحافظة مما يؤثر سلباً على صحة الأطفال واليافعين في الغرف الصفية.",
        solution:
          "محطة تنقية ذكية متصلة بحساس جودة الهواء تقوم بتشغيل مرشحات الكربون المنشط وفلاتر HEPA تلقائياً عند ارتفاع مؤشر التلوث لتنقية الهواء وإعادة تدويره.",
        techStack: ["Air Quality Sensor", "HEPA Filtration System", "PWM Speed Control", "Arduino Uno"],
        toolsUsed: ["حساس جودة الهواء MQ-135", "فلتر كربوني", "محرك مروحة تيار مستمر", "متحكم سرعة"],
        impact: "تحسين نقاء الهواء الداخلي بنسبة 70% وتوفير بيئة تدريبية صحية وآمنة داخل مركز اليافعين.",
        videoUrl: "https://web.facebook.com/reel/1442920837332271",
        videoPlatform: "facebook",
      },
      {
        id: "smart-waste-collector",
        title: "المركبة الذكية لجمع وفرز النفايات",
        subtitle: "أتمتة النظافة في المسارات المفتوحة والحدائق",
        category: "إدارة النفايات والأتمتة",
        icon: "🚜",
        problem:
          "صعوبة جمع النفايات في المساحات الوعرة أو الحدائق العامة في أوقات الذروة والمناسبات البيئية.",
        solution:
          "تصميم مركبة روبوتية رباعية الدفع مزودة بماسحات موجات فوق صوتية لتجنب العوائق وذراع جمع وتوجيه للنفايات الصلبة نحو حاوية مدمجة مخصصة.",
        techStack: ["Ultrasonic Sensor (HC-SR04)", "L298N Motor Driver", "Chassis 4WD", "Arduino Mega"],
        toolsUsed: ["شاسيه دفع رباعي", "محركات سيرفو", "درايفر المحركات L298N", "حساسات المسافة"],
        impact: "تطبيق عملي لمفاهيم الروبوتات الخدمية في دعم جهود النظافة المجتمعية بالطفيلة.",
        videoUrl: "https://youtu.be/hHIIWpZcYNs",
        videoPlatform: "youtube",
      },
    ],
  },
  {
    id: "studio-2",
    title: "الاستوديو الثاني — ابتكر للأرض",
    titleEn: "Innovate for Earth Studio",
    tagline: "تصميم لطباعة مستقبل أخضر — حلول بيئية بالطباعة ثلاثية الأبعاد",
    description:
      "حاضنة هندسية ريادية تُوظف منهجية التفكير التصميمي (Design Thinking) وبرامج النمذجة ثلاثية الأبعاد (3D CAD) لإنتاج حلول فيزيائية ومجسمات ملموسة باستخدام خيوط الطباعة الصديقة للبيئة (PLA) لمعالجة التحديات البيئية والزراعية بالطفيلة.",
    themeColor: {
      badge: "bg-teal-500/10 text-teal-700 border-teal-300 dark:text-teal-300",
      border: "border-teal-500/30",
      bgSoft: "from-teal-500/5 via-sky-500/5 to-transparent",
      gradient: "from-teal-600 to-sky-700",
      activeTab: "bg-teal-600 text-white shadow-teal-600/20",
    },
    focusAreas: [
      "التفكير التصميمي وتحديد الاحتياج (Design Thinking)",
      "النمذجة الرقمية ثلاثية الأبعاد (3D CAD Modeling)",
      "الطباعة ثلاثية الأبعاد بالمواد الحيوية (Eco 3D Printing - PLA)",
      "الحلول الزراعية وتوثيق التضاريس الجغرافية",
    ],
    bannerImage: "/assets/studios/studio-2-banner.png",
    projects: [
      {
        id: "tree-qr-tags",
        title: "بطاقات تعريفية بالأشجار",
        subtitle: "توثيق هوية الغطاء النباتي ومعلومات الرعاية",
        category: "التوعية البيئية وتوثيق النباتات",
        icon: "🏷️",
        problem:
          "ضعف الوعي بأساليب التعامل مع النباتات وأهميتها وكيفية التعامل معها عند تلفها.",
        solution:
          "بطاقات تحمل اسم الشجرة والمعلومات الكاملة عنها وكيفية التعامل معها عند تلفها بتقنية رمز الاستجابة السريعة.",
        techStack: ["3D Printing", "PLA Filament", "Weather Resistant", "QR Code"],
        toolsUsed: ["طابعة ثلاثية الأبعاد", "خيوط PLA", "نمذجة 3D"],
        impact: "رفع الوعي البيئي والتعريف بأنواع الأشجار والنباتات وأهميتها وطرق رعايتها.",
        prototypeImage: "/assets/studios/projects/tree-qr-tags.png",
      },
      {
        id: "modular-bag-holders",
        title: "حامل أكياس النفايات متعدد الأشكال",
        subtitle: "تسهيل جمع وفرز النفايات في الأماكن المغلقة والمفتوحة",
        category: "إدارة النفايات والفرز",
        icon: "🗑️",
        problem:
          "صعوبة جمع وتثبيت أكياس النفايات بشكل منظم في الحدائق والأماكن المختلفة.",
        solution:
          "حامل يثبت على كيس النفايات ليسهل جمعها في الحدائق والأماكن المغلقة وتختلف بالشكل حسب المجسم التي ستوضع عليه.",
        techStack: ["Fusion 360", "Snap-fit Joints", "3D Printing", "PLA"],
        toolsUsed: ["تصميم حوامل قابلة للتعليق", "طباعة ثلاثية الأبعاد"],
        impact: "تسهيل جمع النفايات وفرزها داخل المرافق والحدائق العامة.",
        prototypeImage: "/assets/studios/projects/modular-bag-holders.png",
      },
      {
        id: "seed-organizer-dispenser",
        title: "منظم وحامل البذور",
        subtitle: "حفظ وفرز وغرس البذور بدقة وتنظيم",
        category: "الزراعة المستدامة وحفظ البذور",
        icon: "🌻",
        problem:
          "الزراعة العشوائية وفقدان البذور وصعوبة تنظيمها قبل الزراعة.",
        solution:
          "صندوق أو حامل لتخزين البذور وفرزها حسب النوع، وتوزيعها بانتظام لمنع الهدر.",
        techStack: ["Rotary 3D Design", "Precision Slicing", "PLA"],
        toolsUsed: ["صندوق فرز متعدد المقصورات", "موزع معايرة", "طباعة ثلاثية الأبعاد"],
        impact: "حماية البذور وتسهيل تخزينها وتنظيم عمليات الغرس والزراعة.",
        prototypeImage: "/assets/studios/projects/seed-organizer.png",
      },
      {
        id: "root-fertilizer-capsules",
        title: "كبسولات ومخاريط التسميد والتغذية الجذرية",
        subtitle: "إيصال الماء والمخصبات إلى أعماق الجذور مباشرة",
        category: "الري العميق وتغذية التربة",
        icon: "🌽",
        problem:
          "فقدان المياه والأسمدة السطحية بالتبخر قبل وصولها لأعماق الجذور في التربة.",
        solution:
          "مخاريط وأوتاد مسامية مطبوعة ثلاثية الأبعاد تُغرس في التربة لإيصال الماء والمخصبات مباشرة إلى الجذور.",
        techStack: ["Perforated Lattice", "Bio-PLA", "Deep Root Feeder"],
        toolsUsed: ["شبكات مسامية", "تصميم مخروطي", "طباعة ثلاثية الأبعاد"],
        impact: "ترشيد مياه الري ومضاعفة كفاءة امتصاص الأسمدة من قبل جذور النباتات.",
        prototypeImage: "/assets/studios/projects/root-fertilizer-capsules.png",
      },
      {
        id: "mini-greenhouse",
        title: "الحاضنة النباتية والبيت الزجاجي المصغر",
        subtitle: "حماية الشتلات وتوفير بيئة مناخية ملائمة",
        category: "استنبات الشتلات والتعليم البيئي",
        icon: "🏡",
        problem:
          "تأثر الشتلات الحساسة بالتقلبات الجوية والرياح والصقيع في مراحل النمو الأولى.",
        solution:
          "هيكل حاضنة مصغرة مطبوع ثلاثي الأبعاد مع ألواح شفافة وفتحات تهوية لحماية النباتات والشتلات.",
        techStack: ["Modular Assembly", "Clear Panels", "3D Printing"],
        toolsUsed: ["إطار ثلاثي الأبعاد", "ألواح حماية شفافة", "صمامات تهوية"],
        impact: "حماية الشتلات وتمكين استنباتها بنجاح في البيئات التعليمية والمنزلية.",
        prototypeImage: "/assets/studios/projects/mini-greenhouse.png",
      },
      {
        id: "tafila-topographic-map",
        title: "المجسم التضاريسي والجغرافي لمحافظة الطفيلة",
        subtitle: "خريطة مجسمة تفاعلية تجسد تضاريس وقرى المحافظة",
        category: "التوثيق الجغرافي والتعليم التفاعلي",
        icon: "🗺️",
        problem:
          "صعوبة استيعاب التضاريس الجبلية والتقسيمات الجغرافية للمحافظة والقرى من خلال الخرائط المسطحة.",
        solution:
          "مجسم طبوغرافي ملون ومطبوع ثلاثي الأبعاد يوضح تضاريس وقرى الطفيلة (عيمة، البيضا، بصيرا، الحسين، سلع، صمد، جرف الدراويش) وشبكات الطرق المائية والبرية.",
        techStack: ["DEM GIS Mapping", "Color-Coded 3D Mesh", "Topography 3D"],
        toolsUsed: ["بيانات طبوغرافية", "طباعة ثلاثية الأبعاد متعددة الألوان"],
        impact: "أداة تعليمية وتوثيقية للتعريف بجغرافية وبيئة محافظة الطفيلة.",
        prototypeImage: "/assets/studios/projects/tafila-topographic-map.png",
      },
      {
        id: "wildlife-bird-feeder",
        title: "مغذيات وموزعات طعام الطيور البرية المعلقة",
        subtitle: "إعادة تدوير العبوات مع وصلات طباعة ثلاثية الأبعاد",
        category: "حماية التنوع الحيوي والطيور البرية",
        icon: "🐦",
        problem:
          "شح مصادر الغذاء والحبوب للطيور البرية في فترات الجفاف والشتاء وصعوبة حماية الغذاء من التلف.",
        solution:
          "حامل وموزع طعام مطبوع ثلاثي الأبعاد يُثبت على العبوات البلاستيكية المستهلكة لإعادة تدويرها وتوفير غذاء آمن للطيور.",
        techStack: ["Upcycling Fitting", "Weather Resistant", "3D Printing"],
        toolsUsed: ["وصلات سن لولبي مطبوعة", "حوض تغذية دائري", "خيوط متينة"],
        impact: "حماية الطيور البرية والمساهمة في إعادة التدوير وحفظ التوازن البيئي.",
        prototypeImage: "/assets/studios/projects/wildlife-bird-feeder.png",
      },
    ],
  },
];
