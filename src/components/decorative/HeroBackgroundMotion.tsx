"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

/**
 * Motion layer for the home hero, built on the approved reference artwork
 * (`reference/source/7fefad63-…png`, shipped as `hero-background.webp`).
 *
 * Nothing here is drawn from scratch. The artwork stays the artwork:
 *
 * - the curve is the reference's own line, traced from the image and refitted
 *   as a Bézier path (max deviation 2.2px across 1852px), so the stroke and the
 *   travelling point sit on the painted line rather than beside it;
 * - the wing blades are the reference's own light. The background plate was
 *   estimated and subtracted, and the remaining light split into three by the
 *   angle each blade radiates from the point where they meet. Adding those
 *   layers back with `screen` both sharpens the blades and lets each one move
 *   on its own — no redrawn wing, no invented shape;
 * - the only added light is the travelling point.
 *
 * The story: a point leaves the left edge, follows the path, and as it arrives
 * the blades lift and brighten — journey, arrival, growth.
 */

/** Intrinsic size of the reference artwork; the coordinate space for everything below. */
const ART_WIDTH = 1852;
const ART_HEIGHT = 849;

/**
 * The reference line, traced from the artwork and fitted by adaptive knot
 * insertion (max deviation 2.2px). Do not hand-edit: retrace it from the
 * source image if the artwork is ever replaced. It stops where the painted
 * line meets the wing, which is where the journey arrives.
 */
const JOURNEY_PATH =
  "M 0 437 C 27.5 440.5, 110.5 448.2, 165 458.2 C 219.5 468.2, 273.7 481.7, 327 497 " +
  "C 380.3 512.3, 432.7 531.2, 485 550.2 C 537.3 569.2, 588.7 592.1, 641 610.9 " +
  "C 693.3 629.7, 745.3 650.4, 799 663.1 C 852.7 675.8, 908 685.1, 963 687 " +
  "C 1018 688.9, 1074.8 685, 1129 674.5 C 1183.2 664, 1244.3 643.9, 1288 623.9 " +
  "C 1331.7 603.9, 1369.8 571.7, 1391 554.8 C 1412.2 537.9, 1411 527.7, 1415 522.3";

/** One full journey, in seconds. Long and unhurried by design. */
const CYCLE_SECONDS = 13;

/**
 * The three blade layers share one rect — the bounding box of the extracted
 * wing light — and one transform origin, the point where the blades meet.
 * Hinging there is what makes them read as a fan: the base barely moves (which
 * is also where the angular split between blades is least certain) while the
 * tips travel a few pixels.
 */
const WING_RECT = {
  left: "69.870%",
  top: "3.298%",
  width: "30.130%",
  height: "78.327%",
} as const;
const WING_HINGE = "2% 99.1%";

/** Per-blade motion. Different periods so the fan never pulses in lockstep. */
const BLADES = [
  {
    name: "inner",
    src: "/assets/brand/hero-wing-inner.webp",
    duration: 11,
    delay: 0,
    lift: 0.34,
  },
  {
    name: "middle",
    src: "/assets/brand/hero-wing-middle.webp",
    duration: 9.5,
    delay: 0.8,
    lift: 0.26,
  },
  {
    name: "outer",
    src: "/assets/brand/hero-wing-outer.webp",
    duration: 12.5,
    delay: 1.6,
    lift: 0.2,
  },
] as const;

/** How strongly the extracted blade light is added back, at rest and on arrival. */
const BLADE_OPACITY_REST = 0.85;
const BLADE_OPACITY_ARRIVAL = 1;

