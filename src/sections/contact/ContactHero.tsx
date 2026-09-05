import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { contactInfo } from "@/data/contact";

/**
 * Opening of the contact page.
 *
 * This page's `h1` was written inline in `app/contact/page.tsx` — one heading
 * in a bare `Section`, with no introduction and no offset for the fixed
 * header, so on a phone the title sat under the navigation bar. It has a
 * component now, and a first sentence, which it never had.
 *
 * The proof slot carries the two fastest channels rather than a statistic.
 * This is the only page on the site whose entire purpose is a single action,
 * and holding that action back for a full screen — behind a hero that only
 * announces the page it is already on — is the one mistake here that costs
 * anything. Both links state what happens when you take them.
 */
export function ContactHero() {
  return (
    <PageHero
      eyebrow="مركز روّاد التنمية – الطفيلة"
      title="تواصل معنا"
      lead="المركز مفتوح للشباب والأهالي والشركاء. اختر القناة الأسرع بالنسبة لك، أو اترك رسالتك في النموذج أسفل الصفحة."
    >
      <div className="flex flex-col gap-3">
        <a
          href={`tel:${contactInfo.phone.value}`}
          className="press flex items-center justify-between gap-3 rounded-2xl bg-primary px-5 py-4 text-ink-inverse shadow-md hover:bg-primary-hover"
        >
          <span className="flex flex-col">
            <span className="text-base font-semibold">اتصل بنا</span>
            {/* The number is Latin digits and punctuation inside an Arabic
                page: without the isolation it reorders on screen. */}
            <span className="text-sm text-brand-100" data-ltr>
              {contactInfo.phone.display}
            </span>
          </span>
          <Icon name="chevron" className="size-5 rotate-180 opacity-80" />
        </a>

        <a
          href={contactInfo.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex items-center justify-between gap-3 rounded-2xl border-2 border-brand-200 bg-surface px-5 py-4 text-ink-brand hover:border-brand-400 hover:bg-primary-soft"
        >
          <span className="flex flex-col">
            <span className="text-base font-semibold">راسلنا على واتساب</span>
            <span className="text-sm text-ink-muted">
              يفتح محادثة جديدة في تبويب آخر
            </span>
          </span>
          <Icon name="chevron" className="size-5 rotate-180 opacity-70" />
        </a>
      </div>
    </PageHero>
  );
}
