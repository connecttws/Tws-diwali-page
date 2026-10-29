"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Volume2, VolumeX, Flame } from "lucide-react";
import { setSoundEnabled } from "@/utils/audio";

interface HeaderProps {
  onPickDiyaClick: () => void;
  isAlreadyOpened?: boolean;
}

export function Header({ onPickDiyaClick, isAlreadyOpened = false }: HeaderProps) {
  const [soundOn, setSoundOn] = useState(true);
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

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D4A017]/30 shadow-[0_4px_25px_rgba(138,97,10,0.08)] py-2.5 sm:py-3"
          : "bg-[#FFFFFF]/85 backdrop-blur-sm border-b border-[#D4A017]/15 py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2.5 sm:gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 text-decoration-none group shrink-0"
          aria-label="TWS Diwali Dhamaka Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D4A017] via-[#E5B537] to-[#C59114] flex items-center justify-center shadow-xs shrink-0">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
          </div>
          <div className="flex items-baseline">
            <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-[#1A1208] group-hover:text-[#C59114] transition-colors whitespace-nowrap">
              TWS
            </span>
            <span className="font-sans font-bold text-xs sm:text-sm text-[#C59114] tracking-wider uppercase ml-1.5 sm:ml-2 whitespace-nowrap hidden min-[370px]:inline">
              Diwali Dhamaka
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-9 text-sm lg:text-base font-semibold text-[#4A3B2C]">
          <a
            href="#hero"
            className="hover:text-[#C59114] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#diya-selection"
            className="hover:text-[#C59114] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            {isAlreadyOpened ? "My Diya" : "Pick Diya"}
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#C59114] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="hover:text-[#C59114] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Primary Actions & Sound Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Audio Ambiance Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? "Mute festive sound effects" : "Enable festive sound effects"}
            className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#FFFFFF] text-[#C59114] hover:bg-[#F6F3EB] border border-[#D4A017]/30 transition-colors cursor-pointer shadow-xs shrink-0"
            title={soundOn ? "Sound on" : "Sound muted"}
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-[#C59114]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#7A6652]/60" />
            )}
          </button>

          {/* Primary CTA */}
          {isAlreadyOpened ? (
            <Link
              href="/thank-you"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span className="hidden min-[380px]:inline">View My Diya</span>
              <span className="min-[380px]:hidden">My Diya</span>
            </Link>
          ) : (
            <button
              onClick={onPickDiyaClick}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#C59114] to-[#E5B537] text-white font-black text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0"
            >
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span className="hidden min-[380px]:inline">Pick Your Diya</span>
              <span className="min-[380px]:hidden">Pick Diya</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
