import type { ExternalLink, LocalizedText } from "@/types";

/**
 * Contact details supplied by Ruwwad. Nothing here is inferred — add new
 * channels only when official information is provided.
 */
export const contactInfo = {
  organization: {
    ar: "روّاد التنمية – الطفيلة",
    en: "Ruwwad Al-Tanmeya – Tafila",
  } satisfies LocalizedText,
  phone: {
    /** E.164, used for the `tel:` href. */
    value: "+962778477111",
    /** Display form. Kept LTR-safe via `dir="ltr"` at the render site. */
    display: "+962 77 847 7111",
  },
  /**
   * The same line as `phone`, addressed through WhatsApp.
   *
   * This is the only channel on the site that can actually carry a written
   * message: there is no inbox and no form endpoint, so the contact form
   * composes its text and hands it to WhatsApp rather than pretending to
   * deliver it. Digits only, no `+` — that is the wa.me format.
   */
  whatsapp: {
    number: "962778477111",
    href: "https://wa.me/962778477111",
    label: { ar: "واتساب", en: "WhatsApp" },
  },
  facebook: {
    href: "https://www.facebook.com/p/رواد-التنمية-الطفيلة-100072354133679/",
    label: { ar: "فيسبوك", en: "Facebook" },
  } satisfies ExternalLink,
  location: {
    href: "https://www.google.com/maps/search/30.837709,+35.618664",
    label: { ar: "الموقع على الخريطة", en: "View on map" },
    coordinates: { latitude: 30.837709, longitude: 35.618664 },
  },
} as const;

/** Social channels, ordered for rendering. Only Facebook is confirmed today. */
export const socialLinks: ExternalLink[] = [contactInfo.facebook];
