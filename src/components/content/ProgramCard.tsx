import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { AppLink } from "@/components/ui/AppLink";
import { t, tMaybe } from "@/lib/i18n";
import type { Program } from "@/types";

/**
 * Concise card for a Ruwwad programme. Summary, image, and link are each
 * optional, so a programme with only a name still renders cleanly.
 */
export function ProgramCard({ program }: { program: Program }) {
  const title = t(program.title);
  const summary = tMaybe(program.summary);

  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-xl border border-line bg-surface p-6 shadow-xs lift hover:border-brand-300">
      <div className="flex flex-col gap-3">
        {program.image ? (
          <ResponsiveMedia ratio="landscape">
            <ImageFrame
              image={program.image}
              fill
              sizes="(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
            />
          </ResponsiveMedia>
        ) : null}
        <h3 className="text-xl font-bold text-ink">
          {program.href ? (
            <AppLink href={program.href} className="no-underline hover:text-ink-brand">
              {title}
            </AppLink>
          ) : (
            title
          )}
        </h3>
        {summary ? <p className="text-base leading-relaxed text-ink-muted">{summary}</p> : null}
      </div>
      {program.href ? (
        <div className="pt-2">
          <AppLink href={program.href} className="inline-flex items-center text-xs font-bold text-brand-700 hover:underline min-h-[44px] py-2">
            اقرأ المزيد ←
          </AppLink>
        </div>
      ) : null}
    </article>
  );
}
