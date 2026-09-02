import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { SkipLink } from "./SkipLink";

/**
 * Global page chrome: skip link, header, the `<main>` landmark, and footer.
 *
 * Holds no page-specific content — pages supply everything through `children`.
 * The flex column keeps the footer at the bottom on short pages.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
