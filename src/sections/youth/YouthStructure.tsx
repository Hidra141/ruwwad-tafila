import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * The programme's components under its 2026 structure.
 *
 * The deck presents these as one map under a single umbrella, without ranking
 * or grouping them, so they are laid out as an even grid rather than being
 * sorted into a hierarchy the source does not state.
 */
export function YouthStructure() {
  const { structure } = youthProgramContent;
  if (structure.components.length === 0) return null;

  return (
    <Section spacing="compact" ariaLabelledBy="youth-structure">
      <Container>
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            الهيكل
          </p>
          <h2
            id="youth-structure"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            {t(structure.umbrella)}
          </h2>
          <p className="mt-3 max-w-(--container-content) text-base text-pretty text-ink-muted sm:text-lg">
            {t(structure.intro)}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {structure.components.map((component, index) => (
            <li key={component.id}>
              <Reveal variant="slide-up" delay={Math.min(index * 0.04, 0.3)}>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs transition-colors hover:border-brand-300">
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-extrabold text-ink-brand"
                    data-ltr
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-balance text-ink">
                    {t(component.title)}
                  </h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
