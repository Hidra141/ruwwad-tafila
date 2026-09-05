import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { routes } from "@/config/routes";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * Drosos, as the last thing on the youth page.
 *
 * It used to be the fifth tab in the explorer, which put a whole other project
 * behind a control the reader had to find and press — and once pressed, the
 * page had nothing after it. A project with its own page does not belong
 * inside a tab strip about the programme it sits within; it belongs at the end
 * of the reading, as the door out.
 *
 * So the tab is gone and this is the page's closing section: the outline of
 * the project, what it produces, and one link. A reader who finishes the
 * programme's story arrives here and is handed the next thing to read.
 *
 * It uses the `inverse` surface, which is the site's rule for a closing note —
 * one dark band per page, always last. The youth page previously just stopped
 * after the tab panel with no ending at all.
 *
 * Only the outline lives here. The full journey, its phases and its graduates
 * have their own pages, and duplicating them would leave two versions of the
 * same content to keep in step.
 */
export function YouthDrosos() {
  const { drosos } = youthProgramContent;

  return (
    <SectionSurface
      surface="inverse"
      pattern
      ariaLabelledBy="youth-drosos"
    >
      <Container className="flex flex-col gap-8">
        <Reveal variant="slide-up">
          <div className="max-w-(--container-content)">
            <p className="text-sm font-semibold tracking-wide text-brand-200">
              مشروع ضمن البرنامج
            </p>
            <h2
              id="youth-drosos"
              className="mt-3 font-display text-3xl text-balance text-white sm:text-4xl"
              style={{ fontVariationSettings: '"wght" 700' }}
            >
              {t(drosos.title)}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-brand-100">
              {t(drosos.description)}
            </p>
          </div>
        </Reveal>

        {drosos.outcomes.length > 0 ? (
          <Reveal variant="slide-up" delay={0.1}>
            <div>
              <h3 className="text-sm font-semibold text-brand-200">
                يعزز المشروع
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {drosos.outcomes.map((outcome) => (
                  <li
                    key={t(outcome)}
                    className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xs"
                  >
                    <Icon name="check" className="size-4 text-brand-200" />
                    {t(outcome)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}

        {/*
          The one action this section exists for. Written out rather than
          routed through `buttonStyles`, whose every variant assumes a light
          surface — `cn` joins classes, it does not resolve conflicting ones,
          so overriding a variant's background here would be a coin toss.
        */}
        <Reveal variant="slide-up" delay={0.16}>
          <a
            href={routes.drosos}
            className="press inline-flex min-h-12 items-center gap-3 rounded-pill bg-surface px-7 text-base font-semibold text-ink-brand shadow-md hover:bg-primary-soft"
          >
            <span>استكشف مشروع دروسوس</span>
            {/* Rotated, not a second glyph: in an RTL line "forward" points
                left, and the icon set holds one chevron. */}
            <Icon name="chevron" className="size-4 rotate-180" />
          </a>
        </Reveal>
      </Container>
    </SectionSurface>
  );
}
