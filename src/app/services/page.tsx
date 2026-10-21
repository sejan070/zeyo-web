"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Crown,
  PartyPopper,
  Lightbulb,
  Palette,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2
} from "lucide-react";

function ServicesContent() {
  const { locale } = useLanguage();
  const isBn = locale === "bn";
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    if (categoryParam && ["all", "wedding", "birthday", "stage", "murals"].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const services = [
    {
      id: "wedding",
      category: "wedding",
      badgeEn: "SIGNATURE SPECIALTY",
      badgeBn: "সিগনেচার স্পেশালিটি",
      titleEn: "Luxury Weddings & Gaye Holud Staging",
      titleBn: "রাজকীয় ওয়েডিং ও গায়ে হলুদ স্টেজ ডেকোরেশন",
      subtitleEn: "Bespoke stage architecture, imported floral installations, and fairy-lit walkways in Rajshahi.",
      subtitleBn: "রাজশাহীতে কাস্টম স্টেজ আর্কিটেকচার, তাজা ফুলের কাজ ও পরী-আলোর নান্দনিক ওয়াকওয়ে।",
      image: "/client-media/user-refs/holud-traditional-stage.jpg",
      deliverablesEn: [
        "Architectural Wedding Stage & Regal Seating Design",
        "Traditional Gaye Holud Umbrella Canopies & Floral Diwan",
        "Entrance Gate, Draping & Fairy Light Tunnel",
        "Exotic Imported Floral Wall & Centerpieces",
        "Ambient Warm Lighting & Follow Spotlights"
      ],
      deliverablesBn: [
        "আর্কিটেকচারাল ওয়েডিং স্টেজ ও রাজকীয় সোফা/সিটিং সেটআপ",
        "ঐতিহ্যবাহী গায়ে হলুদ আমব্রেলা ক্যানোপি ও ফ্লোরাল দেওয়ান",
        "গ্র্যান্ড এন্ট্রান্স গেট, ড্রেপিং ও ফেয়ারি লাইট টানেল",
        "তাজা দেশি ও বিদেশি ফুলের ব্যাকড্রপ ও টেবিল সেন্টারপিস",
        "অ্যাম্বিয়েন্ট ওয়ার্ম লাইটিং ও ড্রামাটিক স্পটলাইটিং"
      ],
      idealForEn: "Weddings, Gaye Holud, Mehendi, Walima, and Sangeet celebrations (100–1,000+ guests).",
      idealForBn: "বিয়ে, গায়ে হলুদ, মেহেন্দি, ওয়ালিমা ও সংগীত অনুষ্ঠান (১০০ থেকে ১,০০০+ অতিথি)।"
    },
    {
      id: "birthday",
      category: "birthday",
      badgeEn: "CELEBRATION ARTISTRY",
      badgeBn: "বার্থডে আর্ট",
      titleEn: "Milestone Birthdays & Anniversary Galas",
      titleBn: "এক্সক্লুসিভ বার্থডে সেলিব্রেশন ও ব্যাকড্রপ আর্ট",
      subtitleEn: "Chic thematic backdrops, custom neon typography, balloon artistry, and mood lighting.",
      subtitleBn: "আধুনিক থিমেটিক ব্যাকড্রপ, কাস্টম নিয়ন সাইন, বেলুন স্কাল্পচার ও মুড লাইটিং।",
      image: "/client-media/user-refs/birthday-neon-gold.jpg",
      deliverablesEn: [
        "Custom Neon Signs with Guest of Honor's Name or Age",
        "Organic Balloon Installations & Floral Arch Combos",
        "Thematic Photo Booths & Dessert Table Styling",
        "Low-Smoke Fog & Cake Cutting Sparkler Pyrotechnics",
        "Kids Thematic Environments (Fairytale, Safari, Space, etc.)"
      ],
      deliverablesBn: [
        "নাম ও বয়সের কাস্টম নিয়ন সাইন ও এক্রিলিক ব্যাকড্রপ",
        "অর্গানিক বেলুন ইনস্টলেশন ও ফুলের আর্চ কম্বো",
        "থিমেটিক ফটো বুথ ও ডেজার্ট টেবিল স্টাইলিং",
        "লো-স্মোক ফগ ও কেক কাটিং স্পার্কলার মোমেন্টস",
        "বাচ্চাদের থিম বেসড ডেকোরেশন (ফেয়ারিটেল, কার্টুন, ইত্যাদি)"
      ],
      idealForEn: "1st Birthdays, 18th/21st Milestones, Silver/Golden Anniversaries, and Intimate Family Gatherings.",
      idealForBn: "প্রথম জন্মদিন, ১৮/২১ তম মাইলস্টোন বার্থডে, সিলভার/গোল্ডেন অ্যানিভার্সারি ও পারিবারিক অনুষ্ঠান।"
    },
    {
      id: "stage",
      category: "stage",
      badgeEn: "PRODUCTION & CRAFT",
      badgeBn: "স্টেজ আর্কিটেকচার",
      titleEn: "Bespoke Stage Architecture & Illumination",
      titleBn: "এক্সক্লুসিভ স্টেজ প্রোডাকশন ও সিনেমাটিক লাইটিং",
      subtitleEn: "Engineered wooden stages, truss structures, crystal chandeliers, and concert lighting.",
      subtitleBn: "ইঞ্জিনিয়ার্ড কাঠের স্টেজ, ট্রাস কাঠামো, ক্রিস্টাল শ্যান্ডেলিয়ার ও উন্নত কনসার্ট লাইটিং।",
      image: "/client-media/user-refs/haldi-umbrella-canopy.jpg",
      deliverablesEn: [
        "Reinforced Heavy-Duty Stage Platforms with Velvet / Carpet Flooring",
        "Rigged Crystal Chandeliers & Hanging Warm Bulb Drops",
        "Professional Aluminum Trussing & Moving Beam Fixtures",
        "High-Resolution P2/P3 Indoor & Outdoor LED Video Walls",
        "Acoustic Sound Coordination & On-Site Electricians"
      ],
      deliverablesBn: [
        "মজবুত স্টেজ প্ল্যাটফর্ম ও প্রিমিয়াম মখমল বা পার্সিয়ান কার্পেট",
        "ঝুলন্ত ক্রিস্টাল শ্যান্ডেলিয়ার ও ভিন্টেজ ওয়ার্ম বাল্ব ড্রপস",
        "প্রফেশনাল অ্যালুমিনিয়াম ট্রাসিং ও মুভিং হেড লাইট ফিটিন্স",
        "হাই-রেজুলেশন পি২/পি৩ ইনডোর ও আউটডোর এলইডি স্ক্রিন",
        "সাউন্ড কো-অর্ডিনেশন ও অন-সাইট অভিজ্ঞ টেকনিশিয়ান টিম"
      ],
      idealForEn: "Grand Banquet Halls, Community Centers, Club Auditoriums, and Outdoor Lawns.",
      idealForBn: "গ্র্যান্ড ব্যাঙ্কোয়েট হল, কমিউনিটি সেন্টার, ক্লাব অডিটোরিয়াম ও আউটডোর লন।"
    },
    {
      id: "corporate",
      category: "corporate",
      badgeEn: "CORPORATE & STUDIO",
      badgeBn: "কর্পোরেট ও ব্র্যান্ড",
      titleEn: "Corporate Galas, Conferences & Hand-painted Murals",
      titleBn: "কর্পোরেট ইভেন্ট, কনফারেন্স ও হ্যান্ডপেইন্টেড ওয়াল মিউরাল",
      subtitleEn: "Executive stages, corporate branding backdrops, award nights, and signature mural art.",
      subtitleBn: "এক্সিকিউটিভ স্টেজ, কর্পোরেট ব্র্যান্ডিং ব্যাকড্রপ, অ্যাওয়ার্ড নাইট ও অনন্য ওয়াল পেইন্টিং।",
      image: "/client-media/banner.jpg",
      deliverablesEn: [
        "Executive Podium, VIP Backdrop & Press Conference Media Walls",
        "Bespoke Hand-Painted Event Murals & Canvas Backdrops",
        "Branded Signage, Entrance Arches & Registration Desks",
        "Corporate Product Launch Unveiling Sequences",
        "Complete Event Photography & Cinematography Coordination"
      ],
      deliverablesBn: [
        "এক্সিকিউটিভ পোডিয়াম, ভিআইপি ব্যাকড্রপ ও প্রেস মিডিয়া ওয়াল",
        "কাস্টম হ্যান্ডপেইন্টেড ওয়াল মিউরাল ও ক্যানভাস ব্যাকড্রপ",
        "ব্র্যান্ডেড সাইনেজ, ওয়েলকাম আর্চ ও রেজিস্ট্রেশন ডেস্ক",
        "প্রোডাক্ট লঞ্চ ও আনভেইলিং স্টেজ সিকোয়েন্স",
        "পূর্ণাঙ্গ অফিসিয়াল ফটোগ্রাফি ও সিনেমাটোগ্রাফি ব্যবস্থাপনা"
      ],
      idealForEn: "Brand Launches, Annual General Meetings (AGM), University Galas, and Award Ceremonies.",
      idealForBn: "ব্র্যান্ড লঞ্চ, বার্ষিক সাধারণ সভা (এজিএম), বিশ্ববিদ্যালয় অনুষ্ঠান ও পুরস্কার বিতরণী।"
    }
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#e9e7e2] text-[#2b2927] selection:bg-[#C9A24B] selection:text-[#071426]">
      {/* Sticky Luxury Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-24 sm:pt-28">
        {/* Editorial Hero Banner */}
        <section className="relative py-16 sm:py-24 bg-[#071426] text-white overflow-hidden border-b border-[#C9A24B]/30">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-sans-luxury font-bold tracking-[0.25em] uppercase bg-[#C9A24B]/20 text-[#F3DE9A] border border-[#C9A24B]/40 shadow-md mb-4">
              {isBn ? "আমাদের সেবাসমূহ • জেয়ো অ্যাটেলিয়ার" : "EXPERTISE & SERVICES • ZEYO"}
            </span>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
              {isBn ? (
                <>
                  স্বপ্নকে বাস্তব রূপ দেওয়ার <span className="gold-gradient-text italic font-bold">নিখুঁত কারিগরি</span>
                </>
              ) : (
                <>
                  Bespoke Event Architecture & <span className="gold-gradient-text italic font-bold">Luxury Staging</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#d8d3cb] font-sans-luxury font-medium max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? "ওয়েডিং স্টেজ থেকে শুরু করে মাইলস্টোন বার্থডে ও কর্পোরেট প্রযোজনা—রাজশাহীতে যেকোনো উৎসবকে অনন্য আভিজাত্য দিতে জেয়ো প্রস্তুত।"
                : "From royal wedding stages to milestone birthdays and executive corporate galas, we deliver architectural elegance across Rajshahi."}
            </p>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
              {[
                { id: "all", label: isBn ? "সকল সেবা" : "All Services" },
                { id: "wedding", label: isBn ? "ওয়েডিং ও হলুদ" : "Weddings & Holud" },
                { id: "birthday", label: isBn ? "বার্থডে ও থিম" : "Birthdays & Themes" },
                { id: "stage", label: isBn ? "স্টেজ ও লাইটিং" : "Stage & Lighting" },
                { id: "corporate", label: isBn ? "কর্পোরেট ও মিউরাল" : "Corporate & Murals" }
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-sans-luxury font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#C9A24B] text-[#071426] shadow-[0_4px_16px_rgba(201,162,75,0.4)] scale-105"
                        : "bg-white/10 hover:bg-white/20 text-white/80 border border-white/15 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Services Breakdown Cards */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-24">
            {filteredServices.map((srv, idx) => (
              <div
                key={srv.id}
                className="bg-white/90 rounded-[24px] border border-[#2b2927]/10 shadow-[0_12px_40px_rgba(43,41,39,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(43,41,39,0.12)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Visual Image Side */}
                  <div className={`lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={srv.image}
                      alt={srv.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-sans-luxury font-bold bg-[#071426]/90 text-[#F3DE9A] border border-[#C9A24B]/40 shadow-md">
                        {isBn ? srv.badgeBn : srv.badgeEn}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-sans-luxury font-medium">
                      <div className="flex items-center gap-1.5 text-[#F3DE9A]">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                        <span>Rajshahi, Bangladesh</span>
                      </div>
                    </div>
                  </div>

                  {/* Information Details Side */}
                  <div className={`lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div>
                      <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#2b2927] font-bold mb-3 leading-snug">
                        {isBn ? srv.titleBn : srv.titleEn}
                      </h2>

                      <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-medium leading-relaxed mb-6">
                        {isBn ? srv.subtitleBn : srv.subtitleEn}
                      </p>

                      {/* What We Deliver List */}
                      <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-widest text-[#2b2927] font-sans-luxury font-bold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                          <span>{isBn ? "যা যা অন্তর্ভুক্ত থাকে:" : "WHAT WE DELIVER:"}</span>
                        </h4>

                        <ul className="space-y-2">
                          {(isBn ? srv.deliverablesBn : srv.deliverablesEn).map((item, dIdx) => (
                            <li key={dIdx} className="text-xs sm:text-sm text-[#3e3b38] font-sans-luxury font-medium flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Ideal For Box */}
                      <div className="p-3.5 rounded-xl bg-[#e9e7e2]/60 border border-[#2b2927]/10 mb-8">
                        <span className="text-[11px] font-sans-luxury font-bold text-[#2b2927] uppercase tracking-wider block mb-0.5">
                          {isBn ? "উপযুক্ত ভেন্যু ও আয়োজন:" : "SUITABLE FOR:"}
                        </span>
                        <p className="text-xs text-[#595550] font-sans-luxury font-medium">
                          {isBn ? srv.idealForBn : srv.idealForEn}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#2b2927]/10">
                      <Link
                        href={`/contact?service=${srv.category}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#071426] text-white hover:bg-[#C9A24B] hover:text-[#071426] text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all duration-300 shadow-md"
                      >
                        <span>{isBn ? "বুকিং ইনকোয়ারি করুন" : "Inquire For This Service"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <a
                        href={`https://wa.me/${companyInfo.phoneRaw}?text=${encodeURIComponent(`Hi Zeyo, I am interested in your ${srv.titleEn} service.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/40 text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all duration-300"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{isBn ? "হোয়াটসঅ্যাপে আলাপ" : "Chat on WhatsApp"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <section className="py-16 sm:py-20 bg-[#071426] text-white border-t border-[#C9A24B]/30 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold mb-4">
              {isBn ? "কাস্টম ইভেন্ট ডিজাইন নিয়ে পরামর্শ চান?" : "Need a Bespoke Concept for Your Venue?"}
            </h3>
            <p className="text-sm sm:text-base text-[#d8d3cb] font-sans-luxury font-medium max-w-xl mx-auto mb-8">
              {isBn
                ? "আমাদের রাজশাহী স্টুডিওতে এক কাপ কফির আড্ডায় আপনার বাজেট ও পছন্দ অনুযায়ী নিখুঁত ডেকোরেশন প্ল্যান সাজিয়ে নিন।"
                : "Schedule a complimentary consultation at our Rajshahi studio or via WhatsApp to design your dream event."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-[#C9A24B] hover:bg-[#DFBD6A] text-[#071426] text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all duration-300 shadow-xl"
              >
                {isBn ? "সরাসরি বুকিং শুরু করুন" : "Plan Your Event Now"}
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans-luxury font-bold uppercase tracking-wider border border-white/20 transition-all duration-300"
              >
                {isBn ? "পোর্টফোলিও দেখুন →" : "View Portfolio Archive →"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Floating Elements */}
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <ServicesContent />
    </Suspense>
  );
}
