"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import {
  Calendar,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Compass,
  Layers,
  Wrench,
  HeartHandshake
} from "lucide-react";

export default function ProcessPage() {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  const steps = [
    {
      stepNumber: "01",
      badgeEn: "DISCOVERY & VISION",
      badgeBn: "পরামর্শ ও পরিকল্পনা",
      titleEn: "Personalized Consultation & Venue Scouting",
      titleBn: "০১. ব্যক্তিগত পরামর্শ ও ভেন্যু বিশ্লেষণ",
      descEn:
        "Every exceptional celebration begins with an authentic conversation. Over coffee at our studio on New Market Road, Alokar Mor, or via WhatsApp, we listen intently to your vision, aesthetic aspirations, guest capacity, and investment expectations. We conduct physical walkthroughs of your selected venue in Rajshahi to map architectural acoustics, ceiling heights, electrical loads, and guest flow.",
      descBn:
        "প্রতিটি অনন্য উৎসবের সূচনা হয় আন্তরিক আড্ডা ও ভাবনার মেলবন্ধনে। আলোকার মোড়ে আমাদের স্টুডিওতে এক কাপ কফির টেবিলে কিংবা সরাসরি হোয়াটসঅ্যাপে আমরা আপনার বাজেট, পছন্দের থিম এবং অতিথি সংখ্যা বিস্তারিত বুঝি। রাজশাহীর নির্বাচিত ভেন্যু (ক্লাব, মোটেল, বা ব্যক্তিগত লন) সরেজমিনে পরিদর্শন করে মেপে নিই সিলিং উচ্চতা, প্রবেশদ্বার ও আলোক বিন্যাস।",
      deliverablesEn: [
        "In-depth client questionnaire & aesthetic preference mapping",
        "Physical venue dimension audit & electrical load assessment",
        "Transparent cost breakdown & milestone scheduling",
        "Initial concept roadmap aligned with family traditions"
      ],
      deliverablesBn: [
        "ক্লায়েন্টের পছন্দ, থিম ও পারিবারিক ঐতিহ্যের বিশ্লেষণ",
        "ভেন্যুর ফিজিক্যাল মাপজোখ ও লোড শেয়ারিং পরীক্ষা",
        "স্বচ্ছ বাজেট কাঠামো ও ডেলিভারি শিডিউল নির্ধারণ",
        "প্রাথমিক কনসেপ্ট ও ভেন্যু লেআউট নকশা"
      ],
      image: "/client-media/process-consultation.jpg",
      timeframeEn: "Week 1–2 of planning",
      timeframeBn: "পরিকল্পনার ১ম–২য় সপ্তাহ"
    },
    {
      stepNumber: "02",
      badgeEn: "ARCHITECTURE & 3D BLUEPRINT",
      badgeBn: "কনসেপ্ট ও ৩ডি ডিজাইন",
      titleEn: "Concept Development, Moodboarding & 3D Previews",
      titleBn: "০২. কনসেপ্ট ডেভেলপমেন্ট ও ৩ডি ভিজ্যুয়ালাইজেশন",
      descEn:
        "We believe you should see your celebration before building begins. Our design atelier creates bespoke moodboards, custom color palettes, and architectural 3D simulations of the stage, canopy, and entryway. Every detail—from the exact tone of imported roses to chandelier heights and table runner textiles—is calibrated and approved by you.",
      descBn:
        "নির্মাণ শুরুর আগেই আপনি দেখতে পাবেন আপনার ইভেন্টের পূর্ণাঙ্গ রূপ। আমরা প্রস্তুত করি কাস্টম মুডবোর্ড, ৩ডি স্টেজ ভিজ্যুয়ালাইজেশন ও এক্সক্লুসিভ কালার প্যালেট। ব্যবহৃত তাজা ফুলের কালার গ্রেডিয়েন্ট, ক্রিস্টাল শ্যান্ডেলিয়ারের উচ্চতা থেকে শুরু করে টেবিল লিনেন—প্রতিটি খুঁটিনাটি ফ্রেম অনুমোদনের পর বাস্তবায়নে যায়।",
      deliverablesEn: [
        "Detailed 3D renders of the stage, backdrop, and walkway",
        "Curated floral palette selection (fresh local & imported blooms)",
        "Lighting temperature blueprints (warm amber, follow-spot cues)",
        "Materials & fabric swatches approval"
      ],
      deliverablesBn: [
        "স্টেজ, ব্যাকড্রপ ও এন্ট্রি ওয়াকওয়ের ৩ডি ভিজ্যুয়াল রেন্ডার",
        "আমদানিকৃত তাজা ফুলের জাত ও কালার প্যালেট সিলেকশন",
        "ওয়ার্ম অ্যাম্বিয়েন্ট ও সিনেমাটিক লাইটিং ব্লুপ্রিন্ট",
        "ফেব্রিক, কার্পেট ও উডেন আর্চের মেটেরিয়াল অনুমোদন"
      ],
      image: "/client-media/process-concept-design.jpg",
      timeframeEn: "Week 2–3 of planning",
      timeframeBn: "পরিকল্পনার ২য়–৩য় সপ্তাহ"
    },
    {
      stepNumber: "03",
      badgeEn: "CRAFTSMANSHIP & RIGGING",
      badgeBn: "অন-সাইট নির্মাণ",
      titleEn: "On-Site Production, Floral Artistry & Engineering",
      titleBn: "০৩. অন-সাইট প্রোডাকশন ও কারিগরী নির্মাণ",
      descEn:
        "Execution is where craftsmanship meets precision. Hours before the celebration, our skilled crew of carpenters, floral artists, structural riggers, and certified electricians arrive on-site. Heavy-duty stage platforms are erected, custom wooden arches are bolted, crystal chandeliers are hoisted with aircraft-grade wire, and fresh florals are hydrated and installed.",
      descBn:
        "পরিকল্পনাকে বাস্তবে রূপ দেওয়ার দায়িত্ব আমাদের দক্ষ কারিগর টিমের। ইভেন্টের পূর্বমুহূর্তে ভেন্যুতে নেমে কাঠমিস্ত্রি, ফ্লোরাল ডিজাইনার ও টেকনিশিয়ানরা নিখুঁতভাবে স্টেজ ফ্রেম দাঁড় করান। ক্রিস্টাল শ্যান্ডেলিয়ার স্থাপন, তাজা ফুল গাঁথা এবং ব্যাকড্রপ লাইটিং ইনস্টল করে প্রতিটি ইঞ্চি কঠোর কোয়ালিটি কন্ট্রোলের মাধ্যমে প্রস্তুত করা হয়।",
      deliverablesEn: [
        "Structural stage assembly with reinforced underpinnings",
        "Hydrated fresh floral installation by master florists",
        "Chandelier rigging & moving beam lighting calibration",
        "Backup power contingency & safety compliance checks"
      ],
      deliverablesBn: [
        "মজবুত কাঠ ও ট্রাস কাঠামোর ওপর নির্ভরযোগ্য স্টেজ প্ল্যাটফর্ম",
        "অভিজ্ঞ ফ্লোরাল আর্টিস্টদের দ্বারা তাজা ফুলের নিখুঁত কাজ",
        "শ্যান্ডেলিয়ার ঝুলানো ও মুভিং লাইট ক্যালিগ্রেশন",
        "জরুরি ব্যাকআপ ও নিরাপত্তা ব্যবস্থা নিশ্চিতকরণ"
      ],
      image: "/client-media/process-onsite-production.jpg",
      timeframeEn: "24–48 hours prior to event",
      timeframeBn: "ইভেন্টের ২৪–৪৮ ঘণ্টা পূর্বে"
    },
    {
      stepNumber: "04",
      badgeEn: "FLAWLESS COORDINATION",
      badgeBn: "ইভেন্ট ডে কোঅর্ডিনেশন",
      titleEn: "Flawless Event Day Coordination & Celebration",
      titleBn: "০৪. উৎসবের দিনে নিশ্চিন্ত ও নিখুঁত সমন্বয়",
      descEn:
        "When the celebration begins, your only responsibility is to immerse yourself in the joy of the moment. Zeyo’s on-ground event managers oversee live guest flow, bride & groom entrance cues, fog/sparkler timing, photographer coordination, and ambient lighting transitions, ensuring every second unfolds seamlessly without stress.",
      descBn:
        "শুভক্ষণ শুরু হলে আপনার এবং আপনার পরিবারের একমাত্র দায়িত্ব হলো আনন্দের মুহূর্তগুলো নির্ভাবনায় উপভোগ করা। গেস্ট ওয়েলকামিং থেকে শুরু করে বর-কনের গ্র্যান্ড এন্ট্রি, কেক কাটিং স্পার্কলার মোমেন্ট কিংবা ফটো শুটের ব্যাকড্রপ ম্যানেজমেন্ট—অন-গ্রাউন্ড সমস্ত দায়িত্ব সামলায় জেয়োর অভিজ্ঞ টিম।",
      deliverablesEn: [
        "Dedicated on-ground lead coordinator throughout the event",
        "Seamless bride & groom grand entrance orchestration",
        "Live fog, pyrotechnics & lighting transition timing",
        "Complete peace of mind for the host family"
      ],
      deliverablesBn: [
        "ইভেন্ট চলাকালীন উপস্থিত অন-সাইট সিনিয়র কো-অর্ডিনেটর",
        "বর-কনে ও বিশেষ অতিথিদের রাজকীয় এন্ট্রি সমন্বয়",
        "ফগ, স্পার্কলার ও লাইভ মিউজিক কিউইং ম্যানেজমেন্ট",
        "পারিবারিক মানসিক স্বস্তি ও রূপকথার মতো সফল সমাপনী"
      ],
      image: "/client-media/process-flawless-celebration.jpg",
      timeframeEn: "Event Day Execution",
      timeframeBn: "ইভেন্টের দিন সার্বক্ষণিক তদারকি"
    }
  ];

  const timelineSteps = [
    {
      periodEn: "4–8 Weeks Out",
      periodBn: "৪–৮ সপ্তাহ পূর্বে",
      titleEn: "Inquiry & Date Reservation",
      titleBn: "ইনকোয়ারি ও তারিখ বুকিং",
      descEn: "Consultation, preliminary budget lock, and venue feasibility check."
    },
    {
      periodEn: "3–4 Weeks Out",
      periodBn: "৩–৪ সপ্তাহ পূর্বে",
      titleEn: "Design Approval & 3D Renders",
      titleBn: "ডিজাইন ও ৩ডি অনুমোদন",
      descEn: "Custom moodboards, floral choices, and spatial staging blueprint confirmed."
    },
    {
      periodEn: "1–2 Weeks Out",
      periodBn: "১–২ সপ্তাহ পূর্বে",
      titleEn: "Logistics & Material Sourcing",
      titleBn: "লজিস্টিকস ও ম্যাটেরিয়াল প্রস্তুতি",
      descEn: "Floral procurement, custom woodwork fabrication, lighting & equipment prep."
    },
    {
      periodEn: "Event Day",
      periodBn: "ইভেন্টের দিন",
      titleEn: "Execution & Flawless Host Experience",
      titleBn: "নিখুঁত বাস্তবায়ন ও হোস্ট এক্সপেরিয়েন্স",
      descEn: "Zero-stress event coordination while you celebrate with your loved ones."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#e9e7e2] text-[#2b2927] selection:bg-[#C9A24B] selection:text-[#071426]">
      {/* Sticky Luxury Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-24 sm:pt-28">
        {/* Editorial Hero Banner */}
        <section className="relative py-16 sm:py-24 bg-[#071426] text-white overflow-hidden border-b border-[#C9A24B]/30">
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C9A24B_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-sans-luxury font-bold tracking-[0.25em] uppercase bg-[#C9A24B]/20 text-[#F3DE9A] border border-[#C9A24B]/40 shadow-md mb-4">
              {isBn ? "আমাদের কর্মপদ্ধতি • জেয়ো ব্লুপ্রিন্ট" : "THE BLUEPRINT FOR PERFECTION • ZEYO"}
            </span>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
              {isBn ? (
                <>
                  স্বপ্ন থেকে সফল উদযাপনে <span className="gold-gradient-text italic font-bold">৪ ধাপের পথচলা</span>
                </>
              ) : (
                <>
                  From Vision to Reality: <span className="gold-gradient-text italic font-bold">Our 4-Step Process</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#d8d3cb] font-sans-luxury font-medium max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? "প্রথম পরামর্শ থেকে শুরু করে ইভেন্টের দিনের চূড়ান্ত আলো ঝলমলে মুহূর্ত—কীভাবে নিখুঁত আভিজাত্য নিশ্চিত করি আমরা।"
                : "A rigorous, collaborative methodology ensuring zero stress for your family and immaculate execution on the big day."}
            </p>
          </div>
        </section>

        {/* The 4 Core Process Steps (Detailed Editorial Cards) */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 sm:space-y-28">
            {steps.map((st, idx) => (
              <div
                key={st.stepNumber}
                className="bg-white/90 rounded-[24px] border border-[#2b2927]/10 p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(43,41,39,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(43,41,39,0.12)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Photo Side */}
                  <div className={`lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={st.image}
                      alt={st.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="w-10 h-10 rounded-full bg-[#071426] text-[#F3DE9A] border border-[#C9A24B] flex items-center justify-center font-serif-luxury font-bold text-lg shadow-md">
                        {st.stepNumber}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-sans-luxury font-bold bg-[#071426]/90 text-white border border-white/20">
                        {isBn ? st.badgeBn : st.badgeEn}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-sans-luxury font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C9A24B]" />
                      <span>{isBn ? st.timeframeBn : st.timeframeEn}</span>
                    </div>
                  </div>

                  {/* Text Details Side */}
                  <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="text-xs font-sans-luxury font-bold text-[#C9A24B] uppercase tracking-widest block mb-1">
                      {isBn ? `ধাপ ${st.stepNumber}` : `PHASE ${st.stepNumber}`}
                    </span>

                    <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#2b2927] font-bold mb-4 leading-snug">
                      {isBn ? st.titleBn : st.titleEn}
                    </h2>

                    <p className="text-sm sm:text-base text-[#595550] font-sans-luxury font-medium leading-relaxed mb-6">
                      {isBn ? st.descBn : st.descEn}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest text-[#2b2927] font-sans-luxury font-bold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A24B]" />
                        <span>{isBn ? "প্রধান ডেলিভারেবলসমূহ:" : "KEY DELIVERABLES:"}</span>
                      </h4>

                      <ul className="space-y-2.5">
                        {(isBn ? st.deliverablesBn : st.deliverablesEn).map((d, dIdx) => (
                          <li key={dIdx} className="text-xs sm:text-sm text-[#3e3b38] font-sans-luxury font-medium flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] mt-1.5 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Summary Component */}
        <section className="py-16 sm:py-24 bg-white/60 border-t border-[#2b2927]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-sans-luxury font-bold uppercase tracking-[0.2em] text-[#C9A24B] block mb-1">
                {isBn ? "প্রোডাকশন টাইমলাইন" : "EVENT PRODUCTION TIMELINE"}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#2b2927] font-bold">
                {isBn ? "পরিকল্পনা থেকে সফল সমাপনী" : "How Time Unfolds Together"}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {timelineSteps.map((tl, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white border border-[#2b2927]/10 shadow-[0_4px_20px_rgba(43,41,39,0.04)] relative"
                >
                  <div className="w-8 h-8 rounded-full bg-[#071426] text-[#C9A24B] flex items-center justify-center font-bold text-xs mb-4">
                    0{i + 1}
                  </div>
                  <span className="text-[11px] font-sans-luxury font-bold text-[#C9A24B] uppercase tracking-wider block mb-1">
                    {isBn ? tl.periodBn : tl.periodEn}
                  </span>
                  <h4 className="font-serif-luxury text-lg text-[#2b2927] font-bold mb-2">
                    {isBn ? tl.titleBn : tl.titleEn}
                  </h4>
                  <p className="text-xs text-[#595550] font-sans-luxury font-medium leading-relaxed">
                    {isBn ? tl.descEn : tl.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Consultation Banner */}
        <section className="py-16 sm:py-20 bg-[#071426] text-white border-t border-[#C9A24B]/30 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold mb-4">
              {isBn ? "আপনার অনুষ্ঠান নিয়ে সরাসরি কথা বলতে চান?" : "Ready to Experience Seamless Event Execution?"}
            </h3>
            <p className="text-sm sm:text-base text-[#d8d3cb] font-sans-luxury font-medium max-w-xl mx-auto mb-8">
              {isBn
                ? "আমাদের রাজশাহী স্টুডিওতে এক কাপ কফির টেবিলে আপনার ইভেন্টের প্রতিটি ধাপ সাজিয়ে নিন।"
                : "Schedule your complimentary discovery session with Zeyo’s master event architects in Rajshahi."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-[#C9A24B] hover:bg-[#DFBD6A] text-[#071426] text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all duration-300 shadow-xl"
              >
                {isBn ? "কনসালটেশন বুক করুন" : "Book a Consultation"}
              </Link>
              <a
                href={`https://wa.me/${companyInfo.phoneRaw}?text=${encodeURIComponent("Hi Zeyo, I would like to schedule a consultation for my upcoming event.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isBn ? "হোয়াটসঅ্যাপ বার্তা" : "WhatsApp Us"}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Floating Elements */}
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}
