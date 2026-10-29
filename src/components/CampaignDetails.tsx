import { ShieldCheck, Palette, Cpu } from "lucide-react";

interface CampaignDetailsProps {
  onPickDiyaClick: () => void;
}

export function CampaignDetails({}: CampaignDetailsProps) {
  return (
    <div className="py-10 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* How It Works Section */}
        <section id="how-it-works" className="mb-12 sm:mb-20 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C59114]">
              Simple & Transparent
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-[#1A1208] mt-1 sm:mt-1.5 leading-tight">
              How the Dhamaka Works
            </h2>
            <p className="text-xs sm:text-base text-[#4A3B2C] font-normal mt-1.5 sm:mt-2">
              Three simple steps between you and your festive digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#D4A017]/30 hover:border-[#D4A017] transition-all hover:-translate-y-1 relative shadow-xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D4A017] to-[#E5B537] text-white font-black text-base sm:text-xl flex items-center justify-center mb-3.5 sm:mb-4 shadow-xs">
                01
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#1A1208] mb-1.5 sm:mb-2">
                Pick Your Lucky Diya
              </h3>
              <p className="text-xs sm:text-sm text-[#4A3B2C] leading-relaxed font-normal">
                Choose any of the 10 handcrafted Vedic diyas. Each diya embodies a distinct virtue and holds a guaranteed digital surprise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#D4A017]/30 hover:border-[#D4A017] transition-all hover:-translate-y-1 relative shadow-xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#E65C00] to-[#E5B537] text-white font-black text-base sm:text-xl flex items-center justify-center mb-3.5 sm:mb-4 shadow-xs">
                02
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#1A1208] mb-1.5 sm:mb-2">
                Reveal Your Surprise
              </h3>
              <p className="text-xs sm:text-sm text-[#4A3B2C] leading-relaxed font-normal">
                Tap to open the diya and reveal your surprise, ranging from ₹15,000 to the grand ₹50,000 full brand & web revamp package.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#D4A017]/30 hover:border-[#D4A017] transition-all hover:-translate-y-1 relative shadow-xs">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#3E7B44] to-[#C59114] text-white font-black text-base sm:text-xl flex items-center justify-center mb-3.5 sm:mb-4 shadow-xs">
                03
              </div>
              <h3 className="text-base sm:text-xl font-bold text-[#1A1208] mb-1.5 sm:mb-2">
                Redeem 100% Free
              </h3>
              <p className="text-xs sm:text-sm text-[#4A3B2C] leading-relaxed font-normal">
                Copy your unique voucher code and connect with TWS via WhatsApp or Email. Zero upfront costs, zero hidden terms.
              </p>
            </div>
          </div>
        </section>

        {/* TWS Promise Banner */}
        <section className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FFFFFF] via-[#FDFBF7] to-[#F6F3EB] border-2 border-[#D4A017]/35 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C59114]">
              The TWS Standard
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-[#1A1208] mt-1 sm:mt-1.5 mb-2 sm:mb-2.5 leading-snug">
              Crafted with devotion. Delivered with precision.
            </h3>
            <p className="text-xs sm:text-base text-[#4A3B2C] leading-relaxed mb-4 sm:mb-5 font-normal">
              At TWS, we engineer next-generation web architectures, AI workflows, and bespoke digital experiences. Our Diwali Dhamaka is our way of celebrating the festival of light with visionary founders, creators, and teams across India and the globe.
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-2.5 xs:gap-4 sm:gap-7 text-xs sm:text-sm text-[#1A1208] font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3E7B44] shrink-0" />
                <span>Deterministic Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#C59114] shrink-0" />
                <span>Bespoke Design Excellence</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#E65C00] shrink-0" />
                <span>Production-Ready Codebases</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
