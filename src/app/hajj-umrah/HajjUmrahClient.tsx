// src/app/hajj-umrah/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";

type HajjCategoryKey = "hajj" | "umrah";

/* ===== shared shell bits (same as visa/tours) ===== */

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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-sm sm:text-base text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--evg-blue)]/70" />
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

/* ===== top header dropdown (Visa-style) ===== */

function Dropdown({
  value,
  onChange,
}: {
  value: HajjCategoryKey;
  onChange: (v: HajjCategoryKey) => void;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
        <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
          ELITE VISA GLOBAL
        </div>

        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
            Hajj &amp; Umrah
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>

        <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
          Packages, pre-registration, and guided support—structured and
          transparent. Choose Hajj or Umrah to explore.
        </p>
      </div>

      <div className="w-full sm:w-[420px]">
        <label className="block text-xs uppercase tracking-wide text-slate-500">
          Dropdown Menu
        </label>
        <div className="mt-2 relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as HajjCategoryKey)}
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

        <div className="mt-3 text-xs text-slate-500">
          Click a package to expand. Only one opens at a time.
        </div>
      </div>
    </div>
  );
}

/* ===== accordion ===== */

type AccordionPkg = {
  id: string;
  title: string;
  subtitle?: string;
  metaLeft?: string;
  metaRight?: string;
  highlights: string[];
  body: React.ReactNode;
};

