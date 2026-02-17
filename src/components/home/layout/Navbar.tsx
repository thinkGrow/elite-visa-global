"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(6,18,43,0.92)] backdrop-blur-xl border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full">
              <Image
                src="/evg-logo.png"
                alt="Elite Visa Global"
                fill
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-105 rounded-full"
              />
            </div>

            <div className="leading-tight">
              <div className="text-sm md:text-base tracking-[0.18em] text-white font-medium">
                ELITE VISA GLOBAL
              </div>
              <div className="text-xs text-white/60 tracking-wide">
                Follow your dreams.
              </div>
            </div>
          </Link>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <Link href="#services" className="hover:text-white transition">
              Services
            </Link>
            <Link href="#about" className="hover:text-white transition">
              About
            </Link>
            <Link href="#contact" className="hover:text-white transition">
              Contact
            </Link>

            <Link
              href="#contact"
              className="rounded-lg bg-[var(--evg-gold)] px-5 py-2.5 text-slate-900 font-medium hover:brightness-110 transition"
            >
              Get Consultation
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}