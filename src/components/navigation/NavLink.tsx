"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  /** Called after navigation, e.g. to close the mobile menu. */
  onNavigate?: () => void;
  isInverse?: boolean;
  isCta?: boolean;
  className?: string;
  activeClassName?: string;
}

export function NavLink({
  href,
  children,
  onNavigate,
  isInverse = false,
  isCta = false,
  className,
  activeClassName,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === routes.home ? pathname === href : pathname.startsWith(href);

  if (isCta) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "press inline-flex min-h-10 items-center justify-center rounded-pill px-5 text-sm font-bold",
          isInverse
            ? "border-2 border-white/50 bg-white/10 text-white backdrop-blur-sm hover:border-white/80 hover:bg-white/20"
            : "bg-primary text-ink-inverse shadow-sm hover:bg-primary-hover",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  const defaultActiveStyle = isInverse
    ? "font-bold text-white"
    : "font-bold text-ink-brand";
  const defaultInactiveStyle = isInverse
    ? "text-white/80 hover:text-white"
    : "text-ink-muted hover:text-ink-brand";

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative pt-1 pb-1.5 text-sm font-semibold lg:text-base transition-colors duration-(--duration-fast)",
        isActive ? cn(defaultActiveStyle, activeClassName) : defaultInactiveStyle,
        className
      )}
    >
      {children}
      {/*
        A drawn mark rather than `text-decoration: underline`.

        An underline is the typographically correct way to do this in Latin
        text, but Arabic sits half its letters below the baseline — the ج and
        the ي in "الخريجون" both descend — and a real underline cuts straight
        through them. The mark has to clear the descenders, which means drawing
        it rather than decorating the text.

        It sits at the bottom edge of the link's padding box. It used to sit a
        further 4px below that, which put roughly ten pixels of empty space
        between the word and its mark and left the line looking like a stray
        dash parked under the navigation rather than part of the active item.
      */}
      {isActive && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 h-[3px] rounded-pill",
            /* `cyan-300` was Tailwind's default ramp, the one colour in the
               header that came from outside the brand palette. `brand-300` is
               the same hue family as everything around it. */
            isInverse ? "bg-brand-300" : "bg-brand-600",
          )}
        />
      )}
    </Link>
  );
}



