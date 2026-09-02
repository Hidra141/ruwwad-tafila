import { primaryNavigation } from "@/config/navigation";
import { t } from "@/lib/i18n";

import { NavLink } from "./NavLink";

/**
 * Primary navigation for wide viewports. Lightweight by design: a single row
 * of links, no dropdowns, no extra height.
 *
 * Rendered inside the header's `<nav>` landmark, so it emits a plain list.
 */
interface DesktopNavigationProps {
  isInverse?: boolean;
}

export function DesktopNavigation({ isInverse = false }: DesktopNavigationProps) {
  return (
    <ul className="flex items-center gap-6 lg:gap-8 text-base">
      {primaryNavigation.map((item) => (
        <li key={item.id}>
          <NavLink href={item.href} isInverse={isInverse}>
            {t(item.label)}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
