"use client";

import Link from "next/link";
import React from "react";

type PrimaryCTAProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PrimaryCTA({
  href,
  children,
  className = "",
}: PrimaryCTAProps) {
  const baseClasses = [
    "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-[14px] px-[3px] py-[3px] isolate",
    "transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
    "cta-border-gradient",
    "shadow-[0_8px_24px_rgba(0,0,0,0.1),0_0_20px_rgba(214,162,58,0.18)]",
    "hover:-translate-y-[2px] hover:scale-[1.02]",
    "hover:shadow-[0_12px_34px_rgba(0,0,0,0.14),0_0_28px_rgba(214,162,58,0.32)]",
  ].join(" ");

  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {/* beam */}
      <span className="pointer-events-none absolute inset-0 rounded-[14px]">
        <span className="cta-gold-beam absolute inset-y-0 -left-1/3 w-1/3" />
      </span>

      {/* inner */}
      <span className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-xl bg-white/95 px-4 text-[13.5px] font-semibold tracking-[0.02em] text-[var(--evg-deep)] transition-all duration-500 group-hover:bg-[var(--evg-gold)] group-hover:text-white">
        <span>{children}</span>

        <span className="text-(--evg-gold) transition-all duration-300 group-hover:translate-x-[2px] group-hover:text-white">
          →
        </span>
      </span>
    </Link>
  );
}