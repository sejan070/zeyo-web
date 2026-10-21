"use client";

import React, { useEffect } from "react";
import { PortfolioItem } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface LightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ item, onClose, onPrev, onNext }: LightboxProps) {
  const { locale } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image & Caption Container */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
        <img
          src={item.image}
          alt={item.title}
          className="max-h-[70vh] w-auto max-w-full object-contain border border-[#C9A24B]/30 shadow-2xl"
        />

        <div className="mt-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A24B] font-semibold">
            {locale === "bn" ? item.categoryLabelBn : item.categoryLabel}
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-light mt-1">
            {locale === "bn" ? item.titleBn : item.title}
          </h3>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#F6EFE6]/70 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>{locale === "bn" ? item.venueBn : item.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
