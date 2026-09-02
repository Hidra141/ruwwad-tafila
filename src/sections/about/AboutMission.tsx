import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const corePrograms = [
  {
    title: "صندوق منح روّاد الشبابية",
    description: "توفير المنح الجامعية للشباب بالطفيلة (283 مستفيد، 126 خريج حتى اليوم) مقترنة بساعات الخدمة المجتمعية والتمكين القيادي.",
    stats: "283 مستفيداً • 126 خريجاً",
    icon: "🎓",
  },
  {
    title: "برنامج تمكين اليافعين (دروسوس)",
    description: "بناء قدرات 20 يافعاً ويافعة سنوياً عبر 55 جلسة في التمكين النفسي، الطلاقة الرقمية، التفكير التصميمي، واستوديو الطباعة 3D.",
    stats: "20 يافعاً • 55 جلسة",
    icon: "💡",
  },
  {
    title: "برنامج تنمية الطفل والنوادي الصيفية",
    description: "تنظيم النوادي الصيفية والأنشطة الإبداعية للأطفال في قرى الطفيلة (مثل عيمة) لتعزيز حب التعلم والشغف بالابتكار.",
    stats: "نوادٍ صيفية في القرى",
    icon: "🌱",
  },
  {
    title: "الدعم والتمكين المجتمعي والريادة",
    description: "الشراكة التراكمية مع 420 جهة (97 مدرسة، 27 مؤسسة حكومية، 49 شركة خاصة، 11 جمعية) وإطلاق 168 مبادرة لخدمة 10.4K+ شخص.",
    stats: "420 شريكاً • 168 مبادرة",
    icon: "🤝",
  },
];

export function AboutMission() {
  return (
    <Section spacing="compact" ariaLabelledBy="about-mission" className="py-12 md:py-16 bg-surface-muted/50 border-y border-line">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="about-mission"
          title="محاور عملنا ورسالتنا بالطفيلة"
          description="نعمل من خلال نموذج تنموي شامل يستثمر في طاقات الشباب واليافعين والأطفال لتمكين المجتمع المحلي."
        />

        <Reveal variant="slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corePrograms.map((prog, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-3xl">{prog.icon}</span>
                  <h3 className="text-base font-black text-ink">{prog.title}</h3>
                  <p className="text-xs leading-relaxed text-ink-muted">{prog.description}</p>
                </div>
                <span className="inline-flex rounded-xl bg-brand-50 border border-brand-200 px-3 py-1 text-[0.7rem] font-extrabold text-brand-800">
                  {prog.stats}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
