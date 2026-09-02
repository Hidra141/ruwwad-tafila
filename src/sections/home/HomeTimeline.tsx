import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { timelineMilestones } from "@/data/timeline";
import { t } from "@/lib/i18n";

/**
 * HomeTimeline: An editorial, flowing milestone journey for Ruwwad Tafila.
 * Replaces boxy cards with a continuous organic visual path.
 */
export function HomeTimeline() {
  return (
    <section id="timeline" className="relative overflow-hidden bg-surface-muted/40 py-20 lg:py-32">
      <Container>
        {/* Section Header */}
        <div className="mb-16 text-center lg:mb-24">
          <Reveal variant="slide-up">
            <span className="text-sm font-bold uppercase tracking-wider text-ink-brand">
              محطات مضت ومسيرة تتجدد
            </span>
          </Reveal>
          <Reveal variant="slide-up" delay={0.1}>
            <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
              رحلتنا
            </h2>
          </Reveal>
        </div>

        {/* DESKTOP TIMELINE (Continuous Flowing Horizontal Journey) */}
        <div className="hidden lg:block">
          <div className="relative py-12">
            {/* Continuous SVG Flowing Line */}
            <div className="absolute top-1/2 left-0 right-0 h-16 -translate-y-1/2 overflow-hidden pointer-events-none opacity-40">
              <svg viewBox="0 0 1200 60" fill="none" className="w-full h-full text-brand-500">
                <path
                  d="M0 30 C 200 5, 400 55, 600 30 C 800 5, 1000 55, 1200 30"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>

            <div className="grid grid-cols-6 gap-6 relative z-10">
              {timelineMilestones.map((item, idx) => (
                <Reveal key={item.year} variant="slide-up" delay={idx * 0.1}>
                  <div
                    className={`group relative flex flex-col ${
                      idx % 2 === 0 ? "pb-36 justify-end" : "pt-36 justify-start"
                    }`}
                  >
                    {/* Floating Year Node Marker */}
                    <div
                      className={`absolute left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-500 bg-surface shadow-sm transition-transform duration-300 group-hover:scale-125 group-hover:bg-brand-500 ${
                        idx % 2 === 0 ? "bottom-[-20px]" : "top-[-20px]"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full bg-brand-600 group-hover:bg-surface" />
                    </div>

                    {/* Editorial Content (No Box Card Borders) */}
                    <div className="text-center px-2">
                      <span className="block text-3xl font-black tracking-tight text-ink-brand">
                        {item.year}
                      </span>
                      <h3 className="mt-2 text-base font-bold leading-snug text-ink">
                        {t(item.title)}
                      </h3>

                      {item.description && (
                        <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                          {t(item.description)}
                        </p>
                      )}

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1 text-xs text-ink-muted">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="flex items-center justify-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" />
                              <span>{t(h)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE TIMELINE (Vertical Editorial Journey) */}
        <div className="relative pl-6 pr-4 lg:hidden">
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-4 right-7 w-0.5 rounded-full bg-gradient-to-b from-brand-300 via-brand-500 to-brand-700 opacity-50" />

          <div className="space-y-10">
            {timelineMilestones.map((item, idx) => (
              <Reveal key={item.year} variant="slide-start" delay={idx * 0.08}>
                <div className="relative pr-10">
                  {/* Timeline Dot Node */}
                  <div className="absolute right-0 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-500 bg-surface shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-brand-600" />
                  </div>

                  {/* Editorial Text */}
                  <div>
                    <span className="text-2xl font-black text-ink-brand">
                      {item.year}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-ink">
                      {t(item.title)}
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                        {t(item.description)}
                      </p>
                    )}

                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                            <span>{t(h)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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
