"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, Camera, ZoomIn } from "lucide-react";

interface ClientSlide {
  id: string;
  image: string;
  titleEn: string;
  titleBn: string;
  tagEn: string;
  tagBn: string;
  descEn: string;
  descBn: string;
}

const clientSlides: ClientSlide[] = [
  {
    id: "birthday-neon",
    image: "/client-media/user-refs/birthday-neon-gold.jpg",
    titleEn: "Luxury Neon & Gold Birthday Artistry",
    titleBn: "লাক্সারি নিয়ন ও গোল্ড বার্থডে সেলিব্রেশন",
    tagEn: "Milestone Celebration",
    tagBn: "বার্থডে সেলিব্রেশন",
    descEn: "Bespoke fluted plinths, metallic balloon arches, and warm circular halo lighting.",
    descBn: "কাস্টম ফ্লুটেড প্লিন্থ, মেটালিক বেলুন আর্চ ও নান্দনিক সার্কুলার ব্যাকড্রপ।"
  },
  {
    id: "holud-stage",
    image: "/client-media/user-refs/holud-traditional-stage.jpg",
    titleEn: "Traditional Gaye Holud Stage & Floral Ceiling",
    titleBn: "ঐতিহ্যবাহী গায়ে হলুদ স্টেজ ও ফ্লোরাল ক্যানোপি",
    tagEn: "Gaye Holud",
    tagBn: "গায়ে হলুদ",
    descEn: "Traditional marigold hanging garlands, radial ceiling drapes, and ethnic backdrop.",
    descBn: "গাঁদা ফুলের ঝালর, রেডিয়াল সিলিং ড্রেপ ও ঐতিহ্যবাহী হলুদ স্টেজ আর্ট।"
  },
  {
    id: "haldi-umbrella",
    image: "/client-media/user-refs/haldi-umbrella-canopy.jpg",
    titleEn: "Vibrant Haldi Umbrella Canopy & Floral Ring",
    titleBn: "উজ্জ্বল হলুদ ছাতা ক্যানোপি ও ফ্লোরাল সিটিং",
    tagEn: "Haldi Ceremony",
    tagBn: "হলুদ সেরেমনি",
    descEn: "Handcrafted ornate umbrellas, suspended floral wreaths, and vibrant yellow seating.",
    descBn: "হ্যান্ডক্রাফটেড ছাতা ক্যানোপি, ঝুলন্ত ফ্লোরাল রিংস ও প্রাণবন্ত হলুদ ডেকোর।"
  },
  {
    id: "birthday-navy",
    image: "/client-media/user-refs/birthday-navy-white.jpg",
    titleEn: "Imperial Navy & Silver Milestone Arch",
    titleBn: "রয়্যাল নেভি ও সিলভার বেলুন আর্চ বার্থডে",
    tagEn: "Grand Birthday",
    tagBn: "গ্র্যান্ড বার্থডে",
    descEn: "Grand double balloon garland, velvet drapery, and multi-tier celebratory dessert setup.",
    descBn: "গ্র্যান্ড ডাবল বেলুন গারল্যান্ড, ভেলভেট ড্রেপ ও অভিজাত ডেজার্ট ডিসপ্লে।"
  },
  {
    id: "wedding-stage-luxury",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    titleEn: "Royal Wedding Stage & Floral Architecture",
    titleBn: "রয়্যাল ওয়েডিং স্টেজ ও ফ্লোরাল আর্কিটেকচার",
    tagEn: "Wedding Stage",
    tagBn: "ওয়েডিং স্টেজ",
    descEn: "Pure white blossoms, champagne pedestals, and majestic stage design.",
    descBn: "শ্বেত শুভ্র ফুলের বিন্যাস, শ্যাম্পেন পেডেস্টাল ও রাজকীয় স্টেজ ডিজাইন।"
  },
  {
    id: "banquet-reception",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    titleEn: "Imperial Banquet Gala & Candelabra Styling",
    titleBn: "ইম্পেরিয়াল ব্যাঙ্কোয়েট গালা ও ক্যান্ডেলাব্রা স্টাইলিং",
    tagEn: "Banquet Gala",
    tagBn: "ব্যাঙ্কোয়েট গালা",
    descEn: "Long royal dining tables dressed in lush greenery, crystal stemware, and candelabras.",
    descBn: "ল্যাশ গ্রিনারি, ক্রিস্টাল স্টেমওয়্যার ও রাজকীয় ডিনার সেটআপ।"
  },
  {
    id: "stage-lighting",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    titleEn: "Architectural Beam Lighting & Concert Production",
    titleBn: "আর্কিটেকচারাল বিম লাইটিং ও কনসার্ট প্রোডাকশন",
    tagEn: "Lighting & Sound",
    tagBn: "লাইটিং ও সাউন্ড",
    descEn: "Synchronized concert beam arrays, atmospheric haze, and intelligent event trussing.",
    descBn: "সিনক্রোনাইজড কনসার্ট বিম অ্যারে ও অত্যাধুনিক ট্রাস লাইটিং সিস্টেম।"
  }
];

