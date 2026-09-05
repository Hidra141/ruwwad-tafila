import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactInfo } from "@/data/contact";

/**
 * The channels the hero does not already carry.
 *
 * There were four here — phone, WhatsApp, Facebook, the map. When the page
 * gained a hero, the two fastest moved into it, and for a while both sat on
 * screen twice at once: the same number, the same WhatsApp link, one above the
 * other. The hero keeps the two actions most visitors want; this section picks
 * up the two it does not.
 *
 * Each card is a full-size target that states what happens when you take it —
 * "أحدث الأنشطة والصور", "يفتح الموقع على خرائط جوجل" — rather than leaving
 * the visitor to guess whether a tap navigates or opens an app.
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
  tone: "facebook" | "map";
}

const TONES: Record<Channel["tone"], string> = {
  facebook: "bg-[#eaf1fd] text-[#1b4fa8] ring-[#d3e3fb]",
  map: "bg-accent-50 text-accent-700 ring-accent-100",
};

export function ContactDetails() {
  const channels: Channel[] = [
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
          قنوات تواصل أخرى
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
