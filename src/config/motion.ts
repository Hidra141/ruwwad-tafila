/**
 * Motion tokens. Mirrors the CSS custom properties declared in `globals.css`
 * so JavaScript-driven motion and CSS transitions stay in step.
 *
 * The visual direction favours fade, slide, scale, and path drawing. Avoid
 * bouncing, strong parallax, heavy 3D, and glow.
 */

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.35,
  slow: 0.6,
  /** Reserved for SVG path drawing. */
  draw: 1.2,
} as const;

/** Cubic-bezier control points, in the shape both CSS and Motion accept. */
export type CubicBezier = [number, number, number, number];

export const easing: Record<"out" | "inOut" | "in", CubicBezier> = {
  /** Default for entrances — decelerating, no overshoot. */
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.55, 0, 1, 0.45],
};

/** Distance in pixels used by slide-based reveals. */
export const slideDistance = 16;

/** Stagger between siblings in a revealed group. */
export const stagger = 0.06;

export type MotionDuration = keyof typeof duration;
export type MotionEasing = keyof typeof easing;
