"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui/Container";
import { aboutSections } from "@/data/about";
import { cn } from "@/lib/utils";

/**
 * In-page navigation for the story page.
 *
 * The page runs to six substantial sections, and before this the only way to
 * reach the impact figures was to scroll past the whole founding narrative.
 * The bar sticks directly beneath the site header — hence the `top` offset
 * reading the same `--header-height` variable the header sizes itself with,
 * so the two can never separate.
 *
 * The active link is resolved from an IntersectionObserver rather than from
 * scroll position arithmetic: it stays correct when sections have wildly
 * different heights, which these do.
 */
export function AboutNav() {
  const [active, setActive] = useState<string>(aboutSections[0].id);

  useEffect(() => {
    const targets = aboutSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (targets.length === 0) return;

    /**
     * The band runs from just under the sticky bar to the middle of the
     * viewport. A section counts as current once its top edge enters that
     * band, which matches where a reader's eye actually is — a full-height
     * root would hand "current" to whichever section merely happens to be
     * tallest on screen.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="أقسام الصفحة"
      className="sticky top-(--header-height) z-30 border-y border-line bg-surface/85 backdrop-blur-md"
    >
      <Container>
        <ul className="-mx-1 flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {aboutSections.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "press inline-flex min-h-9 items-center rounded-pill px-4 text-sm font-semibold",
                    isActive
                      ? "bg-primary-soft text-ink-brand"
                      : "text-ink-muted hover:bg-surface-sunken hover:text-ink",
                  )}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
