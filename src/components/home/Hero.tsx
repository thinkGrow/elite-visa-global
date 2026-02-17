"use client";

import Image from "next/image";
import React from "react";
import { BookingWidget } from "./BookingWidget";

type Slide = {
  key: string;
  imageSrc: string;
};

const slides: Slide[] = [
  { key: "student", imageSrc: "/hero/student.webp" },
  { key: "visa", imageSrc: "/hero/visa.webp" },
  { key: "hajj", imageSrc: "/hero/hajj.webp" },
];

const AUTO_MS = 5200;
const ANIM_MS = 1600;

export function Hero() {
  const [i, setI] = React.useState(0);
  const [prev, setPrev] = React.useState<number | null>(null);
  const [dir, setDir] = React.useState<"next" | "prev">("next");

  // content animates only once
  const [contentIn, setContentIn] = React.useState(false);

  const iRef = React.useRef(0);

  React.useEffect(() => {
    // trigger content animation once after mount
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

  return (
    <section className="relative">
      {/* Background */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* outgoing slide */}
        {prev !== null && (
          <div
            className={[
              "absolute inset-0 will-change-transform will-change-opacity",
              dir === "next" ? "hero-out-left" : "hero-out-right",
            ].join(" ")}
          >
            <Image
              src={slides[prev].imageSrc}
              alt="Elite Visa Global hero"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          </div>
        )}

        {/* incoming/current slide */}
        <div
          key={slides[i].key}
          className={[
            "absolute inset-0 will-change-transform will-change-opacity",
            dir === "next" ? "hero-in-right" : "hero-in-left",
          ].join(" ")}
        >
          <Image
            src={slides[i].imageSrc}
            alt="Elite Visa Global hero"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_22%,rgba(214,162,58,0.18),transparent_55%)]" />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0">
        <div className="mx-auto max-w-7xl px-6 pt-28">
          <div className="max-w-3xl">
            {/* HEADLINE */}
            <div
              className={[
                "rounded-3xl px-7 py-10 max-w-2xl",
                "bg-gradient-to-b from-white/18 to-white/10",
                "backdrop-blur-xl ring-1 ring-white/20",
                "shadow-[0_30px_80px_rgba(0,0,0,.35)]",
                "transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-[2px]",
                contentIn ? "hero-headline-in" : "",
              ].join(" ")}
            >
              <h1 className="font-[var(--font-playfair)] text-5xl leading-[1.02] font-semibold text-white">
                Dreams beyond{" "}
                <span className="text-[var(--evg-gold)]">borders</span>,
                <br />
                guided with confidence.
              </h1>
            </div>

            {/* SUBTEXT */}
            <p
              className={[
                "mt-6 max-w-xl text-white/75 text-lg leading-relaxed font-light",
                contentIn ? "hero-sub-in" : "",
              ].join(" ")}
            >
              Visa, tours, travel, umrah and hajj services — structured,
              compliant, and professionally guided.
            </p>
          </div>
        </div>

        {/* Bottom UI */}
        <div className="absolute inset-x-0 bottom-10">
          {/* dots inside container width */}
          <div className="mx-auto max-w-7xl px-6 flex justify-start">
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
          </div>

          {/* widget pinned right edge */}
          <div className="absolute right-6 md:right-10 bottom-0 w-full max-w-4xl">
            <div
              className={[
                "rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
                contentIn ? "hero-widget-in" : "",
              ].join(" ")}
            >
              <BookingWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
