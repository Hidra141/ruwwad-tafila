import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { alumniVoices } from "@/data/alumni-voices";
import { tRich } from "@/lib/i18n";
import type { Alumni } from "@/types";

interface AlumniVoiceProps {
  alumni: Alumni;
  headingId: string;
}

/**
 * "Words from the youth" — the graduate's testimony, verbatim.
 */
export function AlumniVoice({ alumni, headingId }: AlumniVoiceProps) {
  const storyParagraphs = alumni.story ? tRich(alumni.story) : [];
  const voiceParagraphs = alumniVoices[alumni.slug]?.ar || [];
  const introParagraphs = alumni.intro?.ar ? [alumni.intro.ar] : [];

  const paragraphs = storyParagraphs.length > 0 
    ? storyParagraphs 
    : voiceParagraphs.length > 0 
      ? voiceParagraphs 
      : introParagraphs;

  if (paragraphs.length === 0) return null;

  return (
    <Section spacing="compact" ariaLabelledBy={headingId} className="py-10 bg-surface-muted/60 border-y border-line">
      <Container width="content">
        <Reveal variant="slide-up">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-brand-500" />
            <p className="text-xs font-black tracking-wider text-ink-brand uppercase">
              صوت اليافع/ة • رسالة مباشرة
            </p>
          </div>
          <h2
            id={headingId}
            className="mt-2 text-2xl font-black text-ink sm:text-3xl"
          >
            كلام من القلب والتجربة
          </h2>
        </Reveal>

        <Reveal variant="slide-up" delay={0.1}>
          <figure className="relative mt-6 rounded-3xl border border-brand-200/80 bg-surface p-6 sm:p-10 shadow-sm transition-all hover:border-brand-300">
            {/* Decorative quotation mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-5 start-6 select-none text-7xl font-black text-brand-200/80 sm:start-8 sm:text-8xl"
            >
              “
            </span>

            <blockquote className="relative z-10 flex flex-col gap-4 text-base font-medium leading-relaxed text-ink sm:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="first-letter:text-xl font-semibold text-ink-brand/90">
                  {paragraph}
                </p>
              ))}
            </blockquote>

            <figcaption className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs font-extrabold text-ink-subtle">
              <span>{alumni.name.ar}</span>
              <span className="rounded-full bg-brand-50 border border-brand-200/60 px-3 py-1 text-brand-700">
                برنامج دروسوس — الطفيلة
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
