import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { t } from "@/lib/i18n";
import type { Alumni, ImageAsset } from "@/types";

interface AlumniJourneyGalleryProps {
  alumni: Alumni;
  headingId: string;
}

/**
 * "Moments from my journey" — photographs of this graduate taking part.
 *
 * Draws from the graduate's own gallery and from any images attached to their
 * journey phases, de-duplicated by source path. It never borrows imagery from
 * another graduate or from stock, so it renders nothing until real photographs
 * are supplied.
 *
 * The layout adapts to however many images exist: one fills the width, two sit
 * side by side, three or more flow into a responsive grid.
 */
export function AlumniJourneyGallery({
  alumni,
  headingId,
}: AlumniJourneyGalleryProps) {
  const seen = new Set<string>();
  const images: ImageAsset[] = [];
  for (const image of [
    ...(alumni.gallery ?? []),
    ...(alumni.journey ?? []).flatMap((entry) => entry.images ?? []),
  ]) {
    if (seen.has(image.src)) continue;
    seen.add(image.src);
    images.push(image);
  }

  if (images.length === 0) return null;

  const columns =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <Section spacing="compact" ariaLabelledBy={headingId} className="py-12 bg-surface-muted/40 border-t border-line">
      <Container>
        <Reveal variant="slide-up">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-black tracking-wider text-ink-brand uppercase">
              معرض الصور الميدانية
            </p>
          </div>
          <h2
            id={headingId}
            className="mt-2 text-2xl font-black text-ink sm:text-3xl"
          >
            مشاهد مصورة من ورشات اليافع/ة
          </h2>
        </Reveal>

        <ul className={`mt-6 grid gap-5 ${columns}`}>
          {images.map((image, index) => (
            <li key={image.src}>
              <Reveal variant="scale" delay={Math.min(index * 0.06, 0.3)}>
                <div className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-xs transition-all hover:border-brand-300 hover:shadow-md">
                  <ResponsiveMedia
                    ratio={images.length === 1 ? "wide" : "landscape"}
                    rounded={false}
                  >
                    <ImageFrame
                      image={image}
                      fill
                      sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                      imageClassName="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                    />
                  </ResponsiveMedia>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="sr-only">{`صور من رحلة ${t(alumni.name)}`}</p>
      </Container>
    </Section>
  );
}
