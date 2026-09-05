import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { governorateContext } from "@/data/about";

/**
 * The governorate's own numbers — distance, unemployment, schools.
 *
 * These were previously a card buried in the middle of the impact section,
 * which put the conditions the work responds to *after* the results it
 * produced. They read as context for the impact rather than as the reason any
 * of it exists. Moved here, straight after the founding story, they answer
 * the question a reader is actually holding at that point: why Tafila.
 *
 * This ran as a near-black band until now. The page also closes on one, and
 * two maximum contrasts in a single page means neither is the stopping point —
 * the eye has nowhere to land last. The dark is now spent entirely on the
 * closing call to action, and this section takes `tint`: still a clear step
 * out of the narrative, still the only one of its kind on the page, but no
 * longer competing for the same job.
 *
 * The wing carries the identity here instead of the darkness.
 *
 * The content was reframed too. This read as an outsider's diagnosis — three
 * of the governorate's deficits under a heading about "challenges" — which is
 * the wrong voice for a page written by an organisation whose staff live
 * there. Each figure now carries the decision it produced, so the section
 * argues for the programmes instead of apologising for the place.
 */
export function AboutContext() {
  return (
    <SectionSurface
      id="context"
      surface="tint"
      pattern
      ariaLabelledBy="about-context-title"
    >
      <Container className="flex flex-col gap-10">
        <Reveal variant="slide-up">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold tracking-wide text-ink-brand">
              لماذا الطفيلة
            </p>
            <h2
              id="about-context-title"
              className="max-w-(--container-content) text-3xl font-semibold text-balance text-ink"
            >
              محافظة فتيّة، وبرامج مبنية على معطياتها
            </h2>
            <p className="max-w-(--container-content) text-lg text-ink-muted">
              المركز من الطفيلة ويعمل فيها، وكل معطى أدناه هو سبب مباشر في شكل
              برنامج قائم — لا وصفاً لمشكلة.
            </p>
          </div>
        </Reveal>

        {/* A `dl` would be the tempting markup, but each entry carries a
            figure, a label and a sentence of prose — and a `dl` may only
            contain `dt`/`dd`. A list of short articles is the honest shape. */}
        <ul className="grid gap-4 md:grid-cols-3">
          {governorateContext.map((fact, index) => (
            <li key={fact.label}>
              <Reveal variant="slide-up" delay={index * 0.08} className="h-full">
                {/* White cards on the tint, the same relationship the `raised`
                    sections use: the card has to be lighter than its ground or
                    it stops reading as a card at all. */}
                <div className="flex h-full flex-col gap-2 rounded-2xl border border-brand-200 bg-surface p-6 shadow-xs">
                  {/* No `data-ltr`: two of these figures carry an Arabic unit
                      ("180 كم"), and forcing LTR would put the numeral on the
                      wrong side of the word. Bare Latin numerals already
                      render correctly inside an RTL paragraph. */}
                  <p className="text-3xl font-bold text-ink-brand">
                    {fact.figure}
                  </p>
                  <h3 className="text-base font-semibold text-ink">
                    {fact.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {fact.description}
                  </p>

                  {/* The response is what turns the figure from a complaint
                      into a reason. It sits below a rule so the eye reads the
                      two as a pair — the given, then the answer to it. */}
                  <p className="mt-auto flex gap-2.5 border-t border-line pt-4 text-sm leading-relaxed text-ink">
                    <Icon
                      name="check"
                      className="mt-1 size-4 shrink-0 text-ink-brand"
                    />
                    <span>{fact.response}</span>
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </SectionSurface>
  );
}
