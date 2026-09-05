import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/data/about";

/**
 * The four programme tracks the centre runs.
 *
 * This section used to open the page, directly under the hero, which put "what
 * we run" ahead of "how this started" on a page called قصتنا. It now sits
 * after the story and the timeline, where it answers the question the history
 * leaves behind: so what does the centre actually do today.
 *
 * The cards previously led with an emoji. `Icon` exists precisely to replace
 * those — see its own file for why — and the figures come from `data/about`
 * rather than being retyped here.
 */
export function AboutMission() {
  return (
    <SectionSurface
      id="pillars"
      surface="raised"
      ariaLabelledBy="about-pillars-title"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="about-pillars-title"
          eyebrow="محاور العمل"
          title="ما الذي يعمل عليه المركز اليوم"
          description="نموذج تنموي متكامل يستثمر في الشباب واليافعين والأطفال، ويعمل مع المجتمع المحلي لا بالنيابة عنه."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              variant="slide-up"
              delay={index * 0.06}
              className="h-full"
            >
              <article className="lift flex h-full flex-col gap-3 rounded-2xl border border-line bg-surface p-6 shadow-xs">
                <span className="flex size-11 items-center justify-center rounded-xl border border-brand-200 bg-primary-soft text-ink-brand">
                  <Icon name={pillar.icon} className="size-5" />
                </span>
                <h3 className="text-base font-semibold leading-snug text-ink">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionSurface>
  );
}
