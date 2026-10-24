"use client";

import React, { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";
import LazyVideo from "@/components/ui/LazyVideo";
import { smoothScrollTo } from "@/lib/scroll";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export default function ServicePillars() {
  const { locale, t, setPortfolioFilter } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePillarClick = (category: string) => {
    setPortfolioFilter(category);
    smoothScrollTo("photo-archives", 84);
  };

  const pillars = [
    {
      subtitle: locale === "bn" ? "লাক্সারি ওয়েডিং প্ল্যানার্স" : "LUXURY WEDDING PLANNERS",
      title: t.pillars.pillar1.title,
      tagline: t.pillars.pillar1.tagline,
      badge: "FLORAL STAGES",
      desc: t.pillars.pillar1.desc,
      extraDesc:
        locale === "bn"
          ? "আমদানিকৃত ফুল, রোমান্টিক ক্যান্ডেললাইট ওয়াকওয়ে এবং জমকালো ব্রাইডাল স্টেজের মাধ্যমে প্রতিটি মুহূর্তে আমরা তৈরি করি রূপকথার আভিজাত্য।"
          : "Our weddings are defined by bespoke stage architecture, imported florals, romantic walkway illumination, and flawless on-ground coordination in Rajshahi.",
      image: "/client-media/user-refs/holud-traditional-stage.jpg",
      videoSrc: "/videos/luxury-wedding-decor.mp4",
      category: "wedding",
      stepNum: "01"
    },
    {
      subtitle: locale === "bn" ? "স্পেশাল মাইলস্টোন সেলিব্রেশন" : "MILESTONE CELEBRATIONS",
      title: t.pillars.pillar2.title,
      tagline: t.pillars.pillar2.tagline,
      badge: "BIRTHDAYS",
      desc: t.pillars.pillar2.desc,
      extraDesc:
        locale === "bn"
          ? "আধুনিক নান্দনিক ডিজাইন, কাস্টম নিয়ন সাইন, বেলুন ইন্সটলেশন এবং মার্জিত টেবিল ডেকোরে তৈরি হয় অবিস্মরণীয় মুহূর্ত।"
          : "From vibrant neon birthday installations and rose-petal proposals to chic anniversary galas, we curate stylish celebrations that leave guests spellbound.",
      image: "/client-media/user-refs/birthday-neon-gold.jpg",
      videoSrc: "/videos/birthday-celebration.mp4",
      category: "birthday",
      stepNum: "02"
    },
    {
      subtitle: locale === "bn" ? "কর্পোরেট প্রোডাকশন ও স্টুডিও" : "CORPORATE & STUDIO",
      title: t.pillars.pillar3.title,
      tagline: t.pillars.pillar3.tagline,
      badge: "CONFERENCES",
      desc: t.pillars.pillar3.desc,
      extraDesc:
        locale === "bn"
          ? "প্রফেশনাল কর্পোরেট স্টেজ, এলইডি স্ক্রিন, সিনেমাটোগ্রাফি এবং আমাদের অনন্য আর্টিস্টিক হ্যান্ডপেইন্টেড ওয়াল মিউরাল।"
          : "Executive conferences, product launches, institutional galas, and our exclusive bespoke wall painting and mural artistry studio.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      videoSrc: "https://videos.pexels.com/video-files/33512876/14253497_1920_1080_30fps.mp4",
      category: "murals",
      stepNum: "03"
    }
  ];

  // Track scroll progress inside the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 3 segments: 0.00 - 0.33 -> 0, 0.33 - 0.66 -> 1, 0.66 - 1.00 -> 2
    if (latest < 0.34) {
      setActiveIdx(0);
    } else if (latest < 0.68) {
      setActiveIdx(1);
    } else {
      setActiveIdx(2);
    }
  });

  const scrollToPillar = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const scrollableRange = containerHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (pillars.length - 1)) * scrollableRange;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const currentPillar = pillars[activeIdx];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative h-[300vh] bg-[#e9e7e2] text-[#2b2927]"
    >
      {/* Pinned Sticky Viewport (Screen fixes when user arrives here) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Top Minimal Navigation Strip with Interactive Stage Pills */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-[#2b2927]/10 z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A24B]" />
            <span className="text-[11px] sm:text-xs font-sans-luxury font-bold uppercase tracking-[0.2em] text-[#2b2927]">
              {locale === "bn" ? "জেয়ো সিগনেচার সার্ভিসেস" : "Zeyo Signature Services"}
            </span>
          </div>

          {/* 3 Interactive Stage Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {pillars.map((pillar, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToPillar(i)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans-luxury font-bold transition-all duration-300 cursor-pointer ${
                  activeIdx === i
                    ? "bg-[#071426] text-[#F3DE9A] border border-[#C9A24B]/50"
                    : "bg-white/60 text-[#595550] hover:bg-white hover:text-[#071426] border border-transparent"
                }`}
              >
                <span>{pillar.stepNum}</span>
                <span className="hidden md:inline ml-1.5 font-medium">
                  {pillar.title.split("&")[0].trim()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Pinned Split Screen Grid */}
        <div className="max-w-7xl mx-auto w-full flex-1 flex items-center my-auto py-4 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center w-full">
            
            {/* Left Column: Fixed viewport with smooth vertical text scroll / transition */}
            <div className="lg:col-span-6 flex flex-col justify-center min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Signature Sarah Haywood Dash Subtitle */}
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#2b2927] font-sans-luxury font-bold">
                    <span className="w-6 h-[1.5px] bg-[#2b2927]" />
                    <span>{currentPillar.subtitle}</span>
                    <span className="w-6 h-[1.5px] bg-[#2b2927]" />
                  </div>

                  {/* Big Bold Serif Heading (Cormorant Garamond 44-56px) */}
                  <h3 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[54px] text-[#2b2927] font-bold tracking-tight leading-[1.1]">
                    {currentPillar.title}
                  </h3>

                  {/* Paragraphs with generous breathing room */}
                  <div className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm md:text-base text-[#595550] font-sans-luxury font-bold leading-[1.65]">
                    <p>{currentPillar.desc}</p>
                    <p className="text-[#595550] italic font-bold">{currentPillar.extraDesc}</p>
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap pt-2">
                    <Link
                      href={`/services?category=${currentPillar.category}`}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans-luxury font-bold text-[#2b2927] pb-1 border-b-2 border-[#2b2927] hover:text-[#C9A24B] hover:border-[#C9A24B] transition-all group cursor-pointer"
                    >
                      <span>{locale === "bn" ? "সার্ভিস বিস্তারিত দেখুন" : "EXPLORE SERVICE DETAILS"}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handlePillarClick(currentPillar.category)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans-luxury font-bold text-[#595550] pb-1 border-b border-[#595550]/40 hover:text-[#C9A24B] hover:border-[#C9A24B] transition-all group cursor-pointer"
                    >
                      <span>{locale === "bn" ? "ফটো আর্কাইভ" : "PHOTO ARCHIVE"}</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Fixed Video Showcase with Seamless Cross-fade */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <Link
                href={`/services?category=${currentPillar.category}`}
                className="w-full max-w-[580px] cursor-pointer block"
                title={locale === "bn" ? "সার্ভিস বিস্তারিত দেখতে ক্লিক করুন" : "Click to view service details"}
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[22px] sm:rounded-[28px] overflow-hidden border border-[#2b2927]/15 bg-[#071426] group hover:border-[#C9A24B]/70 transition-colors">
                  
                  {/* Preloaded video stack with smooth cross-fade */}
                  {pillars.map((p, idx) => {
                    const isActive = idx === activeIdx;
                    return (
                      <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                          isActive
                            ? "opacity-100 scale-100 pointer-events-auto z-10"
                            : "opacity-0 scale-95 pointer-events-none z-0"
                        }`}
                      >
                        <LazyVideo
                          src={p.videoSrc}
                          poster={p.image}
                          isActive={isActive}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    );
                  })}

                  {/* Top-Right Category Badge */}
                  <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[9.5px] sm:text-[10px] uppercase tracking-widest text-[#F3DE9A] font-sans-luxury font-bold">
                    {currentPillar.badge}
                  </div>

                  {/* Subtle Bottom Caption Pill */}
                  <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 z-20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-[10px] sm:text-xs text-white/90 font-sans-luxury font-bold">
                    <span className="text-[#C9A24B] mr-1.5">{currentPillar.stepNum} ·</span>
                    <span>{currentPillar.title}</span>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>

        {/* Bottom Progress & Quick Jump Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-3 sm:pt-4 border-t border-[#2b2927]/10 z-20">
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-sans-luxury font-bold text-[#595550]">
            <span>{locale === "bn" ? "স্ক্রল করে পরবর্তী সার্ভিস দেখুন" : "Scroll to reveal next service"}</span>
            <span className="ml-2 font-mono text-[#071426]">({activeIdx + 1} / {pillars.length})</span>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-sans-luxury font-bold uppercase tracking-wider text-[#071426] hover:text-[#C9A24B] transition-colors"
          >
            <span>{locale === "bn" ? "সব ৪টি সার্ভিস দেখুন" : "View All Services"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
