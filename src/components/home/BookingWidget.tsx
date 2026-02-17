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
    <section className="w-full ">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
        
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
                  "relative h-9",
                  "flex items-center justify-center gap-2",
                  "text-xs tracking-[0.15em]",
                  "border-r border-white/10 last:border-r-0 cursor-pointer",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                <span className="text-sm">{t.icon}</span>
                <span>{t.label.toUpperCase()}</span>

                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--evg-gold)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* panel */}
        <div className="p-4">
          <div className="text-xs tracking-[0.2em] text-white/70">
            {active === "visa" ? "VISA SEARCH" : "SEARCH"}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3 items-end">
            
            <div>
              <label className="block text-[11px] tracking-[0.2em] text-white/60 mb-1">
                WHERE DO YOU WANT TO GO?
              </label>
              <select
                className="h-11 w-full rounded-xl border border-white/15 bg-white/95 px-4 text-sm text-slate-900 outline-none focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/30"
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

            <div>
              <label className="block text-[11px] tracking-[0.2em] text-white/60 mb-1">
                YOUR NATIONALITY
              </label>
              <select
                className="h-11 w-full rounded-xl border border-white/15 bg-white/95 px-4 text-sm text-slate-900 outline-none focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/30"
                defaultValue="Bangladeshi"
              >
                <option>Bangladeshi</option>
                <option>Indian</option>
                <option>Pakistani</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <button
                type="button"
                className="h-11 w-full rounded-xl bg-(--evg-gold) text-white border border-white/10 inline-flex items-center justify-center gap-2 text-sm tracking-[0.2em] hover:brightness-110 active:brightness-95"
              >
                🔎 SEARCH
              </button>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-white/50">
            Demo UI only. We’ll wire this later.
          </div>
        </div>
      </div>
    </section>
  );
}
