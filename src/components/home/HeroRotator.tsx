"use client";

import Image from "next/image";
import React from "react";

type Slide = {
  key: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  tag: string;
};

const slides: Slide[] = [
  {
    key: "student",
    tag: "Student Visa",
    title: "Study abroad, with a compliant plan.",
    subtitle:
      "Admissions guidance, documentation, SOP support, and visa-ready preparation — end to end.",
    imageSrc: "/hero/student.webp",
  },
  {
    key: "visa",
    tag: "Tourist & Business Visa",
    title: "Short-term travel — done ethically.",
    subtitle:
      "Tourist, family visit, and business visas with accurate documentation and realistic outcomes.",
    imageSrc: "/hero/visa.webp",
  },
  {
    key: "hajj",
    tag: "Hajj & Umrah",
    title: "Sacred journeys, handled with care.",
    subtitle:
      "Packages, visa processing, accommodation, transport, and guidance — built on trust and responsibility.",
    imageSrc: "/hero/hajj.webp",
  },
];

export function HeroRotator() {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const t = window.setInterval(() => {
      setI((p) => (p + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      {/* image */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={s.imageSrc}
          alt={s.tag}
          fill
          className="object-cover"
          priority
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/5" />
        <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_30%_15%,rgba(214,162,58,0.18),transparent_55%)]" />
      </div>

      {/* copy */}
      <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--evg-gold)]" />
          {s.tag}
        </div>

        <div className="mt-3 text-lg md:text-xl font-medium tracking-tight">
          {s.title}
        </div>

        {/* clamp subtitle so it never eats space */}
        <p className="mt-2 text-sm text-white/70 leading-relaxed line-clamp-2">
          {s.subtitle}
        </p>

        {/* dots (smaller + more spacing) */}
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
                aria-label={`Show ${x.tag}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}