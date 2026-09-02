"use client";

import { useState, type FormEvent } from "react";
import { contactInfo } from "@/data/contact";

interface FormState {
  fullName: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const FIELD_BASE =
  "min-h-11 rounded-lg border-2 bg-surface px-4 py-2.5 text-base text-ink " +
  "transition-colors duration-[var(--duration-fast)] " +
  "placeholder:text-ink-subtle/70 focus:outline-none";
const FIELD_OK = "border-line hover:border-line-strong focus:border-brand-500";
const FIELD_BAD = "border-accent-600 bg-accent-50/40 focus:border-accent-600";

/**
 * Composes a message and hands it to WhatsApp.
 *
 * The previous version of this form validated the input, waited 600ms, and
 * displayed "تمت مراجعة بيانات الرسالة بنجاح" — while sending nothing
 * anywhere. There is no inbox, no endpoint and no email address on record, so
 * every message a visitor wrote was discarded behind a success screen.
 *
 * Rather than delete the form, it now builds the text and opens WhatsApp on
 * the centre's own number with that text prefilled. The visitor presses send
 * themselves, in an app that shows them it was delivered. Nothing is claimed
 * that did not happen, and the message genuinely arrives.
 *
 * The email field is gone: it existed only to collect a reply address for a
 * reply that could never be sent. WhatsApp carries the sender's identity.
 */
export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const update = (field: keyof FormState) => (value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    // Clear the error the moment the visitor starts fixing it, rather than
    // making them submit again to find out whether they succeeded.
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const next: FormErrors = {};
    if (!formData.fullName.trim()) next.fullName = "يرجى إدخال الاسم";
    if (!formData.subject.trim()) next.subject = "يرجى إدخال الموضوع";
    if (!formData.message.trim()) next.message = "يرجى كتابة نص الرسالة";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const text = [
      `الاسم: ${formData.fullName.trim()}`,
      `الموضوع: ${formData.subject.trim()}`,
      "",
      formData.message.trim(),
    ].join("\n");

    window.open(
      `${contactInfo.whatsapp.href}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const fields = [
    {
      id: "fullName" as const,
      label: "الاسم",
      placeholder: "اسمك الكامل",
      type: "text" as const,
    },
    {
      id: "subject" as const,
      label: "الموضوع",
      placeholder: "التسجيل في برنامج اليافعين، استفسار، تطوّع…",
      type: "text" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-ink">اكتب رسالتك</h3>
        <p className="text-sm leading-relaxed text-ink-muted">
          نكتبها هنا معًا، ثم يفتح واتساب وهي جاهزة — وتبقى أنت من يضغط إرسال.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1.5">
            <label
              htmlFor={field.id}
              className="text-sm font-semibold text-ink"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              value={formData[field.id]}
              onChange={(event) => update(field.id)(event.target.value)}
              aria-invalid={Boolean(errors[field.id])}
              aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
              placeholder={field.placeholder}
              className={`${FIELD_BASE} ${errors[field.id] ? FIELD_BAD : FIELD_OK}`}
            />
            {errors[field.id] ? (
              <span
                id={`${field.id}-error`}
                className="text-xs font-semibold text-accent-700"
              >
                {errors[field.id]}
              </span>
            ) : null}
          </div>
        ))}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-ink">
            الرسالة
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(event) => update("message")(event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="اكتب تفاصيل رسالتك هنا…"
            className={`${FIELD_BASE} min-h-32 py-3 ${errors.message ? FIELD_BAD : FIELD_OK}`}
          />
          {errors.message ? (
            <span
              id="message-error"
              className="text-xs font-semibold text-accent-700"
            >
              {errors.message}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          className="press mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-pill bg-[#25D366] px-6 font-bold text-[#08331b] shadow-[0_6px_16px_-6px_rgb(37_211_102/0.6)] hover:bg-[#1fbe5a]"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="size-5 shrink-0"
            fill="currentColor"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.42 1.31-1.95 1.36-.5.05-.98.23-3.3-.69-2.77-1.09-4.53-3.92-4.67-4.1-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.28.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.53.77 1.87.84 2.01.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.35-.41.47-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.66-.17 1.34Z" />
          </svg>
          متابعة عبر واتساب
        </button>
      </form>
    </div>
  );
}
