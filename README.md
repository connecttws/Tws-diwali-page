# TWS Diwali Dhamaka — Next.js Edition

A high-performance, modular Next.js application built with **TypeScript**, **Tailwind CSS v4**, and **Three.js**, converted from the static Diwali Dhamaka campaign.

## 🪔 Features

- **Interactive 3D Sacred Diya**: Built with Three.js WebGL canvas featuring 360° inspection, realistic studio lighting, procedural gold/brass/terracotta shaders, native `ResizeObserver` responsiveness, and camera angle switching (Front, Flame Macro, Mandala Top view).
- **Interactive 10-Diya Grid**: Deterministic card selection where visitors choose a sacred Diya to reveal guaranteed festive architectural and design gifts (up to ₹50,000 Grand Prize).
- **Dedicated Thank You & Redemption Page (`/thank-you`)**: Tapping any Diya instantly unlocks the reward, triggers celebratory confetti and auspicious temple bell chimes, and redirects to a dedicated redemption page with zero back-navigation distractions.
- **Persistent Single-Diya Locking**: Remembers the user's opened Diya across reloads using `localStorage`. If the user revisits the home page, the selection section displays an "Already Opened" banner with a direct link to their voucher, and locks the other 9 Diyas to enforce the 1-diya limit.
- **Instant Claim Flows**: One-click redemption via WhatsApp pre-filled message and Email mailto link with pre-populated subject and body.
- **Festive Audio Effects**: 100% procedural Web Audio API sounds (warm diya selection tap & resonant pentatonic Diwali temple bell chime) with zero external MP3 dependencies.
- **Next-Gen Typography & Styling**: Custom White & Gold luxury editorial aesthetic using Google Fonts (`Plus Jakarta Sans` & `Inter`), custom SVG diya illustrations, ambient twinkling lights, and 60fps lightweight CSS flame animations.
- **Full Responsiveness**: Fluid layouts and tap targets optimized across all viewports from 320px mobile devices to tablets, laptops, and ultra-wide desktops.

## 📂 Project Structure

```
Tws-diwali-page/
├── public/                      # Static assets & favicon
├── visual-data/                 # Extracted visual tokens & content
│   ├── content.json             # Section copy, offers, FAQs, metadata
│   └── design.json              # Design tokens, color palette, typography
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind v4 styles, custom animations & theme
│   │   ├── layout.tsx           # Root layout with fonts & SEO metadata
│   │   ├── page.tsx             # Main page assembly & state management
│   │   └── thank-you/
│   │       └── page.tsx         # Thank you & voucher redemption page
│   ├── components/
│   │   ├── CampaignDetails.tsx  # How it works & TWS quality guarantee
│   │   ├── DiyaCard.tsx         # Handcrafted SVG Diya card with hover effects
│   │   ├── DiyaSelectionGrid.tsx# 10-Diya interactive selection matrix
│   │   ├── FAQSection.tsx       # Collapsible accordion FAQ
│   │   ├── FestiveLights.tsx    # Ambient floating twinkling lights
│   │   ├── Footer.tsx           # Festive blessing & footer navigation
│   │   ├── Header.tsx           # Sticky nav with audio toggle & quick CTAs
│   │   ├── Hero.tsx             # Editorial hero with dynamic 3D Diya
│   │   └── ThreeDiyaHero.tsx    # Interactive Three.js 3D WebGL Diya canvas
│   ├── data/
│   │   └── diyaOffers.ts        # Auspicious diya offers data & persistence helpers
│   └── utils/
│       └── audio.ts             # Procedural Web Audio API sound generator
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
npm run start
```
