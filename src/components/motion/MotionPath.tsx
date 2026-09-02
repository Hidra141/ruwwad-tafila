"use client";

import { motion, useReducedMotion } from "motion/react";

import { duration, easing } from "@/config/motion";

interface MotionPathProps {
  /** SVG path data. Supplied by the caller — no shapes are defined here. */
  d: string;
  /** Seconds before drawing starts. */
  delay?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Draws an SVG path on scroll into view.
 *
 * The foundation provides the mechanism only. Wing-inspired and organic shapes
 * will be supplied as real path data during the design phase; nothing here
 * invents a permanent pattern.
 *
 * Render inside an `<svg>` that carries its own `viewBox` and `aria-hidden`.
 */
export function MotionPath({
  d,
  delay = 0,
  strokeWidth = 1.5,
  className,
}: MotionPathProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <path
        d={d}
        fill="none"
        strokeWidth={strokeWidth}
        className={className}
        vectorEffect="non-scaling-stroke"
      />
    );
  }

  return (
    <motion.path
      data-reveal-path=""
      d={d}
      fill="none"
      strokeWidth={strokeWidth}
      className={className}
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        pathLength: { duration: duration.draw, ease: easing.inOut, delay },
        opacity: { duration: duration.fast, delay },
      }}
    />
  );
}
