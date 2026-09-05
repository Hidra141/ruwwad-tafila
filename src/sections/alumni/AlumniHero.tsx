import type { CSSProperties } from "react";

import Image from "next/image";

import { PageHero } from "@/components/sections/PageHero";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { getAllAlumni } from "@/lib/alumni";
import { t } from "@/lib/i18n";

/**
 * Opening of the alumni archive.
 *
 * There was no hero here at all — a bare `Section` holding an `h1` and a
 * paragraph, with no offset for the fixed header, so on a phone the page title
 * sat underneath the navigation bar. `PageHero` fixes that for every page at
 * once.
 *
 * Two decisions specific to this page:
 *
 * The title is filled with a photograph rather than a colour. This is the one
 * page where that treatment earns its place — it is a page about people, and
 * the word becomes a window onto them instead of a label above them. It is
 * used here and nowhere else; repeating it would spend it.
 *
 * The proof is faces, taken from the portraits already in the archive. A page
 * about people proves itself with people, not with a number about people.
 */

/**
 * Decorative texture only. The archive records the year a photograph was
 * taken and nothing else, so this asserts nothing about who is in it — and
 * inside letterforms it is legible as texture, not as a photograph of anyone
 * in particular.
 */
const TITLE_FILL = "/assets/youth/youth-2022-3.webp";

/** Enough to read as a group without becoming a gallery. */
const FACE_COUNT = 5;

export function AlumniHero() {
  const everyone = getAllAlumni();
  /* `portrait` is optional on the record, and the archive's placeholder avatar
     is deliberately not a likeness. A strip of those would be a row of
     medallions pretending to be faces, so only graduates with a real
     photograph appear here — the count beside them still covers everyone. */
  const faces = everyone
    .filter((person) => person.portrait)
    .slice(0, FACE_COUNT);
  const remaining = everyone.length - faces.length;

  return (
    <PageHero
      eyebrow="صندوق منح روّاد · برنامج دروسوس"
      title={
        <span
          className="photo-text"
          style={
            {
              /* A custom property, not `backgroundImage`: the utility has to be
                 able to drop the photograph on small screens, and an inline
                 background would outrank it. */
              "--photo-text-src": `url("${TITLE_FILL}")`,
              /* 900, not the 700 the shared hero sets: at 700 the photograph
                 inside these letterforms breaks up into noise. */
              fontVariationSettings: '"wght" 900',
            } as CSSProperties
          }
        >
          أرشيف الخريجين
        </span>
      }
      lead="سجل يوثّق رحلات خريجي وخريجات البرنامج في الطفيلة، ومشاريعهم التنموية والتقنية والإبداعية — كل رحلة بصفحتها."
    >
      <div className="flex flex-col gap-4">
        {/* `aria-hidden`: the portraits repeat what the count beside them
            already states, and announcing five names here would make a
            visitor listen to the roster twice. */}
        <ul
          aria-hidden="true"
          className="flex flex-row-reverse justify-end pe-3"
        >
          {faces.map((person) => (
            <li
              key={person.slug}
              className="relative -me-3 size-14 overflow-hidden rounded-full border-2 border-surface shadow-sm"
            >
              <Image
                src={person.portrait!.src}
                alt=""
                fill
                sizes="3.5rem"
                className="object-cover object-top"
              />
            </li>
          ))}
          {remaining > 0 ? (
            <li className="relative -me-3 grid size-14 place-items-center rounded-full border-2 border-surface bg-primary text-sm font-semibold text-ink-inverse shadow-sm">
              <span data-ltr>+{remaining}</span>
            </li>
          ) : null}
        </ul>

        <p className="text-sm text-ink-muted">
          <span className="text-lg font-bold text-ink-brand" data-ltr>
            {everyone.length}
          </span>{" "}
          رحلة موثّقة، بأسماء أصحابها ومشاريعهم.
        </p>

        {/* The portraits are hidden from assistive technology, so the names
            they belong to are restored here — the faces are decorative, the
            people are not. */}
        <VisuallyHidden>
          من بين الخريجين: {faces.map((p) => t(p.name)).join("، ")}.
        </VisuallyHidden>
      </div>
    </PageHero>
  );
}
