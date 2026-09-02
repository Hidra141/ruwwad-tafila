"use client";

import { useState } from "react";
import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { alumniStageById, alumniStages } from "@/data/alumni-stages";
import { getStagePhotoClient } from "@/data/alumni-journey-photos";
import { drososPhasePhotos } from "@/data/drosos-journey";
import { t } from "@/lib/i18n";
import type { AlumniJourneyEntry } from "@/types";

interface AlumniJourneyProps {
  journey?: AlumniJourneyEntry[];
  slug: string;
  graduateName: string;
  headingId: string;
}

const STAGE_TO_PHASE: Record<string, string> = {
  foundation: "design-foundation",
  "digital-fluency": "digital-fluency",
  "studio-green-circuit": "studio-one",
  "studio-innovate-earth": "studio-two",
  fellowship: "fellowship",
};

const STAGE_ICONS: Record<string, string> = {
  fellowship: "⚡",
  "digital-fluency": "💻",
  foundation: "💡",
  "studio-green-circuit": "⚙️",
  "studio-innovate-earth": "🖨️",
};

const stageOrder = new Map(alumniStages.map((s) => [s.id, s.order]));

function phaseCount(n: number): string {
  if (n === 1) return "مرحلة واحدة";
  if (n === 2) return "مرحلتان";
  if (n <= 10) return `${n} مراحل`;
  return `${n} مرحلة`;
}

export function AlumniJourney({
  journey,
  slug,
  graduateName,
  headingId,
}: AlumniJourneyProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  if (!journey || journey.length === 0) return null;

  const ordered = [...journey].sort(
    (a, b) => (stageOrder.get(a.stageId) ?? 0) - (stageOrder.get(b.stageId) ?? 0),
  );

  const activeEntry = ordered[activeIdx] || ordered[0];
  const activeStageDef = alumniStageById[activeEntry.stageId];
  const activeStageName = t(activeStageDef.title);
  const activePhoto = getStagePhotoClient(slug, activeEntry.stageId, graduateName, activeStageName);

  const phasePhotos = drososPhasePhotos[STAGE_TO_PHASE[activeEntry.stageId]] ?? [];
  const fallback =
    !activePhoto && phasePhotos.length > 0
      ? phasePhotos[
          [...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
            phasePhotos.length
        ]
      : undefined;

  const displayPhoto = activePhoto ? { ...activePhoto, width: 1200, height: 800 } : fallback;

  return (
    <Section spacing="compact" ariaLabelledBy={headingId} className="py-12 md:py-16">
      <Container className="flex flex-col gap-8">
        {/* Section Heading */}
        <Reveal variant="slide-up">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black tracking-wider text-brand-600 uppercase">
              مسار التعلم الخماسي العرضي
            </span>
            <h2
              id={headingId}
              className="text-3xl font-black text-ink sm:text-4xl"
            >
              محطات تعلم اليافع/ة في دروسوس
            </h2>
            <p className="text-sm font-semibold text-ink-muted sm:text-base">
              {`${phaseCount(ordered.length)} مصورة وموثقة بكلمات وشواهد ${graduateName}`}
            </p>
          </div>
        </Reveal>

        {/* 5 Segmented Station Ribbon Cards (Horizontal Ribbon Bar) */}
        <Reveal variant="slide-up" delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {ordered.map((entry, idx) => {
              const stageDef = alumniStageById[entry.stageId];
              const titleText = t(stageDef.title);
              const icon = STAGE_ICONS[entry.stageId] || "📍";
              const isActive = idx === activeIdx;

              return (
                <button
                  key={entry.stageId}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex flex-col text-start gap-2 rounded-2xl border p-3.5 transition-all duration-300 ${
                    isActive
                      ? "border-brand-500 bg-brand-500 text-white shadow-md ring-2 ring-brand-300"
                      : "border-line bg-surface text-ink hover:border-brand-300 hover:bg-surface-muted/60 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{icon}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.65rem] font-black ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-brand-50 text-brand-700 border border-brand-200/60"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <span className={`text-xs font-black line-clamp-1 ${isActive ? "text-white" : "text-ink"}`}>
                    {titleText}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Stage Details Card (Horizontal Grid Layout) */}
        <Reveal variant="slide-up" delay={0.1}>
          <div className="rounded-3xl border border-line bg-gradient-to-br from-surface via-surface-muted/30 to-surface p-6 sm:p-8 md:p-10 shadow-sm transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text & Learnings Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{STAGE_ICONS[activeEntry.stageId] || "📍"}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-600">المرحلة 0{activeIdx + 1} من 05</span>
                    <h3 className="text-2xl font-black text-ink">{activeStageName}</h3>
                  </div>
                </div>

                {activeEntry.words?.ar ? (
                  <blockquote className="relative rounded-2xl border-s-4 border-brand-500 bg-surface p-5 shadow-2xs">
                    <p className="text-base sm:text-lg font-semibold leading-relaxed text-ink">
                      "{t(activeEntry.words)}"
                    </p>
                    <span className="mt-3 block text-xs font-bold text-ink-subtle">
                      — بكلمات اليافع/ة {graduateName}
                    </span>
                  </blockquote>
                ) : null}

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-ink-muted">
                  <span className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-brand-800 font-extrabold">
                    جلسات تطبيقية وتدريب
                  </span>
                  <span className="rounded-full bg-surface border border-line px-3 py-1 text-ink">
                    روّاد التنمية — الطفيلة
                  </span>
                </div>
              </div>

              {/* Real Stage Photo Column (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                {displayPhoto ? (
                  <figure className="flex flex-col gap-2">
                    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-sunken shadow-md group">
                      <ResponsiveMedia ratio="landscape" rounded={false}>
                        <ImageFrame
                          image={displayPhoto}
                          fill
                          priority
                          sizes="(min-width: 64rem) 28rem, (min-width: 48rem) 20rem, 100vw"
                          imageClassName="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                        />
                      </ResponsiveMedia>
                    </div>
                    <figcaption className="text-center text-xs font-extrabold text-ink-subtle">
                      صورة حقيقية من جلسة {activeStageName} — {graduateName}
                    </figcaption>
                  </figure>
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-line bg-surface-sunken p-6 text-center text-xs text-ink-subtle">
                    صورة هذه المرحلة قيد التوثيق
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
