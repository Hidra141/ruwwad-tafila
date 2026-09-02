"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

interface AlumniModalProps {
  children: ReactNode;
  /** Accessible name for the dialog, normally the graduate's name. */
  label: string;
}

/**
 * Overlay container for an intercepted graduate profile.
 *
 * Built on a native `<dialog>` so focus moves into the overlay on open, is
 * trapped while it is open, and returns to the triggering card on close —
 * plus inerting of the page behind, all from the platform.
 *
 * Every dismissal — close button, backdrop click, Escape — routes through
 * `router.back()`, which pops the history entry the interception pushed. That
 * unmounts this component and takes the dialog with it, so browser back and
 * the close button are genuinely the same action and the URL stays shareable
 * throughout.
 *
 * Deliberately unstyled beyond layout: the overlay's visual treatment belongs
 * to the design phase.
 */
export function AlumniModal({ children, label }: AlumniModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Dismissal can be triggered from several places at once, and `back()` must
  // run exactly once. Reset on mount so React's development double-invoke of
  // effects cannot leave the guard latched.
  const hasDismissed = useRef(false);

  const dismiss = useCallback(() => {
    if (hasDismissed.current) return;
    hasDismissed.current = true;
    router.back();
  }, [router]);

  useEffect(() => {
    hasDismissed.current = false;

    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    /**
     * Escape fires `cancel`, which does not bubble and so never reaches
     * React's synthetic event system. Preventing the default close keeps the
     * dialog mounted until the route change removes it, so dismissal has a
     * single path regardless of how it was triggered.
     */
    const handleCancel = (event: Event) => {
      event.preventDefault();
      dismiss();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [dismiss]);

  useEffect(() => {
    // Set and removed rather than saved and restored: an idempotent pair
    // survives the effect running twice without capturing its own value.
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-brand-950/60 backdrop:backdrop-blur-sm"
    >
      <div
        // Clicking the empty area around the panel dismisses; clicks inside it
        // bubble here with a different target and are ignored.
        onClick={(event) => {
          if (event.target === event.currentTarget) dismiss();
        }}
        className="flex min-h-full justify-center overflow-y-auto p-0 sm:p-6"
      >
        <div className="relative h-fit w-full max-w-(--container-page) bg-surface pb-(--spacing-gutter) shadow-2xl sm:rounded-card">
          {/*
            Sticky, not absolute. A graduate profile runs to roughly five
            screens, and an absolutely positioned close button scrolled away
            with the content — three screens down there was no visible way out
            of the overlay at all. Anchoring the toolbar to the top of the
            scroll container keeps the exit on screen for the whole read.

            The fade to transparent below it lets content pass under the bar
            without a hard edge, and the blur keeps the button legible over
            whatever is scrolling past.
          */}
          <div className="sticky top-0 z-30 flex justify-end bg-gradient-to-b from-surface via-surface/95 to-transparent px-(--spacing-gutter) pt-4 pb-6 sm:rounded-t-card">
            <button
              type="button"
              onClick={dismiss}
              aria-label="إغلاق"
              className="press inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-sm backdrop-blur-sm hover:border-brand-300 hover:bg-primary-soft hover:text-ink-brand"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>

          <div className="-mt-2 px-(--spacing-gutter)">{children}</div>
        </div>
      </div>
    </dialog>
  );
}
