import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";

/**
 * HomeYouthFeature: Editorial feature section for the Youth Program in Tafila.
 */
export function HomeYouthFeature() {
  return (
    <section className="relative overflow-hidden bg-brand-50/40 py-20 lg:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Real Youth Photography Composition */}
          <div className="relative lg:col-span-7">
            <Reveal variant="scale">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-lg sm:aspect-[16/10]">
                <Image
                  src="/assets/youth/youth-workshop-tafila.jpg"
                  alt="ورَش عمل وتعلّم اليافعين في روّاد التنمية – الطفيلة"
                  fill
                  sizes="(min-width: 64rem) 55vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 left-6 flex flex-wrap items-center justify-between gap-3 text-neutral-0">
                  <span className="inline-block rounded-md bg-brand-950/85 px-3.5 py-1.5 text-xs font-bold backdrop-blur-md">
                    مساحات التعلم والابتكار – الطفيلة
                  </span>
                  <span className="inline-block rounded-md bg-primary px-3 py-1 text-xs font-bold text-ink-inverse shadow-xs">
                    13–17 سنة
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Editorial Content Area */}
          <div className="lg:col-span-5">
            <Reveal variant="slide-up">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-brand">
                  برنامج اليافعين واليافعات
                </span>
                <span className="rounded-full bg-brand-500/15 px-3 py-1 text-xs font-bold text-ink-brand">
                  13–17 سنة
                </span>
              </div>
            </Reveal>

            <Reveal variant="slide-up" delay={0.1}>
              <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl lg:leading-tight">
                هنا تبدأ رحلة اليافعين
              </h2>
            </Reveal>

            <Reveal variant="slide-up" delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                رحلة تعلّم ممتدة تُرافق اليافعين واليافعات في الطفيلة لتطوير الفضول
                المعرفي، المهارات الرقمية، والتفكير التصميمي، وتمكينهم من التعبير عن
                أصواتهم وابتكار حلول مجتمعية حقيقية.
              </p>
            </Reveal>

            <Reveal variant="slide-up" delay={0.3}>
              <div className="mt-8">
                <Link
                  href={routes.youth}
                  className="press inline-flex min-h-12 items-center justify-center rounded-pill bg-primary px-8 text-base font-bold text-ink-inverse shadow-[0_2px_4px_rgb(8_46_60/0.12),0_10px_24px_-8px_rgb(10_113_145/0.55)] hover:bg-primary-hover"
                >
                  اكتشف برنامج اليافعين
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
        </div>
      </Container>
    </section>
  );
}

