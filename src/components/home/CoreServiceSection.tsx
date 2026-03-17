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
      href: "/hajj-umrah",
    },
    {
      title: "Travel Compass – Tours & Air Tickets",
      icon: "✈️",
      text: "International and domestic tours, ticket booking, and customized travel planning.",
      href: "/tours",
    },
  ];

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-white"
      style={themeVars}
    >
      <div className="absolute top-0 left-0 h-px w-full bg-black/5" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Heading */}
        <div
          className={[
            "max-w-4xl border-l border-[color:var(--evg-gold)]/60 pl-6",
            "transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          ].join(" ")}
        >
          <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
            WHAT WE DO
          </div>

          <div className="mt-3 flex items-center gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--evg-deep)] md:text-4xl">
              Our Core Services
            </h2>
            <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={[
                "transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]",
                inView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-[0.97]",
              ].join(" ")}
              style={{
                transitionDelay: `${180 + i * 120}ms`,
              }}
            >
              <EvgCard
                title={s.title}
                description={s.text}
                href={s.href}
                icon={s.icon}
                variant="service"
                ctaLabel="Learn more"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-b from-transparent to-black/[0.03]" />
    </section>
  );
}