export default function ClientShowcase3D() {
  const { locale } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomModalImage, setZoomModalImage] = useState<string | null>(null);

  // Faster continuous auto-slide every 1.7 seconds (pauses only when zoom modal is open)
  useEffect(() => {
    if (zoomModalImage) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % clientSlides.length);
    }, 1700);

    return () => clearInterval(timer);
  }, [zoomModalImage]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? clientSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % clientSlides.length);
  };

  return (
    <section
      className="py-24 sm:py-32 bg-[#e9e7e2] relative overflow-hidden border-t border-[#2b2927]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2b2927] font-bold tracking-tight mb-4">
            {locale === "bn" ? (
              <span className="font-bengali font-bold">
                আমাদের <span className="italic font-bold">বাস্তব ইভেন্ট ডেকোরেশন</span> গ্যালারি
              </span>
            ) : (
              <>
                Real Moments.{" "}
                <span className="italic font-bold">Real Artistry.</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-bold leading-relaxed max-w-2xl mx-auto">
            {locale === "bn"
              ? "ক্লায়েন্টদের সরাসরি আয়োজনে জেয়োর নিজস্ব হ্যান্ডক্রাফটেড ওয়েডিং স্টেজ, বার্থডে ও স্পেশাল ইভেন্ট ডেকোরেশনের বাস্তব ফটো স্লাইডার।"
              : "A curated 3D showcase of authentic wedding stages, bespoke milestone celebrations, and luxury venue productions executed by Zeyo in Rajshahi."}
          </p>
        </div>

        {/* 3D Perspective Carousel Stage (Silky Smooth, Hardware Accelerated & Wide Wings) */}
        <div
          className="relative max-w-6xl xl:max-w-7xl mx-auto h-[420px] sm:h-[500px] md:h-[560px] flex items-center justify-center select-none"
        >
          {clientSlides.map((slide, idx) => {
            // Calculate offset relative to activeIndex
            const count = clientSlides.length;
            let offset = idx - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isFar = Math.abs(offset) > 1;

            if (isFar) {
              return (
                <div
                  key={slide.id}
                  className="absolute opacity-0 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
              );
            }

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (isCenter) {
                    setZoomModalImage(slide.image);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer rounded-[22px] overflow-hidden will-change-transform transform-gpu ${
                  isCenter
                    ? "z-30 w-[84%] sm:w-[64%] md:w-[54%] lg:w-[48%] h-[92%] border-2 border-[#C9A24B] opacity-100"
                    : isLeft
                    ? "z-10 w-[74%] sm:w-[58%] md:w-[48%] lg:w-[44%] h-[82%] opacity-80 border border-[#2b2927]/20 hover:opacity-100"
                    : "z-10 w-[74%] sm:w-[58%] md:w-[48%] lg:w-[44%] h-[82%] opacity-80 border border-[#2b2927]/20 hover:opacity-100"
                }`}
                style={{
                  transform: isCenter
                    ? "translate3d(0, 0, 0) scale(1) perspective(1000px) rotateY(0deg)"
                    : isLeft
                    ? "translate3d(-64%, 0, 0) scale(0.86) perspective(1000px) rotateY(12deg)"
                    : "translate3d(64%, 0, 0) scale(0.86) perspective(1000px) rotateY(-12deg)"
                }}
              >
                {/* Photo */}
                <img
                  src={slide.image}
                  alt={slide.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

                {/* Badge at top (positioned on exposed outer side for left and right cards) */}
                <div
                  className={`absolute top-4 ${
                    isRight ? "right-4" : "left-4"
                  } z-10 flex items-center gap-2`}
                >
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-sans-luxury font-bold bg-[#C9A24B] text-[#071426]">
                    {locale === "bn" ? slide.tagBn : slide.tagEn}
                  </span>
                </div>

                {/* Zoom button on center slide */}
                {isCenter && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomModalImage(slide.image);
                    }}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center hover:bg-[#C9A24B] hover:text-[#071426] transition-colors"
                    title="Zoom Photo"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}

                {/* Info Text at bottom */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-10 ${
                    isRight ? "text-right" : "text-left"
                  }`}
                >
                  <h3 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-white font-bold mb-1 leading-snug">
                    {locale === "bn" ? slide.titleBn : slide.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F3DE9A] font-sans-luxury font-bold">
                    {locale === "bn" ? slide.descBn : slide.descEn}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 sm:left-3 lg:-left-2 xl:-left-5 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-md border border-[#2b2927]/20 text-[#2b2927] hover:bg-[#2b2927] hover:text-[#fbfaf8] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 sm:right-3 lg:-right-2 xl:-right-5 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-md border border-[#2b2927]/20 text-[#2b2927] hover:bg-[#2b2927] hover:text-[#fbfaf8] flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Thumbnail Dots Bar */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {clientSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex
                  ? "w-8 bg-[#2b2927]"
                  : "w-2 bg-[#2b2927]/30 hover:bg-[#2b2927]/60"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setZoomModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-[20px] overflow-hidden border-2 border-[#C9A24B]">
            <img
              src={zoomModalImage}
              alt="Enlarged client decor"
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <button
              type="button"
              onClick={() => setZoomModalImage(null)}
              className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-black/70 border border-[#C9A24B] text-[#F3DE9A] text-xs uppercase font-sans-luxury font-bold tracking-wider hover:bg-[#C9A24B] hover:text-[#071426] transition-colors"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
