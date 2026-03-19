"use client";

import React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export function PrimaryButton({
  children,
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: PrimaryButtonProps) {
  const baseClasses = [
    "group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-[14px] px-[3px] py-[3px] isolate",
    "transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
    "cta-border-gradient",
    "shadow-[0_8px_24px_rgba(0,0,0,0.1),0_0_20px_rgba(214,162,58,0.18)]",
    disabled
      ? "cursor-not-allowed opacity-60"
      : "hover:-translate-y-[2px] hover:scale-[1.02] hover:cursor-pointer hover:shadow-[0_12px_34px_rgba(0,0,0,0.14),0_0_28px_rgba(214,162,58,0.32)]",
  ].join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[14px]">
        {!disabled ? (
          <span className="cta-gold-beam absolute inset-y-0 -left-1/3 w-1/3" />
        ) : null}
      </span>

      <span
        className={[
          "relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-xl px-4 text-[13.5px] font-semibold tracking-[0.08em] transition-all duration-500",
          disabled
            ? "bg-white/80 text-slate-400"
            : "bg-white/95 text-[var(--evg-deep)] group-hover:bg-[var(--evg-gold)] group-hover:text-white",
        ].join(" ")}
      >
        <span>{children}</span>
        <span
          className={[
            "transition-all duration-300",
            disabled
              ? "text-slate-400"
              : "text-[var(--evg-gold)] group-hover:translate-x-[2px] group-hover:text-white",
          ].join(" ")}
        >
          →
        </span>
      </span>
    </button>
  );
}
