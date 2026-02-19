// src/components/ui/EvgCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { themeVars } from "@/lib/theme";

export type EvgCardVariant = "service" | "package" | "blog";

export type EvgCardProps = {
  title: string;
  description: string;
  href?: string; // CMS will provide this later
  icon?: React.ReactNode; // emoji now, icon key/SVG later
  badge?: string; // e.g. "Popular", "New"
  ctaLabel?: string; // default "Learn more"
  variant?: EvgCardVariant;
  className?: string;
};

export function EvgCard({
  title,
  description,
  href = "#",
  icon,
  badge,
  ctaLabel = "Learn more",
  variant = "service",
  className = "",
}: EvgCardProps) {
  return (
    <Link
      href={href}
      style={themeVars}
      className={[
        "group relative block rounded-3xl p-10",
        "border border-slate-200 bg-white",
        "shadow-[0_10px_30px_rgba(2,6,23,0.06)]",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-[var(--evg-gold)]/60",
        "hover:shadow-[0_18px_60px_rgba(2,6,23,0.10)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--evg-gold)]/25",
        className,
      ].join(" ")}
      data-variant={variant}
    >
      {/* subtle gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(214,162,58,0.18) 0%, rgba(214,162,58,0.08) 40%, transparent 70%)",
        }}
      />

      <div className="relative flex items-start gap-6">
        {/* Icon container (refined padding) */}
        {icon ? (
          <div
            className={[
              "flex h-16 w-16 items-center justify-center",
              "rounded-2xl border bg-white",
              "border-slate-200 text-2xl",
              "transition-all duration-300",
              "group-hover:border-[var(--evg-gold)]/60",
              "group-hover:shadow-[inset_0_0_0_1px_rgba(214,162,58,0.25)]",
            ].join(" ")}
          >
            {icon}
          </div>
        ) : null}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-[var(--evg-deep)]">{title}</h3>

            {badge ? (
              <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-[color:var(--evg-deep)]/70">
                {badge}
              </span>
            ) : null}
          </div>

          {/* gold underline animation */}
          <div className="mt-2 h-px w-10 bg-[var(--evg-gold)]/0 transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--evg-gold)]/55" />

          {/* Body text uses EVG deep tint (brand-integrated, still readable) */}
          <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--evg-deep)]/75">
            {description}
          </p>

          {/* Gold CTA */}
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--evg-gold)] transition-all duration-300 group-hover:brightness-110">
            <span className="relative">
              {ctaLabel}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-[var(--evg-gold)] transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}