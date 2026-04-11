import React from "react";
import { themeVars } from "@/lib/theme";

export function WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-white" style={themeVars}>
      {/* Soft EVG blue glow */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(28,90,168,0.10) 0%, rgba(28,90,168,0.04) 40%, transparent 70%)",
        }}
      />

      {/* subtle top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-black/5" />

      <div className="relative mx-auto max-w-8xl px-6 py-24">
        <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
          <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
            WELCOME
          </div>

          <div className="mt-3 flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
              Welcome to Elite Visa Global
            </h2>
            <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
          </div>

          <div className="mt-8 space-y-6 text-gray-800 leading-relaxed text-[17px]">
            <p>
              Elite Visa Global (EVG) is a premium Visa, Tours & Travel
              consultancy, created for individuals and families ready to follow
              their dreams beyond borders—with clarity, confidence, and
              professional guidance.
            </p>

            <p>
              In a world shaped by complex immigration rules and global
              regulations, EVG transforms ambition into structured, achievable
              pathways. From international education and short-term travel to
              business mobility, pilgrimage, and leisure journeys, we ensure
              every step is compliant, considered, and purposeful.
            </p>

            <p>
              Our approach is consultative, not transactional. We listen before
              we advise, assess before we recommend, and prepare every
              application with precision and integrity.
            </p>

            <p>
              At Elite Visa Global, dreams are not rushed—they are guided.
              <br /> <br />
              <span className="text-[color:var(--evg-gold)] font-semibold">
                Follow your dreams. We’ll help you reach them.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* soft bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-black/[0.03]" />
    </section>
  );
}
