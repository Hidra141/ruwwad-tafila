import { buildMetadata } from "@/lib/metadata";
import { AboutCTA } from "@/sections/about/AboutCTA";
import { AboutGallery } from "@/sections/about/AboutGallery";
import { AboutHero } from "@/sections/about/AboutHero";
import { AboutImpact } from "@/sections/about/AboutImpact";
import { AboutMission } from "@/sections/about/AboutMission";
import { AboutStory } from "@/sections/about/AboutStory";
import { AboutTimeline } from "@/sections/about/AboutTimeline";

export const metadata = buildMetadata({
  title: "قصتنا",
  description: "قصة تأسيس ونمو مركز روّاد التنمية في الطفيلة، ورسالته في الاستثمار بتمكين الشباب واليافعين وصناعة الأثر المجتمعي.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-4 overflow-hidden">
      <AboutHero />
      <AboutMission />
      <AboutStory />
      <AboutGallery />
      <AboutTimeline />
      <AboutImpact />
      <AboutCTA />
    </main>
  );
}
