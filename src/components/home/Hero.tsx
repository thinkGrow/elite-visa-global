"use client";

import Image from "next/image";
import React from "react";
import { BookingWidget } from "./BookingWidget";

type Slide = {
  key: string;
  imageSrc: string;
  mobileFocus?: string;
  desktopFocus?: string;
};

const slides: Slide[] = [
  {
    key: "student",
    imageSrc: "/hero/student.webp",
    mobileFocus: "object-[72%_center]",
    desktopFocus: "object-center",
  },
  {
    key: "visa",
    imageSrc: "/hero/visa.webp",
    mobileFocus: "object-[68%_center]",
    desktopFocus: "object-center",
  },
  {
    key: "hajj",
    imageSrc: "/hero/hajj.webp",
    mobileFocus: "object-center",
    desktopFocus: "object-center",
  },
];

const AUTO_MS = 5200;
const ANIM_MS = 1600;

export function Hero() {
  const [i, setI] = React.useState(0);
  const [prev, setPrev] = React.useState<number | null>(null);
  const [dir, setDir] = React.useState<"next" | "prev">("next");
  const [contentIn, setContentIn] = React.useState(false);

  const iRef = React.useRef(0);

  React.useEffect(() => {
    const t = window.setTimeout(() => setContentIn(true), 30);
    return () => window.clearTimeout(t);
  }, []);

  const goTo = React.useCallback((next: number) => {
    if (next === iRef.current) return;

    const cur = iRef.current;
    const last = slides.length - 1;

    const isNext =
      (cur === last && next === 0) ||
      (next > cur && !(cur === 0 && next === last));

    setDir(isNext ? "next" : "prev");
    setPrev(cur);

    iRef.current = next;
    setI(next);

    window.setTimeout(() => setPrev(null), ANIM_MS + 100);
  }, []);

  React.useEffect(() => {
    const t = window.setInterval(() => {
      goTo((iRef.current + 1) % slides.length);
    }, AUTO_MS);

    return () => window.clearInterval(t);
  }, [goTo]);

  const currentSlide = slides[i];
  const prevSlide = prev !== null ? slides[prev] : null;

  return (
    <section className="relative isolate overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        {/* outgoing slide */}
        {prevSlide && (
          <div
            className={[
              "absolute inset-0 will-change-transform will-change-opacity",
              dir === "next" ? "hero-out-left" : "hero-out-right",
            ].join(" ")}
          >
            <Image
              src={prevSlide.imageSrc}
              alt="Elite Visa Global hero"
              fill
              priority={false}
              sizes="100vw"
              className={[
                "object-cover",
                prevSlide.mobileFocus ?? "object-center",
                `md:${(prevSlide.desktopFocus ?? "object-center").replace(
                  "object-",
                  "object-"
                )}`,
              ].join(" ")}
            />
          </div>
        )}

        {/* incoming/current slide */}
        <div
          key={currentSlide.key}
          className={[
            "absolute inset-0 will-change-transform will-change-opacity",
            dir === "next" ? "hero-in-right" : "hero-in-left",
          ].join(" ")}
        >
          <Image
            src={currentSlide.imageSrc}
            alt="Elite Visa Global hero"
            fill
            priority
            sizes="100vw"
            className={[
              "object-cover",
              currentSlide.mobileFocus ?? "object-center",
              `md:${(currentSlide.desktopFocus ?? "object-center").replace(
                "object-",
                "object-"
              )}`,
            ].join(" ")}
          />
        </div>

        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/42 to-black/12 md:from-black/70 md:via-black/35 md:to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_22%,rgba(214,162,58,0.18),transparent_55%)]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col px-4 pt-24 pb-5 sm:px-6 sm:pt-28 md:min-h-screen md:pb-10">
          {/* top content */}
          <div className="max-w-3xl">
            {/* HEADLINE - desktop glass card preserved */}
            <div
              className={[
                "rounded-3xl px-5 py-7 md:px-7 md:py-10 max-w-2xl",
                "bg-gradient-to-b from-white/18 to-white/10",
                "backdrop-blur-xl ring-1 ring-white/20",
                "shadow-[0_30px_80px_rgba(0,0,0,.35)]",
                "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-[2px]",
                contentIn ? "hero-headline-in" : "",
              ].join(" ")}
            >
              <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl md:text-5xl leading-[1.02] font-semibold text-white">
                Dreams beyond{" "}
                <span className="text-[var(--evg-gold)]">borders</span>,
                <br />
                guided with confidence.
              </h1>
            </div>

            {/* SUBTEXT */}
            <p
              className={[
                "mt-15 md:mt-6 max-w-xl text-white/75 text-base sm:text-lg leading-relaxed font-light",
                contentIn ? "hero-sub-in" : "",
              ].join(" ")}
            >
              Whether it’s higher education abroad or the sacred pilgrimage of
              Hajj and Umrah, we ensure every document, every requirement, and
              every step is handled with care, compliance, and responsibility.
            </p>
          </div>

          {/* Spacer so widget stays lower without absolute overlap on mobile */}
          <div className="flex-1 min-h-6 md:min-h-10" />

          {/* Bottom UI */}
          <div>
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              {/* dots */}
              <div className="flex items-center gap-2">
                {slides.map((x, idx) => {
                  const active = idx === i;
                  return (
                    <button
                      key={x.key}
                      type="button"
                      onClick={() => goTo(idx)}
                      className={[
                        "h-2 rounded-full transition-all duration-300",
                        active
                          ? "w-8 bg-[var(--evg-gold)]"
                          : "w-2 bg-white/30 hover:bg-white/55",
                      ].join(" ")}
                      aria-label={`Hero slide ${idx + 1}`}
                    />
                  );
                })}
              </div>

              {/* widget */}
              <div className="w-full md:w-[56rem] max-w-full">
                <div
                  className={[
                    "rounded-2xl border border-white/15 bg-white/10 p-2 md:p-3 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
                    contentIn ? "hero-widget-in" : "",
                  ].join(" ")}
                >
                  <BookingWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}