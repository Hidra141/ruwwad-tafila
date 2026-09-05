import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { alumniStageById } from "@/data/alumni-stages";
import { getStagePhoto } from "@/lib/alumni-media";
import { t } from "@/lib/i18n";
import type { AlumniJourneyEntry } from "@/types";

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
  /*
    Their own photograph or none at all.

    This used to fall back to the programme's generic session pool, choosing
    one by hashing the graduate's slug — so a graduate with no photographs of
    their own got a picture of somebody else, captioned with their name and
    the phase. Two graduates have no folder, and both of their pages were
    filled that way.

    A caption naming a person over a photograph of a different person is not a
    placeholder; it is a false statement about someone. Nothing is shown now,
    and the phase reads as text.
  */
  const photo = getStagePhoto(slug, entry.stageId, graduateName, stageName);
  const displayPhoto = photo ? { ...photo, width: 1200, height: 800 } : undefined;

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

          {/* Youth Quote & Learnings.
              The border marks the quotation; ASCII quotes around it as well
              set the words inside two marks at once. */}
          {entry.words?.ar ? (
            <blockquote className="mt-4 border-s-3 border-brand-400 ps-4 text-base leading-relaxed text-ink sm:text-lg">
              <p>{t(entry.words)}</p>
            </blockquote>
          ) : null}

          {/* --- The phase photograph -------------------------------------
              `3 / 2` rather than the shared `landscape` ratio: these are
              session photographs taken on phones in a room, and at 16/9 the
              crop cut the tops of heads off. A shallower frame keeps the
              people in it.

              `object-center` rather than `object-[center_20%]`. That offset is
              right for a posed portrait, where the face sits high in the
              frame; here the subject is a group at a table and pulling the
              crop upward pushed them out of the bottom of the frame. */}
          {displayPhoto ? (
            <figure className="mt-5">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface-sunken shadow-xs">
                <ResponsiveMedia ratio="landscape" rounded={false}>
                  <ImageFrame
                    image={displayPhoto}
                    sizes="(min-width: 64rem) 34rem, (min-width: 48rem) 44vw, 88vw"
                    fill
                    imageClassName="media-zoom object-cover object-center"
                  />
                </ResponsiveMedia>
              </div>
              {/* The caption said "صورة حقيقية من جلسة …" beside the
                  graduate's name, which reads as "this is them, here". The
                  archive records the phase a photograph belongs to and nothing
                  more — not who is in it — so the caption now claims only
                  that. */}
              <figcaption className="mt-2.5 text-xs text-ink-subtle">
                من جلسات {stageName}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </Reveal>
    </li>
  );
}
