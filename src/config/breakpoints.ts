/**
 * Breakpoints mirrored from the `--breakpoint-*` tokens in `globals.css`.
 * Only for JavaScript that genuinely needs the numbers (e.g. matchMedia);
 * layout itself should use Tailwind's responsive variants.
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const mediaQuery = (key: Breakpoint) =>
  `(min-width: ${breakpoints[key]}px)`;
