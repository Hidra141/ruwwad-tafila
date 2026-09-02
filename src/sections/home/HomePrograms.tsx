import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";

const impactAreas = [
  {
    num: "01",
    title: "تمكين الشباب",
    description: "منح تعليمية مقرونة بساعات خدمة مجتمعية وتدريبات إثرائية لتطوير القيادة وبناء قدرات الشباب.",
    href: routes.about,
  },
  {
    num: "02",
    title: "تنمية الطفل",
    description: "أنشطة تفاعلية وأندية صيفية مخصصة للأطفال في القرى والمجتمعات المحلية لتعزيز الإبداع.",
    href: routes.about,
  },
  {
    num: "03",
    title: "تمكين المجتمع",
    description: "مساحة آمنة وحاضنة للمبادرات المحلية والشراكات مع الجمعيات والمؤسسات لخدمة الطفيلة.",
    href: routes.about,
  },
  {
    num: "04",
    title: "المشاريع والابتكار",
    description: "تحويل الأفكار إلى حلول ملموسة ونماذج عمل أولية تقنية وبيئية تخدم التنمية المحلية.",
    href: routes.youth,
  },
];

/**
 * HomePrograms: Editorial discovery section introducing Ruwwad's core Impact Areas (مجالات التأثير)
 * using a creative, asymmetrical numbered layout.
 */
export function HomePrograms() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Section Heading & Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal variant="slide-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-brand">
                ركائز العمل
              </span>
            </Reveal>

            <Reveal variant="slide-up" delay={0.1}>
              <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl lg:leading-tight">
                مجالات التأثير
              </h2>
            </Reveal>

            <Reveal variant="slide-up" delay={0.2}>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                نعمل في روّاد التنمية – الطفيلة عبر برامج متكاملة تهدف إلى تمكين
                الفئات المستهدفة، وتنمية المجتمع، وبناء حلول مبتكرة ومستدامة.
              </p>
            </Reveal>

            <Reveal variant="slide-up" delay={0.3}>
              <div className="mt-8">
                <Link
                  href={routes.about}
                  className="inline-flex items-center text-base font-bold text-ink-brand transition-colors hover:text-primary-hover"
                >
                  اقرأ أكثر عن برامجنا
                  <svg
                    className="mr-2 h-4 w-4 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Asymmetrical Creative Impact Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {impactAreas.map((item, idx) => (
                <Reveal
                  key={item.num}
                  variant="slide-up"
                  delay={idx * 0.1}
                  className={idx % 2 === 1 ? "sm:translate-y-6" : ""}
                >
                  <div className="lift group relative flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 shadow-xs hover:border-brand-300">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-black text-ink-brand transition-transform duration-300 group-hover:scale-110">
                          {item.num}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-brand-500/30 group-hover:bg-brand-500" />
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-ink transition-colors group-hover:text-ink-brand">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-line/60 pt-4">
                      <Link
                        href={item.href}
                        className="inline-flex min-h-11 items-center text-xs font-bold text-ink-brand transition-colors group-hover:text-primary-hover"
                      >
                        معرفة المزيد
                        <svg
                          className="mr-1 h-3 w-3 rotate-180 transition-transform group-hover:-translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

