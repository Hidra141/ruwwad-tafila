/**
 * Lets keyboard users jump past the header straight to the page content.
 * Visually hidden until focused.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-ink-brand focus:shadow-md"
    >
      تخطَّ إلى المحتوى الرئيسي
    </a>
  );
}
