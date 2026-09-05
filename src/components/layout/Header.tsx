"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { DesktopNavigation } from "@/components/navigation/DesktopNavigation";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { Container } from "@/components/ui/Container";
import { darkHeroRoutes, routes } from "@/config/routes";
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

  /* Which pages carry a dark hero is declared beside the route table, not
     here: the header is the wrong place to remember what another component
     renders, and keeping the two apart is how the youth page ended up with a
     white navigation bar on a pale gradient. */
  const isDarkHeroPage = darkHeroRoutes.includes(pathname);

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
        /*
          Transition only what changes. `transition-all` at 500ms animated
          every property the class swap touched, including the border colour,
          so the rule below drew a hairline that faded in and out across the
          full width of the viewport on every scroll — the most restless thing
          on the page, on every page.
        */
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-(--duration-base) ease-(--ease-out-soft)",
        isOverHero
          ? "bg-transparent text-white"
          : isScrolled
            ? /*
                A soft shadow instead of a border. The line's only job is to
                separate the bar from content sliding underneath it, and a
                1px hairline stretched edge to edge is a harder mark than that
                job needs — it cut across the hero gradients and collided with
                the rounded card edges beneath it. `shadow-sm` is the same
                token every raised surface on the site uses.
              */
              "bg-surface/90 text-ink shadow-sm backdrop-blur-xl"
            : /*
                Nothing at all at rest. At scroll zero there is no content
                under the bar to separate it from — the hero starts exactly
                there and paints its own colour behind it — so the line was
                dividing the page from nothing.
              */
              "bg-surface/70 text-ink backdrop-blur-md",
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

