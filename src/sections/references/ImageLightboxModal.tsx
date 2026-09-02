"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import type { ReferenceImage } from "@/data/referencesData";

interface LightboxProps {
  images: ReferenceImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightboxModal({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex! - 1 + images.length) % images.length;
        onNavigate(prevIndex);
      }
      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex! + 1) % images.length;
        onNavigate(nextIndex);
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl transition-all duration-300 p-4">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Lightbox Content Box */}
      <div className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-3xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 overflow-hidden">
        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4 px-2">
          <div className="text-slate-300 text-xs sm:text-sm font-medium">
            صورة <span className="text-brand-400 font-bold">{currentIndex! + 1}</span> من <span className="text-slate-400">{images.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={currentImage.src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-700/50 transition-colors"
            >
              فتح بالحجم الكامل ↗
            </a>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors"
              aria-label="إغلاق"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Frame Container */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/60">
          <Image
            src={currentImage.src}
            alt={currentImage.originalName}
            fill
            className="object-contain transition-opacity duration-300"
            sizes="(max-width: 1280px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Bottom Bar / Caption */}
        <div className="w-full text-center pt-3 text-xs text-slate-400 truncate">
          {currentImage.originalName}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex! - 1 + images.length) % images.length);
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-slate-700/60 text-white hover:bg-brand-600 transition-all hover:scale-110 shadow-lg"
          aria-label="الصورة السابقة"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex! + 1) % images.length);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-slate-700/60 text-white hover:bg-brand-600 transition-all hover:scale-110 shadow-lg"
          aria-label="الصورة التالية"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
