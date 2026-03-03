"use client";

import React from "react";
import type { TourCategoryKey } from "../types";

export function Dropdown({
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
      </div>

      <div className="w-full sm:w-[420px]">
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
      </div>
    </div>
  );
}