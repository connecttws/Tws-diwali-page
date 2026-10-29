export interface DiyaOffer {
  id: string;
  number: string;
  name: string;
  hindiName: string;
  meaning: string;
  headline: string;
  tagline: string;
  valueAmount: string;
  numericValue: number;
  badge: string;
  isGrandPrize?: boolean;
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
    meaning: "The Lamp of Infinite Potential",
    headline: "Full Brand Identity & Complete Web Revamp",
    tagline: "The Grand Dhamaka Prize — Elevate your enterprise presence to global standards.",
    valueAmount: "₹50,000",
    numericValue: 50000,
    badge: "Grand Festive Prize · 100% Free",
    isGrandPrize: true,
    deliverables: [
      "Complete design system overhaul (Typography, Color Palette, UI Tokens)",
      "Bespoke high-performance web experience redesign (up to 5 core pages)",
      "Interactive motion design, responsive layouts, and modern frontend code",
      "Executive design review with TWS Principal Architect"
    ],
    terms: [
      "Valid for 60 days from Diwali 2026",
      "Applicable to new builds or redesigns of existing web platforms",
      "Can be transferred once to a registered business partner"
    ],
    voucherCode: "DHAMAKA-ANANTA-50K-8F2X",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-02",
    number: "02",
    name: "Surya Diya",
    hindiName: "सूर्य दीप",
    meaning: "The Lamp of Solar Radiance & Speed",
    headline: "SEO, Core Web Vitals & Speed Architecture Overhaul",
    tagline: "Attain top-tier Lighthouse 95+ scores and organic discoverability.",
    valueAmount: "₹35,000",
    numericValue: 35000,
    badge: "Performance Architecture · 100% Free",
    deliverables: [
      "Deep Core Web Vitals audit (LCP, INP, CLS optimization)",
      "Technical SEO infrastructure, Schema.org rich snippets & OpenGraph setup",
      "Bundle size optimization, asset compression, and edge caching config",
      "Before-and-after audit report with measurable page speed improvements"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Includes implementation guidance or direct codebase PR integration"
    ],
    voucherCode: "DHAMAKA-SURYA-35K-9M4Q",
    accentColor: "#FF7A36"
  },
  {
    id: "diya-03",
    number: "03",
    name: "Tejas Diya",
    hindiName: "तेजस दीप",
    meaning: "The Lamp of Radiance & Intelligence",
    headline: "Custom AI Integration & Workflow Automation Sprint",
    tagline: "Empower your business operations with custom Gemini AI capabilities.",
    valueAmount: "₹25,000",
    numericValue: 25000,
    badge: "AI Architecture · 100% Free",
    deliverables: [
      "Custom Gemini API workflow design tailored to your product pipeline",
      "Automated prompt engineering, function calling, or data extraction pipeline",
      "Secure backend proxy implementation with rate limiting and secret storage",
      "Working prototype and comprehensive deployment checklist"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Covers architecture, integration code, and testing in staging"
    ],
    voucherCode: "DHAMAKA-TEJAS-25K-3P7Z",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-04",
    number: "04",
    name: "Lakshmi Diya",
    hindiName: "लक्ष्मी दीप",
    meaning: "The Lamp of Prosperity & Delight",
    headline: "Flagship UI/UX Redesign Sprint for Your Core Product",
    tagline: "Turn friction into flow with world-class product interface design.",
    valueAmount: "₹20,000",
    numericValue: 20000,
    badge: "Design Sprint · 100% Free",
    deliverables: [
      "Heuristic usability audit of your current user flow and checkout funnel",
      "High-fidelity desktop & mobile component redesign in Figma/Tailwind",
      "Accessibility & WCAG AA contrast compliance pass",
      "Component library handoff ready for immediate engineering implementation"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Applicable to SaaS dashboards, e-commerce checkouts, or mobile apps"
    ],
    voucherCode: "DHAMAKA-LAKSHMI-20K-4V1R",
    accentColor: "#FFD98A"
  },
  {
    id: "diya-05",
    number: "05",
    name: "Kanti Diya",
    hindiName: "कांति दीप",
    meaning: "The Lamp of Brilliance & Efficiency",
    headline: "Cloud Infrastructure, Docker & DevOps Speed Package",
    tagline: "Scale seamlessly with rock-solid serverless or container deployment.",
    valueAmount: "₹15,000",
    numericValue: 15000,
    badge: "DevOps Package · 100% Free",
    deliverables: [
      "Cloud Run / Kubernetes / Vercel architecture optimization",
      "Automated CI/CD GitHub Actions workflow build",
      "Environment security hardening, secrets management & SSL setup",
      "Production readiness checklist & monitoring guidelines"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Applies to Node.js, Next.js, Python, or Go microservices"
    ],
    voucherCode: "DHAMAKA-KANTI-15K-2W8L",
    accentColor: "#8EAF83"
  },
  {
    id: "diya-06",
    number: "06",
    name: "Mangal Diya",
    hindiName: "मंगल दीप",
    meaning: "The Lamp of Auspicious Growth",
    headline: "Mobile-First PWA & Offline Experience Transformation",
    tagline: "Give your users an installable, lightning-fast app experience.",
    valueAmount: "₹30,000",
    numericValue: 30000,
    badge: "Mobile Web · 100% Free",
    deliverables: [
      "Complete Progressive Web App (PWA) manifest and service worker integration",
      "Offline caching strategy, background sync, and install prompt",
      "Touch-optimized gesture handling and responsive mobile UI refinement",
      "Lighthouse PWA compliance verification and testing"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Compatible with any modern React, Next.js, or Vue web project"
    ],
    voucherCode: "DHAMAKA-MANGAL-30K-7Y2B",
    accentColor: "#FF7A36"
  },
  {
    id: "diya-07",
    number: "07",
    name: "Jyoti Diya",
    hindiName: "ज्योति दीप",
    meaning: "The Lamp of Illuminating Clarity",
    headline: "Conversion Rate Optimization (CRO) & Funnel Audit",
    tagline: "Diagnose drop-offs, sharpen value propositions, and double conversions.",
    valueAmount: "₹25,000",
    numericValue: 25000,
    badge: "Growth Engine · 100% Free",
    deliverables: [
      "Detailed analysis of user scroll maps, drop-offs, and micro-copy friction",
      "3 high-impact A/B test hypotheses with ready-to-test variant wireframes",
      "Hero section & CTA restructuring for immediate clarity",
      "Executive summary presentation with prioritized engineering roadmap"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Applicable to landing pages, lead capture funnels, or subscription flows"
    ],
    voucherCode: "DHAMAKA-JYOTI-25K-1D9S",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-08",
    number: "08",
    name: "Shanti Diya",
    hindiName: "शांति दीप",
    meaning: "The Lamp of Peace of Mind & Security",
    headline: "Web Application Security & Vulnerability Assessment",
    tagline: "Sleep soundly knowing your frontend, auth, and APIs are fortified.",
    valueAmount: "₹18,000",
    numericValue: 18000,
    badge: "Security Audit · 100% Free",
    deliverables: [
      "OWASP Top 10 vulnerability scan across client and server endpoints",
      "Authentication flow, cookie attributes, CORS, and CSRF token audit",
      "Third-party dependency vulnerability mitigation plan",
      "Confidential remediation report with exact code snippets"
    ],
    terms: [
      "Valid for 45 days from issue date",
      "Confidentiality non-disclosure agreement provided"
    ],
    voucherCode: "DHAMAKA-SHANTI-18K-5K3M",
    accentColor: "#8EAF83"
  },
  {
    id: "diya-09",
    number: "09",
    name: "Prabha Diya",
    hindiName: "प्रभा दीप",
    meaning: "The Lamp of Radiance & Foundation",
    headline: "Enterprise REST / GraphQL API Architecture Design",
    tagline: "Build a scalable, resilient backend backbone for high-traffic products.",
    valueAmount: "₹40,000",
    numericValue: 40000,
    badge: "Backend Architecture · 100% Free",
    deliverables: [
      "Scalable API contract definition (OpenAPI / Swagger 3.0 specs)",
      "Database schema optimization (PostgreSQL / Firestore indexing strategies)",
      "Authentication & role-based access control (RBAC) blueprint",
      "Postman collection with automated test suites"
    ],
    terms: [
      "Valid for 60 days from issue date",
      "Includes 2 architectural consulting sessions with Lead Engineers"
    ],
    voucherCode: "DHAMAKA-PRABHA-40K-6T5N",
    accentColor: "#F5BD55"
  },
  {
    id: "diya-10",
    number: "10",
    name: "Vijaya Diya",
    hindiName: "विजया दीप",
    meaning: "The Lamp of Victory & Sustained Excellence",
    headline: "3-Month Priority Engineering & Design Advisory Retainer",
    tagline: "Direct weekly advisory and code reviews from senior TWS architects.",
    valueAmount: "₹22,000",
    numericValue: 22000,
    badge: "Executive Advisory · 100% Free",
    deliverables: [
      "Bi-weekly 1-on-1 technical strategy sessions with TWS Founders",
      "Asynchronous pull request code reviews and architecture guidance",
      "Direct Slack/Discord channel access for quick design & stack decisions",
      "Quarterly technical roadmap alignment document"
    ],
    terms: [
      "Valid for 90 days from activation date",
      "Ideal for founders, CTOs, and product engineering teams"
    ],
    voucherCode: "DHAMAKA-VIJAYA-22K-9C4H",
    accentColor: "#FFD98A"
  }
];

export const STORAGE_KEY_OPENED_DIYA = "tws_diwali_opened_diya_id";
export const STORAGE_KEY_IS_OPENED = "tws_diwali_is_opened";
export const STORAGE_KEY_VOUCHER_CODE = "tws_diwali_voucher_code";
export const STORAGE_KEY_OPENED_AT = "tws_diwali_opened_at";

// Legacy keys maintained for full compatibility
const LEGACY_STORAGE_KEY = "tws_diwali_selected_diya_id";
const LEGACY_REVEALED_KEY = "tws_diwali_revealed_state";

export function getDiyaOffer(id: string): DiyaOffer | undefined {
  return DIYA_OFFERS.find((d) => d.id === id);
}

export interface OpenedDiyaState {
  isOpened: boolean;
  diyaId: string | null;
  offer?: DiyaOffer;
  voucherCode?: string;
  openedAt?: string;
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
      };
    }

    return { isOpened: false, diyaId: null };
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
