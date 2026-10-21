"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "01. Consultation",
      descBn:
        "আমাদের রাজশাহীর অলকার মোড় স্টুডিওতে এক কাপ কফির আড্ডায় অথবা সরাসরি হোয়াটসঅ্যাপে আপনার ভাবনার সাথে আমাদের অভিজ্ঞ ইভেন্ট আর্কিটেক্টদের মেলবন্ধন। আপনার পছন্দ, ভেন্যু নির্বাচন, অতিথি সংখ্যা এবং নির্ধারিত বাজেটের মধ্যে সর্বোচ্চ আভিজাত্যের নিখুঁত পরিকল্পনা।",
      image: "/client-media/process-consultation.jpg",
      overlay: "from-black/95 via-black/75 to-black/45"
    },
    {
      num: "02",
      title: "02. Concept & Design",
      descBn:
        "প্রতিটি স্থানের নিজস্ব রূপ থাকে। আমরা আপনার ইভেন্টের জন্য কাস্টম মুডবোর্ড, ৩ডি স্টেজ ভিজ্যুয়ালাইজেশন, এক্সক্লুসিভ ফ্লোরাল প্যালেট এবং বুদ্ধিমান আলোকসজ্জার আর্কিটেকচারাল ব্লুপ্রিন্ট প্রস্তুত করি। বাস্তবায়ন শুরুর আগেই আপনি প্রতিটি ফ্রেমের নিখুঁত প্রিভিউ দেখতে পাবেন।",
      image: "/client-media/process-concept-design.jpg",
      overlay: "from-black/98 via-black/85 to-black/60"
    },
    {
      num: "03",
      title: "03. On-Site Production",
      descBn:
        "ইভেন্টের পূর্বমুহূর্তে আমাদের সুদক্ষ ইঞ্জিনিয়ার ও কারিগর দল ভেন্যুতে নেমে আমদানি করা তাজা ফুল, কাস্টম উডেন আর্চ, হ্যাঙ্গিং শ্যান্ডেলিয়ার এবং উন্নত কনসার্ট ট্রাস লাইটিং নিখুঁতভাবে স্থাপন করে। প্রতিটি ইঞ্চি তৈরি হয় কঠোর কোয়ালিটি কন্ট্রোলের মাধ্যমে।",
      image: "/client-media/process-onsite-production.jpg",
      overlay: "from-black/95 via-black/70 to-black/40"
    },
    {
      num: "04",
      title: "04. Flawless Celebration",
      descBn:
        "শুভক্ষণ শুরু হওয়ার পর আপনি এবং আপনার পরিবার শুধু আনন্দের মুহূর্তগুলো উপভোগ করবেন। এন্ট্রি ওয়াকওয়ে থেকে শুরু করে মঞ্চের লাইভ কোঅর্ডিনেশন—অন-গ্রাউন্ড সমস্ত দায়িত্বে থাকে জেয়ো টিম। আপনার জীবনের সবচেয়ে বিশেষ দিনটি তৈরি হয় রূপকথার মতো চিরস্মরণীয়।",
      image: "/client-media/process-flawless-celebration.jpg",
      overlay: "from-black/95 via-black/70 to-black/40"
    }
  ];

  return (
    <section id="process" className="py-20 sm:py-32 bg-[#e9e7e2] relative border-t border-[#2b2927]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#2b2927] font-bold tracking-tight mb-4 leading-tight">
            From Dream to Celebration
          </h2>
          <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-bold leading-relaxed max-w-2xl mx-auto">
            Our 4-step seamless journey to an extraordinary event in Rajshahi.
          </p>
        </div>

        {/* 4 Sticky 3D Stacking Cards Deck */}
        <div className="max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="sticky will-change-transform mb-16 sm:mb-24 last:mb-0 transition-transform duration-300"
              style={{
                top: `calc(6.5rem + ${idx * 18}px)`,
                zIndex: idx + 10,
              }}
            >
              <div className="relative min-h-[340px] sm:min-h-[380px] md:h-[450px] rounded-[24px] sm:rounded-[34px] overflow-hidden shadow-[0_-15px_35px_rgba(0,0,0,0.38),0_25px_60px_rgba(0,0,0,0.28)] border border-[#C9A24B]/35 bg-[#121212] transition-transform duration-700 ease-out hover:scale-[1.008] group cursor-pointer flex flex-col justify-center">
                {/* Background Image with slow cinematic zoom */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Cinematic dark glass gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${step.overlay} group-hover:from-black/98 transition-colors`} />

                {/* Clean Editorial Content without redundant repeated step tags */}
                <div className="relative flex flex-col items-center justify-center text-center px-5 sm:px-12 md:px-16 py-8 sm:py-12 z-10">
                  {/* Step Title Elevated in Luxury Gold */}
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#F3DE9A] font-bold tracking-wide mb-3 sm:mb-4 drop-shadow-lg">
                    {step.title}
                  </h3>

                  {/* Detailed Bengali Description with crystal-clear readability and zero overlap */}
                  <p className="font-bengali text-xs sm:text-base md:text-[17px] text-white/95 font-semibold leading-relaxed max-w-2xl sm:max-w-3xl drop-shadow">
                    {step.descBn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Process Guide CTA */}
        <div className="text-center pt-16">
          <Link
            href="/process"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#071426] hover:bg-[#162E52] text-[#F3DE9A] border border-[#C9A24B]/40 hover:border-[#C9A24B] shadow-xl text-xs font-sans-luxury font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span>৪-ধাপের সম্পূর্ণ প্রোডাকশন গাইড ও টাইমলাইন দেখুন</span>
            <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
