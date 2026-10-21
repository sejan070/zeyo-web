"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Tag, Crown, ShieldCheck } from "lucide-react";

export default function TrustStrip() {
  const { t } = useLanguage();

  const trustItems = [
    {
      icon: MapPin,
      title: t.trust.locationTitle,
      desc: t.trust.locationDesc
    },
    {
      icon: Tag,
      title: t.trust.pricingTitle,
      desc: t.trust.pricingDesc
    },
    {
      icon: Crown,
      title: t.trust.serviceTitle,
      desc: t.trust.serviceDesc
    },
    {
      icon: ShieldCheck,
      title: t.trust.supportTitle,
      desc: t.trust.supportDesc
    }
  ];

  return (
    <section id="trust" className="relative z-20 bg-[#0B1F3A] border-y border-[#C9A24B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#C9A24B]/20">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  index !== 0 ? "pt-6 sm:pt-0 lg:pl-6" : ""
                }`}
              >
                <div className="w-11 h-11 rounded-none border border-[#C9A24B]/40 bg-[#071426] flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-5 h-5 text-[#E0C172]" />
                </div>
                <div>
                  <h2 className="font-serif-luxury text-lg text-white font-medium tracking-wide">
                    {item.title}
                  </h2>
                  <p className="text-xs text-[#F6EFE6]/70 mt-1 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
