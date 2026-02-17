"use client";

import React from "react";

type TabKey = "tour" | "visa" | "hotel" | "flight";

const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: "tour", label: "Tour", icon: "🧳" },
  { key: "visa", label: "Visa", icon: "🧾" },
  { key: "hotel", label: "Hotel", icon: "🛏️" },
  { key: "flight", label: "Flight", icon: "✈️" },
];

export function BookingWidget() {
  const [active, setActive] = React.useState<TabKey>("tour");

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
        {/* tabs */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-white/5">
          {tabs.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={[
                  "relative h-14", // consistent height
                  "flex items-center justify-center gap-2",
                  "text-xs sm:text-sm tracking-[0.18em]",
                  "border-r border-white/10 last:border-r-0",
                  "transition",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                <span aria-hidden className="text-base leading-none">
                  {t.icon}
                </span>
                <span>{t.label.toUpperCase()}</span>

                {isActive ? (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--evg-gold)]" />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div className="p-6">
          <div className="text-sm tracking-[0.22em] text-white/70">
            {active === "visa" ? "VISA SEARCH" : "SEARCH"}
          </div>

          {/* fields */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 items-start">
            <div className="space-y-2">
              {/* fixed label height so selects align even if text wraps */}
              <div className="min-h-[42px]">
                <label className="block text-xs tracking-[0.22em] text-white/60 leading-relaxed">
                  WHERE DO YOU WANT TO GO?
                </label>
              </div>

              <select
                className={[
                  "h-14 w-full rounded-xl",
                  "border border-white/15 bg-white/95",
                  "px-4 text-slate-900 outline-none",
                  "focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/30",
                ].join(" ")}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a country
                </option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>United States</option>
                <option>United Arab Emirates</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="min-h-[42px]">
                <label className="block text-xs tracking-[0.22em] text-white/60 leading-relaxed">
                  YOUR NATIONALITY
                </label>
              </div>

              <select
                className={[
                  "h-14 w-full rounded-xl",
                  "border border-white/15 bg-white/95",
                  "px-4 text-slate-900 outline-none",
                  "focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/30",
                ].join(" ")}
                defaultValue="Bangladeshi"
              >
                <option>Bangladeshi</option>
                <option>Indian</option>
                <option>Pakistani</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <button
              type="button"
              className={[
                "h-14 w-full rounded-2xl px-6",
                "bg-[var(--evg-blue)] text-white",
                "hover:brightness-110 active:brightness-95",
                "border border-white/10",
                "inline-flex items-center justify-center gap-3",
              ].join(" ")}
            >
              <span aria-hidden className="leading-none">
                🔎
              </span>
              <span className="tracking-[0.25em]">SEARCH</span>
            </button>

            <div className="mt-3 text-xs text-white/55">
              Demo UI only. We’ll wire this later.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}