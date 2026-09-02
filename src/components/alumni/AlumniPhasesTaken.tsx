"use client";

import { useState } from "react";
import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { alumniStages } from "@/data/alumni-stages";
import {
  drososPhasePhotos,
  drososPhaseRuns,
} from "@/data/drosos-journey";
import { t } from "@/lib/i18n";

interface AlumniPhasesTakenProps {
  slug: string;
  headingId: string;
}

const PHASE_BY_STAGE: Record<string, string> = {
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

export function AlumniPhasesTaken({ slug, headingId }: AlumniPhasesTakenProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const runs = new Map(drososPhaseRuns.map((run) => [run.id, run]));

  const currentStage = alumniStages[activeIdx] || alumniStages[0];
  const phaseId = PHASE_BY_STAGE[currentStage.id];
  const run = runs.get(phaseId);
  const photos = drososPhasePhotos[phaseId] ?? [];
  const photo =
    photos.length > 0
      ? photos[
          ([...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) + activeIdx) %
            photos.length
        ]
      : undefined;

  return (
    <Section spacing="compact" ariaLabelledBy={headingId} className="py-12 md:py-16">
      <Container className="flex flex-col gap-8">
        <Reveal variant="slide-up">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black tracking-wider text-brand-600 uppercase">
              مسار التمكين الخماسي (العرض التفاعلي)
            </span>
            <h2
              id={headingId}
              className="text-3xl font-black text-ink sm:text-4xl"
            >
              المراحل التي شارك فيها الخريج
            </h2>
            <p className="text-sm font-semibold text-ink-muted sm:text-base">
              خمس مراحل متكاملة على مدار عام كامل في روّاد الطفيلة.
            </p>
          </div>
        </Reveal>

        {/* 5 Segmented Station Ribbon Cards (Horizontal Ribbon Bar) */}
        <Reveal variant="slide-up" delay={0.05}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {alumniStages.map((stage, idx) => {
              const isActive = idx === activeIdx;
              const icon = STAGE_ICONS[stage.id] || "📍";

              return (
                <button
                  key={stage.id}
                  type="button"
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
                    {t(stage.title)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Stage Details Card (Horizontal Split Layout) */}
        <Reveal variant="slide-up" delay={0.1}>
          <div className="rounded-3xl border border-line bg-gradient-to-br from-surface via-surface-muted/30 to-surface p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Info Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{STAGE_ICONS[currentStage.id] || "📍"}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-600">المرحلة 0{activeIdx + 1} من 05</span>
                    <h3 className="text-2xl font-black text-ink">{t(currentStage.title)}</h3>
                  </div>
                </div>

                {run ? (
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                    <span className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-brand-800 font-extrabold">
                      {run.sessions} جلسات تطبيقية
                    </span>
                    <span className="rounded-full bg-surface border border-line px-3 py-1 text-ink-subtle dir-ltr">
                      {run.start} — {run.end}
                    </span>
                  </div>
                ) : null}

                {run?.description ? (
                  <p className="text-base leading-relaxed font-medium text-ink-muted">
                    {t(run.description)}
                  </p>
                ) : null}
              </div>

              {/* Photo Column (5 Cols) */}
              <div className="lg:col-span-5 w-full">
                {photo ? (
                  <figure className="relative overflow-hidden rounded-2xl border border-line bg-surface-sunken shadow-md group">
                    <ResponsiveMedia ratio="landscape" rounded={false}>
                      <ImageFrame
                        image={photo}
                        fill
                        sizes="(min-width: 64rem) 28rem, (min-width: 48rem) 20rem, 100vw"
                        imageClassName="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                      />
                    </ResponsiveMedia>
                    <figcaption className="absolute bottom-2.5 start-2.5 end-2.5 rounded-xl bg-slate-950/80 border border-white/20 p-2 text-center text-[0.72rem] font-bold text-white backdrop-blur-md">
                      من جلسات {t(currentStage.title)} في روّاد الطفيلة
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
