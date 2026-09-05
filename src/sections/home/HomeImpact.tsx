import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

const verifiedImpactFacts = [
  {
    value: "2012",
    label: "عام التأسيس والانطلاق",
    description: "بداية رحلة تمكين الشباب واليافعين في محافظة الطفيلة.",
  },
  {
    value: "50+",
    label: "منحة سنوية",
    description: "دعم تعليمي ومجتمعي ممتد يستثمر في طاقات الشباب.",
  },
  {
    value: "3",
    label: "مراحل متكاملة",
    description: "رحلة دروسوس من الوعي بالذات إلى الطلاقة الرقمية والتفكير التصميمي.",
  },
  {
    value: "تغطية شاملة",
    label: "مختلف مناطق الطفيلة",
    description: "العمل الميداني والأنشطة بالشراكة مع المجتمعات المحلية.",
  },
];

/**
 * HomeImpact: Typography-driven impact section presenting confirmed facts with context.
 */
export function HomeImpact() {
  return (
    <section className="bg-surface-muted/80 py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="slide-up">
            <span className="text-sm font-bold uppercase tracking-wider text-ink-brand">
              أثر ملموس واستمرار
            </span>
          </Reveal>
          <Reveal variant="slide-up" delay={0.1}>
            <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
              الأثر المجتمعي
            </h2>
          </Reveal>
        </div>

        <div className="mt-8 sm:mt-16 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
          {verifiedImpactFacts.map((fact, idx) => (
            <Reveal key={fact.label} variant="slide-up" delay={idx * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-4 sm:p-7 shadow-xs">
                <div>
                  <span className="text-2xl sm:text-4xl font-black tracking-tight text-ink-brand">
                    {fact.value}
                  </span>
                  <h3 className="mt-1.5 sm:mt-3 text-sm sm:text-lg font-bold text-ink line-clamp-1">
                    {fact.label}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-ink-muted line-clamp-2 sm:line-clamp-none">
                    {fact.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
