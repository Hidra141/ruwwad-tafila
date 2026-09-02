import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { routes } from "@/config/routes";

export function AboutCTA() {
  return (
    <Section spacing="compact" className="relative overflow-hidden pt-8 pb-16">
      <Container>
        <Reveal variant="slide-up">
          <div className="relative overflow-hidden rounded-3xl border border-brand-300/60 bg-gradient-to-r from-brand-700 via-brand-800 to-brand-900 p-8 text-center text-white shadow-xl md:p-14">
            {/* Ambient background glows */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand-400/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                <span>كن جزءاً من رحلتنا</span>
              </span>

              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl leading-tight">
                جاهز لاكتشاف طاقات اليافعين ورؤية مشاريعهم الابتكارية؟
              </h2>

              <p className="text-base text-brand-100 sm:text-lg max-w-2xl leading-relaxed">
                انضم إلينا في استكشاف تفاصيل برنامج اليافعين والتعرف على خريجينا المبدعين في الطفيلة.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href={routes.youth}
                  className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-pill bg-white px-7 text-sm font-bold text-brand-900 shadow-md hover:bg-brand-50 hover:shadow-lg"
                >
                  <span>برنامج اليافعين</span>
                  <span>←</span>
                </Link>
                <Link
                  href={routes.alumni}
                  className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border-2 border-white/40 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur-md hover:border-white/70 hover:bg-white/20"
                >
                  <span>استكشف الخريجين</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
