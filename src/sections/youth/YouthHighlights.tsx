import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * Milestones the programme picks out, each with the year it happened.
 *
 * `years` is printed as written: several entries name more than one year, and
 * normalising them to a single date would state something the source does not.
 */
export function YouthHighlights() {
  const { highlights } = youthProgramContent;
  if (highlights.length === 0) return null;

  return (
    <Section spacing="compact" ariaLabelledBy="youth-highlights">
      <Container>
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            محطات
          </p>
          <h2
            id="youth-highlights"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            إضاءات في البرنامج
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {highlights.map((highlight, index) => (
            <li key={highlight.id}>
              <Reveal variant="slide-up" delay={Math.min(index * 0.03, 0.3)}>
                <article className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-5 shadow-xs transition-colors hover:border-brand-300">
                  <span
                    className="inline-flex w-fit items-center rounded-pill bg-brand-50 px-3 py-1 text-xs font-extrabold text-ink-brand"
                    data-ltr
                  >
                    {highlight.years}
                  </span>
                  <p className="text-base leading-relaxed text-pretty text-ink">
                    {t(highlight.text)}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
