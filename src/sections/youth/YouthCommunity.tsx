import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * Who takes part, and the families behind them.
 *
 * Three passages from the deck: where the youth come from, what their families
 * do, and how those families back the programme.
 */
export function YouthCommunity() {
  const { beneficiaries } = youthProgramContent;

  const passages = [
    { id: "areas", heading: "من أين يأتي اليافعون", text: beneficiaries.areas },
    { id: "families", heading: "أهالي اليافعين", text: beneficiaries.families },
    {
      id: "support",
      heading: "دعم أهالينا",
      text: beneficiaries.familySupport,
    },
  ];

  return (
    <Section spacing="compact" ariaLabelledBy="youth-community">
      <Container>
        <Reveal variant="slide-up">
          <p className="text-sm font-bold tracking-wide text-ink-brand">
            مجتمع البرنامج
          </p>
          <h2
            id="youth-community"
            className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl"
          >
            اليافعون وأهاليهم
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-12">
          <div className="flex flex-col gap-6">
            {passages.map((passage, index) => (
              <Reveal
                key={passage.id}
                variant="slide-up"
                delay={Math.min(index * 0.06, 0.24)}
              >
                <article className="rounded-2xl border border-line bg-surface p-6 shadow-xs">
                  <h3 className="text-lg font-bold text-ink">
                    {passage.heading}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-pretty text-ink-muted">
                    {t(passage.text)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          {beneficiaries.image ? (
            <Reveal variant="scale" className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
                <ResponsiveMedia ratio="landscape" rounded={false}>
                  <ImageFrame
                    image={beneficiaries.image}
                    fill
                    sizes="(min-width: 64rem) 26rem, 100vw"
                  />
                </ResponsiveMedia>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
