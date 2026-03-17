// src/components/home/layout/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { themeVars } from "@/lib/theme";

type DesktopMenuKey = "visa" | "tours" | "hajj";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = React.useState(false);

  // mobile sheet
  const [open, setOpen] = React.useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = React.useState(false);
  const [mobileToursOpen, setMobileToursOpen] = React.useState(false);
  const [mobileHajjOpen, setMobileHajjOpen] = React.useState(false);

  // desktop dropdown
  const [openDesktopMenu, setOpenDesktopMenu] =
    React.useState<DesktopMenuKey | null>(null);

  const closeTimerRef = React.useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMenu(key: DesktopMenuKey) {
    clearCloseTimer();
    setOpenDesktopMenu(key);
  }

  function toggleMenu(key: DesktopMenuKey) {
    clearCloseTimer();
    setOpenDesktopMenu((cur) => (cur === key ? null : key));
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDesktopMenu(null);
    }, 180);
  }

  function closeNow() {
    clearCloseTimer();
    setOpenDesktopMenu(null);
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on route change
  React.useEffect(() => {
    setOpen(false);
    setMobileVisaOpen(false);
    setMobileToursOpen(false);
    setMobileHajjOpen(false);
    setOpenDesktopMenu(null);
    clearCloseTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isVisa =
    pathname === "/visa-processing" || pathname.startsWith("/visa-processing/");
  const isHajjUmrah =
    pathname === "/hajj-umrah" || pathname.startsWith("/hajj-umrah/");
  const isTours =
    pathname === "/tour-packages" || pathname.startsWith("/tour-packages/");
  const isAbout = pathname === "/about" || pathname.startsWith("/about/");
  const isContact = pathname === "/contact" || pathname.startsWith("/contact/");

  const isLightPage = isVisa || isHajjUmrah || isTours || isAbout || isContact;
  const useLightNav = isLightPage && !scrolled;

  function navLinkClasses(isActive: boolean) {
    const base =
      "relative inline-flex items-center h-10 text-sm tracking-wide transition-colors";

    const text = useLightNav
      ? isActive
        ? "text-slate-900"
        : "text-slate-600 hover:text-slate-900"
      : isActive
        ? "text-white"
        : "text-white/80 hover:text-white";

    const underlineBase =
      "after:absolute after:left-0 after:right-0 after:bottom-1 after:h-[2px] after:origin-left after:transition-transform after:duration-300";

    const underline = isActive
      ? "after:scale-x-100 after:bg-[var(--evg-gold)]"
      : useLightNav
        ? "after:scale-x-0 after:bg-slate-900/20 hover:after:scale-x-100"
        : "after:scale-x-0 after:bg-white/30 hover:after:scale-x-100";

    return [base, text, underlineBase, underline].join(" ");
  }

  const dropdownPanelClasses = [
    "absolute left-0 top-full z-50 w-[320px]",
    "translate-y-2",
    "rounded-2xl overflow-hidden",
    "shadow-[0_30px_80px_rgba(0,0,0,0.25)]",
    useLightNav
      ? "border border-slate-200 bg-white"
      : "border border-white/10 bg-[rgba(6,18,43,0.98)]",
  ].join(" ");

  const dropdownLinkClasses = [
    "block rounded-xl px-4 py-3 text-sm transition",
    useLightNav
      ? "text-slate-800 hover:bg-slate-900/5"
      : "text-white hover:bg-white/10",
  ].join(" ");

  const desktopCtaClasses = [
    "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-xl px-[4px] py-[4px] isolate",
    "transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
    "cta-border-gradient",
    "shadow-[0_8px_24px_rgba(0,0,0,0.1),0_0_20px_rgba(214,162,58,0.18)]",
    "hover:-translate-y-[2px] hover:scale-[1.02]",
    "hover:shadow-[0_12px_34px_rgba(0,0,0,0.14),0_0_28px_rgba(214,162,58,0.32)]",
  ].join(" ");

  const mobilePanelClasses = [
    "absolute left-4 right-4 top-[calc(100%+10px)] md:hidden rounded-2xl backdrop-blur-xl",
    "shadow-[0_30px_80px_rgba(0,0,0,0.30)] overflow-hidden",
    useLightNav
      ? "border border-slate-200 bg-white/90"
      : "border border-white/10 bg-[rgba(6,18,43,0.92)]",
  ].join(" ");

  const mobileItemBase = "rounded-xl px-4 py-3 text-sm transition";
  const mobileItemText = useLightNav
    ? "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900"
    : "text-white/85 hover:bg-white/10 hover:text-white";

  const mobileSubItemText = useLightNav
    ? "text-slate-700 hover:bg-slate-900/5"
    : "text-white/85 hover:bg-white/10";

  function onDropdownBlur(e: React.FocusEvent<HTMLDivElement>) {
    const next = e.relatedTarget as Node | null;
    if (!next) return scheduleClose();
    if (!e.currentTarget.contains(next)) scheduleClose();
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-50" style={themeVars}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
        <div
          className={[
            "relative flex h-16 items-center justify-between rounded-2xl px-3 sm:px-4",
            "transition-all duration-300",
            scrolled
              ? "bg-[rgba(6,18,43,0.86)] backdrop-blur-xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              : useLightNav
                ? "bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_18px_60px_rgba(2,6,23,0.08)]"
                : "bg-transparent",
          ].join(" ")}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div
              className={[
                "relative h-12 w-12 rounded-full overflow-hidden",
                useLightNav
                  ? "bg-white/70 border border-black/5 shadow-[0_10px_30px_rgba(2,6,23,0.08)]"
                  : "bg-white/10 border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
              ].join(" ")}
            >
              <Image
                src="/evg-logo.png"
                alt="Elite Visa Global"
                fill
                priority
                className="object-contain"
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
            <Link href="/#services" className={navLinkClasses(isHome)}>
              Services
            </Link>

            {/* Visa dropdown */}
            <div
              className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-4"
              onMouseEnter={() => openMenu("visa")}
              onMouseLeave={scheduleClose}
              onBlur={onDropdownBlur}
            >
              <button
                type="button"
                className={[navLinkClasses(isVisa), "gap-2"].join(" ")}
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === "visa"}
                onFocus={() => openMenu("visa")}
                onClick={() => toggleMenu("visa")}
              >
                <span>Visa Processing</span>
                <span
                  className={[
                    "text-xs leading-none transition-transform",
                    openDesktopMenu === "visa" ? "rotate-180" : "",
                    useLightNav ? "text-slate-500" : "text-white/70",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {openDesktopMenu === "visa" && (
                <div className={dropdownPanelClasses} role="menu">
                  <div className="p-2">
                    <Link
                      href="/visa-processing?type=student"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      Student Visa
                    </Link>
                    <Link
                      href="/visa-processing?type=visit"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      Visit, Family & Business Visa
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tours dropdown */}
            <div
              className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-4"
              onMouseEnter={() => openMenu("tours")}
              onMouseLeave={scheduleClose}
              onBlur={onDropdownBlur}
            >
              <button
                type="button"
                className={[navLinkClasses(isTours), "gap-2"].join(" ")}
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === "tours"}
                onFocus={() => openMenu("tours")}
                onClick={() => toggleMenu("tours")}
              >
                <span>Tour Packages</span>
                <span
                  className={[
                    "text-xs leading-none transition-transform",
                    openDesktopMenu === "tours" ? "rotate-180" : "",
                    useLightNav ? "text-slate-500" : "text-white/70",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {openDesktopMenu === "tours" && (
                <div className={dropdownPanelClasses} role="menu">
                  <div className="p-2">
                    <Link
                      href="/tour-packages?type=international"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      International Tours
                    </Link>
                    <Link
                      href="/tour-packages?type=local"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      Local Tours
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Hajj dropdown */}
            <div
              className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-4"
              onMouseEnter={() => openMenu("hajj")}
              onMouseLeave={scheduleClose}
              onBlur={onDropdownBlur}
            >
              <button
                type="button"
                className={[navLinkClasses(isHajjUmrah), "gap-2"].join(" ")}
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === "hajj"}
                onFocus={() => openMenu("hajj")}
                onClick={() => toggleMenu("hajj")}
              >
                <span>Hajj &amp; Umrah</span>
                <span
                  className={[
                    "text-xs leading-none transition-transform",
                    openDesktopMenu === "hajj" ? "rotate-180" : "",
                    useLightNav ? "text-slate-500" : "text-white/70",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {openDesktopMenu === "hajj" && (
                <div className={dropdownPanelClasses} role="menu">
                  <div className="p-2">
                    <Link
                      href="/hajj-umrah?type=umrah"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      Umrah Packages
                    </Link>
                    <Link
                      href="/hajj-umrah?type=hajj"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      Hajj Packages
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className={navLinkClasses(isAbout)}>
              About
            </Link>

            <Link href="/contact" className={navLinkClasses(isContact)}>
              Contact
            </Link>

            <Link href="/contact" className={desktopCtaClasses}>
              <span className="pointer-events-none absolute inset-0 rounded-xl">
                <span className="cta-gold-beam absolute inset-y-0 -left-1/3 w-1/3" />
              </span>

              <span className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-white/95 px-5 text-sm font-semibold text-[var(--evg-deep)] transition-all duration-500 group-hover:bg-[var(--evg-gold)] group-hover:text-white">
                Get Consultation
                <span className="text-[var(--evg-gold)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </span>
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
            <div className={mobilePanelClasses}>
              <div className="p-3 grid gap-1">
                <Link
                  href="/#services"
                  className={[mobileItemBase, mobileItemText].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Services
                </Link>

                {/* Visa collapsible */}
                <button
                  type="button"
                  className={[
                    mobileItemBase,
                    mobileItemText,
                    "flex items-center justify-between",
                  ].join(" ")}
                  onClick={() => setMobileVisaOpen((v) => !v)}
                  aria-expanded={mobileVisaOpen}
                >
                  <span>Visa Processing</span>
                  <span
                    className={
                      mobileVisaOpen ? "rotate-180 transition" : "transition"
                    }
                  >
                    ▼
                  </span>
                </button>

                {mobileVisaOpen && (
                  <div className="ml-2 mr-1 rounded-2xl border border-white/10 p-2">
                    <Link
                      href="/visa-processing?type=student"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      Student Visa
                    </Link>
                    <Link
                      href="/visa-processing?type=visit"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      Visit, Family & Business Visa
                    </Link>
                  </div>
                )}

                {/* Tours collapsible */}
                <button
                  type="button"
                  className={[
                    mobileItemBase,
                    mobileItemText,
                    "flex items-center justify-between",
                  ].join(" ")}
                  onClick={() => setMobileToursOpen((v) => !v)}
                  aria-expanded={mobileToursOpen}
                >
                  <span>Tour Packages</span>
                  <span
                    className={
                      mobileToursOpen ? "rotate-180 transition" : "transition"
                    }
                  >
                    ▼
                  </span>
                </button>

                {mobileToursOpen && (
                  <div className="ml-2 mr-1 rounded-2xl border border-white/10 p-2">
                    <Link
                      href="/tour-packages?type=international"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      International Tours
                    </Link>
                    <Link
                      href="/tour-packages?type=local"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      Local Tours
                    </Link>
                  </div>
                )}

                {/* Hajj collapsible */}
                <button
                  type="button"
                  className={[
                    mobileItemBase,
                    mobileItemText,
                    "flex items-center justify-between",
                  ].join(" ")}
                  onClick={() => setMobileHajjOpen((v) => !v)}
                  aria-expanded={mobileHajjOpen}
                >
                  <span>Hajj &amp; Umrah</span>
                  <span
                    className={
                      mobileHajjOpen ? "rotate-180 transition" : "transition"
                    }
                  >
                    ▼
                  </span>
                </button>

                {mobileHajjOpen && (
                  <div className="ml-2 mr-1 rounded-2xl border border-white/10 p-2">
                    <Link
                      href="/hajj-umrah?type=umrah"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      Umrah Packages
                    </Link>
                    <Link
                      href="/hajj-umrah?type=hajj"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      Hajj Packages
                    </Link>
                  </div>
                )}

                <Link
                  href="/about"
                  className={[mobileItemBase, mobileItemText].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className={[mobileItemBase, mobileItemText].join(" ")}
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
