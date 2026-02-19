// src/components/home/layout/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { themeVars } from "@/lib/theme";

type NavKey = "services" | "contact";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<NavKey>("services");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only observe sections on homepage
  React.useEffect(() => {
    if (!isHome) return;

    const sections = ["services", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id as NavKey);
      },
      { threshold: [0.2, 0.3], rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const isVisa = pathname === "/visa-processing" || pathname.startsWith("/visa-processing/");
  const isHajjUmrah = pathname === "/hajj-umrah" || pathname.startsWith("/hajj-umrah/");
  const isAbout = pathname === "/about" || pathname.startsWith("/about/");
  const isContact = pathname === "/contact" || pathname.startsWith("/contact/");

  // Treat these pages as "light background pages"
  const isLightPage = isVisa || isHajjUmrah || isAbout || isContact;

  // If it's a light page and NOT scrolled yet, use dark text + light glass bg
  const useLightNav = isLightPage && !scrolled;

  function navLinkClasses(isActive: boolean) {
    const base = "relative py-2 text-sm tracking-wide transition-colors";
    const text = useLightNav
      ? isActive
        ? "text-slate-900"
        : "text-slate-600 hover:text-slate-900"
      : isActive
      ? "text-white"
      : "text-white/75 hover:text-white";

    const underlineBase =
      "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:transition-transform after:duration-300";

    const underline = isActive
      ? "after:scale-x-100 after:bg-[var(--evg-gold)]"
      : useLightNav
      ? "after:scale-x-0 after:bg-slate-900/20 hover:after:scale-x-100"
      : "after:scale-x-0 after:bg-white/30 hover:after:scale-x-100";

    return [base, text, underlineBase, underline].join(" ");
  }

  const desktopCtaClasses = [
    "rounded-xl px-5 py-2.5 text-sm font-medium transition transform hover:-translate-y-[1px] active:translate-y-0",
    "bg-[var(--evg-gold)] text-slate-900 hover:brightness-110 shadow-[0_10px_30px_rgba(214,162,58,0.22)]",
  ].join(" ");

  return (
    <header className="fixed left-0 right-0 top-0 z-50" style={themeVars}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div
          className={[
            "flex h-16 items-center justify-between rounded-2xl px-3 sm:px-4",
            "transition-all duration-300",
            scrolled
              ? "bg-[rgba(6,18,43,0.86)] backdrop-blur-xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              : useLightNav
              ? "bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_18px_60px_rgba(2,6,23,0.08)]"
              : "bg-transparent",
          ].join(" ")}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            {/* refined logo container */}
            <div
              className={[
                "relative h-12 w-12 sm:h-13 sm:w-13 rounded-full overflow-hidden",
                "p-[6px] bg-white/70 border border-black/5",
                "shadow-[0_10px_30px_rgba(2,6,23,0.08)]",
                useLightNav ? "" : "bg-white/10 border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
              ].join(" ")}
            >
              <Image
                src="/evg-logo.png"
                alt="Elite Visa Global"
                fill
                priority
                className="object-contain transition-transform duration-300 hover:scale-[1.06]"
              />
            </div>

            <div className="leading-tight">
              <div
                className={[
                  "text-[12px] sm:text-sm tracking-[0.22em] font-semibold",
                  useLightNav ? "text-slate-900" : "text-white",
                ].join(" ")}
              >
                ELITE VISA GLOBAL
              </div>
              <div
                className={[
                  "text-[11px] tracking-wide",
                  useLightNav ? "text-slate-500" : "text-white/60",
                ].join(" ")}
              >
                Follow your dreams.
              </div>
            </div>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#services"
              className={navLinkClasses(isHome && active === "services")}
            >
              Services
            </Link>

            <Link href="/visa-processing" className={navLinkClasses(isVisa)}>
              Visa Processing
            </Link>

            <Link href="/hajj-umrah" className={navLinkClasses(isHajjUmrah)}>
              Hajj & Umrah
            </Link>

            <Link href="/about" className={navLinkClasses(isAbout)}>
              About
            </Link>

            <Link
              href="/contact"
              className={navLinkClasses(isHome ? active === "contact" : isContact)}
            >
              Contact
            </Link>

            <Link href="/contact" className={desktopCtaClasses}>
              Get Consultation
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className={[
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur transition",
              useLightNav
                ? "border border-slate-200 bg-white/60 text-slate-900 hover:bg-white/80"
                : "border border-white/10 bg-white/5 text-white/85 hover:bg-white/10",
            ].join(" ")}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>

          {/* Mobile menu */}
          {open && (
            <div
              className={[
                "absolute left-4 right-4 top-[calc(100%+10px)] md:hidden rounded-2xl backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.30)] overflow-hidden",
                useLightNav
                  ? "border border-slate-200 bg-white/90"
                  : "border border-white/10 bg-[rgba(6,18,43,0.92)]",
              ].join(" ")}
            >
              <div className="p-3 grid gap-1">
                <Link
                  href="/#services"
                  className={[
                    "rounded-xl px-4 py-3 text-sm",
                    useLightNav
                      ? "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Services
                </Link>

                <Link
                  href="/visa-processing"
                  className={[
                    "rounded-xl px-4 py-3 text-sm",
                    useLightNav
                      ? "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Visa Processing
                </Link>

                <Link
                  href="/hajj-umrah"
                  className={[
                    "rounded-xl px-4 py-3 text-sm",
                    useLightNav
                      ? "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Hajj & Umrah
                </Link>

                <Link
                  href="/about"
                  className={[
                    "rounded-xl px-4 py-3 text-sm",
                    useLightNav
                      ? "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className={[
                    "rounded-xl px-4 py-3 text-sm",
                    useLightNav
                      ? "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>

                <Link
                  href="/contact"
                  className="mt-2 rounded-xl bg-[var(--evg-gold)] px-4 py-3 text-center text-sm font-medium text-slate-900 transition hover:brightness-110"
                  onClick={() => setOpen(false)}
                >
                  Get Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}