"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { timelineMilestones } from "@/data/timeline";
import { t } from "@/lib/i18n";

export function AboutTimeline() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeMilestone = timelineMilestones[activeIndex];

  const handleNext = () => {
    if (activeIndex < timelineMilestones.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <Section spacing="compact" ariaLabelledBy="about-timeline" className="py-12 md:py-16">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="about-timeline"
          title="محطات فارقة في مسيرة روّاد الطفيلة"
          description="خط زمني تفاعلي أفقي يعرض رحلة التمكين والأثر من تأسيس المبادرة صيف 2012 وحتّى اليوم."
        />

        <Reveal variant="fade">
          <div className="relative flex flex-col gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-sm overflow-hidden">
            {/* Top Horizontal Stepper Track Bar (No scrollbar, generous px padding to prevent edge clipping) */}
            <div className="relative flex items-center justify-between px-6 sm:px-12 py-6 border-b border-line overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {/* Progress Connecting Line */}
              <div
                className="absolute top-1/2 start-12 end-12 h-1.5 -translate-y-1/2 bg-line rounded-full z-0"
                aria-hidden="true"
              >
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${(activeIndex / (timelineMilestones.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Year Node Buttons */}
              {timelineMilestones.map((milestone, idx) => {
                const isActive = idx === activeIndex;
                const isPassed = idx < activeIndex;

                return (
                  <button
                    key={milestone.year}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="group relative z-10 flex flex-col items-center focus:outline-hidden my-1"
                    title={`انتقل إلى محطة ${milestone.year}`}
                  >
                    {/* Circle Node Pill */}
                    <span
                      className={`flex size-12 sm:size-14 items-center justify-center rounded-2xl text-xs sm:text-sm font-black transition-all duration-300 ${
                        isActive
                          ? "bg-brand-600 text-white ring-4 ring-brand-100 scale-110 shadow-md"
                          : isPassed
                          ? "bg-brand-500 text-white"
                          : "border-2 border-line bg-surface text-ink-muted group-hover:border-brand-400 group-hover:text-ink shadow-xs"
                      }`}
                    >
                      {milestone.year}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Display Card */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              {/* Content Side (lg:col-span-6) */}
              <div className="flex flex-col justify-between gap-6 lg:col-span-6 order-2 lg:order-1">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-full bg-brand-50 px-3.5 py-1 text-xs font-black text-brand-800 border border-brand-200">
                      محطة {activeIndex + 1} من أصل {timelineMilestones.length}
                    </span>
                    <span className="text-xs font-bold text-ink-subtle">
                      عام {activeMilestone.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-ink leading-snug sm:text-3xl">
                    {t(activeMilestone.title)}
                  </h3>

                  {activeMilestone.description ? (
                    <p className="text-base sm:text-lg font-bold leading-relaxed text-ink-muted">
                      {t(activeMilestone.description)}
                    </p>
                  ) : null}

                  {activeMilestone.highlights && activeMilestone.highlights.length > 0 ? (
                    <div className="pt-3 border-t border-line">
                      <h4 className="text-xs font-black text-ink-subtle uppercase tracking-wider mb-2.5">
                        أبرز الإنجازات والأنشطة الموثقة:
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {activeMilestone.highlights.map((h, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2.5 rounded-xl bg-surface-muted/80 p-3 text-xs sm:text-sm font-extrabold text-ink border border-line/60"
                          >
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[0.65rem] font-black text-white">
                              ✓
                            </span>
                            <span>{t(h)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {/* RTL Corrected Navigation Toolbar */}
                <div className="flex items-center justify-between border-t border-line pt-5 mt-2">
                  {/* Previous Station Button (Move Right towards 2012) */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black transition-all ${
                      activeIndex === 0
                        ? "opacity-40 cursor-not-allowed bg-surface-muted text-ink-subtle"
                        : "bg-surface border border-line text-ink hover:border-brand-300 hover:bg-brand-50/50"
                    }`}
                  >
                    <span>→ المحطة السابقة</span>
                  </button>

                  {/* Dot Progress Indicators */}
                  <div className="flex items-center gap-1.5">
                    {timelineMilestones.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`size-2 rounded-full transition-all ${
                          dotIdx === activeIndex ? "bg-brand-600 w-5" : "bg-line"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Next Station Button (Move Left towards 2026/اليوم in RTL) */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeIndex === timelineMilestones.length - 1}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black transition-all ${
                      activeIndex === timelineMilestones.length - 1
                        ? "opacity-40 cursor-not-allowed bg-surface-muted text-ink-subtle"
                        : "bg-brand-600 text-white shadow-sm hover:bg-brand-700"
                    }`}
                  >
                    <span>المحطة التالية ←</span>
                  </button>
                </div>
              </div>

              {/* Photo Frame Side (lg:col-span-6) */}
              <div className="relative overflow-hidden rounded-2xl border border-line bg-neutral-100 lg:col-span-6 aspect-16/10 shadow-xs group order-1 lg:order-2">
                <Image
                  src={activeMilestone.image.src}
                  alt={t(activeMilestone.image.alt)}
                  fill
                  sizes="(min-width: 64rem) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-4 end-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3.5 py-1 text-xs font-black text-brand-900 backdrop-blur-md border border-line shadow-xs">
                  <span>عام {activeMilestone.year}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
