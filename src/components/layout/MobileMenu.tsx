"use client";

import React, { useState } from "react";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import { X, PhoneCall, MapPin, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { smoothScrollTo } from "@/lib/scroll";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { t, setPortfolioFilter, setPackageFilter } = useLanguage();
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [packagesExpanded, setPackagesExpanded] = useState(false);

  if (!isOpen) return null;

  const navigateToSection = (sectionId: string) => {
    onClose();
    if (sectionId === "inquiry") {
      if (isHome) {
        setTimeout(() => {
          smoothScrollTo("inquiry", 80);
        }, 150);
      } else {
        router.push("/contact");
      }
      return;
    }

    if (isHome) {
      setTimeout(() => {
        smoothScrollTo(sectionId, 80);
      }, 150);
    } else {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("zeyo_scroll_target", sectionId);
        window.location.href = `/#${sectionId}`;
      }
    }
  };

  const handleNavHome = (e?: React.MouseEvent) => {
    onClose();
    if (isHome) {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const serviceSubcategories = [
    { label: "Weddings & Holud", filter: "wedding" },
    { label: "Birthdays & Themes", filter: "birthday" },
    { label: "Stage & Lighting", filter: "stage" },
    { label: "Murals & Studio", filter: "murals" }
  ];

  const packageSubcategories = [
    { label: "All Packages", tier: "all" },
    { label: "Intimate (50–100 Guests)", tier: "intimate" },
    { label: "Celebration (150–300 Guests)", tier: "celebration" },
    { label: "Grand & Royal (300–800+ Guests)", tier: "grand" }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-sm bg-[#fbfaf8] border-l border-[#2b2927]/15 h-full overflow-y-auto flex flex-col justify-between p-6 z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#2b2927]/15">
            <Link
              href="/"
              onClick={handleNavHome}
              className="inline-flex items-center gap-2.5 p-1.5 sm:p-2 rounded-xl bg-[#071426] border border-[#C9A24B]/30 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border border-[#C9A24B] overflow-hidden flex items-center justify-center bg-[#071426] shrink-0">
                <img
                  src="/client-media/zeyo-logo-emblem.jpg"
                  alt="Zeyo Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center pr-2">
                <img
                  src="/client-media/zeyo-wordmark-clean.png"
                  alt="zeyo"
                  className="h-5 w-auto object-contain"
                />
                <p className="text-[8px] text-[#C9A24B] tracking-widest uppercase font-sans-luxury font-bold mt-0.5">
                  {companyInfo.tagline}
                </p>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-2 text-[#2b2927] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Contact Bar (Phone & WhatsApp) */}
          <div className="my-4 grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${companyInfo.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#071426] text-[#F3DE9A] text-xs font-bold uppercase tracking-wider"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
            <a
              href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                "Hello Zeyo, I would like to inquire about event management & decoration in Rajshahi."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.121-.524-1.631-.682-2.703-2.348-2.784-2.457-.081-.109-.661-.879-.661-1.675 0-.796.417-1.189.565-1.353.148-.163.324-.204.432-.204.108 0 .216.002.311.007.1.005.234-.038.366.279.136.327.469 1.144.509 1.227.04.082.067.177.013.285-.054.108-.081.176-.162.271-.081.095-.17.212-.243.285-.081.082-.166.172-.072.335.094.163.42 1.002.903 1.431.621.552 1.144.723 1.307.804.163.081.258.072.355-.041.097-.113.414-.482.525-.647.111-.165.221-.137.371-.082.15.055.952.449 1.116.531.163.082.272.123.313.191.041.069.041.398-.103.803z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Navigation Links with Submenus */}
          <nav className="flex flex-col space-y-1 py-2 text-xs tracking-[0.15em] uppercase text-[#2b2927] font-sans-luxury font-bold">
            {/* Home */}
            <Link
              href="/"
              onClick={handleNavHome}
              className="py-2.5 border-b border-[#2b2927]/10 hover:text-[#C9A24B] transition-colors flex items-center justify-between"
            >
              <span>{t.nav.home}</span>
              <span className="text-xs text-[#C9A24B]">→</span>
            </Link>

            {/* Services with direct link + expand toggle */}
            <div className="border-b border-[#2b2927]/10 py-2">
              <div className="w-full flex items-center justify-between">
                <Link
                  href="/services"
                  onClick={onClose}
                  className="flex-1 py-1 hover:text-[#C9A24B] transition-colors font-bold"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  className="p-1 hover:text-[#C9A24B] transition-colors"
                  aria-label="Toggle Services submenu"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-[#C9A24B] transition-transform ${
                      servicesExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {servicesExpanded && (
                <div className="pl-3 mt-2 space-y-1.5 border-l-2 border-[#C9A24B]/40">
                  {serviceSubcategories.map((sub) => (
                    <Link
                      key={sub.filter}
                      href={`/services?category=${sub.filter}`}
                      onClick={onClose}
                      className="w-full text-left py-1 text-[11px] text-[#2b2927] hover:text-[#967425] font-bold flex items-center justify-between"
                    >
                      <span>{sub.label}</span>
                      <span className="text-[10px] text-[#C9A24B] font-bold">explore →</span>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={onClose}
                    className="block pt-1 text-[11px] text-[#967425] hover:text-[#071426] font-bold font-serif-luxury italic"
                  >
                    View All Services & Deliverables →
                  </Link>
                </div>
              )}
            </div>

            {/* Packages with direct link + expand toggle */}
            <div className="border-b border-[#2b2927]/10 py-2">
              <div className="w-full flex items-center justify-between">
                <Link
                  href="/packages"
                  onClick={onClose}
                  className="flex-1 py-1 hover:text-[#C9A24B] transition-colors font-bold"
                >
                  Packages
                </Link>
                <button
                  type="button"
                  onClick={() => setPackagesExpanded(!packagesExpanded)}
                  className="p-1 hover:text-[#C9A24B] transition-colors"
                  aria-label="Toggle Packages submenu"
                >
                  <ChevronDown
                    className={`w-4 h-4 text-[#C9A24B] transition-transform ${
                      packagesExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {packagesExpanded && (
                <div className="pl-3 mt-2 space-y-1.5 border-l-2 border-[#C9A24B]/40">
                  {packageSubcategories.map((pkg) => (
                    <Link
                      key={pkg.tier}
                      href={pkg.tier === "all" ? "/packages" : `/packages?tier=${pkg.tier}`}
                      onClick={onClose}
                      className="w-full text-left py-1 text-[11px] text-[#2b2927] hover:text-[#967425] font-bold flex items-center justify-between"
                    >
                      <span>{pkg.label}</span>
                      <span className="text-[10px] text-[#C9A24B] font-bold">pricing →</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Portfolio Dedicated Page Link */}
            <Link
              href="/portfolio"
              onClick={onClose}
              className="py-2.5 border-b border-[#2b2927]/10 hover:text-[#C9A24B] transition-colors flex items-center justify-between"
            >
              <span>{t.nav.portfolio}</span>
              <span className="text-xs text-[#C9A24B]">→</span>
            </Link>

            {/* Process Dedicated Page Link */}
            <Link
              href="/process"
              onClick={onClose}
              className="py-2.5 border-b border-[#2b2927]/10 hover:text-[#C9A24B] transition-colors flex items-center justify-between"
            >
              <span>{t.nav.process}</span>
              <span className="text-xs text-[#C9A24B]">→</span>
            </Link>

            {/* Careers Page Link */}
            <Link
              href="/careers"
              onClick={onClose}
              className="py-2.5 border-b border-[#2b2927]/10 hover:text-[#C9A24B] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>{t.nav.careers}</span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-[#C9A24B] text-[#071426] font-bold">HIRING</span>
              </div>
              <span className="text-xs text-[#C9A24B]">→</span>
            </Link>

            {/* Contact Page Link */}
            <Link
              href="/contact"
              onClick={onClose}
              className="py-2.5 border-b border-[#2b2927]/10 hover:text-[#C9A24B] transition-colors flex items-center justify-between"
            >
              <span>{t.nav.contact}</span>
              <span className="text-xs text-[#C9A24B]">→</span>
            </Link>
          </nav>

          {/* Centered Single-Line Luxury Pill CTA Button */}
          <div className="pt-4">
            <Link
              href="/contact"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  navigateToSection("inquiry");
                } else {
                  onClose();
                }
              }}
              className="w-full py-3.5 px-6 rounded-full flex items-center justify-center gap-2 text-center bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] font-sans-luxury font-bold text-xs uppercase tracking-[0.18em] transition-all whitespace-nowrap leading-none"
            >
              <span>PLAN YOUR EVENT</span>
              <ArrowRight className="w-4 h-4 text-[#071426]" />
            </Link>
          </div>
        </div>

        {/* Footer Contact Details in Drawer */}
        <div className="pt-5 border-t border-[#2b2927]/15 text-xs text-[#595550] space-y-2.5 font-sans-luxury font-bold">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed text-[#2b2927]">
              {companyInfo.shortAddress}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-4 h-4 text-[#C9A24B] shrink-0" />
            <a
              href={`tel:${companyInfo.phoneRaw}`}
              className="hover:text-[#C9A24B] transition-colors tracking-wider text-[#2b2927]"
            >
              {companyInfo.phone}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#C9A24B] shrink-0" />
            <a
              href={`mailto:${companyInfo.email}`}
              className="hover:text-[#C9A24B] transition-colors text-[#2b2927]"
            >
              {companyInfo.email}
            </a>
          </div>

          <div className="flex items-center gap-4 pt-1">
            <a
              href={companyInfo.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#2b2927]/20 bg-white flex items-center justify-center text-[#2b2927] hover:bg-[#2b2927] hover:text-white transition-colors"
              title="Facebook"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={companyInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#2b2927]/20 bg-white flex items-center justify-center text-[#2b2927] hover:bg-[#2b2927] hover:text-white transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
