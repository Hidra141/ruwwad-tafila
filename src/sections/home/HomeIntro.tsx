import Link from "next/link";

import { JourneyBackgroundPath } from "@/components/decorative/JourneyBackgroundPath";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";

/**
 * HomeIntro: Editorial statement section smoothly connecting from the Hero into the journey narrative.
 */
export function HomeIntro() {
  return (
    <section id="intro" className="relative overflow-hidden bg-surface py-20 lg:py-28">
      {/* Subtle background visual journey path */}
      <JourneyBackgroundPath variant="hero-to-intro" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="slide-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-brand">
              روّاد التنمية – الطفيلة
            </span>
          </Reveal>

          <Reveal variant="slide-up" delay={0.1}>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl lg:leading-snug">
              مساحة تبدأ فيها الرحلة
            </h2>
          </Reveal>

          <Reveal variant="slide-up" delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              نعمل في الطفيلة على تمكين الشباب واليافعين بخلق مساحات آمنة وديناميكية
              للتعلم والتجربة والابتكار والمشاركة المجتمعية الفاعلة.
            </p>
          </Reveal>

          <Reveal variant="slide-up" delay={0.3}>
            <div className="mt-8">
              <Link
                href={routes.about}
                className="inline-flex items-center text-base font-bold text-ink-brand transition-colors hover:text-primary-hover"
              >
                تعرّف على قصتنا
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
      </Container>
    </section>
  );
}

