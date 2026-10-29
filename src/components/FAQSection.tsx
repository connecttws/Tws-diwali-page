"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do I redeem my Diwali Dhamaka surprise voucher?",
    answer:
      "Once you select and reveal your Diya, you'll receive a unique voucher code (e.g., DHAMAKA-ANANTA-50K-8F2X). Simply tap 'Claim via WhatsApp' or 'Claim via Email' to initiate your consultation with the TWS engineering team. We will schedule a kickoff session and map out your deliverables immediately.",
  },
  {
    question: "Is the service 100% free, or are there hidden conditions?",
    answer:
      "Every single surprise revealed in TWS Diwali Dhamaka is 100% free of service charges. You will never be asked for an upfront deposit or credit card to claim your assigned scope. Any third-party costs you might independently choose (such as your own domain registrar fees or proprietary cloud hosting accounts) remain yours, but our design, engineering, and advisory services are fully sponsored.",
  },
  {
    question: "Can I transfer my voucher to a friend or co-founder?",
    answer:
      "Yes! If your current project does not need the specific surprise you revealed, you may transfer your voucher code once to another business owner, client, or engineering partner. They just need to quote your unique code upon redemption.",
  },
  {
    question: "How long is my voucher valid?",
    answer:
      "Vouchers are valid for between 45 and 90 days from the date of the Diwali campaign (depending on the scope tier). This gives you ample time to prepare your requirements without feeling rushed.",
  },
  {
    question: "How are the surprises assigned across the 10 diyas?",
    answer:
      "Each diya corresponds to an auspicious Vedic name and a deterministic, handcrafted service surprise ranging from ₹15,000 to the ₹50,000 Grand Prize. The assignment is fixed and guaranteed — no fake spinners or randomized tricks.",
  },
  {
    question: "What if I have an existing codebase or design system?",
    answer:
      "All TWS surprises are designed to meet you wherever you are. Whether you need a fresh greenfield build or performance / UI/UX optimization for an existing React, Next.js, or cloud architecture, our senior team adapts directly to your stack.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-24 lg:py-28 relative scroll-mt-16">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#FFFFFF] border border-[#D4A017]/40 text-[#C59114] text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2.5 sm:mb-3.5 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#C59114]" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-[#1A1208] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-lg text-[#4A3B2C] font-normal mt-2 sm:mt-3">
            Everything you need to know about claiming and redeeming your surprise.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl sm:rounded-2xl bg-[#FFFFFF] border border-[#D4A017]/30 overflow-hidden transition-all shadow-[0_4px_16px_rgba(138,97,10,0.05)]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-4 sm:py-5 sm:px-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59114]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-[#1A1208] leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#C59114] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-base text-[#4A3B2C] leading-relaxed border-t border-[#D4A017]/15 animate-fadeIn font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
