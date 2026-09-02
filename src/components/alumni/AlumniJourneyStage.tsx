import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { alumniStageById } from "@/data/alumni-stages";
import { drososPhasePhotos } from "@/data/drosos-journey";
import { getStagePhoto } from "@/lib/alumni-media";
import { t } from "@/lib/i18n";
import type { AlumniJourneyEntry } from "@/types";

/** The alumni phase ids and the Drosos phase folders are named differently. */
const STAGE_TO_PHASE: Record<string, string> = {
  foundation: "design-foundation",
  "digital-fluency": "digital-fluency",
  "studio-green-circuit": "studio-one",
  "studio-innovate-earth": "studio-two",
  fellowship: "fellowship",
};

interface AlumniJourneyStageProps {
  entry: AlumniJourneyEntry;
  /** Position in this graduate's own journey, rendered as 01 … 05. */
  index: number;
  /** Suppresses the connecting rail below the final node. */
  isLast: boolean;
  /** Used to find this phase's photograph on disk. */
  slug: string;
  graduateName: string;
}

/**
 * One phase of a graduate's journey: the numeral, the phase name, and the
 * graduate's own words about it.
 *
 * The words are quoted rather than described, because they are the graduate
 * speaking — the source documents record first-person accounts, and flattening
 * them into third-person copy would misrepresent them.
 */
export function AlumniJourneyStage({
  entry,
  index,
  isLast,
  slug,
  graduateName,
}: AlumniJourneyStageProps) {
  const stage = alumniStageById[entry.stageId];
  const ordinal = String(index + 1).padStart(2, "0");
  const stageName = t(stage.title);
  const photo = getStagePhoto(slug, entry.stageId, graduateName, stageName);

  const phasePhotos = drososPhasePhotos[STAGE_TO_PHASE[entry.stageId]] ?? [];
  const fallback =
    !photo && phasePhotos.length > 0
      ? phasePhotos[
          [...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
            phasePhotos.length
        ]
      : undefined;

  const displayPhoto = photo ? { ...photo, width: 1200, height: 800 } : fallback;

  return (
    <li id={`stage-${entry.stageId}`} className="relative flex gap-4 sm:gap-7">
      {/* Timeline Node & Rail */}
      <div className="relative flex shrink-0 flex-col items-center">
        <span
          aria-hidden="true"
          className="flex size-11 sm:size-14 items-center justify-center rounded-2xl border border-brand-300 bg-brand-50 text-xs sm:text-base font-black text-brand-800 shadow-xs ring-2 ring-brand-100"
        >
          {ordinal}
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className="mt-3 w-0.5 flex-1 bg-gradient-to-b from-brand-300 via-brand-200 to-line"
          />
        ) : null}
      </div>

      <Reveal
        variant="slide-up"
        delay={Math.min(index * 0.08, 0.32)}
        className="min-w-0 flex-1 pb-8 last:pb-0 sm:pb-12"
      >
        <div className="group rounded-3xl border border-line bg-surface p-5 sm:p-7 shadow-xs transition-all duration-300 hover:border-brand-300 hover:shadow-md">
          {/* Card Header & Stage Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-[0.7rem] sm:text-xs font-black text-brand-700">
              <span>المرحلة {ordinal}</span>
              <span>•</span>
              <span>{stageName}</span>
            </span>
            <span className="text-[0.72rem] font-bold text-ink-subtle">
              روّاد التنمية بالطفيلة
            </span>
          </div>

          {/* Youth Quote & Learnings */}
          {entry.words?.ar ? (
            <blockquote className="mt-4 border-s-3 border-brand-400 ps-4 text-base font-medium leading-relaxed text-ink sm:text-lg">
              <p>"{t(entry.words)}"</p>
            </blockquote>
          ) : null}

          {/* Stage Photo Frame */}
          {displayPhoto ? (
            <figure className="mt-5">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface-sunken shadow-2xs">
                <ResponsiveMedia ratio="landscape" rounded={false}>
                  <ImageFrame
                    image={displayPhoto}
                    fill
                    sizes="(min-width: 48rem) 34rem, 90vw"
                    imageClassName="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  />
                </ResponsiveMedia>
              </div>
              <figcaption className="mt-2.5 flex items-center justify-between text-xs font-semibold text-ink-subtle">
                <span>صورة حقيقية من جلسة {stageName}</span>
                <span className="text-brand-600 font-bold">{graduateName}</span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </Reveal>
    </li>
  );
}
