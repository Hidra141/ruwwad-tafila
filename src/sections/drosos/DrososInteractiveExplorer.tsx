"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import {
  digitalFluencyTracks,
  drososOutcomes,
  drososPhaseRuns,
  type DrososPhaseRun,
} from "@/data/drosos-journey";
import { drososContent } from "@/data/drosos";
import { t } from "@/lib/i18n";

const studioLogos: Record<string, string> = {
  "green-circuit": "/assets/drosos/studios/green-circuit-studio-logo.jpeg",
  "innovate-for-earth": "/assets/drosos/studios/innovate-for-earth-logo.png",
};

export function DrososInteractiveExplorer() {
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"stepper" | "list">("stepper");

  const currentPhase: DrososPhaseRun = drososPhaseRuns[activeStationIndex];

  const handleNext = () => {
    if (activeStationIndex < drososPhaseRuns.length - 1) {
      setActiveStationIndex(activeStationIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeStationIndex > 0) {
      setActiveStationIndex(activeStationIndex - 1);
    }
  };

  // Helper to render studio details if current station is a studio
  const renderStudioSection = (studioId?: string, projectId?: string) => {
    if (!studioId) return null;
    const studio = drososContent.studios.find((s) => s.id === studioId);
    const project = drososContent.projects.find((p) => p.id === projectId);
    const logo = studioLogos[studioId];

    if (!studio) return null;

    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {logo && (
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-xs">
                <Image src={logo} alt={t(studio.title)} fill className="object-contain p-1" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs font-black text-brand-700">استوديو الابتكار والتصنيع الرقمي</span>
              <h4 className="text-lg font-black text-ink">{t(studio.title)}</h4>
            </div>
          </div>
        </div>

        {studio.summary ? (
          <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">{t(studio.summary)}</p>
        ) : null}

        {project ? (
          <div className="rounded-xl border border-line bg-surface p-4 flex flex-col gap-2 shadow-xs">
            <span className="text-[0.7rem] font-black text-emerald-700 uppercase">المشروع التطبيقي الناتج</span>
            <h5 className="text-sm font-bold text-ink">{t(project.title)}</h5>
            {project.summary ? (
              <p className="text-xs text-ink-subtle leading-relaxed">{t(project.summary)}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <Section spacing="compact" ariaLabelledBy="drosos-explorer" className="py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            id="drosos-explorer"
            title="المسار الزمني لمشروع دروسوس (5 محطات)"
            description="تنقل تفاعلي سلس بين محطات رحلة اليافعين من زمالة بناء الذات وصولاً للاستوديوهات والطباعة 3D."
          />

          {/* Mode Switcher Toggle */}
          <div className="inline-flex shrink-0 items-center rounded-xl border border-line bg-surface p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("stepper")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-extrabold transition-all ${
                viewMode === "stepper"
                  ? "bg-brand-600 text-white shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              التصفّح التفاعلي
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-extrabold transition-all ${
                viewMode === "list"
                  ? "bg-brand-600 text-white shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              عرض جميع المحطات
            </button>
          </div>
        </div>

        {viewMode === "stepper" ? (
          /* STEPPER INTERACTIVE VIEW */
          <Reveal variant="fade">
            <div className="relative flex flex-col gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-sm overflow-hidden">
              {/* Modern Segmented Station Ribbon Navigator */}
              <div className="flex flex-col gap-3 pb-6 border-b border-line">
                {/* Connecting Progress Bar */}
                <div className="relative h-2 w-full bg-surface-muted rounded-full overflow-hidden border border-line/60">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 rounded-full transition-all duration-500 shadow-xs"
                    style={{
                      width: `${((activeStationIndex + 1) / drososPhaseRuns.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Station Cards Grid / Scrollable Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
                  {drososPhaseRuns.map((phase, idx) => {
                    const isActive = idx === activeStationIndex;
                    const isPassed = idx < activeStationIndex;

                    return (
                      <button
                        key={phase.id}
                        type="button"
                        onClick={() => setActiveStationIndex(idx)}
                        className={`group relative flex flex-col justify-between gap-3 rounded-2xl p-4 text-start transition-all duration-300 focus:outline-hidden ${
                          isActive
                            ? "bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 text-white shadow-md ring-2 ring-brand-400 scale-[1.02]"
                            : isPassed
                            ? "bg-brand-50/70 border border-brand-200 text-ink hover:border-brand-300 hover:-translate-y-0.5"
                            : "bg-surface-muted/60 border border-line text-ink-muted hover:border-brand-300 hover:bg-surface hover:-translate-y-0.5"
                        }`}
                      >
                        {/* Top row: station number pill & sessions badge */}
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`inline-flex size-7 items-center justify-center rounded-xl text-xs font-black transition-transform duration-300 group-hover:scale-105 ${
                              isActive
                                ? "bg-white text-brand-900 shadow-xs"
                                : isPassed
                                ? "bg-brand-600 text-white"
                                : "bg-surface border border-line text-ink-subtle"
                            }`}
                          >
                            0{phase.stationIndex}
                          </span>
                          <span
                            className={`text-[0.65rem] font-extrabold px-2 py-0.5 rounded-full ${
                              isActive
                                ? "bg-white/20 text-white backdrop-blur-xs"
                                : "bg-surface border border-line text-ink-subtle"
                            }`}
                          >
                            {phase.sessions} جلسة
                          </span>
                        </div>

                        {/* Title text */}
                        <div className="flex flex-col gap-0.5 mt-1">
                          <span
                            className={`text-xs font-extrabold leading-snug line-clamp-2 ${
                              isActive ? "text-white" : "text-ink group-hover:text-brand-700"
                            }`}
                          >
                            {t(phase.title)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Station Display Card */}
              <div className="flex flex-col gap-8">
                {/* Station Header Badge & Info */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-800 border border-brand-200">
                        المحطة {currentPhase.stationIndex} من أصل 5
                      </span>
                      <span className="inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-bold text-ink-subtle border border-line">
                        {currentPhase.sessions} جلسة تطبيقية
                      </span>
                    </div>
                    <span className="text-xs font-bold text-ink-subtle dir-ltr">
                      {currentPhase.start} — {currentPhase.end}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-ink sm:text-3xl leading-snug">
                    {t(currentPhase.title)}
                  </h3>

                  <span className="text-xs font-bold text-brand-700">
                    {t(currentPhase.subtitle)}
                  </span>

                  <p className="text-base sm:text-lg font-medium leading-relaxed text-ink-muted">
                    {t(currentPhase.description)}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-black text-ink-subtle uppercase tracking-wider">
                    أبرز المهارات والمخرجات المكتسبة:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentPhase.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 rounded-xl bg-surface-muted/80 p-3 text-xs sm:text-sm font-extrabold text-ink border border-line/60"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[0.65rem] font-black text-white">
                          ✓
                        </span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Digital Fluency Track Details (for Station 2) */}
                {currentPhase.id === "digital-fluency" ? (
                  <div className="rounded-2xl border border-line bg-surface-muted/60 p-5 flex flex-col gap-3">
                    <span className="text-xs font-black text-brand-700 uppercase">
                      محاور الطلاقة الرقمية الأربعة:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {digitalFluencyTracks.map((track, i) => (
                        <div
                          key={track.id}
                          className="flex items-center gap-3 rounded-xl bg-surface p-3 border border-line shadow-xs"
                        >
                          <span className="text-xs font-black text-brand-600">
                            0{i + 1}
                          </span>
                          <span className="text-xs font-bold text-ink">{track.ar}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Studio & Project Details (for Stations 4 & 5) */}
                {renderStudioSection(currentPhase.studioId, currentPhase.projectId)}

                {/* Toolbar Controls */}
                <div className="flex items-center justify-between border-t border-line pt-5 mt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeStationIndex === 0}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black transition-all ${
                      activeStationIndex === 0
                        ? "opacity-40 cursor-not-allowed bg-surface-muted text-ink-subtle"
                        : "bg-surface border border-line text-ink hover:border-brand-300 hover:bg-brand-50/50"
                    }`}
                  >
                    <span>→ المحطة السابقة</span>
                  </button>

                  {/* Dot Progress Indicators */}
                  <div className="flex items-center gap-1.5">
                    {drososPhaseRuns.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`size-2 rounded-full transition-all ${
                          dotIdx === activeStationIndex ? "bg-brand-600 w-5" : "bg-line"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeStationIndex === drososPhaseRuns.length - 1}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black transition-all ${
                      activeStationIndex === drososPhaseRuns.length - 1
                        ? "opacity-40 cursor-not-allowed bg-surface-muted text-ink-subtle"
                        : "bg-brand-600 text-white shadow-sm hover:bg-brand-700"
                    }`}
                  >
                    <span>المحطة التالية ←</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          /* SEQUENTIAL ALL STATIONS LIST VIEW */
          <div className="flex flex-col gap-8">
            {drososPhaseRuns.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-xs"
              >
                <div className="flex flex-col gap-2 border-b border-line pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-800 border border-brand-200">
                      المحطة 0{phase.stationIndex} ({phase.sessions} جلسة)
                    </span>
                    <span className="text-xs font-bold text-ink-subtle dir-ltr">
                      {phase.start} — {phase.end}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-ink sm:text-3xl">{t(phase.title)}</h3>
                  <span className="text-xs font-bold text-brand-700">{t(phase.subtitle)}</span>
                </div>

                <p className="text-base text-ink-muted leading-relaxed">{t(phase.description)}</p>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-black text-ink-subtle uppercase">المهارات المكتسبة:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phase.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-extrabold text-ink bg-surface-muted p-2.5 rounded-xl border border-line/50">
                        <span className="text-brand-600 font-bold">✓</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {renderStudioSection(phase.studioId, phase.projectId)}
              </div>
            ))}
          </div>
        )}

        {/* Outcomes summary pill grid */}
        <Reveal variant="slide-up">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 shadow-xs flex flex-col gap-4">
            <span className="text-xs font-black text-ink-subtle uppercase tracking-wider">
              يعزز المشروع لدى اليافعين:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {drososOutcomes.map((outcome, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-brand-200 bg-brand-50/70 px-4 py-2 text-xs sm:text-sm font-extrabold text-brand-900"
                >
                  {t(outcome)}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
