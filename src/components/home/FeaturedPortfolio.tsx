"use client";

import React, { useState, useEffect } from "react";
import { portfolioItems } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { Eye, MapPin, Grid, Play, Film, X, ArrowRight } from "lucide-react";
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

export default function FeaturedPortfolio() {
  const { locale, t, portfolioFilter, setPortfolioFilter } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);

  // Sync with global portfolio filter triggered from Header Services dropdown
  useEffect(() => {
    if (portfolioFilter) {
      setActiveFilter(portfolioFilter);
    }
  }, [portfolioFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPortfolioFilter(filter);
  };

  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

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
    <section id="portfolio" className="py-24 sm:py-32 bg-[#e9e7e2] relative border-t border-[#2b2927]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2b2927] font-bold tracking-tight mb-4">
            {t.portfolioSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-bold leading-relaxed max-w-2xl mx-auto">
            {locale === "bn"
              ? "আমাদের বাস্তব ইভেন্ট প্রোডাকশনের জীবন্ত ভিডিও রিলস এবং নির্বাচিত ফটো কালেকশন।"
              : "Witness our authentic stage architecture through live event video reels and signature photo archives."}
          </p>
        </div>

        {/* 1. Live Video Reels (Side-by-side Auto-playing Serial Row) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#2b2927]/15">
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2b2927] font-sans-luxury font-bold">
                {locale === "bn" ? "লাইভ ইভেন্ট ভিডিও রিলস" : "FEATURED LIVE PRODUCTION REELS"}
              </h3>
            </div>
            <span className="text-[11px] text-[#595550] font-sans-luxury font-medium hidden sm:inline-block">
              {locale === "bn" ? "হোভার করে প্রিভিউ দেখুন বা ক্লিক করে সাউন্ড সহ চালান" : "Hover to preview or click for full video with sound"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-sm sm:max-w-none mx-auto">
            {portfolioVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] bg-[#1a1918] border border-black/15 shadow-[0_10px_28px_rgba(43,41,39,0.12)] hover:shadow-[0_20px_45px_rgba(43,41,39,0.28)] hover:-translate-y-1.5 hover:scale-[1.015] transition-all duration-300 aspect-[9/14] sm:aspect-[9/15] will-change-transform transform-gpu"
              >
                {/* All 4 Live Production Reels play simultaneously in parallel */}
                <LazyVideo
                  src={video.src}
                  poster={video.poster}
                  isActive={true}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay for high readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:from-black/95 transition-colors pointer-events-none" />

                {/* Top Badge: Live Reel Pill with dynamic pulse indicator */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-sans-luxury font-bold bg-[#071426]/90 text-white shadow-md border border-[#C9A24B]/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-ping" />
                    <span>{locale === "bn" ? video.tagBn : video.tagEn}</span>
                  </span>
                </div>

                  {/* Center Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-[#C9A24B] shadow-2xl flex items-center justify-center text-[#071426] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-[#071426] ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h4 className="font-serif-luxury text-lg sm:text-xl text-white font-bold leading-snug drop-shadow-md mb-1.5">
                      {locale === "bn" ? video.titleBn : video.titleEn}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#F3DE9A] font-sans-luxury font-bold drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <span>{locale === "bn" ? video.venueBn : video.venueEn}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 2. Photo Gallery Section Header & Filter Chips */}
        <div id="photo-archives" className="pt-8 border-t border-[#2b2927]/15 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#2b2927] font-bold">
              {locale === "bn" ? "ইভেন্ট ফটো কালেকশন" : "Signature Event Moments"}
            </h3>
          </div>

          {/* Filter Chips - Luxury Gold with Black Active & Hover State */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: "all", label: t.portfolioSection.filterAll },
              { id: "wedding", label: t.portfolioSection.filterWedding },
              { id: "birthday", label: t.portfolioSection.filterBirthday },
              { id: "stage", label: t.portfolioSection.filterStage },
              { id: "murals", label: t.portfolioSection.filterMurals }
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] transition-all duration-300 font-sans-luxury cursor-pointer select-none font-bold ${
                    isActive
                      ? "bg-[#2b2927] text-white border border-[#2b2927] shadow-[0_8px_22px_rgba(43,41,39,0.35)] scale-105"
                      : "bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] hover:bg-none hover:bg-[#2b2927] text-[#071426] hover:text-white border border-[#E0C172] hover:border-[#2b2927] shadow-[0_4px_15px_rgba(201,162,75,0.35)] hover:shadow-[0_8px_22px_rgba(43,41,39,0.3)] hover:scale-105"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Photo Gallery Grid - Display only 4 signature event images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.slice(0, 4).map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItemIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-[20px] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(43,41,39,0.08)] hover:shadow-[0_25px_50px_rgba(43,41,39,0.2)] hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 aspect-[4/5]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                {/* Category Pill - Translucent Glass */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="text-[10px] uppercase tracking-widest font-sans-luxury font-bold bg-white/90 text-[#2b2927] px-3 py-1 rounded-full border border-white/60 shadow-md backdrop-blur-md">
                    {locale === "bn" ? item.categoryLabelBn : item.categoryLabel}
                  </span>
                </div>

                {/* Hover Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <h3 className="font-serif-luxury text-xl text-white font-bold leading-snug drop-shadow-md">
                    {locale === "bn" ? item.titleBn : item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#F3DE9A] mt-1.5 font-sans-luxury font-bold drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>{locale === "bn" ? item.venueBn : item.venue}</span>
                  </div>

                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] text-[#C9A24B] font-bold uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full border border-[#C9A24B]/40 backdrop-blur-sm">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Fullscreen</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Portfolio Archive CTA Button */}
          <div className="text-center pt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#071426] hover:bg-[#162E52] text-[#F3DE9A] border border-[#C9A24B]/40 hover:border-[#C9A24B] shadow-xl text-xs font-sans-luxury font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>{locale === "bn" ? "সম্পূর্ণ পোর্টফোলিও আর্কাইভ দেখুন" : "Explore Full Portfolio Archive"}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal Player (Plays with Audio on click) */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-[24px] overflow-hidden bg-black border-2 border-[#C9A24B] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              controls
              autoPlay
              playsInline
              className="w-full max-h-[80vh] object-contain"
            >
              <source src={selectedVideo.src} type="video/mp4" />
            </video>

            <div className="p-4 sm:p-6 bg-[#1a1918] flex items-center justify-between border-t border-[#C9A24B]/30">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C9A24B] font-bold block mb-1">
                  {locale === "bn" ? selectedVideo.tagBn : selectedVideo.tagEn}
                </span>
                <h4 className="font-serif-luxury text-lg sm:text-xl text-white font-bold">
                  {locale === "bn" ? selectedVideo.titleBn : selectedVideo.titleEn}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#C9A24B] hover:text-[#071426] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      <Lightbox
        item={selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null}
        onClose={() => setSelectedItemIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
