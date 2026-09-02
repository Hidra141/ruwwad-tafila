"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { NavLink } from "@/components/navigation/NavLink";

/**
 * Header: Sticky navigation bar sitting over the hero and transitioning
 * smoothly to a lightweight solid backdrop on scroll.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Dark hero pages where header should sit transparent/inverse at top
  const isDarkHeroPage =
    pathname === routes.home || pathname === routes.drosos || pathname === routes.youth;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOverHero = isDarkHeroPage && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isOverHero
          ? "bg-transparent text-white border-none shadow-none"
          : isScrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-line shadow-xs text-ink"
          : "bg-surface/80 backdrop-blur-md border-b border-line/60 text-ink"
      )}
    >
      <Container width="full">
        <div className="flex h-(--header-height) items-center gap-8">
          <Link
            href={routes.home}
            aria-label={t(siteConfig.name)}
            className="flex shrink-0 items-center transition-transform hover:scale-105"
          >
            <Logo isInverse={isOverHero} />
          </Link>

          <nav
            aria-label="القائمة الرئيسية"
            className="hidden flex-1 justify-center lg:flex"
          >
            <DesktopNavigation isInverse={isOverHero} />
          </nav>

          <div className="hidden shrink-0 items-center lg:flex">
            <NavLink href={routes.contact} isInverse={isOverHero} isCta>
              تواصل معنا
            </NavLink>
          </div>

          <div className="ms-auto lg:hidden">
            <MobileNavigation isInverse={isOverHero} />
          </div>
        </div>
      </Container>
    </header>
  );
}

