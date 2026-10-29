"use client";

import { Check, Flame, Sparkles, Lock } from "lucide-react";
import { DiyaOffer } from "@/data/diyaOffers";

interface DiyaCardProps {
  offer: DiyaOffer;
  isOpened?: boolean;
  isLocked?: boolean;
  onSelect: (diyaId: string) => void;
}

export function DiyaCard({ offer, isOpened = false, isLocked = false, onSelect }: DiyaCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(offer.id)}
      disabled={isLocked}
      aria-label={`Diya ${offer.number}: ${offer.name}. ${
        isOpened
          ? "Already opened and unlocked."
          : isLocked
          ? "Locked. You have already opened your lucky diya."
          : "Tap to open and reveal your Diwali surprise."
      }`}
      aria-pressed={isOpened}
      className={`group relative flex flex-col items-center justify-between p-2.5 xs:p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-200 text-left w-full outline-none focus-visible:ring-2 focus-visible:ring-[#C59114] focus-visible:ring-offset-2 ${
        isOpened
          ? "bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E6] to-[#F5EAD2] border-2 border-[#C59114] shadow-[0_10px_30px_rgba(197,145,20,0.25)] scale-[1.02] sm:scale-105 z-10 cursor-pointer ring-2 ring-[#D4A017]/30"
          : isLocked
          ? "bg-[#FFFFFF]/60 border border-[#D4A017]/15 opacity-60 cursor-not-allowed hover:opacity-75"
          : "bg-[#FFFFFF] hover:bg-[#FFFDF9] border border-[#D4A017]/30 hover:border-[#D4A017] shadow-[0_4px_16px_rgba(138,97,10,0.06)] hover:shadow-[0_10px_26px_rgba(197,145,20,0.16)] hover:-translate-y-1 cursor-pointer"
      }`}
    >
      {/* Top Header: Number & Badge */}
      <div className="w-full flex items-center justify-between z-10 mb-0.5">
        <span
          className={`font-black text-xs xs:text-sm sm:text-base tabular-nums tracking-wide ${
            isOpened ? "text-[#C59114]" : isLocked ? "text-[#7A6652]/70" : "text-[#8A610A] group-hover:text-[#1A1208]"
          }`}
        >
          {offer.number}
        </span>

        {isOpened ? (
          <span className="flex items-center gap-1 text-[9px] xs:text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#C59114] to-[#E5B537] px-1.5 xs:px-2 py-0.5 rounded-full shadow-xs">
            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
            <span>Opened</span>
          </span>
        ) : isLocked ? (
          <span className="flex items-center gap-1 text-[9px] xs:text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7A6652] bg-[#F6F3EB] px-1.5 py-0.5 rounded shadow-xs">
            <Lock className="w-2.5 h-2.5 text-[#7A6652]" />
            <span>Locked</span>
          </span>
        ) : offer.isGrandPrize ? (
          <span className="text-[9px] xs:text-[10px] sm:text-[11px] uppercase font-black tracking-wider text-[#1A1208] bg-[#F5D372] border border-[#D4A017]/40 px-1 xs:px-1.5 sm:px-2 py-0.5 rounded shadow-xs">
            ₹50K Grand
          </span>
        ) : (
          <span className="text-[9px] xs:text-[10px] sm:text-[11px] text-[#7A6652] font-semibold tracking-wide">
            Diya
          </span>
        )}
      </div>

      {/* Diya SVG Art */}
      <div className="relative my-1 xs:my-2 sm:my-3 flex items-center justify-center w-full">
        <svg
          viewBox="0 0 120 100"
          className={`w-16 h-14 xs:w-20 xs:h-16 sm:w-28 sm:h-24 transition-transform duration-200 ${
            !isLocked ? "group-hover:scale-105" : ""
          }`}
          aria-hidden="true"
        >
          <defs>
            {/* 24K Royal Gold Bowl Gradient */}
            <linearGradient id={`gold-bowl-${offer.number}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4D0" />
              <stop offset="30%" stopColor="#E5B537" />
              <stop offset="75%" stopColor="#C59114" />
              <stop offset="100%" stopColor="#8A610A" />
            </linearGradient>

            {/* Inner Oil Reservoir */}
            <radialGradient id={`gold-oil-${offer.number}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#734707" />
              <stop offset="100%" stopColor="#3D2203" />
            </radialGradient>

            {/* Flame Gradient */}
            <linearGradient id={`gold-flame-${offer.number}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E65C00" />
              <stop offset="35%" stopColor="#FF9926" />
              <stop offset="75%" stopColor="#FFE58F" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Warm Golden Glow Disc */}
            <radialGradient id={`diya-halo-${offer.number}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5D372" stopOpacity={isOpened ? "0.6" : "0.4"} />
              <stop offset="60%" stopColor="#E5B537" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#E5B537" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Warm Aura Halo */}
          <circle cx="60" cy="40" r="38" fill={`url(#diya-halo-${offer.number})`} />

          {/* Pedestal Foot */}
          <path
            d="M44 86 C44 86 52 89 60 89 C68 89 76 86 76 86 L74 91 C74 91 67 93 60 93 C53 93 46 91 46 91 Z"
            fill="#8A610A"
          />

          {/* Diya Royal Gold Bowl Silhouette */}
          <path
            d="M16 64 C16 78 35 87 60 87 C85 87 104 78 104 64 C104 59 98 56 86 58 C74 60 68 62 60 62 C52 62 46 60 34 58 C22 56 16 59 16 64 Z"
            fill={`url(#gold-bowl-${offer.number})`}
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1.2"
          />

          {/* Fluted Edge Collar */}
          <ellipse
            cx="60"
            cy="61"
            rx="38"
            ry="9"
            fill={`url(#gold-oil-${offer.number})`}
            stroke="#FFE58F"
            strokeWidth="1"
          />

          {/* Traditional Etched Dots */}
          <circle cx="38" cy="72" r="1.6" fill="#FFFFFF" opacity="0.9" />
          <circle cx="48" cy="75" r="1.6" fill="#FFFFFF" opacity="0.95" />
          <circle cx="60" cy="76" r="2.0" fill="#FFFFFF" opacity="1" />
          <circle cx="72" cy="75" r="1.6" fill="#FFFFFF" opacity="0.95" />
          <circle cx="82" cy="72" r="1.6" fill="#FFFFFF" opacity="0.9" />

          {/* Cotton Wick Spout */}
          <path
            d="M58 60 Q 60 52 61 46"
            stroke="#4A2A0C"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Flickering Flame */}
          <g className="animate-flame">
            <path
              d="M60 48 C50 42 52 24 60 10 C68 24 70 42 60 48 Z"
              fill={`url(#gold-flame-${offer.number})`}
            />
            <path
              d="M60 46 C55 42 55 28 60 18 C65 28 65 42 60 46 Z"
              fill="#FFFFFF"
              opacity="0.95"
            />
          </g>
        </svg>
      </div>

      {/* Card Info */}
      <div className="w-full text-center z-10 px-0.5">
        <h4
          className={`font-bold text-xs xs:text-sm sm:text-base md:text-lg tracking-tight transition-colors leading-snug line-clamp-1 xs:line-clamp-none ${
            isOpened
              ? "text-[#1A1208] font-black"
              : isLocked
              ? "text-[#4A3B2C]/70"
              : "text-[#1A1208] group-hover:text-[#C59114]"
          }`}
        >
          {offer.name}
        </h4>
        <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#8A610A] font-bold mt-0.5">
          {offer.hindiName}
        </p>
      </div>

      {/* Bottom action bar */}
      <div className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-[#D4A017]/20 w-full flex items-center justify-center text-[10px] xs:text-[11px] sm:text-xs font-bold text-[#C59114]">
        {isOpened ? (
          <span className="flex items-center gap-1 font-black text-[#1A1208]">
            <Flame className="w-3 h-3 text-[#E65C00] fill-[#E65C00]" />
            <span className="hidden xs:inline">Unlocked · View Details</span>
            <span className="xs:hidden">Unlocked</span>
          </span>
        ) : isLocked ? (
          <span className="flex items-center gap-1 text-[#7A6652]/80 font-medium">
            <Lock className="w-2.5 h-2.5" />
            <span className="hidden xs:inline">1 Diya Limit</span>
            <span className="xs:hidden">Locked</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[#8A610A] group-hover:text-[#1A1208] transition-colors">
            <Sparkles className="w-3 h-3 text-[#C59114]" />
            <span className="hidden xs:inline">Tap to Open</span>
            <span className="xs:hidden">Open</span>
          </span>
        )}
      </div>
    </button>
  );
}
