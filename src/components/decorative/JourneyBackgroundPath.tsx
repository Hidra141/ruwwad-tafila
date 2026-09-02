"use client";

import { motion, useReducedMotion } from "motion/react";

interface JourneyBackgroundPathProps {
  variant?: "hero-to-intro" | "intro-to-timeline" | "drosos-flow" | "subtle-wave";
  className?: string;
}

/**
 * JourneyBackgroundPath: Provides visual continuity across sections through subtle,
 * floating wing-inspired SVG paths.
 */
export function JourneyBackgroundPath({
  variant = "subtle-wave",
  className,
}: JourneyBackgroundPathProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "hero-to-intro") {
    return (
      <div className={`pointer-events-none absolute left-0 right-0 -bottom-16 z-0 flex justify-center overflow-hidden opacity-40 ${className || ""}`}>
        <svg
          viewBox="0 0 1200 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-full max-w-7xl text-brand-200"
          aria-hidden="true"
        >
          <motion.path
            d="M0 40 C300 100, 600 -20, 1200 60"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "drosos-flow") {
    return (
      <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30 ${className || ""}`}>
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full text-brand-300"
          aria-hidden="true"
        >
          <path
            d="M-100 200 C300 50, 700 500, 1540 250"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M-100 350 C400 150, 800 600, 1540 380"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute left-0 right-0 z-0 overflow-hidden opacity-30 ${className || ""}`}>
      <svg
        viewBox="0 0 1200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-full text-brand-200"
        aria-hidden="true"
      >
        <path
          d="M0 40 Q 300 80, 600 40 T 1200 40"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
}
