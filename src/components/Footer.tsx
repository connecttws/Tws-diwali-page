"use client";

import { Flame, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[#D4A017]/25 bg-[#F6F3EB] text-[#4A3B2C] pt-12 sm:pt-16 pb-10 sm:pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Festive Blessing Banner */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 pb-8 sm:pb-10 border-b border-[#D4A017]/20">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E5B537] text-white mb-3 sm:mb-4 shadow-md">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-[#1A1208] mb-1.5 sm:mb-2.5">
            Happy Diwali from TWS
          </h3>
          <p className="text-sm sm:text-lg text-[#8A610A] font-semibold px-2">
            “May your Diwali be filled with light, joy and new possibilities.”
          </p>
        </div>

        {/* Footer Navigation & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-black text-base sm:text-lg text-[#1A1208]">TWS</span>
            <span className="text-[#4A3B2C]/40">·</span>
            <span className="font-semibold text-[#4A3B2C]">Diwali Dhamaka Campaign 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold">
            <a
              href="#diya-selection"
              className="text-[#4A3B2C] hover:text-[#C59114] transition-colors"
            >
              Pick a Diya
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FFFFFF] text-[#8A610A] hover:text-[#1A1208] hover:bg-[#FFFDF9] border border-[#D4A017]/30 font-bold transition-colors cursor-pointer shadow-xs w-full sm:w-auto"
            aria-label="Back to top of page"
          >
            <ArrowUp className="w-4 h-4 text-[#C59114]" />
            <span>Back to top</span>
          </button>
        </div>

        {/* Bottom microcopy */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#D4A017]/15 text-center text-[11px] sm:text-xs text-[#7A6652] px-2">
          <p>© 2026 TWS (The Web Studio). All rights reserved. Handcrafted with festive devotion and modern web engineering.</p>
        </div>
      </div>
    </footer>
  );
}
