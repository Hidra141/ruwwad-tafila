import { cn } from "@/lib/utils";

interface MenuTriggerProps {
  isOpen: boolean;
  onClick: () => void;
  /** Id of the panel this button controls. */
  controls: string;
  label: string;
  isInverse?: boolean;
  className?: string;
}

export function MenuTrigger({
  isOpen,
  onClick,
  controls,
  label,
  isInverse = false,
  className,
}: MenuTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={label}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-md transition-colors duration-[var(--duration-fast)]",
        isInverse && !isOpen ? "text-neutral-0 hover:bg-neutral-0/10" : "text-ink hover:bg-surface-sunken",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      >
        {isOpen ? (
          <>
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </>
        ) : (
          <>
            <line x1="3.5" y1="7" x2="20.5" y2="7" />
            <line x1="3.5" y1="12" x2="20.5" y2="12" />
            <line x1="3.5" y1="17" x2="20.5" y2="17" />
          </>
        )}
      </svg>
    </button>
  );
}
