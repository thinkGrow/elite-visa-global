// /src/app/hajj-umrah/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";

type ModeKey = "hajj" | "umrah";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main style={themeVars} className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="pt-24 pb-14 sm:pt-28 sm:pb-16">{children}</div>
    </main>
  );
}

/** unified EVG card (same as visa-processing) */
function Card({
  children,
  className = "",
  hairline = false,
}: {
  children: React.ReactNode;
  className?: string;
  hairline?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl",
        "border border-slate-200/70 bg-white",
        "shadow-[0_12px_40px_rgba(2,6,23,0.06)]",
        className,
      ].join(" ")}
    >
      {hairline ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--evg-gold)]/35 to-transparent"
        />
      ) : null}
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-10 h-px w-full bg-slate-200/70" />;
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-7 text-base sm:text-lg font-semibold text-[var(--evg-deep)] flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.14)]" />
      {children}
    </h3>
  );
}

function BulletList({
  items,
  tone = "blue",
}: {
  items: string[];
  tone?: "blue" | "gold" | "muted";
}) {
  const dot =
    tone === "gold"
      ? "bg-[var(--evg-gold)]/80"
      : tone === "muted"
        ? "bg-slate-400"
        : "bg-[var(--evg-blue)]/70";

  return (
    <ul className="mt-3 space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-sm sm:text-base text-slate-700">
          <span
            className={["mt-2 h-1.5 w-1.5 flex-none rounded-full", dot].join(
              " ",
            )}
          />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function KeyValueGrid({
  rows,
}: {
  rows: Array<{ k: string; v: React.ReactNode }>;
}) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {rows.map((r, i) => (
        <div
          key={i}
          className={[
            "rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4",
            "shadow-[0_10px_28px_rgba(2,6,23,0.05)]",
          ].join(" ")}
        >
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {r.k}
          </div>
          <div className="mt-1 text-sm sm:text-base text-slate-800 leading-relaxed">
            {r.v}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccentCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.12)]" />
        <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700">
      {children}
    </span>
  );
}

function HeaderCard({
  mode,
  onMode,
}: {
  mode: ModeKey;
  onMode: (v: ModeKey) => void;
}) {
  return (
    <Card hairline className="p-5 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(28,90,168,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(214,162,58,0.10),transparent_55%)]"
      />
      <div className="relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
            <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
              ELITE HAJJ KAFELA
            </div>

            <div className="mt-3 flex items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
                Hajj &amp; Umrah
              </h2>
              <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
            </div>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
              Select Hajj or Umrah to view packages, pricing, inclusions, and
              requirements.
            </p>
          </div>

          <div className="w-full sm:w-[420px]">
            <label className="block text-xs uppercase tracking-wide text-slate-500">
              Dropdown
            </label>

            <div className="mt-2 relative">
              <select
                value={mode}
                onChange={(e) => onMode(e.target.value as ModeKey)}
                className={[
                  "w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm sm:text-base text-slate-800",
                  "shadow-sm outline-none transition",
                  "focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20",
                ].join(" ")}
              >
                <option value="hajj">Hajj</option>
                <option value="umrah">Umrah</option>
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* =========================
   DATA
========================= */

type PricingRow = { label: string; price: string };
type PricingTier = { name: string; rows: PricingRow[]; note?: string };

type HotelTier = {
  name: string;
  madinah?: string;
  makkah?: string;
};

type UmrahPackage = {
  id: string;
  title: string;
  subtitle: string;
  heroLine1: string;
  heroLine2: string;
  groupTravelDate: string;
  note?: string;
  pricing: PricingTier[];
  hotels: HotelTier[];
  includes: string[];
  excludes: string[];
  optional: string[];
  paymentPolicy: string[];
  requirements: string[];
  cancellationPolicy: string[];
};

const umrahPackages: UmrahPackage[] = [
  {
    id: "first-ramadan-umrah-14",
    title: "First Ramadan Umrah Package",
    subtitle: "First Ramadan Umrah Package - 14 Days",
    heroLine1: "18 Tuesday in Makkah | Start from Tk. 1,70,000",
    heroLine2:
      "Return Flight | 5N Madinah + 8N Makkah | Price Valid Till 31 Dec 2026",
    groupTravelDate: "February: 30",
    note: "Customized dates are also available (Condition Apply)",
    pricing: [
      {
        name: "Economy Package",
        rows: [
          { label: "Five/Six Bed share basis", price: "TK. 1,70,000" },
          { label: "Adult on Quad share basis", price: "TK. 1,80,000" },
          { label: "Adult on triple share basis", price: "TK. 1,90,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 2,15,000" },
          { label: "Single share basis", price: "TK. 2,90,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
      {
        name: "Standard Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 2,05,000" },
          { label: "Adult on triple share basis", price: "TK. 2,25,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 2,70,000" },
          { label: "Single share basis", price: "TK. 3,80,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
      {
        name: "Deluxe Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 2,30,000" },
          { label: "Adult on triple share basis", price: "TK. 2,60,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 3,10,000" },
          { label: "Single share basis", price: "TK. 4,55,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
      {
        name: "Superior Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 2,95,000" },
          { label: "Adult on triple share basis", price: "TK. 3,30,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 4,00,000" },
          { label: "Single share basis", price: "TK. 6,25,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
      {
        name: "Premium Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 3,80,000" },
          { label: "Adult on triple share basis", price: "TK. 4,25,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 5,20,000" },
          { label: "Single share basis", price: "TK. 8,75,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
    ],
    hotels: [
      {
        name: "Economy Package",
        madinah:
          "Diyar Al Noor or Similar (Approx. 750 Mtr from Masjid Al Nabawi).",
        makkah:
          "Emaar Khair Al Masi or Similar (Approx. 750 Mtr from Masjid Al Haram).",
      },
      {
        name: "Standard Package",
        madinah:
          "Plaza inn Ohud Hotel or Similar (Approx. 250 Mtr from Masjid Al Nabawi).",
        makkah:
          "Olyan Golden or Similar (Approx. 450 Mtr from Masjid Al Haram).",
      },
      {
        name: "Deluxe Package",
        madinah:
          "Karam Al-Hejaz or Similar (Approx. 200 Mtr from Masjid Al Nabawi).",
        makkah:
          "Snood Ajyad or Similar (Approx. 300 Mtr from Masjid Al Haram).",
      },
      {
        name: "Superior Package",
        madinah:
          "Emaar Elite or similar (Approx. 50 Mtr from Masjid Al Nabawi).",
        makkah:
          "Anjum Makkah or similar (Approx. 100 Mtr from Masjid Al Haram).",
      },
      {
        name: "Premium Package",
        madinah:
          "Al Aqeeq Madinah or similar (Approx. 100 Mtr from Masjid Al Nabawi).",
        makkah: "Pullman Zamzam or similar (0 Mtr from Masjid Al Haram).",
      },
    ],
    includes: [
      "Air ticket with return including all taxes on (Economy Class): Dhaka – Madinah – Jeddah – Dhaka.",
      "05 nights hotel accommodation in Madinah.",
      "08 nights hotel accommodation in Makkah.",
      "Daily Sahoor/Iftar at the hotel. (Only Premium & Superior Package)",
      "Transportation Service: Madinah Airport – Madinah Hotel – Makkah Hotel – Jeddah Airport.",
      "Umrah Visa Fee.",
      "Health Insurance.",
      "Meet & assist at Madinah Airport.",
      "Room Service as per hotel rules.",
      "Umrah guidebook in Bangla.",
      "Ziyarah / Sightseeing tour in Madinah",
      "Ziyarah / Sightseeing tour in Makkah",
      "Dedicated Bengali Muallem at the time of performing umrah.",
    ],
    excludes: [
      "Food (lunch/dinner) not included with the package price for Makkah / Madinah (where not specified), but available at hotel or restaurant (Approx. SR 25/Per Day Per Person).",
      "Any kinds of personal cost or others which are not mentioned above.",
    ],
    optional: [
      "Taking special rooms (Haram view, Kaba view, Suite Room, etc.).",
      "Adding other tours: Jeddah, Taif, Hudaibiyah, Wadi Jinn, Khandak, Ohud, Badar, etc.",
      "Visiting other countries with Umrah package: Dubai, Egypt, Turkey, etc.",
    ],
    paymentPolicy: [
      "Phase-1: 80% of the total package amount at the time of booking.",
      "Phase-2: 20% of total package amount before seven days of travel date.",
    ],
    requirements: [
      "A Bangladeshi passport valid for at least 6 months.",
      "One copy passport size white background photograph.",
    ],
    cancellationPolicy: [
      "The package is non-refundable and non-changeable (except air tickets).",
      "Air ticket re-issue or refund charges are dependent on the airline's policy.",
    ],
  },
  {
    id: "last-ramadan-umrah-16",
    title: "Last Ramadan Umrah Package",
    subtitle: "Last Ramadan Umrah Package – 16 Days",
    heroLine1: "17 Tuesdays in Makkah | from Tk. 2,25,000!",
    heroLine2:
      "Return Flight | 13N Makkah + 4N Madinah | Price Valid Till 31 Dec 2026",
    groupTravelDate: "March: 25",
    note: "Customized dates are also available (Condition Apply)",
    pricing: [
      {
        name: "Economy Package",
        rows: [
          { label: "Five/Six Bed share basis", price: "TK. 2,25,000" },
          { label: "Adult on Quad share basis", price: "TK. 2,40,000" },
          { label: "Adult on triple share basis", price: "TK. 2,65,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 3,20,000" },
          { label: "Single share basis", price: "TK. 4,75,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
      {
        name: "Standard Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 2,90,000" },
          { label: "Adult on triple share basis", price: "TK. 3,35,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 4,35,000" },
          { label: "Single share basis", price: "TK. 6,95,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
      {
        name: "Deluxe Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 3,35,000" },
          { label: "Adult on triple share basis", price: "TK. 3,85,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 4,90,000" },
          { label: "Single share basis", price: "TK. 8,10,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 55,000" },
        ],
      },
      {
        name: "Superior Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 5,05,000" },
          { label: "Adult on triple share basis", price: "TK. 6,05,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 7,20,000" },
          { label: "Single share basis", price: "TK. 14,05,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 50,000" },
        ],
      },
      {
        name: "Premium Package",
        rows: [
          { label: "Adult on Quad share basis", price: "TK. 7,50,000" },
          { label: "Adult on triple share basis", price: "TK. 8,70,000" },
          { label: "Adult on Double/Twin share basis", price: "TK. 10,70,000" },
          { label: "Single share basis", price: "TK. 19,60,000" },
          { label: "Child with Bed", price: "Less Than 10,000 From Adult" },
          { label: "Child No Bed (Parent Sharing)", price: "TK. 1,30,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 50,000" },
        ],
      },
    ],
    hotels: [
      {
        name: "Economy Package",
        makkah:
          "Emaar Khair Al Masi or Similar (Approx. 750 Mtr from Masjid Al Haram).",
        madinah:
          "Diyar Al Noor or Similar (Approx. 800 Mtr from Masjid Al Nabawi).",
      },
      {
        name: "Standard Package",
        makkah:
          "Al Olyan Golden or Similar (Approx. 450 Mtr from Masjid Al Haram).",
        madinah:
          "Plaza inn Ohud Hotel or Similar (Approx. 250 Mtr from Masjid Al Nabawi).",
      },
      {
        name: "Deluxe Package",
        makkah:
          "Emaar Andalusiah or Similar (Approx. 300 Mtr from Masjid Al Haram).",
        madinah:
          "Karam Al-Hejaz or Similar (Approx. 200 Mtr from Masjid Al Nabawi).",
      },
      {
        name: "Superior Package",
        makkah:
          "Anjum Makkah or similar (Approx. 100 Mtr from Masjid Al Haram).",
        madinah:
          "Emaar Elite or similar (Approx. 50 Mtr from Masjid Al Nabawi).",
      },
      {
        name: "Premium Package",
        makkah: "Pullman Zamzam or similar (0 Mtr from Masjid Al Haram).",
        madinah:
          "Al Aqeeq Madinah or similar (Approx. 100 Mtr from Masjid Al Nabawi).",
      },
    ],
    includes: [
      "Air ticket with return including all taxes on (Economy Class): Dhaka – Jeddah – Madinah – Dhaka.",
      "12 nights hotel accommodation in Makkah.",
      "04 nights hotel accommodation in Madina.",
      "Daily Sahoor/Iftar/Breakfast at the hotel. (Only Premium & Superior Package)",
      "Transportation Service: Jeddah Airport – Makkah Hotel - Madinah Hotel – Madinah Airport.",
      "Umrah Visa Fee.",
      "Health Insurance.",
      "Meet & assist at Madinah Airport.",
      "Room Service as per hotel rules.",
      "Umrah guidebook in Bangla.",
      "Ziyarah / Sightseeing tour in Madinah",
      "Ziyarah / Sightseeing tour in Makkah",
      "Dedicated Bengali Muallem at the time of performing umrah.",
    ],
    excludes: [
      "Food (lunch/dinner) not included with the package price for Makkah / Madinah (where not specified), but available at hotel or restaurant (Approx. SR 25/Per Day Per Person).",
      "Any kinds of personal cost or others which are not mentioned above.",
    ],
    optional: [
      "Taking special rooms (Haram view, Kaba view, Suite Room, etc.).",
      "Adding other tours: Jeddah, Taif, Hudaibiyah, Wadi Jinn, Khandak, Ohud, Badar, etc.",
      "Visiting other countries with Umrah package: Dubai, Egypt, Turkey, etc.",
    ],
    paymentPolicy: [
      "Phase-1: 80% of the total package amount at the time of booking.",
      "Phase-2: 20% of total package amount before seven days of travel date.",
    ],
    requirements: [
      "A Bangladeshi passport valid for at least 6 months.",
      "One copy passport size white background photograph.",
    ],
    cancellationPolicy: [
      "The package is non-refundable and non-changeable (except air tickets).",
      "Air ticket re-issue or refund charges are dependent on the airline's policy.",
    ],
  },
];

type HajjPackage = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  quickFacts: Array<{ k: string; v: React.ReactNode }>;
  includes?: string[];
  excludes?: string[];
  optional?: string[];
  pricing?: PricingTier[];
  hotels?: HotelTier[];
  requirements?: string[];
  cancellationPolicy?: string[];
  note?: string;
};

const hajjPackages: HajjPackage[] = [
  {
    id: "hajj-pre-registration",
    title: "Hajj Pre Registration 2026-2027 From Bangladesh",
    subtitle: "Register for Hajj 2026 Now",
    summary:
      "Be the first to receive essential information and secure your place with first-come, first-served Hajj packages. Pre-registration is going on at only 30,000 BDT.",
    quickFacts: [
      { k: "Pre-registration fee", v: "BDT 30,000 per person" },
      { k: "Processing time (EHK)", v: "1–3 business days" },
      {
        k: "Reservation link (reference)",
        v: (
          <span className="text-slate-800">
            obokash.com/hajj-pre-registration-form
          </span>
        ),
      },
      {
        k: "Note",
        v: "Hajj Pre-Registration is validated for 2 years.",
      },
    ],
    includes: [
      "Adult Application (Bangladeshi Resident): NID/Passport scanned copy + valid mobile number.",
      "NRB Applicant: Passport soft copy + birth certificate + passport size photo + work permit/ID/visa copy + mobile + email.",
      "Child Applicant (Along with Parents): Birth certificate/Passport copy + passport size photo + parent's valid mobile number.",
      "System notes: e-Hajj and agency licensing constraints (single email cannot be used for multiple licenses).",
    ],
    requirements: [
      "Scanned documents as applicable (adult/NRB/child).",
      "Valid mobile number (and email for NRB).",
    ],
    note: "Latest Hajj updates and official timelines depend on government announcements and the Saudi e-Hajj system.",
  },
  {
    id: "cheap-hajj-40-days",
    title: "40 Days Cheap Hajj Package",
    subtitle:
      "Makkah 20 Nights | Madinah 09/10 Nights | Hajj Period + Shisha 10/11 Nights",
    summary: "Travel Date: Approx. 21 May 2026 | Starts from TK. 6,00,000!",
    quickFacts: [
      {
        k: "Travel date (approx.)",
        v: "21 May 2026",
      },
      {
        k: "Route",
        v: "Dhaka ⇄ Jeddah (Economy class; airline subject to availability)",
      },
      {
        k: "Core inclusions",
        v: "Airfare, accommodation, meals (as per tier), transport, visa, insurance, guide",
      },
      {
        k: "Note",
        v: "Kurbani is not included (Approx. SR 700–800 per person).",
      },
    ],
    pricing: [
      {
        name: "Standard Package",
        rows: [
          { label: "4/5/6 bed share basis", price: "TK. 6,00,000" },
          { label: "Triple share basis", price: "TK. 6,70,000" },
          { label: "Double share basis", price: "TK. 7,60,000" },
          { label: "Single Basis", price: "TK. 10,50,000" },
          { label: "Child (if quad share)", price: "TK. 5,50,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 3,70,000" },
        ],
      },
      {
        name: "Deluxe Package",
        rows: [
          { label: "Quint/Quad share basis", price: "TK. 6,50,000" },
          { label: "Triple share basis", price: "TK. 7,20,000" },
          { label: "Double share basis", price: "TK. 8,20,000" },
          { label: "Single Basis", price: "TK. 11,50,000" },
          { label: "Child (if quad share)", price: "TK. 5,90,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 4,00,000" },
        ],
      },
      {
        name: "Superior Package",
        rows: [
          { label: "Quint/Quad share basis", price: "TK. 6,90,000" },
          { label: "Triple share basis", price: "TK. 7,80,000" },
          { label: "Double share basis", price: "TK. 9,20,000" },
          { label: "Single Basis", price: "TK. 13,50,000" },
          { label: "Child (if quad share)", price: "TK. 6,50,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 4,50,000" },
        ],
      },
      {
        name: "Premium Package",
        rows: [
          { label: "Quint/Quad share basis", price: "TK. 9,50,000" },
          { label: "Triple share basis", price: "TK. 10,40,000" },
          { label: "Double share basis", price: "TK. 12,00,000" },
          { label: "Single Basis", price: "TK. 19,50,000" },
          { label: "Child (if quad share)", price: "TK. 8,90,000" },
          { label: "Infant (Parent Sharing)", price: "TK. 6,70,000" },
        ],
      },
    ],
    hotels: [
      {
        name: "Standard Package",
        makkah:
          "Jawharah al Hijrah or Similar Hotel (Approx. 800 Mtr from Masjid Al Haram).",
        madinah:
          "Dyar Al Noor or Similar Hotel (Approx. 800 Mtr from Masjid Al Nabawi).",
      },
      {
        name: "Deluxe Package",
        makkah:
          "Diyafat Mubarak Hotel or Similar Hotel (Approx. 300 Mtr from Masjid Al Haram).",
        madinah:
          "Kayan Al Madinah or Similar Hotel (Approx. 250 Mtr from Masjid Al Nabawi).",
      },
      {
        name: "Superior Package",
        makkah:
          "Maysan Al Mashaer or Similar Hotel (200 Mtr from Masjid Al Haram).",
        madinah:
          "Kayan Almasi or Similar Hotel (Approx. 200 Mtr from Masjid Al Nabawi).",
      },
      {
        name: "Premium Package",
        makkah:
          "Al Safwah Royale Orchid or Similar Hotel (0 Mtr from Masjid Al Haram).",
        madinah:
          "Mias or Similar Hotel (Approx. 100 Mtr from Masjid Al Nabawi).",
      },
    ],
    includes: [
      "Economy Class return Air Ticket from Dhaka to Jeddah on Saudi, Biman Bangladesh, or Flynas Airlines (subject to availability).",
      "20 Nights hotel accommodation in Makkah.",
      "8–10 Nights hotel accommodation in Madinah.",
      "09/10 Nights accommodation in Shisha (including Hajj period).",
      "AC Bus transportation: Jeddah Airport – Shisha Apartment – Mina – Arafah – Muzdalifah – Makkah – Madinah – Airport.",
      "Hajj Visa Fee.",
      "Health Insurance.",
      "Meet & assist by local authorities at Jeddah Airport.",
      "Ziyarah / sightseeing tour in Makkah and Madinah.",
      "Dedicated Bengali Muallim/guide for the full period.",
      "Workshop on Hajj (Q&A) + weekly MCQ exams starting two months before travel.",
      "Hajj guide book in Bangla.",
    ],
    excludes: [
      "Kurbani (dome shokor) is not included (Approx. SR 700–800 per person).",
      "On 10 Zil Hajja, transportation is not provided from Muzdalifah to Jamarat to Shisha Apartment / Masjid-Al-Haram and return.",
      "Any personal costs not mentioned above.",
    ],
    optional: [
      "VIP Tent (Maktab) + special VIP bus service: approx. TK. 3,00,000 added per person (already included in premium packages).",
      "Special rooms (Haram view, Kaba view, Suite Room, etc.) and extra mazarat/tours (Jeddah, Taif, Hudaibiyah, Wadi Jinn, Badar, etc.).",
    ],
    requirements: [
      "Hajj pre-registration (TK. 30,000 per person; refundable as per stated policy).",
      "Scanned copy of NID for adult and birth certificate for child.",
      "Scanned copy of passport (minimum validity until 31 Dec 2026).",
      "One copy passport-size photograph.",
    ],
    cancellationPolicy: [
      "Fully non-refundable, non-changeable, and non-transferable as per Saudi & Bangladesh Hajj package policies.",
    ],
  },
];

/* =========================
   UI BLOCKS
========================= */

function PricingTiers({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={[
            "rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4",
            "shadow-[0_10px_28px_rgba(2,6,23,0.05)]",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[var(--evg-deep)]">
              {t.name}
            </div>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700">
              Per person
            </span>
          </div>

          {t.note ? (
            <div className="mt-1 text-xs text-slate-500">{t.note}</div>
          ) : null}

          <div className="mt-3 space-y-2">
            {t.rows.map((r) => (
              <div
                key={`${t.name}-${r.label}`}
                className="flex items-start justify-between gap-4"
              >
                <div className="text-sm text-slate-700">{r.label}</div>
                <div className="text-sm text-slate-900">{r.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HotelTiers({ tiers }: { tiers: HotelTier[] }) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={[
            "rounded-2xl border border-slate-200/70 bg-white p-4",
            "shadow-[0_10px_28px_rgba(2,6,23,0.05)]",
          ].join(" ")}
        >
          <div className="text-sm font-semibold text-[var(--evg-deep)]">
            {t.name}
          </div>

          <div className="mt-3 space-y-2 text-sm text-slate-700">
            {t.madinah ? (
              <div className="flex gap-2">
                <span className="text-slate-500">Madinah:</span>
                <span className="text-slate-800">{t.madinah}</span>
              </div>
            ) : null}
            {t.makkah ? (
              <div className="flex gap-2">
                <span className="text-slate-500">Makkah:</span>
                <span className="text-slate-800">{t.makkah}</span>
              </div>
            ) : null}
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Google Map links can be added here when provided.
          </div>
        </div>
      ))}
    </div>
  );
}

/* smooth accordion using grid row transition */
function Accordion({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      ].join(" ")}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/* =========================
   UMRAH VIEW
========================= */

function UmrahPackages() {
  // const [activeId, setActiveId] = React.useState<string | null>(umrahPackages[0]?.id ?? null);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      {umrahPackages.map((p) => {
        const open = p.id === activeId;

        return (
          <Card
            key={p.id}
            hairline
            className={[
              "transition",
              open
                ? "ring-2 ring-[var(--evg-gold)]/15 border-[var(--evg-gold)]/45"
                : "",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setActiveId(open ? null : p.id)}
              className="w-full text-left p-5 sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">
                      🕋
                    </span>
                    <div className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--evg-deep)]">
                      {p.title}
                    </div>
                  </div>

                  <div className="mt-1 text-sm text-slate-600">
                    {p.subtitle}
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-slate-700">
                    <div>{p.heroLine1}</div>
                    <div className="text-slate-600">{p.heroLine2}</div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge>Group travel: {p.groupTravelDate}</Badge>
                    <Badge>Valid till 31 Dec 2026</Badge>
                    {p.note ? <Badge>{p.note}</Badge> : null}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div
                    className={[
                      "h-11 w-11 rounded-2xl grid place-items-center border",
                      open
                        ? "border-[var(--evg-gold)]/60 bg-[rgba(214,162,58,0.08)]"
                        : "border-slate-200 bg-slate-50",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span
                      className={open ? "rotate-180 transition" : "transition"}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </button>

            <Accordion open={open}>
              <div>
                <div className="h-px w-full bg-slate-200/70" />
                <div className="p-5 sm:p-7">
                  <KeyValueGrid
                    rows={[
                      { k: "Package", v: p.subtitle },
                      { k: "Group travel date", v: p.groupTravelDate },
                      { k: "Headline", v: p.heroLine1 },
                      { k: "Route & nights", v: p.heroLine2 },
                    ]}
                  />

                  <Subheading>Package Price Details / Per Person</Subheading>
                  <PricingTiers tiers={p.pricing} />

                  <Subheading>Hotel Details</Subheading>
                  <HotelTiers tiers={p.hotels} />

                  <Subheading>Package Includes</Subheading>
                  <BulletList items={p.includes} tone="gold" />

                  <Subheading>Package Excludes</Subheading>
                  <BulletList items={p.excludes} tone="muted" />

                  <Subheading>Optional</Subheading>
                  <BulletList items={p.optional} tone="blue" />

                  <Subheading>Payment Policy</Subheading>
                  <BulletList items={p.paymentPolicy} tone="gold" />

                  <Subheading>Requirements</Subheading>
                  <BulletList items={p.requirements} tone="blue" />

                  <Subheading>Cancellation Policy</Subheading>
                  <BulletList items={p.cancellationPolicy} tone="muted" />

                  <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-slate-600">
                      Want EVG to confirm availability and exact pricing for
                      your dates?
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
                      >
                        Get Consultation
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                      >
                        Request Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
          </Card>
        );
      })}
    </div>
  );
}

/* =========================
   HAJJ VIEW
========================= */

function HajjPackages() {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      {hajjPackages.map((p) => {
        const open = p.id === activeId;

        return (
          <Card
            key={p.id}
            hairline
            className={[
              "transition",
              open
                ? "ring-2 ring-[var(--evg-gold)]/15 border-[var(--evg-gold)]/45"
                : "",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setActiveId(open ? null : p.id)}
              className="w-full text-left p-5 sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">
                      🕋
                    </span>
                    <div className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--evg-deep)]">
                      {p.title}
                    </div>
                  </div>

                  <div className="mt-1 text-sm text-slate-600">
                    {p.subtitle}
                  </div>

                  <div className="mt-3 text-sm text-slate-700 leading-relaxed">
                    {p.summary}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge>Hajj</Badge>
                    {p.id === "cheap-hajj-40-days" ? (
                      <Badge>Approx. May 2026</Badge>
                    ) : (
                      <Badge>Pre-registration</Badge>
                    )}
                    <Badge>Details expandable</Badge>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div
                    className={[
                      "h-11 w-11 rounded-2xl grid place-items-center border",
                      open
                        ? "border-[var(--evg-gold)]/60 bg-[rgba(214,162,58,0.08)]"
                        : "border-slate-200 bg-slate-50",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span
                      className={open ? "rotate-180 transition" : "transition"}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </button>

            <Accordion open={open}>
              <div>
                <div className="h-px w-full bg-slate-200/70" />
                <div className="p-5 sm:p-7">
                  <KeyValueGrid rows={p.quickFacts} />

                  {p.note ? <AccentCallout>{p.note}</AccentCallout> : null}

                  {p.includes?.length ? (
                    <>
                      <Subheading>Details / Notes</Subheading>
                      <BulletList items={p.includes} tone="blue" />
                    </>
                  ) : null}

                  {p.pricing?.length ? (
                    <>
                      <Subheading>
                        Package Price Details / Per Person
                      </Subheading>
                      <PricingTiers tiers={p.pricing} />
                    </>
                  ) : null}

                  {p.hotels?.length ? (
                    <>
                      <Subheading>Hotel / Apartment Details</Subheading>
                      <HotelTiers tiers={p.hotels} />
                    </>
                  ) : null}

                  {p.excludes?.length ? (
                    <>
                      <Subheading>Package Excludes</Subheading>
                      <BulletList items={p.excludes} tone="muted" />
                    </>
                  ) : null}

                  {p.optional?.length ? (
                    <>
                      <Subheading>Optional</Subheading>
                      <BulletList items={p.optional} tone="blue" />
                    </>
                  ) : null}

                  {p.requirements?.length ? (
                    <>
                      <Subheading>Requirements</Subheading>
                      <BulletList items={p.requirements} tone="blue" />
                    </>
                  ) : null}

                  {p.cancellationPolicy?.length ? (
                    <>
                      <Subheading>Cancellation Policy</Subheading>
                      <BulletList items={p.cancellationPolicy} tone="muted" />
                    </>
                  ) : null}

                  <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-slate-600">
                      Want EVG to guide your registration and package selection?
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
                      >
                        Get Consultation
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
                      >
                        Request Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
          </Card>
        );
      })}
    </div>
  );
}

// function ReferenceSection() {
//   return (
//     <Card hairline className="p-5 sm:p-7">
//       <div className="flex items-center gap-3">
//         <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--evg-deep)]">
//           Packages (planned)
//         </h2>
//         <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
//       </div>

//       <p className="mt-3 text-sm sm:text-base text-slate-600">
//         Later we’ll add the rest (including Bangla version). References:
//       </p>

//       <div className="mt-4 grid gap-3 sm:grid-cols-2">
//         <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
//           <div className="text-xs uppercase tracking-wide text-slate-500">
//             Umrah list
//           </div>
//           <div className="mt-2 text-sm text-slate-800">
//             obokash.com/umrah-packages-from-bangladesh
//           </div>
//         </div>

//         <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]">
//           <div className="text-xs uppercase tracking-wide text-slate-500">
//             Packages UI reference
//           </div>
//           <div className="mt-2 text-sm text-slate-800">
//             akashbariholidays.com/packages
//           </div>
//         </div>
//       </div>

//       <AccentCallout>
//         The package list uses a smooth expand/collapse transition. We can later
//         match Akashbari’s feel even closer once we finalize their exact behavior
//         and spacing.
//       </AccentCallout>
//     </Card>
//   );
// }

export default function HajjUmrahPage() {
  const [mode, setMode] = React.useState<ModeKey>("umrah");

  return (
    <PageShell>
      <Container>
        <HeaderCard mode={mode} onMode={setMode} />

        <Divider />

        {mode === "umrah" ? <UmrahPackages /> : <HajjPackages />}

        {/* <Divider /> */}

        {/* <ReferenceSection /> */}
      </Container>
    </PageShell>
  );
}
