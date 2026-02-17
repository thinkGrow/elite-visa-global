"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type NavKey = "services" | "about" | "contact";

const links: Array<{ key: NavKey; label: string; href: `#${NavKey}` }> = [
  { key: "services", label: "Services", href: "#services" },
  { key: "about", label: "About", href: "#about" },
  { key: "contact", label: "Contact", href: "#contact" },
];

function getExistingSections(keys: NavKey[]) {
  return keys
    .map((k) => document.getElementById(k))
    .filter(Boolean) as HTMLElement[];
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<NavKey>("services");

  // scroll glass
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section (only if ids exist)
  React.useEffect(() => {
    const sections = getExistingSections(["services", "about", "contact"]);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (top?.target?.id) setActive(top.target.id as NavKey);
      },
      {
        threshold: [0.12, 0.2, 0.3],
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // keep active in sync with hash (works even without observer)
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "") as NavKey;
      if (h === "services" || h === "about" || h === "contact") setActive(h);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function onNavClick(e: React.MouseEvent, href: string, key: NavKey) {
    e.preventDefault();
    setActive(key);
    setOpen(false);

    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    } else {
      // fallback if ids don’t exist yet
      window.location.hash = href;
    }
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
          <Link href="/" className="flex items-center gap-3">
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
              <div className="text-[11px] text-white/60 tracking-wide">
                Follow your dreams.
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => {
              const isActive = active === l.key;

              return (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href, l.key)}
                  className={[
                    "relative py-2 text-sm tracking-wide transition-colors",
                    isActive ? "text-white" : "text-white/75 hover:text-white",
                    // underline (hover + active)
                    "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:transition-transform after:duration-300",
                    isActive
                      ? "after:scale-x-100 after:bg-[var(--evg-gold)]"
                      : "after:scale-x-0 after:bg-white/30 hover:after:scale-x-100",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={(e) => onNavClick(e, "#contact", "contact")}
              className={[
                "rounded-xl px-5 py-2.5 text-sm font-medium",
                "bg-[var(--evg-gold)] text-slate-900",
                "transition transform hover:-translate-y-[1px] hover:brightness-110 active:translate-y-0",
                "shadow-[0_10px_30px_rgba(214,162,58,0.22)]",
              ].join(" ")}
            >
              Get Consultation
            </a>
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
              <div className="p-3">
                <div className="grid gap-1">
                  {links.map((l) => {
                    const isActive = active === l.key;
                    return (
                      <a
                        key={l.key}
                        href={l.href}
                        onClick={(e) => onNavClick(e, l.href, l.key)}
                        className={[
                          "flex items-center justify-between rounded-xl px-4 py-3 text-sm transition",
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/80 hover:bg-white/10 hover:text-white",
                        ].join(" ")}
                      >
                        <span>{l.label}</span>
                        <span className="text-white/40">→</span>
                      </a>
                    );
                  })}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => onNavClick(e, "#contact", "contact")}
                  className="mt-3 block rounded-xl bg-[var(--evg-gold)] px-4 py-3 text-center text-sm font-medium text-slate-900 transition hover:brightness-110"
                >
                  Get Consultation
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
