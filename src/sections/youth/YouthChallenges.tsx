import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * The challenges the programme names openly.
 *
 * Kept on the page rather than edited out: the deck states them plainly, and
 * an institution that names what it is still working on reads as more credible
 * than one that only lists achievements.
 */
export function YouthChallenges() {
  const { challenges } = youthProgramContent;
  if (challenges.items.length === 0) return null;

  return (
    <Section spacing="compact" ariaLabelledBy="youth-challenges" className="bg-surface-muted">
      <Container>
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            بصراحة
          </p>
          <h2
            id="youth-challenges"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            {t(challenges.title)}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
          {challenges.image ? (
            <Reveal variant="scale">
              <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
                <ResponsiveMedia ratio="landscape" rounded={false}>
                  <ImageFrame
                    image={challenges.image}
                    fill
                    sizes="(min-width: 64rem) 26rem, 100vw"
                  />
                </ResponsiveMedia>
              </div>
            </Reveal>
          ) : null}

          <ul className="flex flex-col gap-4">
            {challenges.items.map((item, index) => (
              <li key={item.id}>
                <Reveal
                  variant="slide-up"
                  delay={Math.min(index * 0.05, 0.25)}
                >
                  <div className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                    <span
                      aria-hidden="true"
                      className="mt-1 size-2 shrink-0 rounded-full bg-brand-400"
                    />
                    <p className="text-base leading-relaxed text-pretty text-ink-muted">
                      {t(item.text)}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
