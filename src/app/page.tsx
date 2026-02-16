import Image from "next/image";
import React from "react";
import { Hero } from "@/components/home/Hero";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { CoreServiceSection } from "@/components/home/CoreServiceSection";
import { TrustSection } from "@/components/home/TrustSection";
import { Navbar } from "@/components/home/layout/Navbar";

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
      className="min-h-screen text-white bg-[linear-gradient(to_bottom,#06122b,#07183a_40%,#030814)]"
      style={themeVars}
    >
      <Navbar></Navbar>

      <Hero
        title="Dreams beyond borders, guided with confidence."
        subtitle="Visa, tours, travel and pilgrimage services — structured, compliant, and professionally guided."
      />

      <WelcomeSection />
      <CoreServiceSection />
      <TrustSection />

      <footer id="contact" className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 text-sm text-white/60">
          Elite Visa Global • Dhaka, Bangladesh • Since 2016
        </div>
      </footer>
    </main>
  );
}
