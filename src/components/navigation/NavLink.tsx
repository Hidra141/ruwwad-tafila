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
        "relative py-1 text-sm font-semibold lg:text-base transition-colors duration-200",
        isActive ? cn(defaultActiveStyle, activeClassName) : defaultInactiveStyle,
        className
      )}
    >
      {children}
      {isActive && (
        <span
          className={cn(
            "absolute -bottom-1 inset-x-0 h-0.5 rounded-full transition-all",
            isInverse ? "bg-cyan-300" : "bg-brand-600"
          )}
        />
      )}
    </Link>
  );
}



