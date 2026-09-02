import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * `press` rather than `lift`: a button that rises away from the cursor reads
 * as a card you can open, not a control you can push. Cards lift, controls
 * press. The distinction is enforced here so it holds across the site.
 */
const base =
  "press inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "whitespace-nowrap select-none " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  /* The shadow is tinted with the brand hue so the primary control reads as
     sitting above the page rather than painted onto it. */
  primary:
    "bg-primary text-ink-inverse shadow-[0_1px_2px_rgb(8_46_60/0.12),0_6px_16px_-6px_rgb(10_113_145/0.45)] " +
    "hover:bg-primary-hover hover:shadow-[0_2px_4px_rgb(8_46_60/0.12),0_10px_24px_-8px_rgb(10_113_145/0.55)]",
  /* Two-pixel border, not one: at pill radius a hairline border disappears
     against a light page and the button stops looking clickable. */
  secondary:
    "bg-surface text-ink-brand border-2 border-brand-200 " +
    "hover:border-brand-400 hover:bg-primary-soft",
  ghost: "text-ink-brand hover:bg-primary-soft",
  link: "text-ink-brand underline underline-offset-4 decoration-brand-300 hover:decoration-brand-600 hover:text-primary-hover rounded-xs px-0",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-sm",
  /** 44px minimum target — comfortable for one-handed mobile use. */
  md: "min-h-11 px-6 text-base",
  lg: "min-h-13 px-8 text-lg",
};

/**
 * Shared visual definition for buttons and button-styled links, so the two
 * never drift apart.
 */
export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], variant !== "link" && sizes[size], className);
}
