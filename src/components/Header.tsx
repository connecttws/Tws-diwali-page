"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
          aria-label="Team With Someone (TWS) Diwali Dhamaka Home"
        >
          <div className="relative flex items-center h-8 sm:h-9 w-auto">
            <Image
              src="/tws-logo.png"
              alt="Team With Someone (TWS)"
              width={140}
              height={52}
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span className="hidden xs:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#FCF4D9] text-[#8A610A] border border-[#D4A017]/40 tracking-wider uppercase">
            Diwali Dhamaka
          </span>
        </Link>
      </div>
    </header>
  );
}
