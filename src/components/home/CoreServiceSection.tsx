// src/components/home/sections/CoreServiceSection.tsx
"use client";

import React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Globe, PlaneTakeoff } from "lucide-react";
import { KaabaIcon } from "@/components/icons/KaabaIcon";
import { themeVars } from "@/lib/theme";
import { EvgCard } from "@/components/ui/EvgCard";

type ServiceItem = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href: string;
  previewEyebrow: string;
  previewTitle: string;
  previewText: string;
  bullets: string[];
  accentClass: string;
};

function ServicePreviewCard({
  service,
  isLeftColumn,
}: {
  service: ServiceItem;
  isLeftColumn: boolean;
}) {
  const Icon = service.icon;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateYRaw = useTransform(mx, [-1, 1], [-4, 4]);
  const rotateXRaw = useTransform(my, [-1, 1], [4, -4]);

  const rotateX = useSpring(rotateXRaw, {
    stiffness: 180,
    damping: 18,
    mass: 0.5,
  });
  const rotateY = useSpring(rotateYRaw, {
    stiffness: 180,
    damping: 18,
    mass: 0.5,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    mx.set(px * 2 - 1);
    my.set(py * 2 - 1);
  };

  const handleLeaveTilt = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.965,
        x: isLeftColumn ? 30 : -30,
      }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{
        opacity: 0,
        scale: 0.985,
        x: isLeftColumn ? 20 : -20,
      }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "hidden md:block absolute top-1/2 -translate-y-1/2 z-50 w-[420px] overflow-hidden",
        "rounded-[30px] border border-[var(--evg-gold)] bg-white",
        "shadow-[0_30px_80px_rgba(0,0,0,0.15)]",
        isLeftColumn
          ? "left-[calc(100%+20px)]"
          : "right-[calc(100%+20px)]",
      ].join(" ")}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeaveTilt}
    >
      <div className={`relative h-52 ${service.accentClass}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.68),transparent_36%)]" />

        <div className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/72 px-3 py-1 text-[11px] tracking-[0.22em] text-[var(--evg-deep)]/65 backdrop-blur">
          {service.previewEyebrow}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 6 }}
          transition={{
            duration: 0.44,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: "translateZ(28px)" }}
        >
          <Icon className="h-20 w-20 text-[var(--evg-deep)]/70 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{
            duration: 0.36,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.04,
          }}
          className="absolute bottom-4 left-4 right-4 rounded-[22px] border border-white/60 bg-white/72 p-4 backdrop-blur-md"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="text-md text-center text-balance font-semibold text-[var(--evg-deep)]">
            {service.previewTitle}
          </div>
        </motion.div>
      </div>

      <div className="p-6">
        <p className="text-[15px] leading-8 text-slate-600">
          {service.previewText}
        </p>

        <ul className="mt-5 space-y-3">
          {service.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 text-sm text-slate-700"
            >
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--evg-gold)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function CoreServiceSection() {
  const services: ServiceItem[] = [
    {
      id: "student",
      title: "Student Visa & Admission Support",
      icon: GraduationCap,
      text: "Complete student visa assistance from academic planning to final visa submission.",
      href: "/visa-processing?type=student",
      previewEyebrow: "STUDENT PATHWAY",
      previewTitle: "Structured support from planning to visa submission",
      previewText:
        "A guided process covering academic direction, documentation, preparation, and final visa processing with clarity at every stage.",
      bullets: [
        "University & pathway guidance",
        "Document planning and review",
        "Application-to-visa support",
      ],
      accentClass:
        "bg-[radial-gradient(circle_at_top_left,rgba(28,90,168,0.18),transparent_45%),linear-gradient(135deg,#f8fbff_0%,#eef5ff_100%)]",
    },
    {
      id: "tourist",
      title: "Tourist & Business Visa Services",
      icon: Globe,
      text: "Structured support for short-term travel visas with strong documentation and compliance.",
      href: "/visa-processing?type=visit",
      previewEyebrow: "SHORT-TERM TRAVEL",
      previewTitle: "Tourist, family, and business travel made more organized",
      previewText:
        "Clear documentation guidance and compliance-focused processing for short-term travel needs.",
      bullets: [
        "Tourist & family visit visas",
        "Business travel documentation",
        "Compliance-focused assistance",
      ],
      accentClass:
        "bg-[radial-gradient(circle_at_top_left,rgba(214,162,58,0.18),transparent_45%),linear-gradient(135deg,#fffaf0_0%,#fff6df_100%)]",
    },
    {
      id: "hajj",
      title: "Elite Hajj Kafela",
      icon: KaabaIcon,
      text: "Dedicated Hajj & Umrah services built on trust, responsibility, and logistical excellence.",
      href: "/hajj-umrah",
      previewEyebrow: "PILGRIMAGE SERVICES",
      previewTitle: "A more dependable Hajj & Umrah journey",
      previewText:
        "Faith-centered travel support with disciplined planning and coordination.",
      bullets: [
        "Trusted pilgrimage coordination",
        "Logistics and guidance support",
        "Care-focused experience",
      ],
      accentClass:
        "bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.12),transparent_45%),linear-gradient(135deg,#f8f8f8_0%,#efefef_100%)]",
    },
    {
      id: "travel",
      title: "Travel Compass – Tours & Air Tickets",
      icon: PlaneTakeoff,
      text: "International and domestic tours, ticket booking, and customized travel planning.",
      href: "/tour-packages?type=international",
      previewEyebrow: "TOURS & TICKETING",
      previewTitle: "Curated travel and ticketing",
      previewText:
        "Explore organized travel planning with flexibility and convenience.",
      bullets: [
        "International & domestic tours",
        "Air ticket booking",
        "Custom itineraries",
      ],
      accentClass:
        "bg-[radial-gradient(circle_at_top_left,rgba(28,90,168,0.14),transparent_45%),linear-gradient(135deg,#f6fbff_0%,#eef7ff_100%)]",
    },
  ];

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [inView, setInView] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(node);
      }
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-x-clip bg-white"
      style={themeVars}
    >
      <div className="mx-auto max-w-8xl px-6 py-24">
        <div
          className={[
            "max-w-4xl border-l border-[var(--evg-gold)]/60 pl-6",
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            "transition-all duration-700",
          ].join(" ")}
        >
          <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
            WHAT WE DO
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--evg-deep)] md:text-4xl">
            Our Core Services
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isLeftColumn = i % 2 === 0;
            const isActive = activeId === s.id;

            return (
              <div
                key={s.id}
                className="relative"
                onMouseEnter={() => setActiveId(s.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <EvgCard
                  title={s.title}
                  description={s.text}
                  href={s.href}
                  icon={<Icon className="h-8 w-8 text-[var(--evg-gold)]" />}
                  variant="service"
                  ctaLabel="Learn more"
                />

                <AnimatePresence>
                  {isActive ? (
                    <ServicePreviewCard
                      service={s}
                      isLeftColumn={isLeftColumn}
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}