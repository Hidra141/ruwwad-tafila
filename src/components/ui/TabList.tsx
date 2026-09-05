"use client";

import { useRef, type KeyboardEvent } from "react";

export interface TabDefinition<Id extends string> {
  id: Id;
  label: string;
}

interface TabListProps<Id extends string> {
  /** Names the set for assistive technology, e.g. "أقسام برنامج اليافعين". */
  label: string;
  tabs: ReadonlyArray<TabDefinition<Id>>;
  activeTab: Id;
  onChange: (id: Id) => void;
  /** Prefix for the generated tab and panel ids; must match the panel's. */
  idPrefix: string;
}

/**
 * The site's tab strip, following the WAI-ARIA tabs pattern.
 *
 * Both the youth page and the Drosos page had their own copy of this: five and
 * four hand-written buttons that looked like tabs but were not one. Each
 * button was its own tab stop, so reaching the content of the last panel meant
 * pressing Tab five times, and nothing told a screen reader that the buttons
 * were a set or which panel each one governed.
 *
 * What the pattern adds, beyond the roles: exactly one tab stop for the whole
 * strip (`tabIndex` is 0 only on the selected tab), arrow keys to move between
 * tabs with wrap-around, and Home/End to jump to either end.
 *
 * Arrow direction is mirrored for RTL. In an Arabic page the first tab sits on
 * the right, so ArrowLeft has to advance forward through the list — using the
 * logical direction here would send the focus visually backwards.
 */
export function TabList<Id extends string>({
  label,
  tabs,
  activeTab,
  onChange,
  idPrefix,
}: TabListProps<Id>) {
  const tabRefs = useRef<Partial<Record<Id, HTMLButtonElement | null>>>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    let next: number;

    switch (event.key) {
      case "ArrowLeft":
        next = index + 1;
        break;
      case "ArrowRight":
        next = index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const target = tabs[(next + tabs.length) % tabs.length].id;
    onChange(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div className="flex items-center justify-center max-w-full overflow-hidden px-1">
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
        className="inline-flex max-w-full overflow-x-auto no-scrollbar scrollbar-none flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-1 rounded-2xl sm:rounded-pill border border-line bg-surface/90 p-1.5 shadow-sm backdrop-blur-md"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              onClick={() => onChange(tab.id)}
              className={`press min-h-10 rounded-pill px-4 text-xs font-bold sm:px-5 sm:text-sm ${
                isActive
                  ? "bg-primary text-ink-inverse shadow-sm"
                  : "text-ink-muted hover:bg-primary-soft hover:text-ink-brand"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TabPanelProps<Id extends string> {
  activeTab: Id;
  idPrefix: string;
  children: React.ReactNode;
}

/**
 * The region the strip controls. One element whose id and label follow the
 * active tab, rather than one per tab: only a single panel is ever mounted, so
 * duplicating the wrapper would add markup without adding meaning.
 */
export function TabPanel<Id extends string>({
  activeTab,
  idPrefix,
  children,
}: TabPanelProps<Id>) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${activeTab}`}
      aria-labelledby={`${idPrefix}-tab-${activeTab}`}
      tabIndex={0}
      className="focus-visible:outline-none"
    >
      {children}
    </div>
  );
}
