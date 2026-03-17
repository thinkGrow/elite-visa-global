// src/app/about/page.tsx
import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/home/layout/Navbar";
import { themeVars } from "@/lib/theme";
import { GlassHeadlineCard } from "@/components/ui/GlassHeadlineCard";
import styles from "@/components/ui/GlassHeadlineCard.module.css";


const leadership = [
  {
    name: "Nadeem Ahamed",
    role: "Owner",
    bio: "With over 20 years in the travel industry, Nadeem Ahamed brings deep operational insight shaped by experience across multiple industries and extensive travel across numerous countries. His leadership anchors EVG’s strategic direction, service quality, and long-term vision.",
    imageSrc: "/team/nadeem.jpg",
  },
  {
    name: "Fahad Md Ariful",
    role: "Chief Consultant",
    bio: "With 15+ years of cross-industry experience, including student consultancy, insurance, and UK-based professional exposure, Fahad leads Student Services, Visa Processing, and Travel Compass. He is responsible for case strategy, compliance, documentation standards, and outcome-focused guidance.",
    imageSrc: "/team/fahad.jpg",
  },
  {
    name: "Yakub Al Ikran Madani",
    role: "Kafela Consultant",
    bio: "Bringing over 10 years of industry experience, including Saudi Arabia–based exposure, Yakub oversees Hajj & Umrah tours and visa processing through Elite Hajj Kafela. His role ensures religious responsibility, logistical precision, and respectful service delivery.",
    imageSrc: "/team/yakub.jpg",
  },
];

const goals = [
  "Deliver transparent, ethical, and regulation-compliant visa and travel solutions",
  "Provide realistic, long-term pathways for students and travelers",
  "Maintain service excellence across all specialized divisions",
  "Build lasting relationships based on trust, clarity, and accountability",
  "Continuously evolve while preserving our core values of integrity and professionalism",
];

function SectionIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
      <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
        {eyebrow}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
          {title}
        </h2>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
      </div>

      {subtitle ? (
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function WhiteCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-200 bg-white",
        "shadow-[0_18px_60px_rgba(2,6,23,0.08)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-white text-slate-900"
      style={themeVars}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white" />

        <div
          className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(28,90,168,0.10) 0%, rgba(28,90,168,0.04) 40%, transparent 70%)",
          }}
        />

        <div
          className="absolute top-20 right-[-160px] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(214,162,58,0.10) 0%, rgba(214,162,58,0.04) 40%, transparent 72%)",
          }}
        />

        <div className="absolute top-0 left-0 h-px w-full bg-black/5" />
        <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-b from-transparent to-black/[0.03]" />
      </div>

      <Navbar />

      <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-20">
        <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
          <GlassHeadlineCard textColor="black" size="md">
            <h1 className="leading-[1.1]">
              <span className={styles.goldMotion}>Experience</span>, built on
              <br />
              ethics & execution
            </h1>

            <div className={`${styles.underlineMotion} mt-4`} />
          </GlassHeadlineCard>

          <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-slate-700">
            <p>
              Elite Visa Global (EVG) began its journey in 2016, initially
              offering professional air ticketing services. Over time, guided by
              client trust and evolving global needs, EVG expanded into a
              full-service Visa, Tours & Travel consultancy—covering student
              visa support, tourist and business visas, curated travel
              solutions, and dedicated Hajj & Umrah services.
            </p>

            <p>
              Today, EVG stands for experience, ethics, and execution. Our
              growth has been deliberate, ensuring every new service meets the
              same standards of accuracy, compliance, and client care that
              defined us from day one.
            </p>

            <p>
              We believe international mobility should feel guided, not
              overwhelming. Every application, journey, and consultation is
              approached with responsibility, professionalism, and respect for
              the people placing their trust in us.
            </p>

            <p>
              <span className="text-[color:var(--evg-gold)] font-semibold">
                Follow your dreams. We’ll help you reach them.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-20">
        <SectionIntro
          eyebrow="TEAM"
          title="Leadership & Expertise"
          subtitle="A leadership team shaped by industry experience, operational discipline, and a long-term commitment to ethical client service."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {leadership.map((p) => (
            <WhiteCard key={p.name} className="overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={p.imageSrc}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.04),rgba(0,0,0,0.28)_72%,rgba(0,0,0,0.45))]" />

                <div className="absolute left-5 top-5 rounded-full border border-white/50 bg-white/80 px-3 py-1.5 text-xs text-[var(--evg-deep)] backdrop-blur">
                  {p.role}
                </div>
              </div>

              <div className="p-6">
                <p className="text-lg font-semibold text-slate-900">{p.name}</p>
                <div className="mt-4 h-px w-full bg-slate-200" />
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {p.bio}
                </p>
              </div>
            </WhiteCard>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <WhiteCard className="p-8">
            <div className="text-xs tracking-[0.22em] text-[var(--evg-deep)]/55">
              VISION
            </div>
            <h3 className="mt-3 text-xl font-semibold text-[var(--evg-deep)]">
              Our Vision
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              To be a trusted global mobility partner, empowering individuals
              and families to follow their dreams responsibly—through ethical
              guidance, compliant processes, and world-class service standards.
            </p>
          </WhiteCard>

          <WhiteCard className="p-8">
            <div className="text-xs tracking-[0.22em] text-[var(--evg-deep)]/55">
              GOALS
            </div>
            <h3 className="mt-3 text-xl font-semibold text-[var(--evg-deep)]">
              Our Goals
            </h3>

            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
              {goals.map((g) => (
                <li key={g} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--evg-gold)]" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </WhiteCard>
        </div>
      </section>

      <footer className="border-t border-black/5 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-slate-500">
          Elite Visa Global • Dhaka, Bangladesh • Since 2016
        </div>
      </footer>
    </main>
  );
}
