import { ImageFrame } from "@/components/media/ImageFrame";
import { Reveal } from "@/components/motion/Reveal";
import { AppLink } from "@/components/ui/AppLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";
import { getAllAlumni } from "@/lib/alumni";

/**
 * The second cohort, as one photograph.
 *
 * Twenty faces do more to introduce the archive than any heading, so the image
 * leads and the words follow it. It is the centre's own graduation board — the
 * names are printed in the artwork itself, which is why the alt text describes
 * the group rather than listing them a second time.
 */
export function HomeCohort() {
  const count = getAllAlumni().length;

  return (
    <Section spacing="compact" ariaLabelledBy="home-cohort">
      <Container>
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            الفوج الثاني
          </p>
          <h2
            id="home-cohort"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            الوجوه التي صنعت الرحلة
          </h2>
          <p className="mt-3 max-w-(--container-content) text-base text-pretty text-ink-muted sm:text-lg">
            اليافعون واليافعات المشاركون في رحلة برنامج تنمية اليافعين
            <span data-ltr> 2025–2026</span> — زمالة «تواصل مع قوتك»، الطلاقة
            الديجيتالية، والتفكير التصميمي.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
            <ImageFrame
              image={{
                src: "/assets/alumni/cohort-2025-2026.webp",
                alt: {
                  ar: "لوحة تخريج الفوج الثاني من برنامج تنمية اليافعين في روّاد الطفيلة، وتضم صور المشاركين وأسماءهم",
                },
                width: 1600,
                height: 685,
              }}
              sizes="(min-width: 80rem) 76rem, 100vw"
            />
          </div>
        </Reveal>

        <Reveal variant="slide-up" delay={0.18}>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <AppLink href={routes.alumni} variant="primary">
              اقرأ قصصهم
            </AppLink>
            <p className="text-sm text-ink-muted">
              {`${count} خريجاً وخريجة، لكل منهم صفحته ورحلته.`}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
