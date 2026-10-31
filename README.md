# TWS Diwali Dhamaka — Next.js Edition

A high-performance, modular Next.js application built with **React 19**, **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **Three.js**, and **Google Sheets API**.

---

## 🪔 Key Features

- **Interactive 10-Diya Selection Grid**: 10 sacred Diyas mapped to guaranteed festive gifts:
  1. **Diya 01**: 5 Free Reels Edits — kisi bhi service ke saath.
  2. **Diya 02**: 20 Leads Par Free Calling — qualified meetings booked directly.
  3. **Diya 03**: Flat 30% OFF — on any service final price.
  4. **Diya 04**: Free Custom Landing Page — tailored content and features.
  5. **Diya 05**: 2 Creators Ke Final-Edited Videos — for your brand marketing.
  6. **Diya 06**: 3-Month Package Par 3 Months Free (Buy 3, Get 3 Free).
  7. **Diya 07**: 2 Months Free GMB Profile Management — with SMM or Lead-Gen package.
  8. **Diya 08**: High-Ticket Sales Conversion Guide (Worth ₹2,500).
  9. **Diya 09**: Shubh Diwali Blessing & Free Strategy Consultation.
  10. **Diya 10**: 1 Month of Social Media Free (Buy 1 Month, Get 1 Free).

- **Diya Reveal & Avail Popup Modal (`DiyaRevealModal.tsx`)**:
  - Tapping a Diya triggers a festive chime (Web Audio API) and multi-color confetti burst.
  - Displays Diya number, name, offer headline, value amount, and permanent voucher code.
  - Direct embedded lead capture form with headline: `Avail your offer here.....`.
  - Captures **Name** and **Contact Number** (placeholder `e.g. 7275895385`).

- **Direct Google Sheets Lead Logging (`/api/lead`)**:
  - Server-side Next.js route authenticated via Google Cloud Service Account.
  - Automatically appends incoming leads directly into your Google Sheet (`Sheet1!A:G`):
    - **Timestamp** (IST format: `Asia/Kolkata`)
    - **Name**
    - **Contact Number**
    - **Diya** (e.g. `Diya 01 (Ananta Diya)`)
    - **Offer Headline**
    - **Offer Value**
    - **Voucher Code**

- **Instant WhatsApp Kickoff**:
  - After submission, visitors can immediately connect with the TWS team via WhatsApp at **`+91 7275895385`** (`https://wa.me/917275895385?text=...`).
  - Pre-filled message includes visitor name, contact number, diya number, offer, and voucher code for instant verification.

- **Persistent Single-Diya Locking**:
  - Remembers the visitor's opened Diya and registration state via `localStorage`.
  - Re-visiting displays an auspicious status card with their voucher and an "Avail / View Offer" button to reopen their confirmation modal.

- **Interactive 3D Sacred Diya Hero**:
  - WebGL centerpiece rendered with Three.js featuring 360° rotation, realistic golden studio lighting, dynamic particle embers, and camera view controls.

- **Mobile-First Luxury White & Gold Aesthetic**:
  - Editorial typography (`Plus Jakarta Sans`) with mobile-optimized 5-line hero heading and radiant gold text shimmer.
  - 60fps lightweight CSS flame animations and floating ambient festive lights.

---

## 📂 Project Structure

```
Tws-diwali-page/
├── public/                      # Static assets, branding & audio fallbacks
├── visual-data/                 # Design tokens and visual styling specifications
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── lead/
│   │   │       └── route.ts     # Google Sheets API lead ingestion endpoint
│   │   ├── globals.css          # Tailwind CSS v4 setup & gold shimmer styles
│   │   ├── layout.tsx           # Root layout, Google fonts & SEO metadata
│   │   ├── page.tsx             # Main landing page assembly & state
│   │   └── thank-you/
│   │       └── page.tsx         # Paused thank-you route (redirects to modal flow)
│   ├── components/
│   │   ├── DiyaCard.tsx         # Handcrafted SVG Diya card with hover glow
│   │   ├── DiyaRevealModal.tsx  # Celebratory popup with embedded lead form & WhatsApp link
│   │   ├── DiyaSelectionGrid.tsx# 10-Diya interactive card grid & status banner
│   │   ├── FestiveLights.tsx    # Ambient twinkling festive fairy lights
│   │   ├── Footer.tsx           # Festive blessing & copyright footer
│   │   ├── Header.tsx           # Minimal clean header (Logo TWS / Diwali Dhamaka)
│   │   ├── Hero.tsx             # Editorial hero with mobile 5-line headline
│   │   └── ThreeDiyaHero.tsx    # Interactive Three.js WebGL Diya canvas
│   ├── data/
│   │   └── diyaOffers.ts        # 10 custom Diwali offers data & localStorage helpers
│   └── utils/
│       └── audio.ts             # Web Audio API procedural sound engine
├── .env.example                 # Environment variables template
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables (Google Sheets Integration)

To connect your Google Sheet for lead capture, create a `.env.local` file in the project root:

```env
# Google Cloud Service Account Credentials
GOOGLE_CLIENT_EMAIL="client-form@client-form-498909.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Target Google Sheet ID (from: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit)
GOOGLE_SHEET_ID="your_google_sheet_id_here"
```

### Google Sheet Configuration:
1. Ensure the sheet has the following headers in Row 1:
   - **Column A**: `Timestamp`
   - **Column B**: `Name`
   - **Column C**: `Contact Number`
   - **Column D**: `Diya`
   - **Column E**: `Offer Headline`
   - **Column F**: `Offer Value`
   - **Column G**: `Voucher Code`
2. Share the Google Sheet with **Editor** access to:
   ```
   client-form@client-form-498909.iam.gserviceaccount.com
   ```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```
