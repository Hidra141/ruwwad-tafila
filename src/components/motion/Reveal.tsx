"use client";

import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { duration, easing, slideDistance } from "@/config/motion";
import { cn } from "@/lib/utils";

export type RevealVariant = "fade" | "slide-up" | "slide-start" | "scale";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Seconds to wait before animating. Use with `RevealGroup` for staggering. */
  delay?: number;
  /** Animate once when scrolled into view (default) or every time. */
  once?: boolean;
  className?: string;
}

const SHOWN = { opacity: 1, x: 0, y: 0, scale: 1 } as const;

/**
 * Entrance animation for a block of content.
 *
 * Honours `prefers-reduced-motion` in JavaScript, not only in CSS: when the
 * preference is set the children render in their final state with no
 * transition at all.
 *
 * Deliberately limited to fade, slide, and scale — no bounce, parallax, or 3D.
 */
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  once = true,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Content already on screen at mount animates straight away, instead of
   * waiting for a scroll that may never come.
   *
   * `whileInView` alone is the wrong trigger for anything above the fold: it
   * fires from an IntersectionObserver callback, so until that callback runs
   * the element sits at `opacity: 0`. For a page hero that means the headline
   * is invisible on arrival, and stays invisible entirely if the observer
   * never reports — which does happen in embedded and automated browsers.
   *
   * Driving it imperatively rather than through state keeps this out of the
   * render path; below-the-fold elements are untouched and still reveal on
   * scroll.
   */
  useEffect(() => {
    if (reduceMotion) return;
    const element = ref.current;
    if (!element) return;

    const box = element.getBoundingClientRect();
    const onScreen = box.top < window.innerHeight && box.bottom > 0;
    if (!onScreen) return;

    const controls = animate(element, { ...SHOWN }, {
      duration: duration.base,
      ease: easing.out,
      delay,
    });
    return () => controls.stop();
  }, [reduceMotion, delay]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const hidden = {
    fade: { opacity: 0 },
    "slide-up": { opacity: 0, y: slideDistance },
    /**
     * Slides from the inline start edge, so the direction follows the document
     * direction instead of assuming left-to-right.
     */
    "slide-start": { opacity: 0, x: slideDistance },
    scale: { opacity: 0, scale: 0.97 },
  }[variant];

  return (
    <motion.div
      ref={ref}
      // Motion server-renders the hidden `initial` state into the HTML, so
      // without this hook the content would stay invisible if JavaScript never
      // runs. The `<noscript>` rule in the root layout targets this attribute.
      data-reveal=""
      className={cn(className)}
      initial={hidden}
      whileInView={SHOWN}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: duration.base, ease: easing.out, delay }}
    >
      {children}
    </motion.div>
  );
}
