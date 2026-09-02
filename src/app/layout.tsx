import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

import { SiteShell } from "@/components/layout/SiteShell";
import { SITE_URL, siteConfig } from "@/config/site";
import { getDirection, getLocale, t } from "@/lib/i18n";

import "./globals.css";

/**
 * Arabic-first typeface with full Latin coverage, so one family serves both
 * languages. `display: swap` keeps text visible during load, and the CSS
 * variable feeds `--font-sans` in `globals.css`.
 *
 * PROVISIONAL: replace with the approved brand typeface when it is supplied.
 */
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const locale = getLocale();
const siteName = t(siteConfig.name, locale);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteName,
    // Page titles supply their own text; the site name is appended here.
    template: `%s | ${siteName}`,
  },
  description: t(siteConfig.description, locale),
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    locale: "ar_JO",
    url: SITE_URL,
    images: siteConfig.ogImage
      ? [{ url: siteConfig.ogImage, width: 1200, height: 630 }]
      : undefined,
  },
  twitter: {
    card: siteConfig.ogImage ? "summary_large_image" : "summary",
    images: siteConfig.ogImage ? [siteConfig.ogImage] : undefined,
  },
  robots: { index: true, follow: true },
  // Registered here so a bilingual routing layer can extend it later without
  // touching every page.
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={locale} dir={getDirection(locale)} className={arabic.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/*
          Motion server-renders its hidden `initial` state, so content inside a
          `Reveal` would stay invisible if JavaScript never runs. This restores
          it for those visitors; when scripting is on, the rule is inert and
          Motion animates as normal.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}[data-reveal-path]{opacity:1 !important;stroke-dasharray:none !important}`}</style>
        </noscript>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
