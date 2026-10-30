"use client";

// ============================================================================
// THANK YOU PAGE (TEMPORARILY PAUSED / COMMENTED OUT PER USER REQUEST)
// Flow moved directly to the Diya Reveal popup modal with Name & Contact Number.
// This page is paused for now until Google Sheets & CRM script are connected.
// ============================================================================

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect visitors to the homepage where the active Diya popup flow lives
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <h2 className="text-lg font-bold text-[#1A1208]">Redirecting to Diwali Dhamaka...</h2>
        <p className="text-xs text-[#7A6652]">Please avail your offer directly on the Diya popup.</p>
      </div>
    </div>
  );
}
