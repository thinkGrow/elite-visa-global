"use client";

import React from "react";
import Link from "next/link";
import { themeVars } from "@/lib/theme";

export function Footer() {
  return (
    <footer
      style={themeVars}
      className="bg-[var(--evg-deep)] text-white"
    >
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand Column */}
          <div>
            <div className="text-sm tracking-[0.22em] text-white/60">
              ELITE VISA GLOBAL
            </div>

            <h3 className="mt-3 text-xl font-semibold">
              Trusted Visa & Hajj Services
            </h3>

            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Professional, compliance-focused visa processing and
              Hajj & Umrah services from Bangladesh with transparency,
              structured documentation, and dedicated support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-sm font-semibold text-white">
              Quick Links
            </div>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-[var(--evg-gold)] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/visa-processing" className="hover:text-[var(--evg-gold)] transition">
                  Visa Processing
                </Link>
              </li>
              <li>
                <Link href="/hajj-umrah" className="hover:text-[var(--evg-gold)] transition">
                  Hajj & Umrah
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--evg-gold)] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-sm font-semibold text-white">
              Services
            </div>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>Student Visa</li>
              <li>Visit / Family Visa</li>
              <li>Business Visa</li>
              <li>Hajj & Umrah Packages</li>
              <li>Pre-Registration Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-semibold text-white">
              Contact
            </div>

            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>Dhaka, Bangladesh</p>
              <p>+880 1XXXXXXXXX</p>
              <p>info@elitevisaglobal.com</p>

              <Link
                href="/contact"
                className="inline-block mt-2 rounded-xl bg-[var(--evg-gold)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110"
              >
                Get Consultation
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          © {new Date().getFullYear()} Elite Visa Global. All rights reserved.
        </div>

        <div className="flex gap-6">
          <Link href="#" className="hover:text-[var(--evg-gold)] transition">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[var(--evg-gold)] transition">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}