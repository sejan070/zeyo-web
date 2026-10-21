"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

export default function BrandIntro() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const isHomePage = pathname === "/";

  // Check if intro was already shown in this tab session
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (!isHomePage) return false;
    if (typeof window !== "undefined") {
      try {
        if (sessionStorage.getItem("zeyo_intro_seen") === "true") {
          return false;
        }
      } catch {}
    }
    return true;
  });

  const [isSlidingUp, setIsSlidingUp] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(false);
      return;
    }

    try {
      if (sessionStorage.getItem("zeyo_intro_seen") === "true") {
        setIsVisible(false);
        return;
      }
      // Mark as seen immediately so any reload never gets stuck
      sessionStorage.setItem("zeyo_intro_seen", "true");
    } catch {}

    const timer1 = setTimeout(() => {
      setIsSlidingUp(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("zeyo-brand-intro-complete"));
      }
    }, 700);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isHomePage]);

  if (!isVisible || !isHomePage) {
    return null;
  }

  const handleDismiss = () => {
    setIsSlidingUp(true);
    try {
      sessionStorage.setItem("zeyo_intro_seen", "true");
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("zeyo-brand-intro-complete"));
    }
    setTimeout(() => setIsVisible(false), 300);
  };

  return (
    <div
      onClick={handleDismiss}
      style={{
        animation: "brandIntroAutoDismiss 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards"
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#071426] via-[#050E1B] to-[#030811] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu ${
        isSlidingUp
          ? "-translate-y-full opacity-90 pointer-events-none"
          : "translate-y-0 opacity-100 cursor-pointer"
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes brandIntroAutoDismiss {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; pointer-events: none; visibility: hidden; }
        }
      `}} />

      {/* Luxury ambient warm gold and royal navy glow behind logo */}
      <div className="absolute w-[520px] h-[520px] bg-[#C9A24B]/20 rounded-full blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute w-[360px] h-[360px] bg-[#0E284D]/50 rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle luxury gold radial background motif */}
      <div className="absolute inset-0 bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.06] pointer-events-none" />

      {/* Centerpiece Monogram & Brand reveal */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Enlarged Emblem with Gold Shimmer Sweep & Pulsing Glow */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full border-2 border-[#C9A24B] flex items-center justify-center bg-[#071426] shadow-[0_0_35px_rgba(201,162,75,0.4)] mb-6 transition-transform duration-500 hover:scale-105">
          {/* Inner Emblem Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img
              src="/client-media/zeyo-logo-emblem.jpg"
              alt="Zeyo Logo"
              className="w-full h-full object-cover"
            />

            {/* Continuous Luxury Gold Shimmer Sweep across the "Z" Monogram */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
              <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-sweep" />
            </div>
          </div>

          {/* Rotating outer ring accent */}
          <div className="absolute inset-[-6px] rounded-full border-t-2 border-r border-[#C9A24B] animate-spin [animation-duration:3.5s] pointer-events-none" />
          <div className="absolute inset-[-12px] rounded-full border-b border-[#C9A24B]/40 animate-spin [animation-duration:6s] [animation-direction:reverse] pointer-events-none" />
        </div>

        {/* Brand Wordmark - Gold & White metallic luxury gradient */}
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-white via-[#F5E6BE] to-[#C9A24B] bg-clip-text text-transparent mb-2 drop-shadow-[0_2px_14px_rgba(201,162,75,0.35)]">
          Zeyo
        </h1>

        {/* Tagline */}
        <p className="text-[11px] sm:text-xs tracking-[0.38em] uppercase text-[#E0C172] font-sans-luxury font-bold drop-shadow-sm">
          {locale === "bn" ? companyInfo.taglineBn : companyInfo.tagline}
        </p>

        {/* Expanding Gold Accent Line */}
        <div className="w-28 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent mt-6 animate-pulse" />

        {/* Quick Click Anywhere / Skip text */}
        <button
          type="button"
          onClick={handleDismiss}
          className="mt-8 text-[11px] uppercase tracking-[0.25em] text-[#C9A24B] hover:text-white transition-colors cursor-pointer py-1 px-4 rounded-full border border-[#C9A24B]/30 hover:border-[#C9A24B]"
        >
          Enter Website →
        </button>
      </div>
    </div>
  );
}
