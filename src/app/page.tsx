"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DiyaSelectionGrid } from "@/components/DiyaSelectionGrid";
import { Footer } from "@/components/Footer";
import { FestiveLights } from "@/components/FestiveLights";
import { getSavedOpenedDiya, saveOpenedDiya } from "@/data/diyaOffers";

export default function HomePage() {
  const router = useRouter();
  const [openedDiyaId, setOpenedDiyaId] = useState<string | null>(null);
  const [isAlreadyOpened, setIsAlreadyOpened] = useState<boolean>(false);

  // Restore saved opened diya from localStorage on client mount
  useEffect(() => {
    const saved = getSavedOpenedDiya();
    if (saved.isOpened && saved.diyaId) {
      setOpenedDiyaId(saved.diyaId);
      setIsAlreadyOpened(true);
    }
  }, []);

  // When a user opens any Diya:
  // 1. Store opened state permanently in localStorage
  // 2. Redirect to the Thank You page
  const handleOpenDiya = (diyaId: string) => {
    saveOpenedDiya(diyaId);
    setOpenedDiyaId(diyaId);
    setIsAlreadyOpened(true);
    router.push("/thank-you");
  };

  const scrollToDiyaSelection = () => {
    const element = document.getElementById("diya-selection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A1208] flex flex-col font-sans selection:bg-[#F5D372] selection:text-[#1A1208] relative overflow-x-hidden">
      {/* Smooth, lightweight ambient festive lights */}
      <FestiveLights />

      {/* Refined sticky header */}
      <Header
        onPickDiyaClick={scrollToDiyaSelection}
        isAlreadyOpened={isAlreadyOpened}
      />

      <main className="flex-1 relative z-10">
        {/* Hero with interactive 3D Diya centerpiece */}
        <Hero onPickDiyaClick={scrollToDiyaSelection} />

        {/* 10-Diya Selection Grid with persistent 'Already Opened' handling */}
        <DiyaSelectionGrid
          openedDiyaId={openedDiyaId}
          isAlreadyOpened={isAlreadyOpened}
          onOpenDiya={handleOpenDiya}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
