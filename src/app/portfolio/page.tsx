"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { portfolioItems } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { Eye, MapPin, Play, Film, Calendar, ArrowRight, Sparkles, X, CheckCircle2 } from "lucide-react";
import Lightbox from "@/components/portfolio/Lightbox";
import LazyVideo from "@/components/ui/LazyVideo";
import Link from "next/link";

interface PortfolioVideo {
  id: string;
  src: string;
  poster?: string;
  titleEn: string;
  titleBn: string;
  tagEn: string;
  tagBn: string;
  venueEn: string;
  venueBn: string;
}

const portfolioVideos: PortfolioVideo[] = [
  {
    id: "v-birthday-special",
    src: "/videos/birthday-reel.mp4",
    poster: "/videos/birthday-thumb.jpg",
    titleEn: "Exclusive Birthday Celebration & Backdrop",
    titleBn: "এক্সক্লুসিভ বার্থডে সেলিব্রেশন ও ব্যাকড্রপ ডেকোর",
    tagEn: "Birthday Celebration",
    tagBn: "বার্থডে সেলিব্রেশন",
    venueEn: "Private Lounge, Rajshahi",
    venueBn: "প্রাইভেট লাউঞ্জ, রাজশাহী"
  },
  {
    id: "v1",
    src: "/videos/dreamy-white-decor.mp4",
    poster: "/videos/dreamy-white-thumb.jpg",
    titleEn: "Dreamy White Themed Floral Stage",
    titleBn: "ড্রিমী হোয়াইট ফ্লোরাল ওয়েডিং স্টেজ",
    tagEn: "Wedding Decor",
    tagBn: "ওয়েডিং ডেকোর",
    venueEn: "Rajshahi Club",
    venueBn: "রাজশাহী ক্লাব"
  },
  {
    id: "v2",
    src: "/videos/pink-wedding-theme.mp4",
    poster: "/videos/pink-wedding-thumb.jpg",
    titleEn: "Fairy-Tale Pink Romance Theme",
    titleBn: "রূপকথা পিংক থিম ওয়েডিং স্টেজ",
    tagEn: "Theme Wedding",
    tagBn: "থিম ওয়েডিং",
    venueEn: "Parjatan Motel, Rajshahi",
    venueBn: "পর্যটন মোটেল, রাজশাহী"
  },
  {
    id: "v3",
    src: "/videos/zeyo-stage-craft.mp4",
    poster: "/videos/zeyo-stage-craft-thumb.jpg",
    titleEn: "Bespoke Event Architecture & Decor",
    titleBn: "এক্সক্লুসিভ স্টেজ প্রোডাকশন ও সেটআপ",
    tagEn: "Stage Craft",
    tagBn: "স্টেজ আর্কিটেকচার",
    venueEn: "Grand Riverview Hall",
    venueBn: "গ্র্যান্ড রিভারভিউ হল"
  }
];

