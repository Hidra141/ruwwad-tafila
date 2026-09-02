"use client";

import { useId, useMemo, useState } from "react";
import { AlumniCard } from "@/components/alumni/AlumniCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAlumniGender } from "@/data/alumni-roster";
import type { Alumni } from "@/types";

interface AlumniInteractiveArchiveProps {
  initialAlumni: Alumni[];
}

type GenderFilter = "all" | "male" | "female";

export function AlumniInteractiveArchive({
  initialAlumni,
}: AlumniInteractiveArchiveProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");
  const searchId = useId();

  const { totalMale, totalFemale } = useMemo(() => {
    let male = 0;
    let female = 0;
    for (const entry of initialAlumni) {
      if (getAlumniGender(entry.slug) === "male") male += 1;
      else if (getAlumniGender(entry.slug) === "female") female += 1;
    }
    return { totalMale: male, totalFemale: female };
  }, [initialAlumni]);

  const query = searchQuery.trim();
  const filteredAlumni = initialAlumni.filter((entry) => {
    const gender = getAlumniGender(entry.slug);
    const matchesGender = genderFilter === "all" || gender === genderFilter;
    const matchesSearch =
      query === "" ||
      entry.name.ar.includes(query) ||
      Boolean(entry.name.en?.toLowerCase().includes(query.toLowerCase()));
    return matchesGender && matchesSearch;
  });

  const isFiltered = query !== "" || genderFilter !== "all";
  const reset = () => {
    setSearchQuery("");
    setGenderFilter("all");
  };

  /**
   * A segmented control, not three loose buttons. Grouping them inside one
   * sunken track makes the set read as "one of these three is active" at a
   * glance, and `aria-pressed` carries the same state to a screen reader.
   */
  const filters: Array<{ id: GenderFilter; label: string; count: number }> = [
    { id: "all", label: "الكل", count: initialAlumni.length },
    { id: "male", label: "شباب", count: totalMale },
    { id: "female", label: "صبايا", count: totalFemale },
  ];

  return (
    <Section spacing="compact" ariaLabelledBy="alumni-archive" className="pt-4 pb-16">
      <Container className="flex flex-col gap-7">
        <h2 id="alumni-archive" className="sr-only">
          قائمة الخريجين
        </h2>

        {/*
          Sticky, so the filters stay reachable while scrolling a long grid.
          Twenty-two cards run to about four screens, and having to scroll back
          to the top to change a filter is the kind of friction that stops
          people using filters at all.
        */}
        <div className="sticky top-(--header-height) z-20 flex flex-col gap-4 rounded-2xl border border-line bg-surface/85 p-3 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <div
            role="group"
            aria-label="تصفية حسب الفئة"
            className="flex items-center gap-1 self-start rounded-pill bg-surface-sunken p-1"
          >
            {filters.map((filter) => {
              const isActive = genderFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setGenderFilter(filter.id)}
                  className={`press min-h-9 rounded-pill px-4 text-sm font-bold ${
                    isActive
                      ? "bg-primary text-ink-inverse shadow-sm"
                      : "text-ink-muted hover:bg-surface hover:text-ink-brand"
                  }`}
                >
                  {filter.label}
                  <span
                    className={`ms-1.5 text-xs font-semibold ${
                      isActive ? "text-brand-100" : "text-ink-subtle"
                    }`}
                    data-ltr
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            {/*
              The placeholder alone left this control unnamed: it disappears on
              the first keystroke and does not count as an accessible name.
            */}
            <label htmlFor={searchId} className="sr-only">
              ابحث باسم الخريج
            </label>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <input
              id={searchId}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="ابحث باسم الخريج"
              className="min-h-10 w-full rounded-pill border-2 border-line bg-surface py-2 ps-9 pe-10 text-sm font-medium text-ink transition-colors duration-[var(--duration-fast)] placeholder:text-ink-subtle/80 hover:border-line-strong focus:border-brand-500 focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="مسح البحث"
                className="press absolute end-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-subtle hover:bg-surface-sunken hover:text-ink"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        {/*
          Announced, not merely displayed: a sighted visitor watches the grid
          change, a screen-reader user has to be told.
        */}
        <p
          aria-live="polite"
          className="px-1 text-sm font-semibold text-ink-subtle"
        >
          {filteredAlumni.length === initialAlumni.length ? (
            <>
              <span data-ltr>{initialAlumni.length}</span> خريجًا وخريجة
            </>
          ) : (
            <>
              <span data-ltr>{filteredAlumni.length}</span> من أصل{" "}
              <span data-ltr>{initialAlumni.length}</span>
            </>
          )}
        </p>

        {filteredAlumni.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {filteredAlumni.map((entry, index) => (
              <li key={entry.id}>
                <AlumniCard alumni={entry} priority={index < 4} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line-strong bg-surface-muted/60 px-6 py-16 text-center">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-10 text-line-strong"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <p className="text-lg font-bold text-ink">لا يوجد خريج بهذا الاسم</p>
            <p className="max-w-sm text-sm text-ink-muted">
              جرّب جزءًا من الاسم فقط، أو أعد ضبط التصفية لعرض الجميع.
            </p>
            <button
              type="button"
              onClick={reset}
              className="press mt-2 min-h-10 rounded-pill bg-primary px-5 text-sm font-bold text-ink-inverse hover:bg-primary-hover"
            >
              عرض جميع الخريجين
            </button>
          </div>
        )}

        {isFiltered && filteredAlumni.length > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="press mx-auto min-h-10 rounded-pill border-2 border-brand-200 px-5 text-sm font-bold text-ink-brand hover:border-brand-400 hover:bg-primary-soft"
          >
            عرض جميع الخريجين
          </button>
        ) : null}
      </Container>
    </Section>
  );
}
