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
            <a
              key={s.title}
              href="#"
              className={[
                "group relative rounded-3xl p-10",
                "border border-slate-200 bg-white",
                "shadow-[0_10px_30px_rgba(2,6,23,0.06)]",
                "transition-all duration-300",
                "hover:-translate-y-1",
                "hover:border-[var(--evg-gold)]/60",
                "hover:shadow-[0_18px_60px_rgba(2,6,23,0.10)]",
              ].join(" ")}
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
                {/* Refined icon container */}
                <div
                  className={[
                    "flex h-16 w-16 items-center justify-center",
                    "rounded-2xl border bg-white",
                    "border-slate-200",
                    "text-2xl",
                    "transition-all duration-300",
                    "group-hover:border-[var(--evg-gold)]/60",
                    "group-hover:shadow-[inset_0_0_0_1px_rgba(214,162,58,0.25)]",
                  ].join(" ")}
                >
                  {s.icon}
                </div>

                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[var(--evg-deep)]">
                    {s.title}
                  </h3>

                  {/* subtle gold underline animation */}
                  <div className="mt-2 h-px w-10 bg-[var(--evg-gold)]/0 transition-all duration-300 group-hover:w-16 group-hover:bg-[var(--evg-gold)]/55" />

                  {/* Body text now uses EVG deep */}
                  <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--evg-deep)]/75">
                    {s.text}
                  </p>

                  {/* Link uses EVG blue */}
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--evg-gold)] transition-all duration-300 group-hover:brightness-110">
                    <span className="relative">
                      Learn more
                      <span className="absolute left-0 -bottom-1 h-px w-0 bg-[var(--evg-gold)] transition-all duration-300 group-hover:w-full" />
                    </span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-black/[0.03]" />
    </section>
  );
}
