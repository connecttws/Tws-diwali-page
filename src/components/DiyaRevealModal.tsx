"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Check, Flame, X, User, Phone, Copy, CheckCircle2, Send, ExternalLink, Edit3, Loader2 } from "lucide-react";
import { DiyaOffer, saveClaimedLead, getSavedOpenedDiya, ClaimedLeadData } from "@/data/diyaOffers";
import { playDiwaliRevealChime } from "@/utils/audio";

interface DiyaRevealModalProps {
  offer: DiyaOffer;
  onClose: () => void;
}

export function DiyaRevealModal({ offer, onClose }: DiyaRevealModalProps) {
  const [copied, setCopied] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Check if user already claimed this or previous diya
    const saved = getSavedOpenedDiya();
    if (saved.claimedLead) {
      setFullName(saved.claimedLead.fullName || "");
      setContactNumber(saved.claimedLead.whatsappNumber || "");
      setIsSubmitted(true);
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

  const handleFormSubmit = async (e: React.FormEvent) => {
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

    // Save locally
    saveClaimedLead(lead);

    // Send lead to Google Sheet API
    try {
      await fetch("/api/lead", {
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
      });
    } catch (err) {
      console.error("Failed to post lead to Google Sheet API:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setIsEditing(false);

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
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello TWS Team! I have availed my Diwali Dhamaka Offer:
- Name: ${fullName || "TWS Client"}
- Contact Number: ${contactNumber || "Shared on Chat"}
- Diya: ${offer.number} (${offer.name})
- Unlocked Offer: ${offer.headline} (${offer.valueAmount})
- Voucher Code: ${offer.voucherCode}

Please confirm my offer deliverables!`
  );
  const whatsappUrl = `https://wa.me/917275895385?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1208]/80 backdrop-blur-md p-3 sm:p-5 flex items-center justify-center animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl sm:rounded-4xl border-2 border-[#C59114] shadow-[0_24px_70px_rgba(138,97,10,0.35)] overflow-hidden my-auto flex flex-col p-4 sm:p-7 text-center animate-scaleUp max-h-[92vh] overflow-y-auto">
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

        {/* Top Auspicious Badge */}
        <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#FCF4D9] border border-[#D4A017]/40 text-[#C59114] text-[10px] sm:text-xs font-black tracking-widest uppercase mx-auto mb-2 relative z-10 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C59114] fill-[#C59114]" />
          <span>Diya {offer.number} Opened · Festive Surprise!</span>
        </div>

        {/* Diya Name & Small Flame Art */}
        <div className="relative my-1 sm:my-2 flex flex-col items-center justify-center z-10">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#D4A017] via-[#E5B537] to-[#C59114] flex items-center justify-center shadow-md shadow-amber-500/25 mb-1.5">
            <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white animate-pulse" />
          </div>
          <h3 className="text-xs sm:text-sm font-extrabold text-[#7A6652]">
            {offer.name} <span className="text-[#8A610A]">({offer.hindiName})</span>
          </h3>
        </div>

        {/* Offer Headline & Value Amount */}
        <div className="my-2 sm:my-3 py-2 sm:py-3 border-y border-[#D4A017]/20 relative z-10">
          <div className="text-[10px] sm:text-xs font-black uppercase text-[#3E7B44] bg-[#3E7B44]/15 px-3 py-0.5 rounded-full inline-block mb-1.5 border border-[#3E7B44]/30">
            {offer.valueAmount}
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-[#1A1208] leading-snug mb-1">
            {offer.headline}
          </h2>
          <p className="text-[11px] sm:text-xs text-[#4A3B2C] max-w-sm mx-auto leading-relaxed font-normal">
            {offer.tagline}
          </p>
        </div>

        {/* Voucher Code Preview */}
        <div className="mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F0] border border-[#D4A017]/35 relative z-10 flex items-center justify-between gap-2 text-left">
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
            className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white border border-[#D4A017]/40 text-[#1A1208] text-[11px] font-bold hover:bg-[#F6F3EB] transition-colors cursor-pointer shrink-0 flex items-center gap-1 shadow-xs"
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

        {/* ========================================================================= */}
        {/* FORM: Avail your offer here..... (Name & Contact Number)                 */}
        {/* ========================================================================= */}
        <div className="relative z-10 text-left">
          {isSubmitted && !isEditing ? (
            /* Submission Success State */
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F4FAF5] via-[#EDF7EE] to-[#E6F4E8] border-2 border-[#3E7B44] shadow-sm animate-fadeIn">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-[#256029] bg-white px-2.5 py-0.5 rounded-full border border-[#3E7B44]/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7B44]" />
                  <span>Offer Registered</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A610A] hover:text-[#1A1208] transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-black text-[#1A1208] mb-0.5">
                Congratulations, {fullName}!
              </h4>
              <p className="text-[11px] sm:text-xs text-[#3E7B44] font-semibold mb-3">
                Your Diwali claim for <span className="underline font-bold">{offer.headline}</span> is recorded.
              </p>

              <div className="bg-white p-2.5 rounded-xl border border-[#3E7B44]/30 text-xs text-[#1A1208] mb-3.5 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#7A6652]">Contact:</span>
                  <span className="font-bold">{contactNumber}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#7A6652]">Voucher:</span>
                  <span className="font-mono font-bold text-[#C59114]">{offer.voucherCode}</span>
                </div>
              </div>

              {/* Instant WhatsApp kickoff */}
              <div className="space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-xs sm:text-sm text-center active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(37,211,102,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Connect on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 px-4 rounded-xl bg-white hover:bg-[#F6F3EB] text-[#4A3B2C] font-bold text-xs text-center border border-[#D4A017]/30 transition-colors cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* Lead Capture Form */
            <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5EFE3] border-2 border-[#D4A017] shadow-sm">
              <div className="mb-3 text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-black text-[#1A1208]">
                  Avail your offer here.....
                </h4>
                <p className="text-[11px] sm:text-xs text-[#4A3B2C] mt-0.5">
                  Enter your name and contact number to claim your Diwali gift.
                </p>
              </div>

              {formError && (
                <div className="mb-3 p-2 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs font-bold animate-fadeIn">
                  {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-2.5 sm:space-y-3">
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
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs text-[#1A1208] font-semibold placeholder:text-[#7A6652]/50 outline-none transition-all shadow-xs"
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
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs text-[#1A1208] font-semibold placeholder:text-[#7A6652]/50 outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-xs sm:text-sm hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_6px_20px_rgba(197,145,20,0.3)] cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-[#7A6652] text-center mt-1.5">
                    🔒 Your details are safe with TWS. We will reach out to confirm your offer.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
