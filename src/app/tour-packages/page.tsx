// src/app/tour-packages/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";

type TourCategoryKey = "international" | "local";

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

function Dropdown({
  value,
  onChange,
}: {
  value: TourCategoryKey;
  onChange: (v: TourCategoryKey) => void;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
        <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
          ELITE VISA GLOBAL
        </div>

        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
            Tour Packages
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>

        <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
          International and local tours—clear itinerary, inclusions, and pricing
          tiers. Choose a category to explore.
        </p>
      </div>

      <div className="w-full sm:w-[420px]">
        <label className="block text-xs uppercase tracking-wide text-slate-500">
          Dropdown Menu
        </label>
        <div className="mt-2 relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as TourCategoryKey)}
            className={[
              "w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm sm:text-base text-slate-800",
              "shadow-sm outline-none transition",
              "focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20",
            ].join(" ")}
          >
            <option value="international">International Tours</option>
            <option value="local">Local Tours</option>
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
                    <span className={open ? "rotate-180 transition" : "transition"}>
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
   INTERNATIONAL
========================= */

function InternationalTours() {
  const packages: AccordionPkg[] = [
    {
      id: "europe-12d",
      title: "Europe Tour Package From Bangladesh",
      subtitle: "Multi-country guided tour with flexible hotel tiers",
      metaLeft:
        "1N Berlin • 2N Munich • 2N Paris • 2N Zurich • 1N Vienna • 1N Venice • 2N Rome",
      metaRight:
        "12 Days / 11 Nights • Starts from Tk. 3,60,000 • Valid till 30 Nov 2026 (excluding peak)",
      highlights: [
        "Daily breakfast at the hotels",
        "English-speaking guide during the tours",
        "City tours + signature experiences across Europe",
        "Airport pick & drop (Berlin → Rome)",
      ],
      body: (
        <>
          <Subheading>Key Information</Subheading>
          <KeyValueGrid
            rows={[
              { k: "Duration", v: "12 Days / 11 Nights" },
              { k: "Starting Price", v: "Tk. 3,60,000 (3 Star, twin share)" },
              {
                k: "Validity",
                v: "Valid till 30 Nov 2026 (excluding peak period)",
              },
              {
                k: "Visa",
                v: (
                  <div className="space-y-1">
                    <div>Visa processing: Tk. 5,000</div>
                    <div>Visa fee: €90</div>
                  </div>
                ),
              },
              {
                k: "Flights",
                v: "International airfare approx. Tk. 130,000 per adult (indicative)",
              },
              {
                k: "Notes",
                v: "Tourism tax, optional tours, and weekend hotel charges may apply.",
              },
            ]}
          />

          <Subheading>Package Includes</Subheading>
          <BulletList
            items={[
              "11 nights hotel accommodation as per itinerary",
              "Daily breakfast at the hotels",
              "English-speaking guide during the tours",
              "Berlin airport → hotel, Rome hotel → airport pick & drop",
              "Hotel ↔ train station transfers",
              "Berlin City Tour",
              "Neuschwanstein Castle & Linderhof Palace Day Trip from Munich",
              "Paris City Tour",
              "Zurich Highlights City Tour with Lake Cruise",
              "Vienna: 3-hour private walking tour",
              "Venice in a Day: Basilica San Marco, Doges Palace & Gondola ride",
              "Rome: Vatican Museums, Sistine Chapel & St Peter’s Basilica guided tour",
            ]}
          />

          <Subheading>Package Excludes</Subheading>
          <BulletList
            items={[
              "International air tickets (approx. Tk. 130,000 per adult)",
              "Domestic air tickets (if needed)",
              "Visa processing charge (Tk. 5,000) and visa fee (€90)",
              "Tourism tax",
              "Optional tours",
              "Weekend hotel charges (if stay includes Sat/Sun)",
              "Additional meals and drinks",
              "Tips for guide and driver",
              "Early check-in and late check-out",
              "Personal costs not mentioned above",
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

  return <PackagesAccordion items={packages} />;
}

/* =========================
   LOCAL
========================= */

function LocalTours() {
  const packages: AccordionPkg[] = [
    {
      id: "sundarbans-3d",
      title: "Dhaka – Sundarbans – Dhaka",
      subtitle: "3 Days / 2 Nights Local Tour Package",
      metaLeft:
        "Explore the world’s largest mangrove forest (UNESCO World Heritage Site)",
      metaRight: "Indicative cost: Tk. 18,000 – 25,000 per person (varies)",
      highlights: [
        "River cruise through canals and mangrove creeks",
        "Wildlife spotting (deer, crocodiles, birds, monkeys)",
        "Experienced forest guide & crew",
        "Comfortable accommodation and meals",
      ],
      body: (
        <>
          <p>
            Explore the raw beauty of nature with a carefully planned Sundarbans
            tour—adventure, river cruising, wildlife, and relaxation for
            families, groups, and nature lovers.
          </p>

          <Subheading>Tour Highlights</Subheading>
          <BulletList
            items={[
              "Visit the Sundarbans (UNESCO World Heritage Site)",
              "River cruise through canals and mangrove creeks",
              "Wildlife spotting (deer, crocodiles, birds, monkeys)",
              "Watch towers and forest exploration",
              "Experienced forest guide & crew",
              "Accommodation and meals",
            ]}
          />

          <Subheading>Important Note</Subheading>
          <AccentCallout>
            Wildlife sightings depend on natural conditions. Itinerary may
            change due to weather, tide levels, or forest department
            regulations.
          </AccentCallout>

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

  return <PackagesAccordion items={packages} />;
}

export default function TourPackagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = (searchParams.get("type") ?? "").toLowerCase();
  const urlType: TourCategoryKey =
    typeParam === "local" ? "local" : "international";

  const [category, setCategory] = React.useState<TourCategoryKey>(urlType);

  React.useEffect(() => {
    setCategory(urlType);
  }, [urlType]);

  const onChange = (v: TourCategoryKey) => {
    setCategory(v);
    router.replace(`/tour-packages?type=${v}`, { scroll: false });
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

        {category === "international" ? <InternationalTours /> : <LocalTours />}

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