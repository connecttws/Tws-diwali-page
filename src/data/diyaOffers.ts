export interface DiyaOffer {
  id: string;
  number: string;
  name: string;
  hindiName: string;
  meaning: string;
  headline: string;
  tagline: string;
  valueAmount: string;
  numericValue?: number;
  badge: string;
  isGrandPrize?: boolean;
  isBetterLuck?: boolean;
  deliverables: string[];
  terms: string[];
  voucherCode: string;
  accentColor: string;
}

export const DIYA_OFFERS: DiyaOffer[] = [
  {
    id: "diya-01",
    number: "01",
    name: "Ananta Diya",
    hindiName: "अनंत दीप",
    meaning: "The Lamp of Infinite Growth",
    headline: "BUY 3 MONTHS, GET 3 MONTHS FREE!",
    tagline: "₹25,000 – 3 Months Lead Generation Package: Get 6 Months of Lead Generation Services for just ₹25,000!",
    valueAmount: "Buy 3M, Get 3M Free",
    numericValue: 25000,
    badge: "Buy 3 Months, Get 3 Months Free!",
    deliverables: [
      "3 Months Lead Generation Package + 3 Months 100% FREE",
      "Get full 6 Months of continuous Lead Generation Services",
      "Special festive pricing: Total package for just ₹25,000",
      "Dedicated outreach campaign optimization and qualified sales prospects"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Quote voucher code to activate your 6-month package"
    ],
    voucherCode: "BONANZA-3M-LEADS-FREE",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-02",
    number: "02",
    name: "Surya Diya",
    hindiName: "सूर्य दीप",
    meaning: "The Lamp of Viral Reach & Radiance",
    headline: "BUY 10 REELS, GET 10 FREE!",
    tagline: "₹10,000 – 10-Reel Editing Package: Get 20 Professionally Edited Reels for just ₹10,000!",
    valueAmount: "10 + 10 Free Reels",
    numericValue: 10000,
    badge: "Buy 10 Reels, Get 10 Free!",
    deliverables: [
      "10-Reel Editing Package + 10 Extra Reels 100% FREE",
      "Total 20 professionally edited high-retention Reels / Shorts",
      "Dynamic captions, viral hooks, sound design & color grading",
      "Special festive pricing: 20 Reels for just ₹10,000"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Quote voucher code to claim your 20-reel package"
    ],
    voucherCode: "BONANZA-10PLUS10-REELS",
    accentColor: "#FF7A36"
  },
  {
    id: "diya-03",
    number: "03",
    name: "Tejas Diya",
    hindiName: "तेजस दीप",
    meaning: "The Lamp of Festive Prosperity",
    headline: "FLAT 30% OFF",
    tagline: "Get Flat 30% OFF on Any Social Media Management or Lead Generation Package!",
    valueAmount: "Flat 30% OFF",
    numericValue: 30,
    badge: "Flat 30% OFF on SMM or Leads",
    deliverables: [
      "Flat 30% instant discount on your chosen service retainer",
      "Applicable on Any Social Media Management package",
      "Applicable on Any Lead Generation package",
      "Zero hidden conditions — maximum festive savings on agency services"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Applicable on any SMM or Lead Generation package"
    ],
    voucherCode: "BONANZA-FLAT30-OFF",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-04",
    number: "04",
    name: "Lakshmi Diya",
    hindiName: "लक्ष्मी दीप",
    meaning: "The Lamp of Business Abundance",
    headline: "BUY 100, GET 50 FREE!",
    tagline: "₹18,000 – 100 Appointments Management Package: Get 150 Appointments Managed for just ₹18,000!",
    valueAmount: "100 + 50 Free Appts",
    numericValue: 18000,
    badge: "Buy 100, Get 50 Free!",
    deliverables: [
      "100 Appointments Management Package + 50 Extra FREE",
      "Total 150 qualified appointments managed end-to-end",
      "Calendar scheduling, prospect follow-ups, and reminder notifications",
      "Special festive pricing: 150 appointments for just ₹18,000"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Quote voucher code to activate 150 appointments"
    ],
    voucherCode: "BONANZA-100PLUS50-APPT",
    accentColor: "#E5B537"
  },
  {
    id: "diya-05",
    number: "05",
    name: "Shakti Diya",
    hindiName: "शक्ति दीप",
    meaning: "The Lamp of Sacred Festive Blessings",
    headline: "BETTER LUCK NEXT TIME!",
    tagline: "Thank you for celebrating Diwali with TWS! May this festive season bring you and your business boundless joy, light, and prosperity.",
    valueAmount: "Diwali Blessing",
    numericValue: 0,
    badge: "Festive Blessing",
    isBetterLuck: true,
    deliverables: [
      "Auspicious festive Diwali blessing from the entire TWS family",
      "Complimentary 30-minute business audit & strategy consultation",
      "Priority access to upcoming seasonal business toolkits and guides"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Feel free to connect with our team on WhatsApp anytime"
    ],
    voucherCode: "BONANZA-SHUBH-DIWALI-1",
    accentColor: "#E65C00"
  },
  {
    id: "diya-06",
    number: "06",
    name: "Prana Diya",
    hindiName: "प्राण दीप",
    meaning: "The Lamp of Vital Growth",
    headline: "BUY LEAD GENERATION, GET 50 FREE!",
    tagline: "₹25,000 – Lead Generation Package: Purchase the Lead Generation Package and Get 50 Appointments Management FREE!",
    valueAmount: "50 Free Appts",
    numericValue: 25000,
    badge: "50 Free Appointments Included",
    deliverables: [
      "Comprehensive Lead Generation Package (₹25,000)",
      "50 Appointments Management service included 100% FREE",
      "Targeted high-intent outreach + calendar booking coordination",
      "Zero extra fees for meeting scheduling and lead confirmations"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Quote voucher code upon package activation"
    ],
    voucherCode: "BONANZA-LEADS-50APPT",
    accentColor: "#C59114"
  },
  {
    id: "diya-07",
    number: "07",
    name: "Kanti Diya",
    hindiName: "कांति दीप",
    meaning: "The Lamp of Brilliant Presence",
    headline: "BUY 3 MONTHS, GET 1 MONTH FREE!",
    tagline: "₹36,000 – 3 Months Social Media Management Package: Get 4 Months of Social Media Management for just ₹36,000!",
    valueAmount: "Buy 3M, Get 1M Free",
    numericValue: 36000,
    badge: "Buy 3 Months, Get 1 Month Free!",
    deliverables: [
      "3 Months Social Media Management Package + 1 Month 100% FREE",
      "Get full 4 Months of high-impact Social Media Management for ₹36,000",
      "Complete content calendar, graphic design, reel ideation, and posting",
      "Dedicated social media manager and monthly growth analytics"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Applicable on Instagram, Facebook & LinkedIn"
    ],
    voucherCode: "BONANZA-3M-SMM-1MFREE",
    accentColor: "#FF9926"
  },
  {
    id: "diya-08",
    number: "08",
    name: "Jyoti Diya",
    hindiName: "ज्योति दीप",
    meaning: "The Lamp of Auspicious Fortune",
    headline: "BETTER LUCK NEXT TIME!",
    tagline: "Thank you for celebrating Diwali with TWS! May this festival of lights illuminate your journey with success and good fortune.",
    valueAmount: "Diwali Blessing",
    numericValue: 0,
    badge: "Festive Blessing",
    isBetterLuck: true,
    deliverables: [
      "Warm festive Diwali greetings from TWS founders and team",
      "Complimentary 30-minute growth strategy consultation call",
      "Exclusive seasonal business resources and framework guides"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Reach out to our team on WhatsApp anytime"
    ],
    voucherCode: "BONANZA-SHUBH-DIWALI-2",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-09",
    number: "09",
    name: "Shanti Diya",
    hindiName: "शांति दीप",
    meaning: "The Lamp of Digital Elevation",
    headline: "BUY 15 PREMIUM REELS, GET A FREE LANDING PAGE!",
    tagline: "₹15,000 – 15 Premium Reel Editing Package: Get a Customised Business Landing Page absolutely FREE!",
    valueAmount: "Free Landing Page Included",
    numericValue: 15000,
    badge: "Free Landing Page Included!",
    isGrandPrize: true,
    deliverables: [
      "15 Premium Reel Editing Package (₹15,000)",
      "Customised Business Landing Page designed & built absolutely FREE",
      "High-converting responsive landing page with WhatsApp / lead capture",
      "Cinematic reel editing with engaging typography, hooks, and sound design"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Landing page design and build delivered alongside reel package"
    ],
    voucherCode: "BONANZA-15REELS-FREELP",
    accentColor: "#E5B537"
  },
  {
    id: "diya-10",
    number: "10",
    name: "Vijaya Diya",
    hindiName: "विजय दीप",
    meaning: "The Lamp of Festive Victory",
    headline: "BUY ANY PACKAGE, GET 50% OFF ON ADD-ONS!",
    tagline: "Purchase Any Service Package and Unlock Flat 50% OFF on Additional Services and Add-ons.",
    valueAmount: "50% OFF Add-Ons",
    numericValue: 50,
    badge: "Flat 50% OFF on Add-Ons",
    deliverables: [
      "Purchase any primary TWS service package (SMM, Leads, Reels, Dev)",
      "Unlock Flat 50% OFF on any additional services and add-ons",
      "Valid for landing pages, extra reels, CRM integration, or campaigns",
      "Maximum flexibility to bundle high-value agency services at half price"
    ],
    terms: [
      "Valid for Diwali Bonanza 2026",
      "Quote voucher code when adding secondary services"
    ],
    voucherCode: "BONANZA-50OFF-ADDONS",
    accentColor: "#FFD98A"
  }
];

