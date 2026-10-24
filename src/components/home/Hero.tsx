"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
export default function Hero() {
  const { locale, t } = useLanguage();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Viewport intersection observer to completely halt video decoding when scrolled away
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Manage video play/pause based on visibility
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isHeroVisible) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [isHeroVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#2b2927] select-none"
    >
      {/* Background Pure Decoration Seamless Cinematic Montage */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-cinematic-thumb.jpg"
          className="w-full h-full object-cover scale-105 will-change-transform transform-gpu"
        >
          <source src="/videos/hero-cinematic-master.mp4" type="video/mp4" />
        </video>

        {/* Clean Subtle Video Scrim (No dark corner vignette/shadows) */}
        <div className="absolute inset-0 z-20 bg-black/20 pointer-events-none" />
      </div>

      {/* Center of the Screen: Completely Open & Clear (Sarah Haywood quiet luxury style) */}
      <div className="relative z-20 flex-1 flex items-center justify-center pointer-events-none" />

      {/* Bottom Area: Bold Italic Luxury Tagline & 3D Pill CTA */}
      <div className="relative z-30 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 sm:pb-14 text-center">

        {/* Bold & Italic Luxury Tagline at Bottom */}
        <h1 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.16em] sm:tracking-[0.25em] uppercase mb-2 text-white">
          {locale === "bn" ? (
            <span className="font-bengali font-bold italic">
              স্বপ্ন। সৃষ্টি। <span className="gold-gradient-text">উদযাপন।</span>
            </span>
          ) : (
            <>
              <span className="font-bold">Dream. Create. </span>
              <span className="gold-gradient-text italic font-bold">Celebrate.</span>
            </>
          )}
        </h1>

        {/* Bold Subtitle */}
        <p className="text-[11px] sm:text-sm text-[#F6EFE6] font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase mb-5 sm:mb-6 font-sans max-w-xl mx-auto">
          {locale === "bn"
            ? "রাজশাহী ও পুরো উত্তরবঙ্গে লাক্সারি ইভেন্ট ও ওয়েডিং ডেকোরেশন"
            : "Luxury Weddings, Celebrations & Stage Productions in Rajshahi"}
        </p>

        {/* Clean Pill Shaped Buttons (No box shadows) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 w-full max-w-xs sm:max-w-none mx-auto">
          <a
            href="#inquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-full border border-[#E0C172] text-[#071426] bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] font-bold text-xs tracking-[0.18em] uppercase hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>{t.hero.ctaPrimary}</span>
          </a>

          <Link
            href="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-full border border-[#C9A24B]/70 text-white bg-black/60 backdrop-blur-md font-bold text-xs tracking-[0.18em] uppercase hover:bg-[#C9A24B]/20 hover:border-[#C9A24B] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <span>{t.hero.ctaSecondary}</span>
          </Link>
        </div>

        {/* Scroll Prompt */}
        <a
          href="#services"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-[#C9A24B] transition-colors font-bold"
        >
          <span>{t.hero.scrollHint}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C9A24B]" />
        </a>
      </div>
    </section>
  );
}
