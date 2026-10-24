"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";

export default function BrandIntro() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const isHomePage = pathname === "/";

  // Check if intro was already shown in this tab session (or forced via ?intro=1)
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (!isHomePage) return false;
    if (typeof window !== "undefined") {
      try {
        if (window.location.search.includes("intro=1")) {
          return true;
        }
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
      const forceIntro = typeof window !== "undefined" && window.location.search.includes("intro=1");
      if (!forceIntro && sessionStorage.getItem("zeyo_intro_seen") === "true") {
        setIsVisible(false);
        return;
      }
      if (!forceIntro) {
        sessionStorage.setItem("zeyo_intro_seen", "true");
      }
    } catch {}

    const timer1 = setTimeout(() => {
      setIsSlidingUp(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("zeyo-brand-intro-complete"));
      }
    }, 1500);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
    }, 2100);

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
        animation: "brandIntroAutoDismiss 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.5s forwards"
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#081329] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform transform-gpu ${
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

      {/* Centerpiece Emblem & Brand Wordmark */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Clean Logo Emblem without glowing halos or spinning rings */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border border-[#C9A24B]/35 flex items-center justify-center bg-[#081329] mb-5 overflow-hidden">
          <img
            src="/client-media/zeyo-logo-emblem.jpg"
            alt="Zeyo Logo Emblem"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Official Brand Wordmark - exact lowercase 'zeyo' with brushed silver metal finish */}
        <div className="my-1 flex items-center justify-center">
          <img
            src="/client-media/zeyo-wordmark-clean.png"
            alt="zeyo"
            className="w-40 sm:w-48 md:w-56 h-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <p className="text-[10.5px] sm:text-xs tracking-[0.34em] uppercase text-[#E0C172] font-sans-luxury font-bold mt-3">
          {locale === "bn" ? companyInfo.taglineBn : companyInfo.tagline}
        </p>

        {/* Clean subtle accent line */}
        <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/50 to-transparent mt-4" />
      </div>
    </div>
  );
}