export const STORAGE_KEY_OPENED_DIYA = "tws_diwali_opened_diya_id";
export const STORAGE_KEY_IS_OPENED = "tws_diwali_is_opened";
export const STORAGE_KEY_VOUCHER_CODE = "tws_diwali_voucher_code";
export const STORAGE_KEY_OPENED_AT = "tws_diwali_opened_at";
export const STORAGE_KEY_CLAIMED_LEAD = "tws_diwali_claimed_lead";

// Legacy keys maintained for full compatibility
const LEGACY_STORAGE_KEY = "tws_diwali_selected_diya_id";
const LEGACY_REVEALED_KEY = "tws_diwali_revealed_state";

export function getDiyaOffer(id: string): DiyaOffer | undefined {
  return DIYA_OFFERS.find((d) => d.id === id);
}

export interface ClaimedLeadData {
  fullName: string;
  whatsappNumber: string;
  email?: string;
  businessCategory?: string;
  voucherCode: string;
  diyaId: string;
  claimedAt: string;
}

export interface OpenedDiyaState {
  isOpened: boolean;
  diyaId: string | null;
  offer?: DiyaOffer;
  voucherCode?: string;
  openedAt?: string;
  claimedLead?: ClaimedLeadData | null;
}

/**
 * Fetches the user's previously opened Diya from localStorage.
 */
