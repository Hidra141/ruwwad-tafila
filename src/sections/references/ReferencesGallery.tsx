"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { referenceCategories, type ReferenceImage, type ReferenceCategory } from "@/data/referencesData";
import { ImageLightboxModal } from "./ImageLightboxModal";

const ITEMS_PER_PAGE = 24;

export function ReferencesGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(ITEMS_PER_PAGE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter categories and images based on active tab & search query
  const filteredImages = useMemo(() => {
    let images: ReferenceImage[] = [];

    if (activeCategory === "all") {
      referenceCategories.forEach((cat) => {
        images.push(...cat.items);
      });
    } else {
      const selected = referenceCategories.find((cat) => cat.id === activeCategory);
      if (selected) {
        images = [...selected.items];
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      images = images.filter((img) => img.originalName.toLowerCase().includes(q));
    }

    return images;
  }, [activeCategory, searchQuery]);

  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, displayCount);
  }, [filteredImages, displayCount]);

  const handleTabChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setDisplayCount(ITEMS_PER_PAGE);
    setSearchQuery("");
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <Section className="bg-slate-950 text-slate-100 min-h-screen py-12 relative">
      <Container>
        {/* Category Navigation Tabs */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => handleTabChange("all")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                activeCategory === "all"
                  ? "bg-brand-500 text-slate-950 border-brand-400 shadow-lg shadow-brand-500/20 scale-105"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              جميع المراحل ({referenceCategories.reduce((sum, c) => sum + c.count, 0)})
            </button>

            {referenceCategories.map((cat: ReferenceCategory) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabChange(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                    isActive
                      ? "bg-slate-800 border-slate-600 text-white shadow-md shadow-slate-900/50 scale-105"
                      : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span>{cat.title.ar}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive ? "bg-brand-500/20 text-brand-300" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Search & Counter Header Bar */}
        <Reveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
            <div className="text-xs sm:text-sm text-slate-400">
              عرض <span className="text-brand-400 font-bold">{Math.min(visibleImages.length, filteredImages.length)}</span> من إجمالي{" "}
              <span className="text-white font-bold">{filteredImages.length}</span> صورة
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="بحث في أسماء الصور..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Photo Grid */}
        {visibleImages.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-slate-800/60 p-8">
            <p className="text-slate-400 text-base">لم يتم العثور على صور تطابق بحثك.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-semibold text-brand-400 hover:underline"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {visibleImages.map((img: ReferenceImage, idx: number) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 aspect-square"
              >
                <Image
                  src={img.src}
                  alt={img.originalName}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between text-white text-xs font-medium">
                    <span className="truncate max-w-[80%] text-[10px] text-slate-300">{img.originalName}</span>
                    <span className="p-1 rounded-full bg-slate-800/80 text-brand-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {visibleImages.length < filteredImages.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 border border-slate-700/80 text-sm font-semibold text-white hover:bg-brand-500 hover:text-slate-950 hover:border-brand-400 transition-all duration-300 shadow-lg hover:shadow-brand-500/20 hover:scale-105"
            >
              <span>تحميل المزيد من الصور ({filteredImages.length - visibleImages.length} متبقية)</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </Container>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </Section>
  );
}
