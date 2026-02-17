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
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src={s.imageSrc}
          alt="Elite Visa Global hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_22%,rgba(214,162,58,0.18),transparent_55%)]" />
      </div>

      {/* content layer */}
      <div className="absolute inset-0">
        {/* top content stays inside container */}
        <div className="mx-auto max-w-7xl px-6 pt-28">
          <div className="max-w-3xl">
            <div
              className="
                rounded-3xl px-7 py-10 max-w-2xl
                bg-gradient-to-b from-white/18 to-white/10
                backdrop-blur-xl
                ring-1 ring-white/20
                shadow-[0_30px_80px_rgba(0,0,0,.35)]
                transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]
                hover:-translate-y-[2px]
              "
            >
              <h1 className="font-[var(--font-playfair)] text-5xl leading-[1.02] font-semibold text-white">
                Dreams beyond{" "}
                <span className="text-[var(--evg-gold)]">borders</span>,
                <br />
                guided with confidence.
              </h1>
            </div>
            <p className="mt-6 max-w-xl text-white/75 text-lg leading-relaxed font-light">
              Visa, tours, travel and pilgrimage services — structured,
              compliant, and professionally guided.
            </p>
          </div>
        </div>

        {/* bottom UI pinned to screen edges */}
        {/* bottom UI */}
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
                    onClick={() => setI(idx)}
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
            <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <BookingWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
