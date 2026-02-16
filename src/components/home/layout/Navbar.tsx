"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(6,18,43,0.85)] backdrop-blur border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-white/10">
              <Image
                src="/evg-logo.png"
                alt="Elite Visa Global"
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm tracking-[0.22em] text-white/80">
                ELITE VISA GLOBAL
              </div>
              <div className="text-xs text-white/60">
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
              className="rounded-lg bg-[var(--evg-gold)] px-4 py-2 text-slate-900 hover:brightness-110"
            >
              Get Consultation
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}