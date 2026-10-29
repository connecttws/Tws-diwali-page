"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Copy, Check, Gift, ExternalLink, ShieldCheck, Flame, Award, Clock, Sparkles } from "lucide-react";
import { getSavedOpenedDiya, getDiyaOffer, DIYA_OFFERS, DiyaOffer } from "@/data/diyaOffers";
import { playDiwaliRevealChime } from "@/utils/audio";
import { FestiveLights } from "@/components/FestiveLights";

export default function ThankYouPage() {
  const [offer, setOffer] = useState<DiyaOffer | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Fetch the opened diya from localStorage or URL parameter
    const saved = getSavedOpenedDiya();
    let currentOffer: DiyaOffer | undefined = saved.offer;

    if (!currentOffer) {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const urlDiyaId = urlParams.get("diya");
        if (urlDiyaId) {
          currentOffer = getDiyaOffer(urlDiyaId);
        }
      }
    }

    // Default to the first diya if not found
    if (!currentOffer) {
      currentOffer = DIYA_OFFERS[0];
    }

    setOffer(currentOffer);

    // Play auspicious temple bell chime
    playDiwaliRevealChime();

    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#D4A017", "#F5D372", "#FFFFFF", "#E65C00", "#3E7B44"],
        disableForReducedMotion: true,
      });

      // Second gentle wave
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#D4A017", "#F5D372", "#FFE58F"],
          disableForReducedMotion: true,
        });
      }, 400);
    } catch {
      // Safe catch for environment without canvas
    }
  }, []);

  const handleCopyCode = async () => {
    if (!offer) return;
    try {
      await navigator.clipboard.writeText(offer.voucherCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  if (!mounted || !offer) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <Flame className="w-10 h-10 text-[#C59114] animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-[#8A610A]">Preparing your festive surprise...</span>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1208] flex flex-col font-sans selection:bg-[#F5D372] selection:text-[#1A1208] relative overflow-x-hidden">
      {/* Smooth ambient twinkling lights */}
      <FestiveLights />

      {/* Elegant Header */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#D4A017]/20 py-3 sm:py-4 w-full shadow-xs">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D4A017] via-[#E5B537] to-[#C59114] flex items-center justify-center shadow-xs shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
            </div>
            <div className="flex items-baseline">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#1A1208]">TWS</span>
              <span className="font-bold text-xs text-[#C59114] tracking-wider uppercase ml-1.5 sm:ml-2 hidden sm:inline">
                Diwali Dhamaka
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#3E7B44] bg-[#3E7B44]/15 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#3E7B44]/30 flex items-center gap-1.5 shadow-xs whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Voucher Confirmed</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Thank You & Redemption Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3.5 sm:px-6 py-6 sm:py-12 relative z-10">
        {/* Celebration Greeting Banner */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#C59114] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2.5 sm:mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59114] fill-[#C59114]" />
            <span>Auspicious Diwali Surprise Unlocked</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-[#1A1208] tracking-tight leading-[1.15] sm:leading-[1.12]">
            Thank You for Celebrating with{" "}
            <span className="gold-text-shimmer font-black">TWS!</span>
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[#4A3B2C] mt-2 sm:mt-4 max-w-2xl mx-auto leading-relaxed px-1">
            Your sacred Diwali Diya has revealed an exclusive digital transformation reward. Your voucher is permanently reserved below.
          </p>
        </div>

        {/* Grand Festive Reward Card */}
        <div className="bg-[#FFFFFF] rounded-2xl sm:rounded-3xl lg:rounded-4xl border-2 border-[#C59114] shadow-[0_16px_50px_rgba(138,97,10,0.15)] p-4 sm:p-8 lg:p-10 relative overflow-hidden mb-6 sm:mb-8">
          {/* Top subtle ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[radial-gradient(ellipse,rgba(245,211,114,0.3)_0%,transparent_70%)] pointer-events-none" />

          {/* Diya Header Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-[#D4A017]/25 relative z-10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#C59114] to-[#E5B537] px-2.5 sm:px-3.5 py-1 rounded-full shadow-xs shrink-0">
                Diya {offer.number}
              </span>
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-[#1A1208]">
                  {offer.name}{" "}
                  <span className="text-[#8A610A] text-xs sm:text-base font-bold">
                    ({offer.hindiName})
                  </span>
                </h2>
                <p className="text-[11px] sm:text-sm text-[#7A6652] font-medium">
                  {offer.meaning}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D4A017]/15">
              <div className="text-left sm:text-right">
                <div className="text-[10px] sm:text-[11px] uppercase font-bold text-[#8A610A]">Service Value</div>
                <div className="text-xl sm:text-3xl font-black text-[#1A1208] tabular-nums">
                  {offer.valueAmount}
                </div>
              </div>
              <span className="text-xs font-black text-[#3E7B44] uppercase bg-[#3E7B44]/15 px-2.5 py-1 sm:py-1.5 rounded-xl border border-[#3E7B44]/30">
                100% Free
              </span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="py-4 sm:py-7 border-b border-[#D4A017]/20 relative z-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1A1208] leading-tight mb-1.5 sm:mb-2">
              {offer.headline}
            </h3>
            <p className="text-xs sm:text-base text-[#4A3B2C] leading-relaxed">
              {offer.tagline}
            </p>
          </div>

          {/* Voucher Code Box */}
          <div className="py-4 sm:py-7 border-b border-[#D4A017]/20 relative z-10">
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EC] to-[#F5EEDC] p-3.5 sm:p-6 border border-[#C59114]/40 shadow-xs">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs uppercase font-extrabold text-[#7A6652] tracking-wider mb-1">
                    Your Unique Diwali Voucher Code:
                  </div>
                  <code className="font-mono text-sm xs:text-base sm:text-xl lg:text-2xl font-black text-[#1A1208] tracking-wider select-all break-all block">
                    {offer.voucherCode}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  aria-label="Copy voucher code"
                  className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Voucher Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 stroke-[2.5]" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Deliverables Included */}
          <div className="py-4 sm:py-7 border-b border-[#D4A017]/20 relative z-10">
            <h4 className="text-xs sm:text-sm font-black uppercase text-[#C59114] tracking-wider mb-3 sm:mb-4 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>Key Deliverables Included (100% Free):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
              {offer.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#FAF7F0] border border-[#D4A017]/25 flex items-start gap-2.5 sm:gap-3"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#3E7B44] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#1A1208] leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Redemption Terms */}
          <div className="py-4 sm:py-5 relative z-10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs sm:text-sm text-[#7A6652] font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59114]" />
              <span>Valid for 60 days from Diwali 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#3E7B44]">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>100% Sponsored · Zero Upfront Cost</span>
            </div>
          </div>

          {/* Claim Action CTAs */}
          <div className="pt-3 sm:pt-4 relative z-10">
            <div className="text-[11px] sm:text-xs uppercase font-bold text-[#8A610A] tracking-wider mb-2.5 text-center sm:text-left">
              Redeem Immediately via Direct TWS Engineering Line:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-xs sm:text-base text-center active:scale-[0.98] transition-all shadow-[0_6px_20px_rgba(37,211,102,0.28)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim on WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={emailUrl}
                className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-[#F6F3EB] hover:bg-[#EFECE2] text-[#1A1208] font-black text-xs sm:text-base text-center border-2 border-[#D4A017]/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Claim via Email</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* TWS Devotion Guarantee Bar */}
        <div className="rounded-xl sm:rounded-3xl bg-[#FAF7F0] border border-[#D4A017]/30 p-4 sm:p-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#C59114] mb-1">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>The TWS Commitment</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4A3B2C] max-w-xl mx-auto leading-relaxed">
            Every deliverable in your Diwali package is handcrafted by senior product designers and full-stack architects. Quote your voucher code when messaging us to schedule your strategy kickoff.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D4A017]/25 bg-[#F6F3EB] text-[#4A3B2C] py-6 sm:py-8 text-center text-xs relative z-10 mt-auto px-4">
        <p className="font-semibold text-xs sm:text-sm text-[#1A1208] mb-1">
          “May your Diwali be filled with light, joy and new possibilities.”
        </p>
        <p className="text-[#7A6652]">
          © 2026 TWS (The Web Studio). All rights reserved. Diwali Dhamaka 2026.
        </p>
      </footer>
    </div>
  );
}
