"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { companyInfo } from "@/data/company";
import { eventPackages } from "@/data/packages";
import { Calendar, Send, CheckCircle2, MessageCircle, Phone, MapPin, Mail, AlertCircle } from "lucide-react";

export default function InquirySection() {
  const { locale, t, selectedPackage } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [guestRange, setGuestRange] = useState("100–300");
  const [packageInterest, setPackageInterest] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync package selection from PackagesSection
  useEffect(() => {
    if (selectedPackage) {
      const match = eventPackages.find((p) => p.id === selectedPackage);
      if (match) {
        setPackageInterest(`${match.name} (${match.price})`);
      }
    }
  }, [selectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validation
    if (!fullName.trim()) {
      setErrorMessage(locale === "bn" ? "অনুগ্রহ করে আপনার নাম লিখুন।" : "Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/[\s-]/g, "");
    const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setErrorMessage(
        locale === "bn"
          ? "সঠিক বাংলাদেশি ফোন নম্বর দিন (যেমন: 017XXXXXXXX)"
          : "Please enter a valid Bangladesh phone number (e.g. 017XXXXXXXX)."
      );
      return;
    }

    if (!eventDate) {
      setErrorMessage(locale === "bn" ? "অনুগ্রহ করে ইভেন্টের তারিখ নির্বাচন করুন।" : "Please select your event date.");
      return;
    }

    if (!consent) {
      setErrorMessage(
        locale === "bn"
          ? "যোগাযোগের সম্মতির জন্য টিকচিহ্ন দিন।"
          : "Please check the consent box to allow us to contact you."
      );
      return;
    }

    setIsSubmitting(true);

    // Save lead simulation & WhatsApp deep link creation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const getWhatsAppSummaryUrl = () => {
    const text =
      `*New Event Inquiry - Zeyo Website*\n` +
      `👤 *Name:* ${fullName}\n` +
      `📞 *Phone:* ${phone}\n` +
      `✉️ *Email:* ${email || "N/A"}\n` +
      `🎉 *Event:* ${eventType}\n` +
      `📅 *Date:* ${eventDate}\n` +
      `📍 *Venue:* ${venue || "Rajshahi"}\n` +
      `👥 *Guests:* ${guestRange}\n` +
      `💎 *Package:* ${packageInterest || "Custom"}\n` +
      `💬 *Vision:* ${message || "Interested in consultation"}`;

    return `https://wa.me/8801743543346?text=${encodeURIComponent(text)}`;
  };

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <section id="inquiry" className="pt-16 pb-28 sm:py-32 bg-[#e9e7e2] relative border-t border-[#2b2927]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#2b2927] font-bold tracking-tight mb-4">
            {t.inquiry.title}
          </h2>
          <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-bold leading-relaxed max-w-2xl mx-auto">
            {t.inquiry.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact & Office Info */}
          <div className="lg:col-span-5 rounded-[26px] bg-gradient-to-br from-[#ffffff] via-[#fbf7f0] to-[#f4ebe1] border-2 border-[#e0ceb7]/70 p-6 sm:p-8 lg:p-9 shadow-[0_15px_45px_rgba(43,41,39,0.08)] hover:shadow-[0_25px_60px_rgba(201,162,75,0.25)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden">
            {/* Top Specular Shine */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent pointer-events-none" />
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#2b2927] font-bold mb-3">
              {locale === "bn" ? "জেয়ো স্টুডিও ও অফিস" : "Zeyo Studio & Headquarters"}
            </h3>

            <p className="text-xs sm:text-sm text-[#595550] font-sans-luxury font-bold leading-relaxed mb-6">
              {locale === "bn"
                ? "আমাদের টিম সরাসরি ক্লায়েন্টদের সাথে বসে কাস্টমাইজড ইভেন্ট আর্কিটেকচার ও থিম ডেকোরেশন প্ল্যান প্রস্তুত করে। যেকোনো তথ্য জানতে ফোন করুন বা অফিসে আসুন।"
                : "Meet with our creative planners to review 3D stage mockups, imported floral palettes, and bespoke theme packages in Rajshahi."}
            </p>

            <div className="space-y-4 text-sm">
              {/* 1. Direct Phone & WhatsApp (TOP) */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full border border-[#2b2927]/15 bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C9A24B]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-sans-luxury font-bold block mb-0.5">
                    {locale === "bn" ? "ফোন ও হোয়াটসঅ্যাপ" : "Direct Phone & WhatsApp"}
                  </span>
                  <a
                    href={`tel:${companyInfo.phoneRaw}`}
                    className="text-base sm:text-[17px] text-[#2b2927] hover:text-[#C9A24B] font-sans-luxury font-bold tracking-normal block transition-colors"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>

              {/* 2. Official Email (SECOND) */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full border border-[#2b2927]/15 bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#C9A24B]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-sans-luxury font-bold block mb-0.5">
                    {locale === "bn" ? "অফিসিয়াল ইমেইল" : "Official Email"}
                  </span>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-xs sm:text-sm text-[#2b2927] hover:text-[#C9A24B] font-sans-luxury font-bold transition-colors"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              {/* 3. Office Address (THIRD) */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full border border-[#2b2927]/15 bg-white shadow-sm flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#C9A24B]" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C9A24B] font-sans-luxury font-bold block mb-0.5">
                    {locale === "bn" ? "অফিস ঠিকানা" : "Office Address"}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed text-[#2b2927] font-sans-luxury font-bold">
                    {locale === "bn" ? companyInfo.addressBn : companyInfo.address}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Google Maps Embed Preview Box (Matching Contact Page) */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-[#2b2927]/15 shadow-md aspect-[16/9] sm:aspect-[2/1] bg-[#071426] relative group">
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
              <div className="absolute bottom-2.5 right-2.5 z-10">
                <a
                  href={companyInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[#071426]/95 hover:bg-[#C9A24B] text-[#F3DE9A] hover:text-[#071426] border border-[#C9A24B]/50 transition-all shadow-lg flex items-center gap-1.5 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  <MapPin className="w-3 h-3 text-[#C9A24B] group-hover:text-[#071426]" />
                  <span>{locale === "bn" ? "গুগল ম্যাপে দেখুন" : "Open in Google Maps"}</span>
                </a>
              </div>
            </div>

            {/* 5. Quick WhatsApp Action Box */}
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white/70 border border-white/90 shadow-sm">
              <p className="text-xs text-[#595550] mb-2.5 font-sans-luxury font-bold">
                {locale === "bn"
                  ? "দ্রুত জবাব চান? সরাসরি আমাদের হোয়াটসঅ্যাপে মেসেজ পাঠান।"
                  : "Need an immediate answer? Speak directly with our head coordinator."}
              </p>
              <a
                href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                  "Hello Zeyo, I would like to inquire about event management & decoration in Rajshahi."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-[#198754] hover:bg-[#157347] text-white flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-sans-luxury font-bold transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form / Success Screen */}
          <div className="lg:col-span-7 rounded-[26px] bg-gradient-to-br from-[#ffffff] via-[#fcf9f2] to-[#f6ecde] border-2 border-[#e0ceb7]/70 p-5 sm:p-8 lg:p-10 shadow-[0_15px_45px_rgba(43,41,39,0.08)] hover:shadow-[0_25px_60px_rgba(201,162,75,0.25)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden">
            {/* Top Specular Shine */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent pointer-events-none" />
            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#198754]/15 border border-[#25D366] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#198754]" />
                </div>

                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#2b2927] font-bold mb-3">
                  {t.inquiry.submittedTitle}
                </h3>

                <p className="text-sm text-[#595550] font-sans-luxury font-bold max-w-md mx-auto mb-8 leading-relaxed">
                  {t.inquiry.submittedDesc}
                </p>

                <a
                  href={getWhatsAppSummaryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#198754] hover:bg-[#157347] text-white text-xs sm:text-sm uppercase tracking-widest font-sans-luxury font-bold transition-all shadow-xl hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.inquiry.chatWhatsAppBtn}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-xs text-[#595550] hover:text-[#2b2927] underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-300 flex items-center gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.inquiry.namePlaceholder}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] placeholder-[#595550]/50 focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.inquiry.phonePlaceholder}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] placeholder-[#595550]/50 focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Email & Event Type Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.inquiry.emailPlaceholder}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] placeholder-[#595550]/50 focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.eventTypeLabel} *
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    >
                      <option value="Wedding">Wedding / Reception (বিবাহ / বৌভাত)</option>
                      <option value="Holud/Mehndi">Holud / Mehndi Ceremony (হলুদ / মেহেন্দি)</option>
                      <option value="Birthday">Milestone Birthday (বার্থডে ডেকোরেশন)</option>
                      <option value="Anniversary">Anniversary Celebration (অ্যানিভার্সারি)</option>
                      <option value="Corporate">Corporate Gala / Conference (কর্পোরেট ইভেন্ট)</option>
                      <option value="Wall Painting">Custom Wall Painting / Mural (ওয়াল পেইন্টিং)</option>
                      <option value="Other">Other Bespoke Event (অন্যান্য আয়োজন)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Venue Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.dateLabel} *
                    </label>
                    <input
                      type="date"
                      required
                      min={minDate || undefined}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.venueLabel}
                    </label>
                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder={t.inquiry.venuePlaceholder}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] placeholder-[#595550]/50 focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Package & Guest Range Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.packageLabel}
                    </label>
                    <select
                      value={packageInterest}
                      onChange={(e) => setPackageInterest(e.target.value)}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    >
                      <option value="">Customized Plan / Not Sure</option>
                      {eventPackages.map((pkg) => (
                        <option key={pkg.id} value={`${pkg.name} (${pkg.price})`}>
                          {pkg.name} Package ({pkg.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                      {t.inquiry.guestsLabel}
                    </label>
                    <select
                      value={guestRange}
                      onChange={(e) => setGuestRange(e.target.value)}
                      className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                    >
                      <option value="Under 50">Under 50 Guests (ইনটিমেট)</option>
                      <option value="50–100">50 – 100 Guests</option>
                      <option value="100–300">100 – 300 Guests</option>
                      <option value="300–500">300 – 500 Guests</option>
                      <option value="500+">500+ Guests (গ্র্যান্ড রয়্যাল)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#2b2927] font-sans-luxury font-bold mb-2">
                    {t.inquiry.messageLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.inquiry.messagePlaceholder}
                    className="w-full rounded-xl bg-white/80 border border-[#2b2927]/20 px-4 py-3 text-sm text-[#2b2927] placeholder-[#595550]/50 focus:outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/20 transition-all shadow-sm"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-[#2b2927] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-[#595550] cursor-pointer leading-relaxed font-sans-luxury font-medium">
                    {t.inquiry.consentLabel}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 px-4 rounded-full bg-[#2b2927] text-white hover:bg-black font-sans-luxury font-bold text-xs sm:text-sm uppercase tracking-[0.12em] sm:tracking-[0.2em] shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C9A24B]" />
                      <span>{t.inquiry.submitBtn}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
