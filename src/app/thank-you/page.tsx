"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { 
  Copy, 
  Check, 
  Gift, 
  ExternalLink, 
  ShieldCheck, 
  Flame, 
  Award, 
  Clock, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  Briefcase, 
  Send,
  CheckCircle2,
  Edit3
} from "lucide-react";
import { 
  getSavedOpenedDiya, 
  getDiyaOffer, 
  saveClaimedLead, 
  DIYA_OFFERS, 
  DiyaOffer, 
  ClaimedLeadData 
} from "@/data/diyaOffers";
import { playDiwaliRevealChime } from "@/utils/audio";
import { FestiveLights } from "@/components/FestiveLights";

const BUSINESS_CATEGORIES = [
  "E-Commerce / D2C Brand",
  "Real Estate & Construction",
  "Healthcare, Clinics & Doctors",
  "Fitness, Gym & Nutrition",
  "Coaching, EdTech & Consultants",
  "IT, Software & SaaS",
  "Professional Services & Agency",
  "Hospitality, Food & Restaurants",
  "Retail & Local Business",
  "Other Business / Startup"
];

export default function ThankYouPage() {
  const [offer, setOffer] = useState<DiyaOffer | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Lead Form State
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    email: "",
    businessCategory: BUSINESS_CATEGORIES[0],
  });
  const [isClaimed, setIsClaimed] = useState(false);
  const [formError, setFormError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

    if (!currentOffer) {
      currentOffer = DIYA_OFFERS[0];
    }

    setOffer(currentOffer);

    // Restore previously claimed lead data if available
    if (saved.claimedLead) {
      setFormData({
        fullName: saved.claimedLead.fullName || "",
        whatsappNumber: saved.claimedLead.whatsappNumber || "",
        email: saved.claimedLead.email || "",
        businessCategory: saved.claimedLead.businessCategory || BUSINESS_CATEGORIES[0],
      });
      setIsClaimed(true);
    }

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

      setTimeout(() => {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#D4A017", "#F5D372", "#FFE58F"],
          disableForReducedMotion: true,
        });
      }, 400);
    } catch {
      // Safe catch
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    const cleanPhone = formData.whatsappNumber.trim().replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormError("");

    if (!offer) return;

    const lead: ClaimedLeadData = {
      fullName: formData.fullName.trim(),
      whatsappNumber: formData.whatsappNumber.trim(),
      email: formData.email.trim(),
      businessCategory: formData.businessCategory,
      voucherCode: offer.voucherCode,
      diyaId: offer.id,
      claimedAt: new Date().toISOString(),
    };

    saveClaimedLead(lead);
    setIsClaimed(true);
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

  // Pre-filled WhatsApp message including lead details
  const whatsappMessage = encodeURIComponent(
    `Hello TWS Team! I have unlocked and claimed my Diwali Dhamaka Offer:
- Name: ${formData.fullName || "TWS Client"}
- WhatsApp: ${formData.whatsappNumber || "Shared on Chat"}
- Email: ${formData.email || "Shared on Chat"}
- Business Category: ${formData.businessCategory}
- Diya: ${offer.number} (${offer.name})
- Unlocked Offer: ${offer.headline} (${offer.valueAmount})
- Voucher Code: ${offer.voucherCode}

Please schedule my strategy kickoff session!`
  );
  const whatsappUrl = `https://wa.me/917042859955?text=${whatsappMessage}`;

  const emailSubject = encodeURIComponent(
    `TWS Diwali Dhamaka Claim: ${offer.headline} - ${formData.fullName || "Client"} (${offer.voucherCode})`
  );
  const emailBody = encodeURIComponent(
    `Hello TWS Team,\n\nI have claimed my Diwali Dhamaka offer:\n- Name: ${formData.fullName}\n- WhatsApp: ${formData.whatsappNumber}\n- Email: ${formData.email}\n- Business Category: ${formData.businessCategory}\n- Diya: ${offer.number} (${offer.name})\n- Offer: ${offer.headline} (${offer.valueAmount})\n- Voucher Code: ${offer.voucherCode}\n\nPlease guide me with the redemption and next steps.\n\nThank you!`
  );
  const emailUrl = `mailto:hello@tws.in?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1208] flex flex-col font-sans selection:bg-[#F5D372] selection:text-[#1A1208] relative overflow-x-hidden">
      {/* Smooth ambient twinkling lights */}
      <FestiveLights />

      {/* Elegant Header */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#D4A017]/20 py-3 sm:py-3.5 w-full shadow-xs">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D4A017] via-[#E5B537] to-[#C59114] flex items-center justify-center shadow-xs shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#1A1208] leading-none">
                TWS
              </span>
              <span className="font-bold text-[9px] sm:text-[10px] text-[#C59114] tracking-widest uppercase mt-0.5 leading-none">
                Diwali Dhamaka
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#3E7B44] bg-[#3E7B44]/15 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#3E7B44]/30 flex items-center gap-1.5 shadow-xs whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isClaimed ? "Offer Registered" : "Voucher Reserved"}</span>
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
            Your sacred Diwali Diya has revealed your exclusive offer. Complete your details below to formally avail and lock your voucher.
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
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1A1208] tabular-nums">
                  {offer.valueAmount}
                </div>
              </div>
              <span className="text-xs font-black text-[#3E7B44] uppercase bg-[#3E7B44]/15 px-2.5 py-1 sm:py-1.5 rounded-xl border border-[#3E7B44]/30">
                {offer.badge}
              </span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="py-4 sm:py-7 border-b border-[#D4A017]/20 relative z-10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1A1208] leading-tight mb-1.5 sm:mb-2">
              {offer.headline}
            </h3>
            <p className="text-xs sm:text-base text-[#4A3B2C] leading-relaxed font-medium">
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
              <span>What is Included in Your Offer:</span>
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
          <div className="py-4 sm:py-5 border-b border-[#D4A017]/20 relative z-10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs sm:text-sm text-[#7A6652] font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59114]" />
              <span>Valid for 60 days from Diwali 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#3E7B44]">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Exclusive Festive Voucher · Zero Hidden Cost</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* AVAIL THE OFFER FORM SECTION (Name, WhatsApp, Email, Business Category) */}
          {/* ========================================================================= */}
          <div className="pt-6 sm:pt-8 relative z-10">
            {isClaimed && !isEditing ? (
              /* Claimed Confirmation Card */
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#F4FAF5] via-[#EDF7EE] to-[#E6F4E8] border-2 border-[#3E7B44] shadow-md animate-fadeIn">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-[#256029] bg-white px-3 py-1 rounded-full border border-[#3E7B44]/30 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#3E7B44]" />
                    <span>Offer Successfully Registered</span>
                  </span>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8A610A] hover:text-[#1A1208] transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Details</span>
                  </button>
                </div>

                <h4 className="text-lg sm:text-2xl font-black text-[#1A1208] mb-1">
                  Congratulations, {formData.fullName}!
                </h4>
                <p className="text-xs sm:text-sm text-[#3E7B44] font-semibold mb-4">
                  Your festive claim for <span className="font-extrabold underline">{offer.headline}</span> is recorded.
                </p>

                {/* Summary Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-[#3E7B44]/30 text-xs text-[#1A1208] mb-5 shadow-xs">
                  <div>
                    <span className="text-[10px] text-[#7A6652] uppercase font-bold block">WhatsApp</span>
                    <span className="font-bold">{formData.whatsappNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6652] uppercase font-bold block">Email</span>
                    <span className="font-bold truncate block">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6652] uppercase font-bold block">Business Category</span>
                    <span className="font-bold">{formData.businessCategory}</span>
                  </div>
                </div>

                {/* Immediate WhatsApp / Email Kickoff Actions */}
                <div className="text-[11px] sm:text-xs uppercase font-bold text-[#256029] tracking-wider mb-2 text-center sm:text-left">
                  Connect With TWS Engineering to Activate:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-xs sm:text-base text-center active:scale-[0.98] transition-all shadow-[0_6px_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Connect on WhatsApp</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={emailUrl}
                    className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-[#F6F3EB] text-[#1A1208] font-black text-xs sm:text-base text-center border-2 border-[#D4A017]/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Confirm via Email</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              /* Avail Offer Registration Form */
              <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5EFE3] border-2 border-[#D4A017] shadow-lg">
                <div className="text-center sm:text-left mb-4 sm:mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#C59114] bg-white border border-[#D4A017]/40 px-3 py-1 rounded-full mb-2 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59114]" />
                    <span>Required to Avail Your Diwali Offer</span>
                  </span>
                  <h4 className="text-lg sm:text-2xl font-black text-[#1A1208]">
                    Fill Details to Avail This Offer
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A3B2C] mt-1">
                    Enter your business details below so our team can verify your voucher code and initiate your deliverables.
                  </p>
                </div>

                {formError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-bold animate-fadeIn">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-[#1A1208] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#C59114] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs sm:text-sm text-[#1A1208] font-semibold placeholder:text-[#7A6652]/50 outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-[#1A1208] uppercase tracking-wider mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#C59114] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={formData.whatsappNumber}
                          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs sm:text-sm text-[#1A1208] font-semibold placeholder:text-[#7A6652]/50 outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Email Address */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-[#1A1208] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#C59114] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rahul@company.com"
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs sm:text-sm text-[#1A1208] font-semibold placeholder:text-[#7A6652]/50 outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Business Category */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-[#1A1208] uppercase tracking-wider mb-1">
                        Business Category *
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-[#C59114] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={formData.businessCategory}
                          onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#D4A017]/40 focus:border-[#C59114] focus:ring-2 focus:ring-[#D4A017]/25 text-xs sm:text-sm text-[#1A1208] font-semibold outline-none transition-all shadow-xs cursor-pointer"
                        >
                          {BUSINESS_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#C59114] via-[#D4A017] to-[#E5B537] text-white font-black text-sm sm:text-base hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_8px_25px_rgba(197,145,20,0.35)] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Avail & Confirm My Diwali Offer</span>
                    </button>
                    <p className="text-[11px] sm:text-xs text-[#7A6652] text-center mt-2">
                      🔒 Your information is confidential and will only be used to process your Diwali gift.
                    </p>
                  </div>
                </form>
              </div>
            )}
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
