import { buildMetadata } from "@/lib/metadata";
import { YouthDrosos } from "@/sections/youth/YouthDrosos";
import { YouthHero } from "@/sections/youth/YouthHero";
import { YouthProjectsCTA } from "@/sections/youth/YouthProjectsCTA";
import { YouthTabbedExplorer } from "@/sections/youth/YouthTabbedExplorer";

export const metadata = buildMetadata({
  title: "برنامج اليافعين",
  description:
    "برنامج اليافعين في روّاد التنمية – الطفيلة منذ 2018: الفكرة، الهيكل، مسيرة كل عام، الأثر بالأرقام، ومعرض مشاريع الاستوديوهات التكنولوجية والبيئية.",
  path: "/youth",
});

/**
 * The Youth Programme Page.
 *
 * A tabbed suite so the programme's five years of record are reachable without
 * an endless scroll, the interactive studio showcase CTA linking to /projects,
 * and the closing Drosos hand-off.
 */
export default function YouthPage() {
  return (
    <>
      <YouthHero />
      <YouthTabbedExplorer />
      <YouthProjectsCTA />
      <YouthDrosos />
    </>
  );
}
