import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ImageAsset } from "@/types";

/**
 * Photographs from the centre's archive, one per year.
 *
 * This page previously ran to roughly six screens without a single image: the
 * founding story, the milestones and the impact were all set as body copy, and
 * the reader had nothing to look at between the hero and the closing call to
 * action. The archive holds hundreds of dated photographs, so the absence was
 * never for lack of material.
 *
 * Each frame carries the year it was taken, which is the only claim the
 * filenames support. Nothing here asserts who is pictured or what specific
 * activity is under way, because the archive does not record that.
 */
const archive: Array<ImageAsset & { year: string }> = [
  {
    year: "2019",
    src: "/assets/youth/youth-2019-2.webp",
    alt: { ar: "من أنشطة روّاد الطفيلة عام 2019" },
    width: 903,
    height: 600,
  },
  {
    year: "2021",
    src: "/assets/youth/youth-2021-1.webp",
    alt: { ar: "من أنشطة روّاد الطفيلة عام 2021" },
    width: 1500,
    height: 1000,
  },
  {
    year: "2022",
    src: "/assets/youth/youth-2022-3.webp",
    alt: { ar: "من أنشطة روّاد الطفيلة عام 2022" },
    width: 1152,
    height: 864,
  },
  {
    year: "2024",
    src: "/assets/youth/youth-2024-1.webp",
    alt: { ar: "من أنشطة روّاد الطفيلة عام 2024" },
    width: 1600,
    height: 1066,
  },
  {
    year: "2025",
    src: "/assets/youth/youth-2025-1.webp",
    alt: { ar: "من أنشطة روّاد الطفيلة عام 2025" },
    width: 1280,
    height: 960,
  },
];

export function AboutGallery() {
  return (
    <SectionSurface id="archive" ariaLabelledBy="about-archive-title">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="about-archive-title"
          eyebrow="الأرشيف"
          title="من أرشيف المركز"
          description="لقطات من سنوات العمل في الطفيلة، بالتاريخ الذي التُقطت فيه."
        />

        {/*
          The first frame spans two columns and two rows on desktop, the rest
          fill in around it. A uniform grid of five identical thumbnails reads
          as a contact sheet; giving one frame weight makes the group read as a
          composition and gives the eye somewhere to land first.
        */}
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {archive.map((photo, index) => {
            const isLead = index === 0;
            return (
              <li
                key={photo.src}
                className={isLead ? "col-span-2 row-span-2" : undefined}
              >
                <Reveal
                  variant="slide-up"
                  delay={Math.min(index * 0.06, 0.3)}
                  className="h-full"
                >
                  <figure className="group relative overflow-hidden rounded-2xl bg-surface-sunken shadow-xs ring-1 ring-black/5">
                    {/* Square throughout: two columns and two rows of square
                        cells, plus the gap between them, span a square area —
                        so the lead frame lines up with the four beside it
                        instead of setting its own height and breaking the
                        grid. */}
                    <ResponsiveMedia ratio="square" rounded={false}>
                      <ImageFrame
                        image={photo}
                        fill
                        sizes={
                          isLead
                            ? "(min-width: 48rem) 40rem, 92vw"
                            : "(min-width: 48rem) 20rem, 46vw"
                        }
                        imageClassName="media-zoom object-cover object-center"
                      />
                    </ResponsiveMedia>

                    {/* The gradient exists to hold the year legible over an
                        unknown photograph; without it a light sky behind the
                        label drops the contrast below readable. */}
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-3">
                      <span
                        className="text-sm font-semibold text-white drop-shadow-sm"
                        data-ltr
                      >
                        {photo.year}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </SectionSurface>
  );
}
