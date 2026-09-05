import { PageHero } from "@/components/sections/PageHero";
import { glanceFigures } from "@/data/about";

/**
 * Opening of the story page.
 *
 * The layout, the offset that clears the fixed header, and the gradient now
 * live in `PageHero`, shared with every other inner page. What is left here is
 * the only part that belongs to this page: which four figures it opens on.
 *
 * They are the page's reserved numbers. Nothing further down repeats them —
 * the programme cards dropped their statistics, and the impact section was
 * rebuilt around the outcomes these four produce.
 */
export function AboutHero() {
  return (
    <PageHero
      eyebrow="روّاد التنمية – الطفيلة"
      title="قصتنا"
      lead="&quot;روّاد التنمية&quot; هي مؤسسة غير ربحية تعمل مع المجتمعات التي تسعى للتغلب على التهميش من خلال التعليم والبرامج الشبابية التطوعية وتنظيم العمل الأهلي مع القواعد الشعبية. يركز نهج عملنا على تمتين روح المبادرة وتيسير مراجعة وتأطير الأولويات الملحة لحل المشكلات المجتمعية بمشاركة أفراد المجتمع المحلي. نموذج روّاد يتضمن أربع برامج رئيسة: تنمية الطفل، تنمية اليافعين، تنظيم وبناء قيادة الشباب، ودعم المجتمع."
    >
      <dl className="grid grid-cols-2 gap-4">
        {glanceFigures.map((figure) => (
          /* `dt` before `dd` is the order the spec requires; the column is
             reversed visually so the figure still reads first. */
          <div
            key={figure.label}
            className="flex flex-col-reverse gap-2 rounded-2xl border border-line bg-surface p-5 shadow-xs"
          >
            <dt className="text-sm leading-snug text-ink-muted">
              {figure.label}
            </dt>
            <dd className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-ink-brand sm:text-4xl" data-ltr>
                {figure.value}
              </span>
              {figure.unit ? (
                <span className="text-sm font-semibold text-ink-muted">
                  {figure.unit}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </PageHero>
  );
}
