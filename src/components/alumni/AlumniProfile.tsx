import type { Alumni, AlumniNeighbours } from "@/types";

import { AlumniJourney } from "./AlumniJourney";
import { AlumniJourneyGallery } from "./AlumniJourneyGallery";
import { AlumniPhasesTaken } from "./AlumniPhasesTaken";
import { AlumniProfileCTA } from "./AlumniProfileCTA";
import { AlumniProfileHero } from "./AlumniProfileHero";
import { AlumniVoice } from "./AlumniVoice";

interface AlumniProfileProps {
  alumni: Alumni;
  /** `1` on the standalone page; `2` in the overlay, which sits under an h1. */
  headingLevel?: 1 | 2;
  /** Enables the closing previous/next band. Omitted in the overlay. */
  neighbours?: AlumniNeighbours;
}

/**
 * A graduate's story, in one order: their face, their voice, their journey,
 * their photographs, and the way on to the next story.
 *
 * Every section decides for itself whether it has anything to show, so this
 * stays a plain sequence — a graduate with a portrait and nothing else renders
 * a short, complete page rather than a page of empty headings.
 *
 * Shared by the standalone route and the intercepted overlay so the two can
 * never drift apart.
 */
export function AlumniProfile({
  alumni,
  headingLevel = 1,
  neighbours,
}: AlumniProfileProps) {
  return (
    <article>
      <AlumniProfileHero alumni={alumni} headingLevel={headingLevel} />
      {/*
        Their own words where the source has them; otherwise the programme's
        five phases, described as the programme rather than as their voice.
      */}
      {alumni.journey && alumni.journey.length > 0 ? (
        <AlumniJourney
          journey={alumni.journey}
          slug={alumni.slug}
          graduateName={alumni.name.ar}
          headingId={`${alumni.slug}-journey`}
        />
      ) : (
        <AlumniPhasesTaken
          slug={alumni.slug}
          headingId={`${alumni.slug}-phases`}
        />
      )}
      <AlumniJourneyGallery
        alumni={alumni}
        headingId={`${alumni.slug}-gallery`}
      />
      <AlumniProfileCTA neighbours={neighbours} />
    </article>
  );
}
