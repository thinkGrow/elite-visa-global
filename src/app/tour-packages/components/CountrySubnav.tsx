"use client";

import React from "react";
import type { Country } from "../types";

export function CountrySubnav({
  countries,
  activeSlug,
  onPick,
}: {
  countries: Country[];
  activeSlug: string;
  onPick: (slug: string) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {countries.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <button
            key={c.slug}
            type="button"
            onClick={() => onPick(c.slug)}
            className={[
              "rounded-2xl px-4 py-2 text-sm border transition shadow-sm inline-flex items-center gap-2",
              active
                ? "border-[var(--evg-blue)]/35 bg-[var(--evg-blue)]/10 text-[var(--evg-deep)]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            ].join(" ")}
            title={c.name}
          >
            <span aria-hidden="true">{c.flag ?? "🏳️"}</span>
            <span className="truncate max-w-[160px]">{c.name}</span>
            {c.badge ? (
              <span className="ml-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600">
                {c.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}