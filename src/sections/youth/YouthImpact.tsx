import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * Cumulative figures since 2018.
 *
 * The figure is split from its unit only for typographic emphasis; both halves
 * come from the same phrase in the source and are never re-worded. The numeral
 * is marked LTR so Arabic-Indic ordering does not reverse it.
 */
export function YouthImpact() {
  const { stats, statsCaption } = youthProgramContent;
  if (stats.length === 0) return null;

  return (
    <Section spacing="compact" ariaLabelledBy="youth-impact" className="bg-surface-muted">
      <Container>
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            الأثر
          </p>
          <h2
            id="youth-impact"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            أهم الأعداد منذ التأسيس
          </h2>
          <p className="mt-3 text-base font-semibold text-ink-muted">
            {t(statsCaption)}
          </p>
        </Reveal>

        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const [figure, ...unit] = stat.value.split(" ");
            return (
              <Reveal
                key={stat.id}
                variant="slide-up"
                delay={Math.min(index * 0.04, 0.3)}
              >
                <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
                  <dt className="text-sm leading-snug text-pretty text-ink-muted">
                    {t(stat.label)}
                  </dt>
                  <dd className="flex items-baseline gap-2">
                    <span
                      className="text-4xl font-extrabold text-ink-brand"
                      data-ltr
                    >
                      {figure}
                    </span>
                    <span className="text-sm font-semibold text-ink-muted">
                      {unit.join(" ")}
                    </span>
                  </dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </Section>
  );
}
