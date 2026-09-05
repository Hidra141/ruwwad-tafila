import { HomeCallToAction } from "@/sections/home/HomeCallToAction";
import { HomeCohort } from "@/sections/home/HomeCohort";
import { HomeDrosos } from "@/sections/home/HomeDrosos";
import { HomeHero } from "@/sections/home/HomeHero";
// HomeImpact removed per Phase 06.6
import { HomeIntro } from "@/sections/home/HomeIntro";
import { HomePrograms } from "@/sections/home/HomePrograms";
// HomeTimeline removed per Phase 06.6
import { HomeYouthFeature } from "@/sections/home/HomeYouthFeature";

/**
 * Homepage for Ruwwad Al-Tanmeya – Tafila.
 *
 * Composes the continuous visual narrative:
 * Who We Are -> Programmes -> Youth -> Drosos -> Cohort -> CTA
 *
 * There were two alumni sections here, one after the other: `HomeCohort` and
 * `HomeAlumni`. Both introduced the graduates, both linked to `/alumni`, and a
 * visitor scrolled through the same invitation twice.
 *
 * `HomeCohort` is the one that stays. It shows the centre's own graduation
 * board for the 2025–2026 cohort — an image that exists nowhere else on the
 * site — where `HomeAlumni` rendered six portraits from the archive, which is
 * the archive page's own job and what the reader gets by following the link.
 * The component is left in the repository; restoring it is one import.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      {/* HomeTimeline removed per Phase 06.6 */}
      <HomePrograms />
      <HomeYouthFeature />
      <HomeDrosos />
      <HomeCohort />
      {/* HomeImpact removed per Phase 06.6 */}
      <HomeCallToAction />
    </>
  );
}
