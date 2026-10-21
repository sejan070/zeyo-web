"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { eventPackages, EventPackage } from "@/data/packages";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Check,
  Tag,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Phone,
  ShieldCheck,
  Clock,
  MapPin,
  Calendar,
  Users,
  Award,
  Crown,
  Heart,
  Send,
  Layers
} from "lucide-react";

function PackagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, t, selectedPackage, setSelectedPackage } = useLanguage();

  const urlTier = searchParams.get("tier");
  const urlPkg = searchParams.get("package");

  const [activeFilter, setActiveFilter] = useState<string>(urlTier || "all");
  const [activePkgId, setActivePkgId] = useState<string>(urlPkg || selectedPackage || "medium");
  
  // Expanded state for cards (defaults to all expanded for full transparency as requested)
  const [expandedPkgs, setExpandedPkgs] = useState<Record<string, boolean>>({
    basic: true,
    medium: true,
    premium: true,
    silver: true,
    gold: true,
    platinum: true
  });

  // Quick inquiry state
  const [selectedForInquiry, setSelectedForInquiry] = useState<EventPackage | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [venueNote, setVenueNote] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (urlTier) {
      setActiveFilter(urlTier);
    }
    if (urlPkg) {
      setActivePkgId(urlPkg);
      const pkg = eventPackages.find((p) => p.id === urlPkg);
      if (pkg) setSelectedForInquiry(pkg);
    } else {
      const def = eventPackages.find((p) => p.id === (selectedPackage || "medium"));
      if (def) setSelectedForInquiry(def);
    }
  }, [urlTier, urlPkg, selectedPackage]);

  const toggleExpand = (pkgId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedPkgs((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId]
    }));
  };

  const handleCardClick = (pkg: EventPackage) => {
    setActivePkgId(pkg.id);
    setSelectedPackage(pkg.id);
    setSelectedForInquiry(pkg);
  };

  const handleBookClick = (pkg: EventPackage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActivePkgId(pkg.id);
    setSelectedPackage(pkg.id);
    setSelectedForInquiry(pkg);
    
    // Smooth scroll to inquiry form at bottom
    const formEl = document.getElementById("package-booking-form");
    if (formEl) {
      const topOffset = formEl.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const handleDirectWhatsApp = (pkg: EventPackage, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const msg = `Hello Zeyo Atelier! I would like to book/inquire about the ${pkg.name} Package (${pkg.price}) for an event in Rajshahi.`;
    const url = `https://wa.me/8801743543346?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    const pkgName = selectedForInquiry ? `${selectedForInquiry.name} (${selectedForInquiry.price})` : "Custom Package";
    const msg = `*New Package Inquiry via Zeyo Website*
• Client Name: ${clientName}
• Contact: ${clientPhone}
• Selected Package: ${pkgName}
• Expected Event Date: ${eventDate || "To be discussed"}
• Expected Guests: ${guestCount || "Not specified"}
• Venue / Notes: ${venueNote || "Rajshahi"}`;

    const url = `https://wa.me/8801743543346?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setBookingSuccess(true);
  };

  const filteredPackages = eventPackages.filter((pkg) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "intimate") return pkg.tier === "intimate";
    if (activeFilter === "celebration") return pkg.tier === "celebration";
    if (activeFilter === "grand") return pkg.tier === "grand" || pkg.tier === "royal";
    return true;
  });

  const isBn = locale === "bn";

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] selection:bg-[#C9A24B] selection:text-[#071426] flex flex-col justify-between">
      {/* Sticky Luxury Header */}
      <Header />

      <main className="pt-28 sm:pt-36 pb-20 relative z-10 flex-1">
        {/* Editorial Top Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 text-center">

          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#1b4332] font-bold tracking-tight leading-[1.15] mb-5 max-w-4xl mx-auto">
            {isBn ? (
              <>
                নিখুঁত উৎসবের রাজকীয় আয়োজন, <br />
                <span className="italic font-normal text-[#C9A24B]">স্বচ্ছ ও আভিজাত্যপূর্ণ প্যাকেজ</span>
              </>
            ) : (
              <>
                Bespoke Event Curation, <br />
                <span className="italic font-normal text-[#C9A24B]">Transparent Luxury Packages</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#2b2927] font-sans-luxury font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            {isBn
              ? "ঘরোয়া ছোট আয়োজন থেকে শুরু করে রাজকীয় ওয়েডিং রিসেপশন—প্রতিটি প্যাকেজে রয়েছে নিখুঁত পরিকল্পনা, স্টেজ আর্কিটেকচার, লাইটিং ও অন-গ্রাউন্ড পরিচালনা। আপনার বাজেট ও পছন্দের প্যাকেজটি নির্বাচন করুন।"
              : "From intimate celebrations to grand royal galas in Rajshahi, explore our signature event packages. Every tier is fully detailed with zero hidden costs, premium imported floral architecture, and dedicated on-ground management."}
          </p>

          {/* Quick Trust Highlights Banner with Tailored Atelier Vector Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-left">
            {[
              {
                title: isBn ? "৬টি স্বচ্ছ প্যাকেজ" : "6 Transparent Tiers",
                desc: isBn ? "৳৫,০০০ থেকে ৳৫,০০,০০০+" : "From ৳5K to ৳5L+",
                icon: function TiersVectorIcon() {
                  return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Graduated transparent tiers from entry to royal tier */}
                      <path d="M3 20H21" stroke="#F3DE9A" strokeWidth="1.6" strokeLinecap="round" />
                      <rect x="4" y="14" width="4.5" height="6" rx="1" fill="#F3DE9A" fillOpacity="0.22" stroke="#F3DE9A" strokeWidth="1.5" />
                      <rect x="9.75" y="9" width="4.5" height="11" rx="1" fill="#F3DE9A" fillOpacity="0.38" stroke="#F3DE9A" strokeWidth="1.5" />
                      <rect x="15.5" y="4" width="4.5" height="16" rx="1" fill="#F3DE9A" fillOpacity="0.55" stroke="#F3DE9A" strokeWidth="1.5" />
                      <path d="M6.25 11L12 6.5L17.75 3" stroke="#F3DE9A" strokeWidth="1.5" strokeDasharray="1.5 2" strokeLinecap="round" />
                    </svg>
                  );
                }
              },
              {
                title: isBn ? "কাস্টমাইজেশন সুযোগ" : "100% Customizable",
                desc: isBn ? "থিম ও ভেন্যু অনুযায়ী অ্যাডাপ্টেবল" : "Tailored to your dream theme",
                icon: function CustomizableThemeVectorIcon() {
                  return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Atelier Theme & Decor Styling Palette */}
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12C2 16.418 5.582 20 10 20C11.104 20 12 19.104 12 18C12 17.54 11.83 17.11 11.54 16.78C11.24 16.44 11.06 15.99 11.06 15.5C11.06 14.4 11.96 13.5 13.06 13.5H15C18.866 13.5 22 10.366 22 6.5C22 4.015 17.523 2 12 2Z"
                        fill="#F3DE9A"
                        fillOpacity="0.18"
                        stroke="#F3DE9A"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <circle cx="7" cy="10" r="1.3" fill="#F3DE9A" />
                      <circle cx="10" cy="6.5" r="1.3" fill="#F3DE9A" />
                      <circle cx="14.5" cy="6.5" r="1.3" fill="#F3DE9A" />
                      <circle cx="17.5" cy="9.5" r="1.3" fill="#F3DE9A" />
                      <path d="M14.5 15.5L19.5 20.5M18 19L20 17" stroke="#F3DE9A" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  );
                }
              },
              {
                title: isBn ? "অন-গ্রাউন্ড ডিরেক্টর" : "On-Ground Directors",
                desc: isBn ? "শুরু থেকে শেষ পর্যন্ত উপস্থিতি" : "Seamless live coordination",
                icon: function GroundDirectorsVectorIcon() {
                  return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Live Production Headset for Stage Directors */}
                      <path
                        d="M3 11C3 6.582 6.582 3 11 3C15.418 3 19 6.582 19 11V14.5C19 15.88 17.88 17 16.5 17H15.5C14.67 17 14 16.33 14 15.5V12.5C14 11.67 14.67 11 15.5 11H18.5"
                        stroke="#F3DE9A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 11V14.5C3 15.88 4.12 17 5.5 17H6.5C7.33 17 8 16.33 8 15.5V12.5C8 11.67 7.33 11 6.5 11H3.5"
                        stroke="#F3DE9A"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect x="3.5" y="11.5" width="4" height="5" rx="1" fill="#F3DE9A" fillOpacity="0.3" stroke="#F3DE9A" strokeWidth="1.2" />
                      <rect x="14.5" y="11.5" width="4" height="5" rx="1" fill="#F3DE9A" fillOpacity="0.3" stroke="#F3DE9A" strokeWidth="1.2" />
                      <path d="M5.5 17V19C5.5 20.1 6.4 21 7.5 21H11" stroke="#F3DE9A" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="12.5" cy="21" r="1.5" fill="#F3DE9A" />
                      <path d="M10 6C10.6 6.6 11 7.2 11 8" stroke="#F3DE9A" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  );
                }
              },
              {
                title: isBn ? "কোনো হিডেন চার্জ নেই" : "Zero Hidden Fees",
                desc: isBn ? "স্বচ্ছ বাজেট ও চুক্তিপত্র" : "Clear blueprints & pricing",
                icon: function ZeroHiddenFeesVectorIcon() {
                  return (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Transparent Itemized Invoice Receipt */}
                      <path
                        d="M4 3V21L6.5 19.5L9 21L11.5 19.5L14 21L16.5 19.5L19 21V3L16.5 4.5L14 3L11.5 4.5L9 3L6.5 4.5L4 3Z"
                        fill="#F3DE9A"
                        fillOpacity="0.18"
                        stroke="#F3DE9A"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <line x1="7.5" y1="8" x2="15.5" y2="8" stroke="#F3DE9A" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="7.5" y1="11.5" x2="13.5" y2="11.5" stroke="#F3DE9A" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="14.5" cy="15.5" r="3" fill="#1b4332" stroke="#F3DE9A" strokeWidth="1.4" />
                      <path d="M13.3 15.5L14.2 16.4L15.8 14.6" stroke="#F3DE9A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  );
                }
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-[#2b2927]/10 shadow-[0_4px_16px_rgba(43,41,39,0.04)] flex items-center gap-3 transition-all duration-300 hover:border-[#1b4332]/25 hover:shadow-[0_8px_24px_rgba(27,67,50,0.08)]"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4332] to-[#071426] text-[#F3DE9A] flex items-center justify-center shrink-0 shadow-xs border border-[#F3DE9A]/15">
                    <IconComp />
                  </div>
                  <div>
                    <h2 className="font-serif-luxury text-sm font-bold text-[#1b4332] leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-[11px] text-[#595550] font-sans-luxury font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter Pills (All Packages / Intimate / Celebration / Grand & Royal) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {[
              { id: "all", label: isBn ? "সকল প্যাকেজ (৬)" : "All Packages (6)" },
              { id: "intimate", label: isBn ? "ইনটিমেট (৳৫হাজার - ৳২০হাজার)" : "Intimate (৳5K - ৳20K)" },
              { id: "celebration", label: isBn ? "সেলিব্রেশন (৳৫০হাজার - ৳১লাখ)" : "Celebration (৳50K - ৳1L)" },
              { id: "grand", label: isBn ? "গ্র্যান্ড ও রয়্যাল (৳২লাখ - ৳৫লাখ+)" : "Grand & Royal (৳2L - ৳5L+)" }
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] transition-all duration-300 border cursor-pointer select-none font-bold ${
                    isActive
                      ? "bg-[#1b4332] text-white border-[#1b4332] shadow-[0_8px_22px_rgba(27,67,50,0.35)] scale-105"
                      : "bg-white hover:bg-[#1b4332] text-[#2b2927] hover:text-white border-[#C9A24B]/50 hover:border-[#1b4332] shadow-[0_3px_12px_rgba(43,41,39,0.05)] hover:scale-105"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Full Expanded Package Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 items-start">
            {filteredPackages.map((pkg) => {
              const isSelected = activePkgId === pkg.id;
              const isExpanded = expandedPkgs[pkg.id] ?? true;
              const rawDigits = isBn
                ? pkg.priceBn.replace("৳", "").trim()
                : pkg.price.replace("৳", "").trim();

              return (
                <div
                  key={pkg.id}
                  onClick={() => handleCardClick(pkg)}
                  className={`group relative flex flex-col justify-between rounded-[28px] p-6 sm:p-8 transition-all duration-400 ease-out cursor-pointer select-none overflow-hidden ${
                    isSelected
                      ? "border-2 border-[#C9A24B] ring-4 ring-[#C9A24B]/35 shadow-[0_25px_55px_rgba(201,162,75,0.35)] -translate-y-2 scale-[1.015]"
                      : "border border-[#2b2927]/12 hover:border-[#C9A24B] shadow-[0_10px_30px_rgba(43,41,39,0.06)] hover:shadow-[0_22px_45px_rgba(201,162,75,0.25)] hover:-translate-y-2 hover:scale-[1.01]"
                  }`}
                >
                  {/* Base Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fcfaf6] to-[#f4efe5] transition-opacity duration-400" />

                  {/* Golden Aura on Selected / Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-[#fffdf7] via-[#faebc7] to-[#eed08f] transition-opacity duration-400 pointer-events-none ${
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  />

                  {/* Top Specular Shine */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C9A24B]/70 to-transparent pointer-events-none z-10" />

                  {/* Card Header & Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                    {pkg.badge ? (
                      <span className="px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-sans-luxury font-black shadow-xs rounded-full bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] border border-[#C9A24B]/40">
                        {isBn ? pkg.badgeBn : pkg.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest text-[#8E6E26] font-sans-luxury font-bold">
                        ZEYO ATELIER TIER
                      </span>
                    )}

                    {isSelected && (
                      <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#1b4332] text-[#F3DE9A] text-[10px] uppercase tracking-wider font-bold shadow-sm">
                        <Check className="w-3 h-3 text-[#C9A24B] stroke-[3]" />
                        <span>{isBn ? "সিলেক্টেড" : "ACTIVE CHOICE"}</span>
                      </span>
                    )}
                  </div>

                  <div className="relative z-10">
                    {/* Title & Price */}
                    <div className="border-b border-[#2b2927]/10 pb-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif-luxury text-2xl sm:text-[30px] font-bold tracking-wide uppercase text-[#1b4332] group-hover:text-[#7a590b] transition-colors">
                          {isBn ? pkg.nameBn : pkg.name}
                        </h3>
                        <span className="text-[10px] uppercase tracking-wider text-[#967425] font-sans-luxury font-bold">
                          STARTING FROM
                        </span>
                      </div>

                      {/* Prominent Price Tag */}
                      <div className="inline-flex items-baseline gap-1 my-3 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-[#C9A24B]/30 shadow-xs group-hover:bg-white transition-all duration-300">
                        <span className="font-bengali font-bold text-[#C9A24B] text-2xl sm:text-3xl leading-none select-none">
                          ৳
                        </span>
                        <span
                          className={`font-sans-luxury font-extrabold text-3xl sm:text-[36px] tracking-tight leading-none transition-colors ${
                            isSelected ? "text-[#7a590b]" : "text-[#2b2927] group-hover:text-[#7a590b]"
                          }`}
                        >
                          {rawDigits}
                        </span>
                      </div>

                      <p className="text-xs text-[#595550] italic font-serif-luxury font-bold block mt-0.5">
                        &ldquo;{isBn ? pkg.taglineBn : pkg.tagline}&rdquo;
                      </p>
                    </div>

                    {/* Expand/Collapse Button (Fully expanded by default, toggleable) */}
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(pkg.id, e)}
                      className="w-full mt-4 py-2 px-3 rounded-xl border border-[#C9A24B]/30 bg-white/70 hover:bg-[#1b4332] hover:text-[#F3DE9A] text-[#1b4332] text-xs font-sans-luxury font-bold tracking-wider uppercase transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>
                        {isExpanded
                          ? (isBn ? "ডিটেইলস সংক্ষেপ করুন" : "Detailed Inclusions")
                          : (isBn ? "বিস্তারিত দেখুন" : "View Full Inclusions")}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#C9A24B]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#C9A24B]" />
                      )}
                    </button>

                    {/* Expanded Scope & Inclusions */}
                    {isExpanded && (
                      <div className="pt-5 border-t border-[#2b2927]/10 animate-fade-in mt-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-sans-luxury font-bold text-[#8E6E26] mb-3">
                          {isBn ? "প্যাকেজে সম্পূর্ণ যা যা থাকছে:" : "FULL PACKAGE INCLUSIONS:"}
                        </p>

                        <ul className="space-y-3 mb-6">
                          {(isBn ? pkg.inclusionsBn : pkg.inclusions).map((inc, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-xs sm:text-[13px] leading-snug"
                            >
                              <span className="w-4.5 h-4.5 rounded-full bg-white text-[#1b4332] border border-[#C9A24B]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                <Check className="w-3 h-3 text-[#C9A24B] stroke-[3]" />
                              </span>
                              <span className="font-sans-luxury font-bold text-[#2b2927]">
                                {inc}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Direct Action Buttons */}
                        <div className="pt-4 border-t border-[#2b2927]/10 space-y-2.5">
                          <button
                            type="button"
                            onClick={(e) => handleBookClick(pkg, e)}
                            className={`w-full py-3.5 px-5 rounded-full text-xs uppercase tracking-[0.16em] font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                              isSelected
                                ? "bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] border border-[#E0C172] shadow-[0_4px_18px_rgba(201,162,75,0.45)]"
                                : "bg-[#1b4332] text-white hover:bg-[#C9A24B] hover:text-[#071426] border border-[#1b4332]"
                            }`}
                          >
                            <span>{isBn ? "এই প্যাকেজটি বুকিং / ইনকোয়ারি করুন" : "Select & Inquire This Tier"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDirectWhatsApp(pkg, e)}
                            className="w-full py-2.5 px-4 rounded-full text-[11px] uppercase tracking-wider font-bold text-[#1b4332] hover:bg-white border border-[#C9A24B]/40 transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/70"
                          >
                            <MessageCircle className="w-4 h-4 text-[#25D366]" />
                            <span>{isBn ? "হোয়াটসঅ্যাপে তাৎক্ষণিক কোটেশন" : "Quick Quote via WhatsApp"}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feature Comparison Matrix Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-[32px] bg-white border border-[#2b2927]/12 shadow-[0_20px_50px_rgba(43,41,39,0.06)] p-6 sm:p-10 overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] font-sans-luxury font-black uppercase tracking-[0.25em] text-[#C9A24B] block mb-2">
                COMPARATIVE OVERVIEW
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1b4332] font-bold">
                {isBn ? "প্যাকেজগুলোর মূল ফিচারের তুলনামূলক বিশ্লেষণ" : "Comprehensive Tier Feature Matrix"}
              </h2>
              <p className="text-xs sm:text-sm text-[#595550] font-sans-luxury mt-2">
                {isBn
                  ? "আপনার চাহিদানুযায়ী সঠিক প্যাকেজটি বেছে নিতে এক নজরে প্রধান ফিচারসমূহ পর্যালোচনা করুন।"
                  : "Compare key deliverables, audio-visual technology, and staging levels across all 6 tiers."}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans-luxury">
                <thead>
                  <tr className="border-b border-[#2b2927]/15 text-[#1b4332] uppercase tracking-wider font-bold">
                    <th className="py-3 px-3">Deliverable</th>
                    <th className="py-3 px-3">Basic (৳5K+)</th>
                    <th className="py-3 px-3">Medium (৳20K+)</th>
                    <th className="py-3 px-3">Premium (৳50K+)</th>
                    <th className="py-3 px-3">Silver (৳1L+)</th>
                    <th className="py-3 px-3">Gold (৳2L+)</th>
                    <th className="py-3 px-3">Platinum (৳5L+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2b2927]/10 text-[#2b2927] font-semibold">
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#1b4332]">Event Planning & Flow</td>
                    <td className="py-3 px-3">Standard</td>
                    <td className="py-3 px-3">Standard</td>
                    <td className="py-3 px-3">Full Master</td>
                    <td className="py-3 px-3">Full Master</td>
                    <td className="py-3 px-3">VIP Concierge</td>
                    <td className="py-3 px-3 text-[#967425] font-bold">Royal Blueprint</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#1b4332]">Stage & Backdrop Theme</td>
                    <td className="py-3 px-3">Basic Decor</td>
                    <td className="py-3 px-3">Themed Stage</td>
                    <td className="py-3 px-3">Custom Designed</td>
                    <td className="py-3 px-3">Premium Thematic</td>
                    <td className="py-3 px-3">Luxury Staging</td>
                    <td className="py-3 px-3 text-[#967425] font-bold">Bespoke Architectural</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#1b4332]">Sound System & DJ</td>
                    <td className="py-3 px-3">Sound Only</td>
                    <td className="py-3 px-3">Sound + DJ</td>
                    <td className="py-3 px-3">Sound + DJ</td>
                    <td className="py-3 px-3">Pro DJ Setup</td>
                    <td className="py-3 px-3">Pro DJ Setup</td>
                    <td className="py-3 px-3 text-[#967425] font-bold">Pro DJ + Live Option</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#1b4332]">Media (Photo/Video)</td>
                    <td className="py-3 px-3">Photo (3hr)</td>
                    <td className="py-3 px-3">Photo (3hr)</td>
                    <td className="py-3 px-3">Photo + Video</td>
                    <td className="py-3 px-3">Photo + Video</td>
                    <td className="py-3 px-3">Photo + Video</td>
                    <td className="py-3 px-3 text-[#967425] font-bold">Photo + Cinematic 4K</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#1b4332]">LED Wall / Special Entry</td>
                    <td className="py-3 px-3">—</td>
                    <td className="py-3 px-3">—</td>
                    <td className="py-3 px-3">—</td>
                    <td className="py-3 px-3">LED Screen</td>
                    <td className="py-3 px-3">LED + Special Entry</td>
                    <td className="py-3 px-3 text-[#967425] font-bold">LED + Entry + Booths</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-[#1b4332]">On-Ground Support Team</td>
                    <td className="py-3 px-3">Included</td>
                    <td className="py-3 px-3">Included</td>
                    <td className="py-3 px-3">Included</td>
                    <td className="py-3 px-3">Dedicated Lead</td>
                    <td className="py-3 px-3">Director + Crew</td>
                    <td className="py-3 px-3 text-[#967425] font-bold">Executive Production Crew</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Dedicated Package Booking & Consultation Form */}
        <section id="package-booking-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="rounded-[32px] bg-gradient-to-r from-[#071426] via-[#0d223f] to-[#071426] border border-[#C9A24B]/35 shadow-[0_20px_50px_rgba(7,20,38,0.25)] p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-sans-luxury font-black tracking-widest uppercase bg-[#C9A24B] text-[#071426] shadow-sm inline-block mb-3">
                {isBn ? "প্যাকেজ বুকিং ও কনসাল্টেশন" : "DIRECT ATELIER CONSULTATION"}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold tracking-wide">
                {selectedForInquiry ? `${selectedForInquiry.name} Package Booking` : "Book Your Event Package"}
              </h2>
              <p className="text-xs sm:text-sm text-white/75 font-sans-luxury mt-2">
                {isBn
                  ? "আপনার তথ্যগুলো পূরণ করে সরাসরি আমাদের রাজশাহী টিমের সাথে হোয়াটসঅ্যাপে আলোচনা শুরু করুন।"
                  : "Submit your basic celebration details below. Our senior production director will review and coordinate your blueprint immediately."}
              </p>
            </div>

            {bookingSuccess && (
              <div className="p-4 rounded-2xl bg-[#1b4332] border border-[#C9A24B] text-white text-xs text-center mb-6 animate-fade-in font-bold">
                {isBn
                  ? "ধন্যবাদ! আপনার ইনকোয়ারিটি গ্রহণ করা হয়েছে এবং হোয়াটসঅ্যাপে পাঠানো হচ্ছে..."
                  : "Thank you! Your package inquiry has been dispatched to our WhatsApp team."}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10 max-w-2xl mx-auto text-xs font-sans-luxury">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F3DE9A] font-bold uppercase tracking-wider mb-1.5">
                    {isBn ? "আপনার নাম *" : "Your Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A24B] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#F3DE9A] font-bold uppercase tracking-wider mb-1.5">
                    {isBn ? "মোবাইল নম্বর *" : "Contact Phone Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A24B] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F3DE9A] font-bold uppercase tracking-wider mb-1.5">
                    {isBn ? "ইভেন্টের সম্ভাব্য তারিখ" : "Expected Event Date"}
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A24B] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#F3DE9A] font-bold uppercase tracking-wider mb-1.5">
                    {isBn ? "সিলেক্টেড প্যাকেজ" : "Selected Package Tier"}
                  </label>
                  <select
                    value={selectedForInquiry?.id || "medium"}
                    onChange={(e) => {
                      const found = eventPackages.find((p) => p.id === e.target.value);
                      if (found) {
                        setSelectedForInquiry(found);
                        setActivePkgId(found.id);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-[#0a1b33] border border-white/20 text-white focus:outline-none focus:border-[#C9A24B] transition-colors"
                  >
                    {eventPackages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#F3DE9A] font-bold uppercase tracking-wider mb-1.5">
                  {isBn ? "ভেন্যু বা বিশেষ চাহিদা (ঐচ্ছিক)" : "Venue or Special Preferences (Optional)"}
                </label>
                <textarea
                  rows={3}
                  value={venueNote}
                  onChange={(e) => setVenueNote(e.target.value)}
                  placeholder={
                    isBn
                      ? "যেমন: গ্র্যান্ড রিভারভিউ হোটেল, প্রায় ৩০০ অতিথি, কাটিং-এজ ফ্লোরাল স্টেজ..."
                      : "e.g. Hotel Grand Riverview, ~350 guests, custom yellow holud theme with imported florals..."
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A24B] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] font-sans-luxury font-black text-xs uppercase tracking-[0.2em] shadow-[0_6px_25px_rgba(201,162,75,0.45)] hover:scale-105 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#071426]" />
                  <span>{isBn ? "হোয়াটসঅ্যাপে বুকিং কনফার্ম করুন" : "Confirm & Send via WhatsApp Direct"}</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Custom Atelier Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] p-8 sm:p-10 bg-[#e3ded6] border border-[#2b2927]/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-sans-luxury font-black uppercase tracking-[0.25em] text-[#8E6E26] block mb-1">
                NEED A BESPOKE BLUEPRINT?
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1b4332]">
                {isBn ? "কাস্টম বা হাই-এন্ড রাজকীয় ওয়েডিং ডেকোরেশন চান?" : "Have a Custom Multi-Day Celebration Requirement?"}
              </h3>
              <p className="text-xs sm:text-sm text-[#595550] font-sans-luxury mt-1.5 max-w-xl">
                {isBn
                  ? "আমাদের প্যাকেজ ছাড়াও আপনার ব্যক্তিগত পছন্দ, পছন্দের ফুল ও অনন্য থিমের ওপর ভিত্তি করে সম্পূর্ণ কাস্টমাইজড কোটেশন তৈরি করা সম্ভব।"
                  : "If your event requires bespoke floral pavilions, multi-tier banquet architectural mapping, or custom stage carpentry, speak directly with our Senior Stylist."}
              </p>
            </div>

            <a
              href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                "Hello Zeyo Creative Director, I need a completely custom event blueprint for my celebration in Rajshahi."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-7 py-3.5 rounded-full bg-[#1b4332] hover:bg-[#133024] text-white font-sans-luxury font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isBn ? "কাস্টম কনসাল্টেশন বুক করুন" : "Consult Creative Director"}</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Interactive Elements */}
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6F0]" />}>
      <PackagesContent />
    </Suspense>
  );
}
