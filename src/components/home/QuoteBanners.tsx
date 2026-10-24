"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function QuoteBanners() {
  const { locale } = useLanguage();

  const cards = [
    {
      kicker: locale === "bn" ? "আন্তর্জাতিক মানসম্পন্ন ওয়েডিং প্ল্যানিং" : "PREMIER LUXURY WEDDING ATELIER",
      quote:
        locale === "bn"
          ? "উত্তরবঙ্গের শীর্ষস্থানীয় লাক্সারি ওয়েডিং ও ইভেন্ট আর্কিটেকচার"
          : "Premier Luxury Wedding Planners & Stage Architects in North Bengal",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      author: locale === "bn" ? "— জেয়ো ইভেন্ট আর্কিটেকচার —" : "— ZEYO EVENT ARCHITECTURE —",
      tag: "01 / ARCHITECTURE"
    },
    {
      kicker: locale === "bn" ? "আভিজাত্য ও নান্দনিকতা" : "BESPOKE FLORAL & SCENIC DESIGN",
      quote:
        locale === "bn"
          ? "“আমরা প্রতিটি সাধারণ স্থানকে রূপকথার মতো মনোমুগ্ধকর সাম্রাজ্যে রূপান্তর করি”"
          : "“Zeyo transforms every space into an unforgettable realm of bespoke luxury and wonder”",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
      author: locale === "bn" ? "— সিগনেচার স্টেজ ও ব্যাঙ্কোয়েট —" : "— SIGNATURE STAGE & BANQUET PRODUCTIONS —",
      tag: "02 / SCENOGRAPHY"
    },
    {
      kicker: locale === "bn" ? "জেয়ো অভিজ্ঞতা" : "ORCHESTRATING THE EXCEPTIONAL",
      quote:
        locale === "bn"
          ? "স্বপ্ন। সৃষ্টি। উদযাপন। — আপনার জীবনের বিশেষ মুহূর্তের বিশ্বস্ত রূপকার"
          : "Dream. Create. Celebrate. — Crafting timeless celebrations that linger in memory",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=80",
      author: locale === "bn" ? "— অলকার মোড়, রাজশাহী —" : "— ALOKAR MOR, RAJSHAHI —",
      tag: "03 / ATELIER"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-[#e9e7e2] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="sticky will-change-transform mb-20 sm:mb-28 last:mb-0 transition-transform duration-300"
            style={{
              top: `calc(6.5rem + ${idx * 18}px)`,
              zIndex: idx + 10,
            }}
          >
            <div className="relative h-72 sm:h-88 md:h-[420px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[#C9A24B]/30 bg-[#121212] transition-transform duration-700 ease-out hover:scale-[1.008] group cursor-pointer">
              {/* Background Image with slow cinematic zoom */}
              <img
                src={card.image}
                alt={card.kicker}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Cinematic dark glass gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35 group-hover:from-black/95 transition-colors" />

              {/* Top Accent Index Tag */}
              <div className="absolute top-5 left-6 sm:top-7 sm:left-8 z-20 flex items-center">
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#F3DE9A] font-sans-luxury font-bold">
                  {card.tag}
                </span>
              </div>

              {/* Centered Editorial Quote Content (Exact Sarah Haywood style) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-12 z-10">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#F3DE9A] font-sans-luxury font-bold mb-3">
                  {card.kicker}
                </span>

                <h3 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight max-w-4xl leading-tight sm:leading-snug mb-4">
                  {card.quote}
                </h3>

                <p className="text-xs uppercase tracking-[0.25em] text-white/70 font-sans-luxury font-medium">
                  {card.author}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
