"use client";

import React, { useState, useEffect } from "react";
import { eventPackages, EventPackage } from "@/data/packages";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Tag, MessageCircle, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/scroll";

export default function PackagesSection() {
  const { locale, t, selectedPackage, setSelectedPackage, packageFilter, setPackageFilter } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activePkgId, setActivePkgId] = useState<string>(selectedPackage || "medium");
  // Compact / Expandable card state (initially compact as requested)
  const [expandedPkgs, setExpandedPkgs] = useState<Record<string, boolean>>({});

  // Sync with global package filter triggered from Header Packages dropdown
  useEffect(() => {
    if (packageFilter) {
      setActiveFilter(packageFilter);
    }
  }, [packageFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPackageFilter(filter);
  };

  const toggleExpand = (pkgId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedPkgs((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  const filteredPackages = eventPackages.filter((pkg) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "intimate") return pkg.tier === "intimate";
    if (activeFilter === "celebration") return pkg.tier === "celebration";
    if (activeFilter === "grand") return pkg.tier === "grand" || pkg.tier === "royal";
    return true;
  });

  const handleCardClick = (pkg: EventPackage) => {
    setActivePkgId(pkg.id);
    setSelectedPackage(pkg.id);
  };

  const handleInquireClick = (e: React.MouseEvent, pkg: EventPackage) => {
    e.stopPropagation();
    setActivePkgId(pkg.id);
    setSelectedPackage(pkg.id);
    smoothScrollTo("inquiry", 84);
  };

  return (
    <section id="packages" className="py-20 sm:py-28 bg-[#e9e7e2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#2b2927] font-bold tracking-tight mb-3">
            {t.packagesSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-bold">
            {t.packagesSection.subtitle}
          </p>
        </div>

        {/* Filter Chips (3D Pill Shape) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {[
            { id: "all", label: t.packagesSection.filterAll },
            { id: "intimate", label: t.packagesSection.filterIntimate },
            { id: "celebration", label: t.packagesSection.filterCelebration },
            { id: "grand", label: t.packagesSection.filterGrand }
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] transition-all duration-300 border cursor-pointer select-none font-bold ${
                  isActive
                    ? "bg-[#2b2927] text-white border-[#2b2927] shadow-[0_8px_22px_rgba(43,41,39,0.35)] scale-105"
                    : "bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] hover:bg-none hover:bg-[#2b2927] text-[#071426] hover:text-white border-[#E0C172] hover:border-[#2b2927] shadow-[0_4px_15px_rgba(201,162,75,0.35)] hover:shadow-[0_8px_22px_rgba(43,41,39,0.3)] hover:scale-105"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Compact 3D Glassmorphic Packages Grid with Subtle Luxury Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start [perspective:1200px]">
          {filteredPackages.map((pkg) => {
            const isSelected = activePkgId === pkg.id;
            const isExpanded = !!expandedPkgs[pkg.id];
            const isBn = locale === "bn";
            const rawDigits = isBn
              ? pkg.priceBn.replace("৳", "").trim()
              : pkg.price.replace("৳", "").trim();

            return (
              <div
                key={pkg.id}
                onClick={() => handleCardClick(pkg)}
                className={`group relative flex flex-col justify-between rounded-[24px] p-6 sm:p-7 transition-all duration-400 ease-out cursor-pointer select-none overflow-hidden ${
                  isSelected
                    ? "border-2 border-[#C9A24B] ring-4 ring-[#C9A24B]/35 shadow-[0_24px_50px_rgba(201,162,75,0.38)] -translate-y-2.5 scale-[1.018]"
                    : "border border-[#d8c8b4] hover:border-[#C9A24B] shadow-[0_8px_25px_rgba(43,41,39,0.06)] hover:shadow-[0_22px_45px_rgba(201,162,75,0.3)] hover:-translate-y-2.5 hover:scale-[1.015]"
                }`}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* 1. Base Resting Background: Clean Luxury Pearl Ivory */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fcfaf6] to-[#f4efe5] transition-opacity duration-400" />

                {/* 2. Hover Background: Smooth Minimalist Warm Golden Champagne Color Shift */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#fffdf5] via-[#faeed0] to-[#f3dea9] transition-opacity duration-400 pointer-events-none ${
                    isSelected
                      ? "opacity-0"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* 3. Persistent Selected State: Warm Golden Champagne Aura */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fffdf7] via-[#faebc7] to-[#eed08f] transition-opacity duration-400 pointer-events-none" />
                )}

                {/* 4. Top Specular Shine Highlight */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />

                {/* 5. Subtle Hover Specular Sheen Animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                {/* Top Badge (Featured or Selected Indicator) */}
                <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                  {pkg.badge ? (
                    <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-sans-luxury font-bold shadow-xs rounded-full bg-[#C9A24B] text-[#071426]">
                      {isBn ? pkg.badgeBn : pkg.badge}
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-widest text-[#8E6E26] font-sans-luxury font-bold">
                      ZEYO PACKAGE
                    </span>
                  )}

                  {isSelected && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2b2927] text-[#F3DE9A] text-[10px] uppercase tracking-wider font-bold shadow-sm">
                      <Check className="w-3 h-3 text-[#C9A24B] stroke-[3]" />
                      <span>{isBn ? "সিলেক্টেড" : "SELECTED"}</span>
                    </span>
                  )}
                </div>

                <div className="relative z-10">
                  {/* Package Title & Header */}
                  <div className="border-b border-[#2b2927]/10 pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-serif-luxury text-2xl sm:text-[28px] font-bold tracking-wide uppercase text-[#2b2927] group-hover:text-[#8E6E26] transition-colors">
                        {isBn ? pkg.nameBn : pkg.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-[#967425] font-sans-luxury font-bold">
                        STARTING FROM
                      </span>
                    </div>

                    {/* Elevated Price Display with Soft Glass Badge */}
                    <div className="inline-flex items-baseline gap-1 my-2.5 px-3.5 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-white shadow-xs group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <span className="font-bengali font-bold text-[#C9A24B] text-2xl sm:text-3xl leading-none select-none">
                        ৳
                      </span>
                      <span className={`font-sans-luxury font-extrabold text-3xl sm:text-[34px] tracking-tight leading-none transition-colors ${
                        isSelected ? "text-[#7a590b]" : "text-[#2b2927] group-hover:text-[#7a590b]"
                      }`}>
                        {rawDigits}
                      </span>
                    </div>

                    <p className="text-xs text-[#595550] italic font-serif-luxury font-bold block mt-1">
                      &ldquo;{isBn ? pkg.taglineBn : pkg.tagline}&rdquo;
                    </p>
                  </div>

                  {/* Animated Expand / Collapse Trigger Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(pkg.id, e)}
                    className={`w-full mt-4 py-2.5 px-4 rounded-xl border text-xs uppercase tracking-wider font-sans-luxury font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      isExpanded
                        ? "bg-[#2b2927] text-[#F3DE9A] border-[#2b2927]"
                        : "bg-white/85 hover:bg-[#2b2927] hover:text-[#F3DE9A] text-[#8E6E26] border-[#C9A24B]/40 hover:border-[#2b2927]"
                    }`}
                  >
                    <span>
                      {isExpanded
                        ? (isBn ? "বিস্তারিত সংক্ষেপ করুন" : "Collapse Details")
                        : (isBn ? "বিস্তারিত দেখুন" : "Expand for More Details")}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C9A24B] transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : "animate-bounce"
                      }`}
                    />
                  </button>

                  {/* Expanded Section: Inclusions List & Action Buttons */}
                  {isExpanded && (
                    <div className="pt-5 border-t border-[#2b2927]/10 animate-fade-in mt-4">
                      {/* Inclusions List */}
                      <div className="space-y-2.5 mb-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-sans-luxury font-bold text-[#8E6E26]">
                          {isBn ? "প্যাকেজে যা থাকছে:" : "PACKAGE INCLUSIONS:"}
                        </p>

                        <ul className="space-y-2.5">
                          {(isBn ? pkg.inclusionsBn : pkg.inclusions).map((inc, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug"
                            >
                              <span className="w-4 h-4 rounded-full bg-white text-[#8E6E26] border border-[#C9A24B]/30 flex items-center justify-center shrink-0 mt-0.5 shadow-xs group-hover:border-[#C9A24B] transition-colors">
                                <Check className="w-2.5 h-2.5 text-[#C9A24B] stroke-[3]" />
                              </span>
                              <span className="font-sans-luxury font-bold text-[#2b2927]">
                                {inc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 border-t border-[#2b2927]/10 space-y-2">
                        <button
                          type="button"
                          onClick={(e) => handleInquireClick(e, pkg)}
                          className={`w-full py-3.5 px-5 rounded-full text-xs uppercase tracking-[0.16em] font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                            isSelected
                              ? "bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] border border-[#E0C172] shadow-[0_4px_18px_rgba(201,162,75,0.45)]"
                              : "bg-[#2b2927] text-[#F3DE9A] hover:bg-[#C9A24B] hover:text-[#071426] border border-[#2b2927]"
                          }`}
                        >
                          <span>{t.packagesSection.inquireBtn}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                            `Hello Zeyo, I am interested in the ${pkg.name} Package (${pkg.price}) for an upcoming event in Rajshahi.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-2 px-3 text-[11px] uppercase tracking-wider font-bold text-[#2b2927] hover:text-[#C9A24B] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                          <span>Quick Quote on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Customization Footnote */}
        <div className="mt-10 text-center text-xs text-[#595550] max-w-2xl mx-auto italic font-sans-luxury font-bold">
          {t.packagesSection.customQuoteNotice}
        </div>
      </div>
    </section>
  );
}
