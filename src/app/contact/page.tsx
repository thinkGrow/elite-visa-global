import React from "react";
import { Navbar } from "@/components/home/layout/Navbar";
import { ContactForm } from "@/components/contact/ContactForm";

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
        "rounded-3xl border border-white/10 bg-white/[0.055] backdrop-blur-2xl",
        "shadow-[0_22px_90px_rgba(0,0,0,0.55)]",
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
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      <span>{label}</span>
      <span className="text-white/40">→</span>
    </a>
  );
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white" style={themeVars}>
      {/* Global premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040912_0%,#06122b_25%,#0a1f46_55%,#071531_80%,#030814_100%)]" />
        <div className="absolute -top-60 left-[-260px] h-[980px] w-[980px] rounded-full bg-[rgba(28,90,168,0.30)] blur-[170px]" />
        <div className="absolute top-10 right-[-320px] h-[1050px] w-[1050px] rounded-full bg-[rgba(214,162,58,0.20)] blur-[190px]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_18%_12%,rgba(255,255,255,0.09),transparent_56%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_78%_18%,rgba(28,90,168,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.55))]" />
      </div>

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        {/* Hero glass headline block */}
        <div
          className={[
            "rounded-3xl px-7 py-10 max-w-3xl",
            "bg-gradient-to-b from-white/18 to-white/10",
            "backdrop-blur-xl ring-1 ring-white/20",
            "shadow-[0_30px_80px_rgba(0,0,0,.35)]",
          ].join(" ")}
        >
          <h1 className="font-[var(--font-playfair)] text-5xl md:text-6xl leading-[1.02] font-semibold text-white">
            Let’s talk about your{" "}
            <span className="text-[var(--evg-gold)]">next journey</span>.
          </h1>

          <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed">
            Share your details and we’ll get back with clear guidance, compliant steps,
            and realistic timelines.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          {/* Form */}
          <GlassCard className="p-7 md:p-8">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.22em] text-white/50">CONTACT FORM</p>
                <h2 className="mt-2 text-xl md:text-2xl font-semibold">Send a message</h2>
              </div>
              <div className="hidden md:block h-px flex-1 bg-white/10" />
            </div>

            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-2xl">
              This form sends directly to elitevisaglobal@gmail.com.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </GlassCard>

          {/* Right column: premium contact info */}
          <div className="grid gap-6">
            <GlassCard className="p-7">
              <p className="text-xs tracking-[0.22em] text-white/50">PHONE</p>
              <h3 className="mt-2 text-lg font-semibold">Call us</h3>

              <div className="mt-5 space-y-4 text-sm text-white/75">
                <div className="flex flex-col gap-1">
                  <span className="text-white/55">Phone</span>
                  <a className="hover:text-white" href="tel:+880247120404">
                    +880247120404
                  </a>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-white/55">General</span>
                  <a className="hover:text-white" href="tel:+8801805464661">
                    +8801805464661
                  </a>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div className="flex flex-col gap-1">
                  <span className="text-white/55">Elite Visa Global</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <a className="hover:text-white" href="tel:+8801805464660">
                      +8801805464660
                    </a>
                    <a className="hover:text-white" href="tel:+8801805464667">
                      +8801805464667
                    </a>
                    <a className="hover:text-white" href="tel:+8801726986666">
                      +8801726986666
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-white/55">Elite Hajj Kafela</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <a className="hover:text-white" href="tel:+8801805464664">
                      +8801805464664
                    </a>
                    <a className="hover:text-white" href="tel:+8801999996686">
                      +8801999996686
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-white/55">Travel Compass</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <a className="hover:text-white" href="tel:+8801726986666">
                      +8801726986666
                    </a>
                    <a className="hover:text-white" href="tel:+8801805464667">
                      +8801805464667
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-7">
              <p className="text-xs tracking-[0.22em] text-white/50">SOCIAL</p>
              <h3 className="mt-2 text-lg font-semibold">Connect</h3>

              <div className="mt-5 grid gap-3">
                <SocialRow label="Facebook" href="https://www.facebook.com/elitevisaglobal" />
                <SocialRow label="Instagram" href="https://www.instagram.com/elitevisaglobal/" />
                <SocialRow label="X (Twitter)" href="https://x.com/EliteVisaGlobal" />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                <div className="text-white/55">Email</div>
                <a
                  className="mt-2 inline-block text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
                  href="mailto:elitevisaglobal@gmail.com"
                >
                  elitevisaglobal@gmail.com
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6 text-sm text-white/60">
          Elite Visa Global • Dhaka, Bangladesh • Since 2016
        </div>
      </footer>
    </main>
  );
}
