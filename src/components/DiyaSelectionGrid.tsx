"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, CheckCircle2, Lock, Copy, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { DIYA_OFFERS, DiyaOffer } from "@/data/diyaOffers";
import { DiyaCard } from "./DiyaCard";
import { DiyaRevealModal } from "./DiyaRevealModal";
import { playDiyaTapSound } from "@/utils/audio";

interface DiyaSelectionGridProps {
  openedDiyaId: string | null;
  isAlreadyOpened: boolean;
  onOpenDiya: (diyaId: string) => void;
}

export function DiyaSelectionGrid({
  openedDiyaId,
  isAlreadyOpened,
  onOpenDiya,
}: DiyaSelectionGridProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [modalOffer, setModalOffer] = useState<DiyaOffer | null>(null);

  const openedOffer: DiyaOffer | undefined = openedDiyaId
    ? DIYA_OFFERS.find((d) => d.id === openedDiyaId)
    : undefined;

  const handleCardClick = (diyaId: string) => {
    const offer = DIYA_OFFERS.find((d) => d.id === diyaId);
    if (isAlreadyOpened) {
      if (diyaId === openedDiyaId && openedOffer) {
        setModalOffer(openedOffer);
      } else {
        setLockedNotice(
          `You have already opened Diya ${openedOffer?.number || ""} (${
            openedOffer?.name || ""
          }). Each visitor is limited to 1 lucky Diya!`
        );
        setTimeout(() => setLockedNotice(null), 4000);
      }
      return;
    }

    playDiyaTapSound();
    onOpenDiya(diyaId);
    if (offer) {
      setModalOffer(offer);
    }
  };

  const handleProceedToThankYou = () => {
    router.push("/thank-you");
  };

  const handleCopyVoucher = async () => {
    if (!openedOffer) return;
    try {
      await navigator.clipboard.writeText(openedOffer.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section id="diya-selection" className="py-10 sm:py-20 lg:py-24 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          {isAlreadyOpened ? (
            <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#C59114] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2 sm:mb-2.5 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B44]" />
              <span>Diya Already Opened & Claimed</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#C59114] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2 sm:mb-2.5 shadow-xs">
              <Flame className="w-3.5 h-3.5 text-[#E65C00] fill-[#E65C00]" />
              <span>Interactive Diwali Card-Pick</span>
            </div>
          )}

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1208] tracking-tight leading-tight">
            {isAlreadyOpened ? (
              <>
                Your Lucky Diya is{" "}
                <span className="gold-text-shimmer font-black">
                  Already Opened!
                </span>
              </>
            ) : (
              <>
                Pick a diya. Let the{" "}
                <span className="gold-text-shimmer font-black">
                  Dhamaka begin.
                </span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-base text-[#4A3B2C] font-normal mt-2 sm:mt-3 leading-relaxed px-2">
            {isAlreadyOpened
              ? "You have already unlocked your festive surprise. Your voucher code and deliverables are saved below."
              : "Tap any sacred diya below to instantly open it and reveal your Diwali surprise."}
          </p>
        </div>

        {/* ALREADY OPENED VOUCHER STATUS BANNER */}
        {isAlreadyOpened && openedOffer && (
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFFFF] via-[#FFFDF9] to-[#FBF4E4] border-2 border-[#C59114] shadow-[0_12px_40px_rgba(197,145,20,0.18)] relative overflow-hidden animate-fadeIn">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-36 bg-[radial-gradient(ellipse,rgba(245,211,114,0.35)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#D4A017]/25">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#C59114] to-[#E5B537] px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                  <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
                  <span>Diya {openedOffer.number}</span>
                </span>
                <span className="text-sm sm:text-base font-extrabold text-[#1A1208]">
                  {openedOffer.name}{" "}
                  <span className="text-[#8A610A] text-xs font-semibold">
                    ({openedOffer.hindiName})
                  </span>
                </span>
              </div>

              <span className="text-xs font-black text-[#3E7B44] bg-[#3E7B44]/15 px-2.5 py-1 rounded-lg border border-[#3E7B44]/30 shrink-0">
                {openedOffer.valueAmount} · 100% Free
              </span>
            </div>

            {/* Offer details */}
            <div className="py-3 sm:py-4">
              <h3 className="text-base xs:text-lg sm:text-2xl font-black text-[#1A1208] leading-snug mb-1">
                {openedOffer.headline}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A3B2C] leading-relaxed font-normal">
                {openedOffer.tagline}
              </p>

              {/* Voucher Code Box */}
              <div className="mt-3.5 sm:mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFFFFF] border border-[#D4A017]/35 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[11px] uppercase font-bold text-[#7A6652] mb-0.5">
                    Your Permanent Voucher Code:
                  </div>
                  <code className="font-mono text-xs xs:text-sm sm:text-base font-black text-[#1A1208] tracking-wider select-all break-all block">
                    {openedOffer.voucherCode}
                  </code>
                </div>

                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyVoucher}
                    aria-label="Copy voucher code"
                    className="w-full xs:w-auto px-3.5 py-2 rounded-xl bg-[#F6F3EB] hover:bg-[#EFECE2] text-[#1A1208] border border-[#D4A017]/40 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#3E7B44] stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C59114]" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/thank-you"
                    className="w-full xs:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View Thank You Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D4A017]/20 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#7A6652]">
              <div className="flex items-center gap-1.5 text-[#3E7B44] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Locked to your device · 1 Diya per visitor</span>
              </div>
              <div className="font-medium text-[#8A610A]">
                Valid for 60 days from Diwali 2026
              </div>
            </div>
          </div>
        )}

        {/* Locked Notification Toast */}
        {lockedNotice && (
          <div className="max-w-xl mx-auto mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF5E6] border border-[#E65C00]/40 text-[#8A4200] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
            <Lock className="w-4 h-4 shrink-0 text-[#E65C00]" />
            <span className="flex-1 leading-snug">{lockedNotice}</span>
          </div>
        )}

        {/* 10-Diya Selection Grid (Mobile optimized 2 columns, clean tap targets) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 xs:gap-3.5 sm:gap-5 lg:gap-6 mb-8 sm:mb-12">
          {DIYA_OFFERS.map((offer: DiyaOffer) => (
            <DiyaCard
              key={offer.id}
              offer={offer}
              isOpened={openedDiyaId === offer.id}
              isLocked={isAlreadyOpened && openedDiyaId !== offer.id}
              onSelect={handleCardClick}
            />
          ))}
        </div>

        {/* Bottom Helper Bar */}
        {!isAlreadyOpened && (
          <div className="text-center text-xs sm:text-sm text-[#7A6652] font-semibold px-2">
            ✨ Tap any of the 10 diyas above to open it and unlock your Diwali Dhamaka surprise
          </div>
        )}
      </div>

      {/* Opening Reveal Modal */}
      {modalOffer && (
        <DiyaRevealModal
          offer={modalOffer}
          onProceedToThankYou={handleProceedToThankYou}
          onClose={() => setModalOffer(null)}
        />
      )}
    </section>
  );
}
