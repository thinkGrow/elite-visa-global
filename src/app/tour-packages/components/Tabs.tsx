"use client";

import React from "react";
import type { ContinentKey } from "../types";

const continents: Array<{ key: ContinentKey; label: string }> = [
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "northamerica", label: "North America" },
  { key: "southamerica", label: "South America" },
  { key: "africa", label: "Africa" },
  { key: "oceania", label: "Oceania" },
  { key: "multi", label: "Multi Countries" },
];

export function Tabs({
  value,
  onChange,
}: {
  value: ContinentKey;
  onChange: (v: ContinentKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {continents.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={[
              "rounded-2xl px-4 py-2 text-sm border transition shadow-sm",
              active
                ? "border-[var(--evg-gold)]/50 bg-[var(--evg-gold)]/10 text-[var(--evg-deep)]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}