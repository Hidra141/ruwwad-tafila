import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { SkipLink } from "./SkipLink";
import { MobileBottomDock } from "@/components/navigation/MobileBottomDock";

/**
 * Global page chrome: skip link, header, the `<main>` landmark, footer, and mobile bottom dock.
 *
 * Holds no page-specific content — pages supply everything through `children`.
 * The flex column keeps the footer at the bottom on short pages.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col pb-16 md:pb-0">
      <SkipLink />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBottomDock />
    </div>
  );
}

