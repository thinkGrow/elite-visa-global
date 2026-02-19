// src/app/hajj-umrah/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/home/layout/Navbar";
import { themeVars } from "@/lib/theme";
import { EvgCard } from "@/components/ui/EvgCard";

type TabKey = "hajj" | "umrah";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6">{children}</div>;
}

function TopDivider() {
  return <div className="absolute top-0 left-0 w-full h-px bg-black/5" />;
}

function BottomFade() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-black/[0.03]" />
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
      <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
        {eyebrow}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
          {title}
        </h2>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
      </div>

      {subtitle ? (
        <p className="mt-6 text-[17px] leading-relaxed text-[color:var(--evg-deep)]/75">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-[color:var(--evg-deep)]/70 shadow-sm">
      {children}
    </span>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-base sm:text-lg font-semibold text-[var(--evg-deep)] flex items-center gap-3">
      <span className="h-2 w-2 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.14)]" />
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t, i) => (
        <li
          key={i}
          className="flex gap-3 text-sm sm:text-base text-[color:var(--evg-deep)]/75"
        >
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--evg-blue)]/70" />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
      {children}
    </div>
  );
}

function PriceTable({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="mt-5 rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(2,6,23,0.06)] overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/60">
        <div className="text-sm font-semibold text-[var(--evg-deep)]">
          {title}
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {rows.map((r) => (
          <div
            key={r.label}
            className="px-5 py-3 flex items-start justify-between gap-4"
          >
            <div className="text-sm text-[color:var(--evg-deep)]/70">
              {r.label}
            </div>
            <div className="text-sm font-semibold text-[var(--evg-deep)] whitespace-nowrap">
              {r.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HajjUmrahPage() {
  const [tab, setTab] = React.useState<TabKey>("umrah");

  return (
    <main style={themeVars} className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden bg-white pt-24">
        {/* soft EVG blue glow */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(28,90,168,0.10) 0%, rgba(28,90,168,0.04) 40%, transparent 70%)",
          }}
        />
        <TopDivider />

        <Container>
          <div className="py-12 sm:py-16">
            <SectionHeader
              eyebrow="ELITE HAJJ KAFELA"
              title="Hajj & Umrah"
              subtitle="Explore packages with clear inclusions, pricing tiers, and a structured booking process. Static for now — designed to be CMS-ready later."
            />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="w-full sm:w-[360px]">
                <label className="block text-xs uppercase tracking-wide text-[color:var(--evg-deep)]/55">
                  Dropdown
                </label>
                <div className="mt-2 relative">
                  <select
                    value={tab}
                    onChange={(e) => setTab(e.target.value as TabKey)}
                    className={[
                      "w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm sm:text-base",
                      "text-[var(--evg-deep)] shadow-sm outline-none transition",
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

            <div className="mt-10">
              {tab === "umrah" ? <UmrahTab /> : <HajjTab />}
            </div>

            <div className="mt-16">
              <Card>
                <div className="text-sm font-semibold text-[var(--evg-deep)]">
                  References for future packages (source lists)
                </div>
                <div className="mt-3 space-y-2 text-sm text-[color:var(--evg-deep)]/75">
                  <div>
                    <Link
                      className="underline underline-offset-4 decoration-[var(--evg-gold)] text-[var(--evg-deep)] hover:opacity-80"
                      href="https://www.obokash.com/umrah-packages-from-bangladesh"
                      target="_blank"
                    >
                      obokash.com/umrah-packages-from-bangladesh
                    </Link>
                  </div>
                  <div>
                    <Link
                      className="underline underline-offset-4 decoration-[var(--evg-gold)] text-[var(--evg-deep)] hover:opacity-80"
                      href="https://www.akashbariholidays.com/packages"
                      target="_blank"
                    >
                      akashbariholidays.com/packages
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>

        <BottomFade />
      </section>
    </main>
  );
}

/* =========================
   UMRAH TAB
========================= */

function UmrahTab() {
  return (
    <div className="space-y-10">
      {/* Package cards (CMS-ish list) */}
      <div className="grid gap-8 md:grid-cols-2">
        <EvgCard
          variant="package"
          title="First Ramadan Umrah Package – 14 Days"
          description="18 Tuesday in Makkah | Start from Tk. 1,70,000 | Return Flight | 5N Madinah + 8N Makkah | Price Valid Till 31 Dec 2026"
          href="#umrah-first-ramadan"
          icon="🌙"
          ctaLabel="View package"
          badge="Ramadan"
        />
        <EvgCard
          variant="package"
          title="Last Ramadan Umrah Package – 16 Days"
          description="17 Tuesdays in Makkah | From Tk. 2,25,000 | Return Flight | 13N Makkah + 4N Madinah | Price Valid Till 31 Dec 2026"
          href="#umrah-last-ramadan"
          icon="🌙"
          ctaLabel="View package"
          badge="Ramadan"
        />
      </div>

      {/* Details */}
      <UmrahFirstRamadan />
      <UmrahLastRamadan />
    </div>
  );
}

function UmrahFirstRamadan() {
  return (
    <section id="umrah-first-ramadan" className="scroll-mt-28">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-[0.22em] text-[color:var(--evg-deep)]/55">
              UMRAH PACKAGE
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--evg-deep)]">
              First Ramadan Umrah Package – 14 Days
            </h3>
            <p className="mt-3 text-sm text-[color:var(--evg-deep)]/75 leading-relaxed">
              18 Tuesday in Makkah | Start from Tk. 1,70,000 • Return Flight •
              5N Madinah + 8N Makkah • Price valid till 31 Dec 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Pill>February: 30 (Group Travel)</Pill>
            <Pill>Custom dates available (conditions apply)</Pill>
          </div>
        </div>

        <Subheading>Package Price Details / Per Person</Subheading>

        <PriceTable
          title="Economy"
          rows={[
            { label: "Five/Six Bed share basis", value: "Tk. 1,70,000" },
            { label: "Adult on Quad share basis", value: "Tk. 1,80,000" },
            { label: "Adult on triple share basis", value: "Tk. 1,90,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 2,15,000",
            },
            { label: "Single share basis", value: "Tk. 2,90,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <PriceTable
          title="Standard"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 2,05,000" },
            { label: "Adult on triple share basis", value: "Tk. 2,25,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 2,70,000",
            },
            { label: "Single share basis", value: "Tk. 3,80,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <PriceTable
          title="Deluxe"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 2,30,000" },
            { label: "Adult on triple share basis", value: "Tk. 2,60,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 3,10,000",
            },
            { label: "Single share basis", value: "Tk. 4,55,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <PriceTable
          title="Superior"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 2,95,000" },
            { label: "Adult on triple share basis", value: "Tk. 3,30,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 4,00,000",
            },
            { label: "Single share basis", value: "Tk. 6,25,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <PriceTable
          title="Premium"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 3,80,000" },
            { label: "Adult on triple share basis", value: "Tk. 4,25,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 5,20,000",
            },
            { label: "Single share basis", value: "Tk. 8,75,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <Subheading>Hotel Details (Google Map links to be added)</Subheading>
        <BulletList
          items={[
            "Economy: Madinah — Diyar Al Noor or similar (≈ 750m from Masjid Al Nabawi) • Makkah — Emaar Khair Al Masi or similar (≈ 750m from Masjid Al Haram).",
            "Standard: Madinah — Plaza inn Ohud or similar (≈ 250m) • Makkah — Olyan Golden or similar (≈ 450m).",
            "Deluxe: Madinah — Karam Al-Hejaz or similar (≈ 200m) • Makkah — Snood Ajyad or similar (≈ 300m).",
            "Superior: Madinah — Emaar Elite or similar (≈ 50m) • Makkah — Anjum Makkah or similar (≈ 100m).",
            "Premium: Madinah — Al Aqeeq Madinah or similar (≈ 100m) • Makkah — Pullman Zamzam or similar (0m).",
          ]}
        />

        <Subheading>Package Includes</Subheading>
        <BulletList
          items={[
            "Return air ticket (Economy Class): Dhaka – Madinah – Jeddah – Dhaka (including taxes)",
            "05 nights hotel accommodation in Madinah",
            "08 nights hotel accommodation in Makkah",
            "Daily Sahoor/Iftar at the hotel (Only Premium & Superior)",
            "Transport: Madinah Airport – Madinah Hotel – Makkah Hotel – Jeddah Airport",
            "Umrah visa fee, Health insurance, Meet & assist at Madinah Airport",
            "Ziyarah tours in Madinah and Makkah",
            "Dedicated Bengali Muallim during Umrah",
            "Umrah guidebook in Bangla",
          ]}
        />

        <Subheading>Package Excludes</Subheading>
        <BulletList
          items={[
            "Food (lunch/dinner) where not specified; available at hotel/restaurant (approx. SR 25 per day per person)",
            "Personal costs or anything not mentioned above",
          ]}
        />

        <Subheading>Optional (Extra Charges)</Subheading>
        <BulletList
          items={[
            "Special rooms (Haram view, Kaaba view, suites, etc.)",
            "Additional tours (Jeddah, Taif, Hudaibiyah, Wadi Jinn, etc.)",
            "Other countries with Umrah (Dubai, Egypt, Turkey, etc.)",
          ]}
        />

        <Subheading>Payment Policy</Subheading>
        <BulletList
          items={[
            "Phase-1: 80% at the time of booking",
            "Phase-2: 20% before seven days of travel date",
          ]}
        />

        <Subheading>Requirements</Subheading>
        <BulletList
          items={[
            "Bangladeshi passport valid for at least 6 months",
            "One copy passport-size white background photograph",
          ]}
        />

        <Subheading>Cancellation Policy</Subheading>
        <BulletList
          items={[
            "Non-refundable and non-changeable (except air tickets)",
            "Air ticket re-issue/refund charges depend on airline policy",
          ]}
        />
      </Card>
    </section>
  );
}

function UmrahLastRamadan() {
  return (
    <section id="umrah-last-ramadan" className="scroll-mt-28 mt-10">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-[0.22em] text-[color:var(--evg-deep)]/55">
              UMRAH PACKAGE
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--evg-deep)]">
              Last Ramadan Umrah Package – 16 Days
            </h3>
            <p className="mt-3 text-sm text-[color:var(--evg-deep)]/75 leading-relaxed">
              17 Tuesdays in Makkah | From Tk. 2,25,000 • Return Flight • 13N
              Makkah + 4N Madinah • Price valid till 31 Dec 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Pill>March: 25 (Group Travel)</Pill>
            <Pill>Custom dates available (conditions apply)</Pill>
          </div>
        </div>

        <Subheading>Package Price Details / Per Person</Subheading>

        <PriceTable
          title="Economy"
          rows={[
            { label: "Five/Six Bed share basis", value: "Tk. 2,25,000" },
            { label: "Adult on Quad share basis", value: "Tk. 2,40,000" },
            { label: "Adult on triple share basis", value: "Tk. 2,65,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 3,20,000",
            },
            { label: "Single share basis", value: "Tk. 4,75,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <PriceTable
          title="Standard"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 2,90,000" },
            { label: "Adult on triple share basis", value: "Tk. 3,35,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 4,35,000",
            },
            { label: "Single share basis", value: "Tk. 6,95,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <PriceTable
          title="Deluxe"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 3,35,000" },
            { label: "Adult on triple share basis", value: "Tk. 3,85,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 4,90,000",
            },
            { label: "Single share basis", value: "Tk. 8,10,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 55,000" },
          ]}
        />

        <PriceTable
          title="Superior"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 5,05,000" },
            { label: "Adult on triple share basis", value: "Tk. 6,05,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 7,20,000",
            },
            { label: "Single share basis", value: "Tk. 14,05,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 50,000" },
          ]}
        />

        <PriceTable
          title="Premium"
          rows={[
            { label: "Adult on Quad share basis", value: "Tk. 7,50,000" },
            { label: "Adult on triple share basis", value: "Tk. 8,70,000" },
            {
              label: "Adult on Double/Twin share basis",
              value: "Tk. 10,70,000",
            },
            { label: "Single share basis", value: "Tk. 19,60,000" },
            {
              label: "Child with Bed",
              value: "Less than Tk. 10,000 from Adult",
            },
            { label: "Child No Bed (Parent Sharing)", value: "Tk. 1,30,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 50,000" },
          ]}
        />

        <Subheading>Hotel Details (Google Map links to be added)</Subheading>
        <BulletList
          items={[
            "Economy: Makkah — Emaar Khair Al Masi or similar (≈ 750m) • Madinah — Diyar Al Noor or similar (≈ 800m).",
            "Standard: Makkah — Al Olyan Golden or similar (≈ 450m) • Madinah — Plaza inn Ohud or similar (≈ 250m).",
            "Deluxe: Makkah — Emaar Andalusiah or similar (≈ 300m) • Madinah — Karam Al-Hejaz or similar (≈ 200m).",
            "Superior: Makkah — Anjum Makkah or similar (≈ 100m) • Madinah — Emaar Elite or similar (≈ 50m).",
            "Premium: Makkah — Pullman Zamzam or similar (0m) • Madinah — Al Aqeeq Madinah or similar (≈ 100m).",
          ]}
        />

        <Subheading>Package Includes</Subheading>
        <BulletList
          items={[
            "Return air ticket (Economy Class): Dhaka – Jeddah – Madinah – Dhaka (including taxes)",
            "12 nights hotel accommodation in Makkah",
            "04 nights hotel accommodation in Madinah",
            "Daily Sahoor/Iftar/Breakfast at hotel (Only Premium & Superior)",
            "Transport: Jeddah Airport – Makkah Hotel – Madinah Hotel – Madinah Airport",
            "Umrah visa fee, Health insurance, Meet & assist at Madinah Airport",
            "Ziyarah tours in Madinah and Makkah",
            "Dedicated Bengali Muallim during Umrah",
            "Umrah guidebook in Bangla",
          ]}
        />

        <Subheading>Package Excludes</Subheading>
        <BulletList
          items={[
            "Food (lunch/dinner) where not specified; available at hotel/restaurant (approx. SR 25 per day per person)",
            "Personal costs or anything not mentioned above",
          ]}
        />

        <Subheading>Optional (Extra Charges)</Subheading>
        <BulletList
          items={[
            "Special rooms (Haram view, Kaaba view, suites, etc.)",
            "Additional tours (Jeddah, Taif, Hudaibiyah, Wadi Jinn, etc.)",
            "Other countries with Umrah (Dubai, Egypt, Turkey, etc.)",
          ]}
        />

        <Subheading>Payment Policy</Subheading>
        <BulletList
          items={[
            "Phase-1: 80% at the time of booking",
            "Phase-2: 20% before seven days of travel date",
          ]}
        />

        <Subheading>Requirements</Subheading>
        <BulletList
          items={[
            "Bangladeshi passport valid for at least 6 months",
            "One copy passport-size white background photograph",
          ]}
        />

        <Subheading>Cancellation Policy</Subheading>
        <BulletList
          items={[
            "Non-refundable and non-changeable (except air tickets)",
            "Air ticket re-issue/refund charges depend on airline policy",
          ]}
        />
      </Card>
    </section>
  );
}

/* =========================
   HAJJ TAB
========================= */

function HajjTab() {
  return (
    <div className="space-y-10">
      <div className="grid gap-8 md:grid-cols-2">
        <EvgCard
          variant="package"
          title="Hajj Pre-Registration 2026–2027 (Bangladesh)"
          description="Pre-register for Hajj 2026 with BDT 30,000. First-come, first-served reservation for packages & updates."
          href="#hajj-pre-registration"
          icon="🕋"
          ctaLabel="View details"
          badge="Pre-Registration"
        />
        <EvgCard
          variant="package"
          title="40 Days Cheap Hajj Package (Starts Tk. 6,00,000)"
          description="Makkah 20 Nights | Madinah 09/10 Nights | Hajj Period + Shisha 10/11 Nights | Travel approx. 21 May 2026"
          href="#hajj-40-days"
          icon="🕌"
          ctaLabel="View package"
          badge="2026"
        />
      </div>

      <HajjPreRegistration />
      <Hajj40DaysCheap />
    </div>
  );
}

function HajjPreRegistration() {
  return (
    <section id="hajj-pre-registration" className="scroll-mt-28">
      <Card>
        <div className="text-xs tracking-[0.22em] text-[color:var(--evg-deep)]/55">
          HAJJ
        </div>
        <h3 className="mt-2 text-2xl font-semibold text-[var(--evg-deep)]">
          Hajj Pre Registration 2026–2027 From Bangladesh
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--evg-deep)]/75">
          Register for Hajj 2026 now. Pre-registration is going on at only{" "}
          <span className="font-semibold text-[var(--evg-deep)]">
            BDT 30,000
          </span>
          . Book your reservation to get a price estimate for Hajj 2026
          packages.
        </p>

        <div className="mt-4">
          <Link
            href="https://www.obokash.com/hajj-pre-registration-form"
            target="_blank"
            className="text-sm font-semibold text-[var(--evg-gold)] underline underline-offset-4 decoration-[var(--evg-gold)] hover:brightness-110"
          >
            Book reservation (obokash form) →
          </Link>
        </div>

        <Subheading>Hajj Pre-register Time (given in your content)</Subheading>
        <BulletList
          items={[
            "Registration process for Hajj 1447H / 2026 must be completed by October 12, 2025 (as per your provided text).",
            "Note: You may want to verify/update this date from official sources before final publish.",
          ]}
        />

        <Subheading>Documents required for Early Registration</Subheading>
        <BulletList
          items={[
            "Adult (Bangladeshi Resident): Govt fee BDT 30,000 • NID/Passport scan • Valid mobile number",
            "NRB Applicant: Govt fee BDT 30,000 • Passport scans • Birth certificate • Photo • Work permit/ID/Visa • Mobile + email",
            "Child (with parents): Govt fee BDT 30,000 • Birth certificate/Passport scan • Photo • Parent’s mobile number",
            "Note: Pre-registration validated for 2 years (as per your text).",
          ]}
        />

        <Subheading>Government Pre-Registration Fee</Subheading>
        <BulletList
          items={["BDT 30,000 per person (mandated government fee)."]}
        />

        <Subheading>Processing Time</Subheading>
        <BulletList
          items={[
            "Elite Hajj Kafela completes pre-registration within 1–3 business days.",
          ]}
        />

        <Subheading>Latest Hajj News Update (as provided)</Subheading>
        <BulletList
          items={[
            "Preliminary registration begins July 1 and continues until October 12 (as per provided text).",
            "Online application process expected to be implemented (as per provided text).",
            "Final package pricing announced after Saudi phase + airfare determination (as per provided text).",
          ]}
        />

        <Subheading>Note</Subheading>
        <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--evg-deep)]/75">
          The Hajj pre-registration process at EHK is nearing completion (as per
          your provided text). We’ll help make pilgrimage preparation smooth and
          secure.
        </p>
      </Card>
    </section>
  );
}

function Hajj40DaysCheap() {
  return (
    <section id="hajj-40-days" className="scroll-mt-28 mt-10">
      <Card>
        <div className="text-xs tracking-[0.22em] text-[color:var(--evg-deep)]/55">
          HAJJ PACKAGE
        </div>
        <h3 className="mt-2 text-2xl font-semibold text-[var(--evg-deep)]">
          40 Days Cheap Hajj Package
        </h3>
        <p className="mt-3 text-sm text-[color:var(--evg-deep)]/75 leading-relaxed">
          Makkah 20 Nights | Madinah 09/10 Nights | Hajj Period + Shisha 10/11
          Nights • Travel approx. 21 May 2026 • Starts from Tk. 6,00,000
        </p>

        <Subheading>Duration of Stay</Subheading>
        <BulletList
          items={[
            "Hajj Period + Shisha/Aziziyah: 21 MAY – 01 JUN 2026 (04 ZH – 15 ZH 1447)",
            "Makkah: 01 JUN – 20 JUN 2026 (15 ZH – 05 MH 1448)",
            "Madinah: 20 JUN – 30 JUN 2026 (05 MH – 15 MH 1448)",
          ]}
        />

        <Subheading>Package Includes</Subheading>
        <BulletList
          items={[
            "Economy class return air ticket Dhaka ↔ Jeddah (Saudi/Biman/Flynas; subject to availability)",
            "20 nights Makkah hotel, 8–10 nights Madinah hotel",
            "09/10 nights accommodation in Shisha (including Hajj period)",
            "Meals: catering (economy/standard/deluxe) + buffet policy-based (superior/premium)",
            "AC bus transportation across routes (airport/hotels/Mina/Arafah/Muzdalifah)",
            "Hajj visa fee, health insurance, meet & assist at Jeddah Airport",
            "Ziyarah tours in Makkah & Madinah",
            "Dedicated Bengali Muallim/guide; workshops + MCQ exams (as provided)",
            "Hajj guidebook in Bangla",
          ]}
        />

        <Subheading>Package Excludes</Subheading>
        <BulletList
          items={[
            "Kurbani not included (approx. SR 700–800 per person)",
            "On 10 Zil Hajja: no transport from Muzdalifah to Jamarat to Shisha/Al-Haram and back (as provided)",
            "Personal costs or anything not mentioned",
          ]}
        />

        <Subheading>Package Price Details / Per Person</Subheading>

        <PriceTable
          title="Standard"
          rows={[
            { label: "4/5/6 bed share basis", value: "Tk. 6,00,000" },
            { label: "Triple share basis", value: "Tk. 6,70,000" },
            { label: "Double share basis", value: "Tk. 7,60,000" },
            { label: "Single basis", value: "Tk. 10,50,000" },
            { label: "Child (if quad share)", value: "Tk. 5,50,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 3,70,000" },
          ]}
        />

        <PriceTable
          title="Deluxe"
          rows={[
            { label: "Quint/Quad share basis", value: "Tk. 6,50,000" },
            { label: "Triple share basis", value: "Tk. 7,20,000" },
            { label: "Double share basis", value: "Tk. 8,20,000" },
            { label: "Single basis", value: "Tk. 11,50,000" },
            { label: "Child (if quad share)", value: "Tk. 5,90,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 4,00,000" },
          ]}
        />

        <PriceTable
          title="Superior"
          rows={[
            { label: "Quint/Quad share basis", value: "Tk. 6,90,000" },
            { label: "Triple share basis", value: "Tk. 7,80,000" },
            { label: "Double share basis", value: "Tk. 9,20,000" },
            { label: "Single basis", value: "Tk. 13,50,000" },
            { label: "Child (if quad share)", value: "Tk. 6,50,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 4,50,000" },
          ]}
        />

        <PriceTable
          title="Premium"
          rows={[
            { label: "Quint/Quad share basis", value: "Tk. 9,50,000" },
            { label: "Triple share basis", value: "Tk. 10,40,000" },
            { label: "Double share basis", value: "Tk. 12,00,000" },
            { label: "Single basis", value: "Tk. 19,50,000" },
            { label: "Child (if quad share)", value: "Tk. 8,90,000" },
            { label: "Infant (Parent Sharing)", value: "Tk. 6,70,000" },
          ]}
        />

        <Subheading>
          Hotel/Apartment Details (Google Map links to be added)
        </Subheading>
        <BulletList
          items={[
            "Standard: Makkah — Jawharah al Hijrah (≈ 800m) • Madinah — Dyar Al Noor (≈ 800m).",
            "Deluxe: Makkah — Diyafat Mubarak (≈ 300m) • Madinah — Kayan Al Madinah (≈ 250m).",
            "Superior: Makkah — Maysan Al Mashaer (≈ 200m) • Madinah — Kayan Almasi (≈ 200m).",
            "Premium: Makkah — Al Safwah Royale Orchid (0m) • Madinah — Mias (≈ 100m).",
          ]}
        />

        <Subheading>Optional (Extra Charges)</Subheading>
        <BulletList
          items={[
            "VIP Tent (Maktab) + special VIP bus service (approx. Tk. 3,00,000 per person) — already included in premium packages (as provided).",
            "Special rooms (Haram/Kaaba view, suites) and extra mazarat/tours (Jeddah, Taif, etc.)",
          ]}
        />

        <Subheading>Cancellation Policy</Subheading>
        <BulletList
          items={[
            "Fully non-refundable, non-changeable, and non-transferable (as per provided policy).",
          ]}
        />

        <Subheading>Requirements</Subheading>
        <BulletList
          items={[
            "Hajj pre-registration (Tk. 30,000 per person / refundable — as stated)",
            "Scanned copy of NID (adult) and Birth Certificate (child)",
            "Scanned copy of passport (validity until 31 Dec 2026 — as stated)",
            "One copy passport-size photograph",
          ]}
        />
      </Card>
    </section>
  );
}
