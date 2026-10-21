"use client";

import React from "react";
import { companyInfo } from "@/data/company";
import { eventPackages } from "@/data/packages";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, Briefcase, ArrowRight } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isCareersPage = pathname === "/careers";
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-[#dedbd4] text-[#2b2927] border-t border-[#2b2927]/15 pt-16 pb-28 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2b2927]/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              onClick={(e) => {
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full border-2 border-[#C9A24B] overflow-hidden flex items-center justify-center bg-white shadow-md group-hover:scale-105 transition-transform">
                <img
                  src="/client-media/zeyo-logo-emblem.jpg"
                  alt="Zeyo Logo Emblem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-3xl font-bold tracking-[0.2em] uppercase text-[#2b2927] group-hover:text-[#967425] transition-colors">
                  Zeyo
                </span>
                <p className="text-[10px] text-[#C9A24B] tracking-[0.25em] uppercase font-sans-luxury font-bold -mt-1">
                  {locale === "bn" ? companyInfo.taglineBn : companyInfo.tagline}
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#595550] font-sans-luxury font-bold leading-relaxed max-w-sm">
              {t.footer.about}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={companyInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#2b2927]/20 bg-white/90 shadow-sm flex items-center justify-center text-[#2b2927] hover:bg-[#2b2927] hover:text-white transition-all duration-300"
                title="Follow Zeyo on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={companyInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#2b2927]/20 bg-white/90 shadow-sm flex items-center justify-center text-[#2b2927] hover:bg-[#2b2927] hover:text-white transition-all duration-300"
                title="Follow Zeyo on Instagram (@zeyo_099)"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#2b2927] font-sans-luxury font-bold">
              {t.footer.quickLinksHeading}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#595550] uppercase tracking-wider font-sans-luxury font-bold">
              <li>
                <Link href="/services" className="hover:text-[#C9A24B] transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#C9A24B] transition-colors">
                  {t.nav.packages}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#C9A24B] transition-colors">
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-[#C9A24B] transition-colors">
                  {t.nav.process}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#C9A24B] transition-colors flex items-center gap-1.5 font-black text-[#1b4332]">
                  <span>{t.nav.careers}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[#C9A24B] text-[#071426] font-bold">HIRING</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C9A24B] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Packages List Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#2b2927] font-sans-luxury font-bold">
              {t.footer.packagesHeading}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#595550] uppercase tracking-wider font-sans-luxury font-bold">
              {eventPackages.map((pkg) => (
                <li key={pkg.id}>
                  <Link
                    href={`/packages?tier=${pkg.tier}&package=${pkg.id}`}
                    className="hover:text-[#C9A24B] transition-colors block py-0.5"
                  >
                    <span>{pkg.name} Package</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#2b2927] font-sans-luxury font-bold">
              {t.footer.contactHeading}
            </h4>

            <div className="space-y-3.5 text-xs text-[#595550] font-sans-luxury font-bold">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {locale === "bn" ? companyInfo.addressBn : companyInfo.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a
                  href={`tel:${companyInfo.phoneRaw}`}
                  className="hover:text-[#C9A24B] transition-colors font-bold tracking-wider"
                >
                  {companyInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-[#C9A24B] transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span>
                  {locale === "bn" ? companyInfo.officeHoursBn : companyInfo.officeHours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Careers & Hiring Callout Banner (User Requested - hidden on /careers) */}
        {!isCareersPage && (
          <div className="my-10 p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-[#071426] via-[#0d223f] to-[#071426] border border-[#C9A24B]/35 shadow-[0_15px_35px_rgba(7,20,38,0.25)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A24B]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 sm:gap-5 text-center md:text-left relative z-10">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#F3DE9A]/20 to-[#C9A24B]/10 border border-[#C9A24B]/50 flex items-center justify-center text-[#F3DE9A] shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-sans-luxury font-black tracking-widest uppercase bg-[#C9A24B] text-[#071426] shadow-sm">
                    {locale === "bn" ? "আমরা নিয়োগ দিচ্ছি" : "WE'RE HIRING TALENTS"}
                  </span>
                  <span className="text-[11px] text-[#F3DE9A] tracking-wider uppercase font-mono font-bold">
                    Zeyo Rajshahi Atelier
                  </span>
                </div>
                <h4 className="font-serif-luxury text-xl sm:text-2xl text-white font-bold tracking-wide">
                  {locale === "bn"
                    ? "আমাদের ক্রিয়েটিভ টিমে যোগ দিন · ক্যারিয়ার অপরচুনিটি"
                    : "Join Our Atelier Team · Build The Extraordinary"}
                </h4>
                <p className="text-xs sm:text-sm text-white/75 font-sans-luxury mt-1 max-w-xl">
                  {locale === "bn"
                    ? "ইভেন্ট কো-অর্ডিনেটর, স্টেজ আর্কিটেক্ট ও ক্রিয়েটিভ প্রোডাকশন রোলে যোগ দিন। আপনার মেধা ও প্যাশনকে দিন একটি রাজকীয় প্ল্যাটফর্ম।"
                    : "Passionate about luxury weddings and high-end event staging? Explore full-time roles, benefits and apply directly to our Rajshahi team."}
                </p>
              </div>
            </div>

            <Link
              href="/careers"
              className="shrink-0 px-7 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] font-sans-luxury font-black text-xs uppercase tracking-[0.2em] shadow-[0_6px_20px_rgba(201,162,75,0.45)] hover:scale-105 hover:shadow-[0_8px_25px_rgba(201,162,75,0.7)] transition-all flex items-center gap-2.5 relative z-10 cursor-pointer"
            >
              <span>{locale === "bn" ? "ওপেন রোলস ও আবেদন করুন" : "EXPLORE CAREERS"}</span>
              <ArrowRight className="w-4 h-4 text-[#071426]" />
            </Link>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#595550] font-sans-luxury font-bold">
          <p>© 2026 {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span>Rajshahi · Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
