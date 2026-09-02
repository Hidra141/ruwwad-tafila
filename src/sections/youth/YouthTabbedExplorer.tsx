"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";
import { TabList, TabPanel } from "@/components/ui/TabList";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { youthProgramContent } from "@/data/youth-program";
import { t, tRich } from "@/lib/i18n";

type MainTab = "overview" | "timeline" | "impact" | "highlights" | "drosos";

const TABS: Array<{ id: MainTab; label: string }> = [
  { id: "overview", label: "الفكرة والهدف" },
  { id: "timeline", label: "مسيرة الأعوام" },
  { id: "impact", label: "الأثر والمجتمع" },
  { id: "highlights", label: "الإنجازات" },
  { id: "drosos", label: "مشروع دروسوس" },
];

export function YouthTabbedExplorer() {
  const [activeTab, setActiveTab] = useState<MainTab>("overview");
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const activeTimelineYear =
    youthProgramContent.timeline.find((item) => item.year === selectedYear) ??
    youthProgramContent.timeline[youthProgramContent.timeline.length - 1];

  const originParagraphs = tRich(youthProgramContent.origin.paragraphs);

  return (
    <Section className="relative overflow-hidden pt-8 pb-16">
      <Container className="flex flex-col gap-10">
        <Reveal variant="fade">
          <TabList
            label="أقسام برنامج اليافعين"
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            idPrefix="youth"
          />
        </Reveal>

        <TabPanel activeTab={activeTab} idPrefix="youth">
        {/* Tab 1: Overview & Goal */}
        {activeTab === "overview" && (
          <Reveal variant="slide-up">
            <div className="flex flex-col gap-8">
              {/* Goal Card */}
              <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50/80 via-surface to-brand-50/30 p-8 shadow-xs md:p-10">
                <div className="flex flex-col gap-4">
                  <span className="inline-flex w-fit rounded-full bg-brand-100 px-3.5 py-1 text-xs font-bold text-brand-800 border border-brand-200">
                    هدف برنامج اليافعين
                  </span>
                  <p className="text-xl font-bold leading-relaxed text-ink md:text-2xl">
                    {t(youthProgramContent.goal.text)}
                  </p>
                </div>
              </div>

              {/* Origin Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                    <Icon name="idea" className="size-5 text-brand-600" />
                    <span>فكرة استحداث البرنامج</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {originParagraphs[0]}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                    <Icon name="sprout" className="size-5 text-brand-600" />
                    <span>ركائز النمو والتطبيق</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {originParagraphs[1]}
                  </p>
                </div>
              </div>

              {/* 13 Components Grid */}
              <div className="rounded-3xl border border-line bg-surface p-6 md:p-8 shadow-xs flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-extrabold text-ink">
                    مكونات هيكل برنامج اليافعين المحدث (2026)
                  </h3>
                  <p className="text-xs font-semibold text-ink-subtle">
                    {t(youthProgramContent.structure.intro)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {youthProgramContent.structure.components.map((c, i) => (
                    <div
                      key={c.id}
                      className="group flex items-center gap-2.5 rounded-xl border border-line bg-surface-muted p-3 text-xs font-bold text-ink transition-all hover:border-brand-300 hover:bg-surface hover:shadow-xs"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-[0.7rem] font-black text-brand-700">
                        {i + 1}
                      </span>
                      <span>{t(c.title)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Tab 2: Interactive Timeline (2018 - 2025) */}
        {activeTab === "timeline" && (
          <Reveal variant="slide-up">
            <div className="flex flex-col gap-8">
              {/* Year Switcher Pills */}
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
                {youthProgramContent.timeline.map((item) => {
                  const isSelected = item.year === selectedYear;
                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => setSelectedYear(item.year)}
                      className={`relative rounded-xl px-5 py-2.5 text-sm font-black transition-all ${
                        isSelected
                          ? "bg-primary text-ink-inverse shadow-md scale-105"
                          : "border border-line bg-surface text-ink-muted hover:border-brand-300 hover:text-ink"
                      }`}
                    >
                      {item.year}
                    </button>
                  );
                })}
              </div>

              {/* Active Year Details */}
              {activeTimelineYear && (
                <div className="rounded-3xl border border-line bg-surface p-6 md:p-10 shadow-xs flex flex-col gap-8">
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                        <Icon name="calendar" />
                      </span>
                      <h3 className="text-2xl font-black text-ink">
                        إنجازات وأنشطة عام {activeTimelineYear.year}
                      </h3>
                    </div>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200">
                      محطة موثقة
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {tRich(activeTimelineYear.paragraphs).map((paragraph, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-line/60 bg-surface-muted/50 p-4 text-sm leading-relaxed text-ink-muted"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                          <Icon name="check" className="size-3" />
                        </span>
                        <span>{paragraph}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Photo Gallery for Active Year */}
                  {activeTimelineYear.images && activeTimelineYear.images.length > 0 && (
                    <div className="flex flex-col gap-3 pt-4 border-t border-line">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-ink-subtle">
                        لقطات موثقة من أنشطة عام {activeTimelineYear.year}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {activeTimelineYear.images.map((img, i) => (
                          <div
                            key={i}
                            className="group relative overflow-hidden rounded-xl bg-neutral-100 aspect-4/3 shadow-xs"
                          >
                            <ResponsiveMedia ratio="landscape" rounded={false}>
                              <ImageFrame
                                image={img}
                                fill
                                sizes="(min-width: 48rem) 25vw, 50vw"
                                imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </ResponsiveMedia>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* Tab 3: Impact & Community */}
        {activeTab === "impact" && (
          <Reveal variant="slide-up">
            <div className="flex flex-col gap-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                {youthProgramContent.stats.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-xs lift hover:border-brand-300"
                  >
                    <span className="text-xl font-black text-ink-brand md:text-2xl">
                      {s.value}
                    </span>
                    <span className="mt-2 text-xs font-semibold text-ink-subtle leading-tight">
                      {t(s.label)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Beneficiaries Detail Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                    <Icon name="pin" className="size-4" />
                    <span>المناطق والقرى المستفيدة</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {t(youthProgramContent.beneficiaries.areas)}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                    <Icon name="community" className="size-4" />
                    <span>دعم وشراكة الأهالي</span>
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {t(youthProgramContent.beneficiaries.familySupport)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Tab 4: Highlights & Achievements */}
        {activeTab === "highlights" && (
          <Reveal variant="slide-up">
            <div className="rounded-3xl border border-line bg-surface p-6 md:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-extrabold text-ink">
                  محطات الفوز والإنجازات البارزة (2018 - 2025)
                </h3>
                <p className="text-xs font-semibold text-ink-subtle">
                  أبرز المسابقات، والجوائز، والمبادرات الريادية التي حققها يافعو روّاد الطفيلة.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {youthProgramContent.highlights.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 rounded-2xl border border-line bg-surface-muted/60 p-5 shadow-xs transition-all hover:border-brand-300 hover:bg-surface"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                      <Icon name="trophy" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="w-fit rounded-md bg-accent-50 px-2 py-0.5 text-[0.7rem] font-bold text-accent-800 border border-accent-200">
                        {item.years}
                      </span>
                      <p className="text-sm font-bold leading-relaxed text-ink">
                        {t(item.text)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Tab 5: Drosos Project Inside */}
        {activeTab === "drosos" && (
          <Reveal variant="slide-up">
            <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 text-white shadow-xl md:p-12">
              <div className="relative z-10 flex flex-col gap-6">
                <span className="inline-flex w-fit rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold text-white backdrop-blur-md">
                  مشروع جسور الكرامة – دروسوس
                </span>

                <h3 className="text-2xl font-black text-white md:text-3xl">
                  {t(youthProgramContent.drosos.title)}
                </h3>

                <p className="text-base leading-relaxed text-brand-100 md:text-lg max-w-3xl">
                  {t(youthProgramContent.drosos.description)}
                </p>

                <div className="pt-4 border-t border-white/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-200 mb-3">
                    المخرجات الرئيسية للمشروع:
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {youthProgramContent.drosos.outcomes.map((o, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-pill bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md"
                      >
                        <Icon name="check" className="size-3.5" />
                        {t(o)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
        </TabPanel>
      </Container>
    </Section>
  );
}
