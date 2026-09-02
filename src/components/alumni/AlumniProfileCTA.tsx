import Link from "next/link";

import { ImageFrame } from "@/components/media/ImageFrame";
import { Reveal } from "@/components/motion/Reveal";
import { AppLink } from "@/components/ui/AppLink";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { routes } from "@/config/routes";
import { t } from "@/lib/i18n";
import type { AlumniNeighbours } from "@/types";

interface AlumniProfileCTAProps {
  neighbours?: AlumniNeighbours;
}

/**
 * Closing band: on to the next graduate, or back to the archive.
 *
 * Previous and next are labelled by direction in reading order rather than by
 * left and right, so the wording stays correct in an RTL document. Each card is
 * a single link, so there is one tab stop per graduate.
 */
export function AlumniProfileCTA({ neighbours }: AlumniProfileCTAProps) {
  const previous = neighbours?.previous;
  const next = neighbours?.next;

  return (
    <Section spacing="compact" ariaLabel="متابعة تصفح قصص الخريجين">
      <Container>
        <div className="rounded-3xl border border-line bg-surface-muted p-6 sm:p-10">
          <Reveal variant="slide-up">
            <h2 className="text-2xl font-extrabold text-balance text-ink sm:text-3xl">
              لكل خريج قصة
            </h2>
            <p className="mt-2 text-base text-ink-muted">
              تابع بقية قصص خريجي دروسوس في الطفيلة.
            </p>
          </Reveal>

          {previous || next ? (
            <nav
              aria-label="التنقل بين قصص الخريجين"
              className="mt-7 grid gap-4 sm:grid-cols-2"
            >
              {[
                { entry: previous, label: "القصة السابقة", rel: "prev" },
                { entry: next, label: "القصة التالية", rel: "next" },
              ].map(({ entry, label, rel }) =>
                entry ? (
                  <Link
                    key={rel}
                    href={routes.alumniProfile(entry.slug)}
                    rel={rel}
                    className="group flex min-h-11 items-center gap-4 rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-brand-300"
                  >
                    {entry.portrait ? (
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-surface-sunken">
                        <ImageFrame
                          image={entry.portrait}
                          fill
                          sizes="3.5rem"
                          imageClassName="object-cover object-top"
                        />
                      </span>
                    ) : null}
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-ink-subtle">
                        {label}
                      </span>
                      <span className="block truncate font-bold text-ink group-hover:text-ink-brand">
                        {t(entry.name)}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <span key={rel} aria-hidden="true" className="hidden sm:block" />
                ),
              )}
            </nav>
          ) : null}

          <div className="mt-7">
            <AppLink href={routes.alumni} variant="primary">
              تصفّح كل الخريجين
            </AppLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
