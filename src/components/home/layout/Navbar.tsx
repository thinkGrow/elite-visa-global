"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type NavKey = "services" | "about" | "contact";

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

  function navLinkClasses(isActive: boolean) {
    return [
      "relative py-2 text-sm tracking-wide transition-colors",
      isActive ? "text-white" : "text-white/75 hover:text-white",
      "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:transition-transform after:duration-300",
      isActive
        ? "after:scale-x-100 after:bg-[var(--evg-gold)]"
        : "after:scale-x-0 after:bg-white/30 hover:after:scale-x-100",
    ].join(" ");
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div
          className={[
            "flex h-16 items-center justify-between rounded-2xl px-3 sm:px-4",
            "transition-all duration-300",
            scrolled
              ? "bg-[rgba(6,18,43,0.86)] backdrop-blur-xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              : "bg-transparent",
          ].join(" ")}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src="/evg-logo.png"
                alt="Elite Visa Global"
                fill
                priority
                className="object-contain transition-transform duration-300 hover:scale-[1.06]"
              />
            </div>
            <div className="leading-tight">
              <div className="text-[12px] sm:text-sm tracking-[0.22em] text-white font-medium">
                ELITE VISA GLOBAL
              </div>
              <div className="text-[11px] text-white/60 tracking-wide">Follow your dreams.</div>
            </div>
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/#services" className={navLinkClasses(isHome && active === "services")}>
              Services
            </Link>

            {/* IMPORTANT: real route link */}
            <Link href="/about" className={navLinkClasses(pathname === "/about")}>
              About
            </Link>

            <Link href="/contact" className={navLinkClasses(isHome && active === "contact")}>
              Contact
            </Link>

            <Link
              href="/contact"
              className="rounded-xl px-5 py-2.5 text-sm font-medium bg-[var(--evg-gold)] text-slate-900 transition transform hover:-translate-y-[1px] hover:brightness-110 active:translate-y-0 shadow-[0_10px_30px_rgba(214,162,58,0.22)]"
            >
              Get Consultation
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85 backdrop-blur transition hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>

          {/* Mobile menu */}
          {open && (
            <div className="absolute left-4 right-4 top-[calc(100%+10px)] md:hidden rounded-2xl border border-white/10 bg-[rgba(6,18,43,0.92)] backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden">
              <div className="p-3 grid gap-1">
                <Link
                  href="/#services"
                  className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Services
                </Link>

                <Link
                  href="/about"
                  className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white"
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
