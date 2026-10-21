"use client";

import React, { useState, useEffect, useRef } from "react";
import { companyInfo } from "@/data/company";
import { useLanguage } from "@/context/LanguageContext";
import {
  PhoneCall,
  Menu,
  ChevronDown,
  ArrowRight,
  Crown,
  PartyPopper,
  Lightbulb,
  Palette,
  Layers,
  Heart,
  Flame,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import { smoothScrollTo } from "@/lib/scroll";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPackages = pathname === "/packages";
  const isCareers = pathname === "/careers";
  const isContact = pathname === "/contact";
  const { t, setPortfolioFilter, setPackageFilter } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(
    isHome ? "home" : isPackages ? "packages" : isContact ? "contact" : isCareers ? "careers" : ""
  );

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const packagesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getNavPillClasses = (id: string, isOpen: boolean = false) => {
    const isHovered = hoveredNav === id;
    const isHoveringOther = hoveredNav !== null && !isHovered;
    const isActive = hoveredNav === null && activeSection === id;

    let visual = "transition-all duration-300 ease-out origin-center cursor-pointer";

    if (isOpen || isHovered || isActive) {
      visual +=
        " bg-white/[0.24] border border-[#C9A24B] text-[#F3DE9A] shadow-[0_0_18px_rgba(201,162,75,0.65),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-105 z-20 font-bold";
    } else if (isHoveringOther) {
      visual +=
        " bg-white/[0.08] border border-white/15 text-white/80 scale-95 opacity-85 z-0 hover:text-white hover:bg-white/[0.15]";
    } else {
      // Inactive / resting state: crisp, bright white text with high readability on dark navy
      visual +=
        " bg-white/[0.12] border border-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_8px_rgba(0,0,0,0.2)] scale-100 opacity-100 z-10 hover:text-white hover:bg-white/[0.18] hover:border-[#C9A24B]/40";
    }

    return `px-3.5 py-1.5 xl:px-4 xl:py-2 rounded-full font-sans-luxury text-[11px] xl:text-[11.5px] 2xl:text-[12px] font-bold tracking-wider backdrop-blur-md flex items-center gap-1.5 ${visual}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Dynamic Scroll Spy: highlights the active section button
      if (!isHome) {
        if (pathname === "/packages") {
          setActiveSection("packages");
        } else if (pathname === "/contact") {
          setActiveSection("contact");
        } else if (pathname === "/careers") {
          setActiveSection("careers");
        } else if (pathname === "/services") {
          setActiveSection("services");
        } else if (pathname === "/portfolio") {
          setActiveSection("portfolio");
        } else if (pathname === "/process") {
          setActiveSection("process");
        } else {
          setActiveSection("");
        }
        return;
      }

      const scrollPos = window.scrollY + 140;
      const sections = [
        { id: "inquiry", nav: "contact" },
        { id: "process", nav: "process" },
        { id: "portfolio", nav: "portfolio" },
        { id: "photo-archives", nav: "services" },
        { id: "services", nav: "services" },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.nav);
            return;
          }
        }
      }

      if (window.scrollY < 350) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, pathname]);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 200);
  };

  const handlePackagesEnter = () => {
    if (packagesTimeoutRef.current) clearTimeout(packagesTimeoutRef.current);
    setPackagesOpen(true);
  };

  const handlePackagesLeave = () => {
    packagesTimeoutRef.current = setTimeout(() => {
      setPackagesOpen(false);
    }, 200);
  };

  const handleNavHome = (e?: React.MouseEvent) => {
    setActiveSection("home");
    if (isHome) {
      if (e) e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavServices = () => {
    setActiveSection("services");
    setServicesOpen(false);
  };

  const handleNavPortfolio = () => {
    setActiveSection("portfolio");
  };

  const handleNavProcess = () => {
    setActiveSection("process");
  };

  const handleNavPackages = () => {
    setActiveSection("packages");
    setPackagesOpen(false);
  };

  const handleNavContact = () => {
    setActiveSection("contact");
  };

  const handleSelectService = (filter: string) => {
    setPortfolioFilter(filter);
    setServicesOpen(false);
    router.push(`/services?category=${filter}`);
  };

  const handleSelectPackage = (tier: string) => {
    setPackageFilter(tier);
    setPackagesOpen(false);
    if (tier === "all") {
      router.push("/packages");
    } else {
      router.push(`/packages?tier=${tier}`);
    }
  };

  const serviceSubcategories = [
    {
      title: "Weddings & Holud",
      filter: "wedding",
      icon: Crown,
    },
    {
      title: "Birthdays & Themes",
      filter: "birthday",
      icon: PartyPopper,
    },
    {
      title: "Stage & Lighting",
      filter: "stage",
      icon: Lightbulb,
    },
    {
      title: "Murals & Studio",
      filter: "murals",
      icon: Palette,
    },
  ];

  const packageTiers = [
    {
      id: "all",
      title: "All Packages",
      badge: "Overview",
      tier: "all",
      icon: Layers,
    },
    {
      id: "intimate",
      title: "Intimate Package",
      badge: "50–100",
      tier: "intimate",
      icon: Heart,
    },
    {
      id: "celebration",
      title: "Celebration Package",
      badge: "150–300",
      tier: "celebration",
      icon: Flame,
    },
    {
      id: "grand",
      title: "Grand & Royal",
      badge: "300–800+",
      tier: "grand",
      icon: Crown,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHome
            ? "glass-navy py-3 shadow-2xl border-b border-[#C9A24B]/30"
            : "bg-[#071426]/90 backdrop-blur-md py-3.5 sm:py-4 border-b border-[#C9A24B]/20 shadow-xl"
        }`}
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Brand Monogram with Social Icons right beside ZEYO above tagline */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <Link
                href="/"
                onClick={handleNavHome}
                className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C9A24B] overflow-hidden flex items-center justify-center bg-white shadow-[0_0_12px_rgba(201,162,75,0.35)] hover:scale-105 transition-all duration-300 shrink-0 cursor-pointer"
                aria-label="Zeyo Home"
              >
                <img
                  src="/client-media/zeyo-logo-emblem.jpg"
                  alt="Zeyo Logo Emblem"
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex flex-col justify-center">
                {/* Top Row: Zeyo title + Social Icons immediately beside it, sitting directly above 'CELEBRATE.' */}
                <div className="flex items-center">
                  <Link
                    href="/"
                    onClick={handleNavHome}
                    className="font-serif-luxury text-2xl sm:text-[26px] font-bold tracking-[0.18em] uppercase text-white hover:text-[#F3DE9A] transition-colors leading-none cursor-pointer"
                  >
                    Zeyo
                  </Link>

                  {/* Social Icons right beside Zeyo, hovering directly over the space above 'CELEBRATE.' */}
                  <div className="flex items-center gap-1.5 ml-2.5">
                    <a
                      href={companyInfo.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-115 transition-transform duration-200 shrink-0"
                      aria-label="Zeyo Facebook"
                      title="Visit Zeyo on Facebook"
                    >
                      <svg className="w-4.5 h-4.5 drop-shadow-sm" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#1877F2" />
                        <path
                          fill="#FFFFFF"
                          d="M14.5 12.2h-1.8v6.8h-2.8v-6.8H8.5V9.8h1.4V8.2c0-1.2.6-3 3-3l2.2.01v2.3h-1.6c-.3 0-.6.1-.6.7v1.6h2.2l-.2 2.4z"
                        />
                      </svg>
                    </a>
                    <a
                      href={companyInfo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-115 transition-transform duration-200 shrink-0"
                      aria-label="Zeyo Instagram"
                      title="Visit Zeyo on Instagram"
                    >
                      <svg className="w-4.5 h-4.5 drop-shadow-sm" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient id="zeyoInstaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fdf497" />
                            <stop offset="5%" stopColor="#fdf497" />
                            <stop offset="45%" stopColor="#fd5949" />
                            <stop offset="60%" stopColor="#d6249f" />
                            <stop offset="90%" stopColor="#285AEB" />
                          </linearGradient>
                        </defs>
                        <rect width="24" height="24" rx="6" fill="url(#zeyoInstaGrad)" />
                        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                        <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                        <circle cx="15.8" cy="8.2" r="1" fill="#FFFFFF" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Bottom Row: Tagline "DREAM. CREATE. CELEBRATE." */}
                <Link
                  href="/"
                  onClick={handleNavHome}
                  className="text-[9px] tracking-[0.24em] uppercase text-[#C9A24B] font-bold font-sans-luxury mt-1 hover:text-[#F3DE9A] transition-colors leading-none cursor-pointer"
                >
                  {companyInfo.tagline}
                </Link>
              </div>
            </div>

            {/* Desktop Navigation Links with Interactive Mega-Menus */}
            <nav
              className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 text-[11px] xl:text-[11.5px] 2xl:text-[12px] tracking-[0.14em] uppercase text-white/90 font-bold shrink-0"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {/* 0. Home Pill Button */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav("home")}
              >
                <Link
                  href="/"
                  onClick={handleNavHome}
                  className={getNavPillClasses("home")}
                >
                  <span>{t.nav.home}</span>
                </Link>
              </div>

              {/* 1. Services with Dropdown Menu */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav("services");
                  handleServicesEnter();
                }}
                onMouseLeave={() => {
                  handleServicesLeave();
                }}
              >
                <Link
                  href="/services"
                  onClick={handleNavServices}
                  className={getNavPillClasses("services", servicesOpen)}
                >
                  <span>{t.nav.services}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180 text-[#C9A24B]" : "text-white/70"
                    }`}
                  />
                </Link>

                {/* Services Dropdown Panel (Light Theme Transparent Glassified) */}
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2.5 w-[335px] bg-[#FAF6F0]/92 backdrop-blur-3xl border border-white/90 rounded-2xl shadow-[0_24px_50px_rgba(7,20,38,0.22),0_4px_16px_rgba(201,162,75,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-[#2b2927]/12">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] shadow-[0_0_8px_#C9A24B]" />
                        <span className="font-sans-luxury text-[11px] font-black tracking-[0.2em] uppercase text-[#071426]">
                          Services
                        </span>
                      </div>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="font-serif-luxury italic text-[12px] text-[#967425] hover:text-[#071426] transition-colors font-bold"
                      >
                        All Services →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {serviceSubcategories.map((sub) => {
                        const IconComponent = sub.icon;
                        return (
                          <button
                            key={sub.filter}
                            type="button"
                            onClick={() => handleSelectService(sub.filter)}
                            className="w-full group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#2b2927]/10 hover:border-[#C9A24B] shadow-[0_2px_8px_rgba(43,41,39,0.04)] hover:shadow-[0_6px_20px_rgba(201,162,75,0.2)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-[#071426] to-[#162E52] border border-[#C9A24B]/30 flex items-center justify-center text-[#F3DE9A] group-hover/item:from-[#C9A24B] group-hover/item:to-[#DFBD6A] group-hover/item:text-[#071426] group-hover/item:shadow-[0_0_12px_rgba(201,162,75,0.5)] transition-all duration-200 shrink-0">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className="font-serif-luxury text-[16px] font-bold text-[#071426] group-hover/item:text-[#967425] transition-colors truncate">
                                {sub.title}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#967425] group-hover/item:text-[#071426] group-hover/item:translate-x-1 transition-all shrink-0 ml-2" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Packages with Dropdown Menu */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav("packages");
                  handlePackagesEnter();
                }}
                onMouseLeave={() => {
                  handlePackagesLeave();
                }}
              >
                <Link
                  href="/packages"
                  onClick={handleNavPackages}
                  className={getNavPillClasses("packages", packagesOpen)}
                >
                  <span>{t.nav.packages}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      packagesOpen ? "rotate-180 text-[#C9A24B]" : "text-white/80"
                    }`}
                  />
                </Link>

                {/* Packages Dropdown Panel (Light Theme Transparent Glassified with Bright Gold Badges) */}
                {packagesOpen && (
                  <div className="absolute top-full left-0 mt-2.5 w-[355px] bg-[#FAF6F0]/92 backdrop-blur-3xl border border-white/90 rounded-2xl shadow-[0_24px_50px_rgba(7,20,38,0.22),0_4px_16px_rgba(201,162,75,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-[#2b2927]/12">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] shadow-[0_0_8px_#C9A24B]" />
                        <span className="font-sans-luxury text-[11px] font-black tracking-[0.2em] uppercase text-[#071426]">
                          Event Tiers
                        </span>
                      </div>
                      <Link
                        href="/packages"
                        onClick={() => setPackagesOpen(false)}
                        className="font-serif-luxury italic text-[12px] text-[#967425] hover:text-[#071426] transition-colors font-bold cursor-pointer"
                      >
                        Pricing Details →
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {packageTiers.map((pkg) => {
                        const IconComponent = pkg.icon;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => handleSelectPackage(pkg.tier)}
                            className="w-full group/pkg flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/80 hover:bg-white border border-[#2b2927]/10 hover:border-[#C9A24B] shadow-[0_2px_8px_rgba(43,41,39,0.04)] hover:shadow-[0_6px_20px_rgba(201,162,75,0.2)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-[#071426] to-[#162E52] border border-[#C9A24B]/30 flex items-center justify-center text-[#F3DE9A] group-hover/pkg:from-[#C9A24B] group-hover/pkg:to-[#DFBD6A] group-hover/pkg:text-[#071426] group-hover/pkg:shadow-[0_0_12px_rgba(201,162,75,0.5)] transition-all duration-200 shrink-0">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className="font-serif-luxury text-[16px] font-bold text-[#071426] group-hover/pkg:text-[#967425] transition-colors truncate">
                                {pkg.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              {/* Bright, high-contrast, eye-catching golden badge */}
                              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-sans-luxury font-black uppercase tracking-wider bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] text-[#071426] shadow-[0_2px_8px_rgba(201,162,75,0.35)] border border-[#C9A24B]/40 shrink-0">
                                {pkg.badge}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#967425] group-hover/pkg:text-[#071426] group-hover/pkg:translate-x-1 transition-all" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Portfolio */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav("portfolio")}
              >
                <Link
                  href="/portfolio"
                  onClick={handleNavPortfolio}
                  className={getNavPillClasses("portfolio")}
                >
                  <span>{t.nav.portfolio}</span>
                </Link>
              </div>

              {/* 4. Process */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav("process")}
              >
                <Link
                  href="/process"
                  onClick={handleNavProcess}
                  className={getNavPillClasses("process")}
                >
                  <span>{t.nav.process}</span>
                </Link>
              </div>

              {/* 5. Contact */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredNav("contact")}
              >
                <Link
                  href="/contact"
                  onClick={handleNavContact}
                  className={getNavPillClasses("contact")}
                >
                  <span>{t.nav.contact}</span>
                </Link>
              </div>
            </nav>

            {/* Right Controls: Direct Phone Icon, Enlarged Official WhatsApp Logo & Centered Pill CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* 1. Direct Phone Call Icon without circle border */}
              <div className="relative">
                <a
                  href={`tel:${companyInfo.phoneRaw}`}
                  onMouseEnter={() => setShowPhoneTooltip(true)}
                  onMouseLeave={() => setShowPhoneTooltip(false)}
                  className="p-1 text-[#F3DE9A] hover:text-[#C9A24B] flex items-center justify-center transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer"
                  aria-label="Call Zeyo Direct"
                  title={`Call: ${companyInfo.phone}`}
                >
                  <PhoneCall className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform duration-300 hover:rotate-12 drop-shadow-[0_2px_8px_rgba(201,162,75,0.4)]" />
                </a>

                {/* Floating Tooltip displaying number */}
                {showPhoneTooltip && (
                  <div className="absolute top-11 right-0 z-50 bg-[#071426]/95 backdrop-blur-xl border border-[#C9A24B]/40 text-white text-xs px-3.5 py-1.5 shadow-2xl whitespace-nowrap rounded-full font-sans-luxury font-bold flex items-center gap-2 animate-in fade-in duration-200">
                    <span className="text-[#F3DE9A] tracking-wider">{companyInfo.phone}</span>
                  </div>
                )}
              </div>

              {/* 2. Official WhatsApp Authentic Logo */}
              <a
                href={`https://wa.me/8801743543346?text=${encodeURIComponent(
                  "Hello Zeyo, I would like to inquire about event management & decoration in Rajshahi."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer p-0.5"
                aria-label="Chat on WhatsApp"
                title="Chat with Zeyo on WhatsApp"
              >
                <svg className="w-6.5 h-6.5 sm:w-7 sm:h-7 drop-shadow-[0_2px_10px_rgba(37,211,102,0.45)]" viewBox="0 0 32 32">
                  <path fill="#25D366" d="M16 2C8.268 2 2 8.268 2 16c0 2.736.785 5.289 2.144 7.451L2.3 30.15l6.896-1.808C11.233 29.49 13.551 30 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"/>
                  <path fill="#FFFFFF" d="M22.586 19.387c-.36-.18-2.133-1.053-2.464-1.173-.331-.12-.572-.18-.813.18-.24.36-.933 1.173-1.144 1.414-.211.24-.421.27-.781.09-.36-.18-1.523-.561-2.901-1.791-1.073-.957-1.797-2.14-2.008-2.5-.211-.36-.022-.555.158-.734.162-.162.36-.421.54-.631.18-.211.24-.36.36-.601.12-.24.06-.451-.03-.631-.09-.18-.813-1.958-1.114-2.682-.293-.706-.59-.61-.813-.621-.211-.01-.451-.012-.692-.012-.24 0-.631.09-.962.451-.331.36-1.263 1.233-1.263 3.01s1.293 3.493 1.473 3.734c.18.24 2.544 3.886 6.164 5.449.861.372 1.533.594 2.057.761.865.275 1.652.236 2.274.143.694-.104 2.133-.872 2.433-1.714.301-.842.301-1.564.211-1.714-.09-.15-.331-.24-.691-.42z"/>
                </svg>
              </a>

              {/* 3. Luxury Plan Your Event Pill Button */}
              <Link
                href="/contact"
                onClick={handleNavContact}
                className="hidden sm:inline-flex items-center justify-center whitespace-nowrap px-3.5 xl:px-4.5 py-2 h-8.5 sm:h-9 rounded-full border border-[#E0C172] text-[#071426] bg-gradient-to-r from-[#DFBD6A] via-[#C9A24B] to-[#B38B35] hover:brightness-110 font-bold text-[11px] tracking-[0.14em] uppercase shadow-[0_4px_16px_rgba(201,162,75,0.4)] hover:shadow-[0_6px_22px_rgba(201,162,75,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 leading-none text-center shrink-0 cursor-pointer"
              >
                <span>{t.nav.planEvent}</span>
              </Link>

              {/* Mobile Menu Hamburger Toggle (Visible on Mobile, Tablet < 1024px) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 text-white/90 hover:text-[#C9A24B] transition-colors cursor-pointer shrink-0"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
