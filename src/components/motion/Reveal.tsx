"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { stagger } from "@/config/motion";
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

/**
 * One scroll sweep for every reveal on the page.
 *
 * `IntersectionObserver` reports threshold *crossings*. An in-page anchor that
 * jumps the reader from the top of the page to the impact section moves a
 * dozen elements from below the viewport to above it in a single frame: their
 * ratio was zero before and is zero after, no threshold is crossed, and no
 * callback is ever delivered. Those elements stay hidden until the reader
 * happens to scroll back up through them — measured on this page at twelve
 * blocks stranded after one jump.
 *
 * The observers cannot see that, so a scroll listener does. One listener for
 * the whole page rather than one per component: there are 112 reveals on the
 * site, and 112 scroll handlers to answer a question that is the same for all
 * of them would be its own performance problem. Entries remove themselves once
 * shown, so the set drains as the reader moves down the page.
 */
type Sweeper = () => boolean;

const pending = new Set<Sweeper>();
let sweepQueued = false;
let listening = false;

function runSweep() {
  sweepQueued = false;
  for (const sweep of pending) {
    if (sweep()) pending.delete(sweep);
  }
  if (pending.size === 0 && listening) {
    window.removeEventListener("scroll", queueSweep);
    listening = false;
  }
}

function queueSweep() {
  if (sweepQueued) return;
  sweepQueued = true;
  requestAnimationFrame(runSweep);
}

function watchForJumps(sweep: Sweeper) {
  pending.add(sweep);
  if (!listening) {
    window.addEventListener("scroll", queueSweep, { passive: true });
    listening = true;
  }
  return () => {
    pending.delete(sweep);
  };
}

/**
 * Entrance animation for a block of content.
 *
 * This drove its animation through Motion, with `initial` + `whileInView` and
 * an imperative `animate()` call layered on top to catch content that was
 * already on screen when the component mounted. The two fought: the imperative
 * call would start, and Motion's own render loop would re-assert `initial` and
 * put the element back at zero opacity. On the contact page's hero all three
 * blocks measured `opacity: 0` three seconds after a reload — the first screen
 * was a gradient with nothing on it.
 *
 * There is one mechanism now. The hidden state is CSS keyed off `data-reveal`,
 * and this component's only job is to decide when to set `data-shown`. Nothing
 * else can contest it, and the animation runs on `opacity` and `transform`, so
 * it stays on the compositor.
 *
 * Two cases the old version got wrong are handled explicitly:
 *
 * - Content on screen at mount is shown immediately, because an observer for
 *   an element that is already intersecting may never deliver a callback.
 * - Content the reader jumped *past* — an in-page anchor skipping several
 *   sections — is shown too. The observer reports such an element as not
 *   intersecting, but its rectangle sits above the viewport, and that is the
 *   difference between "not yet read" and "already gone by".
 *
 * `prefers-reduced-motion` is honoured in CSS rather than here, so it also
 * covers the case where JavaScript is slow to arrive.
 *
 * No React state: the only thing that changes is an attribute CSS reads, and
 * routing that through `useState` would re-render the subtree on every reveal
 * — 112 of them across the site — to produce identical markup. The attribute
 * is set on the node directly.
 */
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const show = () => element.setAttribute("data-shown", "true");
    const hide = () => element.removeAttribute("data-shown");

    // Without an observer, showing at once beats never showing at all.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const passed = entry.boundingClientRect.bottom <= 0;
          if (entry.isIntersecting || passed) {
            show();
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            hide();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    /*
      The observer's first callback arrives on a later frame. For anything
      above the fold that is a frame of blank page, and if the callback is
      dropped it is a permanently blank page — so measure directly and show
      now. `once` elements need no observer after this; the rest keep it so
      they can hide again on the way out.
    */
    const box = element.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      show();
      if (once) observer.unobserve(element);
    }

    /* Covers what the observer structurally cannot: an element the reader was
       carried past without it ever intersecting. Returns true once it has
       done its job so the sweep can forget it. */
    const unwatch = watchForJumps(() => {
      if (element.getBoundingClientRect().bottom > 0) return false;
      show();
      if (once) observer.unobserve(element);
      return true;
    });

    return () => {
      observer.disconnect();
      unwatch();
    };
  }, [once]);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      style={
        delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined
      }
      className={cn(className)}
    >
      {children}
    </div>
  );
}

/** Re-exported so `RevealGroup` and callers share one stagger value. */
export { stagger as revealStagger };
