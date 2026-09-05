"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { primaryNavigation } from "@/config/navigation";
import { t } from "@/lib/i18n";

export function MobileBottomDock() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dockItems = [
    {
      id: "home",
      label: "الرئيسية",
      href: routes.home,
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      isActive: pathname === routes.home,
    },
    {
      id: "youth",
      label: "اليافعين",
      href: routes.youth,
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      isActive: pathname === routes.youth,
    },
    {
      id: "projects",
      label: "المشاريع",
      href: routes.projects,
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      isActive: pathname === routes.projects,
    },
    {
      id: "alumni",
      label: "الخريجين",
      href: routes.alumni,
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      isActive: pathname.startsWith("/alumni"),
    },
  ];

  return (
    <>
      {/* Mobile Floating Bottom Dock (Visible only on < md screens) */}
      <nav
        aria-label="شريط الوصول السريع للهاتف"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-surface/90 backdrop-blur-2xl border-t border-line/80 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0.5rem)] px-3 pt-2"
      >
        <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
          {dockItems.map((item) => {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex flex-col items-center justify-center min-w-[3.5rem] py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-90 ${
                  item.isActive
                    ? "text-brand-700 dark:text-brand-300 font-black"
                    : "text-ink-subtle hover:text-ink font-medium"
                }`}
              >
                {/* Active Pill Background */}
                {item.isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-brand-500/10 dark:bg-brand-500/20 rounded-2xl -z-10 border border-brand-500/20"
                  />
                )}
                <span className="flex items-center justify-center">{item.icon}</span>
                <span className="text-[0.68rem] tracking-tight mt-1">{item.label}</span>
              </Link>
            );
          })}

          {/* More / Menu Drawer Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`relative flex flex-col items-center justify-center min-w-[3.5rem] py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-90 ${
              isMenuOpen
                ? "text-brand-700 font-black"
                : "text-ink-subtle hover:text-ink font-medium"
            }`}
            aria-label="عرض جميع أقسام الموقع"
          >
            <span className="flex items-center justify-center">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            <span className="text-[0.68rem] tracking-tight mt-1">المزيد</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer / Bottom Sheet for "More" */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 md:hidden flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/15 bg-gradient-to-b from-[#0a2736] via-[#061822] to-[#041017] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 pb-safe text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/20" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-brand-400 shadow-[0_0_8px_#0CADD9] animate-pulse" />
                <h3 className="text-base font-black text-white">روّاد التنمية – الطفيلة</h3>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {primaryNavigation.map((navItem) => {
                const isNavActive = pathname === navItem.href;
                return (
                  <Link
                    key={navItem.id}
                    href={navItem.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-3.5 rounded-2xl border transition-all active:scale-95 ${
                      isNavActive
                        ? "bg-brand-500/25 text-brand-200 border-brand-400/40 shadow-sm font-black"
                        : "bg-white/[0.06] border-white/10 text-white/90 hover:bg-white/10 font-bold"
                    }`}
                  >
                    <span className="text-sm">{t(navItem.label)}</span>
                  </Link>
                );
              })}
            </div>

            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4 text-xs text-white/90 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-black text-brand-300">
                <span>📍</span>
                <span>مركز روّاد التنمية – محافظة الطفيلة</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                برامج تمكينية وتعليمية واستوديوهات تكنولوجية متقدمة لشباب ويافعي المجتمع المحلي.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
