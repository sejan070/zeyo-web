"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Compass, Clock, Palette, ShieldCheck } from "lucide-react";

export default function ExperienceSection() {
  const { t } = useLanguage();

  const traits = [
    {
      icon: Compass,
      title: t.experience.trait1Title,
      desc: t.experience.trait1Desc,
      num: "01"
    },
    {
      icon: Clock,
      title: t.experience.trait2Title,
      desc: t.experience.trait2Desc,
      num: "02"
    },
    {
      icon: Palette,
      title: t.experience.trait3Title,
      desc: t.experience.trait3Desc,
      num: "03"
    },
    {
      icon: ShieldCheck,
      title: t.experience.trait4Title,
      desc: t.experience.trait4Desc,
      num: "04"
    }
  ];

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#e9e7e2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 border border-[#2b2927]/30 bg-[#e9e7e2] mb-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#2b2927] font-sans-luxury font-bold">
              {t.experience.kicker}
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2b2927] font-bold tracking-tight mb-4">
            {t.experience.title}
          </h2>
          <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-medium">
            {t.experience.subtitle}
          </p>
        </div>

        {/* 4 Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {traits.map((trait, idx) => {
            const Icon = trait.icon;
            return (
              <div
                key={idx}
                className="bg-[#f3f1ec] border border-[#2b2927]/15 rounded-[16px] p-8 relative flex flex-col justify-between hover:border-[#C9A24B] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-luxury text-2xl font-light text-[#C9A24B]/50 group-hover:text-[#C9A24B] transition-colors">
                      {trait.num}
                    </span>
                    <div className="w-10 h-10 border border-[#C9A24B]/30 bg-[#FAF6F0] flex items-center justify-center group-hover:bg-[#0B1F3A] transition-colors">
                      <Icon className="w-5 h-5 text-[#967425] group-hover:text-[#F3DE9A] transition-colors" />
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-2xl text-[#2b2927] font-bold mb-3">
                    {trait.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#595550] font-sans-luxury font-bold leading-relaxed">
                    {trait.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#C9A24B]/15">
                  <div className="w-8 h-[2px] bg-[#C9A24B]/40 group-hover:w-16 group-hover:bg-[#C9A24B] transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
