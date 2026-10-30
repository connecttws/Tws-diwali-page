"use client";

import dynamic from "next/dynamic";
import { Flame, Sparkles, ArrowDown, Award, ShieldCheck } from "lucide-react";

// Dynamically import ThreeDiyaHero with SSR disabled to guarantee smooth WebGL execution
const ThreeDiyaHero = dynamic(
  () => import("./ThreeDiyaHero").then((mod) => mod.ThreeDiyaHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] xs:h-[360px] sm:h-[410px] lg:h-[420px] xl:h-[460px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F0] to-[#F5EFE3] border border-[#D4A017]/35 flex flex-col items-center justify-center gap-3">
        <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-[#C59114] animate-pulse" />
        <span className="text-[11px] sm:text-xs font-bold text-[#8A610A] uppercase tracking-wider">
          Lighting Sacred 3D Diya...
        </span>
      </div>
    ),
  }
);

interface HeroProps {
  onPickDiyaClick: () => void;
}

export function Hero({ onPickDiyaClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full lg:min-h-[calc(100vh-4.25rem)] flex items-center py-6 sm:py-8 lg:py-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 xl:gap-12 items-center">
          {/* Left Column: Human Editorial Festive Copy & Action */}
          <div className="lg:col-span-6 flex flex-col items-start text-left justify-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#C59114] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2.5 sm:mb-3 shadow-xs">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59114] fill-[#C59114]" />
              <span>TWS Diwali Dhamaka is Here</span>
            </div>

            {/* Headline with mobile-optimized 5-line alignment and gold shimmer emphasis */}
            <h1 className="text-[1.75rem] xs:text-[1.95rem] sm:text-3xl md:text-4xl lg:text-[2.45rem] xl:text-[2.95rem] font-black tracking-tight text-[#1A1208] leading-[1.2] sm:leading-[1.14] mb-3.5 sm:mb-4">
              <span className="block sm:inline">This Diwali,</span>{" "}
              <span className="block sm:inline">you could win</span>{" "}
              <span className="gold-text-shimmer font-black">
                <span className="block sm:inline">₹50K worth of</span>{" "}
                <span className="block sm:inline">services for free —</span>
              </span>{" "}
              <span className="block sm:inline">if luck is on your side.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-xs xs:text-sm sm:text-base lg:text-[1.05rem] text-[#4A3B2C] font-normal leading-relaxed mb-5 sm:mb-6 max-w-xl">
              Choose a diya. Reveal your surprise. Celebrate the possibilities.
            </p>

            {/* Primary CTA and Microcopy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto mb-1">
              <button
                onClick={onPickDiyaClick}
                className="w-full sm:w-auto px-5 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-xs xs:text-sm sm:text-base hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_6px_20px_rgba(197,145,20,0.25)] hover:shadow-[0_10px_26px_rgba(197,145,20,0.35)] cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Flame className="w-4 h-4 text-white fill-white group-hover:scale-110 transition-transform" />
                <span>Choose Your Lucky Diya</span>
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ml-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <span className="text-[11px] sm:text-sm text-[#7A6652] text-center sm:text-left font-semibold">
                10 surprises. Pick one. Make it yours.
              </span>
            </div>

            {/* Trust and Authenticity Indicators */}
            <div className="mt-3 pt-2.5 border-t border-[#D4A017]/20 flex flex-wrap items-center gap-3.5 sm:gap-5 text-[11px] sm:text-xs text-[#4A3B2C] font-semibold">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C59114] shrink-0" />
                <span>Deterministic 10-Diya Allocation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3E7B44] shrink-0" />
                <span>100% Free · No Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Centerpiece */}
          <div className="lg:col-span-6 w-full flex items-center justify-center mt-2 lg:mt-0">
            <ThreeDiyaHero onPickDiyaClick={onPickDiyaClick} />
          </div>
        </div>
      </div>
    </section>
  );
}
