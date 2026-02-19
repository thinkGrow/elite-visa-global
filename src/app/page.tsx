import Image from "next/image";
import React from "react";
import { Hero } from "@/components/home/Hero";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { CoreServiceSection } from "@/components/home/CoreServiceSection";
import { TrustSection } from "@/components/home/TrustSection";
import { Navbar } from "@/components/home/layout/Navbar";
import { Footer } from "@/components/home/layout/Footer";

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
      // className="min-h-screen text-white bg-[linear-gradient(to_bottom,#06122b,#07183a_40%,#030814)]"
      className="min-h-screen text-black bg-white"
      style={themeVars}
    >
      <Navbar></Navbar>

      <Hero />

      <WelcomeSection />
      <CoreServiceSection />
      <TrustSection />

      <Footer></Footer>
    </main>
  );
}
