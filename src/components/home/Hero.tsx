"use client";

import React from "react";
import { BookingWidget } from "./booking-widget/BookingWidget";

export function Hero() {
  const [contentIn, setContentIn] = React.useState(false);

  React.useEffect(() => {
    const t = window.setTimeout(() => setContentIn(true), 30);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-[#f6f8fb]">
      {/* Banner */}
      <div className="relative isolate overflow-hidden bg-black">
        <div className="relative h-[24rem] sm:h-[26rem] md:h-[28rem] lg:h-[30rem]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/hero/evg-hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,43,0.26)_0%,rgba(6,18,43,0.45)_38%,rgba(6,18,43,0.78)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(760px_circle_at_50%_18%,rgba(214,162,58,0.14),transparent_58%)]" />

          <div className="relative z-10 mx-auto flex h-full max-w-8xl items-center justify-center px-6 pt-24 pb-24 text-center md:px-10 md:pt-28 md:pb-24">
            <div
              className={[
                "max-w-3xl transition-all duration-700 ease-out",
                contentIn
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              ].join(" ")}
            >
 
<h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
  Visa, Travel & Hajj Services
  <span className="block text-[var(--evg-gold)] gold-motion">
    in One Place
  </span>
</h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
                Trusted support for visa processing, tour planning, hotel
                booking, and flights with structured guidance every step of the
                way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Widget */}
      <div className="relative z-20 mx-auto -mt-14 max-w-7xl px-4 sm:px-6 md:-mt-20 md:px-10">
        <div
          className={[
            "overflow-hidden rounded-[1.6rem] border border-black/6 bg-white shadow-[0_20px_60px_rgba(6,18,43,0.12)] ring-1 ring-black/4",
            "transition-all duration-700 ease-out",
            contentIn ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
          ].join(" ")}
        >
          <BookingWidget />
        </div>
      </div>

      <div className="h-10 sm:h-12 md:h-14" />
    </section>
  );
}