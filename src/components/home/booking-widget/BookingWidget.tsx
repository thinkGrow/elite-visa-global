"use client";

import React from "react";
import { Map, FileText, Hotel, PlaneTakeoff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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

function renderTabContent(active: TabKey) {
  switch (active) {
    case "tour":
      return <TourTab />;
    case "visa":
      return <VisaTab />;
    case "hotel":
      return <HotelTab />;
    case "flight":
      return <FlightTab />;
    default:
      return null;
  }
}

export function BookingWidget() {
  const [active, setActive] = React.useState<TabKey>("tour");

  return (
    <section className="w-full bg-white">
      <div className="border-b border-black/8 px-4 pt-3 sm:px-6 sm:pt-4">
        <div className="flex items-center gap-5 overflow-x-auto md:gap-8">
          {tabs.map((t) => {
            const isActive = t.key === active;
            const Icon = t.icon;

            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={[
                  "group relative flex h-11 shrink-0 items-center gap-2 whitespace-nowrap border-b-2 pb-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "border-[var(--evg-gold)] text-[var(--evg-deep)]"
                    : "border-transparent text-black/50 hover:text-[var(--evg-deep)]",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-4 w-4 transition-colors duration-200",
                    isActive
                      ? "text-[var(--evg-gold)]"
                      : "text-black/45 group-hover:text-[var(--evg-deep)]",
                  ].join(" ")}
                />
                <span className="uppercase tracking-[0.14em]">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {renderTabContent(active)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}