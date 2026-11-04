"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Check,
  Flame,
  X,
  User,
  Phone,
  Copy,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Gift,
} from "lucide-react";
import {
  DiyaOffer,
  saveClaimedLead,
  saveOpenedDiya,
  getSavedOpenedDiya,
  ClaimedLeadData,
} from "@/data/diyaOffers";
import { playDiwaliRevealChime } from "@/utils/audio";

interface DiyaRevealModalProps {
  offer: DiyaOffer;
  isAlreadyOpened?: boolean;
  onOfferUnlocked?: (diyaId: string) => void;
  onClose: () => void;
}

export function DiyaRevealModal({
  offer,
  isAlreadyOpened = false,
  onOfferUnlocked,
  onClose,
}: DiyaRevealModalProps) {
  const [copied, setCopied] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    // If user already opened and claimed this Diya previously, show revealed offer directly
    const saved = getSavedOpenedDiya();
    if (isAlreadyOpened || (saved.isOpened && saved.diyaId === offer.id)) {
      if (saved.claimedLead) {
        setFullName(saved.claimedLead.fullName || "");
        setContactNumber(saved.claimedLead.whatsappNumber || "");
      }
      setIsSubmitted(true);
    }
  }, [offer, isAlreadyOpened]);

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

  const getWhatsappUrl = (name: string, phone: string) => {
    const text = offer.isBetterLuck
      ? `Hello TWS Team! I opened Diya ${offer.number} (${offer.name}) in Diwali Bonanza:
- Name: ${name || "TWS Visitor"}
- Contact Number: ${phone || "Shared on Chat"}
- Diya: ${offer.number} (${offer.name})
- Result: ${offer.headline}
- Voucher Code: ${offer.voucherCode}

I would love to connect for the complimentary 30-minute strategy consultation!`
      : `Hello TWS Team! I unlocked my Diwali Bonanza Offer:
- Name: ${name || "TWS Client"}
- Contact Number: ${phone || "Shared on Chat"}
- Diya: ${offer.number} (${offer.name})
- Unlocked Offer: ${offer.headline} (${offer.valueAmount})
- Voucher Code: ${offer.voucherCode}

Please confirm my offer deliverables!`;

    return `https://wa.me/917275895385?text=${encodeURIComponent(text)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setFormError("Please enter your name.");
      return;
    }

    const cleanPhone = contactNumber.trim().replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit contact number.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    const lead: ClaimedLeadData = {
      fullName: fullName.trim(),
      whatsappNumber: contactNumber.trim(),
      voucherCode: offer.voucherCode,
      diyaId: offer.id,
      claimedAt: new Date().toISOString(),
    };

    // 1. Save locally
    saveOpenedDiya(offer.id);
    saveClaimedLead(lead);

    // 2. Notify parent grid that offer is now officially unlocked
    if (onOfferUnlocked) {
      onOfferUnlocked(offer.id);
    }

    // 3. Fire Google Sheets lead API asynchronously
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName.trim(),
        phone: contactNumber.trim(),
        diyaNumber: offer.number,
        diyaName: offer.name,
        offerHeadline: offer.headline,
        offerValue: offer.valueAmount,
        voucherCode: offer.voucherCode,
      }),
    }).catch((err) => console.error("Failed to post lead to Google Sheet API:", err));

    // 4. Play festive reveal sound & fire confetti
    playDiwaliRevealChime();
    try {
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#25D366", "#D4A017", "#F5D372", "#FFFFFF"],
      });
    } catch {
      // Safe catch
    }

    // 5. Open WhatsApp directly!
    const waUrl = getWhatsappUrl(fullName.trim(), contactNumber.trim());
    window.open(waUrl, "_blank");

    // 6. Reveal the offer in the modal
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const currentWhatsappUrl = getWhatsappUrl(fullName, contactNumber);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] overflow-y-auto bg-[#1A1208]/85 backdrop-blur-md p-3 sm:p-5 flex items-center justify-center animate-fadeIn overscroll-contain"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl sm:rounded-4xl border-2 border-[#C59114] shadow-[0_24px_70px_rgba(138,97,10,0.35)] overflow-hidden my-auto flex flex-col p-4 sm:p-7 text-center animate-scaleUp max-h-[90dvh] sm:max-h-[92vh] overflow-y-auto overscroll-contain z-10">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-[radial-gradient(ellipse,rgba(245,211,114,0.45)_0%,transparent_70%)] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#F6F3EB] text-[#4A3B2C] hover:text-[#1A1208] border border-[#D4A017]/30 flex items-center justify-center transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ========================================================================= */}
        {/* VIEW 1: BEFORE SUBMIT -> ONLY FORM SECTION SHOWS (OFFER IS HIDDEN)        */}
        {/* ========================================================================= */}
        {!isSubmitted ? (
          <div className="relative z-10 flex flex-col animate-fadeIn">
            {/* Top Auspicious Badge */}
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF4D9] border border-[#D4A017]/40 text-[#C59114] text-[10px] sm:text-xs font-black tracking-widest uppercase mx-auto mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C59114] fill-[#C59114]" />
              <span>Diya {offer.number} Selected · Diwali Bonanza</span>
            </div>

            {/* Diya Name & Auspicious Flame Icon */}
            <div className="my-1.5 sm:my-2.5 flex flex-col items-center justify-center">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#D4A017] via-[#E5B537] to-[#C59114] flex items-center justify-center shadow-md shadow-amber-500/25 mb-1.5">
                <Flame className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white animate-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#1A1208]">
                {offer.name} <span className="text-[#8A610A] font-bold">({offer.hindiName})</span>
              </h3>
              <p className="text-xs text-[#7A6652] font-semibold mt-0.5">
                {offer.meaning}
              </p>
            </div>

            {/* Mystery Teaser (Offer is hidden behind this) */}
            <div className="my-2.5 sm:my-3.5 p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-[#FCF7ED] via-[#FAF3E3] to-[#F5EAD2] border border-[#D4A017]/45 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#8A610A] uppercase tracking-wider mb-1">
                <Gift className="w-3.5 h-3.5 text-[#C59114]" />
                <span>Sacred Diwali Surprise Waiting Inside</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A3B2C] font-semibold leading-relaxed">
                Enter your Name & Contact Number below to reveal your lucky offer and connect directly on WhatsApp!
              </p>
            </div>

            {/* Form Section */}
            <div className="text-left p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5EFE3] border-2 border-[#D4A017] shadow-sm">
              <div className="mb-3 text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-black text-[#1A1208]">
                  Avail your offer here.....
                </h4>
                <p className="text-[11px] sm:text-xs text-[#4A3B2C] mt-0.5 font-medium">
                  Enter your details to unlock and claim your Diwali Bonanza gift.
                </p>
              </div>

              {formError && (
                <div className="mb-3 p-2 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs font-bold animate-fadeIn">
                  {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-[#1A1208] uppercase tracking-wider mb-1">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#C59114] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs sm:text-sm text-[#1A1208] font-semibold placeholder:text-[#7A6652]/50 outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold text-[#1A1208] uppercase tracking-wider mb-1">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#C59114] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="e.g. 7275895385"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs sm:text-sm text-[#1A1208] font-semibold placeholder:text-[#7A6652]/50 outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-xs sm:text-sm hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_6px_20px_rgba(197,145,20,0.3)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Unlocking Offer...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4 text-white fill-white" />
                        <span>Reveal Offer & Connect on WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-[#7A6652] text-center mt-2 font-medium">
                    🔒 100% Free · Instantly unlocks your Diwali Bonanza Offer & WhatsApp link
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: AFTER SUBMIT -> FULL REVEALED OFFER DETAILS SHOW                  */
          /* ========================================================================= */
          <div className="relative z-10 flex flex-col text-left animate-fadeIn">
            {/* Top Unlocked Badge */}
            <div className="text-center mb-2">
              <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7EE] border border-[#3E7B44]/40 text-[#256029] text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B44]" />
                <span>Diya {offer.number} Unlocked · Diwali Bonanza</span>
              </span>
            </div>

            {/* Diya Header */}
            <div className="text-center my-1">
              <h3 className="text-sm sm:text-base font-extrabold text-[#7A6652]">
                {offer.name} <span className="text-[#8A610A]">({offer.hindiName})</span>
              </h3>
            </div>

            {/* Offer Headline & Value Badge */}
            <div className="my-2.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F0] to-[#F5EAD2] border-2 border-[#C59114] shadow-sm text-center">
              <div className={`text-[10px] sm:text-xs font-black uppercase px-3 py-0.5 rounded-full inline-block mb-1.5 border ${
                offer.isBetterLuck
                  ? "text-[#C59114] bg-[#FCF4D9] border-[#D4A017]/40"
                  : "text-[#3E7B44] bg-[#3E7B44]/15 border-[#3E7B44]/30"
              }`}>
                {offer.valueAmount}
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-[#1A1208] leading-snug mb-1">
                {offer.headline}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#4A3B2C] max-w-sm mx-auto leading-relaxed font-normal">
                {offer.tagline}
              </p>
            </div>

            {/* Included Deliverables */}
            <div className="mb-3 p-3 rounded-xl bg-[#FAF7F0] border border-[#D4A017]/30 space-y-1.5">
              <div className="text-[10px] font-bold uppercase text-[#7A6652] tracking-wider mb-1">
                Included Offer Deliverables:
              </div>
              {offer.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-[#1A1208] leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B44] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Voucher Code Preview */}
            <div className="mb-3.5 p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] border border-[#D4A017]/40 flex items-center justify-between gap-2 shadow-xs">
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-[#7A6652]">
                  Voucher Code:
                </div>
                <code className="font-mono text-xs sm:text-sm font-black text-[#1A1208] tracking-wider truncate block">
                  {offer.voucherCode}
                </code>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#FAF7F0] border border-[#D4A017]/40 text-[#1A1208] text-[11px] font-bold hover:bg-[#F6F3EB] transition-colors cursor-pointer shrink-0 flex items-center gap-1 shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#3E7B44] stroke-[3]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#C59114]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons: WhatsApp & Close */}
            <div className="space-y-2">
              <a
                href={currentWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-xs sm:text-sm text-center active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(37,211,102,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F0] hover:bg-[#F6F3EB] text-[#4A3B2C] font-bold text-xs text-center border border-[#D4A017]/30 transition-colors cursor-pointer"
              >
                Done & View on Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
