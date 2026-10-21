"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileCtaBar from "@/components/layout/MobileCtaBar";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  MessageCircle,
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Heart,
  Palette,
  ShieldCheck,
  Send
} from "lucide-react";

interface JobRole {
  id: string;
  titleEn: string;
  titleBn: string;
  departmentEn: string;
  departmentBn: string;
  typeEn: string;
  typeBn: string;
  locationEn: string;
  locationBn: string;
  experienceEn: string;
  experienceBn: string;
  featured: boolean;
  summaryEn: string;
  summaryBn: string;
  responsibilitiesEn: string[];
  responsibilitiesBn: string[];
  requirementsEn: string[];
  requirementsBn: string[];
}

const jobOpenings: JobRole[] = [
  {
    id: "event-coordinator",
    titleEn: "Event Coordinator & Production Lead",
    titleBn: "ইভেন্ট কো-অর্ডিনেটর ও প্রোডাকশন লিড",
    departmentEn: "Operations & On-Ground",
    departmentBn: "অপারেশনস ও অন-গ্রাউন্ড",
    typeEn: "Full-Time",
    typeBn: "ফুল-টাইম",
    locationEn: "Alokar Mor, Rajshahi",
    locationBn: "আলোকোর মোড়, রাজশাহী",
    experienceEn: "0–2 Years / Freshers Welcome",
    experienceBn: "০–২ বছর / ফ্রেশার গ্রহণযোগ্য",
    featured: true,
    summaryEn:
      "Lead on-ground event execution, coordinate artisan vendors, supervise luxury stage assemblies, and deliver flawless celebration timelines for premier weddings and corporate galas in Rajshahi.",
    summaryBn:
      "রাজশাহীতে লাক্সারি ওয়েডিং, হলুদের স্টেজ ও করপোরেট ইভেন্টের অন-গ্রাউন্ড বাস্তবায়ন, ভেন্ডর কো-অর্ডিনেশন এবং ভেন্যু সুপারভিশনে দায়িত্ব পালন করুন।",
    responsibilitiesEn: [
      "Supervise venue setup, lighting arrangements, and floral installation as per blueprint",
      "Coordinate with clients, artists, sound engineers, and banquet management during live events",
      "Manage logistics, inventory flow, and emergency troubleshooting with composure",
      "Ensure Sarah Haywood luxury cleanliness and aesthetic perfection on all stage deliverables"
    ],
    responsibilitiesBn: [
      "ডিজাইন প্ল্যান অনুযায়ী ভেন্যু সেটআপ, লাইটিং ও ফ্লোরাল ডেকোরেশন তদারকি করা",
      "লাইভ ইভেন্টে ক্লায়েন্ট, সাউন্ড টিম ও ব্যাঙ্কোয়েট ম্যানেজমেন্টের সাথে সার্বক্ষণিক সমন্বয় রাখা",
      "লজিস্টিকস ও ইনভেন্টরি হ্যান্ডলিং নিশ্চিত করা",
      "ZEYO-এর আভিজাত্য ও নান্দনিক মানদণ্ড বজায় রেখে নিখুঁত আউটপুট নিশ্চিত করা"
    ],
    requirementsEn: [
      "Graduation / Diploma or running student with strong communication & leadership skills",
      "High attention to visual aesthetics, punctuality, and calm problem-solving under pressure",
      "Fluent in Bengali with basic conversational English; energetic and passionate about events",
      "Resident of Rajshahi city or able to relocate easily"
    ],
    requirementsBn: [
      "স্নাতক/ডিপ্লোমা অথবা অধ্যয়নরত শিক্ষার্থী; চমৎকার যোগাযোগ ও নেতৃত্বদানের ক্ষমতা",
      "সময়ানুবর্তিতা, নান্দনিক রুচি এবং প্রেসারে মাথা ঠান্ডা রেখে কাজ করার মানসিকতা",
      "বাংলা ও প্রাথমিক ইংরেজি যোগাযোগে পারদর্শী; ইভেন্ট ম্যানেজমেন্টে আন্তরিক আগ্রহ",
      "রাজশাহী শহরে বসবাসকারী বা সহজে যাতায়াতযোগ্য"
    ]
  },
  {
    id: "stage-floral-stylist",
    titleEn: "Floral & Stage Architecture Stylist",
    titleBn: "ফ্লোরাল ও স্টেজ আর্কিটেকচার স্টাইলিস্ট",
    departmentEn: "Creative Atelier",
    departmentBn: "ক্রিয়েটিভ অ্যাথলিয়ের",
    typeEn: "Full-Time / Contract",
    typeBn: "ফুল-টাইম / চুক্তিভিত্তিক",
    locationEn: "Rajshahi Atelier",
    locationBn: "রাজশাহী অ্যাথলিয়ের",
    experienceEn: "1+ Year Experience / Portfolio",
    experienceBn: "১+ বছরের অভিজ্ঞতা / পোর্টফোলিও",
    featured: false,
    summaryEn:
      "Transform structural stage concepts into breathtaking floral masterworks, crafting romantic wedding walkways, suspended chandeliers, and photo backdrops.",
    summaryBn:
      "রয়্যাল ওয়েডিং, কাটিং-এজ হলুদের স্টেজ এবং থিম্যাটিক ব্যাকড্রপে তাজা ও সিল্ক ফুলের অসাধারণ আর্ট ও কালার প্যালেট তৈরি করুন।",
    responsibilitiesEn: [
      "Design and install fresh & luxury artificial floral installations, arches, and runner tables",
      "Curate color palettes adhering to modern editorial wedding themes",
      "Oversee delicate handling of imported flowers, drapery, and crystal chandeliers"
    ],
    responsibilitiesBn: [
      "তাজা ও আর্টিফিশিয়াল ফুলের তৈরি এক্সক্লুসিভ স্টেজ আর্চ ও রানার টেবিল সেটআপ করা",
      "মডার্ন ট্রেন্ড ও ওয়েডিং প্যালেটের সাথে সামঞ্জস্য রেখে কালার সিলেকশন করা",
      "ক্রিস্টাল শ্যান্ডেলিয়ার ও ড্র্যাপারি ফিনিশিং নিখুঁত রাখা"
    ],
    requirementsEn: [
      "Prior floristry, interior decor, or visual arts experience with creative eye",
      "Strong aesthetic sensibility and passion for luxury finishes"
    ],
    requirementsBn: [
      "ফ্লোরাল ডেকোরেশন, ইন্টেরিয়র বা ভিজ্যুয়াল আর্টসে বাস্তব কাজের অভিজ্ঞতা ও রুচিবোধ",
      "ডিজাইনে সূক্ষ্মতা ও আধুনিক ট্রেন্ড বোঝার ক্ষমতা"
    ]
  },
  {
    id: "client-relations-stylist",
    titleEn: "Client Relations & Wedding Stylist",
    titleBn: "ক্লায়েন্ট রিলেশনস ও ওয়েডিং স্টাইলিস্ট",
    departmentEn: "Client Experience",
    departmentBn: "ক্লায়েন্ট এক্সপেরিয়েন্স",
    typeEn: "Full-Time",
    typeBn: "ফুল-টাইম",
    locationEn: "Alokar Mor Office, Rajshahi",
    locationBn: "আলোকোর মোড় অফিস, রাজশাহী",
    experienceEn: "0–1 Year Experience",
    experienceBn: "০–১ বছরের অভিজ্ঞতা",
    featured: false,
    summaryEn:
      "Consult with couples and families, interpret their dream celebration vision into customizable packages, and ensure a warm, world-class hospitality experience.",
    summaryBn:
      "বর-কনে ও পরিবারের সাথে কনসাল্টেশন মিটিং পরিচালনা, তাদের স্বপ্নের ইভেন্ট পরিকল্পনা বোঝা এবং কাস্টম প্যাকেজ তৈরি করে সর্বোচ্চ সেবা প্রদান করা।",
    responsibilitiesEn: [
      "Host consultation sessions in-person at our office and via digital channels",
      "Assist clients in package customization, theme selections, and budget planning",
      "Maintain active communication and seamless follow-ups until event day"
    ],
    responsibilitiesBn: [
      "অফিসে কিংবা ফোনে ক্লায়েন্টদের সাথে আন্তরিক কনসাল্টেশন সেশন পরিচালনা করা",
      "প্যাকেজ কাস্টমাইজেশন ও থিম সিলেকশনে ক্লায়েন্টকে প্রিমিয়াম গাইডেন্স দেওয়া",
      "ইভেন্ট সম্পন্ন হওয়া পর্যন্ত ক্লায়েন্টের সাথে নিয়মিত যোগাযোগ রাখা"
    ],
    requirementsEn: [
      "Warm hospitality mindset, polished verbal communication, and empathy",
      "Organized, computer literate (social media, basic spreadsheet, WhatsApp Business)"
    ],
    requirementsBn: [
      "ভদ্র, মার্জিত উপস্থাপনা এবং চমৎকার কথা বলার দক্ষতা",
      "সোশ্যাল মিডিয়া ও প্রাথমিক কম্পিউটার/হোয়াটসঅ্যাপ পরিচালনায় সক্ষম"
    ]
  }
];

