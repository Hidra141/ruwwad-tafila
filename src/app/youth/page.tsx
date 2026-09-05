import { buildMetadata } from "@/lib/metadata";
import { YouthDrosos } from "@/sections/youth/YouthDrosos";
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
 *
 * A tabbed suite so the programme's five years of record are reachable without
 * an endless scroll, then one closing section.
 *
 * Drosos used to be the explorer's fifth tab. It is a separate project with
 * its own page, so burying it behind a control meant a reader either never
 * found it or found it and then hit the end of the page. It is the closing
 * hand-off now: last thing read, one link out.
 */
export default function YouthPage() {
  // `SiteShell` already renders the `<main>` landmark; this page used to nest a
  // second one inside it, which gives the document two mains and no way to tell
  // them apart. The `overflow-hidden` went with it — it would clip any sticky
  // positioning inside the page.
  return (
    <>
      <YouthHero />
      <YouthTabbedExplorer />
      <YouthDrosos />
    </>
  );
}
