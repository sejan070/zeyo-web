"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle, ArrowRight, HeartHandshake } from "lucide-react";

export default function CtaBand() {
  const { locale } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-[#e9e7e2] border-t border-[#2b2927]/10 relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[28px] bg-white/80 backdrop-blur-2xl border border-white/95 p-10 sm:p-16 shadow-[0_20px_50px_rgba(43,41,39,0.08)] hover:shadow-[0_30px_60px_rgba(43,41,39,0.15)] hover:-translate-y-1 transition-all duration-500">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2b2927]/20 bg-white/80 mb-6 shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#2b2927] font-sans-luxury font-bold">
              {locale === "bn" ? "অবিস্মরণীয় উৎসবের সূচনা" : "Exceptional Begins Here"}
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#2b2927] font-bold tracking-tight mb-6 leading-tight">
            {locale === "bn"
              ? "আপনার স্বপ্নের আয়োজনটি স্মরণীয় করতে আমরা প্রস্তুত।"
              : "Your extraordinary celebration begins here."}
          </h2>

          <p className="text-sm sm:text-base text-[#595550] max-w-xl mx-auto mb-10 font-sans-luxury font-bold leading-relaxed">
            {locale === "bn"
              ? "রাজশাহীতে যেকোনো ধরনের ওয়েডিং স্টেজ, বার্থডে ডেকোরেশন বা কর্পোরেট আয়োজনে সেরা সেবার প্রতিশ্রুতি।"
              : "Connect with our event designers today for a bespoke concept and transparent quote."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2b2927] text-white hover:bg-black font-sans-luxury font-bold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{locale === "bn" ? "তারিখ বুকিং দিন" : "Plan Your Event"}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </a>

            <a
              href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                "Hello Zeyo, I would like to inquire about event management & decoration in Rajshahi."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#2b2927]/25 text-[#2b2927] bg-white/90 hover:bg-white font-sans-luxury font-bold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
