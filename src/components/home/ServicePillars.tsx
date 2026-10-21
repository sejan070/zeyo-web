"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";
import LazyVideo from "@/components/ui/LazyVideo";
import { smoothScrollTo } from "@/lib/scroll";
import Link from "next/link";

export default function ServicePillars() {
  const { locale, t, setPortfolioFilter } = useLanguage();

  const handlePillarClick = (category: string) => {
    setPortfolioFilter(category);
    smoothScrollTo("photo-archives", 84);
  };

  const pillars = [
    {
      subtitle: locale === "bn" ? "লাক্সারি ওয়েডিং প্ল্যানার্স" : "LUXURY WEDDING PLANNERS",
      title: t.pillars.pillar1.title,
      tagline: t.pillars.pillar1.tagline,
      desc: t.pillars.pillar1.desc,
      extraDesc:
        locale === "bn"
          ? "আমদানিকৃত ফুল, রোমান্টিক ক্যান্ডেললাইট ওয়াকওয়ে এবং জমকালো ব্রাইডাল স্টেজের মাধ্যমে প্রতিটি মুহূর্তে আমরা তৈরি করি রূপকথার আভিজাত্য।"
          : "Our weddings are defined by bespoke stage architecture, imported florals, romantic walkway illumination, and flawless on-ground coordination in Rajshahi.",
      image: "/client-media/user-refs/holud-traditional-stage.jpg",
      videoSrc: "/videos/luxury-wedding-decor.mp4",
      category: "wedding"
    },
    {
      subtitle: locale === "bn" ? "স্পেশাল মাইলস্টোন সেলিব্রেশন" : "MILESTONE CELEBRATIONS",
      title: t.pillars.pillar2.title,
      tagline: t.pillars.pillar2.tagline,
      desc: t.pillars.pillar2.desc,
      extraDesc:
        locale === "bn"
          ? "আধুনিক নান্দনিক ডিজাইন, কাস্টম নিয়ন সাইন, বেলুন ইন্সটলেশন এবং মার্জিত টেবিল ডেকোরে তৈরি হয় অবিস্মরণীয় মুহূর্ত।"
          : "From vibrant neon birthday installations and rose-petal proposals to chic anniversary galas, we curate stylish celebrations that leave guests spellbound.",
      image: "/client-media/user-refs/birthday-neon-gold.jpg",
      videoSrc: "/videos/birthday-celebration.mp4",
      category: "birthday"
    },
    {
      subtitle: locale === "bn" ? "কর্পোরেট প্রোডাকশন ও স্টুডিও" : "CORPORATE & STUDIO",
      title: t.pillars.pillar3.title,
      tagline: t.pillars.pillar3.tagline,
      desc: t.pillars.pillar3.desc,
      extraDesc:
        locale === "bn"
          ? "প্রফেশনাল কর্পোরেট স্টেজ, এলইডি স্ক্রিন, সিনেমাটোগ্রাফি এবং আমাদের অনন্য আর্টিস্টিক হ্যান্ডপেইন্টেড ওয়াল মিউরাল।"
          : "Executive conferences, product launches, institutional galas, and our exclusive bespoke wall painting and mural artistry studio.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      videoSrc: "https://videos.pexels.com/video-files/33512876/14253497_1920_1080_30fps.mp4",
      category: "murals"
    }
  ];

  return (
    <section id="services" className="py-24 sm:py-36 bg-[#e9e7e2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-36">
        {pillars.map((pillar, idx) => {
          const isReverse = idx % 2 === 1;

          return (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                isReverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Left Editorial Copy (Exact Sarah Haywood Style) */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                {/* Signature Sarah Haywood Dash Subtitle */}
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#2b2927] font-sans-luxury font-bold mb-4">
                  <span className="w-6 h-[1.5px] bg-[#2b2927]" />
                  <span>{pillar.subtitle}</span>
                  <span className="w-6 h-[1.5px] bg-[#2b2927]" />
                </div>

                {/* Big Bold Serif Heading (Exact Cormorant Garamond 48-60px, #2b2927) */}
                <h3 className="font-serif-luxury text-4xl sm:text-5xl md:text-[54px] text-[#2b2927] font-bold tracking-tight mb-6 leading-[1.1]">
                  {pillar.title}
                </h3>

                {/* Paragraphs with generous breathing room (Exact Montserrat 16px, line-height 1.65, #595550) */}
                <div className="space-y-4 text-sm sm:text-base text-[#595550] font-sans-luxury font-bold leading-[1.65] mb-8">
                  <p>{pillar.desc}</p>
                  <p className="text-[#595550] italic font-bold">{pillar.extraDesc}</p>
                </div>

                {/* Underlined Sarah Haywood Link */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href={`/services?category=${pillar.category}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans-luxury font-bold text-[#2b2927] pb-1 border-b-2 border-[#2b2927] hover:text-[#C9A24B] hover:border-[#C9A24B] transition-all group cursor-pointer"
                  >
                    <span>{locale === "bn" ? "সার্ভিস বিস্তারিত দেখুন" : "EXPLORE SERVICE DETAILS"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans-luxury font-bold text-[#595550] pb-1 border-b border-[#595550]/40 hover:text-[#C9A24B] hover:border-[#C9A24B] transition-all group cursor-pointer"
                  >
                    <span>{locale === "bn" ? "ফটো আর্কাইভ" : "PHOTO ARCHIVE"}</span>
                  </Link>
                </div>
              </div>

              {/* Right Media Frame (Clickable to jump directly to Services page with category selected) */}
              <Link
                href={`/services?category=${pillar.category}`}
                className="w-full lg:w-1/2 cursor-pointer block"
                title={locale === "bn" ? "সার্ভিস বিস্তারিত দেখতে ক্লিক করুন" : "Click to view service details"}
              >
                <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[#2b2927]/10 bg-[#2b2927] group hover:border-[#C9A24B]/50 transition-colors">
                  <LazyVideo
                    src={pillar.videoSrc}
                    poster={pillar.image}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Accent Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-widest text-[#F3DE9A]">
                    {pillar.tagline.split("·")[0]}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Dedicated Services CTA */}
        <div className="text-center pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#071426] hover:bg-[#162E52] text-[#F3DE9A] border border-[#C9A24B]/40 hover:border-[#C9A24B] shadow-xl text-xs font-sans-luxury font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>{locale === "bn" ? "সকল সার্ভিস ও ভেন্যু গাইড দেখুন" : "View All 4 Dedicated Services & Venue Guides"}</span>
            <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
