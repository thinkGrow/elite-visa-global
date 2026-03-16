import React from "react";
import { Navbar } from "@/components/home/layout/Navbar";
import { ContactForm } from "@/components/contact/ContactForm";
import { GlassHeadlineCard } from "@/components/ui/GlassHeadlineCard";

type ThemeVars = React.CSSProperties & {
  "--evg-blue": string;
  "--evg-deep": string;
  "--evg-gold": string;
};

const themeVars: ThemeVars = {
  "--evg-blue": "#1c5aa8",
  "--evg-deep": "#06122b",
  "--evg-gold": "#d6a23a",
};

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl",
        "border border-slate-200/80 bg-white",
        "shadow-[0_12px_40px_rgba(2,6,23,0.06)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SocialRow({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[
        "group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm",
        "text-[var(--evg-deep)] shadow-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-[var(--evg-gold)]/60 hover:shadow-md",
      ].join(" ")}
    >
      <span>{label}</span>
      <span className="text-[var(--evg-gold)] transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <main
      className="relative min-h-screen overflow-hidden text-black"
      style={themeVars}
    >
      {/* Global premium white background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fcfdff_0%,#f7f9fc_30%,#f9f7f2_65%,#ffffff_100%)]" />
        <div className="absolute -top-56 left-[-220px] h-[820px] w-[820px] rounded-full bg-[rgba(28,90,168,0.10)] blur-[140px]" />
        <div className="absolute top-0 right-[-260px] h-[860px] w-[860px] rounded-full bg-[rgba(214,162,58,0.10)] blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(255,255,255,0.95),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_82%_18%,rgba(28,90,168,0.06),transparent_60%)]" />
      </div>

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        <GlassHeadlineCard textColor="black" size="lg">
          <h1 className="text-balance">
            Let’s talk about your{" "}
            <span className="text-[var(--evg-gold)]">next journey</span>.
          </h1>
        </GlassHeadlineCard>

        <p className="mt-6 text-base leading-relaxed text-black/65 md:text-lg">
          Share your details and we’ll get back with clear guidance, compliant
          steps, and realistic timelines.
        </p>

        <hr className="my-6 border-black/10" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          {/* Form */}
          <GlassCard className="p-7 md:p-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.22em] text-black/40">
                  CONTACT FORM
                </p>
                <h2 className="mt-2 text-xl font-semibold md:text-2xl">
                  Send a message
                </h2>
              </div>
              <div className="hidden h-px flex-1 bg-black/10 md:block" />
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/55">
              This form sends directly to elitevisaglobal@gmail.com.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </GlassCard>

          {/* Right column */}
          <div className="grid gap-6">
            <GlassCard className="p-7">
              <p className="text-xs tracking-[0.22em] text-black/40">PHONE</p>
              <h3 className="mt-2 text-lg font-semibold">Call us</h3>

              <div className="mt-5 space-y-4 text-sm text-black/70">
                <div className="flex flex-col gap-1">
                  <span className="text-black/45">Phone</span>
                  <a
                    className="transition hover:text-[var(--evg-blue)]"
                    href="tel:+880247120404"
                  >
                    +880247120404
                  </a>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-black/45">General</span>
                  <a
                    className="transition hover:text-[var(--evg-blue)]"
                    href="tel:+8801805464661"
                  >
                    +8801805464661
                  </a>
                </div>

                <div className="h-px w-full bg-black/10" />

                <div className="flex flex-col gap-1">
                  <span className="text-black/45">Elite Visa Global</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <a
                      className="transition hover:text-[var(--evg-blue)]"
                      href="tel:+8801805464660"
                    >
                      +8801805464660
                    </a>
                    <a
                      className="transition hover:text-[var(--evg-blue)]"
                      href="tel:+8801805464667"
                    >
                      +8801805464667
                    </a>
                    <a
                      className="transition hover:text-[var(--evg-blue)]"
                      href="tel:+8801726986666"
                    >
                      +8801726986666
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-black/45">Elite Hajj Kafela</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <a
                      className="transition hover:text-[var(--evg-blue)]"
                      href="tel:+8801805464664"
                    >
                      +8801805464664
                    </a>
                    <a
                      className="transition hover:text-[var(--evg-blue)]"
                      href="tel:+8801999996686"
                    >
                      +8801999996686
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-black/45">Travel Compass</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <a
                      className="transition hover:text-[var(--evg-blue)]"
                      href="tel:+8801726986666"
                    >
                      +8801726986666
                    </a>
                    <a
                      className="transition hover:text-[var(--evg-blue)]"
                      href="tel:+8801805464667"
                    >
                      +8801805464667
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-7">
              <p className="text-xs tracking-[0.22em] text-black/40">SOCIAL</p>
              <h3 className="mt-2 text-lg font-semibold">Connect</h3>

              <div className="mt-5 grid gap-3">
                <SocialRow
                  label="Facebook"
                  href="https://www.facebook.com/elitevisaglobal"
                />
                <SocialRow
                  label="Instagram"
                  href="https://www.instagram.com/elitevisaglobal/"
                />
                <SocialRow
                  label="X (Twitter)"
                  href="https://x.com/EliteVisaGlobal"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-black/8 bg-white/75 p-5 text-sm text-black/65">
                <div className="text-black/45">Email</div>
                <a
                  className="mt-2 inline-block text-[var(--evg-blue)] underline decoration-black/15 underline-offset-4 transition hover:decoration-[var(--evg-blue)]"
                  href="mailto:elitevisaglobal@gmail.com"
                >
                  elitevisaglobal@gmail.com
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}
