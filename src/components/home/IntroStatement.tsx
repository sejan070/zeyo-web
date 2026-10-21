"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function IntroStatement() {
  const { locale, t } = useLanguage();

  return (
    <section className="py-24 sm:py-36 bg-[#e9e7e2] relative overflow-hidden">
      {/* Decorative luxury monogram watermark */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
        <span className="font-serif-luxury text-[380px] font-bold text-[#2b2927]">
          Z
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Signature Sarah Haywood Dash Kicker */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-[1.5px] bg-[#2b2927]/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#2b2927] font-sans-luxury font-bold">
            {locale === "bn" ? "জেয়ো দর্শন" : "THE ZEYO PHILOSOPHY"}
          </span>
          <span className="w-8 h-[1.5px] bg-[#2b2927]/40" />
        </div>

        {/* Large Bold Uppercase Serif Display Headline (Exact Sarah Haywood 64px) */}
        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-[64px] text-[#2b2927] font-bold tracking-[0.04em] uppercase leading-[1.05] mb-10">
          {locale === "bn" ? (
            <span className="font-bengali font-bold">
              আমরা প্রতিটি ইভেন্টকে করি অনন্য ও অবিস্মরণীয়
            </span>
          ) : (
            <>
              Orchestrating the{" "}
              <span className="italic font-bold">Exceptional.</span>
            </>
          )}
        </h2>

        {/* Editorial Narrative with breathing room (Exact Montserrat 16px, line-height 1.65, #595550) */}
        <div className="space-y-6 text-base sm:text-[17px] text-[#595550] font-sans-luxury font-bold leading-[1.65] max-w-3xl mx-auto">
          <p>{t.intro.paragraph1}</p>
          <p className="text-[#595550] text-sm sm:text-base leading-[1.65] font-bold">
            {t.intro.paragraph2}
          </p>
        </div>

        {/* Refined emblem ornament */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="w-16 h-[1px] bg-[#2b2927]/20" />
          <div className="w-2 h-2 rotate-45 border border-[#C9A24B] bg-[#e9e7e2]" />
          <div className="w-16 h-[1px] bg-[#2b2927]/20" />
        </div>
      </div>
    </section>
  );
}
