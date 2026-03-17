"use client";

import React from "react";
import { Map, FileText, Hotel, PlaneTakeoff } from "lucide-react";
import { TourTab } from "./TourTab";
import { VisaTab } from "./VisaTab";
import { HotelTab } from "./HotelTab";
import { FlightTab } from "./FlightTab";

export type TabKey = "tour" | "visa" | "hotel" | "flight";

const tabs: Array<{
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { key: "tour", label: "Tour", icon: Map },
  { key: "visa", label: "Visa", icon: FileText },
  { key: "hotel", label: "Hotel", icon: Hotel },
  { key: "flight", label: "Flight", icon: PlaneTakeoff },
];

export function BookingWidget() {
  const [active, setActive] = React.useState<TabKey>("tour");

  return (
    <section className="w-full">
      <div
        className={[
          "relative overflow-hidden rounded-[30px]",
          "border border-white/12",
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))]",
          "backdrop-blur-2xl",
          "shadow-[0_24px_80px_rgba(0,0,0,0.34)]",
        ].join(" ")}
      >
        {/* ambient layers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_38%)]" />
          <div className="absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[var(--evg-gold)]/12 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        </div>

        {/* tabs */}
        <div className="relative border-b border-white/10 bg-black/10 px-2 pt-2 md:px-3 md:pt-3">
          <div className="grid grid-cols-4 gap-2">
            {tabs.map((t) => {
              const isActive = t.key === active;
              const Icon = t.icon;

              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={[
                    "group relative h-12 md:h-14 rounded-t-[20px]",
                    "flex items-center justify-center gap-2.5",
                    "px-2 md:px-3",
                    "cursor-pointer transform transition-all duration-300",
                    isActive
                      ? [
                          "bg-white/20 text-white",
                          "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
                          "-translate-y-[2px] z-10",
                        ].join(" ")
                      : "text-white/65 hover:bg-white/8 hover:text-white",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "transition-all duration-300",
                      isActive
                        ? "text-[var(--evg-gold)] drop-shadow-[0_0_10px_rgba(214,162,58,0.35)]"
                        : "text-white/70 group-hover:text-white",
                    ].join(" ")}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="hidden sm:inline text-[11px] md:text-xs tracking-[0.18em] uppercase">
                    {t.label}
                  </span>

                  {isActive && (
                    <>
                      <span className="absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-[var(--evg-gold)]" />
                      <span className="absolute inset-x-6 bottom-0 h-5 bg-[var(--evg-gold)]/20 blur-md" />
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* content */}
        <div className="relative p-4 md:p-6">
          <div
            className={[
              "relative overflow-hidden rounded-[24px]",
              "border border-white/10",
              "bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_10px_40px_rgba(0,0,0,0.25)]",
              "p-4 md:p-5",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,162,58,0.08),transparent_28%)]" />

            <div className="relative">
              {active === "tour" && <TourTab />}
              {active === "visa" && <VisaTab />}
              {active === "hotel" && <HotelTab />}
              {active === "flight" && <FlightTab />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}