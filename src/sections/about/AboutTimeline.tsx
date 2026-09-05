"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timelineMilestones } from "@/data/timeline";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * The year-by-year milestones, as a horizontal stepper.
 *
 * Three things were wrong with the previous version beyond its styling:
 *
 * 1. The year buttons were plain buttons with no stated relationship to the
 *    panel they controlled, so assistive technology announced six unlabelled
 *    buttons and a block of text that changed for no given reason. They are
 *    now a tablist, and the panel is the tabpanel they own.
 * 2. There was no keyboard navigation. Arrow keys now move between years, and
 *    because the track is laid out right-to-left, the left arrow advances and
 *    the right arrow goes back — matching what the eye sees rather than what
 *    the key is named.
 * 3. The milestone photograph carried `priority`, telling Next.js to preload
 *    an image sitting several screens down the page, competing with the hero
 *    for bandwidth on arrival.
 */
export function AboutTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const lastIndex = timelineMilestones.length - 1;
  const active = timelineMilestones[activeIndex];

  const select = (index: number, focus = false) => {
    const next = Math.min(Math.max(index, 0), lastIndex);
    setActiveIndex(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // The track renders right-to-left, so "left" is forwards through the years.
    const step =
      event.key === "ArrowLeft" ? 1 : event.key === "ArrowRight" ? -1 : 0;

    if (step !== 0) {
      event.preventDefault();
      select(activeIndex + step, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    }
    if (event.key === "End") {
      event.preventDefault();
      select(lastIndex, true);
    }
  };

  const yearLabel = (year: string) => (year === "اليوم" ? "اليوم" : `عام ${year}`);

  return (
    <SectionSurface
      id="timeline"
      surface="raised"
      ariaLabelledBy="about-timeline-title"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="about-timeline-title"
          eyebrow="المحطات"
          title="محطات فارقة في مسيرة روّاد الطفيلة"
          description="ست محطات من التأسيس حتى اليوم. اختر محطة لتقرأ تفاصيلها."
        />

        <Reveal variant="fade">
          <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
            {/* --- Year track -------------------------------------------- */}
            <div
              role="tablist"
              aria-label="محطات المسيرة"
              onKeyDown={onTabKeyDown}
              className="relative flex items-center justify-between gap-2 overflow-x-auto border-b border-line px-6 py-6 sm:px-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* The rail sits behind the nodes and stops short of the first
                  and last, so it never runs out from under them. */}
              <div
                aria-hidden="true"
                className="absolute top-1/2 start-12 end-12 h-1 -translate-y-1/2 rounded-pill bg-line"
              >
                <div
                  className="h-full rounded-pill bg-brand-500 transition-[width] duration-(--duration-base) ease-(--ease-out-soft)"
                  style={{ width: `${(activeIndex / lastIndex) * 100}%` }}
                />
              </div>

              {timelineMilestones.map((milestone, index) => {
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;

                return (
                  <button
                    key={milestone.year}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`timeline-tab-${index}`}
                    aria-selected={isActive}
                    aria-controls="timeline-panel"
                    tabIndex={isActive ? 0 : -1}
                    className={cn(
                      "press relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold sm:size-16",
                      isActive
                        ? "bg-primary text-ink-inverse shadow-md ring-4 ring-brand-100"
                        : isPassed
                          ? "bg-brand-500 text-ink-inverse"
                          : "border-2 border-line bg-surface text-ink-muted hover:border-brand-300 hover:text-ink",
                    )}
                    onClick={() => select(index)}
                  >
                    {milestone.year}
                  </button>
                );
              })}
            </div>

            {/* --- Active milestone -------------------------------------- */}
            <div
              role="tabpanel"
              id="timeline-panel"
              aria-labelledby={`timeline-tab-${activeIndex}`}
              tabIndex={0}
              className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-10"
            >
              <div className="order-2 flex flex-col gap-6 lg:order-1">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-pill border border-brand-200 bg-primary-soft px-3 py-1 text-xs font-semibold text-ink-brand">
                      محطة {activeIndex + 1} من {timelineMilestones.length}
                    </span>
                    <span className="text-xs font-semibold text-ink-subtle">
                      {yearLabel(active.year)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold leading-snug text-ink">
                    {t(active.title)}
                  </h3>

                  {active.description ? (
                    <p className="text-base leading-relaxed text-ink-muted">
                      {t(active.description)}
                    </p>
                  ) : null}

                  {active.highlights?.length ? (
                    <div className="border-t border-line pt-5">
                      <h4 className="mb-3 text-xs font-semibold tracking-wide text-ink-subtle">
                        أبرز الإنجازات الموثقة
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {active.highlights.map((highlight) => (
                          <li
                            key={t(highlight)}
                            className="flex items-start gap-3 rounded-xl border border-line/60 bg-surface-muted/70 p-3 text-sm text-ink"
                          >
                            <Icon
                              name="check"
                              className="mt-0.5 size-4 text-ink-brand"
                            />
                            <span>{t(highlight)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {/* --- Step controls ----------------------------------- */}
                <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
                  {/* Literal arrow characters were used here before. Arrows are
                      bidi-neutral, so their rendered direction followed the
                      surrounding text and both buttons ended up pointing the
                      same way. An SVG cannot flip. */}
                  <button
                    type="button"
                    onClick={() => select(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    className="press inline-flex min-h-10 items-center gap-2 rounded-pill border border-line bg-surface px-4 text-sm font-semibold text-ink hover:border-brand-300 hover:bg-primary-soft disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Icon name="chevron" className="size-4" />
                    <span>السابقة</span>
                  </button>

                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {timelineMilestones.map((milestone, index) => (
                      <span
                        key={milestone.year}
                        className={cn(
                          "h-2 rounded-pill transition-all duration-(--duration-fast)",
                          index === activeIndex
                            ? "w-5 bg-primary"
                            : "w-2 bg-line-strong",
                        )}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => select(activeIndex + 1)}
                    disabled={activeIndex === lastIndex}
                    className="press inline-flex min-h-10 items-center gap-2 rounded-pill bg-primary px-4 text-sm font-semibold text-ink-inverse hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-40"
                  >
                    <span>التالية</span>
                    <Icon name="chevron" className="size-4 rotate-180" />
                  </button>
                </div>
              </div>

              <div className="group relative order-1 aspect-16/10 overflow-hidden rounded-2xl border border-line bg-surface-sunken lg:order-2">
                <Image
                  key={active.image.src}
                  src={active.image.src}
                  alt={t(active.image.alt)}
                  fill
                  sizes="(min-width: 64rem) 40rem, 92vw"
                  className="media-zoom object-cover"
                />
                <span className="absolute top-4 end-4 inline-flex rounded-pill border border-line bg-surface/90 px-3 py-1 text-xs font-semibold text-ink-brand backdrop-blur-md">
                  {yearLabel(active.year)}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </SectionSurface>
  );
}
