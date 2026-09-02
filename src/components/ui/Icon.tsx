import { cn } from "@/lib/utils";

/**
 * The site's icon set.
 *
 * These replace the emoji that were previously scattered through the section
 * components. Emoji were a problem on three counts: they render in a different
 * typeface on every platform so the visual language changed between a Windows
 * laptop and an iPhone; a screen reader announces the character's Unicode name
 * aloud before the real label ("graduation cap", "seedling", "direct hit");
 * and a colour emoji beside Arabic institutional copy reads as a slide deck
 * rather than an organisation's site.
 *
 * Everything here is a single monochrome path that inherits `currentColor`, so
 * one icon works in every tone the palette defines and follows the text colour
 * of whatever it sits in. All are `aria-hidden`: an icon in this site always
 * accompanies a visible label, never replaces one.
 */

export type IconName =
  | "graduation"
  | "sprout"
  | "rocket"
  | "recycle"
  | "idea"
  | "handshake"
  | "calendar"
  | "check"
  | "pin"
  | "community"
  | "trophy"
  | "star"
  | "camera"
  | "close"
  | "chevron"
  | "search"
  | "spark";

const PATHS: Record<IconName, string> = {
  graduation: "M12 3 1 9l11 6 9-4.91V17h2V9L12 3ZM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z",
  sprout:
    "M12 22v-7m0 0c0-3.87-3.13-7-7-7H3v2c0 3.87 3.13 7 7 7h2Zm0 0c0-3.87 3.13-7 7-7h2v1c0 3.87-3.13 7-7 7h-2Z",
  rocket:
    "M12 2c3.5 2.2 5.5 6 5.5 10.2L17 17H7l-.5-4.8C6.5 8 8.5 4.2 12 2Zm0 5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 18.5h10L15.5 22h-7L7 18.5Z",
  recycle:
    "m12 3 3 5h-2.4v4h-1.2V8H9l3-5Zm7.5 8.5 1.9 3.3-4.3 2.5-.6-1 2.1-1.2-2-3.4 1-.6-1.1-1.9 3 .3-1 2ZM4.5 11.5l-1-2 3-.3-1.1 1.9 1 .6-2 3.4 2.1 1.2-.6 1-4.3-2.5 1.9-3.3ZM8 19h8v2H8v-2Z",
  idea: "M12 2a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26A7 7 0 0 0 12 2ZM9.5 19.5h5V21a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1.5Z",
  handshake:
    "m12 6.5 2.5-2 5 4.2-3.3 3.8-1.6-1.4-2.4 2.1a1.5 1.5 0 0 1-2 0l-.5-.4-1.4 1.2a1.4 1.4 0 0 1-1.9-2l.6-.5-.4-.4a1.4 1.4 0 0 1 .1-2l3-2.7 1.9 1.1ZM4.5 8.7 2 12l3 3.5 2.2-1.9L4.5 8.7Zm15 0 2.5 3.3-3 3.5-2.2-1.9 2.7-4.9Z",
  calendar:
    "M7 2v2h10V2h2v2h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V2h2ZM4 9v11h16V9H4Zm3 3h4v4H7v-4Z",
  check: "M9.55 17.6 4 12.05l1.4-1.4 4.15 4.15L18.6 5.7 20 7.1 9.55 17.6Z",
  pin: "M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z",
  community:
    "M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2 19c0-2.8 2.9-5 6.5-5s6.5 2.2 6.5 5v1H2v-1Zm14.2-3.7c2.3.5 3.8 2 3.8 3.7v1h-3.6v-1c0-1.4-.6-2.7-1.6-3.6l1.4-.1Z",
  trophy:
    "M7 3h10v1h3v3a4 4 0 0 1-3.4 3.95A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1a5 5 0 0 1-3.6-3.95A4 4 0 0 1 4 7V4h3V3Zm0 3H6v1a2 2 0 0 0 1 1.73V6Zm10 0v2.73A2 2 0 0 0 18 7V6h-1Z",
  star: "m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.2l1.2-6.6L2.5 9l6.6-.9L12 2Z",
  camera:
    "M9 3h6l1.5 2H20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5L9 3Zm3 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z",
  close: "M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3 1.4 1.4Z",
  chevron: "m9 5 7 7-7 7-1.4-1.4L13.2 12 7.6 6.4 9 5Z",
  search:
    "M10.5 3a7.5 7.5 0 1 0 4.55 13.46l4.24 4.25 1.42-1.42-4.25-4.24A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z",
  spark:
    "M12 2c.4 3.6 2.4 5.6 6 6-3.6.4-5.6 2.4-6 6-.4-3.6-2.4-5.6-6-6 3.6-.4 5.6-2.4 6-6ZM5.5 14c.2 1.9 1.2 2.9 3.1 3.1-1.9.2-2.9 1.2-3.1 3.1-.2-1.9-1.2-2.9-3.1-3.1 1.9-.2 2.9-1.2 3.1-3.1Z",
};

/** Icons drawn as outlines rather than filled shapes. */
const STROKED: ReadonlySet<IconName> = new Set<IconName>(["sprout"]);

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const stroked = STROKED.has(name);

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
      {...(stroked
        ? {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.8,
            strokeLinecap: "round" as const,
            strokeLinejoin: "round" as const,
          }
        : { fill: "currentColor" })}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
