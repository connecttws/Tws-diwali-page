"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, Check, Flame, X } from "lucide-react";
import { DiyaOffer } from "@/data/diyaOffers";
import { playDiwaliRevealChime } from "@/utils/audio";

interface DiyaRevealModalProps {
  offer: DiyaOffer;
  onProceedToThankYou: () => void;
  onClose?: () => void;
}

export function DiyaRevealModal({
  offer,
  onProceedToThankYou,
  onClose,
}: DiyaRevealModalProps) {
  useEffect(() => {
    playDiwaliRevealChime();

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4A017", "#F5D372", "#FFFFFF", "#E65C00", "#3E7B44"],
        disableForReducedMotion: true,
      });
    } catch {
      // Safe catch
    }
  }, [offer]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1208]/80 backdrop-blur-md p-3.5 sm:p-5 flex items-center justify-center animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl sm:rounded-4xl border-2 border-[#C59114] shadow-[0_24px_70px_rgba(138,97,10,0.35)] overflow-hidden my-auto flex flex-col p-5 sm:p-8 text-center animate-scaleUp">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[radial-gradient(ellipse,rgba(245,211,114,0.45)_0%,transparent_70%)] pointer-events-none" />

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#F6F3EB] text-[#4A3B2C] hover:text-[#1A1208] border border-[#D4A017]/30 flex items-center justify-center transition-colors cursor-pointer z-20"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Top Auspicious Badge */}
        <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCF4D9] border border-[#D4A017]/40 text-[#C59114] text-[11px] sm:text-xs font-black tracking-widest uppercase mx-auto mb-3 relative z-10 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C59114] fill-[#C59114]" />
          <span>Diya {offer.number} Opened · Festive Surprise!</span>
        </div>

        {/* Diya Name & Flame Art */}
        <div className="relative my-2 sm:my-3 flex flex-col items-center justify-center z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#D4A017] via-[#E5B537] to-[#C59114] flex items-center justify-center shadow-lg shadow-amber-500/30 mb-2">
            <Flame className="w-9 h-9 sm:w-11 sm:h-11 text-white fill-white animate-pulse" />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-[#7A6652]">
            {offer.name} <span className="text-[#8A610A]">({offer.hindiName})</span>
          </h3>
        </div>

        {/* Offer Headline & Value Amount */}
        <div className="my-3 sm:my-4 py-3 sm:py-4 border-y border-[#D4A017]/25 relative z-10">
          <div className="text-[10px] sm:text-xs font-black uppercase text-[#3E7B44] bg-[#3E7B44]/15 px-3 py-1 rounded-full inline-block mb-2 border border-[#3E7B44]/30">
            {offer.valueAmount}
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#1A1208] leading-tight mb-2">
            {offer.headline}
          </h2>
          <p className="text-xs sm:text-sm text-[#4A3B2C] max-w-sm mx-auto leading-relaxed font-normal">
            {offer.tagline}
          </p>
        </div>

        {/* Voucher Code Preview */}
        <div className="mb-4 sm:mb-6 p-3 rounded-xl bg-[#FAF7F0] border border-[#D4A017]/35 relative z-10">
          <div className="text-[10px] sm:text-[11px] uppercase font-bold text-[#7A6652] mb-0.5">
            Your Diwali Voucher Code:
          </div>
          <div className="font-mono text-xs sm:text-sm font-black text-[#1A1208] tracking-widest">
            {offer.voucherCode}
          </div>
        </div>

        {/* Primary CTA: Avail Offer on Thank You Page */}
        <div className="relative z-10 space-y-2">
          <button
            onClick={onProceedToThankYou}
            className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-sm sm:text-base hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_25px_rgba(197,145,20,0.35)] cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Avail This Offer on Thank You Page</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[11px] sm:text-xs text-[#7A6652]">
            Fill your business details on the next page to confirm your claim.
          </p>
        </div>
      </div>
    </div>
  );
}

