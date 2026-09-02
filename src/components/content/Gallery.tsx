import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface GalleryProps {
  images: ImageAsset[];
  /** Accessible name for the list of images. */
  label: string;
  columns?: 2 | 3;
  className?: string;
}

/**
 * Grid of images. Returns null when empty so callers never render an empty
 * section.
 *
 * Every image stays lazy and carries a `sizes` hint matching the grid, so the
 * browser downloads a column-sized file rather than the full-resolution
 * original. An interactive lightbox can be layered on later as a client
 * component; this stays a server component until it is.
 */
export function Gallery({
  images,
  label,
  columns = 3,
  className,
}: GalleryProps) {
  if (images.length === 0) return null;

  const sizes =
    columns === 3
      ? "(min-width: 64rem) 33vw, (min-width: 48rem) 50vw, 100vw"
      : "(min-width: 48rem) 50vw, 100vw";

  return (
    <ul
      aria-label={label}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {images.map((image) => (
        <li key={image.src}>
          <ResponsiveMedia ratio="landscape">
            <ImageFrame image={image} fill sizes={sizes} />
          </ResponsiveMedia>
        </li>
      ))}
    </ul>
  );
}
