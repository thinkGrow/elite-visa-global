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

type Props = {
  title: string;
  subtitle?: string;
};

export function Hero({ title, subtitle }: Props) {
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
        <div className="mx-auto max-w-6xl px-6 pt-28">
          {/* Premium headline block (less ugly than solid brick) */}
          <div className="max-w-3xl">
            <div className="inline-block rounded-2xl border border-white/15 bg-[color:var(--evg-blue)]/80 px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur md:px-10 md:py-8">
              <h1 className="text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl">
                {title}
              </h1>
            </div>

            {subtitle ? (
              <p className="mt-6 max-w-xl text-white/80">{subtitle}</p>
            ) : null}
          </div>

          {/* booking widget */}
          <div className="mt-10 max-w-4xl">
            <BookingWidget></BookingWidget>
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
