import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { contactInfo } from "@/data/contact";
import { t } from "@/lib/i18n";

/**
 * Site footer: one slim band — identity, copyright, and a single call to
 * action.
 *
 * Deliberately not a sitemap. The header already carries the primary
 * navigation on every page, so repeating it here would add height without
 * adding a way to get anywhere new.
 *
 * The mark is composed here rather than taken from `Logo`, because this is a
 * quieter lockup: a small mark with the name and strapline stacked beside it.
 * `Logo` sets the name inline next to a larger mark, which is right for the
 * header but makes the footer block twice as tall and twice as wide.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-brand-950 text-white">
      {/* Ambient wash, low and centred so it never sits behind the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 start-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      {/* Full width, so the mark and the button line up with the header's. */}
      <Container width="full" className="relative">
        <div className="flex flex-col items-center gap-8 py-7 text-center md:flex-row md:justify-between md:gap-10 md:text-start">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <Image
              src="/assets/brand/ruwwad-tafila-logo.jpg"
              alt=""
              width={473}
              height={659}
              className="h-10 w-auto shrink-0 rounded-md object-contain"
            />
            <div className="flex flex-col gap-1 text-start">
              <p className="text-base leading-none font-extrabold text-white">
                {t(siteConfig.name)}
              </p>
              <p className="max-w-xs text-xs leading-snug text-pretty text-brand-200/85">
                مساحة تمكين ومستقبل يرافق اليافعين والشباب في الطفيلة لتطوير
                المعرفة، الابتكار، والقيادة المجتمعية.
              </p>
            </div>
          </div>

          {/* Copyright and credit */}
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-sm text-neutral-300">
              <span data-ltr>{year}</span> © جميع الحقوق محفوظة لمؤسسة{" "}
              {t(contactInfo.organization)}
            </p>
            <p className="flex items-center gap-2 text-xs">
              <span className="text-neutral-400" data-ltr>
                Powered by
              </span>
              <span className="font-bold text-brand-300" data-ltr>
                Mohamed Hassouna
              </span>
            </p>
          </div>

          {/* Call to action */}
          <Link
            href={routes.contact}
            className="press group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-pill bg-white px-7 text-sm font-bold text-brand-900 shadow-lg shadow-brand-950/40 hover:bg-brand-50"
          >
            تواصل معنا وشاركنا رأيك
            <span
              aria-hidden="true"
              className="transition-transform duration-[var(--duration-fast)] group-hover:-translate-x-1"
            >
              ←
            </span>
          </Link>
        </div>
      </Container>
    </footer>
  );
}
