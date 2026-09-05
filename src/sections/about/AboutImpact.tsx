import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactMetrics, partnerBreakdown } from "@/data/about";

/**
 * The cumulative results.
 *
 * This was previously three sections wearing one heading: the metrics, a dark
 * panel of governorate statistics, and the partner breakdown, stacked into a
 * single block that ran well past a screen. The governorate panel has moved
 * to `AboutContext`, where it belongs — it is the reason for the work, not a
 * result of it — leaving this section with one job and two parts.
 *
 * The partner list is ordered largest first, so the shape of the network is
 * legible from the order alone; previously it was in no particular order and
 * the reader had to compare six figures by eye to find the big one.
 */
export function AboutImpact() {
  /* Summed rather than written as a literal, so the total and the rows can
     never disagree after an edit. */
  const total = partnerBreakdown.reduce(
    (sum, group) => sum + Number(group.count),
    0,
  );

  return (
    <SectionSurface id="impact" ariaLabelledBy="about-impact-title">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="about-impact-title"
          eyebrow="الأثر"
          title="ما الذي أنتجته هذه السنوات"
          description="حصيلة ثلاث عشرة سنة: كم أنهى دراسته، وكم وصلت إليه المبادرات، وما الذي مُوِّل ونُفِّذ في القرى."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <li key={metric.label}>
              <Reveal variant="slide-up" delay={index * 0.06} className="h-full">
                <article className="lift flex h-full flex-col gap-3 rounded-2xl border border-line-strong bg-surface p-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <p className="text-4xl font-bold text-ink-brand">
                      {metric.figure}
                    </p>
                    <Icon name={metric.icon} className="size-6 text-brand-300" />
                  </div>
                  <h3 className="text-base font-semibold text-ink">
                    {metric.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {metric.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* --- The partner network, broken out ------------------------- */}
        <Reveal variant="slide-up" delay={0.1}>
          <div className="flex flex-col gap-6 rounded-3xl border border-line-strong bg-surface p-6 shadow-xs sm:p-8 lg:p-10">
            <div className="flex flex-col gap-2 border-b border-line pb-5">
              {/* The heading said "شبكة الـ 420 شريكاً" while the hero already
                  led with 420. The six figures below add to it, so the reader
                  who wants the total can reach it — being told it a third time
                  is what made this section feel like an echo. */}
              <p className="text-sm font-semibold tracking-wide text-ink-brand">
                الشراكات التراكمية
              </p>
              <h3 className="text-2xl font-semibold text-ink">
                من أين تتكوّن الشبكة
              </h3>
            </div>

            {/*
              Back to the two-column list, with an icon per row.

              The bars that briefly stood here encoded one thing — relative
              size — and the reader can already see that from 229 beside 7.
              What the list could not say is what *kind* of partner each row
              counts, and that is the actual question the section asks. Six
              marks answer it before a word is read: a school, an office
              block, a ministry, a handshake, a mortarboard, people.

              Three of those glyphs did not exist and were added to `Icon` for
              this list. They are outlines, not silhouettes, because a school,
              an office and a ministry are all a building with something on
              top, and the pitched roof, the windows and the columns are
              exactly the strokes that tell them apart.
            */}
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {partnerBreakdown.map((group) => (
                <li
                  key={group.category}
                  className="flex items-center gap-4 border-b border-line/60 py-4 last:border-b-0"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-primary-soft text-ink-brand">
                    <Icon name={group.icon} className="size-5" />
                  </span>

                  {/* Fixed width so the six figures line up as a column. No
                      `data-ltr`: these are bare numerals, which already render
                      correctly in an RTL flow, and forcing LTR would flip the
                      text alignment inside this fixed box. */}
                  <span className="w-12 shrink-0 text-2xl font-bold text-ink-brand tabular-nums">
                    {group.count}
                  </span>

                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-base font-semibold text-ink">
                      {group.category}
                    </span>
                    <span className="text-sm text-ink-muted">
                      {group.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* The heading gave up its "420" so the hero could keep it, and
                the six rows do not add up on sight. This is where the total
                stays reachable. */}
            <p className="border-t border-line pt-5 text-sm text-ink-subtle">
              مجموع الشراكات التراكمية{" "}
              <span className="font-bold text-ink-brand">{total}</span> جهة
              وشخصاً.
            </p>
          </div>
        </Reveal>
      </Container>
    </SectionSurface>
  );
}
