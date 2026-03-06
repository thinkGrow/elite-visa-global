// src/app/about/page.tsx
import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/home/layout/Navbar";
import { themeVars } from "@/lib/theme";

const leadership = [
  {
    name: "Nadeem Ahamed",
    role: "Owner",
    bio: "With over 20 years in the travel industry, Nadeem Ahamed brings deep operational insight shaped by experience across multiple industries and extensive travel across numerous countries. His leadership anchors EVG’s strategic direction, service quality, and long-term vision.",
    imageSrc: "/team/nadeem.jpg", // put your file in /public/team/nadeem.jpg
  },
  {
    name: "Fahad Md Ariful",
    role: "Chief Consultant",
    bio: "With 15+ years of cross-industry experience, including student consultancy, insurance, and UK-based professional exposure, Fahad leads Student Services, Visa Processing, and Travel Compass. He is responsible for case strategy, compliance, documentation standards, and outcome-focused guidance.",
    imageSrc: "/team/fahad.jpg", // /public/team/fahad.jpg
  },
  {
    name: "Yakub Al Ikran Madani",
    role: "Kafela Consultant",
    bio: "Bringing over 10 years of industry experience, including Saudi Arabia–based exposure, Yakub oversees Hajj & Umrah tours and visa processing through Elite Hajj Kafela. His role ensures religious responsibility, logistical precision, and respectful service delivery.",
    imageSrc: "/team/yakub.jpg", // /public/team/yakub.jpg
  },
];

const goals = [
  "Deliver transparent, ethical, and regulation-compliant visa and travel solutions",
  "Provide realistic, long-term pathways for students and travelers",
  "Maintain service excellence across all specialized divisions",
  "Build lasting relationships based on trust, clarity, and accountability",
  "Continuously evolve while preserving our core values of integrity and professionalism",
];

function Hairline() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, rgba(255,255,255,0), rgba(214,162,58,0.5), rgba(255,255,255,0))",
      }}
    />
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-white/10 bg-white/[0.055] backdrop-blur-2xl",
        "shadow-[0_22px_90px_rgba(0,0,0,0.55)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function TeamCard({
  name,
  role,
  bio,
  imageSrc,
}: {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
}) {
  return (
    <GlassCard className="overflow-hidden">
      {/* bigger portrait */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={false}
        />

        {/* cinematic overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.78))]" />

        {/* role pill */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-[var(--evg-gold)]" />
          {role}
        </div>
      </div>

      <div className="p-6">
        <p className="text-lg font-semibold">{name}</p>
        <div className="mt-4 h-px w-full bg-white/10" />
        <p className="mt-4 text-sm leading-relaxed text-white/70">{bio}</p>
      </div>
    </GlassCard>
  );
}

export default function AboutPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      style={themeVars}
    >
      {/* GLOBAL BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040912_0%,#06122b_25%,#0a1f46_55%,#071531_80%,#030814_100%)]" />

        {/* Blue atmosphere */}
        <div className="absolute -top-60 left-[-250px] h-[900px] w-[900px] rounded-full bg-[rgba(28,90,168,0.30)] blur-[160px]" />

        {/* Gold glow */}
        <div className="absolute top-10 right-[-300px] h-[950px] w-[950px] rounded-full bg-[rgba(214,162,58,0.20)] blur-[180px]" />

        {/* Soft radial depth */}
        <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_20%_15%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_75%_20%,rgba(28,90,168,0.15),transparent_60%)]" />

        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.55))]" />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <div className="max-w-3xl">
          <div
            className={[
              "rounded-3xl px-7 py-10 max-w-2xl",
              "bg-gradient-to-b from-white/18 to-white/10",
              "backdrop-blur-xl ring-1 ring-white/20",
              "shadow-[0_30px_80px_rgba(0,0,0,.35)]",
              "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-[2px]",
            ].join(" ")}
          >
            <h1 className="font-[var(--font-playfair)] text-5xl leading-[1.02] font-semibold text-white">
              <span className="block">Experience driven by</span>

              <span className="block text-[var(--evg-gold)]">
                ethics & execution
              </span>
            </h1>
          </div>

          <p className="mt-6 text-base leading-relaxed text-white/75 md:text-lg">
            Elite Visa Global (EVG) began its journey in 2016, initially
            offering professional air ticketing services. Over time, guided by
            client trust and evolving global needs, EVG expanded into a
            full-service Visa, Tours & Travel consultancy—covering student visa
            support, tourist and business visas, curated travel solutions, and
            dedicated Hajj & Umrah services.
          </p>

          <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
            Today, EVG stands for experience, ethics, and execution. Our growth
            has been deliberate, ensuring every new service meets the same
            standards of accuracy, compliance, and client care that defined us
            from day one.
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.22em] text-white/50">TEAM</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
              Leadership & Expertise
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-white/10 md:block" />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {leadership.map((p) => (
            <div
              key={p.name}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.6)]"
            >
              {/* LARGE IMAGE */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={p.imageSrc}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />

                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.65)_70%,rgba(0,0,0,0.85))]" />

                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
                  {p.role}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold">{p.name}</p>
                <div className="mt-4 h-px w-full bg-white/10" />
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {p.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VISION + GOALS */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.6)]">
            <p className="text-xs tracking-[0.22em] text-white/50">VISION</p>
            <h3 className="mt-3 text-xl font-semibold">Our Vision</h3>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              To be a trusted global mobility partner, empowering individuals
              and families to follow their dreams responsibly—through ethical
              guidance, compliant processes, and world-class service standards.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl shadow-[0_25px_100px_rgba(0,0,0,0.6)]">
            <p className="text-xs tracking-[0.22em] text-white/50">GOALS</p>
            <h3 className="mt-3 text-xl font-semibold">Our Goals</h3>

            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/70">
              {goals.map((g) => (
                <li key={g} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--evg-gold)]" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-white/60">
          Elite Visa Global • Dhaka, Bangladesh • Since 2016
        </div>
      </footer>
    </main>
  );
}
