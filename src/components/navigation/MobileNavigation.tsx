"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";

import { primaryNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { t } from "@/lib/i18n";
import { MenuTrigger } from "./MenuTrigger";

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

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  const navIcons: Record<string, string> = {
    home: "🏠",
    about: "📖",
    youth: "⚡",
    projects: "🖨️",
    drosos: "🌱",
    alumni: "🎓",
  };

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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex h-dvh w-screen flex-col bg-gradient-to-b from-[#061822] via-[#0a2736] to-[#041017] text-white shadow-2xl overflow-y-auto"
          >
            {/* Ambient Background Glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 -start-32 size-96 rounded-full bg-brand-500/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-10 -end-24 size-80 rounded-full bg-teal-400/15 blur-3xl"
            />

            {/* Top Navigation Bar */}
            <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
              {/* Close Button on the left */}
              <button
                onClick={close}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/90 hover:text-white hover:bg-white/20 transition-all active:scale-90"
                aria-label="إغلاق القائمة"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Brand Title & Logo on the right */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col text-end">
                  <span className="text-base font-black tracking-tight text-white">
                    روّاد التنمية
                  </span>
                  <span className="text-[0.65rem] font-bold text-brand-300">
                    محافظة الطفيلة
                  </span>
                </div>
                <div className="relative size-9 rounded-xl overflow-hidden border border-brand-400/40 shadow-sm bg-brand-900 shrink-0">
                  <Image
                    src="/assets/brand/ruwwad-logo.jpg"
                    alt="شعار روّاد التنمية"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Menu Scrollable Content */}
            <div className="relative z-10 flex flex-1 flex-col gap-5 px-4 py-6 max-w-md mx-auto w-full pb-safe">
              {/* Floating Glassmorphic Navigation Card */}
              <div className="rounded-3xl border border-white/15 bg-white/[0.07] backdrop-blur-2xl p-3 sm:p-4 shadow-2xl flex flex-col gap-2">
                {primaryNavigation.map((item) => {
                  const isActive =
                    item.href === routes.home
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={close}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 active:scale-98 ${
                        isActive
                          ? "bg-brand-500/25 border border-brand-400/40 text-brand-200 font-black shadow-sm"
                          : "text-white/80 hover:text-white hover:bg-white/[0.06] font-bold"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isActive ? (
                          <span className="size-2 rounded-full bg-brand-400 shadow-[0_0_8px_#0CADD9] animate-pulse" />
                        ) : (
                          <span className="text-base opacity-75">
                            {navIcons[item.id] ?? "•"}
                          </span>
                        )}
                        <span className="text-base font-bold">
                          {t(item.label)}
                        </span>
                      </div>

                      {isActive && (
                        <span className="text-xs text-brand-300 font-extrabold bg-brand-950/60 px-2.5 py-0.5 rounded-full border border-brand-400/30">
                          النشط
                        </span>
                      )}
                    </Link>
                  );
                })}

                {/* Prominent Contact Us Button Inside the Card */}
                <div className="pt-2 border-t border-white/10 mt-1">
                  <Link
                    href={routes.contact}
                    onClick={close}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white py-3.5 text-base font-black shadow-lg shadow-brand-600/30 transition-all active:scale-95"
                  >
                    <span>تواصل معنا</span>
                    <span aria-hidden="true">←</span>
                  </Link>
                </div>
              </div>

              {/* Secondary Action CTA Pills */}
              <div className="flex flex-col gap-3">
                <Link
                  href={routes.youth}
                  onClick={close}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white py-3.5 text-sm sm:text-base font-black shadow-md shadow-brand-500/20 transition-all active:scale-95"
                >
                  <span>استكشف برامج اليافعين</span>
                  <span aria-hidden="true">⚡</span>
                </Link>

                <Link
                  href={routes.projects}
                  onClick={close}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-white/25 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white py-3.5 text-sm sm:text-base font-bold backdrop-blur-md transition-all active:scale-95"
                >
                  <span>معرض مشاريع الاستوديوهات 3D</span>
                  <span aria-hidden="true">🖨️</span>
                </Link>
              </div>

              {/* Bottom Visual Highlight Card (Ruwwad Center Tafila) */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/30 backdrop-blur-xl p-4 shadow-xl flex items-center gap-3.5 mt-1">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-brand-950">
                  <Image
                    src="/assets/studios/studio-2-banner.png"
                    alt="استوديوهات روّاد"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] font-bold text-brand-300 uppercase tracking-wider">
                    مختبرات الابتكار والتمكين
                  </span>
                  <span className="text-xs font-black text-white leading-snug">
                    استوديوهات التكنولوجيا والطباعة ثلاثية الأبعاد بالطفيلة
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
