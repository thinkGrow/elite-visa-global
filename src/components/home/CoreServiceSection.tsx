import React from "react";

export function CoreServiceSection() {
  const services = [
    {
      title: "Student Visa & Admission Support",
      icon: "🎓",
      text: "Complete student visa assistance from academic planning to final visa submission.",
    },
    {
      title: "Tourist & Business Visa Services",
      icon: "🌍",
      text: "Structured support for short-term travel visas with strong documentation and compliance.",
    },
    {
      title: "Elite Hajj Kafela",
      icon: "🕋",
      text: "Dedicated Hajj & Umrah services built on trust, responsibility, and logistical excellence.",
    },
    {
      title: "Travel Compass – Tours & Air Tickets",
      icon: "✈️",
      text: "International and domestic tours, ticket booking, and customized travel planning.",
    },
  ];

  return (
    <section id="services" className="mx-auto max-w-7xl px-6 pb-24">
      <div className="text-sm tracking-[0.22em] text-white/60">WHAT WE DO</div>
      <h2 className="mt-3 text-3xl md:text-4xl">Our Core Services</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <a
            key={s.title}
            href="#"
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="text-2xl">{s.icon}</div>
            <h3 className="mt-4 text-lg">{s.title}</h3>
            <p className="mt-3 text-sm text-black/70 leading-relaxed">
              {s.text}
            </p>

            <div className="mt-5 text-sm text-black/60 group-hover:text-black transition">
              Learn more →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}