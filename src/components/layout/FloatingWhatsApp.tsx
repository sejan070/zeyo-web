"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const { locale } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const greeting =
    locale === "bn"
      ? "হ্যালো জেয়ো, আমি রাজশাহীতে ইভেন্ট ডেকোরেশন ও প্যাকেজ সম্পর্কে জানতে চাচ্ছি।"
      : "Hello Zeyo, I would like to inquire about event management and decoration packages in Rajshahi.";

  const whatsappUrl = `https://wa.me/8801743543346?text=${encodeURIComponent(
    greeting
  )}`;

  return (
    <div className="fixed hidden sm:flex bottom-6 sm:bottom-8 right-5 z-40 items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-[#2b2927]/20 text-[#2b2927] text-xs px-4 py-2 shadow-xl rounded-full animate-bounce">
          <span className="font-sans-luxury text-xs font-bold text-[#2b2927]">
            {locale === "bn" ? "হোয়াটসঅ্যাপে কথা বলুন" : "Chat on WhatsApp"}
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#595550] hover:text-[#2b2927] cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0F5132] via-[#198754] to-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-[#C9A24B] relative group"
        aria-label="Chat on WhatsApp with Zeyo Event Planner"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
      </a>
    </div>
  );
}