export function HeroBackgroundMotion() {
  const reduceMotion = useReducedMotion();

  /**
   * One clock for the whole scene. The travelling point and the arrival warmth
   * are both derived from it, so they cannot drift apart the way independent
   * timers would.
   */
  const progress = useMotionValue(0);

  // Pointer parallax, in screen pixels, smoothed so it never feels twitchy.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 18, mass: 0.6 };
  const parallaxX = useSpring(pointerX, springConfig);
  const parallaxY = useSpring(pointerY, springConfig);

  const wingX = useTransform(parallaxX, (v) => v * 5);
  const wingY = useTransform(parallaxY, (v) => v * 4);
  const pathX = useTransform(parallaxX, (v) => v * 2);
  const pathY = useTransform(parallaxY, (v) => v * 2);

  // Point travels over the first two thirds; the rest of the cycle is rest.
  const travel = useTransform(progress, [0.04, 0.68], [0, 1], { clamp: true });
  const dashOffset = useTransform(travel, (v) => -v);
  const pointOpacity = useTransform(
    progress,
    [0.03, 0.12, 0.6, 0.68, 0.72],
    [0, 0.85, 0.85, 0.55, 0],
  );
  /** The wing warms as the point closes on it, then settles back. */
  const bladeOpacity = useTransform(
    progress,
    [0.5, 0.68, 0.78, 0.9],
    [
      BLADE_OPACITY_REST,
      BLADE_OPACITY_ARRIVAL,
      BLADE_OPACITY_ARRIVAL,
      BLADE_OPACITY_REST,
    ],
  );
  const arrivalOpacity = useTransform(
    progress,
    [0.5, 0.68, 0.76, 0.88],
    [0, 0.1, 0.08, 0],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(progress, 1, {
      duration: CYCLE_SECONDS,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [progress, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    // Pointer parallax is a desktop affordance; touch devices get none.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: MouseEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/*
        Cover box: locked to the artwork's aspect ratio and never smaller than
        the section, which reproduces `object-cover` while giving every layer
        inside one shared coordinate space. That is what keeps the traced path
        on the painted line and the blade layers on the painted blades at every
        viewport size.

        Anchored to the artwork's right edge rather than centred. The artwork is
        2.18:1 and the hero is far taller, so a centred crop cuts the sides —
        measured across common viewports that hides the wing completely below
        1024px and leaves only half of it on a laptop. Anchoring right keeps the
        wing — the destination the whole motion builds towards — in frame
        everywhere, at the cost of the curve's leftmost tail, which simply reads
        as the path arriving from off-screen.

        `right-0` is deliberately physical, not logical: it tracks where the
        wing is painted, which does not flip with the RTL document. `isolate`
        keeps the blades' `screen` blending inside this box.
      */}
      <div
        className="absolute top-1/2 right-0 isolate min-h-full min-w-full -translate-y-1/2"
        style={{ aspectRatio: `${ART_WIDTH} / ${ART_HEIGHT}` }}
      >
        {/* The reference artwork, untouched. */}
        <Image
          src="/assets/brand/hero-background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />

        {/*
          The blades. Each layer is that blade's own light lifted off the
          artwork and added back with `screen`, which leaves the near-black
          surround untouched so only the blade brightens. Rotation is around the
          shared hinge and a third of a degree at most, which moves a tip a
          couple of pixels and the base almost none.
        */}
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { x: wingX, y: wingY }}
        >
          {BLADES.map((blade) => (
            <motion.div
              key={blade.name}
              className="absolute"
              style={{
                ...WING_RECT,
                transformOrigin: WING_HINGE,
                mixBlendMode: "screen",
                opacity: reduceMotion ? BLADE_OPACITY_REST : bladeOpacity,
                willChange: reduceMotion ? undefined : "transform",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : { rotate: [0, blade.lift, 0], scale: [1, 1.006, 1] }
              }
              transition={{
                duration: blade.duration,
                delay: blade.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={blade.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-fill"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Path, travelling point, and arrival glow — all in artwork coordinates. */}
        <motion.svg
          viewBox={`0 0 ${ART_WIDTH} ${ART_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          style={reduceMotion ? undefined : { x: pathX, y: pathY }}
        >
          <defs>
            <radialGradient id="hero-arrival-glow">
              <stop offset="0%" stopColor="#CFEFF9" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#A3E1F3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#A3E1F3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* A breath of light where the path meets the blades. */}
          <motion.ellipse
            cx="1400"
            cy="540"
            rx="230"
            ry="210"
            fill="url(#hero-arrival-glow)"
            style={reduceMotion ? { opacity: 0 } : { opacity: arrivalOpacity }}
          />

          {/*
            The line itself: a faint pass over the painted curve that draws in
            once as the hero appears. Low opacity on purpose — it should read as
            the existing line catching the light, not as a second stroke.
          */}
          <motion.path
            d={JOURNEY_PATH}
            fill="none"
            stroke="#DDF2FA"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              pathLength: { duration: 3.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 1.6 },
            }}
          />

          {!reduceMotion ? (
            /*
              The travelling point: three round-capped dashes riding the same
              path, widest and faintest first, which builds the halo out of
              plain strokes. Riding the path is what keeps the point on the
              line; `pathLength={1}` normalises the dash units so the timing
              does not depend on the path's real length.

              A feGaussianBlur would be the obvious way to glow, but the filter
              region derives from the path's bounding box — roughly 1420x270
              here — so the browser would blur that whole area every frame.
              Stacked strokes cost nothing and look the same at this size.
            */
            <>
              {[
                { width: 12, colour: "#A3E1F3", alpha: 0.18 },
                { width: 6, colour: "#CFEFF9", alpha: 0.4 },
                { width: 2.5, colour: "#F2FBFE", alpha: 1 },
              ].map((layer) => (
                <motion.path
                  key={layer.width}
                  d={JOURNEY_PATH}
                  pathLength={1}
                  fill="none"
                  stroke={layer.colour}
                  strokeWidth={layer.width}
                  strokeLinecap="round"
                  strokeDasharray="0.005 1"
                  strokeOpacity={layer.alpha}
                  vectorEffect="non-scaling-stroke"
                  style={{
                    strokeDashoffset: dashOffset,
                    opacity: pointOpacity,
                  }}
                />
              ))}
            </>
          ) : null}
        </motion.svg>
      </div>
    </div>
  );
}
