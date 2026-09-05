"use client";

import { useState, useRef } from "react";
import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { t } from "@/lib/i18n";
import type { Alumni, ImageAsset } from "@/types";

interface AlumniJourneyGalleryProps {
  alumni: Alumni;
  headingId: string;
}

/**
 * "Moments from my journey" — photographs of this graduate taking part.
 * On mobile (< sm): rendered as a kinetic horizontal snap carousel with swipe indicators.
 * On desktop (>= sm): rendered as a responsive grid.
 */
export function AlumniJourneyGallery({
  alumni,
  headingId,
}: AlumniJourneyGalleryProps) {
  const seen = new Set<string>();
  const images: ImageAsset[] = [];
  for (const image of [
    ...(alumni.gallery ?? []),
    ...(alumni.journey ?? []).flatMap((entry) => entry.images ?? []),
  ]) {
    if (seen.has(image.src)) continue;
    seen.add(image.src);
    images.push(image);
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollPos = Math.abs(scrollLeft);
    const index = Math.round(scrollPos / (clientWidth * 0.85));
    setActiveIndex(Math.min(index, images.length - 1));
  };

  const scrollTo = (idx: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.85;
    const target = (scrollRef.current.dir === "rtl" ? -1 : 1) * idx * cardWidth;
    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
    setActiveIndex(idx);
  };

  const columns =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
        ? "grid-cols-2"
        : "grid-cols-2 lg:grid-cols-3";

  return (
    <Section spacing="compact" ariaLabelledBy={headingId} className="py-8 sm:py-12 bg-surface-muted/40 border-t border-line">
      <Container>
        <Reveal variant="slide-up">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-emerald-500" />
                <p className="text-xs font-black tracking-wider text-ink-brand uppercase">
                  معرض الصور الميدانية
                </p>
              </div>
              <h2
                id={headingId}
                className="mt-1.5 text-xl sm:text-3xl font-black text-ink"
              >
                مشاهد مصورة من ورشات اليافع/ة
              </h2>
            </div>

            {/* Mobile counter indicator */}
            <span className="sm:hidden rounded-full bg-surface border border-line px-3 py-1 text-xs font-black text-brand-700">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </Reveal>

        {/* Mobile Swipeable Gallery (< sm screens) */}
        <div className="sm:hidden mt-4">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="mobile-snap-slider flex gap-3.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none snap-x snap-mandatory"
          >
            {images.map((image, index) => (
              <div
                key={image.src}
                className="w-[82vw] max-w-[20rem] shrink-0 snap-item"
              >
                <div className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-xs">
                  <ResponsiveMedia ratio="landscape" rounded={false}>
                    <ImageFrame
                      image={image}
                      fill
                      sizes="82vw"
                      imageClassName="object-cover object-[center_20%]"
                    />
                  </ResponsiveMedia>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                aria-label={`عرض الصورة ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 bg-brand-600"
                    : "w-1.5 bg-neutral-300 dark:bg-neutral-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout (>= sm screens) */}
        <ul className={`hidden sm:grid mt-6 gap-5 ${columns}`}>
          {images.map((image, index) => (
            <li key={image.src}>
              <Reveal variant="scale" delay={Math.min(index * 0.06, 0.3)}>
                <div className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-xs transition-all hover:border-brand-300 hover:shadow-md">
                  <ResponsiveMedia
                    ratio={images.length === 1 ? "wide" : "landscape"}
                    rounded={false}
                  >
                    <ImageFrame
                      image={image}
                      fill
                      sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                      imageClassName="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                    />
                  </ResponsiveMedia>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="sr-only">{`صور من رحلة ${t(alumni.name)}`}</p>
      </Container>
    </Section>
  );
}
