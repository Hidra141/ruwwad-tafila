import Image from "next/image";
import Link from "next/link";

import { JourneyBackgroundPath } from "@/components/decorative/JourneyBackgroundPath";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";

const drososStages = [
  {
    step: "01",
    title: "تواصل مع قوتك",
    subtitle: "المرحلة التأسيسية",
    description:
      "استكشاف المهارات الذاتية، التعبير عن النفس، وبناء الثقة والتواصل الإيجابي.",
  },
  {
    step: "02",
    title: "أساسيات الحاسوب والطلاقة الديجيتالية",
    subtitle: "المهارات الرقمية",
    description:
      "امتلاك أدوات التكنولوجيا والبحث والمعالجة الرقمية بفاعلية وأمان.",
  },
  {
    step: "03",
    title: "التفكير التصميمي",
    subtitle: "الاستوديوهات التطبيقية",
    description:
      "ابتكار حلول للبيئة والمجتمع المحلي من خلال العمل في استوديوهات تفاعلية.",
  },
];

/**
 * HomeDrosos: Dominant chapter section introducing the Drosos initiative in Tafila
 * with visual distinction, photography gallery preview, and its 3-stage journey.
 */
export function HomeDrosos() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-ink-inverse lg:py-28">
      {/* Background SVG Flow */}
      <JourneyBackgroundPath variant="drosos-flow" />

      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/3 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl"
      />

      <Container className="relative z-10">
        {/* DROSOS HERO MOMENT */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Reveal variant="slide-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/60 bg-brand-900/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-brand backdrop-blur-xs">
                شراكة استراتيجية مع مؤسسة دروسوس
              </span>
            </Reveal>

            <Reveal variant="slide-up" delay={0.1}>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-neutral-0 sm:text-5xl lg:text-6xl">
                مشروع دروسوس
              </h2>
            </Reveal>

            <Reveal variant="slide-up" delay={0.2}>
              <p className="mt-5 text-lg leading-relaxed text-brand-100 sm:text-xl">
                رحلة تعلّم وتغيير متكاملة تمتد عبر محطات متتالية، تُمكّن اليافعين
                واليافعات في الطفيلة من بناء مهارات المستقبل، والابتكار، وقيادة
                المبادرات المجتمعية.
              </p>
            </Reveal>

            <Reveal variant="slide-up" delay={0.3}>
              <div className="mt-8">
                <Link
                  href={routes.drosos}
                  className="press inline-flex min-h-12 items-center justify-center rounded-pill bg-primary px-8 text-base font-bold text-ink-inverse shadow-[0_2px_4px_rgb(8_46_60/0.12),0_10px_24px_-8px_rgb(10_113_145/0.55)] hover:bg-primary-hover"
                >
                  اكتشف دروسوس
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

          {/* DROSOS OFFICIAL STUDIO LOGOS PREVIEW */}
          <div className="lg:col-span-6">
            <Reveal variant="scale">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-700 bg-white p-4 shadow-xl transition-all duration-300 hover:border-brand-400">
                  <Image
                    src="/assets/drosos/studios/green-circuit-studio-logo.jpeg"
                    alt="شعار استوديو الدارات الخضراء – Green Circuits Studio"
                    fill
                    sizes="(min-width: 64rem) 25vw, 50vw"
                    className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 left-3 text-center">
                    <span className="inline-block rounded-md bg-brand-950/90 px-2.5 py-1 text-xs font-bold text-neutral-0 backdrop-blur-md shadow-xs">
                      الاستوديو الأول: الدارات الخضراء
                    </span>
                  </div>
                </div>
                <div className="relative aspect-square translate-y-4 overflow-hidden rounded-2xl border border-brand-700 bg-white p-4 shadow-xl transition-all duration-300 hover:border-brand-400">
                  <Image
                    src="/assets/drosos/studios/innovate-for-earth-logo.png"
                    alt="شعار استوديو ابتكر من أجل الأرض – Innovate for Earth Studio"
                    fill
                    sizes="(min-width: 64rem) 25vw, 50vw"
                    className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 left-3 text-center">
                    <span className="inline-block rounded-md bg-brand-950/90 px-2.5 py-1 text-xs font-bold text-neutral-0 backdrop-blur-md shadow-xs">
                      الاستوديو الثاني: ابتكر من أجل الأرض
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* DROSOS 3-STAGE JOURNEY */}
        <div className="mt-20 lg:mt-24">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-brand">
              مسار التعلّم
            </span>
            <h3 className="mt-2 text-2xl font-bold text-neutral-0 lg:text-3xl">
              المراحل الأساسية للرحلة
            </h3>
          </div>

          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {drososStages.map((stage, idx) => (
              <Reveal key={stage.step} variant="slide-up" delay={idx * 0.12}>
                <div className="lift group relative flex flex-col justify-between rounded-2xl border border-brand-800/80 bg-brand-900/60 p-7 backdrop-blur-xs hover:border-brand-400/60 hover:bg-brand-900">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black text-ink-brand group-hover:text-brand-300">
                        {stage.step}
                      </span>
                      <span className="rounded-md bg-brand-800/80 px-2.5 py-1 text-xs font-semibold text-brand-200">
                        {stage.subtitle}
                      </span>
                    </div>

                    <h4 className="mt-5 text-xl font-bold text-neutral-0">
                      {stage.title}
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-brand-100/90">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

