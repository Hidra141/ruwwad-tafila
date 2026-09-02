import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * Opening of the Youth Programme page.
 *
 * Leads with the programme's own goal statement rather than a written-for-the-web
 * strapline, and anchors it with the three figures that describe its reach.
 */
export function YouthHero() {
  const { goal, stats } = youthProgramContent;
  // The three the source leads with: youth reached, schools, youth in schools.
  const headline = stats.slice(0, 3);

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-surface to-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -end-32 size-[30rem] rounded-full bg-brand-200/30 blur-3xl"
      />

      {/* The site header is fixed with no global offset, so the page clears it. */}
      <Container className="relative pt-[calc(var(--header-height)+2.5rem)] pb-(--spacing-section-sm)">
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            روّاد التنمية – الطفيلة
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
            برنامج اليافعين
          </h1>
          <p className="mt-4 text-lg font-semibold text-ink-muted" data-ltr>
            2018 — 2025
          </p>
        </Reveal>

        <Reveal variant="slide-up" delay={0.1}>
          <p className="mt-8 max-w-(--container-content) border-s-4 border-brand-400 ps-5 text-lg leading-relaxed text-pretty text-ink sm:text-xl">
            {t(goal.text)}
          </p>
        </Reveal>

        <Reveal variant="slide-up" delay={0.18}>
          <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {headline.map((stat) => {
              // The source writes value and unit as one Arabic phrase.
              const [figure, ...rest] = stat.value.split(" ");
              return (
                <div
                  key={stat.id}
                  className="rounded-2xl border border-line bg-surface p-5 shadow-xs"
                >
                  <dt className="text-sm leading-snug text-ink-muted">
                    {t(stat.label)}
                  </dt>
                  <dd className="mt-3 flex items-baseline gap-2">
                    <span
                      className="text-3xl font-extrabold text-ink-brand sm:text-4xl"
                      data-ltr
                    >
                      {figure}
                    </span>
                    <span className="text-sm font-semibold text-ink-muted">
                      {rest.join(" ")}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </Container>
    </header>
  );
}
