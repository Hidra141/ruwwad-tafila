import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { youthProgramContent } from "@/data/youth-program";
import { t, tRich } from "@/lib/i18n";

/**
 * Why the programme exists, and how it began.
 *
 * The origin and the two "beginnings" passages are the programme's own account
 * of the gap it was created to close, so they are given room to be read rather
 * than compressed into feature cards.
 */
export function YouthOrigin() {
  const { origin, beginnings } = youthProgramContent;

  return (
    <Section spacing="compact" ariaLabelledBy="youth-origin">
      <Container width="content">
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            البداية
          </p>
          <h2
            id="youth-origin"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            {t(origin.title)}
          </h2>
        </Reveal>

        <Reveal variant="slide-up" delay={0.08}>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">
            {tRich(origin.paragraphs).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col gap-8">
          {beginnings.map((block, blockIndex) => (
            <Reveal
              key={t(block.title)}
              variant="slide-up"
              delay={0.06 * blockIndex}
            >
              <article className="rounded-2xl border border-line bg-surface-muted p-6 sm:p-8">
                <h3 className="text-xl font-bold text-balance text-ink">
                  {t(block.title)}
                </h3>
                <div className="mt-4 flex flex-col gap-3 text-base leading-relaxed text-pretty text-ink-muted">
                  {tRich(block.paragraphs).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
