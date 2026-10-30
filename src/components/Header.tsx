"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";

interface HeaderProps {
  onPickDiyaClick?: () => void;
  isAlreadyOpened?: boolean;
}

export function Header({ onPickDiyaClick, isAlreadyOpened = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D4A017]/30 shadow-[0_4px_25px_rgba(138,97,10,0.08)] py-2.5 sm:py-3"
          : "bg-[#FFFFFF]/85 backdrop-blur-sm border-b border-[#D4A017]/15 py-3 sm:py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark: Logo TWS / Diwali Dhamaka */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 text-decoration-none group"
          aria-label="TWS Diwali Dhamaka Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D4A017] via-[#E5B537] to-[#C59114] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <Flame className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#1A1208] group-hover:text-[#C59114] transition-colors leading-none">
              TWS
            </span>
            <span className="font-sans font-bold text-[10px] sm:text-xs text-[#C59114] tracking-widest uppercase mt-0.5 leading-none">
              Diwali Dhamaka
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
