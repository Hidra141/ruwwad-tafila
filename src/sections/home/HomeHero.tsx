"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";

/**
 * HomeHero: Full-viewport hero section built directly over the reference background image
 * (7fefad63-ca4c-4719-86ee-c690b19b8ed4.png) with a subtle, continuous motion layer.
 */
export function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden text-neutral-0">
      {/* Animated hero background image wrapper */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        animate={
          !reduceMotion
            ? {
                scale: [1, 1.025, 1],
                y: [0, -6, 0],
              }
            : undefined
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        {/*
          The WebP, not the PNG that sat here. Both are the same artwork at
          the same 1852×849, but the PNG is 1.79 MB on disk against 87 KB —
          twenty-one times the weight for an identical image. next/image was
          absorbing most of that at request time, so the visitor never paid
          the full price, but the repository and every deploy did.

          `alt` is empty because this is the backdrop behind the h1: the
          heading already carries the meaning, and announcing the
          organisation's name a second time here would only repeat it.
        */}
        <Image
          src="/assets/brand/hero-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Subtle organic light accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 z-1 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl"
      />

      {/* Contrast veil for WCAG legible text over lighter background areas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/60"
      />

      {/* Spacing element for top header clearance */}
      <div className="h-(--header-height) w-full shrink-0" />

      {/* Centered Editorial Content */}
      <Container className="relative z-20 my-auto py-12 text-center lg:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Eyebrow Label */}
          <Reveal variant="slide-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-0/25 bg-neutral-0/10 px-4.5 py-1.5 text-sm font-semibold tracking-wide text-brand-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" />
              منذ 2012
            </span>
          </Reveal>

          {/* Main Heading */}
          <Reveal variant="slide-up" delay={0.1}>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-0 drop-shadow-md sm:text-5xl lg:text-7xl lg:leading-[1.15]">
              كل رحلة تبدأ بخطوة.
            </h1>
          </Reveal>

          {/* Supporting Text */}
          <Reveal variant="slide-up" delay={0.2}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-neutral-0/95 drop-shadow-sm sm:text-xl lg:text-2xl lg:leading-relaxed">
              منذ 2012، بدأنا في الطفيلة رحلة نصنع فيها مساحة يتعلم فيها الشباب
              واليافعون، ويشاركون، ويكتشفون قدراتهم، ويساهمون في مجتمعهم.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal variant="slide-up" delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={routes.about}
                className="press inline-flex min-h-12 items-center justify-center rounded-pill bg-primary px-8 text-base font-bold text-ink-inverse shadow-[0_2px_4px_rgb(8_46_60/0.12),0_10px_24px_-8px_rgb(10_113_145/0.55)] hover:bg-primary-hover"
              >
                اكتشف رحلتنا
                <svg
                  className="mr-2 h-4 w-4 rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              <Link
                href={routes.about}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-0/40 bg-neutral-0/10 px-8 py-3.5 text-base font-bold text-neutral-0 backdrop-blur-md transition-colors hover:bg-neutral-0/20 focus-visible:outline-2 focus-visible:outline-white"
              >
                من نحن
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Downward Scroll Indicator */}
      <div className="relative z-20 pb-8 text-center text-neutral-0/80">
        <a
          href="#intro"
          aria-label="انتقل للتالي"
          className="inline-flex flex-col items-center gap-2 transition-opacity hover:opacity-100"
        >
          <span className="text-xs font-bold tracking-wider drop-shadow-xs">
            انتقل للاستكشاف
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-neutral-0/60 p-1">
            {!reduceMotion ? (
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-neutral-0"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : (
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-0" />
            )}
          </div>
        </a>
      </div>
    </section>
  );
}

