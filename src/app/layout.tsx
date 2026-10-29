import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TWS Diwali Dhamaka",
  description:
    "Celebrate Diwali with TWS. Choose a lucky diya, unlock festive surprises, and win up to ₹50,000 worth of premium digital services.",
  openGraph: {
    title: "TWS Diwali Dhamaka",
    description:
      "Celebrate Diwali with TWS. Choose a lucky diya, unlock festive surprises, and win up to ₹50,000 worth of premium digital services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TWS Diwali Dhamaka",
    description:
      "Celebrate Diwali with TWS. Choose a lucky diya, unlock festive surprises, and win up to ₹50,000 worth of premium digital services.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-[#FAFAF7] text-[#1A1208] antialiased selection:bg-[#F5D372] selection:text-[#1A1208] min-h-screen overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
