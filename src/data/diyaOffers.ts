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
    meaning: "The Lamp of Infinite Creativity",
    headline: "5 Free Reels Edits",
    tagline: "5 free Reels edits — kisi bhi service ke saath.",
    valueAmount: "5 Free Reels",
    numericValue: 15000,
    badge: "Free Service Add-On",
    deliverables: [
      "5 professionally edited Reels / Shorts for your brand",
      "Dynamic typography, viral captions, and sound design",
      "Valid with any TWS digital, marketing, or web service"
    ],
    terms: [
      "Valid for 60 days from Diwali 2026",
      "Applicable alongside any active TWS service package",
      "Can be redeemed immediately by quoting voucher code"
    ],
    voucherCode: "DHAMAKA-5REELS-FREE",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-02",
    number: "02",
    name: "Surya Diya",
    hindiName: "सूर्य दीप",
    meaning: "The Lamp of Outreach & Energy",
    headline: "20 Leads Par Free Calling",
    tagline: "20 leads par free calling — hum leads ko call karke meetings book karenge.",
    valueAmount: "20 Free Calls",
    numericValue: 20000,
    badge: "Free Calling & Meetings",
    deliverables: [
      "Dedicated outbound calling to 20 prospective business leads",
      "Custom high-converting calling script tailored to your offer",
      "Direct qualified calendar meeting bookings for your sales team"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Lead list provided by client or sourced via campaign"
    ],
    voucherCode: "DHAMAKA-20LEADS-CALL",
    accentColor: "#FF7A36"
  },
  {
    id: "diya-03",
    number: "03",
    name: "Tejas Diya",
    hindiName: "तेजस दीप",
    meaning: "The Lamp of Value & Radiance",
    headline: "30% OFF on Any Service",
    tagline: "30% off — kisi bhi service ki final price par.",
    valueAmount: "Flat 30% OFF",
    numericValue: 30000,
    badge: "Flat 30% Discount",
    deliverables: [
      "Flat 30% discount applied directly to your final project price",
      "Applicable across web development, design, branding, or marketing",
      "No upper cap — maximum festive savings on your project"
    ],
    terms: [
      "Valid for 60 days from Diwali 2026",
      "Applicable to new project contracts and renewals"
    ],
    voucherCode: "DHAMAKA-FLAT30-OFF",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-04",
    number: "04",
    name: "Lakshmi Diya",
    hindiName: "लक्ष्मी दीप",
    meaning: "The Lamp of Digital Prosperity",
    headline: "Free Custom Landing Page",
    tagline: "Free landing page — aap apni requirement ke hisaab se content/features choose kar sakte hain.",
    valueAmount: "100% Free Landing Page",
    numericValue: 35000,
    badge: "Grand Free Landing Page",
    isGrandPrize: true,
    deliverables: [
      "Custom high-converting landing page built for your business",
      "Complete freedom to choose your required content, sections, and features",
      "Mobile-optimized, ultra-fast performance, and WhatsApp/lead capture"
    ],
    terms: [
      "Valid for 60 days from Diwali 2026",
      "Includes UI design, modern responsive coding, and launch support"
    ],
    voucherCode: "DHAMAKA-FREE-LANDINGPAGE",
    accentColor: "#E5B537"
  },
  {
    id: "diya-05",
    number: "05",
    name: "Shakti Diya",
    hindiName: "शक्ति दीप",
    meaning: "The Lamp of Creator Power",
    headline: "2 Creators Ke Final-Edited Videos",
    tagline: "2 creators ke final-edited videos — apne brand ke liye, jahan chahein use karein.",
    valueAmount: "2 Creator Videos",
    numericValue: 25000,
    badge: "2 Creator Videos Free",
    deliverables: [
      "2 authentic creator videos produced for your brand or product",
      "Script concept, creator management, and final video editing",
      "Full commercial rights to use across Instagram, Meta ads, and web"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Creators selected to match your specific industry niche"
    ],
    voucherCode: "DHAMAKA-2CREATOR-VID",
    accentColor: "#E65C00"
  },
  {
    id: "diya-06",
    number: "06",
    name: "Prana Diya",
    hindiName: "प्राण दीप",
    meaning: "The Lamp of Longevity & Growth",
    headline: "3-Month Package Par 3 Months Free",
    tagline: "3-month package par 3 months free — get 6 months of full growth for the price of 3.",
    valueAmount: "3 Months Free",
    numericValue: 50000,
    badge: "Buy 3, Get 3 Free",
    deliverables: [
      "Pay for 3 months retainer and receive next 3 months 100% free",
      "Continuous marketing, development, or creative execution",
      "Massive 6-month growth runway with dedicated agency support"
    ],
    terms: [
      "Valid for 60 days from Diwali 2026",
      "Applicable to social media, performance marketing, or tech retainers"
    ],
    voucherCode: "DHAMAKA-3PLUS3-FREE",
    accentColor: "#C59114"
  },
  {
    id: "diya-07",
    number: "07",
    name: "Kanti Diya",
    hindiName: "कांति दीप",
    meaning: "The Lamp of Local Prominence",
    headline: "2 Months Free GMB Profile Management",
    tagline: "2 months free GMB profile management — social media ya lead-generation package ke saath.",
    valueAmount: "2 Months Free GMB",
    numericValue: 18000,
    badge: "2 Months Free GMB",
    deliverables: [
      "Google Business Profile optimization and local map pack ranking",
      "Weekly post updates, keyword-rich photo posts, and review strategy",
      "Complimentary with any social media or lead generation package"
    ],
    terms: [
      "Valid for 60 days from Diwali 2026",
      "Applies alongside any new social media or lead-generation engagement"
    ],
    voucherCode: "DHAMAKA-2M-GMB-FREE",
    accentColor: "#FF9926"
  },
  {
    id: "diya-08",
    number: "08",
    name: "Jyoti Diya",
    hindiName: "ज्योति दीप",
    meaning: "The Lamp of Sales Enlightenment",
    headline: "Exclusive Sales Guide (Worth ₹2,500)",
    tagline: "Sales Guide, worth ₹2,500 — actionable sales conversion and objection-handling blueprint.",
    valueAmount: "Worth ₹2,500",
    numericValue: 2500,
    badge: "Worth ₹2,500 · Free Access",
    deliverables: [
      "Proven high-ticket closing scripts and sales psychology framework",
      "Step-by-step objection handling templates for consultations",
      "Actionable sales blueprint worth ₹2,500 delivered straight to your inbox"
    ],
    terms: [
      "Instant lifetime digital access upon registration",
      "Includes implementation checklist and objection cheat-sheet"
    ],
    voucherCode: "DHAMAKA-SALES-GUIDE",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-09",
    number: "09",
    name: "Shanti Diya",
    hindiName: "शांति दीप",
    meaning: "The Lamp of Festive Blessing",
    headline: "Better Luck Next Time!",
    tagline: "Thank you for celebrating Diwali with TWS! May this festive season bring you and your business boundless joy and prosperity.",
    valueAmount: "Diwali Blessing",
    numericValue: 0,
    badge: "Festive Token",
    isBetterLuck: true,
    deliverables: [
      "Auspicious festive blessing from the entire TWS engineering family",
      "Complimentary 30-minute growth strategy consultation with TWS",
      "Priority access to upcoming seasonal business resources and workshops"
    ],
    terms: [
      "Free 30-min strategy session valid for 30 days",
      "Connect with our founders anytime on WhatsApp"
    ],
    voucherCode: "DHAMAKA-SHUBH-DIWALI",
    accentColor: "#E5B537"
  },
  {
    id: "diya-10",
    number: "10",
    name: "Vijaya Diya",
    hindiName: "विजय दीप",
    meaning: "The Lamp of Social Victory",
    headline: "1 Month of Social Media Free",
    tagline: "1 month of social media free — 1 paid month lene par.",
    valueAmount: "1 Month Free SMM",
    numericValue: 25000,
    badge: "Buy 1 Month, Get 1 Free",
    deliverables: [
      "Full month social media content calendar, design, and posting",
      "Buy 1 month of social media and get the next month 100% free",
      "Custom graphics, reel ideation, captions, and hashtag strategy"
    ],
    terms: [
      "Valid for 60 days from Diwali 2026",
      "Valid for Instagram, LinkedIn, and Facebook brand channels"
    ],
    voucherCode: "DHAMAKA-1M-SMM-FREE",
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
  email: string;
  businessCategory: string;
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