function PackagesAccordion({ items }: { items: AccordionPkg[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <div className="mt-8 grid gap-4">
      {items.map((pkg) => {
        const open = pkg.id === activeId;

        return (
          <Card
            key={pkg.id}
            hairline
            className={[
              "transition",
              open
                ? "border-[var(--evg-gold)]/40 ring-2 ring-[var(--evg-gold)]/15"
                : "hover:border-slate-300",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setActiveId(open ? null : pkg.id)}
              className="w-full text-left p-5 sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-lg sm:text-xl font-semibold text-[var(--evg-deep)]">
                    {pkg.title}
                  </div>

                  {pkg.subtitle ? (
                    <div className="mt-1 text-sm text-slate-600">
                      {pkg.subtitle}
                    </div>
                  ) : null}

                  <div className="mt-3 grid gap-2 text-sm text-slate-700">
                    {pkg.metaLeft ? (
                      <div className="text-slate-700">{pkg.metaLeft}</div>
                    ) : null}
                    {pkg.metaRight ? (
                      <div className="text-slate-600">{pkg.metaRight}</div>
                    ) : null}
                  </div>

                  <ul className="mt-4 grid gap-1 text-sm text-slate-700">
                    {pkg.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--evg-gold)]/80" />
                        <span className="min-w-0">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div
                    className={[
                      "h-10 w-10 rounded-2xl grid place-items-center border",
                      open
                        ? "border-[var(--evg-gold)]/40 bg-[var(--evg-gold)]/10"
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

            {open ? (
              <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                <div className="h-px bg-slate-200/70 mb-6" />
                <div className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {pkg.body}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500">
                    Want EVG to confirm availability and pricing for your dates?
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
                      onClick={() => setActiveId(null)}
                    >
                      Close
                    </button>

                    <Link
                      href="/contact"
                      className="rounded-2xl bg-[var(--evg-deep)] px-4 py-2 text-sm text-white shadow-sm hover:opacity-95 inline-flex items-center justify-center"
                    >
                      Request Details
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}

/* =========================
   UMRAH (2 packages)
========================= */

function Umrah() {
  const packages: AccordionPkg[] = [
    {
      id: "umrah-first-ramadan-14d",
      title: "First Ramadan Umrah Package",
      subtitle: "14 Days • Return Flight • 5N Madinah + 8N Makkah",
      metaLeft: "18 Tuesdays in Makkah • Start from Tk. 1,70,000",
      metaRight: "Price valid till 31 Dec 2026 • Group travel date: Feb 30*",
      highlights: [
        "Return flight (Dhaka → Madinah → Jeddah → Dhaka) incl. taxes (Economy)",
        "Umrah visa fee + health insurance",
        "Ziyarah in Madinah + Makkah",
        "Dedicated Bengali Muallim during Umrah",
      ],
      body: (
        <>
          <AccentCallout>
            Note: Customized dates are also available (conditions apply). Group
            travel date mentioned as provided by the source.
          </AccentCallout>

          <Subheading>Package Price Details (Per Person)</Subheading>
          <KeyValueGrid
            rows={[
              {
                k: "Economy",
                v: (
                  <div className="space-y-1">
                    <div>5/6 bed share: Tk. 1,70,000</div>
                    <div>Quad (adult): Tk. 1,80,000</div>
                    <div>Triple (adult): Tk. 1,90,000</div>
                    <div>Double/Twin (adult): Tk. 2,15,000</div>
                    <div>Single: Tk. 2,90,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
              {
                k: "Standard",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 2,05,000</div>
                    <div>Triple (adult): Tk. 2,25,000</div>
                    <div>Double/Twin (adult): Tk. 2,70,000</div>
                    <div>Single: Tk. 3,80,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
              {
                k: "Deluxe",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 2,30,000</div>
                    <div>Triple (adult): Tk. 2,60,000</div>
                    <div>Double/Twin (adult): Tk. 3,10,000</div>
                    <div>Single: Tk. 4,55,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
              {
                k: "Superior",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 2,95,000</div>
                    <div>Triple (adult): Tk. 3,30,000</div>
                    <div>Double/Twin (adult): Tk. 4,00,000</div>
                    <div>Single: Tk. 6,25,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
              {
                k: "Premium",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 3,80,000</div>
                    <div>Triple (adult): Tk. 4,25,000</div>
                    <div>Double/Twin (adult): Tk. 5,20,000</div>
                    <div>Single: Tk. 8,75,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
            ]}
          />

          <Subheading>Hotel Details (Indicative)</Subheading>
          <BulletList
            items={[
              "Economy: Madinah (Diyar Al Noor or similar ~750m), Makkah (Emaar Khair Al Masi or similar ~750m)",
              "Standard: Madinah (Plaza Inn Ohud or similar ~250m), Makkah (Olyan Golden or similar ~450m)",
              "Deluxe: Madinah (Karam Al-Hejaz or similar ~200m), Makkah (Snood Ajyad or similar ~300m)",
              "Superior: Madinah (Emaar Elite or similar ~50m), Makkah (Anjum Makkah or similar ~100m)",
              "Premium: Madinah (Al Aqeeq or similar ~100m), Makkah (Pullman Zamzam or similar ~0m)",
            ]}
          />

          <Subheading>Package Includes</Subheading>
          <BulletList
            items={[
              "Return air ticket (Economy) incl. taxes: Dhaka – Madinah – Jeddah – Dhaka",
              "05 nights Madinah hotel + 08 nights Makkah hotel",
              "Sahoor/Iftar at hotel (Premium & Superior only)",
              "Transfers: Madinah Airport → Madinah hotel → Makkah hotel → Jeddah Airport",
              "Umrah visa fee + health insurance",
              "Meet & assist at Madinah Airport",
              "Umrah guidebook (Bangla)",
              "Ziyarah in Madinah + Makkah",
              "Dedicated Bengali Muallim at the time of performing Umrah",
            ]}
          />

          <Subheading>Package Excludes</Subheading>
          <BulletList
            items={[
              "Food (lunch/dinner) where not specified (approx. SR 25/day/person)",
              "Personal costs not mentioned",
            ]}
          />

          <Subheading>Optional (Extra Charges)</Subheading>
          <BulletList
            items={[
              "Special rooms (Haram view, Kaaba view, suite, etc.)",
              "Additional tours (Jeddah, Taif, Hudaibiyah, Wadi Jinn, etc.)",
              "Add-on country visits (Dubai, Egypt, Turkey, etc.)",
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
              "Bangladeshi passport valid at least 6 months",
              "One passport-size photo (white background)",
            ]}
          />

          <Subheading>Cancellation Policy</Subheading>
          <BulletList
            items={[
              "Non-refundable and non-changeable (except air tickets)",
              "Airline policy applies for re-issue/refund charges",
            ]}
          />

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
            >
              Get Consultation
            </Link>
          </div>
        </>
      ),
    },
    {
      id: "umrah-last-ramadan-16d",
      title: "Last Ramadan Umrah Package",
      subtitle: "16 Days • Return Flight • 13N Makkah + 4N Madinah",
      metaLeft: "17 Tuesdays in Makkah • Start from Tk. 2,25,000",
      metaRight: "Price valid till 31 Dec 2026 • Group travel date: Mar 25",
      highlights: [
        "Return flight (Dhaka → Jeddah → Madinah → Dhaka) incl. taxes (Economy)",
        "Umrah visa fee + health insurance",
        "Ziyarah in Madinah + Makkah",
        "Dedicated Bengali Muallim during Umrah",
      ],
      body: (
        <>
          <AccentCallout>
            Note: Customized dates are also available (conditions apply).
          </AccentCallout>

          <Subheading>Package Price Details (Per Person)</Subheading>
          <KeyValueGrid
            rows={[
              {
                k: "Economy",
                v: (
                  <div className="space-y-1">
                    <div>5/6 bed share: Tk. 2,25,000</div>
                    <div>Quad (adult): Tk. 2,40,000</div>
                    <div>Triple (adult): Tk. 2,65,000</div>
                    <div>Double/Twin (adult): Tk. 3,20,000</div>
                    <div>Single: Tk. 4,75,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
              {
                k: "Standard",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 2,90,000</div>
                    <div>Triple (adult): Tk. 3,35,000</div>
                    <div>Double/Twin (adult): Tk. 4,35,000</div>
                    <div>Single: Tk. 6,95,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
              {
                k: "Deluxe",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 3,35,000</div>
                    <div>Triple (adult): Tk. 3,85,000</div>
                    <div>Double/Twin (adult): Tk. 4,90,000</div>
                    <div>Single: Tk. 8,10,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 55,000</div>
                  </div>
                ),
              },
              {
                k: "Superior",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 5,05,000</div>
                    <div>Triple (adult): Tk. 6,05,000</div>
                    <div>Double/Twin (adult): Tk. 7,20,000</div>
                    <div>Single: Tk. 14,05,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 50,000</div>
                  </div>
                ),
              },
              {
                k: "Premium",
                v: (
                  <div className="space-y-1">
                    <div>Quad (adult): Tk. 7,50,000</div>
                    <div>Triple (adult): Tk. 8,70,000</div>
                    <div>Double/Twin (adult): Tk. 10,70,000</div>
                    <div>Single: Tk. 19,60,000</div>
                    <div>Child with bed: Less Tk. 10,000 from adult</div>
                    <div>Child no bed: Tk. 1,30,000</div>
                    <div>Infant: Tk. 50,000</div>
                  </div>
                ),
              },
            ]}
          />

          <Subheading>Hotel Details (Indicative)</Subheading>
          <BulletList
            items={[
              "Economy: Makkah (Emaar Khair Al Masi or similar ~750m), Madinah (Diyar Al Noor or similar ~800m)",
              "Standard: Makkah (Al Olyan Golden or similar ~450m), Madinah (Plaza Inn Ohud or similar ~250m)",
              "Deluxe: Makkah (Emaar Andalusiah or similar ~300m), Madinah (Karam Al-Hejaz or similar ~200m)",
              "Superior: Makkah (Anjum Makkah or similar ~100m), Madinah (Emaar Elite or similar ~50m)",
              "Premium: Makkah (Pullman Zamzam or similar ~0m), Madinah (Al Aqeeq or similar ~100m)",
            ]}
          />

          <Subheading>Package Includes</Subheading>
          <BulletList
            items={[
              "Return air ticket (Economy) incl. taxes: Dhaka – Jeddah – Madinah – Dhaka",
              "12 nights Makkah hotel + 04 nights Madinah hotel",
              "Sahoor/Iftar/Breakfast at hotel (Premium & Superior only)",
              "Transfers: Jeddah Airport → Makkah hotel → Madinah hotel → Madinah Airport",
              "Umrah visa fee + health insurance",
              "Meet & assist at Madinah Airport",
              "Umrah guidebook (Bangla)",
              "Ziyarah in Madinah + Makkah",
              "Dedicated Bengali Muallim at the time of performing Umrah",
            ]}
          />

          <Subheading>Package Excludes</Subheading>
          <BulletList
            items={[
              "Food (lunch/dinner) where not specified (approx. SR 25/day/person)",
              "Personal costs not mentioned",
            ]}
          />

          <Subheading>Optional (Extra Charges)</Subheading>
          <BulletList
            items={[
              "Special rooms (Haram view, Kaaba view, suite, etc.)",
              "Additional tours (Jeddah, Taif, Hudaibiyah, Wadi Jinn, Badar, etc.)",
              "Add-on country visits (Dubai, Egypt, Turkey, etc.)",
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
              "Bangladeshi passport valid at least 6 months",
              "One passport-size photo (white background)",
            ]}
          />

          <Subheading>Cancellation Policy</Subheading>
          <BulletList
            items={[
              "Non-refundable and non-changeable (except air tickets)",
              "Airline policy applies for re-issue/refund charges",
            ]}
          />

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
            >
              Get Consultation
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <PackagesAccordion items={packages} />

      <Divider />

      <Card hairline className="p-5 sm:p-7">
        <div className="text-sm text-slate-700 leading-relaxed">
          Later we’ll add more Umrah packages (including Bangla version).
          Reference sources:
          <div className="mt-2 space-y-1">
            <div>
              <Link
                href="https://www.obokash.com/umrah-packages-from-bangladesh"
                target="_blank"
                className="text-[var(--evg-deep)] underline underline-offset-4 decoration-[var(--evg-gold)] hover:opacity-80"
              >
                obokash.com/umrah-packages-from-bangladesh
              </Link>
            </div>
            <div>
              <Link
                href="https://www.akashbariholidays.com/packages"
                target="_blank"
                className="text-[var(--evg-deep)] underline underline-offset-4 decoration-[var(--evg-gold)] hover:opacity-80"
              >
                akashbariholidays.com/packages
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* =========================
   HAJJ (2 packages)
========================= */

function Hajj() {
  const packages: AccordionPkg[] = [
    {
      id: "hajj-pre-reg-2026",
      title: "Hajj Pre Registration 2026–2027 (Bangladesh)",
      subtitle: "Register for Hajj 2026 Now",
      metaLeft:
        "Pre-registration fee: Tk. 30,000 (government) • First-come, first-served",
      metaRight:
        "Registration process deadline mentioned: Oct 12, 2025 (as provided)",
      highlights: [
        "Adult + NRB + Child registration options",
        "Required docs list + process overview",
        "Processing time: 1–3 business days (as stated)",
        "Online application noted for the first time (as stated)",
      ],
      body: (
        <>
          <p>
            Be the first to receive essential information and secure your place
            with early pre-registration. This section summarizes the provided
            details and requirements for Hajj 2026.
          </p>

          <Subheading>Pre-registration Fee</Subheading>
          <KeyValueGrid
            rows={[
              { k: "Government Fee", v: "Tk. 30,000 per person (mandated)" },
              { k: "Validation", v: "Pre-registration is validated for 2 years" },
              { k: "Processing Time", v: "1–3 business days (as stated)" },
            ]}
          />

          <Subheading>Documents Required (Adult - Bangladeshi Resident)</Subheading>
          <BulletList
            items={[
              "Hajj pre-registration government fee: Tk. 30,000 per person",
              "NID / Passport scanned copy",
              "Valid mobile number",
            ]}
          />

          <Subheading>Documents Required (NRB Applicant)</Subheading>
          <BulletList
            items={[
              "Hajj pre-registration government fee: Tk. 30,000 per person",
              "Color scanned passport (foreign/Bangladeshi passport)",
              "Birth certificate (color scanned copy)",
              "Passport size color photo (soft copy)",
              "Work permit / ID card / visa copy",
              "Valid mobile number and email",
            ]}
          />

          <Subheading>Documents Required (Child Applicant - With Parents)</Subheading>
          <BulletList
            items={[
              "Hajj pre-registration government fee: Tk. 30,000 per person",
              "Birth certificate / passport copy (color scanned)",
              "Passport size color photo (soft copy)",
              "Parent’s valid mobile number",
            ]}
          />

          <Subheading>System & Process (As Provided)</Subheading>
          <AccentCallout>
            EHK pre-registration supports the Saudi “e-Hajj system” with IT
            support mentioned from Business Automation Ltd. (via the Ministry of
            Religious Affairs). Email uniqueness and separate training vs
            original server environment were mentioned as key notes.
          </AccentCallout>

          <Subheading>Latest Hajj News Update (As Provided)</Subheading>
          <BulletList
            items={[
              "Preliminary registration noted: July 1 to Oct 12 (as stated)",
              "Ministry aiming to reduce package price vs last year (as stated)",
              "Final price announced later after Saudi phase + airfare costs (as stated)",
              "Online application noted to be implemented for the first time (as stated)",
            ]}
          />

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
            >
              Get Consultation
            </Link>
          </div>
        </>
      ),
    },
    {
      id: "hajj-40d-cheap-2026",
      title: "40 Days Cheap Hajj Package",
      subtitle: "Makkah 20N • Madinah 9/10N • Hajj Period + Shisha 10/11N",
      metaLeft: "Travel date (approx.): 21 May 2026 • Starts from Tk. 6,00,000",
      metaRight: "Includes airfare + accommodation + transport + guide support",
      highlights: [
        "Economy class return air ticket (subject to availability)",
        "AC bus transportation + Mina/Arafah tent (Maktab) details",
        "Catering + workshop + weekly MCQ exams (as stated)",
        "Visa + insurance + ziyarah + Bengali guide support",
      ],
      body: (
        <>
          <Subheading>Duration of Stay</Subheading>
          <KeyValueGrid
            rows={[
              { k: "Hajj Period + Shisha/Aziziyah", v: "21 May – 01 Jun 2026" },
              { k: "Makkah", v: "01 Jun – 20 Jun 2026" },
              { k: "Madinah", v: "20 Jun – 30 Jun 2026" },
            ]}
          />

          <Subheading>Package Includes</Subheading>
          <BulletList
            items={[
              "Economy class return air ticket Dhaka ↔ Jeddah (Saudi/Biman/Flynas, subject to availability)",
              "20 nights Makkah hotel accommodation",
              "8–10 nights Madinah hotel accommodation",
              "09/10 nights accommodation in Shisha (including Hajj period) + 10 nights (as listed)",
              "D Tent (Maktab) in Mina and Arafah (8–13 ZH)",
              "Daily catering meals for economy/standard/deluxe packages",
              "Buffet meal plan as per hotel policy for superior/premium packages",
              "Meals during Mina and Arafah (except Muzdalifah, per KSA management)",
              "AC bus transportation as detailed (airports, Shisha, Mina, Arafah, Muzdalifah, Makkah, Madinah)",
              "Hajj visa fee + health insurance",
              "Meet & assist at Jeddah Airport",
              "Ziyarah in Makkah + Madinah",
              "Dedicated Bengali Muallim/guide for the full period",
              "Workshop on Hajj + weekly MCQ exams starting two months before travel",
              "Hajj guide book in Bangla",
            ]}
          />

          <Subheading>Package Excludes</Subheading>
          <BulletList
            items={[
              "Kurbani not included (approx. SR 700–800 per person)",
              "No transport on 10 Zil Hajja from Muzdalifah to Jamarat / Shisha / Masjid-Al-Haram (as stated)",
              "Personal costs not mentioned",
            ]}
          />

          <Subheading>Package Price Details (Per Person)</Subheading>
          <KeyValueGrid
            rows={[
              {
                k: "Standard",
                v: (
                  <div className="space-y-1">
                    <div>4/5/6 bed share: Tk. 6,00,000</div>
                    <div>Triple: Tk. 6,70,000</div>
                    <div>Double: Tk. 7,60,000</div>
                    <div>Single: Tk. 10,50,000</div>
                    <div>Child (if quad share): Tk. 5,50,000</div>
                    <div>Infant: Tk. 3,70,000</div>
                  </div>
                ),
              },
              {
                k: "Deluxe",
                v: (
                  <div className="space-y-1">
                    <div>Quint/Quad: Tk. 6,50,000</div>
                    <div>Triple: Tk. 7,20,000</div>
                    <div>Double: Tk. 8,20,000</div>
                    <div>Single: Tk. 11,50,000</div>
                    <div>Child (if quad share): Tk. 5,90,000</div>
                    <div>Infant: Tk. 4,00,000</div>
                  </div>
                ),
              },
              {
                k: "Superior",
                v: (
                  <div className="space-y-1">
                    <div>Quint/Quad: Tk. 6,90,000</div>
                    <div>Triple: Tk. 7,80,000</div>
                    <div>Double: Tk. 9,20,000</div>
                    <div>Single: Tk. 13,50,000</div>
                    <div>Child (if quad share): Tk. 6,50,000</div>
                    <div>Infant: Tk. 4,50,000</div>
                  </div>
                ),
              },
              {
                k: "Premium",
                v: (
                  <div className="space-y-1">
                    <div>Quint/Quad: Tk. 9,50,000</div>
                    <div>Triple: Tk. 10,40,000</div>
                    <div>Double: Tk. 12,00,000</div>
                    <div>Single: Tk. 19,50,000</div>
                    <div>Child (if quad share): Tk. 8,90,000</div>
                    <div>Infant: Tk. 6,70,000</div>
                  </div>
                ),
              },
            ]}
          />

          <Subheading>Hotel / Apartment Details (Indicative)</Subheading>
          <BulletList
            items={[
              "Standard: Makkah (Jawharah al Hijrah or similar ~800m), Madinah (Dyar Al Noor or similar ~800m)",
              "Deluxe: Makkah (Diyafat Mubarak or similar ~300m), Madinah (Kayan Al Madinah or similar ~250m)",
              "Superior: Makkah (Maysan Al Mashaer or similar ~200m), Madinah (Kayan Almasi or similar ~200m)",
              "Premium: Makkah (Al Safwah Royale Orchid or similar ~0m), Madinah (Mias or similar ~100m)",
            ]}
          />

          <Subheading>Optional (Extra Charges)</Subheading>
          <BulletList
            items={[
              "VIP Tent (Maktab) + special VIP bus service: approx. Tk. 3,00,000 per person (note: included in premium packages as stated)",
              "Special rooms (Haram view, Kaaba view, suite, etc.)",
              "Additional tours (Jeddah, Taif, Hudaibiyah, Wadi Jinn, Badar, etc.)",
            ]}
          />

          <Subheading>Cancellation Policy</Subheading>
          <BulletList
            items={[
              "Fully non-refundable, non-changeable, non-transferable (as stated)",
            ]}
          />

          <Subheading>Requirements</Subheading>
          <BulletList
            items={[
              "Hajj pre-registration (Tk. 30,000 per person) as required",
              "Scanned NID (adult) / birth certificate (child)",
              "Scanned passport (minimum validity until 31 Dec 2026)",
              "One passport-size photograph",
            ]}
          />

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
            >
              Get Consultation
            </Link>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <PackagesAccordion items={packages} />

      <Divider />

      <Card hairline className="p-5 sm:p-7">
        <div className="text-sm text-slate-700 leading-relaxed">
          Later we’ll add more Hajj packages (including Bangla version).
          Reference sources:
          <div className="mt-2 space-y-1">
            <div>
              <Link
                href="https://www.obokash.com/umrah-packages-from-bangladesh"
                target="_blank"
                className="text-[var(--evg-deep)] underline underline-offset-4 decoration-[var(--evg-gold)] hover:opacity-80"
              >
                obokash.com/umrah-packages-from-bangladesh
              </Link>
            </div>
            <div>
              <Link
                href="https://www.akashbariholidays.com/packages"
                target="_blank"
                className="text-[var(--evg-deep)] underline underline-offset-4 decoration-[var(--evg-gold)] hover:opacity-80"
              >
                akashbariholidays.com/packages
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function HajjUmrahClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = (searchParams.get("type") ?? "").toLowerCase();
  const initial: HajjCategoryKey = typeParam === "umrah" ? "umrah" : "hajj";

  const [category, setCategory] = React.useState<HajjCategoryKey>(initial);

  React.useEffect(() => {
    const t = (searchParams.get("type") ?? "").toLowerCase();
    const next: HajjCategoryKey = t === "umrah" ? "umrah" : "hajj";
    setCategory(next);
  }, [searchParams]);

  const onChange = (v: HajjCategoryKey) => {
    setCategory(v);
    router.replace(`/hajj-umrah?type=${v}`, { scroll: false });
  };

  return (
    <PageShell>
      <Container>
        <Card hairline className="p-5 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(28,90,168,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(214,162,58,0.10),transparent_55%)]"
          />
          <div className="relative">
            <Dropdown value={category} onChange={onChange} />
          </div>
        </Card>

        <Divider />

        {category === "hajj" ? <Hajj /> : <Umrah />}

        <Divider />

        <div className="text-sm text-slate-600 leading-relaxed">
          For future CMS: store each package as structured blocks (overview,
          highlights, kv, includes, excludes, hotels, policies) and render via
          map.
        </div>
      </Container>
    </PageShell>
  );
}