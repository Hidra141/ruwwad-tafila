"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { studioProjectsData, type StudioProject, type StudioInfo } from "@/data/studio-projects";

interface YouthStudiosShowcaseProps {
  showHeader?: boolean;
}

export function YouthStudiosShowcase({ showHeader = true }: YouthStudiosShowcaseProps) {
  const [activeStudioId, setActiveStudioId] = useState<"studio-1" | "studio-2">("studio-1");
  const [selectedProject, setSelectedProject] = useState<StudioProject | null>(null);
  const [mobileViewMode, setMobileViewMode] = useState<"carousel" | "grid">("carousel");
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);

  const activeStudio: StudioInfo =
    studioProjectsData.find((s) => s.id === activeStudioId) ?? studioProjectsData[0];

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    // In RTL, scrollLeft can be negative or positive depending on browser implementation
    const scrollPos = Math.abs(scrollLeft);
    const cardWidth = clientWidth * 0.85;
    const index = Math.round(scrollPos / cardWidth);
    setActiveCardIndex(Math.min(index, activeStudio.projects.length - 1));
  };

  const scrollToCard = (idx: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth * 0.85;
    const targetScroll = (carouselRef.current.dir === "rtl" ? -1 : 1) * idx * cardWidth;
    carouselRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
    setActiveCardIndex(idx);
  };

  return (
    <Section id="studios-showcase" spacing="default" className="relative overflow-hidden bg-surface-muted/30 border-y border-line">
      {/* Background Decorative Ambient Blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -start-40 size-96 rounded-full bg-brand-500/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -end-40 size-96 rounded-full bg-emerald-500/5 blur-3xl"
      />

      <Container className="flex flex-col gap-8 md:gap-10">
        {/* Optional Section Header */}
        {showHeader ? (
          <SectionHeading
            eyebrow="مختبرات الابتكار والإنتاج البيئي"
            title="معرض مشاريع الاستوديوهات التكنولوجية"
            description="حلول تطبيقية حقيقية صممها وابتكرها يافعو ويافعات روّاد التنمية بالطفيلة لمواجهة التحديات البيئية والمجتمعية عبر الإلكترونيات المتقدمة والطباعة ثلاثية الأبعاد."
          />
        ) : null}

        {/* Studio Switcher Toggle */}
        <Reveal variant="slide-up">
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2.5 rounded-3xl border border-line bg-surface p-2 shadow-xs">
            {studioProjectsData.map((studio) => {
              const isSelected = studio.id === activeStudioId;
              const isStudio1 = studio.id === "studio-1";

              return (
                <button
                  key={studio.id}
                  onClick={() => {
                    setActiveStudioId(studio.id);
                    setActiveCardIndex(0);
                    if (carouselRef.current) carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
                  }}
                  className={`relative flex flex-1 items-center justify-between gap-3 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 transition-all duration-300 ${
                    isSelected
                      ? isStudio1
                        ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20"
                        : "bg-gradient-to-r from-teal-600 to-sky-700 text-white shadow-md shadow-sky-700/20"
                      : "text-ink hover:bg-surface-muted/60"
                  }`}
                >
                  <div className="flex items-center gap-3 text-start">
                    <span className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl sm:text-2xl backdrop-blur-xs">
                      {isStudio1 ? "⚡" : "🖨️"}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[0.7rem] sm:text-xs font-bold opacity-85 line-clamp-1">
                        {isStudio1 ? "الاستوديو الأول — الأردوينو والدارات" : "الاستوديو الثاني — النمذجة والطباعة 3D"}
                      </span>
                      <span className="text-sm sm:text-lg font-black">{studio.titleEn}</span>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[0.65rem] sm:text-xs font-black ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-brand-50 text-brand-700 border border-brand-200/60"
                    }`}
                  >
                    {studio.projects.length} مشاريع
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Studio Intro Banner */}
        <Reveal variant="slide-up" delay={0.05}>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface via-surface to-surface-muted/50 p-5 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Text Info (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black ${activeStudio.themeColor.badge}`}>
                    <span>📍</span>
                    <span>{activeStudio.title}</span>
                  </span>
                  <span className="rounded-full bg-surface border border-line px-3 py-0.5 sm:py-1 text-[0.7rem] sm:text-xs font-bold text-ink-muted">
                    شعار الاستوديو: {activeStudio.tagline}
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-ink">
                  {activeStudio.title} ({activeStudio.titleEn})
                </h3>

                <p className="text-xs sm:text-base leading-relaxed text-ink-muted">
                  {activeStudio.description}
                </p>

                {/* Focus Areas Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {activeStudio.focusAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-muted/60 px-2.5 py-1 text-[0.7rem] sm:text-xs font-bold text-ink"
                    >
                      <span className="size-1.5 rounded-full bg-brand-500 shrink-0" />
                      <span>{area}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Studio Cover Banner Image (4 Cols) */}
              <div className="lg:col-span-4 w-full">
                <div className="relative overflow-hidden rounded-2xl border border-line shadow-sm bg-surface-sunken aspect-[16/9] sm:aspect-[16/10]">
                  <Image
                    src={activeStudio.bannerImage}
                    alt={activeStudio.title}
                    fill
                    sizes="(min-width: 64rem) 22rem, 100vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 start-3 text-[0.7rem] sm:text-xs font-bold text-white drop-shadow-sm">
                    توثيق ورشات {activeStudio.titleEn}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile View Controls (Carousel vs Grid Switcher - Visible only on < md) */}
        <div className="flex md:hidden items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-1 text-xs font-bold text-ink-muted">
            <span>تصفح المشاريع ({activeStudio.projects.length}):</span>
          </div>

          <div className="flex items-center gap-1 bg-surface border border-line rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setMobileViewMode("carousel")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                mobileViewMode === "carousel"
                  ? "bg-brand-600 text-white shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
              aria-label="عرض التمرير السريع"
            >
              <span>↔️</span>
              <span>سلايدر</span>
            </button>
            <button
              onClick={() => setMobileViewMode("grid")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                mobileViewMode === "grid"
                  ? "bg-brand-600 text-white shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
              aria-label="عرض الشبكة"
            >
              <span>▦</span>
              <span>شبكة</span>
            </button>
          </div>
        </div>

        {/* Mobile Carousel View (< md screens when carousel is active) */}
        <div className={`md:hidden ${mobileViewMode === "carousel" ? "block" : "hidden"}`}>
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="mobile-snap-slider flex gap-3.5 overflow-x-auto pb-4 pt-1 px-1 -mx-4 px-4 scrollbar-none snap-x snap-mandatory"
          >
            {activeStudio.projects.map((project, index) => (
              <div
                key={project.id}
                className="w-[85vw] max-w-[21rem] shrink-0 snap-item"
              >
                <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface shadow-xs transition-all duration-300">
                  {/* Prototype Image if available */}
                  {project.prototypeImage ? (
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-sunken border-b border-line">
                      <Image
                        src={project.prototypeImage}
                        alt={project.title}
                        fill
                        sizes="85vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-2.5 end-2.5 rounded-full bg-ink/80 backdrop-blur-md px-2.5 py-0.5 text-[0.6rem] font-bold text-white border border-white/20">
                        نموذج 3D
                      </span>
                    </div>
                  ) : null}

                  {/* Card Main Body */}
                  <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="flex size-10 items-center justify-center rounded-2xl border border-brand-200/80 bg-brand-50 text-xl shadow-2xs">
                          {project.icon}
                        </span>
                        <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-[0.65rem] font-bold text-ink-muted border border-line">
                          {project.category}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-base font-black text-ink">
                          {project.title}
                        </h4>
                        <p className="text-[0.7rem] font-bold text-brand-600">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Problem & Solution Blocks */}
                      <div className="flex flex-col gap-2 rounded-2xl border border-line/60 bg-surface-muted/40 p-3 text-xs">
                        <div>
                          <span className="font-black text-red-600 dark:text-red-400 block text-[0.7rem] mb-0.5">
                            ⚠️ التحدي:
                          </span>
                          <p className="text-ink-muted leading-relaxed line-clamp-2 text-[0.75rem]">
                            {project.problem}
                          </p>
                        </div>

                        <div className="border-t border-line/60 pt-1.5">
                          <span className="font-black text-emerald-700 dark:text-emerald-400 block text-[0.7rem] mb-0.5">
                            💡 الحل:
                          </span>
                          <p className="text-ink font-semibold leading-relaxed line-clamp-2 text-[0.75rem]">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {project.techStack.slice(0, 3).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-lg bg-surface border border-line px-2 py-0.5 text-[0.62rem] font-extrabold text-ink-subtle"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer: Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between gap-2">
                      {project.videoUrl ? (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/30 text-red-700 px-3 py-1.5 text-xs font-black transition-all"
                        >
                          <span>🎬</span>
                          <span>شاهد التجربة</span>
                        </a>
                      ) : (
                        <span className="text-[0.65rem] font-bold text-ink-subtle">
                          {project.toolsUsed.length} أدوات
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1 rounded-xl bg-brand-50 border border-brand-200 px-3 py-1.5 text-xs font-black text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
                      >
                        <span>التفاصيل</span>
                        <span aria-hidden="true">←</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Carousel Indicators & Quick Pagination */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-1.5">
              {activeStudio.projects.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToCard(dotIdx)}
                  aria-label={`الانتقال للمشروع ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === activeCardIndex
                      ? "w-6 bg-brand-600"
                      : "w-2 bg-neutral-300 dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>

            <span className="text-xs font-bold text-ink-muted">
              {activeCardIndex + 1} من {activeStudio.projects.length}
            </span>
          </div>
        </div>

        {/* Standard Grid View (Always active on Desktop md:, or when Mobile chooses Grid) */}
        <div
          className={`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            mobileViewMode === "grid" ? "grid md:grid" : "hidden md:grid"
          }`}
        >
          {activeStudio.projects.map((project, index) => (
            <Reveal
              key={project.id}
              variant="slide-up"
              delay={Math.min(index * 0.05, 0.25)}
              className="h-full"
            >
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
                {/* Prototype Image if available */}
                {project.prototypeImage ? (
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-sunken border-b border-line">
                    <Image
                      src={project.prototypeImage}
                      alt={project.title}
                      fill
                      sizes="(min-width: 64rem) 22rem, 100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-3 end-3 rounded-full bg-ink/80 backdrop-blur-md px-3 py-1 text-[0.65rem] font-bold text-white border border-white/20">
                      نموذج مطبوع 3D
                    </span>
                  </div>
                ) : null}

                {/* Card Main Body */}
                <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-12 items-center justify-center rounded-2xl border border-brand-200/80 bg-brand-50 text-2xl shadow-2xs transition-transform duration-300 group-hover:scale-110">
                        {project.icon}
                      </span>
                      <span className="rounded-full bg-surface-muted px-3 py-1 text-[0.7rem] font-bold text-ink-muted border border-line">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="flex flex-col gap-1">
                      <h4 className="text-lg font-black text-ink group-hover:text-brand-700 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs font-bold text-brand-600">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Problem & Solution Blocks */}
                    <div className="flex flex-col gap-2.5 rounded-2xl border border-line/60 bg-surface-muted/40 p-3.5 text-xs">
                      <div>
                        <span className="font-extrabold text-red-600 dark:text-red-400 block mb-0.5">
                          ⚠️ التحدي:
                        </span>
                        <p className="text-ink-muted leading-relaxed line-clamp-2">
                          {project.problem}
                        </p>
                      </div>

                      <div className="border-t border-line/60 pt-2">
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                          💡 الحل:
                        </span>
                        <p className="text-ink font-semibold leading-relaxed line-clamp-2">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-lg bg-surface border border-line px-2 py-0.5 text-[0.65rem] font-extrabold text-ink-subtle"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 ? (
                        <span className="rounded-lg bg-surface border border-line px-2 py-0.5 text-[0.65rem] font-bold text-ink-muted">
                          +{project.techStack.length - 3}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Card Footer: Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-line/60 flex items-center justify-between gap-2">
                    {project.videoUrl ? (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/30 text-red-700 dark:text-red-300 px-3 py-1.5 text-xs font-black transition-all"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>🎬</span>
                        <span>شاهد التجربة</span>
                      </a>
                    ) : (
                      <span className="text-[0.7rem] font-bold text-ink-subtle">
                        {project.toolsUsed.length} أدوات
                      </span>
                    )}

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 border border-brand-200 px-3.5 py-1.5 text-xs font-black text-brand-700 transition-all hover:bg-brand-600 hover:text-white"
                    >
                      <span>المخطط والتفاصيل</span>
                      <span aria-hidden="true">←</span>
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Project Detail Modal / Bottom Sheet */}
      {selectedProject ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-ink/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border-t sm:border border-line bg-surface p-5 sm:p-8 shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-250 pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sheet Drag Handle */}
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700 sm:hidden" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 sm:top-5 end-4 sm:end-5 flex size-8 sm:size-9 items-center justify-center rounded-full border border-line bg-surface-muted text-ink-muted hover:bg-surface hover:text-ink transition-colors"
              aria-label="إغلاق النافذة"
            >
              ✕
            </button>

            {/* Prototype Image in Modal */}
            {selectedProject.prototypeImage ? (
              <div className="relative w-full aspect-[16/9] mb-4 sm:mb-6 overflow-hidden rounded-2xl border border-line bg-surface-sunken">
                <Image
                  src={selectedProject.prototypeImage}
                  alt={selectedProject.title}
                  fill
                  sizes="(min-width: 48rem) 36rem, 100vw"
                  className="object-cover object-center"
                />
              </div>
            ) : null}

            {/* Modal Header */}
            <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
              <span className="flex size-11 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 border border-brand-200 text-2xl sm:text-3xl">
                {selectedProject.icon}
              </span>
              <div className="flex flex-col gap-1 pe-6">
                <span className="text-[0.65rem] sm:text-xs font-black text-brand-600 uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-ink">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-ink-muted">
                  {selectedProject.subtitle}
                </p>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="flex flex-col gap-4 sm:gap-6 text-sm">
              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-red-200/60 bg-red-500/5 p-3.5 sm:p-4 flex flex-col gap-1.5">
                  <span className="font-black text-red-700 dark:text-red-400 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span>⚠️</span>
                    <span>التحدي والمشكلة المرصودة:</span>
                  </span>
                  <p className="text-xs leading-relaxed text-ink">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-500/5 p-3.5 sm:p-4 flex flex-col gap-1.5">
                  <span className="font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span>💡</span>
                    <span>الحل الهندسي والتطبيقي:</span>
                  </span>
                  <p className="text-xs leading-relaxed text-ink">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Measurable Impact */}
              <div className="rounded-2xl border border-brand-200/60 bg-brand-50/50 p-3.5 sm:p-4 flex flex-col gap-1">
                <span className="font-black text-brand-800 text-xs flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>الأثر البيئي والمجتمعي للمشروع:</span>
                </span>
                <p className="text-xs leading-relaxed text-ink font-semibold">
                  {selectedProject.impact}
                </p>
              </div>

              {/* Tech Stack & Tools */}
              <div className="flex flex-col gap-2.5">
                <span className="font-black text-xs text-ink-muted uppercase">
                  المكونات والأدوات والتقنيات المستخدمة:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-xl border border-line bg-surface-muted px-2.5 py-1 text-[0.7rem] sm:text-xs font-bold text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                  {selectedProject.toolsUsed.map((tool, i) => (
                    <span
                      key={`tool-${i}`}
                      className="rounded-xl border border-brand-200 bg-brand-50/40 px-2.5 py-1 text-[0.7rem] sm:text-xs font-bold text-brand-800"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video Link in Modal */}
              {selectedProject.videoUrl ? (
                <div className="rounded-2xl border border-red-200/60 bg-red-500/5 p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎬</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-ink">
                        فيديو التجربة العملية وتوثيق المشروع
                      </span>
                      <span className="text-[0.68rem] text-ink-muted">
                        شاهد محاكاة وتجربة النموذج الأولي المصور
                      </span>
                    </div>
                  </div>
                  <a
                    href={selectedProject.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2.5 transition-colors shrink-0"
                  >
                    مشاهدة الفيديو ↗
                  </a>
                </div>
              ) : null}
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-line flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-black px-5 py-3 sm:py-2.5 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
