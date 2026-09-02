import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactInfo } from "@/data/contact";

/**
 * The four confirmed ways to reach the centre, as cards rather than a
 * definition list.
 *
 * The list version put the channels behind small text links of the same
 * weight as body copy. Reaching someone is the whole purpose of this page, so
 * each channel is now a full-size target that states what happens when you
 * take it — "يفتح تطبيق الهاتف", "يفتح محادثة جديدة" — instead of leaving the
 * visitor to guess whether a tap dials, navigates, or opens an app.
 *
 * Address and opening hours are absent because neither has been supplied.
 */

interface Channel {
  label: string;
  value: string;
  hint: string;
  href: string;
  icon: ReactNode;
  ltr?: boolean;
  tone: "brand" | "whatsapp" | "facebook" | "map";
}

const TONES: Record<Channel["tone"], string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  whatsapp: "bg-[#e7f9ee] text-[#0f7a3d] ring-[#c7f0d8]",
  facebook: "bg-[#eaf1fd] text-[#1b4fa8] ring-[#d3e3fb]",
  map: "bg-accent-50 text-accent-700 ring-accent-100",
};

export function ContactDetails() {
  const channels: Channel[] = [
    {
      label: "اتصل بنا",
      value: contactInfo.phone.display,
      hint: "يفتح تطبيق الهاتف",
      href: `tel:${contactInfo.phone.value}`,
      ltr: true,
      tone: "brand",
      icon: (
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
      ),
    },
    {
      label: "راسلنا على واتساب",
      value: "ابدأ محادثة",
      hint: "يفتح محادثة جديدة",
      href: contactInfo.whatsapp.href,
      tone: "whatsapp",
      icon: (
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.42 1.31-1.95 1.36-.5.05-.98.23-3.3-.69-2.77-1.09-4.53-3.92-4.67-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.53.77 1.87.84 2.01.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.35-.41.47-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.66-.17 1.34Z" />
      ),
    },
    {
      label: "تابعنا على فيسبوك",
      value: "روّاد التنمية – الطفيلة",
      hint: "أحدث الأنشطة والصور",
      href: contactInfo.facebook.href,
      tone: "facebook",
      icon: (
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      ),
    },
    {
      label: "زُرنا في المركز",
      value: "الطفيلة، الأردن",
      hint: "يفتح الموقع على خرائط جوجل",
      href: contactInfo.location.href,
      tone: "map",
      icon: (
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
      ),
    },
  ];

  return (
    <Section spacing="compact" ariaLabelledBy="contact-details">
      <Container className="flex flex-col gap-8">
        <h2 id="contact-details" className="sr-only">
          قنوات التواصل
        </h2>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {channels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="lift group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs hover:border-brand-200"
              >
                <span
                  aria-hidden="true"
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ${TONES[channel.tone]}`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    {channel.icon}
                  </svg>
                </span>

                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold text-ink-subtle">
                    {channel.label}
                  </span>
                  <span
                    className="truncate text-base font-bold text-ink transition-colors group-hover:text-ink-brand"
                    {...(channel.ltr ? { "data-ltr": "" } : {})}
                  >
                    {channel.value}
                  </span>
                  <span className="mt-0.5 text-xs text-ink-subtle">
                    {channel.hint}
                  </span>
                </span>

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="ms-auto size-5 shrink-0 text-line-strong transition-all duration-[var(--duration-fast)] group-hover:-translate-x-1 group-hover:text-brand-500 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
