"use client";

import Image from "next/image";
import React from "react";
import { BookingWidget } from "./BookingWidget";
// import { BookingWidget } from "@/components/home/BookingWidget";

type Slide = {
  key: string;
  imageSrc: string;
};

const slides: Slide[] = [
  { key: "student", imageSrc: "/hero/student.webp" },
  { key: "visa", imageSrc: "/hero/visa.webp" },
  { key: "hajj", imageSrc: "/hero/hajj.webp" },
];

export function Hero() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setI((p) => (p + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="relative">
      {/* background image */}
      {/* <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden"> */}

      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src={s.imageSrc}
          alt="Elite Visa Global hero"
          fill
          priority
          className="object-cover"
        />
        {/* overlays for readability + brand feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_22%,rgba(214,162,58,0.18),transparent_55%)]" />
      </div>

      {/* content */}
      <div className="absolute inset-0">
        <div className="mx-auto max-w-7xl px-6 pt-28">
          {/* Premium headline block (less ugly than solid brick) */}
          <div className="max-w-3xl">
            {/* <div className="inline-block rounded-2xl border border-white/15 bg-(--evg-blue)/40 px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur md:px-10 md:py-8">
              <h1 className="text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl">
                Dreams beyond borders, guided with confidence.
              </h1>
            </div> */}
            <div
              className="
              rounded-3xl px-10 py-10 max-w-3xl
              bg-gradient-to-b from-white/18 to-white/10
              backdrop-blur-xl
              ring-1 ring-white/20
              shadow-[0_30px_80px_rgba(0,0,0,.35)]
              transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
              hover:-translate-y-[2px]
              "
            >
              <h1 className="text-5xl leading-[1.02] font-semibold text-white">
                Dreams beyond borders,
                <br />
                guided with confidence.
              </h1>
            </div>

            <p className="mt-6 max-w-xl text-white/80">
              Visa, tours, travel and pilgrimage services — structured,
              compliant, and professionally guided.
            </p>
          </div>

          {/* booking widget */}
          <div className="flex justify-end">
            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <BookingWidget />
              </div>
            </div>
          </div>

          {/* dots */}
          <div className="mt-5 flex items-center gap-2">
            {slides.map((x, idx) => {
              const active = idx === i;
              return (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => setI(idx)}
                  className={[
                    "h-2 rounded-full transition-all",
                    active
                      ? "w-7 bg-[var(--evg-gold)]"
                      : "w-2 bg-white/30 hover:bg-white/55",
                  ].join(" ")}
                  aria-label={`Hero slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
