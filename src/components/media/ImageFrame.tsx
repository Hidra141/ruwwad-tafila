import Image from "next/image";

import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

interface ImageFrameProps {
  image: ImageAsset;
  /**
   * Responsive sizes hint. Required whenever the image is not full-viewport
   * width, so the browser downloads the smallest usable file — this is what
   * keeps the alumni grid from pulling full-resolution portraits.
   */
  sizes?: string;
  /**
   * Opt in for above-the-fold images only. Everything else stays lazy, which
   * is next/image's default.
   */
  priority?: boolean;
  /** Fill the positioned parent instead of using intrinsic dimensions. */
  fill?: boolean;
  /** Optional quality override (1-100) */
  quality?: number;
  className?: string;
  imageClassName?: string;
}

/**
 * next/image wrapper that resolves the localized alt text from an `ImageAsset`
 * and renders an optional caption. Decorative images should pass an empty
 * Arabic alt string so they are correctly hidden from assistive technology.
 */
export function ImageFrame({
  image,
  sizes = "100vw",
  priority = false,
  fill = false,
  quality = 90,
  className,
  imageClassName,
}: ImageFrameProps) {
  const alt = t(image.alt);
  const caption = image.caption ? t(image.caption) : undefined;

  const img = fill ? (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("object-cover object-top", imageClassName)}
    />
  ) : (
    <Image
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("h-auto w-full", imageClassName)}
    />
  );

  if (!caption) {
    return <div className={cn(fill && "relative h-full w-full", className)}>{img}</div>;
  }

  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <div className={cn(fill && "relative h-full w-full")}>{img}</div>
      <figcaption className="text-sm text-ink-muted">{caption}</figcaption>
    </figure>
  );
}
