import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { YouthStudiosShowcase } from "@/sections/youth/YouthStudiosShowcase";

export const metadata = buildMetadata({
  title: "مشاريع الاستوديوهات التكنولوجية والبيئية",
  description:
    "معرض مشاريع الاستوديوهات التكنولوجية والبيئية في روّاد التنمية – الطفيلة: ابتكارات إنترنت الأشياء والطباعة ثلاثية الأبعاد والتفكير التصميمي لليافعين.",
  path: "/projects",
});

const studioFigures = [
  { label: "مشاريع بيئية وتكنولوجية", value: "13", unit: "مشروعاً" },
  { label: "استوديو الدارات الخضراء (IoT)", value: "6", unit: "ابتكارات" },
  { label: "استوديو ابتكر للأرض (3D)", value: "7", unit: "نماذج" },
  { label: "محافظة ومجتمعات الطفيلة", value: "100%", unit: "أثر محلي" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="مختبرات الابتكار والإنتاج — روّاد التنمية الطفيلة"
        title="مشاريع الاستوديوهات التكنولوجية والبيئية"
        lead="معرض تفاعلي شامل يوثق النماذج والمخططات الهندسية والمحاكاة الرقمية والتطبيقات الفيزيائية المطبوعة لبرامج اليافعين في إنترنت الأشياء والطباعة ثلاثية الأبعاد."
      >
        <dl className="grid grid-cols-2 gap-4">
          {studioFigures.map((figure) => (
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

      <YouthStudiosShowcase showHeader={false} />
    </>
  );
}
