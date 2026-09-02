"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

/** Pool of 15 curated session photos across all 5 phases */
const pool15SessionPhotos = [
  "/assets/drosos/phases/fellowship-1.webp",
  "/assets/drosos/phases/fellowship-3.webp",
  "/assets/drosos/phases/fellowship-5.webp",
  "/assets/drosos/phases/digital-1.webp",
  "/assets/drosos/phases/digital-3.webp",
  "/assets/drosos/phases/digital-5.webp",
  "/assets/drosos/phases/foundation-1.webp",
  "/assets/drosos/phases/foundation-3.webp",
  "/assets/drosos/phases/foundation-8.webp",
  "/assets/drosos/phases/studio1-1.webp",
  "/assets/drosos/phases/studio1-3.webp",
  "/assets/drosos/phases/studio1-5.webp",
  "/assets/drosos/phases/studio2-1.webp",
  "/assets/drosos/phases/studio2-3.webp",
  "/assets/drosos/phases/studio2-5.webp",
];

export function DrososHero() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [photosList, setPhotosList] = useState<string[]>(pool15SessionPhotos);

  // Shuffle photos randomly on initial load for dynamic variety
  useEffect(() => {
    const shuffled = [...pool15SessionPhotos].sort(() => Math.random() - 0.5);
    setPhotosList(shuffled);

    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % shuffled.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section spacing="none" className="relative overflow-hidden bg-slate-950 text-white h-screen min-h-screen flex flex-col justify-center items-center border-none">
      {/* Dynamic 15 Session Photos Carousel Background (100% Clear & Natural Fit) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {photosList.map((photoPath, index) => (
          <div
            key={photoPath}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activePhotoIndex
                ? "opacity-90 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={photoPath}
              alt="من جلسات مشروع دروسوس في روّاد الطفيلة"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-[center_20%] scale-100 transition-transform duration-1000"
            />
          </div>
        ))}

        {/* Soft Crystal Lighting Gradient: Bright Top & Bottom Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/35 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950/20 via-slate-950/50 to-slate-950/90" />

        {/* Ambient Blue Glowing Orbs */}
        <div
          className="pointer-events-none absolute -top-24 right-1/4 size-96 rounded-full bg-blue-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-5 left-1/4 size-96 rounded-full bg-sky-400/15 blur-3xl"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        {/* Sleek, Uncluttered Centered Header */}
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center gap-6">
          {/* Top Strategic Glass Pill Badge */}
          <Reveal variant="fade">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/40 bg-slate-950/70 px-4 py-1.5 text-xs font-bold text-sky-200 shadow-xl backdrop-blur-md ring-1 ring-sky-400/20">
              <span className="flex size-2 rounded-full bg-sky-400 animate-pulse" />
              <span>شراكة استراتيجية • روّاد التنمية ومؤسسة دروسوس (Drosos Foundation)</span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal variant="slide-up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <span>رحلة تمكين اليافعين بالطفيلة</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-300">
                من بناء الذات إلى الابتكار والطباعة 3D
              </span>
            </h1>
          </Reveal>
        </div>
      </Container>

      {/* Scroll Down Hint Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-80 animate-bounce">
        <span className="text-[0.68rem] font-bold text-slate-300 tracking-wider">استكشف التفاصيل</span>
        <span className="text-sky-300 text-lg">↓</span>
      </div>
    </Section>
  );
}
