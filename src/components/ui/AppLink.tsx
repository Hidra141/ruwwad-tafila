import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

interface AppLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  /** Render with button styling. Omit for a plain inline link. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Accessible label announcing that the link opens a new tab. Applied
   * automatically to external links; override for a more specific phrasing.
   */
  newTabLabel?: string;
}

const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");

/**
 * Navigation link. Routes internal hrefs through next/link for client-side
 * transitions and prefetching, and hardens external hrefs with
 * `rel="noopener noreferrer"`.
 */
export function AppLink({
  href,
  children,
  variant,
  size,
  className,
  newTabLabel,
  ...props
}: AppLinkProps) {
  const classes = variant
    ? buttonStyles(variant, size, className)
    : cn(
        "text-ink-brand underline-offset-4 hover:underline transition-colors duration-[var(--duration-fast)]",
        className,
      );

  if (isExternal(href)) {
    const opensNewTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": newTabLabel,
            }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  );
}
