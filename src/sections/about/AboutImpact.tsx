import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function AboutImpact() {
  const metrics = [
    {
      figure: "420",
      label: "شريك تراكمي منذ التأسيس",
      description: "شبكة واسعة من الشراكات الاستراتيجية مع المدارس، المؤسسات الحكومية والخاصة، والجمعيات في الطفيلة.",
      icon: "🤝",
    },
    {
      figure: "283",
      label: "مستفيد من صندوق المنح",
      description: "تمكين أكاديمي ومالي لـ 283 شاب وشابة (تخرج منهم 126 خريجاً وخريجة) مقابل 4 ساعات خدمة مجتمعية أسبوعياً.",
      icon: "🎓",
    },
    {
      figure: "168",
      label: "مبادرة شبابية مجتمعية",
      description: "مبادرات ريادية أطلقها الشباب بمعدل 10 مبادرات سنوياً، أثرت في 10,450 مستفيد من الأطفال واليافعين والأهالي.",
      icon: "🚀",
    },
    {
      figure: "33",
      label: "مشروع صغير مُموّل",
      description: "دعم وتمويل المشاريع الصغرى بالطفيلة، إلى جانب 111 جلسة تربية والدية وخدمة مجتمعية استفادت منها 1,349 سيدة.",
      icon: "💼",
    },
  ];

  const partnershipBreakdown = [
    { category: "المدارس الحكومية والخاصة", count: "97", detail: "شراكة مباشرة من أصل 122 مدرسة بالطفيلة", icon: "🏫" },
    { category: "مؤسسات المجتمع الخاصة", count: "49", detail: "شراكات تمويل ودعم وتدريب", icon: "🏢" },
    { category: "المؤسسات الحكومية", count: "27", detail: "تعاون مؤسسي وخدمات تنموية", icon: "🏛️" },
    { category: "الأشخاص المصدريون والخبراء", count: "229", detail: "موجهون ومدربون وداعمون مجتمعيون", icon: "👤" },
    { category: "الجمعيات المحلية والخيرية", count: "11", detail: "شراكات تنفيذية وتغطية قرى الطفيلة", icon: "🤝" },
    { category: "الجامعات والكليات", count: "7", detail: "استقطاب الطلاب وتمكين خريجي المنح", icon: "🎓" },
  ];

  return (
    <Section spacing="compact" ariaLabelledBy="about-impact" className="bg-surface-muted/50 py-12 md:py-16">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="about-impact"
          title="الأثر والتغيير المجتمعي المستدام"
          description="نُقاس نجاحنا بالأرقام التراكمية الموثقة للاستثمار المستدام في الإنسان والوصول المجتمعي الشامل بمحافظة الطفيلة."
        />

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((item, idx) => (
            <Reveal key={idx} variant="slide-up" delay={idx * 0.08}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-brand-600 group-hover:scale-105 transition-transform">
                      {item.figure}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink">
                    {item.label}
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Governorate Context & Environment Section */}
        <Reveal variant="slide-up" delay={0.15}>
          <div className="relative overflow-hidden rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-7 sm:p-9 md:p-11 text-white shadow-md">
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
                <span className="inline-flex rounded-full bg-white/15 px-3.5 py-1 text-xs font-black text-white backdrop-blur-md">
                  سياق محافظة الطفيلة والتحديات
                </span>
                <span className="text-xs font-bold text-brand-200">
                  المعطيات الجغرافية والديموغرافية الرسمية
                </span>
              </div>

              <h3 className="text-2xl font-black text-white leading-snug sm:text-3xl">
                العمل في بيئة ذات خصوصية وتحديات تنموية مرفوقة بالشغف
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs border border-white/10 flex flex-col gap-1">
                  <span className="text-xl font-black text-brand-200">180 كم / 2,009 كم²</span>
                  <span className="text-xs font-bold text-white">البُعد عن العاصمة والمساحة</span>
                  <p className="text-[0.75rem] text-brand-100 leading-relaxed mt-1">
                    تبعد المحافظة 180 كم جنوب عمان ومساحتها 2009 كم²، وتضم 114 ألف نسمة مقسمين على 3 ألوية (القصبة، بصيرا، الحسا) و20 قرية متناثرة.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs border border-white/10 flex flex-col gap-1">
                  <span className="text-xl font-black text-brand-200">39% / 2.4%</span>
                  <span className="text-xs font-bold text-white">البطالة والطرد السكاني</span>
                  <p className="text-[0.75rem] text-brand-100 leading-relaxed mt-1">
                    تسجل الطفيلة أعلى نسبة بطالة (39%) وأعلى نسبة طرد سكاني تصل إلى 2.4% (122 شخص سنوياً)، مما يتطلب برامج تمكين مستدامة.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xs border border-white/10 flex flex-col gap-1">
                  <span className="text-xl font-black text-brand-200">122 مدرسة</span>
                  <span className="text-xs font-bold text-white">البيئة التعليمية والوصول</span>
                  <p className="text-[0.75rem] text-brand-100 leading-relaxed mt-1">
                    تضم الطفيلة 122 مدرسة حكومية وخاصة، نجح روّاد في الشراكة المباشرة والوصول المستدام إلى 97 مدرسة منها لتنفيذ البرامج.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Detailed Cumulative Partnership Breakdown Grid (2012-2025) */}
        <Reveal variant="slide-up" delay={0.2}>
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-xs">
            <div className="flex flex-col gap-2 border-b border-line pb-5">
              <span className="inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-800 border border-brand-200">
                الشراكات الأفقية والتراكمية (2012 - 2025)
              </span>
              <h3 className="text-xl font-black text-ink sm:text-2xl">
                تفاصيل شبكة الشراكات الممتدة (420 شريكاً تراكمياً)
              </h3>
              <p className="text-xs sm:text-sm font-bold text-ink-muted">
                بُنيت مسيرة الأثر عبر شبكة شراكات تكاملية مع كافة القطاعات والمؤسسات الفاعلة في محافظة الطفيلة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partnershipBreakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-line/80 bg-surface-muted/60 p-4 transition-all hover:border-brand-300 hover:bg-surface"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 border border-brand-200 text-2xl">
                    {item.icon}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-brand-700">{item.count}</span>
                      <span className="text-sm font-extrabold text-ink">{item.category}</span>
                    </div>
                    <span className="text-[0.75rem] text-ink-muted font-medium">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
