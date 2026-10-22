"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      badge: "STAGE 01 · INITIAL ENGAGEMENT",
      title: "01. Consultation",
      descEn:
        "Connect with our visionary event architects at our Rajshahi studio over fresh coffee or via WhatsApp. We meticulously align with your venue choice, guest scale, and budget to design an extraordinary celebration.",
      image: "/client-media/process-consultation.jpg",
      overlay: "from-black/95 via-black/75 to-black/40"
    },
    {
      num: "02",
      badge: "STAGE 02 · BLUEPRINT & 3D DESIGN",
      title: "02. Concept & Design",
      descEn:
        "Every venue possesses a distinct soul. We forge custom moodboards, 3D stage mockups, exotic floral palettes, and intelligent lighting blueprints so you preview every frame before production begins.",
      image: "/client-media/process-concept-design.jpg",
      overlay: "from-black/95 via-black/80 to-black/50"
    },
    {
      num: "03",
      badge: "STAGE 03 · ON-GROUND CRAFTSMANSHIP",
      title: "03. On-Site Production",
      descEn:
        "Our master craftsmen and technical crew arrive on-site with imported fresh florals, bespoke wooden arches, crystal chandeliers, and concert-grade truss lighting — engineered with uncompromising precision.",
      image: "/client-media/process-onsite-production.jpg",
      overlay: "from-black/95 via-black/75 to-black/40"
    },
    {
      num: "04",
      badge: "STAGE 04 · GRAND FINALE",
      title: "04. Flawless Celebration",
      descEn:
        "When the auspicious hour arrives, you and your family simply revel in pure joy. From grand entrance tunnels to live stage coordination, Zeyo orchestrates every detail for a fairy-tale reality.",
      image: "/client-media/process-flawless-celebration.jpg",
      overlay: "from-black/95 via-black/75 to-black/40"
    }
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Track active step for tabs & progress indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.28) {
      setActiveStep(0);
    } else if (latest < 0.62) {
      setActiveStep(1);
    } else if (latest < 0.88) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  });

  // Alternating Left-Right Sliding Transforms:
  // Card 0: Starts at center (0%). Slides OUT to the LEFT (0% -> -100%)
  const x0 = useTransform(scrollYProgress, [0.18, 0.38], ["0%", "-100%"]);

  // Card 1: Starts at RIGHT (100%). Slides IN from RIGHT (100% -> 0%). Then slides OUT to the RIGHT (0% -> 100%)
  const x1 = useTransform(
    scrollYProgress,
    [0.18, 0.38, 0.52, 0.72],
    ["100%", "0%", "0%", "100%"]
  );

  // Card 2: Starts at LEFT (-100%). Slides IN from LEFT (-100% -> 0%). Then slides OUT to the LEFT (0% -> -100%)
  const x2 = useTransform(
    scrollYProgress,
    [0.52, 0.72, 0.82, 0.98],
    ["-100%", "0%", "0%", "-100%"]
  );

  // Card 3: Starts at RIGHT (100%). Slides IN from RIGHT (100% -> 0%) and rests in center as Grand Finale
  const x3 = useTransform(scrollYProgress, [0.82, 0.98], ["100%", "0%"]);

  const scrollToStep = (index: number) => {
    if (!targetRef.current) return;
    const element = targetRef.current;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const startY = rect.top + scrollTop;
    const totalHeight = element.scrollHeight - window.innerHeight;

    // Sweet-spot fractions for each resting card
    const fractions = [0.08, 0.45, 0.77, 0.99];
    const targetScroll = startY + totalHeight * fractions[index];

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      scrollToStep(activeStep - 1);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      scrollToStep(activeStep + 1);
    }
  };

  return (
    <section id="process" className="bg-[#e9e7e2] relative border-t border-[#2b2927]/10">
      {/* Scroll Track Container */}
      <div ref={targetRef} className="relative h-[260vh] sm:h-[300vh]">
        {/* Sticky Pinned Viewport Container */}
        <div className="sticky top-20 sm:top-24 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] flex flex-col justify-between py-4 sm:py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          
          {/* Header & Step Selector */}
          <div className="text-center max-w-4xl mx-auto shrink-0 mb-2 sm:mb-3">
            <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#2b2927] font-bold tracking-tight mb-2 leading-tight">
              From Dream to Celebration
            </h2>
            <p className="text-xs sm:text-sm text-[#595550] font-sans-luxury font-bold max-w-xl mx-auto mb-2.5 sm:mb-3">
              Scroll down or use the slider arrows — each card slides in alternately from left & right in place.
            </p>

            {/* Interactive Step Navigator Tabs */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap">
              {steps.map((st, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToStep(i)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[10.5px] sm:text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeStep === i
                      ? "bg-[#071426] text-[#F3DE9A] shadow-md border border-[#C9A24B]/50 scale-105"
                      : "bg-white/80 hover:bg-white text-[#595550] border border-[#2b2927]/10"
                  }`}
                >
                  <span className="text-[#C9A24B] mr-1">0{i + 1}.</span>
                  <span>{st.title.split(". ")[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Centered Pinned Card Slider Deck (Navy frame prevents any white background peek-through) */}
          <div className="relative w-full max-w-5xl mx-auto h-[420px] sm:h-[450px] md:h-[480px] lg:h-[500px] my-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#071426] shadow-[0_25px_60px_rgba(7,20,38,0.35)] border border-[#C9A24B]/40">
            
            {/* Slider Navigation Arrows (Previous / Next) */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeStep === 0}
              aria-label="Previous Step"
              className={`absolute left-1.5 sm:left-4 lg:left-5 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                activeStep === 0
                  ? "bg-[#071426]/60 text-[#C9A24B]/30 border border-[#C9A24B]/20 cursor-not-allowed opacity-40"
                  : "bg-[#071426]/90 text-[#F3DE9A] hover:bg-[#162E52] border border-[#C9A24B]/70 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,75,0.5)] backdrop-blur-md"
              }`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              aria-label="Next Step"
              className={`absolute right-1.5 sm:right-4 lg:right-5 top-1/2 -translate-y-1/2 z-50 w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
                activeStep === steps.length - 1
                  ? "bg-[#071426]/60 text-[#C9A24B]/30 border border-[#C9A24B]/20 cursor-not-allowed opacity-40"
                  : "bg-[#071426]/90 text-[#F3DE9A] hover:bg-[#162E52] border border-[#C9A24B]/70 hover:scale-110 hover:shadow-[0_0_20px_rgba(201,162,75,0.5)] backdrop-blur-md"
              }`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Card 0 (Step 1 - Base layer z-10, slides OUT to the LEFT) */}
            <motion.div
              style={{ x: x0 }}
              className="absolute inset-0 z-10 will-change-transform"
            >
              <div className="relative w-full h-full flex flex-col justify-center">
                <img
                  src={steps[0].image}
                  alt={steps[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${steps[0].overlay}`} />

                {/* Content written DIRECTLY on the image without inner background boxes */}
                <div className="relative flex flex-col items-center justify-center text-center px-8 sm:px-14 md:px-18 lg:px-20 py-6 sm:py-10 z-10">
                  <span className="inline-block px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-sans-luxury font-bold uppercase tracking-[0.22em] bg-[#C9A24B]/25 text-[#F3DE9A] border border-[#C9A24B]/50 mb-2.5 sm:mb-3.5 shadow-md">
                    {steps[0].badge}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#F3DE9A] font-bold tracking-wide mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    {steps[0].title}
                  </h3>
                  <p className="font-serif-luxury italic font-bold text-sm sm:text-base md:text-lg lg:text-[21px] text-white/95 max-w-3xl mx-auto leading-relaxed sm:leading-[1.75] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                    {steps[0].descEn}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 1 (Step 2 - z-20, slides IN from RIGHT, then slides OUT to RIGHT) */}
            <motion.div
              style={{ x: x1 }}
              className="absolute inset-0 z-20 will-change-transform"
            >
              <div className="relative w-full h-full flex flex-col justify-center">
                <img
                  src={steps[1].image}
                  alt={steps[1].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${steps[1].overlay}`} />

                {/* Content written DIRECTLY on the image without inner background boxes */}
                <div className="relative flex flex-col items-center justify-center text-center px-8 sm:px-14 md:px-18 lg:px-20 py-6 sm:py-10 z-10">
                  <span className="inline-block px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-sans-luxury font-bold uppercase tracking-[0.22em] bg-[#C9A24B]/25 text-[#F3DE9A] border border-[#C9A24B]/50 mb-2.5 sm:mb-3.5 shadow-md">
                    {steps[1].badge}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#F3DE9A] font-bold tracking-wide mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    {steps[1].title}
                  </h3>
                  <p className="font-serif-luxury italic font-bold text-sm sm:text-base md:text-lg lg:text-[21px] text-white/95 max-w-3xl mx-auto leading-relaxed sm:leading-[1.75] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                    {steps[1].descEn}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 (Step 3 - z-30, slides IN from LEFT, then slides OUT to LEFT) */}
            <motion.div
              style={{ x: x2 }}
              className="absolute inset-0 z-30 will-change-transform"
            >
              <div className="relative w-full h-full flex flex-col justify-center">
                <img
                  src={steps[2].image}
                  alt={steps[2].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${steps[2].overlay}`} />

                {/* Content written DIRECTLY on the image without inner background boxes */}
                <div className="relative flex flex-col items-center justify-center text-center px-8 sm:px-14 md:px-18 lg:px-20 py-6 sm:py-10 z-10">
                  <span className="inline-block px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-sans-luxury font-bold uppercase tracking-[0.22em] bg-[#C9A24B]/25 text-[#F3DE9A] border border-[#C9A24B]/50 mb-2.5 sm:mb-3.5 shadow-md">
                    {steps[2].badge}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#F3DE9A] font-bold tracking-wide mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    {steps[2].title}
                  </h3>
                  <p className="font-serif-luxury italic font-bold text-sm sm:text-base md:text-lg lg:text-[21px] text-white/95 max-w-3xl mx-auto leading-relaxed sm:leading-[1.75] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                    {steps[2].descEn}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 (Step 4 - z-40, slides IN from RIGHT, stays in place as Grand Finale) */}
            <motion.div
              style={{ x: x3 }}
              className="absolute inset-0 z-40 will-change-transform"
            >
              <div className="relative w-full h-full flex flex-col justify-center">
                <img
                  src={steps[3].image}
                  alt={steps[3].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${steps[3].overlay}`} />

                {/* Content written DIRECTLY on the image without inner background boxes */}
                <div className="relative flex flex-col items-center justify-center text-center px-8 sm:px-14 md:px-18 lg:px-20 py-6 sm:py-10 z-10">
                  <span className="inline-block px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-sans-luxury font-bold uppercase tracking-[0.22em] bg-[#C9A24B]/25 text-[#F3DE9A] border border-[#C9A24B]/50 mb-2.5 sm:mb-3.5 shadow-md">
                    {steps[3].badge}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#F3DE9A] font-bold tracking-wide mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    {steps[3].title}
                  </h3>
                  <p className="font-serif-luxury italic font-bold text-sm sm:text-base md:text-lg lg:text-[21px] text-white/95 max-w-3xl mx-auto leading-relaxed sm:leading-[1.75] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                    {steps[3].descEn}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Slider Step Controls & Bottom CTA */}
          <div className="shrink-0 flex items-center justify-between gap-4 max-w-5xl mx-auto w-full pt-3 sm:pt-4">
            {/* Step Counter Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-sans-luxury font-bold text-[#595550]">
                Progress:
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#071426] text-[#F3DE9A] text-xs font-bold font-sans-luxury border border-[#C9A24B]/40">
                0{activeStep + 1} / 04
              </span>
            </div>

            {/* Explore Production Guide CTA Button */}
            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#071426] hover:bg-[#162E52] text-[#F3DE9A] border border-[#C9A24B]/40 hover:border-[#C9A24B] shadow-md text-xs font-sans-luxury font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Explore 4-Step Production Guide</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
