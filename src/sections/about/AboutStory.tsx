import { ImageFrame } from "@/components/media/ImageFrame";
import { ResponsiveMedia } from "@/components/media/ResponsiveMedia";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionSurface } from "@/components/ui/SectionSurface";
import type { ImageAsset } from "@/types";

/**
 * The founding story of the Tafila branch.
 *
 * The four paragraphs are the organisation's own text, restored word for word.
 * An earlier pass had condensed them to remove the overlap with the timeline
 * below; the copy is the client's to write, not the layout's to edit, so the
 * shortening is reverted. The timeline keeps its narrative descriptions, which
 * is where the de-duplication belongs.
 *
 * What is kept from that pass is the shape around the words: a sticky label
 * beside the text so the reader always knows which part of the page they are
 * in, and a photograph, because four paragraphs of unbroken Arabic prose at a
 * reading measure is the densest block on the site.
 */

/**
 * One photograph, dated. The archive records the year and nothing else, so the
 * caption claims nothing about who is pictured.
 */
const foundingPhoto: ImageAsset & { year: string } = {
  year: "2018",
  src: "/assets/youth/youth-2018-3.webp",
  alt: { ar: "من أنشطة مركز روّاد التنمية في الطفيلة" },
  width: 1258,
  height: 785,
};

export function AboutStory() {
  return (
    <SectionSurface id="story" ariaLabelledBy="about-story-title">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal variant="slide-up">
            <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--header-height)+6rem)]">
              <div>
                <p className="text-sm font-semibold tracking-wide text-ink-brand">
                  البداية
                </p>
                <h2
                  id="about-story-title"
                  className="mt-3 text-3xl font-semibold text-ink"
                >
                  قصة تأسيس ونمو فرع الطفيلة
                </h2>
              </div>

              {/* Beside the text on desktop, above it on a phone — either way
                  the reader has something to look at before the prose. */}
              <figure className="overflow-hidden rounded-2xl border border-line shadow-xs">
                <ResponsiveMedia ratio="landscape" rounded={false}>
                  <ImageFrame
                    image={foundingPhoto}
                    fill
                    sizes="(min-width: 64rem) 22rem, 92vw"
                    imageClassName="object-cover object-center"
                  />
                </ResponsiveMedia>
                <figcaption className="bg-surface-muted px-4 py-2.5 text-xs text-ink-subtle">
                  من أنشطة المركز · <span data-ltr>{foundingPhoto.year}</span>
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Reveal variant="slide-up" delay={0.08}>
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-ink-muted">
              <p>
                بدأت رحلة روّاد التنمية في محافظة الطفيلة صيف عام 2012 عبر تأسيس
                صندوق منح روّاد الطفيلة بالشراكة مع جمعية رؤيانا الخيرية، حيث
                انطلقت المبادرة بتقديم 32 منحة تعليمية للشباب والشابات المقبولين
                في الجامعات، مقترنة بساعات الخدمة المجتمعية والتمكين الذاتي.
              </p>
              <p>
                وفي عام 2013، اتسع نطاق التأثير ليرتفع عدد المنح إلى 50 منحة
                سنويًا، مع إطلاق المكون الإثرائي التفاعلي &quot;دردشات&quot;
                للشباب، وتنفيذ أول نادٍ صيفي موجه للأطفال في قرية عيمة بمشاركة
                وإدارة شباب المنطقة.
              </p>
              <p>
                تتوجت هذه الجهود في عام 2014 بالافتتاح الرسمي لمركز روّاد التنمية
                الطفيلة ليكون حاضنة مجتمعية ودائمة للبرامج الشبابية والأنشطة
                التنموية. وشهد عام 2018 التوسع في المكونات البرامجية الموجهة
                لليافعين والحاضنات الإبداعية والريادة المجتمعية، حتى عام 2020 حين
                تم توسعة مساحة المركز ليصبح بيئة آمنة وشاملة للتعبير والتعلم
                والابتكار.
              </p>
              <p>
                واليوم، يُواصل مركز روّاد التنمية – الطفيلة عمله الفعّال في مختلف
                مناطق ومجتمعات المحافظة، مؤمنًا بقدرة الشباب واليافعين على قيادة
                التغيير المجتمعي وصناعة الفرق.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </SectionSurface>
  );
}