export default function CareersPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const [expandedRole, setExpandedRole] = useState<string>("event-coordinator");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [selectedRoleTitle, setSelectedRoleTitle] = useState("Event Coordinator & Production Lead");
  const [applicantNote, setApplicantNote] = useState("");

  // Scroll to top on fresh mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleQuickApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    const msg = `Hello Zeyo Atelier! My name is ${applicantName}. I am applying for the role: ${selectedRoleTitle}. Contact: ${applicantPhone}. Note: ${applicantNote || "I am enthusiastic to join your team in Rajshahi."}`;
    const url = `https://wa.me/8801743543346?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setApplicationSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6F0] selection:bg-[#C9A24B] selection:text-[#071426] flex flex-col justify-between">
      {/* Sticky Luxury Header */}
      <Header />

      <main className="pt-28 sm:pt-36 pb-20 relative z-10 flex-1">
        {/* Editorial Top Hero Banner with Luxury Chair Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 text-center lg:text-left">

              <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#1b4332] font-bold tracking-tight leading-[1.1] mb-6">
                {locale === "bn" ? (
                  <>
                    আমাদের রাজকীয় টিমে যোগ দিন, <br />
                    <span className="italic font-normal text-[#C9A24B]">গড়ে তুলুন অবিস্মরণীয় মুহূর্ত</span>
                  </>
                ) : (
                  <>
                    Join The Atelier of Celebration, <br />
                    <span className="italic font-normal text-[#C9A24B]">Build Your Creative Legacy</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#2b2927] font-sans-luxury font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                {locale === "bn"
                  ? "জেয়ো ইভেন্ট ম্যানেজমেন্ট রাজশাহীর প্রিমিয়াম ওয়েডিং ও স্টেজ ডেকোরেশন প্রতিষ্ঠান। আমরা খুঁজছি এমন উদ্যমী প্রতিভাবানদের, যারা প্রতিটি সেলিব্রেশনকে আর্ট ও আভিজাত্যের নিখুঁত রূপ দিতে আগ্রহী।"
                  : "At Zeyo, we engineer bespoke stage architecture, imported florals, and breathtaking luxury events in Rajshahi. If you have passion, aesthetic precision, and drive for excellence, your journey begins here."}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#openings"
                  className="px-6 py-3 rounded-full bg-[#1b4332] hover:bg-[#133024] text-white font-sans-luxury font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  {locale === "bn" ? "চলমান পদসমূহ দেখুন ↓" : "View Open Positions ↓"}
                </a>
                <a
                  href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                    "Hello Zeyo Atelier! I would like to inquire about current career opportunities."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF6F0] text-[#1b4332] border border-[#C9A24B] font-sans-luxury font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{locale === "bn" ? "সরাসরি যোগাযোগ করুন" : "WhatsApp HR Direct"}</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-End Editorial Recruitment Poster */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative group w-full max-w-[480px]">
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#C9A24B]/30 via-[#DFBD6A]/20 to-transparent rounded-[32px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Editorial Frame with Gold Outline and Glass Glow */}
                <div className="relative rounded-[28px] overflow-hidden border border-[#C9A24B]/40 shadow-[0_22px_55px_rgba(7,20,38,0.16)] bg-[#F8F5EE]">
                  <img
                    src="/client-media/zeyo-atelier-hiring-poster.jpg"
                    alt="Zeyo Atelier - We Are Hiring - Creative Talent Wanted"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                  {/* Subtle inner glass sheen */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/50 rounded-[28px] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Culture & Atelier Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[24px] bg-white border border-[#2b2927]/10 shadow-[0_10px_30px_rgba(43,41,39,0.05)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl text-[#1b4332] font-bold mb-2">
                {locale === "bn" ? "ক্রিয়েটিভ স্বাধীনতা" : "Creative Freedom"}
              </h3>
              <p className="text-sm text-[#2b2927] font-sans-luxury font-medium leading-relaxed">
                {locale === "bn"
                  ? "নতুনত্ব, আধুনিক কালার প্যালেট ও আনকমন স্টেজ ডিজাইনে আপনার নিজস্ব চিন্তা প্রকাশের পূর্ণ সুযোগ।"
                  : "Bring bold ideas and artistic craftsmanship to live luxury productions without boundaries."}
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-white border border-[#2b2927]/10 shadow-[0_10px_30px_rgba(43,41,39,0.05)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F]/15 text-[#2D6A4F] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl text-[#1b4332] font-bold mb-2">
                {locale === "bn" ? "হ্যান্ডস-অন লিডারশিপ" : "Hands-On Leadership"}
              </h3>
              <p className="text-sm text-[#2b2927] font-sans-luxury font-medium leading-relaxed">
                {locale === "bn"
                  ? "রাজশাহীর শীর্ষ ভেন্যু ও ভিআইপি ইভেন্টগুলোর অন-গ্রাউন্ড পরিচালনা শেখার বাস্তব অভিজ্ঞতা।"
                  : "Work directly on high-profile North Bengal weddings and grand corporate galas."}
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-white border border-[#2b2927]/10 shadow-[0_10px_30px_rgba(43,41,39,0.05)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A24B]/15 text-[#C9A24B] flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl text-[#1b4332] font-bold mb-2">
                {locale === "bn" ? "আন্তরিক কর্মপরিবেশ" : "Warm Atelier Team"}
              </h3>
              <p className="text-sm text-[#2b2927] font-sans-luxury font-medium leading-relaxed">
                {locale === "bn"
                  ? "একটি পরিবারসুলভ, শ্রদ্ধাশীল এবং পারস্পরিক সহযোগিতাপূর্ণ চমৎকার অফিস কালচার।"
                  : "Collaborative, respectful, and energetic teammates passionate about celebrating life."}
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-white border border-[#2b2927]/10 shadow-[0_10px_30px_rgba(43,41,39,0.05)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F]/15 text-[#2D6A4F] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl text-[#1b4332] font-bold mb-2">
                {locale === "bn" ? "আকর্ষণীয় সুযোগ-সুবিধা" : "Competitive Growth"}
              </h3>
              <p className="text-sm text-[#2b2927] font-sans-luxury font-medium leading-relaxed">
                {locale === "bn"
                  ? "নিয়মিত স্যালারি, ইভেন্ট বোনাস, পারফরম্যান্স ইনসেন্টিভ ও দ্রুত ক্যারিয়ার প্রবৃদ্ধি।"
                  : "Competitive salary, event performance bonuses, and fast career progression."}
              </p>
            </div>
          </div>
        </section>

        {/* Current Job Openings Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C9A24B] font-bold font-sans-luxury">
                {locale === "bn" ? "চলমান নিয়োগ বিজ্ঞপ্তি" : "CURRENT OPEN POSITIONS"}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1b4332] font-bold mt-1">
                {locale === "bn" ? "আপনার উপযুক্ত রোলটি বেছে নিন" : "Find Your Role at Zeyo"}
              </h2>
            </div>
            <span className="text-xs text-[#595550] font-sans-luxury">
              {jobOpenings.length} {locale === "bn" ? "টি ওপেন পজিশন চালু রয়েছে" : "Open Positions Available"}
            </span>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => {
              const isExpanded = expandedRole === job.id;

              return (
                <div
                  key={job.id}
                  className={`rounded-[28px] border transition-all duration-300 overflow-hidden ${
                    job.featured
                      ? "bg-white border-[#C9A24B]/50 shadow-[0_15px_40px_rgba(201,162,75,0.12)]"
                      : "bg-white/90 border-[#2b2927]/10 shadow-[0_10px_30px_rgba(43,41,39,0.04)]"
                  }`}
                >
                  {/* Job Card Header */}
                  <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {job.featured && (
                          <span className="px-3.5 py-1 rounded-full text-[11px] font-sans-luxury font-black tracking-widest uppercase bg-[#C9A24B] text-[#071426] shadow-sm">
                            {locale === "bn" ? "অগ্রাধিকার নিয়োগ" : "FEATURED ROLE"}
                          </span>
                        )}
                        <span className="px-3.5 py-1 rounded-full text-xs font-sans-luxury font-bold bg-[#efebe4] text-[#2b2927]">
                          {locale === "bn" ? job.departmentBn : job.departmentEn}
                        </span>
                        <span className="px-3.5 py-1 rounded-full text-xs font-sans-luxury font-bold bg-[#2D6A4F]/15 text-[#1b4332]">
                          {locale === "bn" ? job.typeBn : job.typeEn}
                        </span>
                      </div>

                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1b4332] font-bold">
                        {locale === "bn" ? job.titleBn : job.titleEn}
                      </h3>

                      <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-[#2b2927] font-sans-luxury font-semibold">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#C9A24B]" />
                          {locale === "bn" ? job.locationBn : job.locationEn}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#2D6A4F]" />
                          {locale === "bn" ? job.experienceBn : job.experienceEn}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-[#2b2927] font-sans-luxury font-medium leading-relaxed max-w-3xl pt-1.5">
                        {locale === "bn" ? job.summaryBn : job.summaryEn}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 shrink-0">
                      <a
                        href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                          `Hello Zeyo! I am interested in applying for the ${job.titleEn} position at your Rajshahi office.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans-luxury font-bold text-xs uppercase tracking-widest transition-all shadow-[0_6px_18px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>{locale === "bn" ? "হোয়াটসঅ্যাপে আবেদন" : "Apply on WhatsApp"}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setExpandedRole(isExpanded ? "" : job.id)}
                        className="px-5 py-3 rounded-full border border-[#2b2927]/20 text-[#2b2927] hover:bg-[#2b2927] hover:text-white font-sans-luxury font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                      >
                        <span>{isExpanded ? (locale === "bn" ? "বিবরণ লুকান" : "Hide Details") : (locale === "bn" ? "সম্পূর্ণ বিবরণ" : "View Details")}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Accordion: Responsibilities & Requirements */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-8 pt-5 border-t border-[#2b2927]/10 bg-[#fbfaf8] animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-sm sm:text-base uppercase tracking-wider text-[#1b4332] font-sans-luxury font-black mb-4 flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                            <span>{locale === "bn" ? "মূল দায়িত্বসমূহ (Responsibilities)" : "Key Responsibilities"}</span>
                          </h4>
                          <ul className="space-y-3 text-sm sm:text-[14.5px] text-[#2b2927] font-sans-luxury font-semibold leading-relaxed">
                            {(locale === "bn" ? job.responsibilitiesBn : job.responsibilitiesEn).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#2D6A4F] mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base uppercase tracking-wider text-[#1b4332] font-sans-luxury font-black mb-4 flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                            <span>{locale === "bn" ? "প্রয়োজনীয় যোগ্যতা (Requirements)" : "Qualifications & Skills"}</span>
                          </h4>
                          <ul className="space-y-3 text-sm sm:text-[14.5px] text-[#2b2927] font-sans-luxury font-semibold leading-relaxed">
                            {(locale === "bn" ? job.requirementsBn : job.requirementsEn).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#2D6A4F] mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-[#2b2927]/10 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-sm text-[#2b2927] font-sans-luxury font-medium">
                          {locale === "bn"
                            ? "সিভি ইমেইলেও পাঠাতে পারেন: "
                            : "Or email your CV directly to: "}
                          <a
                            href={`mailto:${companyInfo.email}?subject=Application for ${job.titleEn}`}
                            className="font-bold text-[#1b4332] hover:text-[#C9A24B] underline ml-1"
                          >
                            {companyInfo.email}
                          </a>
                        </div>

                        <a
                          href={`tel:${companyInfo.phoneRaw}`}
                          className="text-sm text-[#1b4332] font-sans-luxury font-bold hover:text-[#C9A24B] hover:underline flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4 text-[#C9A24B]" />
                          <span>{locale === "bn" ? "এইচআর হেল্পলাইন:" : "HR Helpline:"} {companyInfo.phone}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Instant Application Box */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-gradient-to-br from-[#071426] via-[#10233b] to-[#071426] border border-[#C9A24B]/40 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-xl mx-auto">
              <span className="px-3 py-1 rounded-full text-[10px] font-sans-luxury font-bold tracking-widest uppercase bg-[#C9A24B] text-[#071426]">
                {locale === "bn" ? "সহজ ও দ্রুত আবেদন" : "FAST-TRACK APPLICATION"}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold mt-4 mb-3 text-white">
                {locale === "bn" ? "সরাসরি যোগাযোগ করুন" : "Drop Your Contact & We Will Call You"}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 font-sans-luxury mb-8">
                {locale === "bn"
                  ? "আপনার নাম ও ফোন নম্বর দিন। আমাদের এইচআর টিম আপনার সাথে যোগাযোগ করে ইন্টারভিউ ও অডিশনের তারিখ নিশ্চিত করবে।"
                  : "Submit your details below or connect immediately via WhatsApp for a fast-track interview."}
              </p>

              {applicationSubmitted ? (
                <div className="p-6 rounded-2xl bg-white/10 border border-[#C9A24B] text-center animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#52B788] mx-auto mb-3" />
                  <h4 className="font-serif-luxury text-xl font-bold text-[#F3DE9A]">
                    {locale === "bn" ? "আবেদন গ্রহণ করা হয়েছে!" : "Application Initiated!"}
                  </h4>
                  <p className="text-xs text-white/80 mt-1">
                    {locale === "bn"
                      ? "আমরা অতি দ্রুত আপনার সাথে যোগাযোগ করব। প্রয়োজনে সরাসরি হোয়াটসঅ্যাপে মেসেজ পাঠান।"
                      : "We will review your details and get in touch with you shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickApply} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#F3DE9A] font-bold font-sans-luxury mb-1">
                        {locale === "bn" ? "আপনার পুরো নাম *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder={locale === "bn" ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C9A24B] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#F3DE9A] font-bold font-sans-luxury mb-1">
                        {locale === "bn" ? "মোবাইল নম্বর *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C9A24B] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#F3DE9A] font-bold font-sans-luxury mb-1">
                      {locale === "bn" ? "কোন পদে আগ্রহী?" : "Position Applying For"}
                    </label>
                    <select
                      value={selectedRoleTitle}
                      onChange={(e) => setSelectedRoleTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f243d] border border-white/20 text-white text-xs focus:outline-none focus:border-[#C9A24B] transition-colors"
                    >
                      {jobOpenings.map((job) => (
                        <option key={job.id} value={job.titleEn}>
                          {locale === "bn" ? job.titleBn : job.titleEn} ({job.typeEn})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#F3DE9A] font-bold font-sans-luxury mb-1">
                      {locale === "bn" ? "সংক্ষিপ্ত বিবরণ বা পোর্টফোলিও লিংক (ঐচ্ছিক)" : "Brief Note / Experience (Optional)"}
                    </label>
                    <textarea
                      rows={2}
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      placeholder={locale === "bn" ? "আপনার পূর্বের কোনো অভিজ্ঞতা থাকলে লিখুন..." : "Tell us about your background or past experience..."}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#C9A24B] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] font-sans-luxury font-black text-xs uppercase tracking-[0.2em] shadow-[0_6px_22px_rgba(201,162,75,0.45)] hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{locale === "bn" ? "হোয়াটসঅ্যাপে সরাসরি সিভি পাঠান" : "SEND RESUME ON WHATSAPP"}</span>
                    <Send className="w-4 h-4 text-[#071426]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA */}
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}
