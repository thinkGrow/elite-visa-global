"use client";

import React from "react";
// import styles from "./GlassHeadlineCard.module.css";

type GlassHeadlineCardProps = {
  children: React.ReactNode;
  textColor?: "white" | "black";
  size?: "md" | "lg";
  className?: string;
};

export function GlassHeadlineCard({
  children,
  textColor = "white",
  size = "md",
  className = "",
}: GlassHeadlineCardProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={[
        "relative rounded-3xl",
        "bg-gradient-to-b from-white/18 to-white/10",
        "backdrop-blur-xl ring-1 ring-white/20",
        "shadow-[0_30px_80px_rgba(0,0,0,.35)]",
        "transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
        "hover:-translate-y-[4px]",
        size === "md"
          ? "px-5 py-7 md:px-7 md:py-10 max-w-2xl"
          : "px-7 py-10 max-w-2xl",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "font-[var(--font-playfair)] leading-[1.05] font-semibold",
          textColor === "white" ? "text-white" : "text-[var(--evg-deep)]",
          size === "md" ? "text-4xl sm:text-5xl md:text-5xl" : "text-5xl",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}