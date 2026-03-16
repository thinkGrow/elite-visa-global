// src/components/ui/GlassHeadlineCard.tsx
import React from "react";
import clsx from "clsx";

type GlassHeadlineCardProps = {
  children: React.ReactNode;
  className?: string;
  contentIn?: boolean;
  textColor?: "white" | "black";
  size?: "md" | "lg";
  maxWidth?: string;
};

export function GlassHeadlineCard({
  children,
  className,
  contentIn = false,
  textColor = "white",
  size = "md",
  maxWidth = "max-w-2xl",
}: GlassHeadlineCardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl",
        maxWidth,
        "bg-gradient-to-b from-white/18 to-white/10",
        "backdrop-blur-xl ring-1 ring-white/20",
        "shadow-[0_30px_80px_rgba(0,0,0,.35)]",
        "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-[2px]",
        size === "md" && "px-5 py-7 md:px-7 md:py-10",
        size === "lg" && "px-7 py-10",
        contentIn && "hero-headline-in",
        className
      )}
    >
      <div
        className={clsx(
          "font-[var(--font-playfair)] leading-[1.02] font-semibold",
          textColor === "white" && "text-white",
          textColor === "black" && "text-black",
          size === "md" && "text-4xl sm:text-5xl md:text-5xl",
          size === "lg" && "text-5xl"
        )}
      >
        {children}
      </div>
    </div>
  );
}