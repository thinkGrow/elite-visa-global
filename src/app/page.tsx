import Image from "next/image";
import React from "react";
import { BookingWidget } from "@/components/home/BookingWidget";

type ThemeVars = React.CSSProperties & {
  "--evg-blue": string;
  "--evg-deep": string;
  "--evg-gold": string;
};

const themeVars: ThemeVars = {
  "--evg-blue": "#1c5aa8",
  "--evg-deep": "#06122b",
  "--evg-gold": "#d6a23a",
};

export default function HomePage() {
  return (
    <main
      className="min-h-screen text-white bg-[radial-gradient(900px_circle_at_20%_10%,rgba(255,200,80,0.14),transparent_55%),radial-gradient(900px_circle_at_80%_0%,rgba(30,90,170,0.35),transparent_55%),linear-gradient(to_bottom,#06122b,#07183a_40%,#030814)]"
      style={themeVars}
    >
      {/* HEADER */}
      <header className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-white/10">
            <Image
              src="/evg-logo.png"
              alt="Elite Visa Global"
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <div>
            <div className="text-sm tracking-[0.22em] text-white/70">
              ELITE VISA GLOBAL
            </div>
            <div className="text-xs text-white/60">
              Follow your dreams. We’ll help you reach them.
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
              Premium Visa, Tours & Travel Consultancy
              <span className="h-1 w-1 rounded-full bg-[var(--evg-gold)]" />
              Since 2016
            </div>

            <h1 className="mt-6 text-4xl leading-[1.05] md:text-6xl">
              Dreams beyond borders,
              <span className="text-[color:var(--evg-gold)]"> guided</span> with
              clarity and confidence.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              From international education and short-term travel to business
              mobility and sacred journeys — we transform ambition into
              structured, achievable pathways.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="rounded-xl bg-[var(--evg-gold)] px-5 py-3 text-sm text-slate-900 hover:brightness-110"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
              >
                Get Consultation
              </a>
            </div>
          </div>

          <div className="lg:pt-2">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* ABOUT / WELCOME */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <div className="text-sm tracking-[0.22em] text-white/60">
            WELCOME
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl">
            Welcome to Elite Visa Global
          </h2>

          <div className="mt-6 space-y-5 text-white/70 leading-relaxed">
            <p>
              Elite Visa Global (EVG) is a premium Visa, Tours & Travel
              consultancy, created for individuals and families ready to follow
              their dreams beyond borders—with clarity, confidence, and
              professional guidance.
            </p>

            <p>
              In a world shaped by complex immigration rules and global
              regulations, EVG transforms ambition into structured, achievable
              pathways. From international education and short-term travel to
              business mobility, pilgrimage, and leisure journeys, we ensure
              every step is compliant, considered, and purposeful.
            </p>

            <p>
              Our approach is consultative, not transactional. We listen before
              we advise, assess before we recommend, and prepare every
              application with precision and integrity.
            </p>

            <p>
              At Elite Visa Global, dreams are not rushed—they are guided.
              <br />
              <span className="text-[color:var(--evg-gold)] font-medium">
                Follow your dreams. We’ll help you reach them.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section id="services" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="text-sm tracking-[0.22em] text-white/60">
          WHAT WE DO
        </div>
        <h2 className="mt-3 text-3xl md:text-4xl">
          Our Core Services
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
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
          ].map((service) => (
            <div
              key={service.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="text-2xl">{service.icon}</div>
              <h3 className="mt-4 text-lg">{service.title}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST / LOGOS SPACE */}
      <section className="border-t border-white/10 py-16 bg-black/20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="text-sm tracking-[0.22em] text-white/60">
            TRUST & ACCREDITATION
          </div>
          <p className="mt-4 text-white/60">
            Space reserved for success stories and accreditation logos.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 text-sm text-white/60">
          Elite Visa Global • Dhaka, Bangladesh • Since 2016
        </div>
      </footer>
    </main>
  );
}