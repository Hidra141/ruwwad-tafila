"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";

import { primaryNavigation } from "@/config/navigation";
import { t } from "@/lib/i18n";

import { MenuTrigger } from "./MenuTrigger";
import { NavLink } from "./NavLink";

/**
 * Dedicated mobile navigation — spacious, thumb-accessible, and state-driven.
 */
interface MobileNavigationProps {
  isInverse?: boolean;
}

export function MobileNavigation({ isInverse = false }: MobileNavigationProps) {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Reset menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Prevent scroll when menu is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  return (
    <>
      <MenuTrigger
        isOpen={isOpen}
        onClick={toggle}
        controls={panelId}
        label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
        isInverse={isInverse}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="القائمة الرئيسية"
            aria-modal="true"
            initial={{ opacity: 0, y: "-2%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-2%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex h-dvh w-screen flex-col bg-surface p-0 text-ink shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <span className="text-sm font-bold text-ink-brand">
                روّاد التنمية – الطفيلة
              </span>
              <MenuTrigger
                isOpen
                onClick={close}
                controls={panelId}
                label="إغلاق القائمة"
              />
            </div>

            <nav
              aria-label="القائمة الرئيسية"
              className="flex flex-1 items-end px-6 pb-16 pt-8"
            >
              <ul className="flex w-full flex-col gap-2">
                {primaryNavigation.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      href={item.href}
                      onNavigate={close}
                      className="flex min-h-14 items-center text-2xl font-bold transition-colors hover:text-ink-brand"
                      activeClassName="text-ink-brand font-black"
                    >
                      {t(item.label)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

