import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";

export function YouthProjectsCTA() {
  return (
    <Section spacing="default" className="py-12 bg-gradient-to-br from-surface via-surface-muted/40 to-surface border-y border-line">
      <Container>
        <Reveal variant="slide-up">
          <div className="relative overflow-hidden rounded-3xl border border-brand-200/80 bg-gradient-to-br from-brand-600 via-teal-700 to-brand-900 p-8 sm:p-12 text-white shadow-xl">
            {/* Ambient Background Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -end-24 size-96 rounded-full bg-emerald-400/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -start-24 size-96 rounded-full bg-teal-400/20 blur-3xl"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Text Info */}
              <div className="flex flex-col gap-4 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="flex size-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-200">
                    مختبرات الابتكار والاستوديوهات
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black leading-tight text-white">
                  معرض مشاريع الاستوديوهات التكنولوجية والبيئية
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-white/80">
                  استكشف 13 ابتكاراً ونموذجاً تطبيقياً طورها يافعو ويافعات الطفيلة في إنترنت الأشياء (Arduino) والطباعة ثلاثية الأبعاد (3D Printing)، مع مقاطع الفيديو والمخططات الهندسية.
                </p>

                {/* Tags Pill */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                    ⚡ 6 مشاريع دارات خضراء
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                    🖨️ 7 نماذج مطبوعة 3D
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs">
                    🎬 توثيق الفيديو والمحاكاة
                  </span>
                </div>
              </div>

              {/* Action Button Link */}
              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={routes.projects}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-brand-900 hover:bg-emerald-50 px-8 py-4 text-base font-black shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>تصفح معرض المشاريع كاملاً</span>
                  <span aria-hidden="true" className="text-lg">←</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
