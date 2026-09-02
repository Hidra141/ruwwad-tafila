import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { drososRun } from "@/data/drosos-journey";

export function DrososOverview() {
  const tracks = [
    {
      icon: "⚡",
      title: "زمالة تواصل مع قوتك",
      subtitle: "المرحلة الأولى — 7 جلسات",
      description: "التمكين النفسي والاجتماعي، بناء الثقة بالنفس، إدارة المشاعر، والتواصل الإيجابي والتعبير عن الذات.",
      color: "border-sky-200 bg-sky-50/60 text-sky-950",
      badgeColor: "bg-sky-600 text-white",
    },
    {
      icon: "💻",
      title: "أساسيات الحاسوب والطلاقة الرقمية",
      subtitle: "المرحلة الثانية — 13 جلسة",
      description: "امتلاك مهارات الحاسوب، أدوات Google Workspace، إنشاء المواقع على Google Sites، والأمن السيبراني.",
      color: "border-blue-200 bg-blue-50/60 text-blue-950",
      badgeColor: "bg-blue-600 text-white",
    },
    {
      icon: "💡",
      title: "التفكير التصميمي الخماسي",
      subtitle: "المرحلة الثالثة (أ) — 16 جلسة",
      description: "التعاطف مع تحديات المجتمع، تحديد المشكلات، رسم المخططات، والنمذجة الأولية بالكرتون والورق.",
      color: "border-indigo-200 bg-indigo-50/60 text-indigo-950",
      badgeColor: "bg-indigo-600 text-white",
    },
    {
      icon: "🖨️",
      title: "استوديوهات التصنيع الرقمي 3D",
      subtitle: "المرحلة الثالثة (ب و ج) — 19 جلسة",
      description: "برمجة الحساسات والدارات البيئية بالأردوينو (Green Circuit)، والنمذجة بـ Tinkercad والطباعة 3D.",
      color: "border-emerald-200 bg-emerald-50/60 text-emerald-950",
      badgeColor: "bg-emerald-600 text-white",
    },
  ];

  return (
    <Section spacing="compact" className="py-12 md:py-16 bg-surface-muted/60 border-b border-line">
      <Container className="flex flex-col gap-10">
        {/* Header Block & Period Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            title="عن شراكة مشروع دروسوس بالطفيلة"
            description="تمكين اليافعين في الطفيلة من خلال الطلاقة الرقمية، التفكير التصميمي، والابتكار البيئي والمجتمعي."
          />

          <div className="flex items-center gap-3 shrink-0 rounded-2xl border border-line bg-surface p-3.5 shadow-xs">
            <span className="flex size-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex flex-col text-xs">
              <span className="font-black text-ink">مبادرة مشروع دروسوس • الطفيلة</span>
              <span className="font-bold text-ink-subtle dir-ltr">{drososRun.displayPeriod}</span>
            </div>
          </div>
        </div>

        {/* 4 Headline Key Stat Cards Strip */}
        <Reveal variant="slide-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-5 text-center shadow-xs transition-all hover:border-brand-300 hover:shadow-md">
              <span className="text-3xl font-black text-brand-600 sm:text-4xl">{drososRun.participants}</span>
              <span className="mt-1 text-xs sm:text-sm font-bold text-ink">يافعاً ويافعة بالطفيلة</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-5 text-center shadow-xs transition-all hover:border-brand-300 hover:shadow-md">
              <span className="text-3xl font-black text-brand-600 sm:text-4xl">{drososRun.sessions}</span>
              <span className="mt-1 text-xs sm:text-sm font-bold text-ink">جلسة تعلم وتطبيق</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-5 text-center shadow-xs transition-all hover:border-brand-300 hover:shadow-md">
              <span className="text-3xl font-black text-brand-600 sm:text-4xl">3</span>
              <span className="mt-1 text-xs sm:text-sm font-bold text-ink">مراحل تعلم متكاملة</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-5 text-center shadow-xs transition-all hover:border-brand-300 hover:shadow-md">
              <span className="text-3xl font-black text-brand-600 sm:text-4xl">2</span>
              <span className="mt-1 text-xs sm:text-sm font-bold text-ink">استوديو ابتكار وتصنيع 3D</span>
            </div>
          </div>
        </Reveal>

        {/* 4 Track Cards Grid */}
        <Reveal variant="slide-up" delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((track, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${track.color}`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{track.icon}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-black ${track.badgeColor}`}>
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-black text-ink">{track.title}</h3>
                    <span className="text-[0.72rem] font-extrabold text-ink-subtle">{track.subtitle}</span>
                  </div>

                  <p className="text-xs leading-relaxed text-ink-muted">{track.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
