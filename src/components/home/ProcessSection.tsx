"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProcessSection() {
  const { locale } = useLanguage();

  const steps = [
    {
      num: "01",
      tag: "01 / CONSULTATION",
      kicker: locale === "bn" ? "ধাপ ০১ · ব্যক্তিগত পরামর্শ ও স্বপ্ন নির্ধারণ" : "STAGE 01 · INITIAL ENGAGEMENT",
      title: locale === "bn" ? "০১. ব্যক্তিগত পরামর্শ ও স্বপ্ন নির্ধারণ" : "01. Consultation",
      desc:
        locale === "bn"
          ? "আমাদের রাজশাহীর অলকার মোড় স্টুডিওতে এক কাপ কফির আড্ডায় অথবা সরাসরি হোয়াটসঅ্যাপে আপনার ভাবনার সাথে আমাদের অভিজ্ঞ ইভেন্ট আর্কিটেক্টদের মেলবন্ধন। আপনার পছন্দ, ভেন্যু নির্বাচন, অতিথি সংখ্যা এবং নির্ধারিত বাজেটের মধ্যে সর্বোচ্চ আভিজাত্যের নিখুঁত পরিকল্পনা।"
          : "Connect with our visionary event architects at our Rajshahi studio over fresh coffee or via WhatsApp. We meticulously align with your venue choice, guest scale, and budget to design an extraordinary celebration.",
      image: "/client-media/process-consultation.jpg",
    },
    {
      num: "02",
      tag: "02 / CONCEPT & 3D DESIGN",
      kicker: locale === "bn" ? "ধাপ ০২ · আর্কিটেকচারাল কনসেপ্ট ও ৩ডি ডিজাইন" : "STAGE 02 · BLUEPRINT & 3D DESIGN",
      title: locale === "bn" ? "০২. আর্কিটেকচারাল কনসেপ্ট ও ৩ডি ডিজাইন" : "02. Concept & Design",
      desc:
        locale === "bn"
          ? "প্রতিটি স্থানের নিজস্ব রূপ থাকে। আমরা আপনার ইভেন্টের জন্য কাস্টম মুডবোর্ড, ৩ডি স্টেজ ভিজ্যুয়ালাইজেশন, এক্সক্লুসিভ ফ্লোরাল প্যালেট এবং বুদ্ধিমান আলোকসজ্জার আর্কিটেকচারাল ব্লুপ্রিন্ট প্রস্তুত করি। বাস্তবায়ন শুরুর আগেই আপনি প্রতিটি ফ্রেমের নিখুঁত প্রিভিউ দেখতে পাবেন।"
          : "Every venue possesses a distinct soul. We forge custom moodboards, 3D stage mockups, exotic floral palettes, and intelligent lighting blueprints so you preview every frame before production begins.",
      image: "/client-media/process-concept-design.jpg",
    },
    {
      num: "03",
      tag: "03 / ON-GROUND CRAFTSMANSHIP",
      kicker: locale === "bn" ? "ধাপ ০৩ · নিখুঁত অন-সাইট প্রোডাকশন ও স্টেজ নির্মাণ" : "STAGE 03 · ON-GROUND CRAFTSMANSHIP",
      title: locale === "bn" ? "০৩. নিখুঁত অন-সাইট প্রোডাকশন ও স্টেজ নির্মাণ" : "03. On-Site Production",
      desc:
        locale === "bn"
          ? "ইভেন্টের পূর্বমুহূর্তে আমাদের সুদক্ষ ইঞ্জিনিয়ার ও কারিগর দল ভেন্যুতে নেমে আমদানি করা তাজা ফুল, কাস্টম উডেন আর্চ, হ্যাঙ্গিং শ্যান্ডেলিয়ার এবং উন্নত কনসার্ট ট্রাস লাইটিং নিখুঁতভাবে স্থাপন করে। প্রতিটি ইঞ্চি তৈরি হয় কঠোর কোয়ালিটি কন্ট্রোলের মাধ্যমে।"
          : "Our master craftsmen and technical crew arrive on-site with imported fresh florals, bespoke wooden arches, crystal chandeliers, and concert-grade truss lighting — engineered with uncompromising precision.",
      image: "/client-media/process-onsite-production.jpg",
    },
    {
      num: "04",
      tag: "04 / FLAWLESS CELEBRATION",
      kicker: locale === "bn" ? "ধাপ ০৪ · নিশ্চিন্ত ও রাজকীয় উদযাপন" : "STAGE 04 · GRAND FINALE",
      title: locale === "bn" ? "০৪. নিশ্চিন্ত ও রাজকীয় উদযাপন" : "04. Flawless Celebration",
      desc:
        locale === "bn"
          ? "শুভক্ষণ শুরু হওয়ার পর আপনি এবং আপনার পরিবার শুধু আনন্দের মুহূর্তগুলো উপভোগ করবেন। এন্ট্রি ওয়াকওয়ে থেকে শুরু করে মঞ্চের লাইভ কোঅর্ডিনেশন—অন-গ্রাউন্ড সমস্ত দায়িত্বে থাকে জেয়ো টিম। আপনার জীবনের সবচেয়ে বিশেষ দিনটি তৈরি হয় রূপকথার মতো চিরস্মরণীয়।"
          : "When the auspicious hour arrives, you and your family simply revel in pure joy. From grand entrance tunnels to live stage coordination, Zeyo orchestrates every detail for a fairy-tale reality.",
      image: "/client-media/process-flawless-celebration.jpg",
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-32 bg-[#e9e7e2] relative border-t border-[#2b2927]/10">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-20">
        <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#2b2927] font-sans-luxury font-bold mb-3">
          <span className="w-6 h-[1.5px] bg-[#2b2927]" />
          <span>{locale === "bn" ? "জেয়ো প্রোডাকশন মেথডলজি" : "THE PRODUCTION METHODOLOGY"}</span>
          <span className="w-6 h-[1.5px] bg-[#2b2927]" />
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#2b2927] font-bold tracking-tight mb-4 leading-tight">
          {locale === "bn" ? "স্বপ্ন থেকে উদযাপনে আমাদের পথচলা" : "From Dream to Celebration"}
        </h2>
        <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-bold max-w-2xl mx-auto leading-relaxed">
          {locale === "bn"
            ? "চারটি নিখুঁত ধাপের আর্কিটেকচারাল মেথডলজি—যেখানে প্রতিটি স্বপ্ন রূপ নেয় রাজকীয় বাস্তবতায়।"
            : "Four disciplined stages of architectural execution — orchestrating visionary celebrations from concept to finale."}
        </p>
      </div>

      {/* Sticky 3D Stacking Cards Deck (Exact same mechanism as QuoteBanners / Architecture, Scenography, Atelier) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="sticky will-change-transform mb-16 sm:mb-24 last:mb-0 transition-transform duration-300"
            style={{
              top: `calc(6.5rem + ${idx * 20}px)`,
              zIndex: idx + 10,
            }}
          >
            <div className="relative h-80 sm:h-96 md:h-[440px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-[#C9A24B]/35 bg-[#071426] transition-transform duration-700 ease-out hover:scale-[1.008] group cursor-pointer">
              {/* Background Image with slow cinematic zoom */}
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Cinematic dark overlay (no box-shadows, pure high-contrast editorial clarity) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35 group-hover:from-black/95 transition-colors" />

              {/* Top Accent Tag */}
              <div className="absolute top-5 left-6 sm:top-7 sm:left-8 z-20 flex items-center">
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#F3DE9A] font-sans-luxury font-bold">
                  {step.tag}
                </span>
              </div>

              {/* Centered Editorial Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-12 z-10">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#F3DE9A] font-sans-luxury font-bold mb-3">
                  {step.kicker}
                </span>

                <h3 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#F3DE9A] font-bold tracking-tight max-w-4xl leading-tight sm:leading-snug mb-4">
                  {step.title}
                </h3>

                <p className="font-serif-luxury italic font-bold text-sm sm:text-base md:text-lg lg:text-[20px] text-white/95 max-w-3xl mx-auto leading-relaxed sm:leading-[1.75]">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
