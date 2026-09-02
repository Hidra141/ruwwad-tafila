import { buildMetadata } from "@/lib/metadata";
import { YouthHero } from "@/sections/youth/YouthHero";
import { YouthTabbedExplorer } from "@/sections/youth/YouthTabbedExplorer";

export const metadata = buildMetadata({
  title: "برنامج اليافعين",
  description:
    "برنامج اليافعين في روّاد التنمية – الطفيلة منذ 2018: الفكرة، الهيكل، مسيرة كل عام، الأثر بالأرقام، والإنجازات.",
  path: "/youth",
});

/**
 * The Youth Programme Page.
 * Streamlined into an interactive tabbed suite for instant access without endless scrolling.
 */
export default function YouthPage() {
  return (
    <main className="flex flex-col overflow-hidden">
      <YouthHero />
      <YouthTabbedExplorer />
    </main>
  );
}
