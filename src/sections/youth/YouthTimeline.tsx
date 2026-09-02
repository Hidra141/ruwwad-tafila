import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { youthProgramContent } from "@/data/youth-program";
import { tRich } from "@/lib/i18n";
import type { YouthProgramYear } from "@/types";

/**
 * The programme year by year, 2018 to 2025.
 *
 * Each year carries the photographs that appeared with it in the official deck
 * — the attribution comes from the slide relationships, not from guesswork, so
 * a reader can trust that a 2020 photograph is from 2020.
 */
export function YouthTimeline() {
  const { timeline } = youthProgramContent;
  if (timeline.length === 0) return null;

  return (
    <Section spacing="compact" ariaLabelledBy="youth-timeline" className="bg-surface-muted">
      <Container>
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            مسيرة البرنامج
          </p>
          <h2
            id="youth-timeline"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            سنة بعد سنة
          </h2>
          <p className="mt-3 max-w-(--container-content) text-base text-ink-muted sm:text-lg">
            كيف تطوّر البرنامج منذ تأسيسه في مكتبة شمس الطفيلة عام 2018.
          </p>
        </Reveal>

        <ol className="mt-12 flex flex-col">
          {timeline.map((entry, index) => (
            <YearEntry
              key={entry.year}
              entry={entry}
              isLast={index === timeline.length - 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function YearEntry({
  entry,
  isLast,
}: {
  entry: YouthProgramYear;
  isLast: boolean;
}) {
  const paragraphs = tRich(entry.paragraphs);
  const images = entry.images ?? [];

  return (
    <li className="relative flex gap-5 sm:gap-8">
      {/* Rail and year marker, drawn per item so the last one omits the rail. */}
      <div className="flex shrink-0 flex-col items-center">
        <span
          className="flex size-16 items-center justify-center rounded-full border border-brand-200 bg-surface text-sm font-extrabold text-ink-brand shadow-xs sm:size-20 sm:text-base"
          data-ltr
        >
          {entry.year}
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className="mt-2 w-px flex-1 bg-gradient-to-b from-brand-200 to-brand-100"
          />
        ) : null}
      </div>

      <Reveal variant="slide-up" className="min-w-0 flex-1 pb-12 last:pb-0 sm:pb-16">
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-7">
          <h3 className="sr-only">{`عام ${entry.year}`}</h3>

          <div className="flex flex-col gap-3 text-base leading-relaxed text-pretty text-ink-muted">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {images.length > 0 ? (
            <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {images.map((image) => (
                <li key={image.src}>
                  <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
                    <ResponsiveMedia ratio="landscape" rounded={false}>
                      <ImageFrame
                        image={image}
                        fill
                        /* Every year sits below the fold, so all stay lazy. */
                        sizes="(min-width: 64rem) 16rem, (min-width: 40rem) 22vw, 45vw"
                      />
                    </ResponsiveMedia>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Reveal>
    </li>
  );
}