export function getSavedOpenedDiya(): OpenedDiyaState {
  if (typeof window === "undefined") {
    return { isOpened: false, diyaId: null };
  }
  try {
    const isOpenedFlag =
      localStorage.getItem(STORAGE_KEY_IS_OPENED) === "true" ||
      localStorage.getItem(LEGACY_REVEALED_KEY) === "true";

    const diyaId =
      localStorage.getItem(STORAGE_KEY_OPENED_DIYA) ||
      localStorage.getItem(LEGACY_STORAGE_KEY);

    let claimedLead: ClaimedLeadData | null = null;
    const rawLead = localStorage.getItem(STORAGE_KEY_CLAIMED_LEAD);
    if (rawLead) {
      try {
        claimedLead = JSON.parse(rawLead);
      } catch {
        claimedLead = null;
      }
    }

    if (diyaId && isOpenedFlag) {
      const offer = getDiyaOffer(diyaId);
      const voucherCode =
        localStorage.getItem(STORAGE_KEY_VOUCHER_CODE) || offer?.voucherCode;
      const openedAt = localStorage.getItem(STORAGE_KEY_OPENED_AT) || undefined;

      return {
        isOpened: true,
        diyaId,
        offer,
        voucherCode,
        openedAt,
        claimedLead,
      };
    }

    return { isOpened: false, diyaId: null, claimedLead };
  } catch {
    return { isOpened: false, diyaId: null };
  }
}

/**
 * Permanently marks the Diya as opened in localStorage.
 */
export function saveOpenedDiya(diyaId: string): void {
  if (typeof window === "undefined") return;
  try {
    const offer = getDiyaOffer(diyaId);
    const now = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY_OPENED_DIYA, diyaId);
    localStorage.setItem(STORAGE_KEY_IS_OPENED, "true");
    localStorage.setItem(LEGACY_STORAGE_KEY, diyaId);
    localStorage.setItem(LEGACY_REVEALED_KEY, "true");
    localStorage.setItem(STORAGE_KEY_OPENED_AT, now);

    if (offer) {
      localStorage.setItem(STORAGE_KEY_VOUCHER_CODE, offer.voucherCode);
    }
  } catch {
    // Graceful fallback
  }
}

/**
 * Saves the user's claim details (Name, WhatsApp, Email, Business Category).
 */
export function saveClaimedLead(data: ClaimedLeadData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CLAIMED_LEAD, JSON.stringify(data));
  } catch {
    // Graceful fallback
  }
}
