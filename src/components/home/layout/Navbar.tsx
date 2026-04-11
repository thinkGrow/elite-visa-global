"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { themeVars } from "@/lib/theme";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

type DesktopMenuKey = "visa" | "tours";

function NavbarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";

  const visaType = (searchParams.get("type") ?? "").toLowerCase();

  const [scrolled, setScrolled] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = React.useState(false);
  const [mobileToursOpen, setMobileToursOpen] = React.useState(false);

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

  React.useEffect(() => {
    setOpen(false);
    setMobileVisaOpen(false);
    setMobileToursOpen(false);
    setOpenDesktopMenu(null);
    clearCloseTimer();
  }, [pathname]);

  const isVisaRoute = pathname.startsWith("/visa-processing");

  const isStudentVisa = isVisaRoute && visaType === "student";
  const isVisa = isVisaRoute && (visaType === "visit" || visaType === "transit");

  const isHajjUmrah =
    pathname === "/hajj-umrah" || pathname.startsWith("/hajj-umrah/");
  const isTours =
    pathname === "/tour-packages" || pathname.startsWith("/tour-packages/");
  const isUmrah = pathname === "/umrah" || pathname.startsWith("/umrah/");
  const isHajj = pathname === "/hajj" || pathname.startsWith("/hajj/");
  const isAbout = pathname === "/about" || pathname.startsWith("/about/");
  const isContact = pathname === "/contact" || pathname.startsWith("/contact/");

  const isLightPage =
    isVisaRoute ||
    isHajjUmrah ||
    isTours ||
    isUmrah ||
    isHajj ||
    isAbout ||
    isContact;

  const useLightNav = isLightPage && !scrolled;

  function navLinkClasses(isActive: boolean) {
    const base =
      "relative inline-flex items-center h-10 will-change-transform text-[13.5px] font-semibold tracking-[0.05em] transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[1px]";

    const text = useLightNav
      ? isActive
        ? "text-slate-900"
        : "text-slate-600/80 hover:text-slate-900"
      : isActive
        ? "text-white"
        : "text-white/60 hover:text-white/95";

    const underlineBase =
      "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[4px] after:h-[1px] after:w-0 after:rounded-full after:transition-all after:duration-300 after:ease-[cubic-bezier(.22,1,.36,1)]";

    const underline = isActive
      ? "after:w-[60%] after:bg-[var(--evg-gold)]"
      : useLightNav
        ? "after:bg-slate-900/40 hover:after:w-[60%]"
        : "after:bg-[rgba(214,162,58,0.7)] hover:after:w-[60%]";

    return [base, text, underlineBase, underline].join(" ");
  }

  const dropdownPanelClasses = [
    "absolute left-0 top-full z-50 w-[280px]",
    "translate-y-3 rounded-[22px] p-2",
    "backdrop-blur-xl",
    "shadow-[0_24px_70px_rgba(0,0,0,0.30)]",
    "transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
    useLightNav
      ? "border border-slate-200/80 bg-white/95"
      : "border border-white/10 bg-[rgba(3,14,40,0.88)]",
  ].join(" ");

  const dropdownLinkClasses = [
    "group block rounded-2xl px-4 py-3",
    "text-[14px] font-medium tracking-[0.01em]",
    "transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
    useLightNav
      ? "text-slate-800 hover:bg-[rgba(15,23,42,0.05)]"
      : "text-white/92 hover:bg-[rgba(255,255,255,0.06)] hover:text-white",
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
      <div className="mx-auto max-w-8xl px-4 sm:px-6 pt-4">
        <div
          className={[
            "relative flex h-[68px] items-center justify-between rounded-[22px] px-4 sm:px-5",
            "transition-all duration-300",
            scrolled
              ? "bg-[rgba(6,18,43,0.86)] backdrop-blur-xl border border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              : useLightNav
                ? "bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_18px_60px_rgba(2,6,23,0.08)]"
                : "bg-transparent",
          ].join(" ")}
        >
          <Link href="/" className="flex items-center gap-3">
            <div
              className={[
                "relative h-12 w-12 xl:h-14 xl:w-14 rounded-full overflow-hidden",
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
                className="object-contain scale-[1.02]"
              />
            </div>

            <div className="leading-tight">
              <div
                className={[
                  "whitespace-nowrap font-[var(--font-playfair)] font-semibold tracking-[0.16em]",
                  "text-[15px] xl:text-[17px]",
                  useLightNav ? "text-slate-900" : "text-white",
                ].join(" ")}
              >
                <span className="gold-motion relative">ELITE</span>{" "}
                <span className="opacity-90">VISA GLOBAL</span>
              </div>

              <div
                className={[
                  "mt-1 text-[10px] xl:text-[11px] tracking-[0.14em]",
                  useLightNav ? "text-slate-500/70" : "text-white/42",
                ].join(" ")}
              >
                Follow your dreams.
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 xl:gap-8 text-balance text-center">
            <Link href="/" className={navLinkClasses(isHome)}>
              Home
            </Link>

            <Link
              href="/visa-processing?type=student"
              className={navLinkClasses(isStudentVisa)}
            >
              Student Visa
            </Link>

            <div
              className="relative after:absolute after:left-0 after:right-0 after:top-full after:h-4 after:content-['']"
              onMouseEnter={() => openMenu("visa")}
              onMouseLeave={scheduleClose}
              onBlur={onDropdownBlur}
            >
              <button
                type="button"
                className={[navLinkClasses(isVisa), "gap-1.5"].join(" ")}
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === "visa"}
                onFocus={() => openMenu("visa")}
                onClick={() => toggleMenu("visa")}
              >
                <span>Visa Processing</span>
                <span
                  className={[
                    "text-[9px] transition-all duration-300",
                    openDesktopMenu === "visa"
                      ? "rotate-180 translate-y-[1px]"
                      : "",
                    useLightNav ? "text-slate-400" : "text-white/45",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {openDesktopMenu === "visa" && (
                <div className={dropdownPanelClasses} role="menu">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/visa-processing?type=visit"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>Visit, Family &amp; Business Visa</span>
                        <span className="text-[11px] text-[var(--evg-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          →
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/visa-processing?type=transit"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>Transit Visa</span>
                        <span className="text-[11px] text-[var(--evg-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          →
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative after:absolute after:left-0 after:right-0 after:top-full after:h-4 after:content-['']"
              onMouseEnter={() => openMenu("tours")}
              onMouseLeave={scheduleClose}
              onBlur={onDropdownBlur}
            >
              <button
                type="button"
                className={[navLinkClasses(isTours), "gap-1.5"].join(" ")}
                aria-haspopup="menu"
                aria-expanded={openDesktopMenu === "tours"}
                onFocus={() => openMenu("tours")}
                onClick={() => toggleMenu("tours")}
              >
                <span>Tours</span>
                <span
                  className={[
                    "text-[9px] transition-all duration-300",
                    openDesktopMenu === "tours"
                      ? "rotate-180 translate-y-[1px]"
                      : "",
                    useLightNav ? "text-slate-400" : "text-white/45",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {openDesktopMenu === "tours" && (
                <div className={dropdownPanelClasses} role="menu">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/tour-packages?type=international"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>International Tours</span>
                        <span className="text-[11px] text-[var(--evg-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          →
                        </span>
                      </div>
                    </Link>

                    <Link
                      href="/tour-packages?type=local"
                      className={dropdownLinkClasses}
                      onClick={closeNow}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span>Local Tours</span>
                        <span className="text-[11px] text-[var(--evg-gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          →
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/umrah" className={navLinkClasses(isUmrah)}>
              Umrah
            </Link>

            <Link href="/hajj" className={navLinkClasses(isHajj)}>
              Hajj
            </Link>

            <Link href="/about" className={navLinkClasses(isAbout)}>
              About
            </Link>

            <Link href="/contact" className={navLinkClasses(isContact)}>
              Contact
            </Link>

            <PrimaryCTA href="/contact">Get Consultation</PrimaryCTA>
          </nav>

          <button
            type="button"
            className={[
              "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur transition",
              useLightNav
                ? "border border-slate-200 bg-white/60 text-slate-900"
                : "border border-white/10 bg-white/5 text-white/85",
            ].join(" ")}
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>

          {open && (
            <div className={mobilePanelClasses}>
              <div className="grid gap-1 p-3">
                <Link
                  href="/"
                  className={[mobileItemBase, mobileItemText].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>

                <Link
                  href="/visa-processing?type=student"
                  className={[mobileItemBase, mobileItemText].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Student Visa
                </Link>

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
                      href="/visa-processing?type=visit"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      Visit, Family &amp; Business Visa
                    </Link>

                    <Link
                      href="/visa-processing?type=transit"
                      className={[
                        "block rounded-xl px-4 py-2 text-sm transition",
                        mobileSubItemText,
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      Transit Visa
                    </Link>
                  </div>
                )}

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

                <Link
                  href="/umrah"
                  className={[mobileItemBase, mobileItemText].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Umrah
                </Link>

                <Link
                  href="/hajj"
                  className={[mobileItemBase, mobileItemText].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  Hajj
                </Link>

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
                  className="mt-2 rounded-xl bg-[var(--evg-gold)] px-4 py-3 text-center text-sm font-medium text-slate-900"
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

function NavbarFallback() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50" style={themeVars}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 pt-4">
        <div className="relative flex h-[68px] items-center justify-between rounded-[22px] px-4 sm:px-5 bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_18px_60px_rgba(2,6,23,0.08)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 xl:h-14 xl:w-14 rounded-full overflow-hidden bg-white/70 border border-black/5 shadow-[0_10px_30px_rgba(2,6,23,0.08)]">
              <Image
                src="/evg-logo.png"
                alt="Elite Visa Global"
                fill
                priority
                className="object-contain scale-[1.02]"
              />
            </div>

            <div className="leading-tight">
              <div className="whitespace-nowrap font-[var(--font-playfair)] font-semibold tracking-[0.16em] text-[15px] xl:text-[17px] text-slate-900">
                <span className="gold-motion relative">ELITE</span>{" "}
                <span className="opacity-90">VISA GLOBAL</span>
              </div>

              <div className="mt-1 text-[10px] xl:text-[11px] tracking-[0.14em] text-slate-500/70">
                Follow your dreams.
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarInner />
    </Suspense>
  );
}