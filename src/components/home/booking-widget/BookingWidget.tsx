"use client";

import React from "react";
import { TourTab } from "./TourTab";
import { VisaTab } from "./VisaTab";
import { HotelTab } from "./HotelTab";
import { FlightTab } from "./FlightTab";

export type TabKey = "tour" | "visa" | "hotel" | "flight";

const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: "tour", label: "Tour", icon: "🧳" },
  { key: "visa", label: "Visa", icon: "🧾" },
  { key: "hotel", label: "Hotel", icon: "🛏️" },
  { key: "flight", label: "Flight", icon: "✈️" },
];

export function BookingWidget() {
  const [active, setActive] = React.useState<TabKey>("tour");

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="grid grid-cols-4 border-b border-white/10 bg-white/5">
          {tabs.map((t) => {
            const isActive = t.key === active;

            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={[
                  "relative h-9",
                  "flex items-center justify-center gap-2",
                  "border-r border-white/10 last:border-r-0",
                  "text-xs tracking-[0.15em]",
                  "cursor-pointer transition-colors duration-200",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                <span className="text-sm">{t.icon}</span>
                <span>{t.label.toUpperCase()}</span>

                {isActive && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--evg-gold)]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 md:p-5">
          {active === "tour" && <TourTab />}
          {active === "visa" && <VisaTab />}
          {active === "hotel" && <HotelTab />}
          {active === "flight" && <FlightTab />}
        </div>
      </div>
    </section>
  );
}