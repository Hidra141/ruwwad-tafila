import { HomeAlumni } from "@/sections/home/HomeAlumni";
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
 * Who We Are -> Our Story -> Timeline -> Programs -> Youth -> Drosos -> Alumni -> Impact -> CTA
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
      <HomeAlumni />
      {/* HomeImpact removed per Phase 06.6 */}
      <HomeCallToAction />
    </>
  );
}
