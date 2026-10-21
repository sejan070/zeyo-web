"use client";

import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import IntroStatement from "@/components/home/IntroStatement";
import ServicePillars from "@/components/home/ServicePillars";
import ClientShowcase3D from "@/components/home/ClientShowcase3D";
import QuoteBanners from "@/components/home/QuoteBanners";
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio";
import ProcessSection from "@/components/home/ProcessSection";
import InquirySection from "@/components/home/InquirySection";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileCtaBar from "@/components/layout/MobileCtaBar";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTarget = (targetId: string, behavior: ScrollBehavior = "instant") => {
      const el = document.getElementById(targetId);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior
        });
        return true;
      }
      return false;
    };

    const hash = window.location.hash ? window.location.hash.replace("#", "") : "";
    const querySection = new URLSearchParams(window.location.search).get("section");
    const targetSection = querySection || sessionStorage.getItem("zeyo_scroll_target") || hash;

    if (targetSection) {
      sessionStorage.removeItem("zeyo_scroll_target");
      let attempts = 0;
      const tryScroll = () => {
        attempts++;
        const scrolled = scrollToTarget(targetSection, attempts === 1 ? "instant" : "smooth");
        if (!scrolled && attempts < 35) {
          setTimeout(tryScroll, 60);
        }
      };
      // Initial attempt immediately, then retries
      tryScroll();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    const handleHashChange = () => {
      const hashId = window.location.hash ? window.location.hash.replace("#", "") : "";
      if (hashId) {
        scrollToTarget(hashId, "smooth");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#e9e7e2] selection:bg-[#C9A24B] selection:text-[#071426]">
      {/* Sticky Luxury Header */}
      <Header />

      {/* Main Content Sections */}
      <main id="main-content">
        <Hero />
        <IntroStatement />
        <ServicePillars />
        <ClientShowcase3D />
        <QuoteBanners />
        <FeaturedPortfolio />
        <ProcessSection />
        <InquirySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call to Actions */}
      <FloatingWhatsApp />
      <MobileCtaBar />
    </div>
  );
}