export default function PortfolioPage() {
  const { locale, t } = useLanguage();
  const isBn = locale === "bn";

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setIsExpanded(false);
  };

  const INITIAL_COUNT = 8;
  const displayedItems = isExpanded ? filteredItems : filteredItems.slice(0, INITIAL_COUNT);
  const hasMore = filteredItems.length > INITIAL_COUNT;

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex(
      selectedItemIndex === 0 ? filteredItems.length - 1 : selectedItemIndex - 1
    );
  };

  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex(
      selectedItemIndex === filteredItems.length - 1 ? 0 : selectedItemIndex + 1
    );
  };

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
              {isBn ? "সিগনেচার পোর্টফোলিও • জেয়ো" : "CURATED ARCHIVE • ZEYO"}
            </span>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
              {isBn ? (
                <>
                  বাস্তবায়িত স্বপ্নের <span className="gold-gradient-text italic font-bold">স্থপতি কালেকশন</span>
                </>
              ) : (
                <>
                  A Symphony of Stage Craft & <span className="gold-gradient-text italic font-bold">Celebrations</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#d8d3cb] font-sans-luxury font-medium max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? "রাজশাহীতে আমাদের বাস্তব ইভেন্ট প্রোডাকশনের জীবন্ত ভিডিও রিলস, নির্বাচিত ফটো আর্কাইভ এবং বিস্তারিত প্রজেক্ট স্পটলাইট।"
                : "Explore our verified event architecture across Rajshahi through live production video reels and curated photo galleries."}
            </p>
          </div>
        </section>

        {/* 1. Live Video Reels Section */}
        <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#2b2927]/15">
            <div>
              <span className="text-[10px] font-sans-luxury font-bold uppercase tracking-[0.2em] text-[#C9A24B] block mb-1">
                {isBn ? "লাইভ ভিডিও প্রমাণ" : "AUTHENTIC PROOF OF CRAFT"}
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#2b2927] font-bold">
                {isBn ? "লাইভ ইভেন্ট ভিডিও রিলস" : "Featured Live Production Reels"}
              </h2>
            </div>
            <span className="text-xs text-[#595550] font-sans-luxury font-medium hidden sm:inline-block">
              {isBn ? "ক্লিক করে সাউন্ড সহ সম্পূর্ণ ভিডিও দেখুন" : "Click any card to play in high definition with audio"}
            </span>
          </div>

          {/* 4 Video Reels (Playing Simultaneously & Smoothly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {portfolioVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] bg-[#1a1918] border border-black/15 shadow-[0_10px_28px_rgba(43,41,39,0.12)] hover:shadow-[0_20px_45px_rgba(43,41,39,0.28)] hover:-translate-y-1.5 hover:scale-[1.015] transition-all duration-300 aspect-[9/14] sm:aspect-[9/15] will-change-transform transform-gpu"
              >
                <LazyVideo
                  src={video.src}
                  poster={video.poster}
                  isActive={true}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:from-black/95 transition-colors pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-sans-luxury font-bold bg-[#071426]/90 text-white shadow-md border border-[#C9A24B]/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-ping" />
                    <span>{isBn ? video.tagBn : video.tagEn}</span>
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#C9A24B] shadow-2xl flex items-center justify-center text-[#071426] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-[#071426] ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h4 className="font-serif-luxury text-lg sm:text-xl text-white font-bold leading-snug drop-shadow-md mb-1.5">
                    {isBn ? video.titleBn : video.titleEn}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#F3DE9A] font-sans-luxury font-bold drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>{isBn ? video.venueBn : video.venueEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Unified Master Gallery: Our Events Galleries */}
        <section id="gallery" className="py-16 sm:py-24 bg-white/70 border-t border-[#2b2927]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[10.5px] font-sans-luxury font-bold uppercase tracking-[0.25em] text-[#C9A24B] block mb-2">
                {isBn ? "সিগনেচার ফটো আর্কাইভ" : "SIGNATURE PHOTOGRAPHY"}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#2b2927] font-bold tracking-tight mb-3">
                Our Events Galleries
              </h2>
              <p className="text-xs sm:text-sm text-[#595550] font-sans-luxury font-bold max-w-xl mx-auto">
                {isBn
                  ? "রাজশাহীতে আমাদের বাস্তবায়িত ইভেন্ট, ওয়েডিং, মেহেন্দি, বার্থডে ও স্টেজ প্রোডাকশনের সম্পূর্ণ ফটো কালেকশন।"
                  : "Signature Event Moments across Rajshahi & North Bengal — verified real venue photographs."}
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
              {[
                { id: "all", label: isBn ? "সকল ফটো" : "All Photos" },
                { id: "wedding", label: isBn ? "ওয়েডিং ও হলুদ" : "Weddings & Holud" },
                { id: "birthday", label: isBn ? "বার্থডে ডেকোর" : "Birthdays" },
                { id: "corporate", label: isBn ? "কর্পোরেট গালা" : "Corporate & Gala" },
                { id: "stage", label: isBn ? "স্টেজ আর্কিটেকচার" : "Stage Craft" },
                { id: "murals", label: isBn ? "ওয়াল মিউরাল" : "Murals & Themes" }
              ].map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleFilterChange(tab.id)}
                    className={`px-5 sm:px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] transition-all duration-300 font-sans-luxury cursor-pointer select-none font-bold ${
                      isActive
                        ? "bg-[#071426] text-[#F3DE9A] border border-[#C9A24B]/50 shadow-[0_8px_22px_rgba(7,20,38,0.35)] scale-105"
                        : "bg-white hover:bg-[#071426] text-[#2b2927] hover:text-[#F3DE9A] border border-[#2b2927]/15 hover:border-[#C9A24B]/40 shadow-sm hover:scale-105"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* 3D Interactive Photo Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 [perspective:1200px]">
              {displayedItems.map((item, index) => {
                // Find index in filteredItems for correct lightbox navigation
                const actualIndex = filteredItems.findIndex((it) => it.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemIndex(actualIndex)}
                    className="group relative cursor-pointer overflow-hidden rounded-[22px] bg-[#071426] border border-[#C9A24B]/30 shadow-[0_10px_30px_rgba(43,41,39,0.12)] hover:shadow-[0_25px_50px_rgba(7,20,38,0.35)] hover:border-[#C9A24B] hover:-translate-y-2.5 transition-all duration-500 ease-out aspect-[4/5] will-change-transform transform-gpu hover:[transform:rotateX(4deg)_rotateY(-3deg)_translateY(-10px)]"
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Ambient Luxury Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                    {/* Category Badge on Top-Left */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="text-[10px] uppercase tracking-widest font-sans-luxury font-bold bg-[#071426]/90 text-[#F3DE9A] px-3 py-1 rounded-full border border-[#C9A24B]/40 shadow-md">
                        {isBn ? item.categoryLabelBn : item.categoryLabel}
                      </span>
                    </div>

                    {/* 3D Depth Card Caption Details */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-transform duration-300 transform group-hover:-translate-y-1">
                      <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-bold leading-snug drop-shadow-md mb-1.5">
                        {isBn ? item.titleBn : item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#F3DE9A] font-sans-luxury font-bold drop-shadow">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />
                        <span className="truncate">{isBn ? item.venueBn : item.venue}</span>
                      </div>

                      <div className="mt-3.5 inline-flex items-center gap-2 text-[11px] text-[#071426] font-bold uppercase tracking-wider bg-gradient-to-r from-[#F3DE9A] to-[#C9A24B] px-3.5 py-1.5 rounded-full shadow-md group-hover:scale-105 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Fullscreen</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expand / Load More Button */}
            {hasMore && (
              <div className="mt-14 text-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#071426] hover:bg-[#162E52] text-[#F3DE9A] border border-[#C9A24B]/50 hover:border-[#C9A24B] shadow-xl text-xs font-sans-luxury font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>
                    {isExpanded
                      ? (isBn ? "কম ছবি দেখুন (Show Less)" : "Show Less")
                      : (isBn
                          ? `সম্পূর্ণ গ্যালারি দেখুন (+${filteredItems.length - INITIAL_COUNT}টি ছবি)`
                          : `Explore Full Gallery (+${filteredItems.length - INITIAL_COUNT} More Photos)`)}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 text-[#C9A24B] transition-transform duration-300 ${
                      isExpanded ? "-rotate-90" : "rotate-90"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Video Fullscreen Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] w-full bg-black flex items-center justify-center">
                <video
                  src={selectedVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 bg-[#071426] text-white flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold">
                    {isBn ? selectedVideo.titleBn : selectedVideo.titleEn}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#F3DE9A] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>{isBn ? selectedVideo.venueBn : selectedVideo.venueEn}</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-full bg-[#C9A24B] hover:bg-[#DFBD6A] text-[#071426] text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all"
                >
                  {isBn ? "বুকিং শুরু করুন" : "Book This Vibe"}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox for Photos */}
        <Lightbox
          item={selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null}
          onClose={() => setSelectedItemIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </main>

      {/* Footer & Floating Elements */}
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}
