import { WingField } from "@/components/decorative/WingField";
import { PageHero } from "@/components/sections/PageHero";
import { youthProgramContent } from "@/data/youth-program";
import { t } from "@/lib/i18n";

/**
 * Opening of the Youth Programme page.
 *
 * This and the story page's hero were the same layout typed out twice, so
 * neither read as its own page. Both are built on `PageHero` now, and what
 * distinguishes them is the proof each one leads with: the story page opens on
 * cumulative figures, and this one on the programme's reach plus the span it
 * has run for.
 *
 * The span used to be the string "2018 — 2025" set as a line of text. Drawn as
 * a rail it says the same thing in less space and adds what the text could
 * not: that the years are unbroken.
 */

/** The programme has run every year since it began; the rail says so. */
const START_YEAR = 2018;
const END_YEAR = 2025;

export function YouthHero() {
  const { goal, stats } = youthProgramContent;
  // The three the source deck leads with: youth reached, schools, youth in schools.
  const headline = stats.slice(0, 3);
  const years = Array.from(
    { length: END_YEAR - START_YEAR + 1 },
    (_, i) => START_YEAR + i,
  );

  return (
    <PageHero
      eyebrow="برنامج قائم منذ 2018"
      title="برنامج اليافعين"
      lead={t(goal.text)}
      /* The one page that gets the reactive field. It is a page about young
         people's energy, and it is the only inner page whose first screen is
         otherwise all figures. */
      decoration={<WingField />}
    >
      <div className="flex flex-col gap-4">
        <dl className="grid gap-3">
          {headline.map((stat) => {
            // The source writes value and unit as one Arabic phrase.
            const [figure, ...rest] = stat.value.split(" ");
            return (
              <div
                key={stat.id}
                className="flex flex-col-reverse gap-1 rounded-2xl border border-line bg-surface p-4 shadow-xs"
              >
                <dt className="text-sm leading-snug text-ink-muted">
                  {t(stat.label)}
                </dt>
                <dd className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-ink-brand" data-ltr>
                    {figure}
                  </span>
                  <span className="text-sm font-semibold text-ink-muted">
                    {rest.join(" ")}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>

        {/* Eight filled segments, one per year of operation. Decorative in the
            sense that it repeats what the labels either side already say, so
            it is hidden from assistive technology rather than announced as
            eight unlabelled items. */}
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="text-xs font-semibold text-ink-subtle" data-ltr>
            {START_YEAR}
          </span>
          <span className="flex flex-1 gap-1">
            {years.map((year) => (
              <span
                key={year}
                className="h-1.5 flex-1 rounded-pill bg-brand-400"
              />
            ))}
          </span>
          <span className="text-xs font-semibold text-ink-subtle" data-ltr>
            {END_YEAR}
          </span>
        </div>
      </div>
    </PageHero>
  );
}
