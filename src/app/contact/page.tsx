"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import InquirySection from "@/components/home/InquirySection";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircle, Mail, MapPin, Clock, Calendar, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const { locale, t } = useLanguage();

  const isBn = locale === "bn";

  return (
    <div className="relative min-h-screen bg-[#e9e7e2] text-[#2b2927] selection:bg-[#C9A24B] selection:text-[#071426]">
      {/* Sticky Luxury Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-24 sm:pt-28">
        {/* Hero Banner */}
        <section className="relative py-16 sm:py-24 bg-[#071426] text-white overflow-hidden border-b border-[#C9A24B]/30">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-sans-luxury font-black tracking-[0.25em] uppercase bg-[#C9A24B]/20 text-[#F3DE9A] border border-[#C9A24B]/50 shadow-md mb-4">
              {isBn ? "সরাসরি যোগাযোগ ও বুকিং" : "GET IN TOUCH • ZEYO ATELIER"}
            </span>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              {isBn ? (
                <>
                  আপনার স্বপ্নের ইভেন্ট <span className="gold-gradient-text italic font-bold">পরিকল্পনা শুরু করুন</span>
                </>
              ) : (
                <>
                  Let&apos;s Design Your <span className="gold-gradient-text italic font-bold">Extraordinary Celebration</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#d8d3cb] font-sans-luxury font-medium max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? "ওয়েডিং স্টেজ, থিমেটিক বার্থডে বা করপোরেট আয়োজন—জেয়ো টিমের সাথে সরাসরি পরামর্শ করুন অথবা বুকিং ইনকোয়ারি জমা দিন।"
                : "Whether it is a royal wedding stage, signature birthday or corporate gala, our event stylists in Rajshahi are ready to bring your vision to life."}
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 text-left">
              {/* Phone */}
              <a
                href={`tel:${companyInfo.phoneRaw}`}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A24B] hover:bg-white/10 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/20 border border-[#C9A24B]/40 flex items-center justify-center text-[#F3DE9A] mb-3 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="text-xs uppercase tracking-wider text-white/70 font-sans-luxury font-bold mb-1">
                  {isBn ? "সরাসরি কল" : "Call Directly"}
                </h4>
                <p className="text-sm sm:text-base font-bold text-white group-hover:text-[#F3DE9A] transition-colors">
                  {companyInfo.phone}
                </p>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                  "Hello Zeyo, I would like to inquire about event management and decoration in Rajshahi."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#25D366] hover:bg-white/10 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-3 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h4 className="text-xs uppercase tracking-wider text-white/70 font-sans-luxury font-bold mb-1">
                  {isBn ? "হোয়াটসঅ্যাপ চ্যাট" : "WhatsApp Chat"}
                </h4>
                <p className="text-sm sm:text-base font-bold text-white group-hover:text-[#25D366] transition-colors">
                  +880 1743-543346
                </p>
              </a>

              {/* Email */}
              <a
                href={`mailto:${companyInfo.email}`}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C9A24B] hover:bg-white/10 transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/20 border border-[#C9A24B]/40 flex items-center justify-center text-[#F3DE9A] mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="text-xs uppercase tracking-wider text-white/70 font-sans-luxury font-bold mb-1">
                  {isBn ? "অফিসিয়াল ইমেইল" : "Official Email"}
                </h4>
                <p className="text-sm sm:text-base font-bold text-white group-hover:text-[#F3DE9A] transition-colors truncate">
                  {companyInfo.email}
                </p>
              </a>

              {/* Office Location */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-[#C9A24B]/20 border border-[#C9A24B]/40 flex items-center justify-center text-[#F3DE9A] mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-xs uppercase tracking-wider text-white/70 font-sans-luxury font-bold mb-1">
                  {isBn ? "অফিস ঠিকানা" : "Studio Address"}
                </h4>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {isBn ? "আলোকোর মোড়, রাজশাহী" : "Alokar Mor, Rajshahi, BD"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Booking & Inquiry Form */}
        <InquirySection />

        {/* Location & Map Section */}
        <section className="py-14 sm:py-20 bg-[#dedbd4] border-t border-[#2b2927]/15">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 p-8 sm:p-12 shadow-[0_12px_32px_rgba(43,41,39,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-xs font-sans-luxury font-bold uppercase tracking-widest text-[#967425] block mb-2">
                    {isBn ? "আমাদের স্টুডিও ভিজিট করুন" : "VISIT OUR ATELIER"}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2b2927] mb-4">
                    {isBn ? "জেয়ো ইভেন্ট ম্যানেজমেন্ট রাজশাহী" : "Zeyo Event Management Studio"}
                  </h3>
                  <p className="text-sm text-[#595550] font-sans-luxury font-bold leading-relaxed mb-6">
                    {isBn
                      ? "আপনার বিশেষ দিনের ডেকোরেশন ক্যাটালগ ও ফ্লোরাল স্যাম্পল সরাসরি দেখে চূড়ান্ত করতে আমাদের অফিসে আমন্ত্রিত। চা পানের সাথে কথা হোক আপনার আয়োজন নিয়ে।"
                      : "We invite you to our studio to review physical floral textures, lighting catalogs, and customized blueprint mockups in person over a warm cup of tea."}
                  </p>

                  <div className="space-y-3 text-xs sm:text-sm font-sans-luxury font-bold text-[#2b2927]">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4.5 h-4.5 text-[#C9A24B] shrink-0" />
                      <span>{companyInfo.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4.5 h-4.5 text-[#C9A24B] shrink-0" />
                      <span>{isBn ? "প্রতিদিন সকাল ১০:০০ – রাত ৯:০০" : "Open Daily: 10:00 AM – 9:00 PM"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4.5 h-4.5 text-[#C9A24B] shrink-0" />
                      <span>Hotline: {companyInfo.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#2b2927]/15 shadow-xl aspect-video sm:aspect-[4/3] bg-[#071426] relative group">
                  <iframe
                    src={companyInfo.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zeyo Atelier Location Map"
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.98]"
                  />
                  <div className="absolute bottom-3 right-3 z-10">
                    <a
                      href={companyInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#071426]/95 hover:bg-[#C9A24B] text-[#F3DE9A] hover:text-[#071426] border border-[#C9A24B]/50 transition-all shadow-xl flex items-center gap-1.5 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#C9A24B] group-hover:text-[#071426]" />
                      <span>{isBn ? "গুগল ম্যাপে খুলুন" : "Open in Google Maps"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA Widgets */}
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}
