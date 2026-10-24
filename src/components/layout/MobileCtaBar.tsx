"use client";

import React from "react";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileCtaBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { locale } = useLanguage();

  const greeting =
    locale === "bn"
      ? "হ্যালো জেয়ো, আমি রাজশাহীতে ইভেন্ট ডেকোরেশন সম্পর্কে জানতে চাচ্ছি।"
      : "Hello Zeyo, I would like to inquire about event management in Rajshahi.";

  const whatsappUrl = `https://wa.me/8801743543346?text=${encodeURIComponent(
    greeting
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#fbfaf8]/95 backdrop-blur-xl border-t border-[#2b2927]/15 px-3 py-2 flex items-center justify-between gap-2">
      {/* Call Button */}
      <a
        href={`tel:${companyInfo.phoneRaw}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white border border-[#2b2927]/25 text-[#2b2927] text-xs font-sans-luxury font-bold uppercase tracking-wider rounded-full"
      >
        <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
        <span>{locale === "bn" ? "কল দিন" : "Call"}</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#198754] text-white text-xs font-sans-luxury font-bold uppercase tracking-wider rounded-full"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Inquire Button */}
      <a
        href={isHome ? "#inquiry" : "/contact"}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-[#2b2927] text-white text-xs font-sans-luxury font-bold uppercase tracking-wider rounded-full"
      >
        <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
        <span>{locale === "bn" ? "বুকিং" : "Inquire"}</span>
      </a>
    </div>
  );
}
