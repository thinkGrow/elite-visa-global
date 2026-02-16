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
    <section className="mx-auto w-full max-w-4xl">
      {/* tabs */}
      <div className="flex gap-2">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={[
                "relative flex items-center gap-2 rounded-t-2xl px-5 py-4 text-sm",
                "border border-white/10",
                isActive
                  ? "bg-white text-slate-900"
                  : "bg-white/10 text-white hover:bg-white/15",
              ].join(" ")}
            >
              <span aria-hidden className="text-base">
                {t.icon}
              </span>
              <span className="tracking-wide">{t.label.toUpperCase()}</span>

              {isActive ? (
                <span className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[var(--evg-gold)]" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div className="rounded-b-3xl rounded-tr-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
        <div className="text-sm tracking-[0.18em] text-white/70">
          {active === "visa" ? "VISA SEARCH" : "SEARCH"}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs tracking-[0.18em] text-white/60">
              WHERE DO YOU WANT TO GO?
            </label>
            <select
              className={[
                "mt-2 w-full rounded-xl border border-white/15 bg-white/95 px-4 py-4",
                "text-slate-900 outline-none",
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

          <div>
            <label className="text-xs tracking-[0.18em] text-white/60">
              YOUR NATIONALITY
            </label>
            <select
              className={[
                "mt-2 w-full rounded-xl border border-white/15 bg-white/95 px-4 py-4",
                "text-slate-900 outline-none",
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

        <div className="mt-6">
          <button
            type="button"
            className={[
              "w-full rounded-2xl px-6 py-4",
              "bg-[var(--evg-blue)] text-white",
              "hover:brightness-110 active:brightness-95",
              "border border-white/10",
              "inline-flex items-center justify-center gap-3",
            ].join(" ")}
          >
            <span aria-hidden>🔎</span>
            <span className="tracking-[0.2em]">SEARCH</span>
          </button>

          <div className="mt-3 text-xs text-white/55">
            Demo UI only. We’ll wire this later.
          </div>
        </div>
      </div>
    </section>
  );
}