"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Copy, Check, Gift, ArrowLeft, ExternalLink, ShieldCheck, X } from "lucide-react";
import { DiyaOffer } from "@/data/diyaOffers";
import { playDiwaliRevealChime } from "@/utils/audio";

interface OfferRevealModalProps {
  offer: DiyaOffer;
  onClose: () => void;
  onPickAnother: () => void;
}

export function OfferRevealModal({ offer, onClose, onPickAnother }: OfferRevealModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    playDiwaliRevealChime();

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#D4A017", "#F5D372", "#FFFFFF", "#E65C00", "#3E7B44"],
        disableForReducedMotion: true,
      });
    } catch {
      // Safe catch
    }
  }, [offer]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(offer.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello TWS Team! I picked Diya ${offer.number} (${offer.name}) in TWS Diwali Dhamaka and unlocked: ${offer.headline} (${offer.valueAmount} Value). My Voucher Code is: ${offer.voucherCode}. How do I redeem this?`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(
    `TWS Diwali Dhamaka Surprise: ${offer.name} (${offer.voucherCode})`
  );
  const emailBody = encodeURIComponent(
    `Hello TWS Team,\n\nI unlocked the Diwali Dhamaka surprise for Diya ${offer.number} (${offer.name}):\n- Headline: ${offer.headline}\n- Value: ${offer.valueAmount}\n- Voucher Code: ${offer.voucherCode}\n\nPlease guide me with the redemption process.\n\nThank you!`
  );
  const emailUrl = `mailto:hello@tws.in?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reveal-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1208]/75 backdrop-blur-sm p-3 sm:p-5 flex items-start sm:items-center justify-center animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl border-2 border-[#C59114] shadow-[0_20px_60px_rgba(138,97,10,0.3)] overflow-hidden my-auto sm:my-6 flex flex-col max-h-[92vh]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 bg-[radial-gradient(ellipse,rgba(245,211,114,0.35)_0%,transparent_70%)] pointer-events-none" />

        {/* Modal Top Bar (Sticky for reliable mobile access) */}
        <div className="sticky top-0 z-20 bg-[#FFFFFF]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-[#D4A017]/25 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#C59114] uppercase tracking-wider bg-[#FCF4D9] px-2.5 py-0.5 rounded-md border border-[#D4A017]/30">
              Diya {offer.number}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-[#1A1208]">
              {offer.name} <span className="text-[#8A610A] text-xs font-semibold">({offer.hindiName})</span>
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close surprise dialog"
            className="w-8 h-8 rounded-full bg-[#F6F3EB] text-[#4A3B2C] hover:text-[#1A1208] hover:bg-[#EFECE2] border border-[#D4A017]/30 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4">
          {/* Main Headline & Value Banner */}
          <div className="text-center">
            <div className="text-xs uppercase font-bold text-[#8A610A] tracking-wider mb-1">
              ✨ Auspicious Diwali Surprise Unlocked
            </div>
            <h2
              id="reveal-heading"
              className="text-xl sm:text-2xl font-black text-[#1A1208] leading-tight"
            >
              {offer.headline}
            </h2>
          </div>

          {/* Value & Voucher Card */}
          <div className="rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FBF4E4] p-3.5 sm:p-4 border border-[#C59114]/40 shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A017] to-[#E5B537] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] uppercase font-black text-[#8A610A] tracking-wider">
                    Service Value
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#1A1208] tabular-nums">
                    {offer.valueAmount}
                  </div>
                </div>
              </div>

              <span className="text-xs font-black text-[#3E7B44] uppercase bg-[#3E7B44]/15 px-2.5 py-1 rounded-lg border border-[#3E7B44]/30 shrink-0">
                100% Free
              </span>
            </div>

            {/* Voucher Code Box */}
            <div className="pt-2.5 border-t border-[#D4A017]/25">
              <div className="text-[11px] uppercase font-bold text-[#7A6652] mb-1">
                Your Voucher Code:
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-xs sm:text-sm font-black bg-[#FFFFFF] px-3 py-2 rounded-xl border border-[#D4A017]/40 text-[#1A1208] tracking-wider truncate select-all shadow-inner">
                  {offer.voucherCode}
                </code>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  aria-label="Copy voucher code"
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#C59114] to-[#E5B537] text-white hover:brightness-105 active:scale-95 transition-all cursor-pointer font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Clean Streamlined Highlights */}
          <div className="bg-[#FAF7F0] rounded-2xl p-3 sm:p-3.5 border border-[#D4A017]/20 text-xs sm:text-sm">
            <div className="text-[11px] font-black uppercase text-[#C59114] tracking-wider mb-2">
              Key Deliverables Included:
            </div>
            <ul className="space-y-1.5 text-[#1A1208]">
              {offer.deliverables.slice(0, 2).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#3E7B44] stroke-[3] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concise Terms Note */}
          <div className="text-[11px] sm:text-xs text-[#7A6652] text-center font-medium">
            ✓ Valid for 60 days from Diwali 2026 · 100% Free · No purchase required
          </div>

          {/* Fast Claim CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-xs sm:text-sm text-center active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Claim on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={emailUrl}
              className="py-3 px-4 rounded-xl bg-[#F6F3EB] hover:bg-[#EFECE2] text-[#1A1208] font-black text-xs sm:text-sm text-center border border-[#D4A017]/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Claim via Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 border-t border-[#D4A017]/20 flex items-center justify-between text-xs font-semibold">
            <button
              type="button"
              onClick={onPickAnother}
              className="text-[#8A610A] hover:text-[#1A1208] flex items-center gap-1 transition-colors cursor-pointer py-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Pick another diya</span>
            </button>

            <div className="flex items-center gap-1 text-[#3E7B44]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified TWS Voucher</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

