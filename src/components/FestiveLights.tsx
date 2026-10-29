import React from "react";

interface LightPoint {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

const LIGHTS: LightPoint[] = [
  { top: "6%", left: "8%", size: 14, delay: "0s", duration: "4.5s" },
  { top: "12%", left: "88%", size: 18, delay: "1.2s", duration: "5.2s" },
  { top: "24%", left: "48%", size: 12, delay: "0.5s", duration: "6s" },
  { top: "35%", left: "4%", size: 16, delay: "2.1s", duration: "4.8s" },
  { top: "42%", left: "92%", size: 15, delay: "1.8s", duration: "5.5s" },
  { top: "58%", left: "12%", size: 14, delay: "0.8s", duration: "4.2s" },
  { top: "68%", left: "85%", size: 20, delay: "2.5s", duration: "6.2s" },
  { top: "78%", left: "30%", size: 13, delay: "1.5s", duration: "5s" },
  { top: "86%", left: "70%", size: 16, delay: "0.2s", duration: "4.6s" },
  { top: "94%", left: "15%", size: 12, delay: "3s", duration: "5.8s" },
];

export function FestiveLights() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Soft warm golden ambient glow pools */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[450px] bg-[radial-gradient(circle,rgba(245,211,114,0.18)_0%,transparent_70%)]" />
      <div className="absolute top-[40%] right-0 w-[550px] h-[450px] bg-[radial-gradient(circle,rgba(212,160,23,0.12)_0%,transparent_70%)]" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(245,211,114,0.15)_0%,transparent_70%)]" />

      {/* Twinkling ambient Diwali lights */}
      {LIGHTS.map((light, idx) => (
        <div
          key={idx}
          className="ambient-light-dot"
          style={{
            top: light.top,
            left: light.left,
            width: `${light.size}px`,
            height: `${light.size}px`,
            animationDelay: light.delay,
            animationDuration: light.duration,
          }}
        />
      ))}
    </div>
  );
}

