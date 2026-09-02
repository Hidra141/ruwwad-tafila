import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";

/**
 * HomeCallToAction: Calm, memorable closing invitation for the homepage journey.
 */
export function HomeCallToAction() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface via-brand-50/40 to-brand-100/30 py-20 lg:py-28">
      {/* Decorative accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="slide-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-brand">
              والقصة مستمرة...
            </span>
          </Reveal>

          <Reveal variant="slide-up" delay={0.1}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              اكتشف كيف يمكن أن تبدأ رحلتك
            </h2>
          </Reveal>

          <Reveal variant="slide-up" delay={0.2}>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted sm:text-xl">
              انضم إلينا في مسيرة التمكين والتعلم التفاعلي، واكتشف كيف يُسهم
              برنامج دروسوس وروّاد التنمية في فتح آفاق جديدة لشباب الطفيلة.
            </p>
          </Reveal>

          <Reveal variant="slide-up" delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={routes.drosos}
                className="press inline-flex min-h-12 items-center justify-center rounded-pill bg-primary px-8 text-base font-bold text-ink-inverse shadow-[0_2px_4px_rgb(8_46_60/0.12),0_10px_24px_-8px_rgb(10_113_145/0.55)] hover:bg-primary-hover"
              >
                اكتشف رحلة دروسوس
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

              <Link
                href={routes.contact}
                className="inline-flex items-center justify-center rounded-lg border border-line bg-surface px-7 py-3.5 text-base font-bold text-ink transition-colors hover:border-brand-400 hover:bg-brand-50/50 hover:text-ink-brand"
              >
                تواصل معنا
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

