import { buildMetadata } from "@/lib/metadata";
import { AboutCTA } from "@/sections/about/AboutCTA";
import { AboutContext } from "@/sections/about/AboutContext";
import { AboutGallery } from "@/sections/about/AboutGallery";
import { AboutHero } from "@/sections/about/AboutHero";
import { AboutImpact } from "@/sections/about/AboutImpact";
import { AboutMission } from "@/sections/about/AboutMission";
import { AboutNav } from "@/sections/about/AboutNav";
import { AboutStory } from "@/sections/about/AboutStory";
import { AboutTimeline } from "@/sections/about/AboutTimeline";

export const metadata = buildMetadata({
  title: "قصتنا",
  description:
    "قصة تأسيس ونمو مركز روّاد التنمية في الطفيلة، ورسالته في الاستثمار بتمكين الشباب واليافعين وصناعة الأثر المجتمعي.",
  path: "/about",
});

/**
 * The story page.
 *
 * The order is the argument the page makes, and it used to run backwards: the
 * four programme tracks came first, then the founding story, then the same
 * years again as a timeline, and finally an impact section that opened with
 * results and buried the governorate's own statistics — the conditions that
 * explain why any of this exists — in its middle.
 *
 * It now reads as a sequence a stranger can follow:
 *
 *   who we are (hero) → how it began (story) → why here (context) →
 *   what happened since (timeline) → what it looked like (archive) →
 *   what we run today (pillars) → what it produced (impact) → join us
 *
 * `SiteShell` already renders the `<main>` landmark, so this page returns a
 * fragment. It previously nested a second `<main>` inside the first, which
 * gives the document two main landmarks and no way to tell them apart.
 */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutNav />
      <AboutStory />
      <AboutContext />
      <AboutTimeline />
      <AboutGallery />
      <AboutMission />
      <AboutImpact />
      <AboutCTA />
    </>
  );
}
