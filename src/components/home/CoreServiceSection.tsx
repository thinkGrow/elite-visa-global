// src/components/home/sections/CoreServiceSection.tsx
"use client";

import React from "react";
import { themeVars } from "@/lib/theme";
import { EvgCard } from "@/components/ui/EvgCard";

export function CoreServiceSection() {
  const services = [
    {
      title: "Student Visa & Admission Support",
      icon: "🎓",
      text: "Complete student visa assistance from academic planning to final visa submission.",
      href: "/visa-processing",
    },
    {
      title: "Tourist & Business Visa Services",
      icon: "🌍",
      text: "Structured support for short-term travel visas with strong documentation and compliance.",
      href: "/visa-processing",
    },
    {
      title: "Elite Hajj Kafela",
      icon: "🕋",
      text: "Dedicated Hajj & Umrah services built on trust, responsibility, and logistical excellence.",
      href: "/hajj-umrah", // later
    },
    {
      title: "Travel Compass – Tours & Air Tickets",
      icon: "✈️",
      text: "International and domestic tours, ticket booking, and customized travel planning.",
      href: "/tours", // later
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white"
      style={themeVars}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-black/5" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Heading */}
        <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
          <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
            WHAT WE DO
          </div>

          <div className="mt-3 flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
              Our Core Services
            </h2>
            <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {services.map((s) => (
            <EvgCard
              key={s.title}
              title={s.title}
              description={s.text}
              href={s.href}
              icon={s.icon}
              variant="service"
              ctaLabel="Learn more"
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-black/[0.03]" />
    </section>
  );
}