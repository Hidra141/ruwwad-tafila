import { Reveal } from "@/components/motion/Reveal";
import { AppLink } from "@/components/ui/AppLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * Drosos, summarised in its place: one project run inside the Youth Programme
 * since 2024, not the programme itself.
 *
 * Only the outline lives here — the full journey, its phases, and the
 * graduates have their own pages, and duplicating them would leave two
 * versions of the same content to keep in step.
 */
export function YouthDrosos() {
  const { drosos } = youthProgramContent;

  return (
    <Section spacing="compact" ariaLabelledBy="youth-drosos">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/60 p-6 sm:p-10">
          <Reveal variant="slide-up">
            <p className="text-sm font-bold tracking-wide text-ink-brand">
              مشروع ضمن البرنامج
            </p>
            <h2
              id="youth-drosos"
              className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
            >
              {t(drosos.title)}
            </h2>
            <p className="mt-4 max-w-(--container-content) text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">
              {t(drosos.description)}
            </p>
          </Reveal>

          {drosos.outcomes.length > 0 ? (
            <Reveal variant="slide-up" delay={0.1}>
              <div className="mt-8">
                <h3 className="text-sm font-bold text-ink">يعزز المشروع</h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {drosos.outcomes.map((outcome) => (
                    <li
                      key={t(outcome)}
                      className="rounded-pill border border-brand-200 bg-surface px-4 py-2 text-sm font-semibold text-ink"
                    >
                      {t(outcome)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}

          <Reveal variant="slide-up" delay={0.16}>
            <div className="mt-9 flex flex-wrap gap-3">
              <AppLink href={routes.drosos} variant="primary">
                رحلة دروسوس بالتفصيل
              </AppLink>
              <AppLink href={routes.alumni} variant="secondary">
                قصص الخريجين
              </AppLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
