"use client";

import React, { useState } from "react";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import {
  Briefcase,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Clock,
  Send
} from "lucide-react";

export default function CareersBanner() {
  const { locale, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const role = companyInfo.hiringRole;

  const applyWhatsappUrl = `https://wa.me/8801743543346?text=${encodeURIComponent(
    `Hello Zeyo, I would like to apply for the Event Coordinator position at your Rajshahi office.`
  )}`;

  return (
    <section id="careers" className="py-20 sm:py-28 bg-[#e9e7e2] relative overflow-hidden border-b border-[#2b2927]/10">
      {/* Background Organic Ambient Curves */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#0E284D]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#C9A24B]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hiring Card with Organic Poster Aesthetic */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-white/95 backdrop-blur-2xl border border-white p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all duration-500">
          
          {/* Organic Aesthetic Wave Shapes (Exact Inspiration from Reference Poster) */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#0E284D]/15 via-[#C9A24B]/10 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-[#C9A24B]/15 via-[#0E284D]/10 to-transparent pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-[#C9A24B]/10 blur-2xl pointer-events-none" />

          {/* Grid Layout: Left Content & Right 3D Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Column: Hiring Details & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071426] text-white text-[11px] font-sans-luxury font-bold uppercase tracking-[0.2em]">
                  <Megaphone className="w-3.5 h-3.5 text-[#C9A24B] animate-bounce" />
                  <span>{locale === "bn" ? "আমরা নিয়োগ দিচ্ছি" : "WE ARE HIRING"}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E284D]/10 text-[#071426] text-xs font-sans-luxury font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-[#0E284D]" />
                  <span>{locale === "bn" ? "ওপেন পজিশন" : "OPEN POSITION"}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#595550] font-sans-luxury font-bold ml-auto sm:ml-0">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>{locale === "bn" ? role.workplaceBn : role.workplace}</span>
                </div>
              </div>

              {/* Big Editorial Job Title */}
              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#071426] font-bold tracking-tight mb-3">
                {locale === "bn" ? role.titleBn : role.title}
              </h2>

              {/* Job Highlights Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f3f1ec] text-[#2b2927] text-xs font-sans-luxury font-semibold">
                  <MapPin className="w-3 h-3 text-[#0E284D]" />
                  Alokar Mor, Rajshahi
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f3f1ec] text-[#2b2927] text-xs font-sans-luxury font-semibold">
                  <Clock className="w-3 h-3 text-[#0E284D]" />
                  {locale === "bn" ? "অভিজ্ঞতা: ০-২ বছর" : "Experience: 0-2 Years"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f3f1ec] text-[#2b2927] text-xs font-sans-luxury font-semibold">
                  <Briefcase className="w-3 h-3 text-[#0E284D]" />
                  Full-Time
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-bold mb-6 leading-relaxed">
                {locale === "bn" ? role.descriptionBn : role.description}
              </p>

              {/* Toggle Role Details */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#0E284D] hover:text-[#071426] font-sans-luxury font-bold transition-colors pb-1 border-b border-[#0E284D]/40 cursor-pointer"
                >
                  <span>{expanded ? "Hide Role Details" : t.careers.viewDetails}</span>
                  {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 pt-5 border-t border-[#2b2927]/10 animate-fade-in">
                    {/* Responsibilities */}
                    <div className="bg-[#f8faf8] p-4 sm:p-5 rounded-2xl border border-[#0E284D]/15">
                      <h4 className="text-xs uppercase tracking-widest text-[#071426] font-sans-luxury font-bold mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E284D]" />
                        <span>{locale === "bn" ? "দায়িত্বসমূহ (What You'll Do):" : "Responsibilities:"}</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-[#595550] font-sans-luxury font-medium">
                        {(locale === "bn" ? role.responsibilitiesBn : role.responsibilities).map((r, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0E284D] mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="bg-[#f8faf8] p-4 sm:p-5 rounded-2xl border border-[#0E284D]/15">
                      <h4 className="text-xs uppercase tracking-widest text-[#071426] font-sans-luxury font-bold mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E284D]" />
                        <span>{locale === "bn" ? "যোগ্যতা (We're Looking For):" : "Requirements:"}</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-[#595550] font-sans-luxury font-medium">
                        {(locale === "bn" ? role.requirementsBn : role.requirements).map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0E284D] mt-1.5 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons (Direct WhatsApp & Email Submission) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-[#2b2927]/10">
                <a
                  href={applyWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans-luxury font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Share Resume on WhatsApp</span>
                </a>

                <a
                  href={`mailto:${companyInfo.email}?subject=Application for Event Coordinator - Zeyo Rajshahi`}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full border border-[#071426]/30 text-[#071426] bg-white hover:bg-[#071426] hover:text-white font-sans-luxury font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>Submit via Email</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Luxury Armchair & Floating Loudspeakers Visual */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer Decorative Frame with Organic Fluid Backdrop */}
              <div className="relative w-full aspect-square max-w-[420px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-[#f2f7f3] via-[#e5efe7] to-[#d8e7dc] border border-[#0E284D]/20 p-4 flex flex-col items-center justify-center group">
                
                {/* Organic fluid wave elements behind the chair */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#C9A24B]/20 blur-xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#0E284D]/25 blur-xl pointer-events-none" />

                {/* Floating Top Pill Badge */}
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#0E284D]/20 text-[10px] uppercase tracking-widest font-sans-luxury font-bold text-[#071426]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E284D]" />
                  <span>Join Our Creative Team</span>
                </div>

                {/* 3D Luxury Velvet Armchair & Megaphones Rendering */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/client-media/hiring-chair-3d.jpg"
                    alt="Zeyo Careers - Join the Atelier"
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Bottom Architectural Caption */}
                <div className="absolute bottom-3 inset-x-4 z-20 text-center bg-white/80 backdrop-blur-md py-2 px-3 rounded-xl border border-white/80">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#071426] font-sans-luxury font-bold">
                    Zeyo Atelier · Rajshahi, Bangladesh
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

