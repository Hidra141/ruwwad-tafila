import type { ReactNode } from "react";

/**
 * Alumni layout with a parallel `@modal` slot.
 *
 * The slot is what makes the intercepted profile possible: navigating from the
 * archive to `/alumni/[slug]` fills `modal` with the intercepted route while
 * `children` keeps rendering the archive underneath. On a direct visit the slot
 * falls back to `@modal/default.tsx` (null) and the profile renders as a full
 * page through `children`.
 */
export default function AlumniLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
