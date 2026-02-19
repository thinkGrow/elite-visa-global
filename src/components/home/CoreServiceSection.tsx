import React from "react";
import { themeVars } from "@/lib/theme";

export function CoreServiceSection() {
  const services = [
    {
      title: "Student Visa & Admission Support",
      icon: "🎓",
      text: "Complete student visa assistance from academic planning to final visa submission.",
    },
    {
      title: "Tourist & Business Visa Services",
      icon: "🌍",
      text: "Structured support for short-term travel visas with strong documentation and compliance.",
    },
    {
      title: "Elite Hajj Kafela",
      icon: "🕋",
      text: "Dedicated Hajj & Umrah services built on trust, responsibility, and logistical excellence.",
    },
    {
      title: "Travel Compass – Tours & Air Tickets",
      icon: "✈️",
      text: "International and domestic tours, ticket booking, and customized travel planning.",
    },
  ];

  return (
    <section
      id="services"
      style={themeVars}
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
        WHAT WE DO
      </div>

      <div className="mt-3 flex items-center gap-3">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
          Our Core Services
        </h2>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <a
            key={s.title}
            href="#"
            className={[
              "group relative rounded-3xl p-6 transition",
              "border border-slate-200/70 bg-white",
              "shadow-[0_12px_40px_rgba(2,6,23,0.06)]",
              "hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(2,6,23,0.10)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--evg-gold)]/25",
            ].join(" ")}
          >
            {/* subtle top hairline + hover glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--evg-gold)]/35 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle,rgba(214,162,58,0.16),transparent_65%)]"
            />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="text-2xl leading-none">{s.icon}</div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[var(--evg-deep)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {s.text}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--evg-blue)]/85 group-hover:text-[var(--evg-blue)] transition">
                    Learn more <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
