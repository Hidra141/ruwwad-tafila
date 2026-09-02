"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { totalReferencePhotos, referenceCategories } from "@/data/referencesData";

export function ReferencesHero() {
  return (
    <Section className="relative overflow-hidden bg-slate-950 text-white pt-24 pb-16 border-b border-slate-800/60">
      {/* Background Ambient Glow & Glass Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950/80 to-slate-950" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-400 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              معرض الصور والأرشيف التوثيقي
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              معرض مراجع <span className="bg-gradient-to-r from-brand-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">روّاد التنمية - الطفيلة</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
              أرشيف بصري شامل يوثّق كافة المحطات والمراحل التعليمية والتطبيقية: زمالة تواصل مع قوتك، المرحلة التأسيسية، أساسيات الحاسوب والطلاقة الرقمية، والاستوديوهات الإبداعية.
            </p>
          </Reveal>

          {/* Stats Bar with Glassmorphism */}
          <Reveal delay={300}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-4 text-center hover:border-slate-700 transition-all duration-300 shadow-lg group">
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-400 group-hover:scale-105 transition-transform duration-300">
                  {totalReferencePhotos.toLocaleString("ar-EG")}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">إجمالي الصور واللقطات</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-4 text-center hover:border-slate-700 transition-all duration-300 shadow-lg group">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 group-hover:scale-105 transition-transform duration-300">
                  {referenceCategories.length}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">مراحل توثيقية رئيسية</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-4 text-center hover:border-slate-700 transition-all duration-300 shadow-lg group">
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                  100%
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">تغطية الأنشطة والورش</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-4 text-center hover:border-slate-700 transition-all duration-300 shadow-lg group">
                <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 group-hover:scale-105 transition-transform duration-300">
                  2025 - 2026
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">الفترة الزمنية للدفعة</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
