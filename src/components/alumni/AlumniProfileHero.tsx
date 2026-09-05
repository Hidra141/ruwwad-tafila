import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { GRADUATE_AVATAR, getAlumniGender } from "@/data/alumni-roster";
import { alumniVoices } from "@/data/alumni-voices";
import { routes } from "@/config/routes";
import { t, tRich } from "@/lib/i18n";
import type { Alumni } from "@/types";

interface AlumniProfileHeroProps {
  alumni: Alumni;
  headingLevel?: 1 | 2;
}

export function AlumniProfileHero({
  alumni,
  headingLevel = 1,
}: AlumniProfileHeroProps) {
  const Name = headingLevel === 1 ? "h1" : "h2";
  const nameText = t(alumni.name);
  const gender = getAlumniGender(alumni.slug);
  const cohortLabelText = gender === "female" ? "خريجة برنامج دروسوس – الطفيلة" : "خريج برنامج دروسوس – الطفيلة";
  const badgeText = gender === "female" ? "خريجة من روّاد التنمية – الطفيلة" : "خريج من روّاد التنمية – الطفيلة";

  const storyParagraphs = alumni.story ? tRich(alumni.story) : [];
  const voiceParagraphs = alumniVoices[alumni.slug]?.ar || [];
  const introParagraphs = alumni.intro?.ar ? [alumni.intro.ar] : [];

  const mainQuote = storyParagraphs[0] || voiceParagraphs[0] || introParagraphs[0];

  return (
    /*
      The four sections below this one each wrap themselves in `Section` +
      `Container`; this hero did not, so it ran edge to edge while everything
      after it stopped at the page width — measured at 1265px against a 1184px
      content column on a 1280px screen, and the gap only widens on a larger
      display. It is contained now, like its siblings.
    */
    <Section spacing="compact" className="pt-2 sm:pt-4">
      <Container>
        <header className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface via-surface-muted/50 to-surface p-4 sm:p-8 md:p-10 shadow-sm">
      {/* Background ambient lighting orbs */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-brand-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-sky-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-5 sm:gap-8 lg:flex-row lg:items-center lg:gap-12">
        {/* High-Res Portrait Image / Avatar Column with Interactive Frame */}
        <Reveal variant="slide-up" className="w-full max-w-[14rem] sm:max-w-[18rem] mx-auto lg:mx-0 lg:w-96 shrink-0">
          <div className="group relative overflow-hidden rounded-2xl border-2 border-brand-200/80 bg-surface shadow-md transition-all duration-500 hover:border-brand-400 hover:shadow-xl">
            <ResponsiveMedia
              ratio="portrait"
              className="relative w-full overflow-hidden bg-surface-sunken"
            >
              {alumni.portrait ? (
                <>
                  <ImageFrame
                    image={alumni.portrait}
                    fill
                    priority
                    sizes="(min-width: 64rem) 24rem, (min-width: 48rem) 20rem, 14rem"
                    quality={95}
                    imageClassName="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 z-10" />
                </>
              ) : (
                <ImageFrame
                  image={{
                    ...GRADUATE_AVATAR,
                    alt: { ar: `لا تتوفر صورة لـ${nameText}` },
                  }}
                  fill
                  sizes="(min-width: 64rem) 24rem, (min-width: 48rem) 20rem, 14rem"
                  imageClassName="object-cover"
                />
              )}
            </ResponsiveMedia>
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 start-2.5 z-20 flex items-center gap-2">
              <span className="inline-flex rounded-full bg-slate-950/80 border border-white/20 px-2.5 py-0.5 text-[0.65rem] sm:text-[0.72rem] font-bold text-white backdrop-blur-md">
                ✨ {cohortLabelText}
              </span>
            </div>
          </div>
        </Reveal>

        {/* Info & Badges Column */}
        <div className="flex flex-1 flex-col gap-3.5 sm:gap-5">
          <Reveal variant="fade" delay={0.1}>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={routes.alumni}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-ink-muted shadow-2xs transition-all hover:border-brand-300 hover:text-ink-brand"
              >
                <span>←</span>
                <span>دليل الخريجين</span>
              </Link>
              <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-black text-brand-700">
                {badgeText}
              </span>
            </div>
          </Reveal>

          <Reveal variant="slide-up" delay={0.15}>
            <div className="flex flex-col gap-1 sm:gap-2">
              <span className="text-[0.7rem] sm:text-xs font-bold text-ink-subtle tracking-wider uppercase">
                {cohortLabelText} {alumni.graduationYear ? ` • ${alumni.graduationYear}` : ""}
              </span>
              <Name className="text-2xl sm:text-4xl font-black tracking-tight text-balance text-ink leading-tight">
                {nameText}
              </Name>
              {alumni.name.en ? (
                <p className="text-xs sm:text-base font-semibold text-ink-subtle" data-ltr>
                  {alumni.name.en}
                </p>
              ) : null}
            </div>
          </Reveal>

          {/* Integrated Youth Quote Box */}
          {mainQuote ? (
            <Reveal variant="slide-up" delay={0.18}>
              <div className="relative rounded-2xl border border-brand-200/80 bg-brand-50/50 p-3.5 sm:p-5 shadow-2xs">
                <span className="absolute -top-3.5 start-3 text-2xl sm:text-3xl font-black text-brand-300 select-none">“</span>
                <p className="max-w-(--container-content) text-xs sm:text-base leading-relaxed text-brand-950 ps-2.5">
                  {mainQuote}
                </p>
              </div>
            </Reveal>
          ) : null}

          {/* Quick Metrics Badges Ribbon */}
          <Reveal variant="slide-up" delay={0.2}>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-0.5 sm:pt-1">
              <div className="flex flex-col rounded-2xl border border-line bg-surface p-2 sm:p-3 text-center shadow-2xs">
                <span className="text-[0.65rem] sm:text-xs font-extrabold text-ink-muted">المكان</span>
                <span className="mt-0.5 text-[0.7rem] sm:text-xs font-black text-ink">الطفيلة</span>
              </div>
              <div className="flex flex-col rounded-2xl border border-line bg-surface p-2 sm:p-3 text-center shadow-2xs">
                <span className="text-[0.65rem] sm:text-xs font-extrabold text-ink-muted">مسار التعلم</span>
                <span className="mt-0.5 text-[0.7rem] sm:text-xs font-black text-brand-600">5 مراحل</span>
              </div>
              <div className="flex flex-col rounded-2xl border border-line bg-surface p-2 sm:p-3 text-center shadow-2xs">
                <span className="text-[0.65rem] sm:text-xs font-extrabold text-ink-muted">الاستوديو</span>
                <span className="mt-0.5 text-[0.7rem] sm:text-xs font-black text-emerald-600">تصنيع 3D</span>
              </div>
            </div>
          </Reveal>
        </div>
          </div>
        </header>
      </Container>
    </Section>
  );
}
